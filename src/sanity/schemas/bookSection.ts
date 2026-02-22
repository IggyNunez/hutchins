import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'bookSection',
  title: 'Book Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Published Work',
    }),
    defineField({
      name: 'bookTitle',
      title: 'Book Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Get the Book',
    }),
    defineField({
      name: 'purchaseUrl',
      title: 'Purchase URL',
      type: 'url',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional: upload actual book cover.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Book Section' }) },
})
