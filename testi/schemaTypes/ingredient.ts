import { defineType, defineField } from 'sanity'

export const ingredient = defineType({
  type: "object",
  name: "ingredient",
  fields: [
    defineField({
      type: "reference",
      name: "ingredient",
      to: [{ type: "ingredientItem" }],
    }),
    defineField({
      type: "number",
      name: "amount",
    }),
    defineField({
      type: "string",
      name: "unit",
    }),
  ],
});

