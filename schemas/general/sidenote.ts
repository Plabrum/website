import { defineField, defineType } from 'sanity'
import { CommentIcon } from '@sanity/icons'

export default defineType({
  name: 'sidenote',
  title: 'Sidenote',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
      validation: rule => rule.required()
    })
  ],
  preview: {
    select: { title: 'text' },
    prepare({ title }: { title?: string }) {
      // empty string should fall back to the label, so || (not ??) is intended
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      return { title: title || 'Sidenote' }
    }
  }
})
