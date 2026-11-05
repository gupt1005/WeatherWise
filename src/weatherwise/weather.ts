import { useEffect, useState } from 'react';

export type Coordinates = { latitude:number; longitude:number };
export type WeatherHour = { time:string; temperature:number; feels:number; code:number; rainChance:number; snow:number };
export type LiveWeather = {
  coordinates:Coordinates;
  location:string; timezone:string; date:string; time:string; temperature:number; feels:number;
  code:number; wind:number; direction:number; high:number; low:number; hours:WeatherHour[];
};
export type WeatherState = { data:LiveWeather|null; loading:boolean; error:string; refresh:()=>void };
const states:Record<string,string>=Object.fromEntries('AL:Alabama|AK:Alaska|AZ:Arizona|AR:Arkansas|CA:California|CO:Colorado|CT:Connecticut|DE:Delaware|FL:Florida|GA:Georgia|HI:Hawaii|ID:Idaho|IL:Illinois|IN:Indiana|IA:Iowa|KS:Kansas|KY:Kentucky|LA:Louisiana|ME:Maine|MD:Maryland|MA:Massachusetts|MI:Michigan|MN:Minnesota|MS:Mississippi|MO:Missouri|MT:Montana|NE:Nebraska|NV:Nevada|NH:New Hampshire|NJ:New Jersey|NM:New Mexico|NY:New York|NC:North Carolina|ND:North Dakota|OH:Ohio|OK:Oklahoma|OR:Oregon|PA:Pennsylvania|RI:Rhode Island|SC:South Carolina|SD:South Dakota|TN:Tennessee|TX:Texas|UT:Utah|VT:Vermont|VA:Virginia|WA:Washington|WV:West Virginia|WI:Wisconsin|WY:Wyoming|DC:District of Columbia'.split('|').map(s=>s.split(':')));
async function json(url:string,signal:AbortSignal) {
  const response=await fetch(url,{signal});
  if(!response.ok) throw new Error(`Weather service unavailable (${response.status}). Please retry.`);
  return response.json();
}
export async function fetchWeather(town:string,coordinates:Coordinates|null,signal:AbortSignal):Promise<LiveWeather> {
  let latitude=coordinates?.latitude,longitude=coordinates?.longitude,location=town;
  if(!coordinates){
    const [city,region]=town.split(',').map(s=>s.trim());
    if(!city) throw new Error('Enter a city to load its weather.');
    const results=await json(`https://geocoding-api.open-meteo.com/v1/search?${new URLSearchParams({name:city,count:'20',language:'en',format:'json'})}`,signal);
    const candidates=results.results||[];
    const target=(states[region?.toUpperCase()]||region||'').toLowerCase();
    const place=candidates.find((p:any)=>!target||[p.admin1,p.country,p.country_code].some(v=>v?.toLowerCase()===target));
    if(!place) throw new Error('City not found. Try a city and state or country, such as West Lafayette, IN.');
    latitude=place.latitude;longitude=place.longitude;
    location=`${place.name}, ${place.admin1||place.country}`;
  }else location=town&&town!=='Current location'?town:'Current location';
  const params=new URLSearchParams({
    latitude:String(latitude),longitude:String(longitude),timezone:'auto',forecast_days:'2',
    temperature_unit:'fahrenheit',wind_speed_unit:'mph',
    current:'temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m',
    hourly:'temperature_2m,apparent_temperature,weather_code,precipitation_probability,snowfall',
    daily:'temperature_2m_max,temperature_2m_min',
  });
  const raw=await json(`https://api.open-meteo.com/v1/forecast?${params}`,signal);
  const c=raw.current,h=raw.hourly,d=raw.daily;
  if(!c||!h?.time?.length||!d||![c.temperature_2m,c.apparent_temperature,c.weather_code,c.wind_speed_10m,c.wind_direction_10m,d.temperature_2m_max[0],d.temperature_2m_min[0]].every(Number.isFinite)) throw new Error('Weather data is incomplete. Please retry.');
  return {coordinates:{latitude:latitude!,longitude:longitude!},location,timezone:raw.timezone,date:c.time.slice(0,10),time:c.time,temperature:c.temperature_2m,feels:c.apparent_temperature,code:c.weather_code,wind:c.wind_speed_10m,direction:c.wind_direction_10m,high:d.temperature_2m_max[0],low:d.temperature_2m_min[0],
    hours:h.time.map((time:string,i:number)=>({time,temperature:h.temperature_2m[i],feels:h.apparent_temperature[i],code:h.weather_code[i],rainChance:h.precipitation_probability[i],snow:h.snowfall[i]})).filter((v:WeatherHour)=>[v.temperature,v.feels,v.code,v.rainChance,v.snow].every(Number.isFinite))};
}
export function useWeather(town:string,coordinates:Coordinates|null):WeatherState {
  const [version,setVersion]=useState(0);
  const [resource,setResource]=useState<{key:string;data:LiveWeather|null;loading:boolean;error:string}>({key:'',data:null,loading:true,error:''});
  const key=JSON.stringify([town,coordinates?.latitude,coordinates?.longitude]);
  useEffect(()=>{
    const controller=new AbortController();
    let disposed=false;
    let deadline:ReturnType<typeof setTimeout>;
    const timer=setTimeout(async()=>{
      setResource(old=>({key,data:old.key===key?old.data:null,loading:true,error:''}));
      deadline=setTimeout(()=>controller.abort(),15000);
      try{
        const data=await fetchWeather(town,coordinates,controller.signal);
        if(!controller.signal.aborted) setResource({key,data,loading:false,error:''});
      }catch(error){
        if(!disposed) setResource(old=>({key,data:old.key===key?old.data:null,loading:false,error:controller.signal.aborted?'Weather request timed out. Please retry.':error instanceof Error?error.message:'Unable to load weather. Please retry.'}));
      }finally{clearTimeout(deadline);}
    },500);
    return()=>{disposed=true;clearTimeout(timer);clearTimeout(deadline);controller.abort();};
  },[key,version]);
  useEffect(()=>{
    const refresh=()=>setVersion(v=>v+1);
    const interval=setInterval(refresh,15*60*1000);
    window.addEventListener('focus',refresh);
    return()=>{clearInterval(interval);window.removeEventListener('focus',refresh);};
  },[]);
  return {...(resource.key===key?resource:{data:null,loading:true,error:''}),refresh:()=>setVersion(v=>v+1)};
}
export function weatherDescription(code:number):string {
  if(code===0)return 'Clear skies';
  if(code<=2)return 'Partly cloudy';
  if(code===3)return 'Overcast';
  if(code<=48)return 'Fog';
  if(code<=57)return 'Drizzle';
  if(code<=67)return 'Rain';
  if(code<=77)return 'Snow';
  if(code<=82)return 'Rain showers';
  if(code<=86)return 'Snow showers';
  return 'Thunderstorms';
}
export function localDate(data:LiveWeather|null):Date {return data?new Date(`${data.date}T12:00:00`):new Date();}
export function dateLabel(data:LiveWeather|null):string {return localDate(data).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});}
export function hourLabel(time:string):string {const hour=Number(time.slice(11,13));return `${hour%12||12} ${hour<12?'AM':'PM'}`;}
export function temperature(value:number,unit:'F'|'C',suffix=true):string {return `${Math.round(unit==='C'?(value-32)*5/9:value)}°${suffix?unit:''}`;}
export function periodHours(data:LiveWeather,period:string):WeatherHour[] {
  return data.hours.filter(h=>h.time.startsWith(data.date)&&Number(h.time.slice(11,13))>=(period==='afternoon'?12:8)&&Number(h.time.slice(11,13))<(period==='morning'?12:20));
}
export function weatherAdvice(data:LiveWeather|null):{title:string;detail:string} {
  if(!data)return {title:'Checking the forecast',detail:'Live conditions will appear when weather is available.'};
  const ahead=data.hours.filter(h=>h.time>=data.time).slice(0,12);
  const snow=ahead.find(h=>h.snow>0),rain=ahead.find(h=>h.rainChance>=50);
  if(snow)return {title:`Snow ${hourLabel(snow.time)}`,detail:'Waterproof layers and grippy footwear may help.'};
  if(rain)return {title:`Rain possible ${hourLabel(rain.time)}`,detail:`${rain.rainChance}% precipitation chance. Bring a waterproof layer.`};
  if(data.wind>=20)return {title:'Breezy conditions',detail:'A wind-resistant outer layer can help on campus walks.'};
  if(data.feels<45)return {title:'A chilly day ahead',detail:'Bring an extra layer for time outside.'};
  return {title:'Your local forecast',detail:`${weatherDescription(data.code)}. Check the hourly forecast before heading out.`};
}
