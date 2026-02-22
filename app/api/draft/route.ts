import { validatePreviewUrl } from '@sanity/visual-editing/next'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

const token = process.env.SANITY_API_READ_TOKEN!

export async function GET(request: Request) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    token,
    request.url
  )

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 })
  }

  const { enable } = await draftMode()
  enable()
  redirect(redirectTo)
}