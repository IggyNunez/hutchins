import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'proofSection',
  title: 'Proof Bar',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Proof Items',
      description: 'Credential badges displayed in the proof strip. Drag to reorder.',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Proof Bar' }) },
})
