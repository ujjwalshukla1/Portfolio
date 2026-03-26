const journeySchema = {
  name: 'journey',
  title: 'Journey',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Role or milestone (e.g. "Full Stack Developer at XYZ")',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'organization',
      title: 'Organization',
      type: 'string',
      description: 'Company, university, or organization name',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Work', value: 'work' },
          { title: 'Education', value: 'education' },
          { title: 'Certification', value: 'certification' },
          { title: 'Achievement', value: 'achievement' },
        ],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'string',
      description: 'e.g. "Jan 2023"',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'string',
      description: 'e.g. "Present" or "Dec 2024"',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of the role or achievement',
    },
    {
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'tech',
              title: 'Technology',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (most recent first)',
      initialValue: 0,
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}

export default journeySchema
