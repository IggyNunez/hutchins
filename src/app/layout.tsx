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
  keywords,
  author,
  twitterHandle,
  ogImage { asset->, alt },
  favicon { asset-> }
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

  const faviconUrl = settings?.favicon?.asset
    ? urlFor(settings.favicon).width(64).height(64).url()
    : '/img/favicon.png'

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    ...(settings?.keywords && { keywords: settings.keywords }),
    ...(settings?.author && { authors: [{ name: settings.author }] }),
    icons: { icon: faviconUrl },
    openGraph: {
      title,
      description,
      siteName: title,
      type: 'website',
      locale: 'en_US',
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: settings?.ogImage?.alt || title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(settings?.twitterHandle && { creator: settings.twitterHandle }),
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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
        {children}
      </body>
    </html>
  )
}
