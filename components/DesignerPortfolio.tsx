"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"
import {
  ChevronLeft,
  ChevronRight,
  Dribbble,
  Instagram,
  Linkedin,
  Mail,
  Maximize2,
  Menu,
  Play,
  X,
} from "lucide-react"
import type { SiteSettings } from "@/sanity/lib/queries"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type PortfolioItem = {
  id: number
  title: string
  src: string
  images: string[]
  category: string
  description: string
  tools: string[]
}

type Props = {
  data?: Record<string, PortfolioItem[]> | null
  settings?: SiteSettings | null
}

// ---------------------------------------------------------------------------
// Static fallback portfolio data
// ---------------------------------------------------------------------------
const fallbackPortfolioItems: Record<string, PortfolioItem[]> = {
  industrial: [
    {
      id: 1,
      title: "Cloud Simulation Lightning Test",
      src: "/Cloud-Simulation/Lightning-Test.mp4",
      images: [
        "/Cloud-Simulation/genesis-laboy-genesis-laboy-screenshot-2025-01-28-145434.png",
        "/Cloud-Simulation/genesis-laboy-genesis-laboy-screenshot-2025-01-28-145520.png",
        "/Cloud-Simulation/genesis-laboy-genesis-laboy-screenshot-2025-01-28-145541.png",
        "/Cloud-Simulation/genesis-laboy-screenshot-2025-02-03-123837.png",
        "/Cloud-Simulation/genesis-laboy-screenshot-2025-02-03-123917.png",
      ],
      category: "Technical Rendering",
      description:
        "High-fidelity cloud simulation and lightning interaction for aerospace safety analysis. The visualization accurately depicts electrical discharge patterns within turbulent cloud formations, aiding in the assessment of aircraft lightning strike risks.",
      tools: ["Blender", "KeyShot", "Adobe Photoshop", "Substance Painter"],
    },
    {
      id: 2,
      title: "SPI Borescopes (Recon & Epic Inspection Kits)",
      src: "/images/SPI Borescopes/New Website Images/Thumbnails/Borescope Inspection Renders.png",
      images: ["/images/SPI Borescopes/InspectionKit_TopView_SecurityBorderLawEnforcement.png"],
      category: "Product Visualization",
      description:
        "Product visualization and kit layout renders for borescope inspection systems. Emphasis on clean presentation, accurate proportions, and clear accessory callouts for marketing and documentation.",
      tools: ["KeyShot", "Adobe Photoshop", "Adobe Illustrator"],
    },
    {
      id: 3,
      title: "SPI Borescopes (Engine video)",
      src: "/images/SPI Borescopes/New Website Images/Thumbnails/Aircraft Turbine.png",
      images: ["https://vimeo.com/1156911569?fl=tl&fe=ec"],
      category: "Technical Rendering",
      description:
        "Motion-focused visualization demonstrating borescope inspection use-cases in an engine environment. Built for clarity, realism, and quick comprehension in sales and training contexts.",
      tools: ["Blender", "After Effects", "Premiere Pro"],
    },
    {
      id: 4,
      title: "International Space Station",
      src: "https://vimeo.com/1156911149?fl=tl&fe=ec",
      images: [
        "https://vimeo.com/1156911149?fl=tl&fe=ec",
        "/images/International-Space-Station/genesis-laboy-2-orig.png",
        "/images/International-Space-Station/genesis-laboy-3-orig.png",
        "/images/International-Space-Station/genesis-laboy-4-orig.png",
      ],
      category: "Technical Rendering",
      description:
        "Photorealistic rendering of the International Space Station with attention to material realism, lighting, and technical accuracy for presentation and outreach.",
      tools: ["Blender", "Octane Render", "Adobe Photoshop"],
    },
    {
      id: 5,
      title: "NASA Renders",
      src: "/images/SPI Borescopes/New Website Images/Thumbnails/Journey through The Galaxy.png",
      images: [
        "/images/NASA renders/Forces During Rocket Launch.mp4",
        "/images/NASA renders/Shrimp.mp4",
        "/images/NASA renders/WinstonInterviewCGAssets_ergometer.mp4",
        "/images/NASA renders/WinstonInterviewCGAssets_iceCream.mp4",
        "/images/NASA renders/WinstonInterviewCGAssets_spongeBath.mp4",
      ],
      category: "Product Visualization",
      description:
        "Technical renders for manufacturing automation and research concepts. Built for storytelling clarity, accuracy, and stakeholder-ready visuals.",
      tools: ["Cinema 4D", "Redshift", "Adobe After Effects"],
    },
  ],
  technical: [
    {
      id: 1,
      title: "3D Heart",
      src: "/images/SPI Borescopes/New Website Images/Thumbnails/Anatomical XR Model.png",
      images: [
        "https://vimeo.com/1156910619?fl=tl&fe=ec",
        "https://vimeo.com/1156910637?fl=tl&fe=ec",
      ],
      category: "Medical Visualization",
      description:
        "Anatomy-focused render exploring form, lighting, and material response for medical visualization and educational use.",
      tools: ["Blender", "Substance Painter", "Photoshop"],
    },
    {
      id: 2,
      title: "3D Scanning",
      src: "https://vimeo.com/1156910903?fl=tl&fe=ec",
      images: ["https://vimeo.com/1156910875?fl=tl&fe=ec"],
      category: "Medical Visualization",
      description:
        "3D scan interpretation and cleanup workflows translated into clear visuals for clinical, research, or presentation needs.",
      tools: ["RealityCapture", "Blender", "Photoshop"],
    },
    {
      id: 3,
      title: "EMG Data Vis",
      src: "https://vimeo.com/1156911063?fl=tl&fe=ec",
      images: [
        "/images/EMG-Data-Visualization/EMG%20Shader/genesis-laboy-info-1.png",
        "/images/EMG-Data-Visualization/EMG%20Shader/genesis-laboy-info-2.png",
        "https://vimeo.com/1156911080?fl=tl&fe=ec",
      ],
      category: "Medical Visualization",
      description:
        "Data-driven EMG visualization for communicating muscle activation patterns. Designed to be readable, technically grounded, and visually compelling.",
      tools: ["Blender", "KeyShot", "Adobe Illustrator"],
    },
    {
      id: 4,
      title: "Mocap Studies",
      src: "https://vimeo.com/1156990052?fl=tl&fe=ec",
      images: ["https://vimeo.com/1156990052?fl=tl&fe=ec"],
      category: "Medical Visualization",
      description:
        "Motion capture exploration for biomechanics and movement studies. Built to highlight motion, structure, and key anatomical/kinematic cues.",
      tools: ["MotionBuilder", "Blender", "After Effects"],
    },
    {
      id: 5,
      title: "Muscle Slicing App",
      src: "https://vimeo.com/1156911080?fl=tl&fe=ec",
      images: ["https://vimeo.com/1156911080?fl=tl&fe=ec"],
      category: "Medical Visualization",
      description:
        "UI/visual system concepts for interactive anatomy slicing and exploration—focused on clarity, hierarchy, and user comprehension.",
      tools: ["Figma", "After Effects", "Photoshop"],
    },
  ],
  brandingIndustrial: [
    {
      id: 1,
      title: "Cloud Simulation Lightning Test",
      src: "/Cloud-Simulation/genesis-laboy-genesis-laboy-screenshot-2025-01-28-145520.png",
      images: [
        "/Cloud-Simulation/genesis-laboy-genesis-laboy-screenshot-2025-01-28-145434.png",
        "/Cloud-Simulation/genesis-laboy-genesis-laboy-screenshot-2025-01-28-145520.png",
        "/Cloud-Simulation/genesis-laboy-genesis-laboy-screenshot-2025-01-28-145541.png",
        "/Cloud-Simulation/genesis-laboy-screenshot-2025-02-03-123837.png",
        "/Cloud-Simulation/genesis-laboy-screenshot-2025-02-03-123917.png",
      ],
      category: "Technical Rendering",
      description:
        "High-fidelity cloud simulation and lightning interaction for aerospace safety analysis.",
      tools: ["Blender", "KeyShot", "Adobe Photoshop", "Substance Painter"],
    },
    {
      id: 2,
      title: "Skeletons",
      src: "/images/Skeletons/genesis-laboy-skeleton-1.png",
      images: [
        "/images/Skeletons/genesis-laboy-skeleton-1.png",
        "/images/Skeletons/genesis-laboy-skeleton-2.png",
        "/images/Skeletons/skeleton houdini sim.mp4",
        "/images/Skeletons/Skeleton Pile layout.mp4",
        "/images/Skeletons/Skeleton Pile.mp4",
      ],
      category: "Concept Art",
      description:
        "Exploratory concept work focused on mood, composition, and narrative clarity—built for fast iteration and presentation-ready frames.",
      tools: ["Photoshop", "Blender"],
    },
    {
      id: 3,
      title: "CAF Postcard",
      src: "/images/CAF postcard/genesis-laboy-postcard-design-front.png",
      images: [
        "/images/CAF postcard/genesis-laboy-CAF-outro.mp4",
        "/images/CAF postcard/genesis-laboy-postcard.png",
      ],
      category: "Print / Layout",
      description:
        "Postcard and campaign collateral design with clean hierarchy, consistent typographic rhythm, and a strong visual anchor.",
      tools: ["Adobe InDesign", "Adobe Illustrator"],
    },
    {
      id: 4,
      title: "Boat and Kid",
      src: "/images/SPI Borescopes/New Website Images/Thumbnails/Hero Character and Props.png",
      images: [
        "/images/EMG-Data-Visualization/Boat and Kid/genesis-laboy-7-orig.png",
        "/images/EMG-Data-Visualization/Boat and Kid/genesis-laboy-andrew-wireframe.png",
        "/images/EMG-Data-Visualization/Boat and Kid/genesis-laboy-boat-wireframe.png",
      ],
      category: "Illustration",
      description:
        "Illustration set emphasizing readable storytelling, clear silhouettes, and purposeful detail for editorial or explainer formats.",
      tools: ["Adobe Illustrator", "Photoshop"],
    },
    {
      id: 5,
      title: "Materials",
      src: "/images/Materials/octopus/Tentacle_png.PNG",
      images: [
        "/images/Materials/octopus/Tentacle_png.PNG",
        "/images/Materials/octopus/Tentacles_Node Graph.png",
        "/images/Materials/rock/genesis-laboy-rocks-1.png",
        "/images/Materials/rock/genesis-laboy-rocks.png",
        "/images/Materials/rock/genesis-laboy-screenshot-2025-01-28-134538.png",
        "/images/Materials/sand/genesis-laboy-sand.png",
        "/images/Materials/sand/genesis-laboy-screenshot-2025-02-08-131221.png",
      ],
      category: "Lookdev / Materials",
      description:
        "Material studies and look-development experiments to improve realism and consistency across stills and motion.",
      tools: ["Substance Painter", "Blender", "Photoshop"],
    },
    {
      id: 6,
      title: "Pyro Texture Effect",
      src: "https://vimeo.com/1156911437?fl=tl&fe=ec",
      images: [
        "https://vimeo.com/1156911437?fl=tl&fe=ec",
        "https://vimeo.com/1156911460?fl=tl&fe=ec",
        "https://vimeo.com/1156911447?fl=tl&fe=ec",
      ],
      category: "VFX / Procedural",
      description:
        "Procedural texture and pyro-style effect explorations for cinematic motion and stylized technical storytelling.",
      tools: ["Houdini", "After Effects", "Photoshop"],
    },
    {
      id: 7,
      title: "Studio Packaging Concepts",
      src: "/images/Creative/studio-packaging.jpg",
      images: ["/images/Creative/studio-packaging.jpg"],
      category: "Brand Systems",
      description:
        "Packaging and brand-extension concepts designed to unify identity across touchpoints while staying clean and premium.",
      tools: ["Illustrator", "InDesign", "Figma"],
    },
  ],
}

