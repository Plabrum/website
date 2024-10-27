import { UserIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: UserIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'name',
      description: 'This is the name of the person the about section is ~about~ .',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'job_title',
      title: 'Title',
      type: 'string',
      description: 'Job title',
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
      name: 'taglines',
      title: 'Tagline array',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'These taglines will alternate in the hero section',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'hero_photo',
      title: 'Hero Image',
      description: 'Hero image',
      type: 'image',
      validation: (rule) => rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'about_photo',
      title: 'About Image',
      description: 'about image',
      type: 'image',
      validation: (rule) => rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'desc_title',
      title: 'Description Title',
      type: 'string',
      description: 'Description title',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'About Description',
      type: 'blockContent',
    }),
  ],
});
