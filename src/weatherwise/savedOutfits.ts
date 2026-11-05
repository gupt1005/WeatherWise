export type SavedOutfitView = {
  id: string
  name: string
  note: string
  tags: string[]
  pieces: string[]
  kind: number
  wardrobeIds?: string[]
}

export type SavedOutfitResult =
  | { ok: true; outfit?: SavedOutfitView }
  | { ok: false; error: string }
