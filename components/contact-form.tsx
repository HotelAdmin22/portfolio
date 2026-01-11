"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5 sm:space-y-6 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        <div className="space-y-2 text-left">
          <Label htmlFor="name" className="text-gray-700 font-medium">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2 text-left">
          <Label htmlFor="email" className="text-gray-700 font-medium">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-2 text-left">
        <Label htmlFor="message" className="text-gray-700 font-medium">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell me about your project..."
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full resize-none"
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto sm:min-w-[200px] bg-[#75d0de] hover:bg-[#5fb8c6] text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </div>

      {submitStatus === "success" && (
        <p className="text-center text-green-600 font-medium pt-2">
          Thank you! Your message has been sent successfully.
        </p>
      )}

      {submitStatus === "error" && (
        <p className="text-center text-red-600 font-medium pt-2">Oops! Something went wrong. Please try again.</p>
      )}
    </form>
  )
}
