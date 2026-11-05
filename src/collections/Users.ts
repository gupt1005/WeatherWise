import type { Access, CollectionConfig, FieldAccess } from 'payload'

// Public WeatherWise app accounts. Kept separate from the CMS `admins` collection.
const isAdmin = (user: { collection?: string } | null | undefined) => user?.collection === 'admins'

const selfOrAdmin: Access = ({ req }) => {
  if (isAdmin(req.user)) return true
  if (req.user?.collection === 'users') return { id: { equals: req.user.id } }
  return false
}

const adminOnlyField: FieldAccess = ({ req }) => isAdmin(req.user)

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'preferredName',
    defaultColumns: ['preferredName', 'firstName', 'lastName', 'email', 'onboardingComplete'],
  },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 30,
  },
  access: {
    // Signup is public; app users can never reach Payload Admin.
    admin: () => false,
    create: () => true,
    read: selfOrAdmin,
    update: selfOrAdmin,
    delete: ({ req }) => isAdmin(req.user),
  },
  fields: [
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    {
      name: 'preferredName',
      type: 'text',
      required: true,
      admin: { description: 'What WeatherWise calls this person on the home screen.' },
    },
    {
      name: 'onboarding',
      type: 'group',
      fields: [
        { name: 'town', type: 'text', admin: { description: 'Town and state used for the forecast, e.g. West Lafayette, IN.' } },
        { name: 'college', type: 'text', admin: { description: 'College the person picked, if they searched by college name.' } },
        { name: 'latitude', type: 'number', min: -90, max: 90 },
        { name: 'longitude', type: 'number', min: -180, max: 180 },
        { name: 'coldSensitivity', type: 'number', min: 0, max: 100 },
        { name: 'priority', type: 'select', options: ['Comfort', 'Balanced', 'Style'] },
        { name: 'detail', type: 'select', options: ['Basics', 'Head to toe'] },
        {
          name: 'wardrobe',
          type: 'text',
          hasMany: true,
          admin: { description: 'IDs of wardrobe items this person owns.' },
        },
      ],
    },
    {
      name: 'onboardingComplete',
      type: 'checkbox',
      defaultValue: false,
      access: { create: adminOnlyField },
    },
  ],
}
