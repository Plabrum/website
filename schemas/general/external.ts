import { defineField, defineType } from 'sanity';
import { ComponentIcon } from '@sanity/icons';

export default defineType({
  name: 'external',
  title: 'External Html',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      type: 'url',
      name: 'link_to_html',
      title: 'Link to html',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'number',
      name: 'width',
      title: 'Width of Aspect ratio',
    }),
    defineField({
      type: 'number',
      name: 'height',
      title: 'Height of Aspect ratio',
    }),
  ],
});
