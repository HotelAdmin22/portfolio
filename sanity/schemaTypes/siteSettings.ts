import { defineType, defineField } from "sanity"
import type { Rule } from "sanity"

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
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
      title: "Hero — Background Video",
      type: "string",
      description:
        "Vimeo or YouTube link (or a bare Vimeo/YouTube ID) for the fullscreen background video",
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
      type: "text",
      rows: 6,
      description: "Plain text — each paragraph separated by a blank line",
    }),
    defineField({
      name: "whoIAmHeading",
      title: "About — Who I Am Heading",
      type: "string",
    }),
    defineField({
      name: "whoIAmBody",
      title: "About — Who I Am Body",
      type: "text",
      rows: 6,
      description: "Plain text — separate paragraphs with a blank line",
    }),
    defineField({
      // Field name kept as "headshot" so the asset already uploaded here is preserved.
      name: "headshot",
      title: "About — Company Logo",
      description:
        "Shown beside \"What We Do\". Transparent PNG works best. Keep uploads under ~2 MB.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      // Field name kept as "cherryPhoto" so the asset already uploaded here is preserved.
      name: "cherryPhoto",
      title: "About — Headshot (Genesis)",
      description:
        "Shown beside \"Who I Am\". Square crops look best. Keep uploads under ~2 MB.",
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
            defineField({
              name: "logo",
              title: "Logo Image",
              type: "image",
              options: { hotspot: true },
              description: "Transparent PNG or SVG. Keep uploads under ~500 KB.",
            }),
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