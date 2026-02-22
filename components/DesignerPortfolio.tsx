"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"
import { Mail, Linkedin, Dribbble, Instagram, X } from "lucide-react"
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
      src: "images/SPI Borescopes/New Website Images/Thumbnails/Borescope Inspection Renders.png",
      images: ["/images/SPI Borescopes/InspectionKit_TopView_SecurityBorderLawEnforcement.png"],
      category: "Product Visualization",
      description:
        "Product visualization and kit layout renders for borescope inspection systems. Emphasis on clean presentation, accurate proportions, and clear accessory callouts for marketing and documentation.",
      tools: ["KeyShot", "Adobe Photoshop", "Adobe Illustrator"],
    },
    {
      id: 3,
      title: "SPI Borescopes (Engine video)",
      src: "images/SPI Borescopes/New Website Images/Thumbnails/Aircraft Turbine.png",
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
      src: "images/SPI Borescopes/New Website Images/Thumbnails/Anatomical XR Model.png",
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
function isVimeoUrl(src: string) {
  return /vimeo\.com/i.test(src || "")
}
function toVimeoEmbedUrl(url: string) {
  const match = (url || "").match(/vimeo\.com\/(?:video\/)?(\d+)/i)
  const id = match?.[1]
  return id ? `https://player.vimeo.com/video/${id}` : url
}
function isVideoSrc(src: string) {
  if (isVimeoUrl(src)) return true
  const s = (src || "").toLowerCase().split("?")[0].split("#")[0]
  return s.endsWith(".mp4") || s.endsWith(".webm") || s.endsWith(".mov") || s.endsWith(".m4v")
}

// ---------------------------------------------------------------------------
// ImgOrNextImage
// ---------------------------------------------------------------------------
function ImgOrNextImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}) {
  if (isHttpUrl(src)) {
    return <img src={src} alt={alt} className={className} loading="lazy" />
  }
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 900}
      className={className}
    />
  )
}

