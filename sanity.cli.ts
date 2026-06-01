import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'oj0rz57b',
    dataset: 'production'
  },
  typegen: {
    path: './**/*.{ts,tsx}',
    schema: './schema.json',
    generates: './sanity.types.ts',
    overloadClientMethods: true
  }
})
