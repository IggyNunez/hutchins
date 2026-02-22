import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'The Guide',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title / Role',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bio Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each item becomes a separate paragraph',
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({
      name: 'quote',
      title: 'Portrait Overlay Quote',
      type: 'string',
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'stats',
      title: 'Stats Grid',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Text', type: 'string' }),
        defineField({ name: 'href', title: 'Link', type: 'string' }),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Text', type: 'string' }),
        defineField({ name: 'href', title: 'Link', type: 'string' }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'About Section' }) },
})
