import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'speakingSection',
  title: 'Speaking Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Speaking',
    }),
    defineField({
      name: 'heading',
      title: 'Display Heading',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline (italic)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'photo',
      title: 'Speaking Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({
      name: 'topics',
      title: 'Speaking Topics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Number', type: 'string' }),
            defineField({ name: 'heading', title: 'Topic Title', type: 'string' }),
            defineField({ name: 'body', title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'heading', subtitle: 'number' } },
        },
      ],
    }),
    defineField({
      name: 'ctaHeading',
      title: 'CTA Card Heading',
      type: 'string',
    }),
    defineField({
      name: 'ctaBody',
      title: 'CTA Card Body',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Inquire',
    }),
    defineField({
      name: 'ctaButtonHref',
      title: 'CTA Button Link',
      type: 'string',
    }),
  ],
  preview: { prepare: () => ({ title: 'Speaking Section' }) },
})
