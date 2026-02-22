import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'processSection',
  title: 'Process Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'How We Work',
    }),
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'steps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Step Number', type: 'string' }),
            defineField({ name: 'heading', title: 'Step Heading', type: 'string' }),
            defineField({ name: 'body', title: 'Step Body', type: 'text', rows: 3 }),
            defineField({ name: 'detail', title: 'Detail / Aside', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'heading', subtitle: 'number' } },
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Button Text', type: 'string' }),
        defineField({ name: 'url', title: 'URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'ctaSubtext',
      title: 'CTA Subtext',
      type: 'string',
    }),
  ],
  preview: { prepare: () => ({ title: 'Process Section' }) },
})
