type CategoryPhoto = {src:string;alt:string;credit?:string;source?:string};

export const categoryPhotos:Record<string,CategoryPhoto>={
  'Tops & knits':{src:'/photos/cream-crewneck.webp',alt:'Cream knit crewneck'},
  'Base layers':{src:'/photos/category-base-layers.webp',alt:'Black long-sleeve base-layer top',credit:'Angel Balashev',source:'https://unsplash.com/@angelbalashev'},
  'Coats & jackets':{src:'/photos/olive-parka.webp',alt:'Olive green parka'},
  'Pants & jeans':{src:'/photos/navy-jeans.webp',alt:'Navy straight-leg jeans'},
  'Boots & sneakers':{src:'/photos/black-boots.webp',alt:'Black lace-up boots'},
  'Accessories':{src:'/photos/grey-scarf.webp',alt:'Grey knitted scarf'},
  'Gym clothing':{src:'/photos/category-gym-clothing.webp',alt:'Black workout top',credit:'Sincerely Media',source:'https://unsplash.com/@sincerelymedia'},
  'Dresses & skirts':{src:'/photos/category-dresses-skirts.webp',alt:'Floral midi dress',credit:'Sanskrutihomes',source:'https://unsplash.com/@sanskrutihomes'},
};
