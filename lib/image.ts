import imageUrlBuilder from '@sanity/image-url'
import { client } from './sanity'

let builder: ReturnType<typeof imageUrlBuilder> | null = null

if (client) {
  try {
    builder = imageUrlBuilder(client)
  } catch (error) {
    console.warn('Failed to initialize image URL builder:', error)
  }
}

export function urlFor(source: Record<string, unknown>) {
  if (!builder) {
    return { url: () => '' }
  }
  return builder.image(source)
}
