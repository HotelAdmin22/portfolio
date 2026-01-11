"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"
import { Mail, Linkedin, Dribbble, Instagram, X } from "lucide-react"

export type PortfolioItem = {
  id: number
  title: string
  src: string
  images: string[] // can be images OR videos
  category: string
  description: string
  tools: string[]
}

const portfolioItems: Record<string, PortfolioItem[]> = {
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
      title: "EMG-Data-Visualization",
      src: "/images/EMG-Data-Visualization/EMG%20Shader/Final-EMG-shader-in-use.mp4",
      images: [
        "/images/EMG-Data-Visualization/EMG%20Shader/genesis-laboy-info-1.png",
        "/images/EMG-Data-Visualization/EMG%20Shader/genesis-laboy-info-2.png",
        "/images/EMG-Data-Visualization/EMG%20Shader/shoulder-circles-emg-v2.mp4",
      ],
      category: "Industrial Visualization",
      description:
        "Detailed assembly visualization for aerospace manufacturing documentation. The renders provided clear, accurate representations of complex mechanical components and assembly sequences for training materials and technical manuals.",
      tools: ["SolidWorks", "KeyShot", "Adobe Illustrator"],
    },
    {
      id: 3,
      title: "Satellite Systems Render",
      src: "/images/International-Space-Station/ISS closeups.mp4",
      images: [
        "/images/International-Space-Station/genesis-laboy-1-orig.png",
        "/images/International-Space-Station/genesis-laboy-2-orig.png",
        "/images/International-Space-Station/genesis-laboy-3-orig.png",
        "/images/International-Space-Station/genesis-laboy-4-orig.png",
      ],
      category: "Technical Rendering",
      description:
        "Photorealistic rendering of satellite systems for aerospace contractor presentations. The visualization captures intricate details of solar arrays, communication equipment, and structural elements with technical precision.",
      tools: ["Blender", "Octane Render", "Adobe Photoshop"],
    },
    {
      id: 4,
      title: "Nasa Renders",
      src: "/images/NASA renders/Forces During Rocket Launch.mp4",
      images: [
        "/images/NASA renders/Forces During Rocket Launch.mp4",
        "/images/NASA renders/Shrimp.mp4",
        "/images/NASA renders/WinstonInterviewCGAssets_ergometer.mp4",
        "/images/NASA renders/WinstonInterviewCGAssets_iceCream.mp4",
        "/images/NASA renders/WinstonInterviewCGAssets_spongeBath.mp4",
      ],
      category: "Product Visualization",
      description:
        "Technical renders for manufacturing automation systems. Created accurate visualizations of robotic systems for marketing materials, technical documentation, and investor presentations.",
      tools: ["Cinema 4D", "Redshift", "Adobe After Effects"],
    },
    {
      id: 5,
      title: "Spacecraft Interior Design",
      src: "/spacecraft-cockpit-interior-technical-rendering.jpg",
      images: [
        "/spacecraft-cockpit-interior-technical-rendering.jpg",
        "/spacecraft-control-panel-instruments-closeup.jpg",
        "/spacecraft-seating-and-ergonomic-design-detail.jpg",
      ],
      category: "Environmental Design",
      description:
        "Interior visualization for next-generation spacecraft cabin design. The renders balance technical accuracy with human-centered design considerations for crew comfort and operational efficiency.",
      tools: ["Blender", "V-Ray", "Adobe Photoshop"],
    },
  ],
  technical: [
    {
      id: 1,
      title: "Security Inspection Equipment Kit",
      src: "/inspection-kit-persp-view-security-border-law-enf.png",
      images: ["/inspection-kit-persp-view-security-border-law-enf.png"],
      category: "Product Visualization",
      description:
        "Professional product visualization for law enforcement and border security inspection equipment. High-fidelity rendering showcases the complete kit layout including specialized tools, cables, carrying case, and accessories for technical documentation and marketing materials.",
      tools: ["KeyShot", "Adobe Photoshop", "Illustrator"],
    },
    {
      id: 2,
      title: "Medical Device Rendering",
      src: "/medical-device-technical-illustration-industrial-d.jpg",
      images: [
        "/medical-device-technical-illustration-industrial-d.jpg",
        "/medical-device-internal-components-technical-cutaw.jpg",
        "/medical-device-user-interface-detail-view.jpg",
      ],
      category: "Product Visualization",
      description:
        "Precision rendering of medical diagnostic equipment for FDA submission materials and marketing campaigns. The visualizations required extreme accuracy and attention to detail to meet regulatory standards.",
      tools: ["KeyShot", "Adobe Illustrator", "Photoshop"],
    },
    {
      id: 3,
      title: "Engine Cross-Section",
      src: "/jet-engine-cutaway-technical-illustration-industri.jpg",
      images: [
        "/jet-engine-cutaway-technical-illustration-industri.jpg",
        "/jet-engine-turbine-blades-closeup-technical-detail.jpg",
        "/jet-engine-combustion-chamber-cutaway-view.jpg",
      ],
      category: "Technical Illustration",
      description:
        "Detailed cutaway illustration of jet engine components for educational and technical documentation. The visualization reveals internal mechanical systems while maintaining technical accuracy.",
      tools: ["SolidWorks", "KeyShot", "Adobe Illustrator"],
    },
    {
      id: 4,
      title: "Renewable Energy Systems",
      src: "/wind-turbine-solar-panel-technical-rendering-indus.jpg",
      images: [
        "/wind-turbine-solar-panel-technical-rendering-indus.jpg",
        "/wind-turbine-nacelle-internal-components-technical.jpg",
        "/placeholder.svg?height=600&width=800",
      ],
      category: "Industrial Design",
      description:
        "Large-scale visualization of wind turbine and solar array installations for energy company proposals. The renders demonstrate system integration and environmental impact assessments.",
      tools: ["Blender", "Lumion", "Adobe Photoshop"],
    },
    {
      id: 5,
      title: "Automotive Prototype",
      src: "/electric-vehicle-prototype-technical-rendering-ind.jpg",
      images: [
        "/electric-vehicle-prototype-technical-rendering-ind.jpg",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      category: "Product Design",
      description:
        "Concept visualization for electric vehicle prototype development. Created photorealistic renders that showcase design innovation and engineering solutions for stakeholder presentations.",
      tools: ["Alias", "VRED", "Adobe Photoshop"],
    },
    {
      id: 6,
      title: "Manufacturing Facility Layout",
      src: "/factory-floor-layout-industrial-visualization-tech.jpg",
      images: [
        "/factory-floor-layout-industrial-visualization-tech.jpg",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      category: "Architectural Visualization",
      description:
        "Comprehensive 3D visualization of manufacturing facility layout and workflow optimization. The renders assist in planning equipment placement, material flow, and safety compliance.",
      tools: ["SketchUp", "Lumion", "Adobe InDesign"],
    },
  ],
  brandingIndustrial: [
    {
      id: 1,
      title: "Kraken Labs Identity",
      src: "/technology-laboratory-logo-branding-industrial.jpg",
      images: ["/technology-laboratory-logo-branding-industrial.jpg"],
      category: "Corporate Identity",
      description:
        "Complete brand identity system for an industrial technology laboratory. The design merges scientific precision with creative innovation, reflecting the company's mission to deliver cutting-edge solutions.",
      tools: ["Adobe Illustrator", "Adobe Photoshop"],
    },
    {
      id: 2,
      title: "Defense Contractor Branding",
      src: "/defense-aerospace-company-branding-industrial-prof.jpg",
      images: ["/defense-aerospace-company-branding-industrial-prof.jpg"],
      category: "Corporate Branding",
      description:
        "Professional branding package for aerospace and defense contractor. The design conveys trust, precision, and technical excellence while remaining accessible for diverse stakeholder audiences.",
      tools: ["Adobe Illustrator", "Adobe InDesign"],
    },
    {
      id: 3,
      title: "Technical Conference Materials",
      src: "/engineering-conference-presentation-materials-indu.jpg",
      images: ["/engineering-conference-presentation-materials-indu.jpg"],
      category: "Event Design",
      description:
        "Visual design for international engineering conference including signage, presentation templates, and promotional materials. The design system maintains professional standards while being visually engaging.",
      tools: ["Adobe InDesign", "Adobe Illustrator", "Figma"],
    },
    {
      id: 4,
      title: "Industrial Safety Infographics",
      src: "/workplace-safety-infographic-industrial-technical-.jpg",
      images: ["/workplace-safety-infographic-industrial-technical-.jpg"],
      category: "Information Design",
      description:
        "Clear, accessible safety infographics for manufacturing environments. The designs communicate complex safety protocols through visual hierarchy and intuitive iconography.",
      tools: ["Adobe Illustrator", "Adobe InDesign"],
    },
    {
      id: 5,
      title: "Engineering Proposal Templates",
      src: "/technical-proposal-document-design-professional-in.jpg",
      images: ["/technical-proposal-document-design-professional-in.jpg"],
      category: "Document Design",
      description:
        "Professional template system for engineering proposals and technical documentation. The design balances technical content with visual appeal to support winning presentations.",
      tools: ["Adobe InDesign", "Adobe Illustrator"],
    },
  ],
}

function isVideoSrc(src: string) {
  const s = (src || "").toLowerCase()
  return s.endsWith(".mp4") || s.endsWith(".webm")
}

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
  const isVideo = isVideoSrc(item.src || "")

  return (
    <div className="overflow-hidden rounded-lg bg-black">
      {isVideo ? (
        <video
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          className={`${ratioClass} w-full h-full object-cover group-hover:scale-105 transition-transform duration-300`}
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => {
            e.currentTarget.pause()
            e.currentTarget.currentTime = 0
          }}
        />
      ) : (
        <Image
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

    // lock background scroll (keep current scroll position)
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

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
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

  const gallery = useMemo(() => {
    if (!project) return []
    const all = [project.src, ...(project.images ?? [])].filter(Boolean)
    const seen = new Set<string>()
    return all.filter((s) => {
      if (seen.has(s)) return false
      seen.add(s)
      return true
    })
  }, [project])

  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 z-[999]">
      <button aria-label="Close modal" className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute inset-x-0 top-6 sm:top-10 mx-auto w-[92vw] max-w-5xl">
        <div className="relative rounded-2xl bg-white shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
          <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-gray-200 shrink-0">
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-gray-950">{project.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{project.category}</p>
            </div>

            <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <div className="p-5 sm:p-6 overflow-y-auto overscroll-contain">
            <p className="text-gray-700 leading-relaxed mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tools.map((t) => (
                <span
                  key={t}
                  className="text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200 text-gray-700"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gallery.map((src, idx) => (
                <div key={`${src}-${idx}`} className="rounded-xl overflow-hidden bg-black">
                  {isVideoSrc(src) ? (
                    <video src={src} controls playsInline preload="metadata" className="w-full h-auto" />
                  ) : (
                    <Image
                      src={src}
                      alt={`${project.title} - ${idx + 1}`}
                      width={1200}
                      height={900}
                      className="w-full h-auto object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LogoMarquee() {
  // placeholders — swap with your partner logos later
  const logos = [
    { alt: "Partner Logo 1", src: "/images/SPI Borescopes/Client logos/KSC_logo.png?height=64&width=180" },
    { alt: "Partner Logo 2", src: "/images/SPI Borescopes/Client logos/Nagoya Uni Med School logo.png?height=64&width=180" },
    { alt: "Partner Logo 3", src: "/images/SPI Borescopes/Client logos/SPI logo.png?height=64&width=180" },
    { alt: "Partner Logo 4", src: "/images/SPI Borescopes/Client logos/TG_logo.png?height=64&width=180" },
    { alt: "Partner Logo 5", src: "/images/SPI Borescopes/Client logos/UCF SVAD logo.jpg?height=64&width=180" }
    
  ]

  const row = [...logos, ...logos] // duplicate for seamless loop

  return (
    <section aria-label="Partners" className="bg-white pt-4 pb-4 sm:pt-6 sm:pb-6">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-7">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-900">
            Organizations we’ve partnered with
          </h3>
          <p className="text-sm text-gray-600 mt-1">Placeholders shown — swap for real logos anytime.</p>
        </div>

        {/* no border */}
        <div className="relative overflow-hidden rounded-2xl bg-white">
          {/* optional edge fades (remove if you want it totally clean) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="marquee">
            <div className="marquee__inner">
              {row.map((l, idx) => (
                <div key={`${l.alt}-${idx}`} className="marquee__item">
                  <Image
                    src={l.src}
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
        .marquee {
          overflow: hidden;
        }
        .marquee__inner {
          display: flex;
          align-items: center;
          width: max-content;
          gap: 2.5rem;
          padding: 0.5rem 0;
          animation: marquee 22s linear infinite;
          will-change: transform;
        }
        .marquee__item {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 0.5rem;
        }
        .marquee:hover .marquee__inner {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee__inner {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}

export default function DesignerPortfolio() {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null)

  return (
    <div className="bg-white text-gray-950 min-h-screen font-sans relative z-0 overflow-x-hidden">
      <div className="relative z-10">
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
              <Link href="#portfolio" className="hover:text-[#75d0de] transition-colors">
                Portfolio
              </Link>
              <Link href="#about" className="hover:text-[#75d0de] transition-colors">
                About
              </Link>
              <Link href="#contact" className="hover:text-[#75d0de] transition-colors">
                Contact
              </Link>
            </nav>
            <Button className="md:hidden" variant="ghost" size="icon">
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </header>

        {/* HERO: taller on desktop + remove top white gap by removing big margins */}
        <section
          className="
            relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]
            overflow-hidden flex items-center justify-center text-center
            mt-0 mb-10 sm:mb-16
            h-[clamp(420px,62vh,560px)]
            sm:h-[85vh] sm:min-h-[600px]
           
          "
        >
          <iframe
            src="https://player.vimeo.com/video/1148476066?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
            allow="autoplay; fullscreen"
            style={{ pointerEvents: "none" }}
            className="
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-[155vh] h-[56.25vw]
              sm:w-[165vh]
              lg:w-[135vh]
              xl:w-[125vh]
              min-w-full min-h-full
              -z-20
            "
          />

          <div className="absolute inset-0 bg-black/50 -z-10" />

          <div className="relative z-10 px-4">
            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter max-w-[90%] sm:max-w-none mx-auto text-white">
              Precision in Design,
              <br />
              <span className="text-[#75d0de]">Innovation in Vision.</span>
            </h1>
            <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-gray-200 text-base sm:text-xl">
              Technical visualization and rendering specialist for aerospace, industrial, and engineering projects.
            </p>
          </div>
        </section>

        <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <section id="portfolio" className="space-y-12 sm:space-y-14 mb-14 sm:mb-16">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Industrial & Aerospace</h2>
              <div className="relative">
                <div className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 -mb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                  {portfolioItems.industrial.map((item) => (
                    <div
                      key={item.id}
                      className="group block flex-shrink-0 w-72 sm:w-80 md:w-96 cursor-pointer"
                      onClick={() => setSelectedProject(item)}
                    >
                      <MediaThumb item={item} ratioClass="aspect-video" width={500} height={300} />
                      <h3 className="mt-3 text-base font-medium group-hover:text-[#75d0de] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Technical Visualization</h2>
              <div className="relative">
                <div className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 -mb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                  {portfolioItems.technical.map((item) => (
                    <div
                      key={item.id}
                      className="group block flex-shrink-0 w-72 sm:w-80 md:w-96 cursor-pointer"
                      onClick={() => setSelectedProject(item)}
                    >
                      <MediaThumb item={item} ratioClass="aspect-[4/3]" width={500} height={400} />
                      <h3 className="mt-3 text-base font-medium group-hover:text-[#75d0de] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Branding & Documentation</h2>
              <div className="relative">
                <div className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 -mb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                  {portfolioItems.brandingIndustrial.map((item) => (
                    <div
                      key={item.id}
                      className="group block flex-shrink-0 w-64 sm:w-72 md:w-80 cursor-pointer"
                      onClick={() => setSelectedProject(item)}
                    >
                      <MediaThumb item={item} ratioClass="aspect-square" width={500} height={500} />
                      <h3 className="mt-3 text-base font-medium group-hover:text-[#75d0de] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Creative Services Section (tighter on desktop) */}
          <section className="pt-10 pb-10 sm:pt-14 sm:pb-14 md:pt-16 md:pb-16">
            <div className="container mx-auto max-w-6xl px-5 sm:px-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-10 sm:mb-12 text-center text-gray-900">
                Creative Services
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-7 md:gap-8 justify-items-center">
                <div className="bg-white rounded-lg p-7 sm:p-8 w-full max-w-sm shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-4 text-[#75d0de]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">Product Renderings & Design</h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Photorealistic marketing visuals, product visualization, and high-quality content creation for industrial,
                    aerospace, and consumer products.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-7 sm:p-8 w-full max-w-sm shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-4 text-[#75d0de]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">Scientific Visualization</h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Data-driven visuals, 3D scanning interpretation, scientific communication, and digital twin representation.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-7 sm:p-8 w-full max-w-sm shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-4 text-[#75d0de]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">Technical Illustration</h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Transforming technical specifications into clear, compelling visuals for documentation, proposals, and marketing.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-7 sm:p-8 w-full max-w-sm shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-4 text-[#75d0de]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a4 4 0 00-4 4v2a4 4 0 004 4m0-10a4 4 0 014 4v2a4 4 0 01-4 4m-6 2h12"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">Serious Games & Simulations</h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Interactive training simulations and serious games designed for engineering, safety, and decision-making—
                    letting teams learn, test, and operate in realistic, risk-free environments.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* About Section (rewritten + tighter spacing) */}
          <section id="about" className="pt-10 pb-10 sm:pt-14 sm:pb-14 md:pt-16 md:pb-16 bg-white">
            <div className="container mx-auto max-w-5xl px-5 sm:px-6 space-y-10">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center text-[#75d0de]">
                About Kraken Labs
              </h2>

              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
                <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">What We Do</h3>
                  <p>
                    At Kraken Labs, we create high-fidelity technical visualizations that transform complex concepts into clear,
                    compelling imagery. With 8+ years of experience, we specialize in producing photorealistic renders for
                    aerospace, industrial, and medical visualization clients who require both technical accuracy and strong visual impact.
                  </p>
                  <p>
                    Our work bridges engineering and design—turning technical specifications into visuals used for documentation,
                    stakeholder presentations, marketing materials, and public outreach. Every project meets the rigorous standards
                    of organizations like NASA while maintaining a polished, modern design aesthetic.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="overflow-hidden rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)] w-full max-w-md ml-auto">
                    <Image
                      src="/images/glaboy-headshot-1.jpg"
                      alt="Genesis Laboy"
                      width={800}
                      height={800}
                      className="aspect-square object-cover w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
                <div className="order-2 md:order-1 space-y-4">
                  <div className="overflow-hidden rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)] w-full max-w-md">
                    <Image
                      src="/images/cherry-headshot.jpg"
                      alt="Cherry the chihuahua"
                      width={800}
                      height={800}
                      className="aspect-square object-cover w-full"
                    />
                  </div>
                </div>

                <div className="order-1 md:order-2 space-y-4 text-gray-700 text-base leading-relaxed">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Who I Am</h3>
                  <p>
                    I&apos;m Genesis Laboy, founder of Kraken Labs. I&apos;m a detail-oriented technical artist passionate about
                    making complex ideas accessible through design. I started my company to support the ever-growing need for 3D
                    visualization in the simulation and training capital of the world—and my longtime home—Orlando, FL.
                  </p>
                  <p>
                    Using industry-leading software, my approach blends technical precision with creative problem-solving to produce
                    visuals that inform, persuade, and inspire.
                  </p>
                  <p>
                    When I&apos;m not creating renders or refining technical documentation, you&apos;ll find me with my Director of Barketing,
                    <span className="font-semibold text-gray-900"> Cherry</span>—the chihuahua who keeps me inspired, grounded, and entertained
                    throughout the design process.
                  </p>
                </div>
              </div>

              {/* Logos marquee banner (infinite loop, no border) */}
              <LogoMarquee />

            </div>
          </section>

          {/* Contact (tighter + more breathing room for button/socials) */}
          <section id="contact" className="pt-6 pb-14 sm:pt-8 sm:pb-20 md:pt-10 md:pb-24 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 sm:mb-6 text-center text-[#75d0de]">
              Let&apos;s Work Together
            </h2>
            <p className="max-w-xl mx-auto text-gray-600 mb-8 sm:mb-10 px-4">
              Have a project in mind or just want to say hello? I&apos;d love to hear from you.
            </p>

            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>

            <div className="mt-8 sm:mt-10 flex justify-center gap-6 sm:gap-8">
              <Link
                href="mailto:contact@krakenlabs.design"
                className="text-gray-600 hover:text-[#75d0de] transition-colors"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#75d0de] transition-colors">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#75d0de] transition-colors">
                <Dribbble className="h-6 w-6" />
                <span className="sr-only">Dribbble</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#75d0de] transition-colors">
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
