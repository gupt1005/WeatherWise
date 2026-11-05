'use server'

import type { User } from '@/payload-types'
import { appAuth } from '@/lib/app-auth'
import { getPayloadClient } from '@/lib/payload'
import type {
  AccountResult,
  AccountUpdateInput,
  AccountView,
  OnboardingChoices,
  SignUpInput,
} from '@/weatherwise/account'
import type { SavedOutfitView } from '@/weatherwise/savedOutfits'

const priorities = ['Comfort', 'Balanced', 'Style'] as const
const details = ['Basics', 'Head to toe'] as const

async function savedOutfitsFor(user: User): Promise<SavedOutfitView[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'saved-outfits',
    user,
    overrideAccess: false,
    depth: 0,
    limit: 100,
    sort: '-updatedAt',
  })
  return result.docs.map((outfit) => ({
    id: outfit.clientId,
    name: outfit.name,
    note: outfit.note ?? '',
    tags: outfit.tags ?? [],
    pieces: (outfit.pieces ?? []).map((piece) => piece.name),
    kind: outfit.kind ?? 0,
    wardrobeIds: outfit.wardrobeIds ?? undefined,
  }))
}

async function toAccountView(user: User): Promise<AccountView> {
  const o = user.onboarding ?? {}
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    preferredName: user.preferredName,
    email: user.email,
    onboardingComplete: Boolean(user.onboardingComplete),
    choices: {
      town: o.town ?? undefined,
      college: o.college ?? undefined,
      latitude: typeof o.latitude === 'number' ? o.latitude : undefined,
      longitude: typeof o.longitude === 'number' ? o.longitude : undefined,
      cold: typeof o.coldSensitivity === 'number' ? o.coldSensitivity : undefined,
      priority: o.priority ?? undefined,
      detail: o.detail ?? undefined,
      wardrobe: o.wardrobe ?? undefined,
    },
    savedOutfits: await savedOutfitsFor(user),
  }
}

export async function getCurrentAccount(): Promise<AccountView | null> {
  const user = await appAuth.getCurrentUser()
  return user ? await toAccountView(user) : null
}

const clean = (value: unknown, max = 80) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

