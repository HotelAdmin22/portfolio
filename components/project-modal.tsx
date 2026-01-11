"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export interface PortfolioItem {
  id: number
  title: string
  src: string
  images: string[]
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
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">{project.title}</DialogTitle>
              <p className="text-sm text-blue-500 font-medium">{project.category}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Image Gallery */}
          <div className="grid grid-cols-1 gap-4">
            {project.images.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} - Image ${index + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Overview</h3>
            <p className="text-gray-700 leading-relaxed">{project.description}</p>
          </div>

          {/* Tools Used */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tools & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
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
