import { defineType, defineField } from 'sanity'

export const ingredientItem = defineType({
  type: "document",
  name: "ingredientItem",
  fields: [
    defineField({
      type: "string",
      name: "title",
    }),
    defineField({
      type: "slug",
      name: "slug",
      options: { source: "title" },
    }),
    defineField({
      type: "text",
      name: "description",
    }),
    defineField({
      type: "image",
      name: "image",
      options: { hotspot: true },
    }),
    defineField({
      type: "reference",
      name: "category",
      to: [{ type: "category" }],
    }),
  ],
});

