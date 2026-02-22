import { defineType, defineField } from "sanity"
import type { Rule } from "sanity"

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton — only one document of this type should ever exist
  __experimental_actions: ["update", "publish"],
  fields: [
    // -------------------------------------------------------------------------
    // Hero Section
    // -------------------------------------------------------------------------
    defineField({
      name: "heroHeadingLine1",
      title: "Hero — Heading Line 1",
      type: "string",
      description: 'e.g. "Precision in Design,"',
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: "heroHeadingLine2",
      title: "Hero — Heading Line 2 (accent color)",
      type: "string",
      description: 'e.g. "Innovation in Vision."',
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero — Subtitle",
      type: "string",
      description: "The smaller text below the heading",
    }),
    defineField({
      name: "heroVideoId",
      title: "Hero — Background Vimeo ID",
      type: "string",
      description: "Bare Vimeo ID for the fullscreen background video",
    }),

    // -------------------------------------------------------------------------
    // About Section
    // -------------------------------------------------------------------------
    defineField({
      name: "aboutHeading",
      title: "About — Section Heading",
      type: "string",
      description: 'e.g. "About Kraken Labs"',
    }),
    defineField({
      name: "whatWeDoHeading",
      title: "About — What We Do Heading",
      type: "string",
    }),
    defineField({
      name: "whatWeDoBody",
      title: "About — What We Do Body",
      type: "array",
      of: [{ type: "block" }],
      description: "Rich text — each block becomes a paragraph",
    }),
    defineField({
      name: "whoIAmHeading",
      title: "About — Who I Am Heading",
      type: "string",
    }),
    defineField({
      name: "whoIAmBody",
      title: "About — Who I Am Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "headshot",
      title: "About — Headshot (Genesis)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "cherryPhoto",
      title: "About — Cherry Photo",
      type: "image",
      options: { hotspot: true },
    }),

    // -------------------------------------------------------------------------
    // Contact Section
    // -------------------------------------------------------------------------
    defineField({
      name: "contactHeading",
      title: "Contact — Heading",
      type: "string",
      description: 'e.g. "Let\'s Work Together"',
    }),
    defineField({
      name: "contactSubtitle",
      title: "Contact — Subtitle",
      type: "string",
    }),
    defineField({
      name: "emailAddress",
      title: "Contact — Email Address",
      type: "string",
    }),
    defineField({
      name: "linkedinUrl",
      title: "Contact — LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "dribbbleUrl",
      title: "Contact — Dribbble URL",
      type: "url",
    }),
    defineField({
      name: "instagramUrl",
      title: "Contact — Instagram URL",
      type: "url",
    }),

    // -------------------------------------------------------------------------
    // Partner Logos (marquee)
    // -------------------------------------------------------------------------
    defineField({
      name: "partnerLogos",
      title: "Partner Logos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "alt", title: "Organization Name", type: "string" }),
            defineField({ name: "logo", title: "Logo Image", type: "image", options: { hotspot: true } }),
          ],
          preview: {
            select: { title: "alt", media: "logo" },
          },
        },
      ],
    }),

    // -------------------------------------------------------------------------
    // Services Cards
    // -------------------------------------------------------------------------
    defineField({
      name: "servicesHeading",
      title: "Services — Section Heading",
      type: "string",
      description: 'e.g. "Creative Services"',
    }),
    defineField({
      name: "services",
      title: "Services — Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Card Title", type: "string" }),
            defineField({ name: "body", title: "Card Body", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
})