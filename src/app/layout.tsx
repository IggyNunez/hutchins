import type { Metadata } from 'next'
import { ebGaramond, sourceSans3, montserrat } from '@/lib/fonts'
import { sanityFetch } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import type { SiteSettingsData } from '@/sanity/types'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'
import './globals.css'

const settingsQuery = /* groq */ `*[_type == "siteSettings"][0] {
  siteTitle,
  siteDescription,
  ogImage { asset-> }
}`

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettingsData | null>({
    query: settingsQuery,
    tags: ['sanity'],
  })

  const title = settings?.siteTitle || 'Hutchins Data Strategy'
  const description =
    settings?.siteDescription ||
    'I help healthcare executives adopt AI and analytics without losing institutional trust.'

  const ogImageUrl = settings?.ogImage?.asset
    ? urlFor(settings.ogImage).width(1200).height(630).url()
    : undefined

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    icons: { icon: '/img/favicon.png' },
    openGraph: {
      title,
      description,
      siteName: title,
      type: 'website',
      ...(ogImageUrl && { images: [{ url: ogImageUrl, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${sourceSans3.variable} ${montserrat.variable}`}
    >
      <body>
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
