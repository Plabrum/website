import { CogIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      description: 'Short sentence shown next to the avatar on the home page (e.g. role + location).',
      type: 'string',
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: 'hero_photo',
      title: 'Hero Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
