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
// ----------------------A-----------------------------------------------------
type SanityProject = {
  _id: string
  title: string
  section: string        // "industrial" | "technical" | "brandingIndustrial"
  category: string
  description: string
  tools: string[]
  videoKey?: string      // Vimeo ID or full URL stored in Sanity
  thumbnailUrl?: string
  galleryUrls?: string[]
}

// ---------------------------------------------------------------------------
// Helper: turn a videoKey into the full Vimeo page URL the component expects
// ---------------------------------------------------------------------------
function toVimeoUrl(key?: string): string {
  if (!key) return ""
  if (/^https?:\/\//i.test(key)) return key          // already a full URL
  if (/^\d+$/.test(key.trim())) return `https://vimeo.com/${key.trim()}` // bare ID
  return key
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

    // Group by section key
    const grouped: Record<string, PortfolioItem[]> = {}

    projects.forEach((project, idx) => {
      const section = project.section ?? "industrial"
      if (!grouped[section]) grouped[section] = []

      const vimeoUrl = toVimeoUrl(project.videoKey)

      // src: prefer thumbnail image, fall back to vimeo URL
      const src = project.thumbnailUrl ?? vimeoUrl

      // images: vimeo first (hero video), then gallery stills
      const images: string[] = [
        ...(vimeoUrl ? [vimeoUrl] : []),
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
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    heroHeadingLine1,
    heroHeadingLine2,
    heroSubtitle,
    heroVideoId,
    whatWeDoHeading,
    whoIAmHeading,
    whoIAmBody,
    "headshotUrl": headshot.asset->url,
    "cherryPhotoUrl": cherryPhoto.asset->url,
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
  whatWeDoHeading?: string
  whoIAmHeading?: string
  whoIAmBody?: string
  headshotUrl?: string
  cherryPhotoUrl?: string
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