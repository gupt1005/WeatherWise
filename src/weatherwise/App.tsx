'use client';
import React, { useEffect, useRef, useState, type ReactNode, type ReactElement } from 'react';
import type { AccountView, Detail, Priority } from './account';
import AccountScreen from './AccountScreen';
import Toast from './Toast';
import PlaceSearch from './PlaceSearch';
import { placeLabel, resolvePlace, reversePlace, type Place } from './places';
import { logOut, saveChoices } from '../app/(frontend)/account-actions';
import Comfort from './screens/comfort';
import Inventory from './screens/inventory';
import Today from './screens/today';
import Whole from './screens/whole';
import Morning from './screens/morning';
import Afternoon from './screens/afternoon';
import Why from './screens/why';
import Swap from './screens/swap';
import NextFlows, { initialActivities, type Activity, type Flow } from './NextFlows';
import Settings from './screens/settings';
import { displayTemperature } from './temperature';
import WeatherWiseLogo from './WeatherWiseLogo';
import { useWeather, type Coordinates } from './weather';
import { liveWeatherUI } from './LiveWeatherUI';
import PlacePhoto from './PlacePhoto';
import { wardrobeCategories, wardrobeItems, recommendWardrobe, type OutfitSlot, type WardrobeRecommendation } from './wardrobe';
import { WardrobeCategoryScreen, WardrobePreview, WardrobeAlternatives, WardrobeItemText, WardrobeCategoryCount, wardrobeCategoryForSlot } from './WardrobeScreens';
import { periodHours } from './weather';
import { ModernToday, ModernOutfit, ModernSettings, ModernAccountEdit, type MainTab } from './ModernScreens';

const screens = { comfort: Comfort, inventory: Inventory, today: Today, whole: Whole, morning: Morning, afternoon: Afternoon, why: Why, swap: Swap, settings: Settings };
type Page = keyof typeof screens | 'location' | 'account' | 'accountEdit';
const textOf = (node: ReactNode): string => typeof node === 'string' ? node : Array.isArray(node) ? node.map(textOf).join(' ') : React.isValidElement(node) ? textOf((node.props as {children?: ReactNode}).children) : '';
const coatAssets: Record<string, string> = { 'Waterproof parka': 'c9fce.svg', 'Wool coat': 'a3ff9.svg', 'Puffer jacket': '4d85e.svg' };

const defaults={town:'West Lafayette, IN',cold:28,priority:'Comfort' as Priority,detail:'Head to toe' as Detail};

