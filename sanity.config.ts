'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

const singletonTypes = new Set([
  'siteSettings',
  'navigation',
  'heroSection',
  'proofSection',
  'problemsSection',
  'solutionSection',
  'processSection',
  'aboutSection',
  'speakingSection',
  'bookSection',
  'podcastSection',
  'contactSection',
  'footerSection',
])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const singletonListItem = (S: any, typeName: string, title: string) =>
  S.listItem()
    .title(title)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName))

export default defineConfig({
  name: 'hutchins-studio',
  title: 'Hutchins Data Strategy',

  projectId: 'wl8pm9jv',
  dataset: 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            singletonListItem(S, 'siteSettings', 'Site Settings'),
            singletonListItem(S, 'navigation', 'Navigation'),
            S.divider(),
            S.listItem()
              .title('Page Sections')
              .child(
                S.list()
                  .title('Sections')
                  .items([
                    singletonListItem(S, 'heroSection', '1. Hero'),
                    singletonListItem(S, 'proofSection', '2. Proof Bar'),
                    singletonListItem(S, 'problemsSection', '3. Problems'),
                    singletonListItem(S, 'solutionSection', '4. Solution'),
                    singletonListItem(S, 'processSection', '5. Process'),
                    singletonListItem(S, 'aboutSection', '6. About'),
                    singletonListItem(S, 'speakingSection', '7. Speaking'),
                    singletonListItem(S, 'bookSection', '8. Book'),
                    singletonListItem(S, 'podcastSection', '9. Podcast'),
                    singletonListItem(S, 'contactSection', '10. Contact'),
                    singletonListItem(S, 'footerSection', '11. Footer'),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action && ['publish', 'discardChanges', 'restore'].includes(action)
          )
        : input,
  },
})
