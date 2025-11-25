"use client"

import { useActionState, useEffect, useRef } from "react"
import { submitContactForm } from "@/app/contact/action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react"

const initialState = {
  message: "",
  success: false,
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  return (
    <div className="max-w-xl mx-auto">
      <form ref={formRef} action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2 text-left">
            <Label htmlFor="name" className="text-gray-900">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              required
              className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-900 focus:ring-red-500"
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="email" className="text-gray-900">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              required
              className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-900 focus:ring-red-500"
            />
          </div>
        </div>
        <div className="space-y-2 text-left">
          <Label htmlFor="message" className="text-gray-900">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell me about your project..."
            required
            rows={5}
            className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-900 focus:ring-red-500"
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:bg-gray-600"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
          {state.message && (
            <div
              className={`flex items-center gap-2 text-sm p-3 rounded-md ${
                state.success ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"
              }`}
            >
              {state.success ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              {state.message}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
