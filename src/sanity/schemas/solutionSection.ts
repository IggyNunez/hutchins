import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'solutionSection',
  title: 'Solution Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'The Solution',
    }),
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'intro',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'outcomes',
      title: 'Outcome Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Number Label', type: 'string' }),
            defineField({ name: 'heading', title: 'Outcome Heading', type: 'string' }),
            defineField({ name: 'body', title: 'Outcome Description', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'heading', subtitle: 'number' } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Solution Section' }) },
})
