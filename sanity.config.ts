import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Kraken Labs',
  studioHost: 'kraken-labs',
  projectId: 'r0k8uqze',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool(),
    presentationTool({
  previewUrl: {
    origin: 'https://kraken-labs.vercel.app',
    draftMode: {
      enable: '/api/draft?secret=kraken-preview-2026',
    },
  },
}),
  ],
  schema: { types: schemaTypes },
})