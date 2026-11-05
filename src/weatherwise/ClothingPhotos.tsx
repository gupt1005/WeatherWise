import { createElement as el } from 'react';
import type { WardrobeItem } from './wardrobe';
import { itemPhotos } from './itemPhotos';

const standalonePhotos:Record<string,string>={
  'waterproof-parka':'/photos/studio/parka-cutout.webp',
  'navy-straight-jeans':'/photos/studio/jeans-cutout.webp',
  'waterproof-boots':'/photos/studio/boots-cutout.webp',
  'beanie':'/photos/studio/beanie-cutout.webp',
  'scarf':'/photos/studio/scarf-cutout.webp',
  'fleece-lined-base-layer-top':'/photos/studio/base-layer-top.webp',
  'merino-base-layer-top':'/photos/studio/base-layer-henley.webp',
  'thermal-long-sleeve':'/photos/studio/base-layer-top.webp',
  'blouse':'/photos/studio/blouse.webp',
  'softshell-jacket':'/photos/studio/winter-jacket.webp',
  'leather-jacket':'/photos/studio/leather-jacket.webp',
  'rain-jacket':'/photos/studio/rain-jacket.webp',
  'moisture-wicking-t-shirt':'/photos/studio/athletic-tshirt.webp',
  'sweater-dress':'/photos/studio/sweater-dress.webp',
  'wool-sweater':'/photos/studio/knit-sweater.webp',
  'gloves':'/photos/studio/gloves.webp',
};
export default function ClothingPhotos({items,compact=false}:{items:WardrobeItem[];compact?:boolean}) {
  if(!items.length)return el('figure',{className:'clothing-photo-example','aria-label':'Example outfit; select wardrobe items to personalize'},
    el('img',{src:'/photos/reference-outfit.webp',alt:'Example parka, sweater, jeans, beanie, scarf, and boots'}));
  const outer=items.filter(item=>item.role==='outer');
  const core=items.filter(item=>!['outer','shoe','accessory'].includes(item.role));
  const extras=items.filter(item=>['shoe','accessory'].includes(item.role));
  const columns=outer.length?[outer,core,extras]:[core.filter((_,i)=>i%2===0),core.filter((_,i)=>i%2===1),extras];
  return el('figure',{className:`clothing-photo-grid outfit-flatlay${compact?' is-compact':''}`,'aria-label':'Recommended clothing: '+items.map(i=>i.name).join(', ')},
    ...columns.filter(column=>column.length).map((column,index)=>el('div',{className:'clothing-photo-column',key:index},
      ...column.map(item=>el('div',{className:`clothing-photo-piece piece-${item.role}`,key:item.id},
        el('img',{src:standalonePhotos[item.id]||itemPhotos[item.id],alt:item.name,decoding:'async',loading:compact?'lazy':'eager'}))))));
}
