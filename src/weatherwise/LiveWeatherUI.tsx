import React, { type ReactNode, type ReactElement } from 'react';
import { type WeatherState, type LiveWeather, dateLabel, localDate, temperature, weatherDescription, weatherAdvice, hourLabel, periodHours } from './weather';

function content(node:ReactNode):string {
  return typeof node==='string'?node:Array.isArray(node)?node.map(content).join(' '):React.isValidElement(node)?content((node.props as any).children):'';
}
function cloneText(node:ReactNode,value:string):ReactNode {
  return React.isValidElement(node)?React.cloneElement(node as ReactElement<any>,{},value):node;
}
function forecastAt(data:LiveWeather,time:string) {return data.hours.find(h=>h.time===`${data.date}T${time.slice(0,2)}:00`);}
export function WeatherStatus({state}:{state:WeatherState}) {
  return <div className="weather-source" role="status">
    <span>{state.error?`${state.data?'Last known forecast. ':''}${state.error}`:state.loading?'Updating weather…':state.data?`Open-Meteo · ${state.data.location} · Updated ${hourLabel(state.data.time).replace(' ',':'+state.data.time.slice(14,16)+' ')}`:'Weather unavailable'}</span>
    <button type="button" onClick={state.refresh}>{state.error?'Retry':'Refresh'}</button>
    <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Weather data by Open-Meteo</a>
  </div>;
}
export function liveWeatherUI(node:ReactNode,state:WeatherState,unit:'F'|'C',page:string):ReactNode {
  const data=state.data,advice=weatherAdvice(data),date=dateLabel(data),fmt=(v:number)=>temperature(v,unit);
  const daily=localDate(data).toLocaleDateString('en-US',{weekday:'long'});
  const liveOutfit=['whole','morning','afternoon','swap','today','why'].includes(page);
  const walk=(node:ReactNode):ReactNode=>{
    if(Array.isArray(node))return node.map((n,i)=><React.Fragment key={i}>{walk(n)}</React.Fragment>);
    if(!React.isValidElement(node)){
      if(typeof node==='string')return node.replace(/Mon, Jan 26/g,date).replace(/Jan 26/g,date.replace(/^\w+, /,'')).replace('Made for your Monday',`Made for your ${daily}`).replace('Campus snow day',liveOutfit?'Your daily layers':'Campus snow day');
      return node;
    }
    const e=node as ReactElement<any>,p=e.props,id=p['data-node-id'],name=p['data-name'];
    const text=content(p.children).trim().replace(/\s+/g,' ');
    let children=walk(p.children);
    const values:Record<string,string>={
      '1:3224':`${data?Number(data.time.slice(11,13))<12?'Morning':Number(data.time.slice(11,13))<17?'Afternoon':'Evening':'Hello'}, Alex.`,
      '1:3227':`${data?.location||'Local forecast'} · ${date}`,
      '1:3233':data?temperature(data.feels,unit,false):'—',
      '1:3234':data?weatherDescription(data.code):state.loading?'Loading live weather…':'Weather unavailable',
      '1:3239':data?`Actual ${fmt(data.temperature)}`:'Actual —',
      '1:3240':data?`Wind ${['N','NE','E','SE','S','SW','W','NW'][Math.round(data.direction/45)%8]} ${Math.round(data.wind)} mph`:'Wind —',
      '1:3241':data?`H ${fmt(data.high)} / L ${fmt(data.low)}`:'H — / L —',
      '1:3247':advice.title,'1:3248':advice.detail,'1:3254':'Forecast →',
      '1:3298':'Your daily layers','1:3299':'Your outfit is editable. Check the live forecast above.',
      '1:3121':date,'1:3017':date,'1:2911':date,'1:3862':date,
      '1:2978':advice.detail,'1:3188':advice.detail,'1:3929':advice.detail,
      '1:3960':data?`${weatherDescription(data.code)}. Choose an outer layer for your comfort.`:'Choose a coat. Live weather is unavailable.',
      '1:3799':'Weather behind your daily layers','1:3804':'Plan for the weather.',
      '1:3818':data?`Feels like ${fmt(data.feels)}`:'Feels like —',
      '1:3819':data?`Actual ${fmt(data.temperature)} with wind at ${Math.round(data.wind)} mph.`:'Connect to the weather service to see current conditions.',
      '1:3825':advice.title,'1:3826':advice.detail,
      '1:3843':'Live forecast by Open-Meteo. Outfit choices are a prototype, not severe-weather safety guidance.',
      '1:5310':`${data?.location||'Local forecast'} · ${date}`,
      '1:6115':'Your local forecast','1:6116':`${data?.location||'Local forecast'} · ${date}`,
      '1:6121':data?hourLabel(data.time):'—','1:6122':data?weatherDescription(data.code):'Weather unavailable',
      '1:6125':data?`Feels like ${fmt(data.feels)}. High ${fmt(data.high)}, low ${fmt(data.low)}.`:'Live forecast unavailable. Try refreshing.',
      '1:6132':'Before heading out','1:6133':advice.detail,'1:6139':'Choose comfortable footwear suited to local conditions.',
      '1:6145':'Check conditions again before your return trip.',
      '1:6156':'Notification preferences apply to this prototype session. Check local authorities for official weather alerts.',
      '1:6157':'Forecast guidance, not official severe-weather warnings. Check local advisories.',
      '1:5360':'Forecast-based guidance from Open-Meteo, not official emergency alerts.',
      '1:5389':'Review your layers','1:5390':'Your plan is saved. Check the current weather before leaving.',
      '1:5540':advice.detail,'1:5621':advice.detail,
      '1:5943':'Saved in this prototype session',
    };
    if(id in values)children=values[id];
    if(name==='Weather context'){
      const hours=data?periodHours(data,page):[];
      const summary=hours.length?`${page==='morning'?'8 AM–noon':page==='afternoon'?'Noon–8 PM':'8 AM–8 PM'} · Feels ${fmt(Math.min(...hours.map(h=>h.feels)))}–${fmt(Math.max(...hours.map(h=>h.feels)))}`:'Live forecast unavailable';
      children=React.Children.map(children,n=>React.isValidElement(n)&&n.type==='p'?cloneText(n,summary):n);
    }
    if(name==='Hourly weather'){
      const next=data?.hours.filter(h=>h.time>=data.time).slice(0,5)||[];
      children=next.length?next.map(h=><div key={h.time} className="live-hour"><span>{hourLabel(h.time)}</span><img width="22" height="22" src={h.snow>0?'/assets/95ed1.svg':h.code===0?'/assets/082b6.svg':'/assets/cb057.svg'} alt={weatherDescription(h.code)}/><strong>{fmt(h.temperature)}</strong><small>{h.rainChance}% precip.</small></div>):<p className="text-sm text-[#68758a]">Hourly weather is {state.loading?'loading…':'unavailable.'}</p>;
    }
    if(name==='Weather illustration')children=<span className="live-condition" aria-label={data?weatherDescription(data.code):'Loading weather'}><img src={data?(data.code===0?'/assets/082b6.svg':data.code>=71&&data.code<=86?'/assets/f70ae.svg':'/assets/cb057.svg'):'/assets/cb057.svg'} width="22" height="22" alt=""/></span>;
    if(name==='Current weather') children=<>{children}<WeatherStatus state={state}/></>;
    if(page==='alerts'&&name==='Page content')children=<><WeatherStatus state={state}/><div className="live-forecast-card"><h2>{advice.title}</h2><p>{advice.detail}</p>{data&&<p>High {fmt(data.high)} · Low {fmt(data.low)} · Wind {Math.round(data.wind)} mph</p>}<small>Forecast guidance only. Check local authorities for official alerts.</small></div></>;
    if(page==='snow'&&name==='Snow forecast')children=<>{children}<WeatherStatus state={state}/></>;
    if(name==='Transit and forecast'){
      const t=content(p.children).includes('Snow')?'16:00':content(p.children).includes('12')?'12:00':'09:00';
      const h=data?forecastAt(data,t):undefined;
      children=React.Children.map(children,(n,i)=>i===1?cloneText(n,h?`${weatherDescription(h.code)} · feels ${fmt(h.feels)}`:'Forecast unavailable'):n);
    }
    if(e.type==='p'&&/^(Updated|Based on the) 8:30 AM/.test(text))children='Live forecast by Open-Meteo. Check local advisories.';
    if(liveOutfit&&e.type==='p'&&['Warm enough','Cozy for your first class','Ready for campus'].includes(text))children='Your selected layers';
    return React.cloneElement(e,{},children);
  };
  return walk(node);
}
