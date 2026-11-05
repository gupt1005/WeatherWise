import { useEffect, useState } from 'react';
import type { LiveWeather } from './weather';

export type PlacePhotoData = { url:string; title:string; source:string; nearby:boolean };
const cache=new Map<string,PlacePhotoData>();

function hasCoordinates(location:LiveWeather|null|undefined):location is LiveWeather {
  const coordinates=location?.coordinates;
  return !!coordinates&&Number.isFinite(coordinates.latitude)&&Number.isFinite(coordinates.longitude);
}

function distance(a:{latitude:number;longitude:number},b:{lat:number;lon:number}):number {
  const rad=Math.PI/180;
  const deltaLat=(b.lat-a.latitude)*rad,deltaLon=(b.lon-a.longitude)*rad;
  return 6371*2*Math.asin(Math.sqrt(Math.sin(deltaLat/2)**2+Math.cos(a.latitude*rad)*Math.cos(b.lat*rad)*Math.sin(deltaLon/2)**2));
}
function photoFromPage(page:any,location:LiveWeather,nearby=false):PlacePhotoData|null {
  const image=page.originalimage||page.thumbnail;
  if(!image?.source||!page.coordinates||distance(location.coordinates,page.coordinates)>25) return null;
  const url=new URL(image.source);
  if(!['upload.wikimedia.org','thumb.wikimedia.org'].includes(url.hostname)) return null;
  const parts=url.pathname.split('/');
  const filename=decodeURIComponent(parts.includes('thumb')?parts.at(-2)||'':parts.at(-1)||'');
  if(/\.svg$|flag|coat.of.arms|locator|logo|seal|map.of/i.test(filename)) return null;
  return {url:image.source,title:page.title,source:`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(filename)}`,nearby};
}
const campusFile=/hall|campus|library|union|tower|building|quad|aerial|gate|fountain|cent(er|re)|mall|court|lawn|arch|chapel|bell|memorial|universit|college|institute/i;
const skipFile=/logo|seal|map|flag|icon|signature|wordmark|coat.of.arms|portrait|headshot|mascot|\b1[89]\d\d\b|(^|[_ -])old[_ -]|historic|temporary|signage|uniform|jersey|team|player|coach|president/i;

/** A recent campus photo from the college's own article, checked against where the campus is. */
async function collegeArticlePhoto(college:string,location:LiveWeather,signal:AbortSignal):Promise<PlacePhotoData|null> {
  const parse=await fetch(`https://en.wikipedia.org/w/api.php?${new URLSearchParams({action:'parse',page:college,prop:'images',redirects:'1',format:'json',origin:'*'})}`,{signal});
  if(!parse.ok)return null;
  const files:string[]=((await parse.json()).parse?.images??[]).filter((f:string)=>/\.jpe?g$/i.test(f)&&!skipFile.test(f)&&campusFile.test(f)).slice(0,8);
  if(!files.length)return null;
  const info=await fetch(`https://en.wikipedia.org/w/api.php?${new URLSearchParams({action:'query',titles:files.map(f=>`File:${f}`).join('|'),prop:'imageinfo',iiprop:'url|extmetadata|size',iiurlwidth:'1000',format:'json',origin:'*'})}`,{signal});
  if(!info.ok)return null;
  const pages:any[]=Object.values((await info.json()).query?.pages??{});
  const town=location.location.split(',')[0].toLowerCase().replace(/\s+/g,'_');
  for(const file of files){
    const page=pages.find(p=>p.title?.replace(/^File:/,'').replace(/ /g,'_')===file.replace(/ /g,'_'));
    const image=page?.imageinfo?.[0];
    if(!image?.thumburl||image.width<600||image.width<image.height)continue;
    const meta=image.extmetadata??{};
    const lat=Number(meta.GPSLatitude?.value),lon=Number(meta.GPSLongitude?.value);
    // Satellite campuses share an article, so require the photo to be taken near this campus.
    const near=Number.isFinite(lat)&&Number.isFinite(lon)?distance(location.coordinates,{lat,lon})<=15:file.toLowerCase().includes(town);
    if(!near)continue;
    return {url:image.thumburl,title:college,source:image.descriptionurl||`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`,nearby:false};
  }
  return null;
}