export async function signUp(input: SignUpInput): Promise<AccountResult> {
  const firstName = clean(input.firstName)
  const lastName = clean(input.lastName)
  const preferredName = clean(input.preferredName)
  const email = clean(input.email, 254).toLowerCase()
  const password = typeof input.password === 'string' ? input.password : ''
  if (!firstName || !lastName || !preferredName) return { ok: false, error: 'Please fill in every name field.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Enter a valid email address.' }
  if (password.length < 8) return { ok: false, error: 'Use a password with at least 8 characters.' }

  const payload = await getPayloadClient()
  try {
    await payload.create({
      collection: 'users',
      overrideAccess: false,
      data: { firstName, lastName, preferredName, email, password, onboarding: { town: clean(input.town, 120) || undefined, college: clean(input.college, 160) || undefined, latitude: input.latitude, longitude: input.longitude } },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    if (/email|unique|already/i.test(message)) return { ok: false, error: 'An account with that email already exists. Try logging in.' }
    return { ok: false, error: 'We couldn’t create your account. Please try again.' }
  }
  try {
    const user = await appAuth.login(email, password)
    return { ok: true, account: await toAccountView(user) }
  } catch {
    return { ok: false, error: 'Account created, but we couldn’t sign you in. Try logging in.' }
  }
}

export async function logIn(email: string, password: string): Promise<AccountResult> {
  try {
    const user = await appAuth.login(clean(email, 254).toLowerCase(), typeof password === 'string' ? password : '')
    return { ok: true, account: await toAccountView(user) }
  } catch {
    return { ok: false, error: 'That email and password don’t match an account.' }
  }
}

export async function logOut(): Promise<{ ok: true }> {
  await appAuth.logout()
  return { ok: true }
}

export async function updateAccount(input: AccountUpdateInput): Promise<AccountResult> {
  const user = await appAuth.getCurrentUser()
  if (!user) return { ok: false, error: 'You’re signed out. Log in to edit your account.' }

  const firstName = clean(input.firstName)
  const lastName = clean(input.lastName)
  const preferredName = clean(input.preferredName)
  const email = clean(input.email, 254).toLowerCase()
  const currentPassword = typeof input.currentPassword === 'string' ? input.currentPassword : ''
  const newPassword = typeof input.newPassword === 'string' ? input.newPassword : ''
  if (!firstName || !lastName || !preferredName) return { ok: false, error: 'Please fill in every name field.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Enter a valid email address.' }
  if (newPassword && newPassword.length < 8) return { ok: false, error: 'Use a new password with at least 8 characters.' }

  const emailChanged = email !== user.email.toLowerCase()
  const credentialsChanged = emailChanged || Boolean(newPassword)
  if (credentialsChanged) {
    if (!currentPassword) return { ok: false, error: 'Enter your current password to change your email or password.' }
    try {
      // Confirms the current password through Payload's own login check.
      await appAuth.login(user.email, currentPassword)
    } catch {
      return { ok: false, error: 'Your current password isn’t correct.' }
    }
  }

  const payload = await getPayloadClient()
  let updated: User
  try {
    updated = await payload.update({
      collection: 'users',
      id: user.id,
      user,
      overrideAccess: false,
      data: { firstName, lastName, preferredName, email, ...(newPassword ? { password: newPassword } : {}) },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    if (/email|unique|already/i.test(message)) return { ok: false, error: 'Another account already uses that email.' }
    return { ok: false, error: 'We couldn’t save your changes. Please try again.' }
  }

  if (credentialsChanged) {
    try {
      // Refresh the session so it reflects the new email/password.
      updated = await appAuth.login(email, newPassword || currentPassword)
    } catch {
      return { ok: false, error: 'Changes saved. Please log in again with your new details.' }
    }
  }
  return { ok: true, account: await toAccountView(updated) }
}

export async function saveChoices(
  choices: OnboardingChoices,
  options: { complete?: boolean } = {},
): Promise<AccountResult> {
  const user = await appAuth.getCurrentUser()
  if (!user) return { ok: false, error: 'You’re signed out. Log in to save your choices.' }

  const onboarding: NonNullable<User['onboarding']> = { ...(user.onboarding ?? {}) }
  if (choices.town !== undefined) onboarding.town = clean(choices.town, 120)
  if (choices.college !== undefined) onboarding.college = clean(choices.college, 160) || null
  const validLat = typeof choices.latitude === 'number' && Math.abs(choices.latitude) <= 90
  const validLon = typeof choices.longitude === 'number' && Math.abs(choices.longitude) <= 180
  if ('latitude' in choices || 'longitude' in choices) {
    // Coordinates travel together; a town typed without a lookup clears them.
    onboarding.latitude = validLat && validLon ? choices.latitude : null
    onboarding.longitude = validLat && validLon ? choices.longitude : null
  }
  if (typeof choices.cold === 'number') onboarding.coldSensitivity = Math.max(0, Math.min(100, Math.round(choices.cold)))
  if (choices.priority && priorities.includes(choices.priority)) onboarding.priority = choices.priority
  if (choices.detail && details.includes(choices.detail)) onboarding.detail = choices.detail
  if (Array.isArray(choices.wardrobe)) onboarding.wardrobe = choices.wardrobe.filter((id) => typeof id === 'string').slice(0, 200)

  const payload = await getPayloadClient()
  const updated = await payload.update({
    collection: 'users',
    id: user.id,
    user,
    overrideAccess: false,
    data: { onboarding, ...(options.complete ? { onboardingComplete: true } : {}) },
  })
  return { ok: true, account: await toAccountView(updated) }
}
