const skillSchema = {
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'Tools', value: 'tools' },
          { title: 'Other', value: 'other' },
        ],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'proficiency',
      title: 'Proficiency Level',
      type: 'number',
      initialValue: 80,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validation: (Rule: any) => Rule.required().min(0).max(100),
    },
    {
      name: 'icon',
      title: 'Icon/Logo',
      type: 'image',
    },
  ],
}

export default skillSchema