// ---------------------------------------------------------------------------
// Media helpers
// ---------------------------------------------------------------------------
function isHttpUrl(src: string) {
  return /^https?:\/\//i.test(src || "")
}
function isSanityCdn(src: string) {
  return /(^|\/\/)cdn\.sanity\.io\//i.test(src || "")
}
function isVimeoUrl(src: string) {
  return /vimeo\.com/i.test(src || "")
}
function toVimeoEmbedUrl(url: string) {
  const match = (url || "").match(/vimeo\.com\/(?:video\/)?(\d+)/i)
  const id = match?.[1]
  return id ? `https://player.vimeo.com/video/${id}` : url
}
function isYouTubeUrl(src: string) {
  return /(?:youtube\.com|youtu\.be)/i.test(src || "")
}
function toYouTubeId(url: string) {
  const u = url || ""
  const match =
    u.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/i) ||
    u.match(/youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/|v\/)([A-Za-z0-9_-]{6,})/i)
  return match?.[1] ?? ""
}
/** Vimeo *or* YouTube — anything that has to render inside an iframe. */
function isEmbedUrl(src: string) {
  return isVimeoUrl(src) || isYouTubeUrl(src)
}
/** Self-hosted video file (mp4/webm/mov/m4v). */
function isFileVideo(src: string) {
  const s = (src || "").toLowerCase().split("?")[0].split("#")[0]
  return s.endsWith(".mp4") || s.endsWith(".webm") || s.endsWith(".mov") || s.endsWith(".m4v")
}
function isVideoSrc(src: string) {
  return isEmbedUrl(src) || isFileVideo(src)
}
/**
 * Build the iframe URL for a Vimeo or YouTube link.
 * "preview" = silent, looping, chrome-free background clip (cards)
 * "player"  = full player with controls (modal / lightbox)
 */
