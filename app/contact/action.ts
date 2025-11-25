"use server"

interface FormState {
  message: string
  success: boolean
}

// Basic validation function
function validateForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  if (!name || !email || !message) {
    throw new Error("All fields are required.")
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    throw new Error("Invalid email address.")
  }

  return { name, email, message }
}

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const { name, email, message } = validateForm(formData)

    // In a real application, you would integrate an email service like Resend or SendGrid here.
    // For this example, we'll just log the data and simulate a successful submission.
    console.log("New contact form submission:")
    console.log("Name:", name)
    console.log("Email:", email)
    console.log("Message:", message)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return {
      message: "Thank you for your message! I will get back to you soon.",
      success: true,
    }
  } catch (e) {
    const error = e as Error
    return {
      message: `Failed to send message: ${error.message}`,
      success: false,
    }
  }
}
