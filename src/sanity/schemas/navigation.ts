import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'links',
      title: 'Nav Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Link (anchor or URL)', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Book a call',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'url',
    }),
  ],
  preview: { prepare: () => ({ title: 'Navigation' }) },
})