function embedSrc(url: string, mode: "preview" | "player") {
  if (isYouTubeUrl(url)) {
    const id = toYouTubeId(url)
    if (!id) return url
    const base = `https://www.youtube-nocookie.com/embed/${id}`
    return mode === "preview"
      ? `${base}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&disablekb=1&modestbranding=1&rel=0&playsinline=1`
      : `${base}?rel=0&modestbranding=1&playsinline=1`
  }
  const embed = toVimeoEmbedUrl(url)
  return mode === "preview"
    ? `${embed}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`
    : `${embed}?autoplay=0&loop=0&byline=0&title=0&dnt=1`
}
/**
 * The hero takes a bare Vimeo ID (legacy), a bare YouTube ID, or a full
 * Vimeo/YouTube URL, and returns a muted, looping background embed.
 */
function heroEmbedSrc(key: string) {
  const raw = (key || "").trim()
  if (!raw) return ""
  if (isEmbedUrl(raw)) return embedSrc(raw, "preview")
  if (/^\d+$/.test(raw)) return embedSrc(`https://vimeo.com/${raw}`, "preview")
  if (/^[A-Za-z0-9_-]{11}$/.test(raw)) return embedSrc(`https://www.youtube.com/watch?v=${raw}`, "preview")
  return embedSrc(`https://vimeo.com/${raw}`, "preview")
}

/** Free, instant poster frame for a YouTube link — no iframe needed. */
function youTubePoster(url: string) {
  const id = toYouTubeId(url)
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : ""
}

/**
 * Performance: Sanity serves originals at full resolution (often several MB).
 * Ask its CDN for a right-sized, auto-format (WebP/AVIF) copy instead.
 */
function sizedImageUrl(
  src: string,
  { width, height, quality = 72 }: { width?: number; height?: number; quality?: number },
) {
  if (!src || !isSanityCdn(src)) return src
  const [base, existing] = src.split("?")
  const params = new URLSearchParams(existing)
  if (width) params.set("w", String(width))
  if (height) params.set("h", String(height))
  params.set("fit", height ? "crop" : "max")
  params.set("q", String(quality))
  params.set("auto", "format")
  return `${base}?${params.toString()}`
}

/** Split a plain-text field into paragraphs (blank line *or* single newline). */
function toParagraphs(text?: string | null): string[] {
  if (!text) return []
  const byBlankLine = text.split(/\r?\n\s*\r?\n/).map((s) => s.trim()).filter(Boolean)
  if (byBlankLine.length > 1) return byBlankLine
  return text.split(/\r?\n+/).map((s) => s.trim()).filter(Boolean)
}

// ---------------------------------------------------------------------------
// SmartImage — remote URLs go out as plain <img> (already CDN-optimised),
// local files go through next/image.
// ---------------------------------------------------------------------------
function SmartImage({
  src,
  alt,
  width,
  height,
  className,
  sizes,
  priority = false,
}: {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
}) {
  const url = sizedImageUrl(src, { width, height })

  // Remote URLs are already CDN-sized, and without a known height we cannot give
  // next/image an honest aspect ratio — a plain <img> lets the browser use the
  // natural dimensions instead of reserving a wrong box.
  if (isHttpUrl(url) || !height) {
    return (
      <img
        src={url}
        alt={alt}
        className={className}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
      />
    )
  }
  return (
    <Image
      src={url || "/placeholder.svg"}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 900}
      sizes={sizes}
      className={className}
      {...(priority ? { priority: true } : { loading: "lazy" as const })}
    />
  )
}