// ---------------------------------------------------------------------------
// MediaThumb
// ---------------------------------------------------------------------------
function MediaThumb({
  item,
  ratioClass,
  width,
  height,
}: {
  item: PortfolioItem
  ratioClass: string
  width: number
  height: number
}) {
  return (
    <div className="overflow-hidden rounded-lg bg-black">
      {isVimeoUrl(item.src) ? (
        <div className={`${ratioClass} w-full bg-black`}>
          <iframe
            src={`${toVimeoEmbedUrl(item.src)}?background=1&autoplay=0&loop=1&byline=0&title=0&muted=1`}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            loading="lazy"
            title={item.title}
          />
        </div>
      ) : isVideoSrc(item.src) ? (
        <video
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          className={`${ratioClass} w-full h-full object-cover group-hover:scale-105 transition-transform duration-300`}
          onMouseEnter={(e) => { e.currentTarget.play().catch(() => {}) }}
          onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0 }}
        />
      ) : (
        <ImgOrNextImage
          src={item.src || "/placeholder.svg"}
          alt={item.title}
          width={width}
          height={height}
          className={`${ratioClass} w-full h-full object-cover group-hover:scale-105 transition-transform duration-300`}
        />
      )}
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
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.position = prev.position
      document.body.style.top = prev.top
      document.body.style.left = prev.left
      document.body.style.right = prev.right
      document.body.style.width = prev.width
      document.body.style.overflowY = prev.overflowY
      window.scrollTo(0, scrollY)
    }
  }, [isOpen, onClose])

  const { heroSrc, rest } = useMemo(() => {
    if (!project) return { heroSrc: "", rest: [] as string[] }
    const all = [project.src, ...(project.images ?? [])].filter(Boolean)
    const seen = new Set<string>()
    const unique = all.filter((s) => { if (seen.has(s)) return false; seen.add(s); return true })
    return { heroSrc: unique[0] ?? "", rest: unique.slice(1) }
  }, [project])

  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 z-[999]">
      <button aria-label="Close modal" className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute inset-x-0 top-4 sm:top-8 mx-auto w-[94vw] max-w-6xl">
        <div className="relative rounded-2xl bg-white shadow-2xl overflow-hidden max-h-[88vh] flex flex-col">
          <div className="flex items-start justify-between gap-4 p-4 sm:p-6 border-b border-gray-200 shrink-0">
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-gray-950 truncate">{project.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{project.category}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tools.map((t) => (
                  <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200 text-gray-700">{t}</span>
                ))}
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain">
            <p className="text-gray-700 leading-relaxed mb-5">{project.description}</p>
            {heroSrc ? (
              <div className="rounded-xl overflow-hidden bg-black mb-5">
                {isVimeoUrl(heroSrc) ? (
                  <div className="aspect-video w-full">
                    <iframe
                      src={`${toVimeoEmbedUrl(heroSrc)}?autoplay=0&loop=0&byline=0&title=0`}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      title={`${project.title} video`}
                    />
                  </div>
                ) : isVideoSrc(heroSrc) ? (
                  <video src={heroSrc} controls playsInline preload="metadata" className="w-full h-[40vh] sm:h-[55vh] max-h-[62vh] object-contain bg-black" />
                ) : (
                  <div className="relative w-full h-[40vh] sm:h-[55vh] max-h-[62vh] bg-black">
                    {isHttpUrl(heroSrc) ? (
                      <img src={heroSrc} alt={`${project.title} - hero`} className="w-full h-full object-contain" />
                    ) : (
                      <Image src={heroSrc} alt={`${project.title} - hero`} fill sizes="94vw" className="object-contain" />
                    )}
                  </div>
                )}
              </div>
            ) : null}
            {rest.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rest.map((src, idx) => (
                  <div key={`${src}-${idx}`} className="relative overflow-hidden rounded-xl bg-black aspect-[4/3] sm:aspect-video">
                    {isVimeoUrl(src) ? (
                      <iframe src={`${toVimeoEmbedUrl(src)}?autoplay=0&loop=0&byline=0&title=0`} className="absolute inset-0 w-full h-full" allow="autoplay; fullscreen; picture-in-picture" loading="lazy" title={`${project.title} - vimeo-${idx + 2}`} />
                    ) : isVideoSrc(src) ? (
                      <video src={src} controls playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" />
                    ) : isHttpUrl(src) ? (
                      <img src={src} alt={`${project.title} - ${idx + 2}`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <Image src={src} alt={`${project.title} - ${idx + 2}`} fill sizes="(max-width: 768px) 94vw, 50vw" className="object-cover" />
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// LogoMarquee
// ---------------------------------------------------------------------------
function LogoMarquee({ logos }: { logos?: { alt: string; logoUrl: string }[] }) {
  const fallbackLogos = [
    { alt: "Partner Logo 1", logoUrl: "/images/SPI Borescopes/Client logos/KSC_logo.png?height=64&width=180" },
    { alt: "Partner Logo 2", logoUrl: "/images/SPI Borescopes/Client logos/Nagoya Uni Med School logo.png?height=64&width=180" },
    { alt: "Partner Logo 3", logoUrl: "/images/SPI Borescopes/Client logos/SPI logo.png?height=64&width=180" },
    { alt: "Partner Logo 4", logoUrl: "/images/SPI Borescopes/Client logos/TG_logo.png?height=64&width=180" },
    { alt: "Partner Logo 5", logoUrl: "/images/SPI Borescopes/Client logos/UCF SVAD logo.jpg?height=64&width=180" },
  ]

  const items = logos?.length ? logos : fallbackLogos
  const row = [...items, ...items]

  return (
    <section aria-label="Partners" className="bg-white pt-4 pb-4 sm:pt-6 sm:pb-6">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-7">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-900">
            Organizations we&apos;ve partnered with
          </h3>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-white">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="marquee">
            <div className="marquee__inner">
              {row.map((l, idx) => (
                <div key={`${l.alt}-${idx}`} className="marquee__item">
                  <Image
                    src={l.logoUrl}
                    alt={l.alt}
                    width={180}
                    height={64}
                    className="h-9 sm:h-10 md:h-11 w-auto opacity-80 hover:opacity-100 transition-opacity"
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
// Main component
// ---------------------------------------------------------------------------
export default function DesignerPortfolio({ data, settings }: Props) {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null)

  const portfolioItems = data ?? fallbackPortfolioItems

  // Hero settings
  const heroHeadingLine1 = settings?.heroHeadingLine1 ?? "Precision in Design,"
  const heroHeadingLine2 = settings?.heroHeadingLine2 ?? "Innovation in Vision."
  const heroSubtitle = settings?.heroSubtitle ?? "Technical visualization and rendering specialist for aerospace, industrial, and engineering projects."
  const heroVideoId = settings?.heroVideoId ?? "1148476066"

  // About settings
  const whatWeDoHeading = settings?.whatWeDoHeading ?? "What We Do"
  const whatWeDoBody = settings?.whatWeDoBody ?? null
  const whoIAmHeading = settings?.whoIAmHeading ?? "Who I Am"
  const whoIAmBody = settings?.whoIAmBody ?? null
  const headshotUrl = settings?.headshotUrl ?? "/images/glaboy-headshot-1.jpg"
  const cherryPhotoUrl = settings?.cherryPhotoUrl ?? "/images/cherry-headshot.jpg"

  // Contact settings
  const contactHeading = settings?.contactHeading ?? "Let's Work Together"
  const contactSubtitle = settings?.contactSubtitle ?? "Have a project in mind or just want to say hello? I'd love to hear from you."
  const emailAddress = settings?.emailAddress ?? "contact@krakenlabs.design"
  const linkedinUrl = settings?.linkedinUrl ?? "#"
  const dribbbleUrl = settings?.dribbbleUrl ?? "#"
  const instagramUrl = settings?.instagramUrl ?? "#"

  // Services
  const servicesHeading = settings?.servicesHeading ?? "Creative Services"
  const services = settings?.services ?? null

  // Partner logos
  const partnerLogos = settings?.partnerLogos ?? undefined

  return (
    <div className="bg-white text-gray-950 min-h-screen font-sans relative z-0 overflow-x-hidden">
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-30 w-full p-4 sm:p-6 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="container mx-auto flex items-center justify-between">
            <Link href="#" className="flex items-center">
              <Image
                src="/images/kraken-20labs-20logo-transparent.png"
                alt="Kraken Labs"
                width={240}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link href="#portfolio" className="hover:text-[#75d0de] transition-colors">Portfolio</Link>
              <Link href="#about" className="hover:text-[#75d0de] transition-colors">About</Link>
              <Link href="#contact" className="hover:text-[#75d0de] transition-colors">Contact</Link>
            </nav>
            <Button className="md:hidden" variant="ghost" size="icon">
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </header>

        {/* Hero */}
        <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden flex items-center justify-center text-center mt-0 mb-10 sm:mb-16 h-[clamp(420px,62vh,560px)] sm:h-[85vh] sm:min-h-[600px]">
          <iframe
            src={`https://player.vimeo.com/video/${heroVideoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
            allow="autoplay; fullscreen"
            style={{ pointerEvents: "none" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[155vh] h-[56.25vw] sm:w-[165vh] lg:w-[135vh] xl:w-[125vh] min-w-full min-h-full -z-20"
          />
          <div className="absolute inset-0 bg-black/50 -z-10" />
          <div className="relative z-10 px-4">
            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter max-w-[90%] sm:max-w-none mx-auto text-white">
              {heroHeadingLine1}
              <br />
              <span className="text-[#75d0de]">{heroHeadingLine2}</span>
            </h1>
            <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-gray-200 text-base sm:text-xl">
              {heroSubtitle}
            </p>
          </div>
        </section>

        <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-10">
          {/* Portfolio */}
          <section id="portfolio" className="space-y-12 sm:space-y-14 mb-14 sm:mb-16">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Industrial & Aerospace</h2>
              <div className="relative">
                <div className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 -mb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                  {(portfolioItems.industrial ?? []).map((item) => (
                    <div key={item.id} className="group block flex-shrink-0 w-72 sm:w-80 md:w-96 cursor-pointer" onClick={() => setSelectedProject(item)}>
                      <MediaThumb item={item} ratioClass="aspect-video" width={500} height={300} />
                      <h3 className="mt-3 text-base font-medium group-hover:text-[#75d0de] transition-colors">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Medical Visualization</h2>
              <div className="relative">
                <div className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 -mb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                  {(portfolioItems.technical ?? []).map((item) => (
                    <div key={item.id} className="group block flex-shrink-0 w-72 sm:w-80 md:w-96 cursor-pointer" onClick={() => setSelectedProject(item)}>
                      <MediaThumb item={item} ratioClass="aspect-[4/3]" width={500} height={400} />
                      <h3 className="mt-3 text-base font-medium group-hover:text-[#75d0de] transition-colors">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Creative Industries</h2>
              <div className="relative">
                <div className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 -mb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                  {(portfolioItems.brandingIndustrial ?? []).map((item) => (
                    <div key={item.id} className="group block flex-shrink-0 w-64 sm:w-72 md:w-80 cursor-pointer" onClick={() => setSelectedProject(item)}>
                      <MediaThumb item={item} ratioClass="aspect-square" width={500} height={500} />
                      <h3 className="mt-3 text-base font-medium group-hover:text-[#75d0de] transition-colors">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="pt-10 pb-10 sm:pt-14 sm:pb-14 md:pt-16 md:pb-16">
            <div className="container mx-auto max-w-6xl px-5 sm:px-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-10 sm:mb-12 text-center text-gray-900">
                {servicesHeading}
              </h2>
              {services?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-7 md:gap-8 justify-items-center">
                  {services.map((s, i) => (
                    <div key={i} className="bg-white rounded-lg p-7 sm:p-8 w-full max-w-sm shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">{s.title}</h3>
                      <p className="text-gray-700 text-base leading-relaxed">{s.body}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-7 md:gap-8 justify-items-center">
                  <div className="bg-white rounded-lg p-7 sm:p-8 w-full max-w-sm shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                    <div className="mb-4 text-[#75d0de]"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg></div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">Product Renderings & Design</h3>
                    <p className="text-gray-700 text-base leading-relaxed">Photorealistic marketing visuals, product visualization, and high-quality content creation for industrial, aerospace, and consumer products.</p>
                  </div>
                  <div className="bg-white rounded-lg p-7 sm:p-8 w-full max-w-sm shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                    <div className="mb-4 text-[#75d0de]"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg></div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">Scientific Visualization</h3>
                    <p className="text-gray-700 text-base leading-relaxed">Data-driven visuals, 3D scanning interpretation, scientific communication, and digital twin representation.</p>
                  </div>
                  <div className="bg-white rounded-lg p-7 sm:p-8 w-full max-w-sm shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                    <div className="mb-4 text-[#75d0de]"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7zm3 10h10M8 9h2m4 0h2" /></svg></div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">Immersive Technologies</h3>
                    <p className="text-gray-700 text-base leading-relaxed">Real-time and interactive experiences—AR/VR, simulation-ready assets, and immersive demos that help teams explore complex systems with clarity.</p>
                  </div>
                  <div className="bg-white rounded-lg p-7 sm:p-8 w-full max-w-sm shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                    <div className="mb-4 text-[#75d0de]"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a4 4 0 00-4 4v2a4 4 0 004 4m0-10a4 4 0 014 4v2a4 4 0 01-4 4m-6 2h12" /></svg></div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">Serious Games & Simulations</h3>
                    <p className="text-gray-700 text-base leading-relaxed">Interactive training simulations and serious games designed for engineering, safety, and decision-making.</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* About */}
          <section id="about" className="pt-10 pb-10 sm:pt-14 sm:pb-14 md:pt-16 md:pb-16 bg-white">
            <div className="container mx-auto max-w-5xl px-5 sm:px-6 space-y-10">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center text-[#75d0de]">
                About Kraken Labs
              </h2>
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
                <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{whatWeDoHeading}</h3>
                  {whatWeDoBody
                    ?.split(/\n\s*\n/)
                    .map((para, i) => (
                      <p key={i}>{para.trim()}</p>
                    )) ?? (
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
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)] w-full max-w-md ml-auto">
                    {isHttpUrl(headshotUrl) ? (
                      <img src={headshotUrl} alt="Genesis Laboy" className="aspect-square object-cover w-full" />
                    ) : (
                      <Image src={headshotUrl} alt="Genesis Laboy" width={800} height={800} className="aspect-square object-cover w-full" />
                    )}
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
                <div className="order-2 md:order-1 space-y-4">
                  <div className="overflow-hidden rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)] w-full max-w-md">
                    {isHttpUrl(cherryPhotoUrl) ? (
                      <img src={cherryPhotoUrl} alt="Cherry the chihuahua" className="aspect-square object-cover w-full" />
                    ) : (
                      <Image src={cherryPhotoUrl} alt="Cherry the chihuahua" width={800} height={800} className="aspect-square object-cover w-full" />
                    )}
                  </div>
                </div>
                <div className="order-1 md:order-2 space-y-4 text-gray-700 text-base leading-relaxed">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{whoIAmHeading}</h3>
                  {whoIAmBody ? (
                    <p>{whoIAmBody}</p>
                  ) : (
                    <>
                      <p>I&apos;m Genesis Laboy, founder of Kraken Labs. I&apos;m a detail-oriented technical artist passionate about making complex ideas accessible through design. I started my company to support the ever-growing need for 3D visualization in the simulation and training capital of the world—and my longtime home—Orlando, FL.</p>
                      <p>Using industry-leading software, my approach blends technical precision with creative problem-solving to produce visuals that inform, persuade, and inspire.</p>
                      <p>When I&apos;m not creating renders or refining technical documentation, you&apos;ll find me with my Director of Barketing, <span className="font-semibold text-gray-900">Cherry</span>—the chihuahua who keeps me inspired, grounded, and entertained throughout the design process.</p>
                    </>
                  )}
                </div>
              </div>
              <LogoMarquee logos={partnerLogos} />
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="pt-6 pb-14 sm:pt-8 sm:pb-20 md:pt-10 md:pb-24 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 sm:mb-6 text-center text-[#75d0de]">
              {contactHeading}
            </h2>
            <p className="max-w-xl mx-auto text-gray-600 mb-8 sm:mb-10 px-4">{contactSubtitle}</p>
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
            <div className="mt-8 sm:mt-10 flex justify-center gap-6 sm:gap-8">
              <Link href={`mailto:${emailAddress}`} className="text-gray-600 hover:text-[#75d0de] transition-colors">
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </Link>
              <Link href={linkedinUrl} className="text-gray-600 hover:text-[#75d0de] transition-colors">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href={dribbbleUrl} className="text-gray-600 hover:text-[#75d0de] transition-colors">
                <Dribbble className="h-6 w-6" />
                <span className="sr-only">Dribbble</span>
              </Link>
              <Link href={instagramUrl} className="text-gray-600 hover:text-[#75d0de] transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </section>
        </main>

        <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />

        <footer className="container mx-auto px-6 py-8 sm:py-10 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Kraken Labs. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  )
}