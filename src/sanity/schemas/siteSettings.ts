import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image (1200x630)',
      type: 'image',
      description: 'Default social sharing image',
    }),
    defineField({
      name: 'calendlyUrl',
      title: 'Calendly URL',
      type: 'url',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: ['LinkedIn', 'Twitter/X', 'Instagram', 'YouTube', 'Facebook'],
              },
            }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