// ---------------------------------------------------------------------------
// Small decorative bits
// ---------------------------------------------------------------------------
function Sparkle({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} style={style} fill="currentColor">
      <path d="M12 0c.6 4.9 2.3 7.4 6.6 8.4C14.3 9.5 12.6 12 12 17c-.6-5-2.3-7.5-6.6-8.6C9.7 7.4 11.4 4.9 12 0Z" />
      <path d="M12 24c-.4-3.3-1.5-5-4.4-5.6 2.9-.7 4-2.4 4.4-5.6.4 3.2 1.5 4.9 4.4 5.6-2.9.6-4 2.3-4.4 5.6Z" opacity=".55" />
    </svg>
  )
}

/** Soft light-blue background shapes. Purely decorative, never interactive. */
function Decor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <span
        className="absolute -left-32 top-[14%] hidden h-80 w-80 bg-[#75d0de]/12 sm:block"
        style={{ borderRadius: "58% 42% 47% 53% / 45% 52% 48% 55%" }}
      />
      <span
        className="absolute -right-28 top-[27%] h-72 w-72 bg-[#75d0de]/10"
        style={{ borderRadius: "42% 58% 61% 39% / 51% 44% 56% 49%" }}
      />
      <span className="absolute right-[12%] top-[38%] h-64 w-64 rounded-full bg-[#75d0de]/12 blur-3xl" />
      <span
        className="absolute -left-24 top-[56%] h-96 w-96 bg-[#75d0de]/10"
        style={{ borderRadius: "50% 50% 38% 62% / 55% 42% 58% 45%" }}
      />
      <span className="absolute left-[8%] top-[74%] h-56 w-56 rounded-full bg-[#75d0de]/12 blur-3xl" />
      <span
        className="absolute -right-24 top-[82%] hidden h-80 w-80 bg-[#75d0de]/10 sm:block"
        style={{ borderRadius: "60% 40% 44% 56% / 48% 55% 45% 52%" }}
      />
      <Sparkle className="absolute left-[5%] top-[24%] h-7 w-7 text-[#75d0de]/70" />
      <Sparkle className="absolute right-[7%] top-[49%] h-5 w-5 text-[#75d0de]/60" />
      <Sparkle className="absolute left-[10%] top-[67%] h-6 w-6 text-[#75d0de]/55" />
      <Sparkle className="absolute right-[14%] top-[88%] h-7 w-7 text-[#75d0de]/50" />
    </div>
  )
}

function PlayBadge() {
  return (
    <span className="pointer-events-none absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
      <Play className="h-3 w-3 fill-current" />
      Video
    </span>
  )
}

// ---------------------------------------------------------------------------
// MediaThumb — always square (comment #1)
// ---------------------------------------------------------------------------
function MediaThumb({ item }: { item: PortfolioItem }) {
  const src = item.src || ""
  const ytPoster = isYouTubeUrl(src) ? youTubePoster(src) : ""

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-black/5 transition-shadow duration-300 group-hover:shadow-[0_12px_32px_rgba(15,23,42,0.14)]">
      {ytPoster ? (
        <img
          src={ytPoster}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
      ) : isVimeoUrl(src) ? (
        // 16:9 iframe scaled up so it covers the square crop; clicks pass through to the card.
        <iframe
          src={embedSrc(src, "preview")}
          title={item.title}
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: "177.78%", height: "100%", border: 0 }}
        />
      ) : isFileVideo(src) ? (
        <video
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          onMouseEnter={(e) => {
            e.currentTarget.play().catch(() => {})
          }}
          onMouseLeave={(e) => {
            e.currentTarget.pause()
            e.currentTarget.currentTime = 0
          }}
        />
      ) : (
        <SmartImage
          src={src || "/placeholder.svg"}
          alt={item.title}
          width={700}
          height={700}
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 20rem"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
      )}

      {isVideoSrc(src) ? <PlayBadge /> : null}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Lightbox — full-screen image viewer (comment #7)
// ---------------------------------------------------------------------------
function Lightbox({
  images,
  index,
  title,
  onClose,
  onNavigate,
}: {
  images: string[]
  index: number
  title: string
  onClose: () => void
  onNavigate: (next: number) => void
}) {
  const count = images.length
  const src = images[index]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight" && count > 1) onNavigate((index + 1) % count)
      if (e.key === "ArrowLeft" && count > 1) onNavigate((index - 1 + count) % count)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [index, count, onClose, onNavigate])

  if (!src) return null

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/92 p-3 sm:p-8">
      <button aria-label="Close full screen" className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

      <img
        src={sizedImageUrl(src, { width: 2000, quality: 82 })}
        alt={`${title} — full screen`}
        className="relative max-h-[92vh] max-w-full select-none object-contain"
      />

      <button
        onClick={onClose}
        aria-label="Close full screen"
        className="absolute right-3 top-3 z-10 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      {count > 1 ? (
        <>
          <button
            onClick={() => onNavigate((index - 1 + count) % count)}
            aria-label="Previous image"
            className="absolute left-2 z-10 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:left-6 sm:p-3"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => onNavigate((index + 1) % count)}
            aria-label="Next image"
            className="absolute right-2 z-10 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:right-6 sm:p-3"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <span className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {index + 1} / {count}
          </span>
        </>
      ) : null}
    </div>
  )
}

