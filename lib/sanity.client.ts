import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import '../sanity.types'

const projectIdEnv = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const datasetEnv = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectIdEnv) throw new Error('Missing required env var NEXT_PUBLIC_SANITY_PROJECT_ID')
if (!datasetEnv) throw new Error('Missing required env var NEXT_PUBLIC_SANITY_DATASET')

export const projectId = projectIdEnv
export const dataset = datasetEnv
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

export const client = createClient({
  projectId,
  dataset,
  ...(apiVersion ? { apiVersion } : {}),
  useCdn: false
})

export const imageBuilder = createImageUrlBuilder({ projectId, dataset })
