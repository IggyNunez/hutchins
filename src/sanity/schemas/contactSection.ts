import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Get in Touch',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'body',
      title: 'Body Copy',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bookingCard',
      title: 'Booking Card',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', initialValue: 'Prefer to book directly?' }),
        defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
        defineField({ name: 'buttonUrl', title: 'Button URL', type: 'url' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'string' }),
      ],
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'formFields',
      title: 'Form Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Field Label', type: 'string' }),
            defineField({ name: 'name', title: 'Field Name (HTML)', type: 'string' }),
            defineField({
              name: 'type',
              title: 'Field Type',
              type: 'string',
              options: { list: ['text', 'email', 'textarea'] },
            }),
            defineField({ name: 'required', title: 'Required', type: 'boolean', initialValue: true }),
          ],
          preview: { select: { title: 'label', subtitle: 'type' } },
        },
      ],
    }),
    defineField({
      name: 'successHeading',
      title: 'Success Message Heading',
      type: 'string',
    }),
    defineField({
      name: 'successBody',
      title: 'Success Message Body',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: { prepare: () => ({ title: 'Contact Section' }) },
})
