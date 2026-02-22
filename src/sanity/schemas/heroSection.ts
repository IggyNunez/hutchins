import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      initialValue: 'Healthcare AI & Data Strategy',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'body',
      title: 'Body Copy',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Button Text', type: 'string' }),
        defineField({ name: 'url', title: 'URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Button Text', type: 'string' }),
        defineField({ name: 'href', title: 'Anchor Link', type: 'string' }),
      ],
    }),
    defineField({
      name: 'badgeQuote',
      title: 'Floating Badge Quote',
      type: 'string',
    }),
    defineField({
      name: 'ctaSubtext',
      title: 'CTA Subtext (italic)',
      type: 'string',
      initialValue: '30 minutes. Calm, diagnostic, no pitch.',
    }),
    defineField({
      name: 'stats',
      title: 'Stats Row',
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
      validation: (r) => r.max(6),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Hero Section' }) },
})
