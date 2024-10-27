import { defineField, defineType } from 'sanity';
import { ComponentIcon } from '@sanity/icons';

export default defineType({
  name: 'latex',
  title: 'Latex code',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'latex_string',
      title: 'Latex String',
      validation: (rule) => rule.required(),
    }),
  ],
});
