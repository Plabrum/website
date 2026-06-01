import { defineField, defineType } from 'sanity';
import { ComposeIcon } from '@sanity/icons';

/**
 * The unified writing surface. An `entry` is a single piece of writing.
 * Its `type` is the one real binary — a thought (`essay`) vs. something
 * built (`project`). Everything else is uniform: artifacts live inline in
 * the body, there is no stack/tech metadata, and the reading shape emerges
 * from the content rather than being configured. Replaces the old `post`
 * and `project` types.
 */
export default defineType({
  name: 'entry',
  title: 'Entry',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'A thought (essay) or something built (project).',
      options: {
        list: [
          { title: 'Essay', value: 'essay' },
          { title: 'Project', value: 'project' },
        ],
        layout: 'radio',
      },
      initialValue: 'essay',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated at',
      type: 'datetime',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'string',
      description:
        'One line. Used as the index gloss and the social/SEO description. Falls back to the first paragraph when blank.',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      description:
        'Outbound links shown as an icon row under the title. The icon is derived from the URL (e.g. github.com → GitHub). Caption is optional.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'link',
          fields: [
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'caption', subtitle: 'url' },
            prepare: ({ title, subtitle }) => ({
              title: title || subtitle,
              subtitle: title ? subtitle : undefined,
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'socialImage',
      title: 'Social image',
      description: 'Used for link previews (og:image) only — never shown on the page.',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'title', type: 'type', publishedAt: 'publishedAt' },
    prepare: ({ title, type, publishedAt }) => ({
      title,
      subtitle: [type === 'project' ? 'Project' : 'Essay', publishedAt?.slice(0, 10)]
        .filter(Boolean)
        .join(' · '),
    }),
  },
});
