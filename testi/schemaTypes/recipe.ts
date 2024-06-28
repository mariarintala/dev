import {defineType, defineField, defineArrayMember} from 'sanity'

export const recipe = defineType({
  type: 'document',
  name: 'recipe',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      options: {source: 'title'},
    }),
    defineField({
      type: 'text',
      name: 'description',
    }),
    defineField({
      type: 'image',
      name: 'image',
      options: {hotspot: true},
    }),
    defineField({
      type: 'array',
      name: 'ingredients',
      of: [
        defineArrayMember({
          type: 'ingredient',
        }),
      ],
    }),
    defineField({
      type: 'text',
      name: 'instructions',
    }),
    defineField({
      type: 'array',
      name: 'tags',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
    }),
    defineField({
      type: 'reference',
      name: 'category',
      to: [{type: 'category'}],
    }),
  ],
})
