import type { Access, CollectionBeforeValidateHook, CollectionConfig, FieldAccess } from 'payload'

const isAdmin = (user: { collection?: string } | null | undefined) => user?.collection === 'admins'
const isAppUser = (user: { collection?: string } | null | undefined) => user?.collection === 'users'

const ownOutfits: Access = ({ req }) => {
  if (isAdmin(req.user)) return true
  const user = req.user
  if (isAppUser(user)) return { owner: { equals: user!.id } }
  return false
}

const createForSelf: Access = ({ req }) => isAdmin(req.user) || isAppUser(req.user)
const createOwner: FieldAccess = ({ req }) => isAdmin(req.user) || isAppUser(req.user)
const updateOwner: FieldAccess = ({ req }) => isAdmin(req.user)

const assignOwner: CollectionBeforeValidateHook = ({ data, operation, req }) => {
  if (data && operation === 'create' && isAppUser(req.user)) data.owner = req.user!.id
  return data
}

export const SavedOutfits: CollectionConfig = {
  slug: 'saved-outfits',
  admin: {
    group: 'WeatherWise',
    useAsTitle: 'name',
    defaultColumns: ['name', 'owner', 'updatedAt'],
  },
  access: {
    create: createForSelf,
    read: ownOutfits,
    update: ownOutfits,
    delete: ownOutfits,
  },
  hooks: {
    beforeValidate: [assignOwner],
  },
  fields: [
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
      access: { create: createOwner, update: updateOwner },
      admin: { position: 'sidebar' },
    },
    {
      name: 'clientId',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'Stable per-user identifier used by the WeatherWise app.' },
    },
    { name: 'name', type: 'text', required: true, maxLength: 80 },
    { name: 'note', type: 'textarea', maxLength: 240 },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      options: ['Cold', 'Rain', 'Snow', 'Classes', 'Gym'],
    },
    {
      name: 'pieces',
      type: 'array',
      required: true,
      minRows: 5,
      maxRows: 5,
      fields: [{ name: 'name', type: 'text', required: true, maxLength: 80 }],
    },
    {
      name: 'wardrobeIds',
      type: 'text',
      hasMany: true,
      admin: { description: 'Wardrobe item IDs shown in this saved outfit.' },
    },
    { name: 'kind', type: 'number', min: 0, max: 2, defaultValue: 0 },
  ],
  timestamps: true,
}
