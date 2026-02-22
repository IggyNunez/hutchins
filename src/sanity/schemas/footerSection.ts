import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'footerSection',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'brandDescription',
      title: 'Brand Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'navSections',
      title: 'Footer Nav Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Column Heading', type: 'string' }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', title: 'Label', type: 'string' }),
                    defineField({ name: 'href', title: 'URL or Anchor', type: 'string' }),
                    defineField({ name: 'external', title: 'External Link?', type: 'boolean', initialValue: false }),
                  ],
                },
              ],
            }),
          ],
          preview: { select: { title: 'heading' } },
        },
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'Use {year} for dynamic year',
    }),
  ],
  preview: { prepare: () => ({ title: 'Footer' }) },
})
