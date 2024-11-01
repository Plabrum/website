import { RocketIcon } from '@sanity/icons';
import { CustomValidator, defineArrayMember, defineField, defineType, SlugValue } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: RocketIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  initialValue: {
    pin: false,
  },
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your project.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
        slugify: (value) => {
          if (!value.startsWith('/projects/')) {
            return '/projects/' + value;
          }
          return value;
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pin',
      description: 'Show this project on the homepage',
      initialValue: false,
      title: 'Pin to Homepage',
      type: 'boolean',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'meta_description',
      description: 'Used for the <meta> description tag for SEO',
      title: 'Meta Description',
      type: 'string',
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: 'blurb',
      description: 'Used for the blurb description on cards',
      title: 'Blurb',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description: 'This image will be used as the cover image for the project.',
      type: 'image',
      validation: (rule) => rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'duration',
    }),

    defineField({
      name: 'repo_url',
      title: 'Repo URL',
      type: 'url',
    }),
    defineField({
      name: 'demo_url',
      title: 'Demo URL',
      type: 'url',
    }),

    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'blockContent',
    }),

    defineField({
      name: 'technologies',
      title: 'Tech Used',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tech' }],
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Keywords about Project',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag' }],
        },
      ],
    }),
  ],
});
