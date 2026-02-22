import { sanityFetch } from '@/sanity/client'
import { allSectionsQuery } from '@/sanity/queries'
import type { PageData } from '@/sanity/types'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Proof from '@/components/Proof'
import Problems from '@/components/Problems'
import Solution from '@/components/Solution'
import Process from '@/components/Process'
import About from '@/components/About'
import Speaking from '@/components/Speaking'
import Book from '@/components/Book'
import Podcast from '@/components/Podcast'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// Force dynamic rendering for instant Sanity updates in development
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  const data = await sanityFetch<PageData>({
    query: allSectionsQuery,
    tags: ['sanity'],
  })

  console.log('Page data:', JSON.stringify(data, null, 2))

  return (
    <>
      <Nav data={data.navigation} settings={data.siteSettings} />
      <Hero data={data.hero} />
      <Proof data={data.proof} />
      <Problems data={data.problems} />
      <Solution data={data.solution} />
      <Process data={data.process} settings={data.siteSettings} />
      <About data={data.about} />
      <Speaking data={data.speaking} />
      <Book data={data.book} />
      <Podcast data={data.podcast} />
      <Contact data={data.contact} settings={data.siteSettings} />
      <Footer data={data.footer} settings={data.siteSettings} />
    </>
  )
}
