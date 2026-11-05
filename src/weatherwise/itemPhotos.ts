import { categoryPhotos } from './categoryPhotos';
import type { WardrobeItem } from './wardrobe';
import photos from './itemPhotoMap.json';

// Every current option has a distinct style reference, not an exact product SKU.
export const itemPhotos:Record<string,string>=photos;
export function itemPhoto(item:WardrobeItem,categoryName:string):string {
  return itemPhotos[item.id]||categoryPhotos[categoryName].src;
}
