import type { SanityImageSource } from '@sanity/image-url'

/* ── Shared ─────────────────────────────────────────── */

export interface SanityImage {
  asset: SanityImageSource
  alt?: string
}

export interface Cta {
  text: string
  url?: string
  href?: string
}

export interface Stat {
  _key: string
  value: string
  label: string
}

export interface SocialLink {
  _key: string
  platform: string
  url: string
}

/* ── Site Settings ──────────────────────────────────── */

export interface SiteSettingsData {
  siteTitle: string
  siteDescription: string
  keywords?: string[]
  author?: string
  twitterHandle?: string
  logo: SanityImage
  favicon: SanityImage
  ogImage: SanityImage
  calendlyUrl: string
  email: string
  socialLinks: SocialLink[]
}

/* ── Navigation ─────────────────────────────────────── */

export interface NavLink {
  _key: string
  label: string
  href: string
}

export interface NavigationData {
  links: NavLink[]
  ctaText: string
  ctaLink: string
}

/* ── Hero ────────────────────────────────────────────── */

export interface HeroData {
  eyebrow: string
  headline: string
  body: string
  primaryCta: Cta
  secondaryCta: Cta
  badgeQuote: string
  ctaSubtext: string
  stats: Stat[]
  heroImage: SanityImage
}

/* ── Proof ───────────────────────────────────────────── */

export interface ProofData {
  items: string[]
}

/* ── Problems ────────────────────────────────────────── */

export interface ProblemCard {
  _key: string
  heading: string
  body: string
}

export interface ProblemsData {
  eyebrow: string
  heading: string
  problems: ProblemCard[]
  pullquote: string
}

/* ── Solution ────────────────────────────────────────── */

export interface OutcomeCard {
  _key: string
  number: string
  heading: string
  body: string
}

export interface SolutionData {
  eyebrow: string
  heading: string
  intro: string
  outcomes: OutcomeCard[]
}

/* ── Process ─────────────────────────────────────────── */

export interface ProcessStep {
  _key: string
  number: string
  heading: string
  body: string
  detail: string
}

export interface ProcessData {
  eyebrow: string
  heading: string
  steps: ProcessStep[]
  cta: Cta
  ctaSubtext: string
}

/* ── About ───────────────────────────────────────────── */

export interface AboutData {
  eyebrow: string
  name: string
  title: string
  bio: string[]
  portrait: SanityImage
  quote: string
  credentials: string[]
  stats: Stat[]
  primaryCta: Cta
  secondaryCta: Cta
}

/* ── Speaking ────────────────────────────────────────── */

export interface SpeakingTopic {
  _key: string
  number: string
  heading: string
  body: string
}

export interface SpeakingData {
  eyebrow: string
  heading: string
  tagline: string
  photo: SanityImage
  topics: SpeakingTopic[]
  ctaHeading: string
  ctaBody: string
  ctaButtonText: string
  ctaButtonHref: string
}

/* ── Book ────────────────────────────────────────────── */

export interface BookData {
  eyebrow: string
  bookTitle: string
  subtitle: string
  description: string
  ctaText: string
  purchaseUrl: string
  coverImage: SanityImage
}

/* ── Podcast ─────────────────────────────────────────── */

export interface PodcastPlatform {
  _key: string
  name: string
  url: string
}

export interface PodcastData {
  eyebrow: string
  heading: string
  description: string
  latestEpisode: {
    title: string
    description: string
  }
  platforms: PodcastPlatform[]
}

/* ── Contact ─────────────────────────────────────────── */

export interface FormField {
  _key: string
  label: string
  name: string
  type: 'text' | 'email' | 'textarea'
  required: boolean
}

export interface ContactData {
  eyebrow: string
  heading: string
  body: string
  bookingCard: {
    label: string
    buttonText: string
    buttonUrl: string
    subtext: string
  }
  email: string
  formFields: FormField[]
  successHeading: string
  successBody: string
}

/* ── Footer ──────────────────────────────────────────── */

export interface FooterLink {
  _key: string
  label: string
  href: string
  external: boolean
}

export interface FooterNavSection {
  _key: string
  heading: string
  links: FooterLink[]
}

export interface FooterData {
  brandDescription: string
  navSections: FooterNavSection[]
  copyrightText: string
}

/* ── Combined Page Data ──────────────────────────────── */

export interface PageData {
  siteSettings: SiteSettingsData
  navigation: NavigationData
  hero: HeroData
  proof: ProofData
  problems: ProblemsData
  solution: SolutionData
  process: ProcessData
  about: AboutData
  speaking: SpeakingData
  book: BookData
  podcast: PodcastData
  contact: ContactData
  footer: FooterData
}
