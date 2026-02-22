import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'podcastSection',
  title: 'Podcast Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Podcast',
    }),
    defineField({
      name: 'heading',
      title: 'Podcast Name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'latestEpisode',
      title: 'Latest Episode',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Episode Title', type: 'string' }),
        defineField({ name: 'description', title: 'Episode Description', type: 'text', rows: 2 }),
      ],
    }),
    defineField({
      name: 'platforms',
      title: 'Platform Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Platform Name', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
          preview: { select: { title: 'name' } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Podcast Section' }) },
})