export default function App({initialAccount}:{initialAccount:AccountView|null}) {
  const [account,setAccount] = useState<AccountView|null>(initialAccount);
  const saved0=initialAccount?.choices;
  const [page, setPage] = useState<Page>(initialAccount?.onboardingComplete?'today':'location');
  const [period, setPeriod] = useState<Page>('whole');
  const [town, setTown] = useState(saved0?.town||defaults.town);
  const [college, setCollege] = useState(saved0?.college||'');
  const [coordinates,setCoordinates] = useState<Coordinates|null>(typeof saved0?.latitude==='number'&&typeof saved0?.longitude==='number'?{latitude:saved0.latitude,longitude:saved0.longitude}:null);
  // What's typed in the first screen's search field, and whether it matches the applied place.
  const [placeText,setPlaceText] = useState(saved0?.college||saved0?.town||defaults.town);
  const [placeResolved,setPlaceResolved] = useState(true);
  const [resolving,setResolving] = useState(false);
  const weather = useWeather(town,coordinates);
  const [cold, setCold] = useState(saved0?.cold??defaults.cold);
  const [style, setStyle] = useState<string>(saved0?.priority??defaults.priority);
  const [detail, setDetail] = useState<string>(saved0?.detail??defaults.detail);
  const [wardrobe,setWardrobe] = useState<string[]>(saved0?.wardrobe??[]);
  const [wardrobeCategory,setWardrobeCategory] = useState<string|null>(null);
  // Keep the signed-in person's onboarding choices saved to their account.
  const choices={town:town==='Current location'?undefined:town,college,latitude:coordinates?.latitude,longitude:coordinates?.longitude,cold,priority:style as Priority,detail:detail as Detail,wardrobe};
  const choicesKey=JSON.stringify(choices);
  const lastSaved=useRef(choicesKey);
  useEffect(()=>{
    if(!account||choicesKey===lastSaved.current)return;
    const timer=setTimeout(()=>{lastSaved.current=choicesKey;saveChoices(JSON.parse(choicesKey)).then(r=>{if(!r.ok)setNotice(r.error);});},700);
    return()=>clearTimeout(timer);
  },[account,choicesKey]);
  const applyAccount=(next:AccountView)=>{
    const c=next.choices;
    setAccount(next);
    // The location picked on the first screen wins over the one saved on the account; the autosave below updates the account.
    if(c.cold!==undefined)setCold(c.cold);
    if(c.priority)setStyle(c.priority);
    if(c.detail)setDetail(c.detail);
    if(c.wardrobe)setWardrobe(c.wardrobe);
    lastSaved.current=JSON.stringify({town:c.town,college:c.college??'',latitude:c.latitude,longitude:c.longitude,cold:c.cold??cold,priority:c.priority??style,detail:c.detail??detail,wardrobe:c.wardrobe??wardrobe});
  };
  const finishOnboarding=()=>{
    go('today');
    if(!account)return;
    lastSaved.current=choicesKey;
    saveChoices(choices,{complete:true}).then(r=>{if(r.ok)setAccount(r.account);else setNotice(r.error);});
  };
  const signOut=async()=>{
    await logOut();
    setAccount(null);setCoordinates(null);setTown(defaults.town);setCollege('');setPlaceText(defaults.town);setPlaceResolved(true);setCold(defaults.cold);setStyle(defaults.priority);setDetail(defaults.detail);setWardrobe([]);setCoat('');setSaved([]);setSaveRequest(null);
    go('location');setNotice('You’re logged out.');
  };
  const applyPlace=(place:Place)=>{
    setTown(place.town||place.name);setCollege(place.kind==='college'?place.name:'');setCoordinates(place.coordinates);
    setPlaceText(placeLabel(place));setPlaceResolved(true);setWornOutfit(null);setCoat('');
  };
  /** Turns typed text into a place when no suggestion was picked. */
  const resolveTyped=async()=>{
    const text=placeText.trim();
    if(!text){setNotice('Enter your college or college town to continue.');return false;}
    if(placeResolved)return true;
    setResolving(true);
    const place=await resolvePlace(text,new AbortController().signal).catch(()=>null);
    setResolving(false);
    if(!place){setNotice('We couldn’t find that college or town. Try picking one of the suggestions.');return false;}
    applyPlace(place);
    return true;
  };
  const useCurrentLocation=()=>{
    setNotice('Requesting location…');
    if(!navigator.geolocation){setNotice('Location is unavailable. Please enter your college or college town.');return;}
    navigator.geolocation.getCurrentPosition(async position=>{
      const coords={latitude:position.coords.latitude,longitude:position.coords.longitude};
      setCoordinates(coords);setCollege('');setTown('Current location');setPlaceText('Current location');setPlaceResolved(true);
      const place=await reversePlace(coords,new AbortController().signal).catch(()=>null);
      if(place){applyPlace(place);setNotice(`Location found: ${place.town}.`);}
      else setNotice('Location found. Loading your local forecast.');
    },()=>setNotice('Location access unavailable. Enter your college or college town to continue.'),{timeout:8000});
  };
  const owned=wardrobeCategories.filter(c=>c.items.some(i=>wardrobe.includes(i.id))).map(c=>c.name);
  const [coat, setCoat] = useState('');
  const [selected, setSelected] = useState('Waterproof parka');
  const [saved, setSaved] = useState<string[]>([]);
  const [saveRequest, setSaveRequest] = useState<{id:string; name:string; coat:string; pieces:string[]; itemIds:string[]; revision:number}|null>(null);
  const [panel, setPanel] = useState('');
  const [notice, setNotice] = useState('');
  const [flow, setFlow] = useState<Flow|null>(null);
  const [unit,setUnit] = useState<'F'|'C'>('F');
  const [darkMode,setDarkMode] = useState(()=>typeof window!=='undefined'&&(window.localStorage.getItem('weatherwise-theme')==='dark'||(!window.localStorage.getItem('weatherwise-theme')&&window.matchMedia('(prefers-color-scheme: dark)').matches)));
  const [muted,setMuted] = useState<string[]>([]);
  const [morningSummary,setMorningSummary] = useState(true);
  const [outfitReminders,setOutfitReminders] = useState(false);
  const [summaryTime,setSummaryTime] = useState('07:30');
  const [editingWardrobe,setEditingWardrobe] = useState(false);
  const [todayActivities,setTodayActivities]=useState<Activity[]>(initialActivities);
  const [wornOutfit,setWornOutfit]=useState<{pieces:string[];itemIds?:string[]}|null>(null);
  useEffect(()=>{
    document.documentElement.dataset.theme=darkMode?'dark':'light';
    window.localStorage.setItem('weatherwise-theme',darkMode?'dark':'light');
  },[darkMode]);
  const category=wardrobeCategories.find(c=>c.name===wardrobeCategory);
  const forecastHours=weather.data?periodHours(weather.data,period):[];
  // Today responds to current conditions; period-specific Outfit views plan for the coolest hour in that period.
  const feels=weather.data?(page==='today'?weather.data.feels:forecastHours.length?Math.min(...forecastHours.map(h=>h.feels)):weather.data.feels):null;
  const wet=forecastHours.some(h=>h.rainChance>=50||h.snow>0);
  const gymToday=todayActivities.some(activity=>activity.kind==='gym');
  const generatedRecommendation=recommendWardrobe(wardrobe,feels,cold,coat,wet,gymToday);
  const recommendation:WardrobeRecommendation=wornOutfit?{
    items:wornOutfit.itemIds?.length?wardrobeItems.filter(item=>wornOutfit.itemIds!.includes(item.id)):generatedRecommendation.items,
    pieces:{Tops:wornOutfit.pieces[0]||'Not selected',Layers:'',Coat:wornOutfit.pieces[1]||'Not selected',Pants:wornOutfit.pieces[2]||'Not selected',Shoes:wornOutfit.pieces[3]||'Not selected',Accessories:wornOutfit.pieces[4]||'Not selected'},
    note:'Selected from My Outfits for today.',
  }:generatedRecommendation;
  const recommendedPieces=[`${recommendation.pieces.Tops}${recommendation.items.some(i=>i.role==='layer')?' + '+recommendation.pieces.Layers:''}`,recommendation.pieces.Coat,recommendation.pieces.Pants,recommendation.pieces.Shoes,recommendation.pieces.Accessories];
  const openCategory=(name:string)=>{setWardrobeCategory(name);window.scrollTo(0,0);};
  const closeCategory=()=>{setWardrobeCategory(null);window.scrollTo(0,0);};
  // Onboarding screens have no bottom navigation, so their pop-ups sit lower, clear of Continue.
  const onboardingPage=!flow&&!category&&['location','account','comfort','inventory'].includes(page);
  const wardrobeOutfit=['today','whole','morning','afternoon','why','swap'].includes(page);
  const openFlow = (next: Flow) => { setFlow(next); setPanel(''); setNotice(''); window.scrollTo(0,0); };
  const go = (next: Page) => { setFlow(null); setPage(next); setPanel(''); setNotice(''); window.scrollTo(0,0); };
  const navigateMain=(tab:MainTab)=>tab==='plan'?openFlow('plan'):tab==='outfit'?go(period):go(tab);
  const saveCurrentOutfit=()=>{
    if(!wardrobe.length){go('inventory');setNotice('Choose a few items you own before saving an outfit.');return;}
    setSaved(s=>s.includes(String(period))?s:[...s,String(period)]);
    const periodName=period==='morning'?'Morning outfit':period==='afternoon'?'Afternoon outfit':'Whole day outfit';
    setSaveRequest({id:crypto.randomUUID(),name:periodName,coat:recommendation.pieces.Coat,pieces:recommendedPieces,itemIds:recommendation.items.map(i=>i.id),revision:Date.now()});
    setNotice('Outfit saved. Find it in My Outfits.');
  };
  const back = () => {if(page==='inventory'&&editingWardrobe){setEditingWardrobe(false);go('settings');}else go(page === 'comfort' ? 'account' : page === 'inventory' ? 'comfort' : period);};
  function transform(node: ReactNode): ReactNode {
    if (Array.isArray(node)) return node.map((n,i) => <React.Fragment key={i}>{transform(n)}</React.Fragment>);
    if (!React.isValidElement(node)) {
      if (typeof node === 'string') {
        const value=node.replace(/West Lafayette(, IN)?/g,town);
        return page==='settings'?value:displayTemperature(value,unit);
      }
      return node;
    }
    const e = node as ReactElement<Record<string, any>>;
    const p = e.props, name = p['data-name'], text = textOf(p.children).trim().replace(/\s+/g,' ');
    let children = transform(p.children), props = {...p}, tag = e.type;
    const button = (fn: () => void) => { tag = 'button'; props.type = 'button'; props.onClick = fn; };
    if (name === 'Action') button(() => {
      if (page === 'comfort') go('inventory');
      else if (page === 'inventory') {if(editingWardrobe){setEditingWardrobe(false);go('settings');}else finishOnboarding();}
      else if (page === 'today') go('whole');
      else if (page === 'why') go(period);
      else if (page === 'swap') {if(!wardrobeItems.some(i=>wardrobe.includes(i.id)&&i.role==='outer'&&i.name===selected)){setNotice('Select a coat you own, or add one to your wardrobe.');return;} setCoat(selected); go(period); setNotice('Coat updated'); }
      else saveCurrentOutfit();
    });
    if (name === 'Back' || name === 'Back control') {
      button(back);
      // The wrapper owns the action; keep its label non-interactive.
      children = p.children;
    }
    if (name === 'Tab') button(() => text === 'Today' ? go('today') : text === 'Outfit' ? go(period) : text === 'Plan' ? openFlow('plan') : go('settings'));
    if (name === 'Segment') {
      const choices: Record<string, Page> = {'Whole Day':'whole',Morning:'morning',Afternoon:'afternoon'};
      if(page==='settings'&&text.includes('°')){
        const value=text.startsWith('Fahrenheit')?'F':'C';
        const active=unit===value;
        props.className=`${props.className||''} onboarding-choice${active?' is-active':''}`;
        props['aria-pressed']=active;button(()=>setUnit(value));
      }else if(page==='settings'&&text==='Just the basics'){
        const active=detail==='Basics';
        props.className=`${props.className||''} onboarding-choice${active?' is-active':''}`;
        props['aria-pressed']=active;button(()=>setDetail('Basics'));
      }else if (choices[text]) button(() => {setPeriod(choices[text]); go(choices[text]);});
      else {
        const active = ['Comfort','Balanced','Style'].includes(text) ? style === text : detail === text;
        props.className=`${props.className||''} onboarding-choice${active?' is-active':''}`;
        props['aria-pressed']=active;
        button(() => ['Comfort','Balanced','Style'].includes(text) ? setStyle(text) : setDetail(text));
      }
    }
    if (name === 'Clothing category') {
      const active=owned.includes(text);
      props.className=`${props.className||''} onboarding-category${active?' is-active':''}`;
      props['aria-pressed'] = active;
      props['aria-label']=`${text}, ${wardrobeCategories.find(c=>c.name===text)?.items.filter(i=>wardrobe.includes(i.id)).length||0} items selected`;
      props['aria-haspopup']=undefined;
      button(() => openCategory(text));
      children = <>{transformCategory(p.children, active)}<WardrobeCategoryCount count={wardrobeCategories.find(c=>c.name===text)?.items.filter(i=>wardrobe.includes(i.id)).length||0}/></>;
    }
    if (name === 'Temperature sensitivity slider') return <input key={p['data-node-id']} aria-label="Cold sensitivity" type="range" min="0" max="100" value={cold} onChange={e=>setCold(Number(e.target.value))} className="w-full h-8 accent-[#6268c8]"/>;
    if (name === 'Selection') children = <span className="text-sm font-semibold text-[#6268c8]">{cold < 40 ? 'I run cold' : cold > 65 ? 'I run warm' : 'I feel just right'}</span>;
    if(page==='settings'){
      if(p['data-node-id']==='1:6196') {
        tag='input';props.value=town;props['aria-label']='Campus location';props.onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{setCoordinates(null);setTown(e.target.value);};props.className+=' w-full outline-none bg-transparent';children=undefined;
      }
      if(p['data-node-id']==='1:6275'){
        tag='input';props.type='time';props.value=summaryTime;props['aria-label']='Daily summary time';props.onChange=(e:React.ChangeEvent<HTMLInputElement>)=>setSummaryTime(e.target.value);children=undefined;
      }
      if(name==='Sensitivity slider') children=<>{children}<input aria-label="Temperature sensitivity" type="range" min="0" max="100" value={cold} onChange={e=>setCold(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/></>;
      if(name==='Active track') props.style={width:`${cold}%`};
      if(name==='Thumb') props.style={left:`calc(${cold}% - 12px)`};
      if(p['data-node-id']==='1:6217') children=cold<40?'A little cold':cold>65?'A little warm':'Just right';
      if(p['data-node-id']==='1:6245') children=`${owned.length} categories selected. Tap a category to update.`;
      if(p['data-node-id']==='1:6243') button(()=>{setEditingWardrobe(true);go('inventory');});
      if(name==='Choice'){
        const category=text.replace(/^[✓+] /,'');
        const active=owned.includes(category);
        button(()=>openCategory(category));
        props.style={background:active?'#6268c8':'white',borderColor:active?'#6268c8':'#dfe5ee',color:active?'white':'#68758a'};
        props['aria-pressed']=active;
        children=React.Children.map(p.children,n=>React.isValidElement(n)?React.cloneElement(n as ReactElement<any>,{},`${active?'✓':'+'} ${category}`):n);
      }
      if(name==='Preference'){
        const switchIndex=React.Children.toArray(p.children).findIndex(n=>React.isValidElement(n)&&['Enabled','Disabled'].includes((n.props as any)['data-name']));
        const type=text.startsWith('Snow alerts')?'snow':text.startsWith('Wind chill')?'wind chill':'temperature-drop';
        const morning=text.startsWith('Morning summary'),reminders=text.startsWith('Outfit reminders');
        const enabled=morning?morningSummary:reminders?outfitReminders:!muted.includes(type);
        children=React.Children.map(p.children,(n,i)=>i===switchIndex&&React.isValidElement(n)?
          React.createElement('button',{...(n.props as any),key:'switch',type:'button',role:'switch','aria-label':morning?'Morning summary':reminders?'Outfit reminders':`${type} alerts`,'aria-checked':enabled,onClick:()=>morning?setMorningSummary(v=>!v):reminders?setOutfitReminders(v=>!v):setMuted(v=>v.includes(type)?v.filter(t=>t!==type):[...v,type])},
          <img alt="" className="absolute block inset-0 size-full" src={enabled?'/assets/3a105.svg':'/assets/295da.svg'}/>):transform(n));
      }
    }
    if (name === 'Outfit item') {
      const slot=text.split(' ')[0] as OutfitSlot;
      button(() => { if(slot==='Coat') {setSelected(recommendation.pieces.Coat);go('swap');} else openCategory(wardrobeCategoryForSlot(slot)); });
      props.style={textAlign:'left'};
      children=<WardrobeItemText slot={slot} value={recommendation.pieces[slot]||'Not selected'}/>;
    }
    if (name === 'Outerwear' && coat && page !== 'today') {
      children = React.Children.map(children,(child,i)=>i === 0 && React.isValidElement(child) ? React.cloneElement(child as ReactElement<any>,{},<img className="absolute inset-0 size-full" alt={coat} src={`/assets/${coatAssets[coat]}`}/>) : child);
    }
    if (name === 'Coat alternative') {
      const label = Object.keys(coatAssets).find(c=>text.includes(c))!;
      props.style={background:selected===label?'#e8e9fc':'#f3f6fb',borderColor:selected===label?'#6268c8':'#dfe5ee'};
      props['aria-pressed']=selected===label; button(()=>setSelected(label));
    }
    if (name === 'x' || name === 'Modal scrim') button(()=>go(period));
    if (name === 'refresh-cw') button(()=>{const coats=wardrobeItems.filter(i=>wardrobe.includes(i.id)&&i.role==='outer');if(!coats.length){openCategory('Coats & jackets');return;}const current=coats.findIndex(i=>i.name===recommendation.pieces.Coat);setCoat(coats[(current+1)%coats.length].name);setNotice('Updated using a coat from your wardrobe.');});
    if(wardrobeOutfit&&name==='Coordinated outfit illustration'){
      props.className='wardrobe-preview-shell';children=<WardrobePreview recommendation={recommendation} onEdit={()=>{setEditingWardrobe(false);go('inventory');}}/>;
    }
    if(wardrobeOutfit&&name==='Warmth rating')return null;
    if(page==='why'&&name==='Recommendation statement')children=<WardrobePreview recommendation={recommendation}/>;
    if(page==='swap'&&name==='Illustrated alternatives'){
      props.className='wardrobe-alternatives';
      children=<WardrobeAlternatives items={wardrobeItems.filter(i=>wardrobe.includes(i.id)&&i.role==='outer')} value={selected} onChange={setSelected} onEdit={()=>openCategory('Coats & jackets')}/>;
    }
    if(['1:3188','1:2978','1:3929','1:3299','1:3819','1:3840'].includes(p['data-node-id']))children=recommendation.note;
    if(p['data-node-id']==='1:3400')children=`${wardrobe.length} items selected. Open a category to choose your pieces.`;
    if (name === 'Plan shortcut') button(()=>openFlow('plan'));
    if (name === 'Warning') button(()=>openFlow('snow'));
    if (name === 'bell') button(()=>openFlow('alerts'));
    if (e.type === 'p' && (p['data-node-id'] === '1:3254' || text.startsWith('Why This Outfit') || text.startsWith('Saved Outfits') || text === 'Skip for now' || text === '← Back')) {
      button(()=>text.startsWith('Why') ? go('why') : text.startsWith('Saved') ? openFlow('savedList') : text === 'Skip for now' ? finishOnboarding() : text === '← Back' ? back() : openFlow('alerts'));
    }
    return React.createElement(tag,{...props,key:p['data-node-id']},children);
  }
  function transformCategory(nodes: ReactNode, active:boolean): ReactNode {
    return React.Children.map(nodes,n=>{
      if(!React.isValidElement(n)) return n;
      const e=n as ReactElement<any>;
      if(e.type==='img' && ['/assets/1a02e.svg','/assets/f8699.svg'].includes(e.props.src)) return React.cloneElement(e,{src:active?'/assets/1a02e.svg':'/assets/f8699.svg'});
      return React.cloneElement(e,{},transformCategory(e.props.children,active));
    });
  }
  const modernPage=page==='today'?<ModernToday name={account?.preferredName||'there'} weather={weather} unit={unit} town={town} activities={todayActivities} recommendation={recommendation} onNavigate={navigateMain} onAlerts={()=>openFlow('alerts')}/>:
    ['whole','morning','afternoon'].includes(page)?<ModernOutfit weather={weather} unit={unit} period={period} recommendation={recommendation} onNavigate={navigateMain} onPeriod={value=>{setPeriod(value as Page);go(value as Page);}} onSlot={slot=>{if(slot==='Coat'){setSelected(recommendation.pieces.Coat);go('swap');}else openCategory(wardrobeCategoryForSlot(slot));}} onSave={saveCurrentOutfit} onSaved={()=>openFlow('savedList')} onWhy={()=>go('why')}/>:
    page==='accountEdit'&&account?<ModernAccountEdit account={account} onNavigate={navigateMain} onCancel={()=>go('settings')} onSaved={next=>{setAccount(next);go('settings');setNotice('Account updated.');}}/>:
    page==='settings'?<ModernSettings darkMode={darkMode} onDarkMode={setDarkMode} place={{label:college||town,town,college}} onPlace={applyPlace} account={account} onLogout={signOut} onEditAccount={()=>go('accountEdit')} value={{town,unit,cold,priority:style,detail,morning:morningSummary,reminders:outfitReminders,summaryTime,muted}} wardrobeCount={wardrobe.length} onWardrobe={()=>{setEditingWardrobe(true);go('inventory');}} onNavigate={navigateMain} onChange={patch=>{
      if(patch.town!==undefined){setCoordinates(null);setTown(patch.town);}
      if(patch.unit!==undefined)setUnit(patch.unit);
      if(patch.cold!==undefined)setCold(patch.cold);
      if(patch.priority!==undefined)setStyle(patch.priority);
      if(patch.detail!==undefined)setDetail(patch.detail);
      if(patch.morning!==undefined)setMorningSummary(patch.morning);
      if(patch.reminders!==undefined)setOutfitReminders(patch.reminders);
      if(patch.summaryTime!==undefined)setSummaryTime(patch.summaryTime);
      if(patch.muted!==undefined)setMuted(patch.muted);
    }}/>:null;
  return <>
    {category&&<WardrobeCategoryScreen key={category.name} category={category} selected={wardrobe} onBack={closeCategory} onSave={ids=>{setWardrobe(v=>[...v.filter(id=>!category.items.some(i=>i.id===id)),...ids]);closeCategory();}}/>}
    {!flow && !category && (page === 'location' ? <main className="location screen">
      <header><div className="flex justify-between items-center gap-3"><WeatherWiseLogo/><span>01 / 04</span></div><div className="progress"><i/><i/><i/><i/></div></header>
      <PlacePhoto location={weather.data} searching={weather.loading} college={college||undefined}/>
      <section><h1>Good days start with<br/>the right layers.</h1><p>Weather meets your wardrobe. Let’s get you ready for campus, whatever’s outside.</p></section>
      <div className="town-field">
        <label className="town-label" htmlFor="town">Your college or college town</label>
        <div className="town-input">
          <PlaceSearch id="town" text={placeText} placeholder="e.g. Purdue University or West Lafayette, IN" onTextChange={text=>{setPlaceText(text);setPlaceResolved(false);}} onSelect={applyPlace} onSubmitText={()=>{resolveTyped();}}/>
          <img src="/assets/faf3f.svg" alt=""/>
        </div>
        <p className="town-hint">{placeResolved&&college&&town&&town!==college?<>Forecast for <strong>{town}</strong></>:'Search by college name or town, then pick the best match.'}</p>
      </div>
      <button className="location-link" onClick={useCurrentLocation}><img src="/assets/5a86c.svg" alt=""/>Use my current location</button>
      <small>Location is only used for your local forecast. You can change it anytime in Settings.</small>
      <button className="primary" disabled={resolving} onClick={async()=>{if(await resolveTyped())go('account');}}>{resolving?'Finding your campus…':'Continue →'}</button>
    </main> : page === 'account' ? <AccountScreen account={account} place={{town:town==='Current location'?'':town,college:college||undefined,latitude:coordinates?.latitude,longitude:coordinates?.longitude}} onBack={()=>go('location')} onContinue={()=>go('comfort')} onAuthenticated={(next,mode)=>{applyAccount(next);if(mode==='login'&&next.onboardingComplete){go('today');setNotice(`Welcome back, ${next.preferredName}.`);}else go('comfort');}} onLogout={signOut}/> : modernPage||(page==='accountEdit'?null:transform(liveWeatherUI(screens[page](),weather,'F',page))))}
    <NextFlows key={account?.email||'signed-out'} active={category?null:flow} navigate={setFlow} town={town} currentCoat={coat} saveRequest={saveRequest} initialSavedOutfits={account?.savedOutfits??[]} muted={muted} setMuted={setMuted} unit={unit} liveWeather={weather} wardrobe={wardrobe} recommendedPieces={recommendedPieces} onActivitiesChange={setTodayActivities} onWearOutfit={next=>{setWornOutfit(next);setPeriod('whole');setCoat(next.pieces[1]||'');setNotice('Outfit set for today.');}} exit={destination=>go(destination)}/>
    {notice && <Toast key={notice} className={onboardingPage?'toast-low':''} avoid={onboardingPage?'.location .primary, [data-name="Action"]':undefined} onClick={()=>setNotice('')} onDismiss={()=>setNotice('')}>{notice}</Toast>}
    {panel && <div className="panel-backdrop"><section className="panel" role="dialog" aria-modal="true" aria-label={panel}>
      <button className="text-[#6268c8] text-sm" onClick={()=>setPanel('')}>← Back</button><h1>{panel}</h1>
      {panel === 'Settings' ? <><button className="setting" onClick={()=>go('location')}>Location <span>{town} →</span></button><button className="setting" onClick={()=>go('comfort')}>Comfort preferences →</button><button className="setting" onClick={()=>go('inventory')}>Clothing inventory →</button></> :
      panel === 'Saved Outfits' ? saved.length ? saved.map(s=><div className="setting" key={s}><button onClick={()=>{setPeriod(s as Page);go(s as Page);}}>Campus snow day · {s === 'whole' ? 'Whole Day' : s} →</button><button aria-label="Delete saved outfit" onClick={()=>setSaved(v=>v.filter(x=>x!==s))}>Delete</button></div>) : <p>No saved outfits yet. Save an outfit to see it here.</p> :
      panel === 'Weather alerts' ? <><div className="setting">Snow after 3 PM<p>Waterproof boots for the walk home.</p></div><div className="setting">Wind chill · Feels like 26°F</div><div className="setting">Evening temperature drop · Low 20°F</div><button className="primary" onClick={()=>{setPeriod('afternoon');go('afternoon');}}>View afternoon outfit →</button></> :
      <p>The Plan screens haven’t been supplied yet. They’ll connect here when you add them.</p>}
    </section></div>}
  </>;
}