// ---------------------------------------------------------------------------
// ProjectModal
// ---------------------------------------------------------------------------
function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: PortfolioItem | null
  isOpen: boolean
  onClose: () => void
}) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const scrollY = window.scrollY
    const prev = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflowY: document.body.style.overflowY,
    }
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = "0"
    document.body.style.right = "0"
    document.body.style.width = "100%"
    document.body.style.overflowY = "scroll"
    return () => {
      document.body.style.position = prev.position
      document.body.style.top = prev.top
      document.body.style.left = prev.left
      document.body.style.right = prev.right
      document.body.style.width = prev.width
      document.body.style.overflowY = prev.overflowY
      window.scrollTo(0, scrollY)
    }
  }, [isOpen])

  // Esc closes the modal — but only when no lightbox is stacked on top of it.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !lightboxSrc) onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, onClose, lightboxSrc])

  useEffect(() => {
    if (!isOpen) setLightboxSrc(null)
  }, [isOpen])

  /**
   * Comment #10 — the square thumbnail is *not* the hero any more.
   * The first gallery entry leads; the thumbnail is only a last resort.
   */
  const { heroSrc, rest, zoomable } = useMemo(() => {
    if (!project) return { heroSrc: "", rest: [] as string[], zoomable: [] as string[] }

    const gallery = (project.images ?? []).filter(Boolean)
    const ordered = gallery.length ? gallery : [project.src].filter(Boolean)

    const seen = new Set<string>()
    const unique = ordered.filter((s) => {
      if (seen.has(s)) return false
      seen.add(s)
      return true
    })

    return {
      heroSrc: unique[0] ?? "",
      rest: unique.slice(1),
      zoomable: unique.filter((s) => !isVideoSrc(s)),
    }
  }, [project])

  const lightboxIndex = lightboxSrc ? zoomable.indexOf(lightboxSrc) : -1

  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 z-[999]">
      <button aria-label="Close project" className="absolute inset-0 bg-gray-950/70 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-x-0 top-4 mx-auto w-[94vw] max-w-6xl sm:top-8">
        <div className="relative flex max-h-[88vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-gray-200 p-4 sm:p-6">
            <div className="min-w-0">
              {/* Comment #7 — larger project title */}
              <h3 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl md:text-4xl">
                {project.title}
              </h3>
              {project.category ? (
                <p className="mt-1.5 text-sm font-medium uppercase tracking-wide text-[#4aa9ba] sm:text-base">
                  {project.category}
                </p>
              ) : null}
              {project.tools?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#75d0de]/40 bg-[#75d0de]/10 px-2.5 py-1 text-xs font-medium text-gray-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0 rounded-full">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto overscroll-contain p-4 sm:p-6">
            {project.description ? (
              <p className="mb-5 max-w-3xl leading-relaxed text-gray-700">{project.description}</p>
            ) : null}

            {heroSrc ? (
              <div className="mb-5 overflow-hidden rounded-xl bg-gray-50 ring-1 ring-black/5">
                {isEmbedUrl(heroSrc) ? (
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      src={embedSrc(heroSrc, "player")}
                      className="h-full w-full"
                      style={{ border: 0 }}
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={`${project.title} video`}
                    />
                  </div>
                ) : isFileVideo(heroSrc) ? (
                  <video
                    src={heroSrc}
                    controls
                    playsInline
                    preload="metadata"
                    className="max-h-[62vh] w-full bg-black object-contain"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setLightboxSrc(heroSrc)}
                    aria-label="View image full screen"
                    className="group/zoom relative block w-full cursor-zoom-in"
                  >
                    <img
                      src={sizedImageUrl(heroSrc, { width: 1600, quality: 78 })}
                      alt={`${project.title} — main image`}
                      className="mx-auto block max-h-[62vh] w-full object-contain"
                      decoding="async"
                    />
                    <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-gray-950/60 p-2 text-white opacity-0 transition-opacity group-hover/zoom:opacity-100">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </button>
                )}
              </div>
            ) : null}

            {rest.length ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {rest.map((src, idx) => (
                  <div
                    key={`${src}-${idx}`}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 ring-1 ring-black/5"
                  >
                    {isEmbedUrl(src) ? (
                      <iframe
                        src={embedSrc(src, "player")}
                        className="absolute inset-0 h-full w-full"
                        style={{ border: 0 }}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        title={`${project.title} — video ${idx + 2}`}
                      />
                    ) : isFileVideo(src) ? (
                      <video
                        src={src}
                        controls
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 h-full w-full bg-black object-contain"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setLightboxSrc(src)}
                        aria-label={`View image ${idx + 2} full screen`}
                        className="group/zoom absolute inset-0 cursor-zoom-in"
                      >
                        <img
                          src={sizedImageUrl(src, { width: 1000, quality: 74 })}
                          alt={`${project.title} — image ${idx + 2}`}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/zoom:scale-[1.03]"
                        />
                        <span className="pointer-events-none absolute right-2.5 top-2.5 rounded-full bg-gray-950/60 p-2 text-white opacity-0 transition-opacity group-hover/zoom:opacity-100">
                          <Maximize2 className="h-4 w-4" />
                        </span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {lightboxIndex >= 0 ? (
        <Lightbox
          images={zoomable}
          index={lightboxIndex}
          title={project.title}
          onClose={() => setLightboxSrc(null)}
          onNavigate={(next) => setLightboxSrc(zoomable[next] ?? null)}
        />
      ) : null}
    </div>
  )
}

// ---------------------------------------------------------------------------
// CarouselRow — square cards, keyboard accessible, with scroll controls
// ---------------------------------------------------------------------------
function CarouselRow({
  heading,
  items,
  onSelect,
}: {
  heading: string
  items: PortfolioItem[]
  onSelect: (item: PortfolioItem) => void
}) {
  const scroller = useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const syncArrows = useCallback(() => {
    const el = scroller.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }, [])

  useEffect(() => {
    syncArrows()
    const el = scroller.current
    if (!el) return
    window.addEventListener("resize", syncArrows)
    return () => window.removeEventListener("resize", syncArrows)
  }, [syncArrows, items.length])

  const nudge = (dir: 1 | -1) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 280), behavior: "smooth" })
  }

  if (!items.length) return null

  return (
    <div>
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {heading}
          <span className="mt-2 block h-1 w-12 rounded-full bg-[#75d0de]" />
        </h2>
        <div className="hidden shrink-0 gap-2 md:flex">
          <button
            type="button"
            onClick={() => nudge(-1)}
            disabled={!canScrollLeft}
            aria-label={`Scroll ${heading} left`}
            className="rounded-full border border-gray-200 bg-white p-2 text-gray-700 transition-all hover:border-[#75d0de] hover:text-[#4aa9ba] disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            disabled={!canScrollRight}
            aria-label={`Scroll ${heading} right`}
            className="rounded-full border border-gray-200 bg-white p-2 text-gray-700 transition-all hover:border-[#75d0de] hover:text-[#4aa9ba] disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        onScroll={syncArrows}
        className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 -mb-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:gap-6"
      >
        {items.map((item) => (
          // A div rather than a <button>: cards can contain a video iframe,
          // which is not valid inside a button. Keyboard support is wired up by hand.
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            aria-label={`Open project: ${item.title}`}
            onClick={() => onSelect(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onSelect(item)
              }
            }}
            className="group w-64 flex-shrink-0 cursor-pointer snap-start rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-[#75d0de] focus-visible:ring-offset-4 sm:w-72 md:w-80"
          >
            <MediaThumb item={item} />
            <h3 className="mt-3 text-base font-semibold transition-colors group-hover:text-[#4aa9ba]">
              {item.title}
            </h3>
            {item.category ? <p className="text-sm text-gray-600">{item.category}</p> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// LogoMarquee
// ---------------------------------------------------------------------------
function LogoMarquee({ logos }: { logos?: { alt: string; logoUrl: string }[] }) {
  const fallbackLogos = [
    { alt: "Kennedy Space Center", logoUrl: "/images/SPI Borescopes/Client logos/KSC_logo.png" },
    { alt: "Nagoya University Medical School", logoUrl: "/images/SPI Borescopes/Client logos/Nagoya Uni Med School logo.png" },
    { alt: "SPI Borescopes", logoUrl: "/images/SPI Borescopes/Client logos/SPI logo.png" },
    { alt: "TG", logoUrl: "/images/SPI Borescopes/Client logos/TG_logo.png" },
    { alt: "UCF SVAD", logoUrl: "/images/SPI Borescopes/Client logos/UCF SVAD logo.jpg" },
  ]

  const items = (logos?.length ? logos : fallbackLogos).filter((l) => l?.logoUrl)
  if (!items.length) return null
  const row = [...items, ...items]

  return (
    <section aria-label="Partners" className="pb-4 pt-4 sm:pb-6 sm:pt-6">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-6 text-center sm:mb-7">
          <h3 className="text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
            Organizations we&apos;ve partnered with
          </h3>
        </div>
        <div className="relative overflow-hidden rounded-2xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
          <div className="marquee">
            <div className="marquee__inner">
              {row.map((l, idx) => (
                <div key={`${l.alt}-${idx}`} className="marquee__item">
                  <SmartImage
                    src={l.logoUrl}
                    alt={l.alt}
                    width={300}
                    className="h-9 w-auto opacity-75 transition-opacity hover:opacity-100 sm:h-10 md:h-11"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .marquee { overflow: hidden; }
        .marquee__inner { display: flex; align-items: center; width: max-content; gap: 2.5rem; padding: 0.5rem 0; animation: marquee 22s linear infinite; will-change: transform; }
        .marquee__item { flex: 0 0 auto; display: flex; align-items: center; justify-content: center; padding: 0 0.5rem; }
        .marquee:hover .marquee__inner { animation-play-state: paused; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .marquee__inner { animation: none !important; transform: none !important; } }
      `}</style>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Default service cards
// ---------------------------------------------------------------------------
const defaultServices: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Product Renderings & Design",
    body: "Photorealistic marketing visuals, product visualization, and high-quality content creation for industrial, aerospace, and consumer products.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    ),
  },
  {
    title: "Scientific Visualization",
    body: "Data-driven visuals, 3D scanning interpretation, scientific communication, and digital twin representation.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    ),
  },
  {
    title: "Immersive Technologies",
    body: "Real-time and interactive experiences—AR/VR, simulation-ready assets, and immersive demos that help teams explore complex systems with clarity.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7zm3 10h10M8 9h2m4 0h2" />
    ),
  },
  {
    title: "Serious Games & Simulations",
    body: "Interactive training simulations and serious games designed for engineering, safety, and decision-making.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a4 4 0 00-4 4v2a4 4 0 004 4m0-10a4 4 0 014 4v2a4 4 0 01-4 4m-6 2h12" />
    ),
  },
]

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function DesignerPortfolio({ data, settings }: Props) {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const portfolioItems = data ?? fallbackPortfolioItems

  // Hero settings
  const heroHeadingLine1 = settings?.heroHeadingLine1 ?? "Precision in Design,"
  const heroHeadingLine2 = settings?.heroHeadingLine2 ?? "Innovation in Vision."
  const heroSubtitle =
    settings?.heroSubtitle ??
    "Technical visualization and rendering specialist for aerospace, industrial, and engineering projects."
  const heroVideoId = settings?.heroVideoId ?? "1148476066"

  // About settings
  const aboutHeading = settings?.aboutHeading ?? "About Kraken Labs"
  const whatWeDoHeading = settings?.whatWeDoHeading ?? "What We Do"
  const whatWeDoParagraphs = toParagraphs(settings?.whatWeDoBody)
  const whoIAmHeading = settings?.whoIAmHeading ?? "Who I Am"
  const whoIAmParagraphs = toParagraphs(settings?.whoIAmBody)
  // Comment #4 — the first About slot is now the company logo, the second is Genesis' headshot.
  const companyLogoUrl = settings?.aboutLogoUrl ?? "/images/kraken-20labs-20logo-transparent.png"
  const headshotUrl = settings?.aboutHeadshotUrl ?? "/images/glaboy-headshot-1.jpg"

  // Contact settings
  const contactHeading = settings?.contactHeading ?? "Let's Work Together"
  const contactSubtitle =
    settings?.contactSubtitle ?? "Have a project in mind or just want to say hello? I'd love to hear from you."
  const emailAddress = settings?.emailAddress ?? "contact@krakenlabs.design"
  const linkedinUrl = settings?.linkedinUrl ?? "#"
  const dribbbleUrl = settings?.dribbbleUrl ?? "#"
  const instagramUrl = settings?.instagramUrl ?? "#"

  // Services
  const servicesHeading = settings?.servicesHeading ?? "Creative Services"
  const services = settings?.services ?? null

  // Partner logos
  const partnerLogos = settings?.partnerLogos ?? undefined

  const navLinks = [
    { href: "#portfolio", label: "Portfolio" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <div className="relative z-0 min-h-screen overflow-x-hidden bg-white font-sans text-gray-950">
      {/* Comment #9 — soft light-blue decorative shapes */}
      <Decor />

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white/85 backdrop-blur-md">
          <div className="container mx-auto flex items-center justify-between p-4 sm:p-5">
            <Link href="#" className="flex items-center rounded-lg p-1 -m-1" aria-label="Kraken Labs — home">
              <Image
                src="/images/kraken-20labs-20logo-transparent.png"
                alt="Kraken Labs"
                width={240}
                height={60}
                priority
                className="h-11 w-auto sm:h-12"
              />
            </Link>

            {/* Comment #8 — generous hit areas, not just the text */}
            <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-4 py-2.5 transition-colors hover:bg-[#75d0de]/12 hover:text-[#3f9aab] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#75d0de]"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="#contact"
                className="ml-2 rounded-full bg-gray-950 px-5 py-2.5 text-white transition-colors hover:bg-[#4aa9ba] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#75d0de] focus-visible:ring-offset-2"
              >
                Start a project
              </Link>
            </nav>

            <Button
              className="md:hidden"
              variant="ghost"
              size="icon"
              onClick={() => setMobileNavOpen((v) => !v)}
              aria-expanded={mobileNavOpen}
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            >
              {mobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {mobileNavOpen ? (
            <nav className="border-t border-gray-200 bg-white px-4 pb-3 pt-1 md:hidden">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="block rounded-lg px-3 py-3.5 text-base font-medium transition-colors hover:bg-[#75d0de]/12 hover:text-[#3f9aab]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </header>

        {/* Hero */}
        <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-10 mt-0 flex h-[clamp(420px,62vh,560px)] w-screen items-center justify-center overflow-hidden text-center sm:mb-16 sm:h-[85vh] sm:min-h-[600px]">
          <iframe
            src={heroEmbedSrc(heroVideoId)}
            allow="autoplay; fullscreen"
            title="Showreel"
            style={{ pointerEvents: "none", border: 0 }}
            className="absolute left-1/2 top-1/2 -z-20 h-[56.25vw] min-h-full w-[155vh] min-w-full -translate-x-1/2 -translate-y-1/2 sm:w-[165vh] lg:w-[135vh] xl:w-[125vh]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
          <div className="relative z-10 px-4">
            <h1 className="mx-auto max-w-[90%] text-3xl font-extrabold tracking-tighter text-white sm:max-w-none sm:text-6xl lg:text-7xl">
              {heroHeadingLine1}
              <br />
              <span className="text-[#75d0de]">{heroHeadingLine2}</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base text-gray-200 sm:mt-4 sm:text-xl">{heroSubtitle}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8">
              <Link
                href="#portfolio"
                className="rounded-full bg-[#75d0de] px-6 py-3 text-sm font-semibold text-gray-950 transition-transform hover:-translate-y-0.5 hover:bg-[#8fdbe7] sm:text-base"
              >
                View the work
              </Link>
              <Link
                href="#contact"
                className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15 sm:text-base"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </section>

        <main className="container mx-auto px-4 py-8 sm:px-6 sm:py-10">
          {/* Portfolio — every thumbnail square (comment #1) */}
          <section id="portfolio" className="mb-14 space-y-12 sm:mb-16 sm:space-y-14">
            <CarouselRow
              heading="Industrial & Aerospace"
              items={portfolioItems.industrial ?? []}
              onSelect={setSelectedProject}
            />
            <CarouselRow
              heading="Medical Visualization"
              items={portfolioItems.technical ?? []}
              onSelect={setSelectedProject}
            />
            <CarouselRow
              heading="Creative Industries"
              items={portfolioItems.brandingIndustrial ?? []}
              onSelect={setSelectedProject}
            />
          </section>

          {/* Services */}
          <section className="pb-10 pt-10 sm:pb-14 sm:pt-14 md:pb-16 md:pt-16">
            <div className="container mx-auto max-w-6xl px-5 sm:px-6">
              {/* Comment #6 — heading in the brand blue */}
              <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-[#75d0de] sm:mb-12 sm:text-4xl">
                {servicesHeading}
              </h2>
              <div className="grid grid-cols-1 justify-items-center gap-6 sm:gap-7 md:grid-cols-4 md:gap-8">
                {services?.length
                  ? services.map((s, i) => (
                      <div
                        key={i}
                        className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#75d0de]/50 hover:shadow-[0_12px_28px_rgba(0,0,0,0.09)] sm:p-8"
                      >
                        <h3 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">{s.title}</h3>
                        <p className="text-base leading-relaxed text-gray-700">{s.body}</p>
                      </div>
                    ))
                  : defaultServices.map((s) => (
                      <div
                        key={s.title}
                        className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#75d0de]/50 hover:shadow-[0_12px_28px_rgba(0,0,0,0.09)] sm:p-8"
                      >
                        <div className="mb-4 inline-flex rounded-xl bg-[#75d0de]/12 p-2.5 text-[#4aa9ba]">
                          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {s.icon}
                          </svg>
                        </div>
                        <h3 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">{s.title}</h3>
                        <p className="text-base leading-relaxed text-gray-700">{s.body}</p>
                      </div>
                    ))}
              </div>
            </div>
          </section>

          {/* About */}
          <section id="about" className="pb-10 pt-10 sm:pb-14 sm:pt-14 md:pb-16 md:pt-16">
            <div className="container mx-auto max-w-5xl space-y-10 px-5 sm:px-6">
              <h2 className="text-center text-3xl font-bold tracking-tight text-[#75d0de] sm:text-4xl">
                {aboutHeading}
              </h2>

              <div className="grid items-center gap-6 sm:gap-8 md:grid-cols-2 md:gap-12">
                <div className="space-y-4 text-base leading-relaxed text-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{whatWeDoHeading}</h3>
                  {whatWeDoParagraphs.length ? (
                    whatWeDoParagraphs.map((para, i) => <p key={i}>{para}</p>)
                  ) : (
                    <>
                      <p>
                        At Kraken Labs, we create high-fidelity technical visualizations that transform complex concepts into clear, compelling imagery. With 8+ years of experience, we specialize in producing photorealistic renders for aerospace, industrial, and medical visualization clients who require both technical accuracy and strong visual impact.
                      </p>
                      <p>
                        Our work bridges engineering and design—turning technical specifications into visuals used for documentation, stakeholder presentations, marketing materials, and public outreach. Every project meets the rigorous standards of organizations like NASA while maintaining a polished, modern design aesthetic.
                      </p>
                    </>
                  )}
                </div>
                <div className="ml-auto flex w-full max-w-md items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] sm:p-10">
                  <SmartImage
                    src={companyLogoUrl}
                    alt="Kraken Labs"
                    width={800}
                    sizes="(max-width: 768px) 80vw, 28rem"
                    className="h-auto w-full max-w-[20rem] object-contain"
                  />
                </div>
              </div>

              <div className="grid items-start gap-6 sm:gap-8 md:grid-cols-2 md:gap-12">
                <div className="order-2 space-y-4 md:order-1">
                  <div className="w-full max-w-md overflow-hidden rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
                    <SmartImage
                      src={headshotUrl}
                      alt="Genesis Laboy, founder of Kraken Labs"
                      width={800}
                      height={800}
                      sizes="(max-width: 768px) 90vw, 28rem"
                      className="aspect-square w-full object-cover"
                    />
                  </div>
                </div>
                <div className="order-1 space-y-4 text-base leading-relaxed text-gray-700 md:order-2">
                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{whoIAmHeading}</h3>
                  {/* Comment #5 — paragraphs are split out properly now */}
                  {whoIAmParagraphs.length ? (
                    whoIAmParagraphs.map((para, i) => <p key={i}>{para}</p>)
                  ) : (
                    <>
                      <p>
                        I&apos;m Genesis Laboy, founder of Kraken Labs. I&apos;m a detail-oriented technical artist passionate about making complex ideas accessible through design. I started my company to support the ever-growing need for 3D visualization in the simulation and training capital of the world—and my longtime home—Orlando, FL.
                      </p>
                      <p>
                        Using industry-leading software, my approach blends technical precision with creative problem-solving to produce visuals that inform, persuade, and inspire.
                      </p>
                      <p>
                        When I&apos;m not creating renders or refining technical documentation, you&apos;ll find me sketching, exploring new tools, and chasing the details that make a visualization click.
                      </p>
                    </>
                  )}
                </div>
              </div>

              <LogoMarquee logos={partnerLogos} />
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="pb-14 pt-6 text-center sm:pb-20 sm:pt-8 md:pb-24 md:pt-10">
            <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-[#75d0de] sm:mb-6 sm:text-4xl">
              {contactHeading}
            </h2>
            <p className="mx-auto mb-8 max-w-xl px-4 text-gray-600 sm:mb-10">{contactSubtitle}</p>
            <div className="mx-auto max-w-2xl">
              <ContactForm />
            </div>
            <div className="mt-8 flex justify-center gap-2 sm:mt-10 sm:gap-4">
              <Link
                href={`mailto:${emailAddress}`}
                className="rounded-xl p-3 text-gray-600 transition-colors hover:bg-[#75d0de]/12 hover:text-[#4aa9ba]"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </Link>
              <Link
                href={linkedinUrl}
                className="rounded-xl p-3 text-gray-600 transition-colors hover:bg-[#75d0de]/12 hover:text-[#4aa9ba]"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href={dribbbleUrl}
                className="rounded-xl p-3 text-gray-600 transition-colors hover:bg-[#75d0de]/12 hover:text-[#4aa9ba]"
              >
                <Dribbble className="h-6 w-6" />
                <span className="sr-only">Dribbble</span>
              </Link>
              <Link
                href={instagramUrl}
                className="rounded-xl p-3 text-gray-600 transition-colors hover:bg-[#75d0de]/12 hover:text-[#4aa9ba]"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </section>
        </main>

        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <footer className="border-t border-gray-100 py-8 text-center text-gray-500 sm:py-10">
          <div className="container mx-auto px-6">
            <p>&copy; {new Date().getFullYear()} Kraken Labs. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
