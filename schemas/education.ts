import { defineField, defineType } from 'sanity';
import { CaseIcon } from '@sanity/icons';

export default defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'school',
      title: 'School',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'degree',
      title: 'Degree',
      type: 'string',
    }),
    defineField({
      name: 'year_start',
      title: 'Start year',
      type: 'number',
    }),
    defineField({
      name: 'year_end',
      title: 'End year',
      type: 'number',
    }),
    defineField({
      name: 'company',
      title: 'School (reference for logo)',
      type: 'reference',
      to: { type: 'company' },
    }),
  ],
});
