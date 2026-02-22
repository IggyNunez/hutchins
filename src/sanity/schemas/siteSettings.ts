import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'social', title: 'Social Media' },
  ],
  fields: [
    // General Settings
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      group: 'general',
      validation: (r) => r.required(),
      description: 'Main title for your website',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'general',
      description: 'Small icon that appears in browser tabs (32x32 or 64x64)',
    }),
    defineField({
      name: 'calendlyUrl',
      title: 'Calendly URL',
      type: 'url',
      group: 'general',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'general',
    }),

    // SEO Settings
    defineField({
      name: 'siteDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      validation: (r) => r.max(160).warning('Should be under 160 characters for optimal SEO'),
      description: 'Brief description of your site (appears in search results)',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
      description: 'Keywords for SEO (e.g., "AI governance", "healthcare analytics")',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'seo',
      description: 'Default author name for content',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image (1200x630)',
      type: 'image',
      group: 'seo',
      description: 'Default image for social media sharing (Facebook, LinkedIn)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility',
        },
      ],
    }),
    defineField({
      name: 'twitterHandle',
      title: 'Twitter Handle',
      type: 'string',
      group: 'seo',
      description: 'Your Twitter username (e.g., @yourusername)',
      validation: (r) =>
        r.custom((value) => {
          if (value && !value.startsWith('@')) {
            return 'Twitter handle must start with @'
          }
          return true
        }),
    }),

    // Social Links
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'social',
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
  preview: {
    select: {
      title: 'siteTitle',
      subtitle: 'siteDescription',
    },
  },
})
