export const allSectionsQuery = /* groq */ `{
  "siteSettings": *[_type == "siteSettings"][0] {
    siteTitle,
    siteDescription,
    logo { asset->, alt },
    favicon { asset-> },
    ogImage { asset-> },
    calendlyUrl,
    email,
    socialLinks[] { _key, platform, url }
  },
  "navigation": *[_type == "navigation"][0] {
    links[] { _key, label, href },
    ctaText,
    ctaLink
  },
  "hero": *[_type == "heroSection"][0] {
    eyebrow,
    headline,
    body,
    primaryCta { text, url },
    secondaryCta { text, href },
    badgeQuote,
    ctaSubtext,
    stats[] { _key, value, label },
    heroImage { asset->, alt }
  },
  "proof": *[_type == "proofSection"][0] {
    items
  },
  "problems": *[_type == "problemsSection"][0] {
    eyebrow,
    heading,
    problems[] { _key, heading, body },
    pullquote
  },
  "solution": *[_type == "solutionSection"][0] {
    eyebrow,
    heading,
    intro,
    outcomes[] { _key, number, heading, body }
  },
  "process": *[_type == "processSection"][0] {
    eyebrow,
    heading,
    steps[] { _key, number, heading, body, detail },
    cta { text, url },
    ctaSubtext
  },
  "about": *[_type == "aboutSection"][0] {
    eyebrow,
    name,
    title,
    bio,
    portrait { asset->, alt },
    quote,
    credentials,
    stats[] { _key, value, label },
    primaryCta { text, href },
    secondaryCta { text, href }
  },
  "speaking": *[_type == "speakingSection"][0] {
    eyebrow,
    heading,
    tagline,
    photo { asset->, alt },
    topics[] { _key, number, heading, body },
    ctaHeading,
    ctaBody,
    ctaButtonText,
    ctaButtonHref
  },
  "book": *[_type == "bookSection"][0] {
    eyebrow,
    bookTitle,
    subtitle,
    description,
    ctaText,
    purchaseUrl,
    coverImage { asset-> }
  },
  "podcast": *[_type == "podcastSection"][0] {
    eyebrow,
    heading,
    description,
    latestEpisode { title, description },
    platforms[] { _key, name, url }
  },
  "contact": *[_type == "contactSection"][0] {
    eyebrow,
    heading,
    body,
    bookingCard { label, buttonText, buttonUrl, subtext },
    email,
    formFields[] { _key, label, name, type, required },
    successHeading,
    successBody
  },
  "footer": *[_type == "footerSection"][0] {
    brandDescription,
    navSections[] {
      _key,
      heading,
      links[] { _key, label, href, external }
    },
    copyrightText
  }
}`
