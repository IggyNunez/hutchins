import { createClient } from 'next-sanity'

const projectId = 'wl8pm9jv'
const dataset = 'production'
const isDev = process.env.NODE_ENV === 'development'

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: false, // Always disable CDN for instant updates
      perspective: isDev ? 'drafts' : 'published', // Use drafts in dev for instant updates
      stega: { enabled: false },
    })
  : null

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  if (!client) {
    console.warn('Sanity client not configured — returning empty data')
    return {} as T
  }
  try {
    return await client.fetch<T>(query, params, {
      cache: isDev ? 'no-store' : 'force-cache',
      next: {
        revalidate: isDev ? 0 : 60,
        tags,
      },
    })
  } catch (err) {
    console.warn('Sanity fetch failed:', err)
    return {} as T
  }
}
