import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

let client: ReturnType<typeof createClient> | null = null

// Only create client if projectId is provided and valid
if (projectId && projectId.match(/^[a-z0-9-]+$/)) {
  try {
    client = createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: false,
    })
  } catch (error) {
    console.warn('Failed to initialize Sanity client:', error)
    client = null
  }
}

export { client }

export async function sanityFetch({
  query,
  params = {},
}: {
  query: string
  params?: Record<string, unknown>
}) {
  if (!client) {
    console.warn('⚠️ Sanity client not initialized. Please set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local')
    return null
  }
  try {
    return client.fetch(query, params)
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return null
  }
}
