"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ProjectModal, type PortfolioItem } from "@/components/project-modal"
import { ContactForm } from "@/components/contact-form"
import { Mail, Linkedin, Dribbble, Instagram } from "lucide-react"

const portfolioItems: Record<string, PortfolioItem[]> = {
  industrial: [
    {
      id: 1,
      title: "NASA Mars Rover Visualization",
      src: "/nasa-mars-rover-technical-rendering-industrial-des.jpg",
      images: [
        "/nasa-mars-rover-technical-rendering-industrial-des.jpg",
        "/mars-rover-close-up-of-wheels-and-suspension-syste.jpg",
        "/mars-rover-solar-panels-detail-technical-view.jpg",
      ],
      category: "Technical Rendering",
      description:
        "High-fidelity 3D rendering and visualization for NASA's Mars exploration rover. Created accurate technical renders that showcase the rover's mechanical systems, solar panels, and scientific instruments for presentation to stakeholders and public outreach materials.",
      tools: ["Blender", "KeyShot", "Adobe Photoshop", "Substance Painter"],
    },
    {
      id: 2,
      title: "Aerospace Component Assembly",
      src: "/aerospace-industrial-parts-technical-illustration.jpg",
      images: [
        "/aerospace-industrial-parts-technical-illustration.jpg",
        "/exploded-view-of-aerospace-component-assembly.jpg",
        "/aerospace-parts-detail-closeup-technical.jpg",
      ],
      category: "Industrial Visualization",
      description:
        "Detailed assembly visualization for aerospace manufacturing documentation. The renders provided clear, accurate representations of complex mechanical components and assembly sequences for training materials and technical manuals.",
      tools: ["SolidWorks", "KeyShot", "Adobe Illustrator"],
    },
    {
      id: 3,
      title: "Satellite Systems Render",
      src: "/satellite-in-space-technical-rendering-industrial.jpg",
      images: [
        "/satellite-in-space-technical-rendering-industrial.jpg",
        "/satellite-solar-panel-array-closeup-technical.jpg",
        "/satellite-communication-dish-and-antenna-details.jpg",
      ],
      category: "Technical Rendering",
      description:
        "Photorealistic rendering of satellite systems for aerospace contractor presentations. The visualization captures intricate details of solar arrays, communication equipment, and structural elements with technical precision.",
      tools: ["Blender", "Octane Render", "Adobe Photoshop"],
    },
    {
      id: 4,
      title: "Industrial Robotics Visualization",
      src: "/industrial-robot-arm-factory-technical-rendering.jpg",
      images: [
        "/industrial-robot-arm-factory-technical-rendering.jpg",
        "/robot-arm-joint-closeup-mechanical-detail.jpg",
        "/industrial-robot-end-effector-tool-technical-view.jpg",
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
      images: [
        "/technology-laboratory-logo-branding-industrial.jpg",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      category: "Corporate Identity",
      description:
        "Complete brand identity system for an industrial technology laboratory. The design merges scientific precision with creative innovation, reflecting the company's mission to deliver cutting-edge solutions.",
      tools: ["Adobe Illustrator", "Adobe Photoshop"],
    },
    {
      id: 2,
      title: "Defense Contractor Branding",
      src: "/defense-aerospace-company-branding-industrial-prof.jpg",
      images: [
        "/defense-aerospace-company-branding-industrial-prof.jpg",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      category: "Corporate Branding",
      description:
        "Professional branding package for aerospace and defense contractor. The design conveys trust, precision, and technical excellence while remaining accessible for diverse stakeholder audiences.",
      tools: ["Adobe Illustrator", "Adobe InDesign"],
    },
    {
      id: 3,
      title: "Technical Conference Materials",
      src: "/engineering-conference-presentation-materials-indu.jpg",
      images: [
        "/engineering-conference-presentation-materials-indu.jpg",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      category: "Event Design",
      description:
        "Visual design for international engineering conference including signage, presentation templates, and promotional materials. The design system maintains professional standards while being visually engaging.",
      tools: ["Adobe InDesign", "Adobe Illustrator", "Figma"],
    },
    {
      id: 4,
      title: "Industrial Safety Infographics",
      src: "/workplace-safety-infographic-industrial-technical-.jpg",
      images: [
        "/workplace-safety-infographic-industrial-technical-.jpg",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      category: "Information Design",
      description:
        "Clear, accessible safety infographics for manufacturing environments. The designs communicate complex safety protocols through visual hierarchy and intuitive iconography.",
      tools: ["Adobe Illustrator", "Adobe InDesign"],
    },
    {
      id: 5,
      title: "Engineering Proposal Templates",
      src: "/technical-proposal-document-design-professional-in.jpg",
      images: [
        "/technical-proposal-document-design-professional-in.jpg",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      category: "Document Design",
      description:
        "Professional template system for engineering proposals and technical documentation. The design balances technical content with visual appeal to support winning presentations.",
      tools: ["Adobe InDesign", "Adobe Illustrator"],
    },
  ],
}

export default function DesignerPortfolio() {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null)

  return (
    <div className="bg-white text-gray-950 min-h-screen font-sans relative z-0">
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
              <Link href="#portfolio" className="hover:text-red-500 transition-colors">
                Portfolio
              </Link>
              <Link href="#about" className="hover:text-red-500 transition-colors">
                About
              </Link>
              <Link href="#contact" className="hover:text-red-500 transition-colors">
                Contact
              </Link>
            </nav>
            <Button className="md:hidden" variant="ghost" size="icon">
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <section className="text-center my-12 sm:my-32 px-2 sm:px-0 safe-top">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter max-w-[90%] sm:max-w-none mx-auto">
              Precision in Design,
              <br />
              <span className="text-red-500">Innovation in Vision.</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-lg sm:text-xl">
              Technical visualization and rendering specialist for aerospace, industrial, and engineering projects.
            </p>
          </section>

          <section id="portfolio" className="space-y-12 sm:space-y-16 mb-16 sm:mb-20">
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
                      <div className="overflow-hidden rounded-lg">
                        <Image
                          src={item.src || "/placeholder.svg"}
                          alt={item.title}
                          width={500}
                          height={300}
                          className="aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="mt-3 text-base font-medium group-hover:text-red-500 transition-colors">
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
                      <div className="overflow-hidden rounded-lg">
                        <Image
                          src={item.src || "/placeholder.svg"}
                          alt={item.title}
                          width={500}
                          height={400}
                          className="aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="mt-3 text-base font-medium group-hover:text-red-500 transition-colors">
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
                      <div className="overflow-hidden rounded-lg">
                        <Image
                          src={item.src || "/placeholder.svg"}
                          alt={item.title}
                          width={500}
                          height={500}
                          className="aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="mt-3 text-base font-medium group-hover:text-red-500 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-16 sm:py-28 bg-white">
            <div className="container mx-auto max-w-7xl px-5 sm:px-6 space-y-20 sm:space-y-36">
              {/* Row 1: What I Do - Image Left, Text Right */}
              <div className="grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
                {/* Left: Portrait */}
                <div className="flex justify-center md:justify-end mb-6 sm:mb-0">
                  <Avatar className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] border-0 shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-700 opacity-0 animate-fade-in">
                    <AvatarImage src="/images/glaboy-headshot-1.jpg" alt="Designer portrait" />
                    <AvatarFallback>GL</AvatarFallback>
                  </Avatar>
                </div>

                {/* Right: Text Content */}
                <div className="flex flex-col justify-center transition-all duration-700 opacity-0 animate-fade-in-delay">
                  <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight mb-3 sm:mb-5 text-gray-900">
                    What I Do
                  </h2>
                  <div className="space-y-4 sm:space-y-5 text-gray-700 text-[15px] sm:text-[16px] leading-[1.35] sm:leading-relaxed max-w-[600px]">
                    <p>
                      I create high-fidelity technical visualizations that transform complex engineering concepts into
                      clear, compelling imagery. With 8+ years of experience, I specialize in producing photorealistic
                      renders for aerospace and industrial clients who require both technical accuracy and strong visual
                      impact.
                    </p>
                    <p>
                      My work bridges engineering and design—turning CAD data and technical specifications into visuals
                      used for documentation, stakeholder presentations, marketing materials, and public outreach. Every
                      project meets the rigorous standards of organizations like NASA while maintaining a polished,
                      modern design aesthetic.
                    </p>
                  </div>
                </div>
              </div>

              {/* Row 2: Who I Am - Text Left, Image Right */}
              <div className="grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
                {/* Left: Text Content */}
                <div className="flex flex-col justify-center order-2 md:order-1 transition-all duration-700 opacity-0 animate-fade-in-delay">
                  <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight mb-3 sm:mb-5 text-gray-900">
                    Who I Am
                  </h2>
                  <div className="space-y-4 sm:space-y-5 text-gray-700 text-[15px] sm:text-[16px] leading-[1.35] sm:leading-relaxed max-w-[600px]">
                    <p>
                      I'm a detail-oriented technical visualization specialist passionate about making complex
                      engineering accessible through design. My approach blends technical precision with creative
                      problem-solving to produce visuals that inform, persuade, and inspire.
                    </p>
                    <p>
                      When I'm not creating renders or refining technical documentation, you'll find me with my creative
                      companion, Cherry—a chihuahua who keeps me inspired, grounded, and entertained throughout the
                      design process.
                    </p>
                  </div>
                </div>

                {/* Right: Cherry Photo */}
                <div className="flex justify-center md:justify-start order-1 md:order-2 mb-6 sm:mb-0">
                  <Avatar className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] border-0 shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-700 opacity-0 animate-fade-in">
                    <AvatarImage src="/images/cherry-headshot.jpg" alt="Cherry the chihuahua" />
                    <AvatarFallback>🐕</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </section>

          {/* Mobile-only divider between About and Contact sections */}
          <div className="block md:hidden border-t border-gray-200 mx-6 my-10"></div>

          {/* Contact Section */}
          <section id="contact" className="mt-12 sm:mt-28 mb-12 sm:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Let's Create Together</h2>
            <p className="max-w-xl mx-auto text-gray-600 mb-10 sm:mb-12 px-4">
              Have a project in mind or just want to say hello? I'd love to hear from you.
            </p>
            <ContactForm />
            <div className="mt-16">
              <p className="text-lg text-gray-600 mb-6">Or find me on</p>
              <div className="flex justify-center items-center space-x-6 sm:space-x-8">
                <Link href="mailto:hello@v0creator.dev" className="text-gray-600 hover:text-red-500 transition-colors">
                  <Mail className="w-7 h-7 sm:w-8 sm:h-8" />
                  <span className="sr-only">Email</span>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-red-500 transition-colors">
                  <Linkedin className="w-7 h-7 sm:w-8 sm:h-8" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-red-500 transition-colors">
                  <Dribbble className="w-7 h-7 sm:w-8 sm:h-8" />
                  <span className="sr-only">Dribbble</span>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-red-500 transition-colors">
                  <Instagram className="w-7 h-7 sm:w-8 sm:h-8" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />

        <footer className="container mx-auto px-6 py-8 sm:py-12 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} v0 creator. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  )
}
