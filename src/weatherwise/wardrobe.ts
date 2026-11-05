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
// Upper bounds are exclusive. All algorithm inputs use Fahrenheit, regardless of display units.
export const temperatureRules = [
  { below:32, label:'Freezing', top:2, layer:4, outer:4, bottom:3, shoe:4, advice:'Wear a heavy coat, sweater, warm pants, boots, and gloves.' },
  { below:50, label:'Cold', top:2, layer:2, outer:3, bottom:2, shoe:2, advice:'Wear a jacket, long sleeves, pants, and closed shoes.' },
  { below:65, label:'Cool', top:1, layer:2, outer:1, bottom:1, shoe:1, advice:'Wear a light jacket or hoodie, pants, and sneakers.' },
  { below:80, label:'Warm', top:0, layer:null, outer:null, bottom:0, shoe:1, advice:'Wear a T-shirt, light pants or shorts, and sneakers.' },
  { below:Infinity, label:'Hot', top:0, layer:null, outer:null, bottom:0, shoe:0, advice:'Wear a breathable shirt, shorts, and sandals.' },
] as const;
export function temperatureRule(feels:number) {
  if(!Number.isFinite(feels)) throw new Error('A finite feels-like temperature is required.');
  return temperatureRules.find(rule=>feels<rule.below)!;
}
export function recommendWardrobe(ids:string[],feels:number|null,cold=50,coatOverride='',wet=false,gym=false,snow=false,wind=0):WardrobeRecommendation {
  const available=wardrobeItems.filter(i=>ids.includes(i.id));
  const knownWeather=feels!==null&&Number.isFinite(feels);
  // Preserve the existing comfort slider: colder preference requests warmer clothing.
  const offset=cold<35?-3:cold>65?3:0;
  const rule=temperatureRule((knownWeather?feels:60)+offset);
  const freezing=rule.label==='Freezing', chilly=freezing||rule.label==='Cold';
  const waterproof=wet||snow, windy=wind>=20;
  const chosen:WardrobeItem[]=[];
  const pick=(roles:WardrobeRole[],warmth:number)=>available.filter(i=>roles.includes(i.role)).sort((a,b)=>{
    const score=(i:WardrobeItem)=>Math.abs(i.warmth-warmth)+(rule.label==='Hot'&&i.role==='shoe'&&i.name!=='Sandals'?0.25:0)+(windy&&!waterproof&&i.role==='outer'&&i.name!=='Windbreaker'?0.25:0)+(waterproof&&['outer','shoe'].includes(i.role)&&!i.wet?10:0)+(windy&&i.role==='outer'&&!i.wet&&!['Windbreaker','Softshell jacket'].includes(i.name)?2:0);
    return score(a)-score(b);
  })[0];
  const gymTop=gym?pick(['gymTop'],rule.top):undefined;
  const top=gymTop||pick(['top','dress'],rule.top)||pick(['gymTop'],rule.top);
  const layer=rule.layer!==null?(gym?pick(['gymLayer'],rule.layer)||pick(['layer'],rule.layer):pick(['layer'],rule.layer)):undefined;
  // A hoodie alone is enough in cool, dry weather. Add a light jacket when no hoodie is owned.
  const needOuter=chilly||waterproof||windy||(rule.outer!==null&&!layer);
  const outer=available.find(i=>i.role==='outer'&&i.name===coatOverride)||(needOuter?pick(['outer'],rule.outer??1):undefined);
  const gymBottom=gym?pick(['gymBottom'],rule.bottom):undefined;
  const bottom=top?.role!=='dress'?(gymBottom||pick(['bottom'],rule.bottom)||pick(['gymBottom'],rule.bottom)):undefined;
  const baseBottom=freezing&&top?.role!=='dress'?pick(['baseBottom'],3):undefined;
  const shoe=pick(['shoe'],snow?4:rule.shoe);
  const accessories=available.filter(i=>i.role==='accessory'&&((waterproof&&i.wet)||(chilly?i.warmth>=3:rule.layer===null?['Sunglasses','Baseball cap'].includes(i.name):i.name==='Cotton socks'))).slice(0,freezing?4:3);
  for(const item of [top,layer,outer,bottom,baseBottom,shoe,...accessories])if(item)chosen.push(item);
  const adjustments=[snow?'Snow: choose waterproof boots and outerwear.':wet?'Rain: choose waterproof shoes and a rain jacket or umbrella.':'',windy?'Strong wind: bring a wind-resistant outer layer.':''].filter(Boolean);
  return {
    pieces:{Tops:top?.name||'No top selected',Layers:layer?.name||(rule.layer===null?'No extra layer needed':'No layer selected'),Coat:outer?.name||(needOuter?'No coat selected':'No coat needed'),Pants:top?.role==='dress'?'Included in your dress':[bottom?.name||'No bottoms selected',baseBottom?.name].filter(Boolean).join(' + '),Shoes:shoe?.name||'No footwear selected',Accessories:accessories.map(i=>i.name).join(' + ')||'No accessories selected'},
    items:chosen,
    note:!knownWeather?'Weather is unavailable; using your selected items. Check conditions before heading out.':[
      `${rule.label} conditions. ${rule.advice}`,
      ...adjustments,
      offset?'Adjusted for your temperature preference.':'',
      !available.length?'Choose wardrobe items to get suggestions using clothes you own.':'Selected from clothes you own; add any missing weather-appropriate pieces to your wardrobe.',
      gym?(gymTop||gymBottom?'Gym is on your plan, so workout pieces are included.':'Add gym clothing to your wardrobe for a workout-ready update.'):'',
    ].filter(Boolean).join(' '),
  };
}
