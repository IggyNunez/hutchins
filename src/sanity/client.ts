import { createClient } from 'next-sanity'

const projectId = 'wl8pm9jv'
const dataset = 'production'

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
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
      next: {
        revalidate: 60,
        tags,
      },
    })
  } catch (err) {
    console.warn('Sanity fetch failed:', err)
    return {} as T
  }
}
