"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface PortfolioItem {
  id: number
  title: string
  src: string
  images?: string[]
  category: string
  description: string
  tools: string[]
}

interface ProjectModalProps {
  project: PortfolioItem | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  if (!project) {
    return null
  }

  const projectImages = project.images || [project.src]
  const currentImage = projectImages[currentImageIndex]
  const hasMultipleImages = projectImages.length > 1

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && hasMultipleImages) {
      nextImage()
    }
    if (isRightSwipe && hasMultipleImages) {
      prevImage()
    }
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      setCurrentImageIndex(0)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-950 border-gray-800 text-white max-w-4xl w-[95vw] p-0 rounded-lg">
        <div
          className="relative w-full aspect-video group"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Image
            src={currentImage || "/placeholder.svg"}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
          {hasMultipleImages && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {projectImages.length}
              </div>
            </>
          )}
        </div>
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-red-500 mb-1">{project.title}</DialogTitle>
            <DialogDescription className="text-gray-400 text-base sm:text-lg">{project.category}</DialogDescription>
          </DialogHeader>
          <div className="mt-6 text-gray-300 leading-relaxed prose prose-invert prose-p:text-gray-300">
            <p>{project.description}</p>
          </div>
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-200 mb-3">Tools & Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
