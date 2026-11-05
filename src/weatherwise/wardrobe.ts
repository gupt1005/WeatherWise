export type WardrobeRole = 'top'|'layer'|'outer'|'bottom'|'shoe'|'accessory'|'dress'|'baseBottom'|'gymTop'|'gymBottom'|'gymLayer';
export type WardrobeItem = {id:string;name:string;role:WardrobeRole;warmth:number;wet:boolean};
export type WardrobeCategory = {name:string;image:string;description:string;items:WardrobeItem[]};
type Entry = [string,WardrobeRole,number,boolean?];
function category(name:string,image:string,description:string,entries:Entry[]):WardrobeCategory {
  return {name,image,description,items:entries.map(([name,role,warmth,wet=false])=>({id:name.toLowerCase().replace(/[^a-z0-9]+/g,'-'),name,role,warmth,wet}))};
}
export const wardrobeCategories:WardrobeCategory[]=[
  category('Tops & knits','686a6.svg','Everyday tops and comfortable layers.',[
    ['Cotton T-shirt','top',0],['Cotton long-sleeve','top',2],['Button-down shirt','top',1],['Polo shirt','top',1],['Blouse','top',1],['Tank top','top',0],
    ['Oatmeal crewneck','layer',2],['Sweatshirt','layer',2],['Hoodie','layer',3],['Cardigan','layer',2],['Wool sweater','layer',4],['Fleece pullover','layer',3],
  ]),
  category('Base layers','6a515.svg','Lightweight essentials and extra warmth under your outfit.',[
    ['Lightweight undershirt','layer',0],['Thermal long-sleeve','layer',3],['Merino base-layer top','layer',3],['Fleece-lined base-layer top','layer',4],
    ['Thermal leggings','baseBottom',3],['Long johns','baseBottom',4],['Lightweight base-layer leggings','baseBottom',1],['Merino base-layer bottoms','baseBottom',3],
  ]),
  category('Coats & jackets','2277f.svg','Outer layers for sun, wind, rain, and cold.',[
    ['Waterproof parka','outer',4,true],['Wool coat','outer',4],['Puffer jacket','outer',4],['Lightweight puffer','outer',2],
    ['Rain jacket','outer',1,true],['Windbreaker','outer',1],['Denim jacket','outer',2],['Fleece jacket','outer',3],['Softshell jacket','outer',2],
    ['Trench coat','outer',2],['Bomber jacket','outer',2],['Leather jacket','outer',2],['Quilted vest','outer',2],
  ]),
  category('Pants & jeans','6e246.svg','Pick the bottoms you actually reach for.',[
    ['Navy straight jeans','bottom',2],['Black jeans','bottom',2],['Light-wash jeans','bottom',2],['Chinos','bottom',1],['Tailored trousers','bottom',1],
    ['Joggers','bottom',2],['Sweatpants','bottom',3],['Cargo pants','bottom',2],['Linen pants','bottom',0],['Everyday leggings','bottom',1],['Casual shorts','bottom',0],
  ]),
  category('Boots & sneakers','f1528.svg','Your everyday, active, and wet-weather footwear.',[
    ['Waterproof boots','shoe',4,true],['Leather sneakers','shoe',2],['Everyday sneakers','shoe',1],['Running shoes','shoe',1],
    ['Walking shoes','shoe',1],['Ankle boots','shoe',3],['Hiking boots','shoe',3],['Rain boots','shoe',2,true],
    ['Loafers','shoe',1],['Ballet flats','shoe',0],['Sandals','shoe',0],
  ]),
  category('Accessories','e9218.svg','Small extras that make a big difference outside.',[
    ['Beanie','accessory',4],['Scarf','accessory',3],['Gloves','accessory',4],['Wool socks','accessory',3],['Thermal socks','accessory',4],
    ['Cotton socks','accessory',1],['Baseball cap','accessory',0],['Sunglasses','accessory',0],['Umbrella','accessory',0,true],
    ['Backpack','accessory',1],['Earmuffs','accessory',4],['Everyday belt','accessory',1],
  ]),
  category('Gym clothing','ace8d.svg','Easy-to-move-in pieces for workouts and the walk there.',[
    ['Moisture-wicking T-shirt','gymTop',0],['Workout tank','gymTop',0],['Long-sleeve workout top','gymTop',2],['Sports bra','gymTop',0],
    ['Workout shorts','gymBottom',0],['Workout leggings','gymBottom',1],['Training joggers','gymBottom',2],['Track jacket','gymLayer',2],['Zip-up workout hoodie','gymLayer',3],
  ]),
  category('Dresses & skirts','48c0b.svg','Everyday dresses and skirts, from light to cozy.',[
    ['T-shirt dress','dress',0],['Casual midi dress','dress',1],['Maxi dress','dress',1],['Sweater dress','dress',3],
    ['Mini skirt','bottom',0],['Midi skirt','bottom',1],['Maxi skirt','bottom',1],['Denim skirt','bottom',2],['Wool skirt','bottom',3],
  ]),
];
export const wardrobeItems=wardrobeCategories.flatMap(c=>c.items);
export const outfitSlots=['Tops','Layers','Coat','Pants','Shoes','Accessories'] as const;
export type OutfitSlot=typeof outfitSlots[number];
export type WardrobeRecommendation={pieces:Record<OutfitSlot,string>;items:WardrobeItem[];note:string};
export function recommendWardrobe(ids:string[],feels:number|null,cold=50,coatOverride='',wet=false,gym=false):WardrobeRecommendation {
  const available=wardrobeItems.filter(i=>ids.includes(i.id));
  // Comfort sensitivity nudges the weather band without making warm weather look cool.
  const adjusted=(feels??60)+(cold<35?-3:cold>65?3:0);
  const target=adjusted<38?4:adjusted<52?3:adjusted<64?2:adjusted<72?1:0;
  const chosen:WardrobeItem[]=[];
  const pick=(roles:WardrobeRole[],warmth=target)=>available.filter(i=>roles.includes(i.role)).sort((a,b)=>(Math.abs(a.warmth-warmth)+(wet&&['outer','shoe'].includes(a.role)&&!a.wet?3:0))-(Math.abs(b.warmth-warmth)+(wet&&['outer','shoe'].includes(b.role)&&!b.wet?3:0)))[0];
  const gymTop=gym?pick(['gymTop']):undefined;
  const top=gymTop||pick(['top','dress'])||pick(['gymTop']);
  const layer=target>=2?(gym?pick(['gymLayer'])||pick(['layer']):pick(['layer'])):undefined;
  const outer=available.find(i=>i.role==='outer'&&i.name===coatOverride)||(target>=2||wet?pick(['outer']):undefined);
  const gymBottom=gym?pick(['gymBottom']):undefined;
  const bottom=top?.role!=='dress'?(gymBottom||pick(['bottom'])||pick(['gymBottom'])):undefined;
  const shoe=pick(['shoe']);
  const accessories=available.filter(i=>i.role==='accessory'&&((wet&&i.wet)||(target>=3?i.warmth>=3:target<=1?['Sunglasses','Baseball cap'].includes(i.name):i.name==='Cotton socks'))).slice(0,3);
  for(const item of [top,layer,outer,bottom,shoe,...accessories])if(item)chosen.push(item);
  return {
    pieces:{Tops:top?.name||'No top selected',Layers:layer?.name||(target<2?'No extra layer needed':'No layer selected'),Coat:outer?.name||(target<2?'No coat needed':'No coat selected'),Pants:top?.role==='dress'?'Included in your dress':bottom?.name||'No bottoms selected',Shoes:shoe?.name||'No footwear selected',Accessories:accessories.map(i=>i.name).join(' + ')||'No accessories selected'},
    items:chosen,
    note:!available.length?'Choose wardrobe items to get suggestions using clothes you own.':gym&&(gymTop||gymBottom)?`Gym is on your plan, so workout pieces from your wardrobe are included with weather-ready layers.`:gym?'Gym is on your plan. Add gym clothing to your wardrobe for a workout-ready update.':feels===null?'Using your selected items. Weather is unavailable; check conditions before heading out.':`Selected from your wardrobe for ${target>=3?'colder':target<=1?'milder':'cool'} conditions. You can change your choices anytime.`,
  };
}
