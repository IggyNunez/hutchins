import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'problemsSection',
  title: 'Problems Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'The Problem',
    }),
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'problems',
      title: 'Problem Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Problem Heading', type: 'string' }),
            defineField({ name: 'body', title: 'Problem Description', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'heading' } },
        },
      ],
    }),
    defineField({
      name: 'pullquote',
      title: 'Pullquote Text',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: { prepare: () => ({ title: 'Problems Section' }) },
})
