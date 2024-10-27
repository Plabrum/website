import { defineField, defineType } from 'sanity';
import { TagIcon } from '@sanity/icons';

export default defineType({
  name: 'tag',
  title: 'Keyword Tag',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'name',
      title: 'Tag Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'number',
      name: 'color',
      title: 'Tag color',
    }),
  ],
});