export async function fetchPlacePhoto(location:LiveWeather|null|undefined,signal:AbortSignal,college?:string):Promise<PlacePhotoData|null> {
  if(!hasCoordinates(location))return null;
  const summary=async(title:string,nearby=false)=>{
    const response=await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g,'_'))}`,{signal});
    if(!response.ok)return null;
    return photoFromPage(await response.json(),location,nearby);
  };
  // A picked college shows its own campus photo first.
  if(college){
    const photo=await summary(college)??await collegeArticlePhoto(college,location,signal).catch(()=>null);
    if(photo)return {...photo,title:college};
  }
  if(!college&&location.location!=='Current location'){
    const photo=await summary(location.location);
    if(photo)return photo;
  }
  // Geosearch keeps ambiguous city names and GPS photos tied to the actual place.
  const params=new URLSearchParams({action:'query',list:'geosearch',gscoord:`${location.coordinates.latitude}|${location.coordinates.longitude}`,gsradius:'5000',gslimit:'5',gsnamespace:'0',format:'json',origin:'*'});
  const response=await fetch(`https://en.wikipedia.org/w/api.php?${params}`,{signal});
  if(!response.ok)return null;
  const data=await response.json();
  for(const place of data.query?.geosearch||[]){
    const photo=await summary(place.title,true);
    if(photo)return photo;
  }
  return null;
}

export default function PlacePhoto({location,searching,college}:{location:LiveWeather|null;searching:boolean;college?:string}) {
  const validLocation=hasCoordinates(location)?location:null;
  const key=validLocation?`${college||''}|${validLocation.location}|${validLocation.coordinates.latitude}|${validLocation.coordinates.longitude}`:'';
  const [result,setResult]=useState<{key:string;photo:PlacePhotoData|null;loading:boolean}>({key:'',photo:null,loading:false});
  const [broken,setBroken]=useState('');
  useEffect(()=>{
    if(!validLocation)return;
    if(cache.has(key)){setResult({key,photo:cache.get(key)!,loading:false});return;}
    const controller=new AbortController();
    let disposed=false;
    setResult({key,photo:null,loading:true});
    const timeout=setTimeout(()=>controller.abort(),10000);
    fetchPlacePhoto(validLocation,controller.signal,college).then(photo=>{
      if(disposed)return;
      if(photo)cache.set(key,photo);
      setResult({key,photo,loading:false});
    }).catch(()=>{if(!disposed)setResult({key,photo:null,loading:false});}).finally(()=>clearTimeout(timeout));
    return()=>{disposed=true;controller.abort();clearTimeout(timeout);};
  },[key]);
  const photo=result.key===key&&broken!==key?result.photo:null;
  const loading=searching||(!!validLocation&&(result.key!==key||result.loading));
  return <figure className={`campus place-photo${photo?' has-photo':''}`} aria-busy={loading}>
    {photo?<img key={key} className="place-photo-image" src={photo.url} alt={`${photo.title}${photo.nearby?' near your selected location':''}`} onError={()=>setBroken(key)}/>:<>
      <img className="sun" src="/assets/b5734.svg" alt=""/>
      <div className="architecture"><img src="/assets/4421a.svg" alt="Campus illustration"/></div>
    </>}
    {photo?<figcaption className="place-photo-caption">
      <div><span>{college&&!photo.nearby?'YOUR CAMPUS':photo.nearby?(college?'AROUND YOUR CAMPUS':'NEAR YOUR LOCATION'):'YOUR CAMPUS, YOUR FORECAST'}</span><strong>{photo.title}</strong></div>
      <a href={photo.source} target="_blank" rel="noreferrer" aria-label={`View photo source and license for ${photo.title}`}>Photo & credits ↗</a>
    </figcaption>:<figcaption className="campus-label" role="status"><img src="/assets/bd49b.svg" alt=""/>{loading?'FINDING YOUR LOCAL PHOTO…':location?'NO LOCAL PHOTO AVAILABLE · CAMPUS ILLUSTRATION':'ENTER A PLACE TO SEE A LOCAL PHOTO'}</figcaption>}
  </figure>;
}
