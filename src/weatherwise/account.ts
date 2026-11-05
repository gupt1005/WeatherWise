export type Priority = 'Comfort' | 'Balanced' | 'Style'
export type Detail = 'Basics' | 'Head to toe'

export type OnboardingChoices = {
  town?: string
  college?: string
  latitude?: number
  longitude?: number
  cold?: number
  priority?: Priority
  detail?: Detail
  wardrobe?: string[]
}

export type AccountView = {
  firstName: string
  lastName: string
  preferredName: string
  email: string
  onboardingComplete: boolean
  choices: OnboardingChoices
  savedOutfits: SavedOutfitView[]
}

export type AccountResult = { ok: true; account: AccountView } | { ok: false; error: string }

export type SignUpInput = {
  firstName: string
  lastName: string
  preferredName: string
  email: string
  password: string
  town: string
  college?: string
  latitude?: number
  longitude?: number
}

export type AccountUpdateInput = {
  firstName: string
  lastName: string
  preferredName: string
  email: string
  currentPassword?: string
  newPassword?: string
}
import type { SavedOutfitView } from './savedOutfits'
