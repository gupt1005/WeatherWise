import { createElement as el, useState, type ReactNode } from 'react';
import WeatherWiseLogo from './WeatherWiseLogo';
import { wardrobeCategories, type WardrobeCategory, type WardrobeItem, type WardrobeRecommendation } from './wardrobe';
import ClothingPhotos from './ClothingPhotos';
import { categoryPhotos } from './categoryPhotos';
import { itemPhoto } from './itemPhotos';

// Local UI primitives reuse the app's button, typography, and surface styles.
const Text=({children,className=''}:{children:ReactNode;className?:string})=>el('p',{className},children);
const Heading=({children}:{children:ReactNode})=>el('h1',{className:'wardrobe-title'},children);
const Action=({children,onClick,className='',disabled=false}:{children:ReactNode;onClick:()=>void;className?:string;disabled?:boolean})=>el('button',{type:'button',className,onClick,disabled},children);
const Surface=({children,className=''}:{children:ReactNode;className?:string})=>el('div',{className},children);

export function WardrobeCategoryScreen({category,selected,onSave,onBack}:{category:WardrobeCategory;selected:string[];onSave:(ids:string[])=>void;onBack:()=>void}) {
  const [draft,setDraft]=useState(()=>selected.filter(id=>category.items.some(i=>i.id===id)));
  const photo=categoryPhotos[category.name];
  return el('main',{className:'screen wardrobe-screen'},
    <Surface className="wardrobe-header"><WeatherWiseLogo/><Text className="wardrobe-step">YOUR WARDROBE</Text></Surface>,
    <Action className="wardrobe-back" onClick={onBack}>← Back to categories</Action>,
    <Surface className="wardrobe-intro">
      {el('img',{src:photo.src,alt:photo.alt,className:'wardrobe-category-image category-photo'})}
      <Surface><Heading>{category.name}</Heading><Text>{category.description}</Text></Surface>
    </Surface>,
    <Surface className="wardrobe-list-heading"><Text>Choose everything you own</Text><Action className="wardrobe-back" disabled={!draft.length} onClick={()=>setDraft([])}>Clear</Action></Surface>,
    <Surface className="wardrobe-item-list">
      {category.items.map(item=>el('label',{key:item.id,className:`wardrobe-item-option${draft.includes(item.id)?' is-selected':''}`},
        el('input',{type:'checkbox',checked:draft.includes(item.id),onChange:()=>setDraft(v=>v.includes(item.id)?v.filter(id=>id!==item.id):[...v,item.id])}),
        <Surface className="wardrobe-option-copy"><Text className="wardrobe-item-name">{item.name}</Text><Text className="wardrobe-item-detail">{item.wet?'Wet-weather ready':item.warmth>=3?'Warm & cozy':item.warmth===0?'Light & breathable':'Everyday comfort'}</Text></Surface>,
        el('img',{src:itemPhoto(item,category.name),alt:'',className:'wardrobe-option-photo',width:64,height:64,loading:'lazy',decoding:'async'})
      ))}
    </Surface>,
    <Text className="wardrobe-footnote">Only selected items will be used in your outfit suggestions. Photos are representative style examples; colors and details may vary.</Text>,
    el('a',{className:'wardrobe-photo-credit',href:'/photos/items/credits.md',target:'_blank',rel:'noreferrer'},'Photo credits'),
    photo.credit&&el('p',{className:'wardrobe-photo-credit'},'Photo: ',el('a',{href:photo.source,target:'_blank',rel:'noreferrer'},`${photo.credit} / Unsplash`)),
    <Surface className="wardrobe-save-bar"><Text>{draft.length} {draft.length===1?'item':'items'} selected</Text><Action className="primary" onClick={()=>onSave(draft)}>Save selections</Action></Surface>,
  );
}
export function WardrobePreview({recommendation,onEdit}:{recommendation:WardrobeRecommendation;onEdit?:()=>void}) {
  return <Surface className="wardrobe-preview">
    <Text className="wardrobe-preview-label">FROM YOUR WARDROBE</Text>
    <ClothingPhotos items={recommendation.items} compact/>
    {onEdit&&<Action className="wardrobe-back" onClick={onEdit}>{recommendation.items.length?'Edit wardrobe →':'Choose your items →'}</Action>}
  </Surface>;
}
export function WardrobeAlternatives({items,value,onChange,onEdit}:{items:WardrobeItem[];value:string;onChange:(value:string)=>void;onEdit:()=>void}) {
  return <Surface className="wardrobe-alternatives">
    {items.length?items.map(item=>el('button',{key:item.id,type:'button',className:`wardrobe-item-option${value===item.name?' is-selected':''}`,'aria-pressed':value===item.name,onClick:()=>onChange(item.name)},item.name)):<Text>No coats selected yet.</Text>}
    <Action className="wardrobe-back" onClick={onEdit}>Edit coats & jackets →</Action>
  </Surface>;
}
export function WardrobeItemText({slot,value}:{slot:string;value:string}) {
  return <Surface className="wardrobe-outfit-row"><Text>{slot}</Text><Text>{value}</Text>{el('img',{src:'/assets/0cda8.svg',alt:'',width:14,height:14})}</Surface>;
}
export function WardrobeCategoryCount({count}:{count:number}) {
  return <Text className="wardrobe-category-count">{count?`${count} ${count===1?'item':'items'}`:'Choose items →'}</Text>;
}
export function wardrobeCategoryForSlot(slot:string):string {
  return ({Tops:'Tops & knits',Layers:'Base layers',Coat:'Coats & jackets',Pants:'Pants & jeans',Shoes:'Boots & sneakers',Accessories:'Accessories'} as Record<string,string>)[slot]||wardrobeCategories[0].name;
}
