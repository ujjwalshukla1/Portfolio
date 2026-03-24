const aboutSchema = {
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'image',
      title: 'About Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}

export default aboutSchema
