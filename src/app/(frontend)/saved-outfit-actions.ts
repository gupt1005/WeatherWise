'use server'

import { appAuth } from '@/lib/app-auth'
import { getPayloadClient } from '@/lib/payload'
import { wardrobeItems } from '@/weatherwise/wardrobe'
import type { SavedOutfitResult, SavedOutfitView } from '@/weatherwise/savedOutfits'

const allowedTags = ['Cold', 'Rain', 'Snow', 'Classes', 'Gym'] as const
const allowedTagSet = new Set<string>(allowedTags)
const allowedWardrobeIds = new Set(wardrobeItems.map((item) => item.id))
const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

function validateOutfit(input: SavedOutfitView):
  | { ok: true; data: SavedOutfitView }
  | { ok: false; error: string } {
  const id = clean(input?.id, 80)
  const name = clean(input?.name, 80)
  const note = clean(input?.note, 240)
  const pieces = Array.isArray(input?.pieces)
    ? input.pieces.map((piece) => clean(piece, 80)).filter(Boolean)
    : []
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) return { ok: false, error: 'This outfit has an invalid identifier.' }
  if (!name) return { ok: false, error: 'Give your outfit a name.' }
  if (pieces.length !== 5) return { ok: false, error: 'A saved outfit needs five clothing selections.' }
  const tags = Array.isArray(input?.tags)
    ? [...new Set(input.tags.filter((tag): tag is (typeof allowedTags)[number] => allowedTagSet.has(tag)))].slice(0, 5)
    : []
  const wardrobeIds = Array.isArray(input?.wardrobeIds)
    ? [...new Set(input.wardrobeIds.filter((id) => allowedWardrobeIds.has(id)))].slice(0, 85)
    : undefined
  const kind = Number.isInteger(input?.kind) ? Math.max(0, Math.min(2, input.kind)) : 0
  return { ok: true, data: { id, name, note, pieces, tags, wardrobeIds, kind } }
}

export async function saveSavedOutfit(input: SavedOutfitView): Promise<SavedOutfitResult> {
  const user = await appAuth.getCurrentUser()
  if (!user) return { ok: false, error: 'Log in to save outfits to your account.' }
  const parsed = validateOutfit(input)
  if (!parsed.ok) return parsed

  const payload = await getPayloadClient()
  const existing = await payload.find({
    collection: 'saved-outfits',
    user,
    overrideAccess: false,
    depth: 0,
    limit: 1,
    where: { clientId: { equals: parsed.data.id } },
  })
  const data = {
    owner: user.id,
    clientId: parsed.data.id,
    name: parsed.data.name,
    note: parsed.data.note,
    tags: parsed.data.tags as (typeof allowedTags)[number][],
    pieces: parsed.data.pieces.map((name) => ({ name })),
    wardrobeIds: parsed.data.wardrobeIds,
    kind: parsed.data.kind,
  }
  try {
    if (existing.docs[0]) {
      await payload.update({
        collection: 'saved-outfits',
        id: existing.docs[0].id,
        data,
        user,
        overrideAccess: false,
      })
    } else {
      await payload.create({
        collection: 'saved-outfits',
        data,
        user,
        overrideAccess: false,
      })
    }
    return { ok: true, outfit: parsed.data }
  } catch {
    return { ok: false, error: 'We couldn’t save this outfit. Please try again.' }
  }
}

export async function deleteSavedOutfit(clientId: string): Promise<SavedOutfitResult> {
  const user = await appAuth.getCurrentUser()
  if (!user) return { ok: false, error: 'Log in to update your saved outfits.' }
  const safeId = clean(clientId, 80)
  if (!/^[a-zA-Z0-9_-]+$/.test(safeId)) return { ok: false, error: 'This outfit has an invalid identifier.' }

  const payload = await getPayloadClient()
  const existing = await payload.find({
    collection: 'saved-outfits',
    user,
    overrideAccess: false,
    depth: 0,
    limit: 1,
    where: { clientId: { equals: safeId } },
  })
  if (!existing.docs[0]) return { ok: true }
  try {
    await payload.delete({
      collection: 'saved-outfits',
      id: existing.docs[0].id,
      user,
      overrideAccess: false,
    })
    return { ok: true }
  } catch {
    return { ok: false, error: 'We couldn’t delete this outfit. Please try again.' }
  }
}
