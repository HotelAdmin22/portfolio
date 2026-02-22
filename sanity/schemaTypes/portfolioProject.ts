import { defineType, defineField } from "sanity"
import type { Rule } from "sanity"

export const portfolioProject = defineType({
  name: "portfolioProject",
  title: "Portfolio Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule: Rule) => rule.required(),
    }),

    defineField({
      name: "section",
      title: "Section",
      type: "string",
      options: {
        list: [
          { title: "Industrial & Aerospace", value: "industrial" },
          { title: "Medical Visualization", value: "technical" },
          { title: "Creative Industries", value: "brandingIndustrial" },
        ],
      },
      validation: (rule: Rule) => rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category Label",
      type: "string",
      validation: (rule: Rule) => rule.required(),
    }),

    defineField({
      name: "description",
      type: "text",
      rows: 4,
      validation: (rule: Rule) => rule.required(),
    }),

    defineField({
      name: "tools",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "order",
      type: "number",
      initialValue: 0,
    }),

    defineField({
      name: "videoKey",
      title: "Video Key (optional)",
      type: "string",
    }),

    defineField({
      name: "thumbnailImage",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
})