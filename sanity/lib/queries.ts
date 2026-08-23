import { client } from "@/sanity/lib/client"
import type { PortfolioItem } from "@/components/DesignerPortfolio"

// ---------------------------------------------------------------------------
// GROQ — matches your portfolioProject schema exactly
// ---------------------------------------------------------------------------
export const portfolioQuery = `
  *[_type == "portfolioProject"] | order(order asc) {
    _id,
    title,
    section,
    category,
    description,
    tools,
    videoKey,
    "thumbnailUrl": thumbnailImage.asset->url,
    "galleryUrls": galleryImages[].asset->url
  }
`

// ---------------------------------------------------------------------------
// Raw shape coming back from Sanity
// ---------------------------------------------------------------------------
type SanityProject = {
  _id: string
  title: string
  section: string        // "industrial" | "technical" | "brandingIndustrial"
  category: string
  description: string
  tools: string[]
  videoKey?: string      // Vimeo/YouTube ID or full URL stored in Sanity
  thumbnailUrl?: string
  galleryUrls?: string[]
}

// ---------------------------------------------------------------------------
// Helper: turn a videoKey into the full Vimeo page URL the component expects
// ---------------------------------------------------------------------------
function toVideoUrl(key?: string): string {
  if (!key) return ""
  const value = key.trim()
  // Full Vimeo / YouTube URL — pass straight through.
  if (/^https?:\/\//i.test(value)) return value
  // Bare numeric id => Vimeo, bare 11-char id => YouTube.
  if (/^\d+$/.test(value)) return `https://vimeo.com/${value}`
  if (/^[A-Za-z0-9_-]{11}$/.test(value)) return `https://www.youtube.com/watch?v=${value}`
  return value
}

// ---------------------------------------------------------------------------
// Fetch + reshape into Record<string, PortfolioItem[]>
// Returns null on error so the component falls back to static data
// ---------------------------------------------------------------------------
export async function getPortfolioItems(
  isDraft = false
): Promise<Record<string, PortfolioItem[]> | null> {
  try {
    const fetchClient = isDraft
      ? client.withConfig({
          token: process.env.SANITY_API_READ_TOKEN,
          perspective: "previewDrafts",
          useCdn: false,
        })
      : client

    const projects: SanityProject[] = await fetchClient.fetch(portfolioQuery)

    if (!projects?.length) return null

    const grouped: Record<string, PortfolioItem[]> = {}

    projects.forEach((project, idx) => {
      const section = project.section ?? "industrial"
      if (!grouped[section]) grouped[section] = []

      const videoUrl = toVideoUrl(project.videoKey)
      // `src` is the square card thumbnail; `images[0]` becomes the modal hero.
      const src = project.thumbnailUrl ?? videoUrl
      const images: string[] = [
        ...(videoUrl ? [videoUrl] : []),
        ...(project.galleryUrls ?? []),
      ]

      grouped[section].push({
        id: idx + 1,
        title: project.title,
        src,
        images,
        category: project.category ?? "",
        description: project.description ?? "",
        tools: project.tools ?? [],
      })
    })

    return grouped
  } catch (err) {
    console.warn("[getPortfolioItems] Sanity fetch failed, using static fallback:", err)
    return null
  }
}

// NOTE: the two About image slots were repurposed (see the siteSettings schema).
// `headshot` now holds the company logo and `cherryPhoto` holds Genesis' headshot —
// the field *names* stay put so the already-uploaded assets are not lost.
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    heroHeadingLine1,
    heroHeadingLine2,
    heroSubtitle,
    heroVideoId,
    aboutHeading,
    whatWeDoHeading,
    whatWeDoBody,
    whoIAmHeading,
    whoIAmBody,
    "aboutLogoUrl": headshot.asset->url,
    "aboutHeadshotUrl": cherryPhoto.asset->url,
    contactHeading,
    contactSubtitle,
    emailAddress,
    linkedinUrl,
    dribbbleUrl,
    instagramUrl,
    servicesHeading,
    services[] { title, body },
    partnerLogos[] { alt, "logoUrl": logo.asset->url }
  }
`

export type SiteSettings = {
  heroHeadingLine1?: string
  heroHeadingLine2?: string
  heroSubtitle?: string
  heroVideoId?: string
  aboutHeading?: string
  whatWeDoHeading?: string
  whatWeDoBody?: string
  whoIAmHeading?: string
  whoIAmBody?: string
  aboutLogoUrl?: string
  aboutHeadshotUrl?: string
  contactHeading?: string
  contactSubtitle?: string
  emailAddress?: string
  linkedinUrl?: string
  dribbbleUrl?: string
  instagramUrl?: string
  servicesHeading?: string
  services?: { title: string; body: string }[]
  partnerLogos?: { alt: string; logoUrl: string }[]
}

export async function getSiteSettings(
  isDraft = false
): Promise<SiteSettings | null> {
  try {
    const fetchClient = isDraft
      ? client.withConfig({
          token: process.env.SANITY_API_READ_TOKEN,
          perspective: "previewDrafts",
          useCdn: false,
        })
      : client
    const settings = await fetchClient.fetch(siteSettingsQuery)
    return settings ?? null
  } catch (err) {
    console.warn("[getSiteSettings] Sanity fetch failed:", err)
    return null
  }
}