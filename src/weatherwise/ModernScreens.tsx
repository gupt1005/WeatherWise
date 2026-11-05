import { createElement as el, useState, type ChangeEvent, type FormEvent, type ReactNode, type Ref } from 'react';
import { updateAccount } from '../app/(frontend)/account-actions';
import PlaceSearch from './PlaceSearch';
import { resolvePlace, type Place } from './places';
import { dateLabel, hourLabel, temperature, weatherDescription, type WeatherState } from './weather';
import { outfitSlots, type WardrobeRecommendation } from './wardrobe';
import type { Activity } from './NextFlows';
import ClothingPhotos from './ClothingPhotos';
import type { AccountView } from './account';

export type MainTab='today'|'outfit'|'plan'|'settings';
type Navigate=(tab:MainTab)=>void;
type ContainerProps={children?:ReactNode;className?:string};
export const Surface=({children,className=''}:ContainerProps)=>el('div',{className},children);
const Text=({children,className=''}:ContainerProps)=>el('p',{className},children);
const Title=({children}:ContainerProps)=>el('h1',{className:'modern-title'},children);
const Heading=({children}:ContainerProps)=>el('h2',{className:'modern-section-title'},children);
export const Button=({children,className='',onClick,label}:{children:ReactNode;className?:string;onClick:()=>void;label?:string})=>el('button',{type:'button',className,onClick,'aria-label':label},children);
const icons:Record<string,string>={today:'d1224.svg',outfit:'96544.svg',plan:'48cb2.svg',settings:'36aa1.svg',bell:'237d9.svg',shirt:'96544.svg',location:'faf3f.svg',cloud:'cb057.svg',snow:'95ed1.svg',sun:'082b6.svg',edit:'59891.svg',delete:'8fb72.svg'};
const Icon=({name}:{name:string})=>el('img',{src:`/assets/${icons[name]||icons.shirt}`,alt:'',width:22,height:22,className:'modern-icon'});
function WeatherIcon({code=3}:{code?:number}) {return <Icon name={code===0?'sun':code>=71&&code<=86?'snow':'cloud'}/>;}
export function ModernNav({active,onNavigate}:{active:MainTab;onNavigate:Navigate}) {
  return el('nav',{className:'modern-nav','data-name':'Bottom navigation','aria-label':'Main navigation'},(['today','outfit','plan','settings'] as MainTab[]).map(tab=>
    el('button',{key:tab,type:'button',className:active===tab?'is-active':'','aria-current':active===tab?'page':undefined,onClick:()=>onNavigate(tab)},<Icon name={tab}/>,el('span',{},tab[0].toUpperCase()+tab.slice(1)))));
}
function Page({children,tab,onNavigate}:{children:ReactNode;tab:MainTab;onNavigate:Navigate}) {
  return el('main',{className:`screen modern-screen modern-${tab}`},<Surface className="modern-content">{children}</Surface>,<ModernNav active={tab} onNavigate={onNavigate}/>);
}
export function ModernToday({name,weather,unit,town,activities,recommendation,onNavigate,onAlerts}:{name:string;weather:WeatherState;unit:'F'|'C';town:string;activities:Activity[];recommendation:WardrobeRecommendation;onNavigate:Navigate;onAlerts:()=>void}) {
  const [expanded,setExpanded]=useState(false);
  const data=weather.data;
  const hour=data?Number(data.time.slice(11,13)):new Date().getHours();
  const greeting=hour<12?'morning':hour<17?'afternoon':'evening';
  const hourly=data?.hours.filter(h=>h.time>=data.time).slice(0,expanded?12:5)||[];
  const feels=data?.feels??null;
  return <Page tab="today" onNavigate={onNavigate}>
    <Surface className="modern-greeting"><Surface><Text>Good {greeting},</Text><Title>{`${name}.`}</Title></Surface><Button className="modern-icon-button" label="Weather alerts" onClick={onAlerts}><Icon name="bell"/></Button></Surface>
    <Text className="modern-muted">{town} · {dateLabel(data)}</Text>
    <Surface className="modern-weather">
      <Surface className="modern-temperature-row"><Text className="modern-temperature">{data?temperature(data.temperature,unit,false):'—'}</Text><Surface className="modern-weather-icon"><WeatherIcon code={data?.code}/></Surface></Surface>
      <Text className="modern-condition">{data?weatherDescription(data.code):weather.loading?'Loading live weather…':'Weather unavailable'}</Text>
      <Text className="modern-muted">{data?`H ${temperature(data.high,unit,false)}  L ${temperature(data.low,unit,false)}  ·  Feels like ${temperature(data.feels,unit,false)}`:'Connect to see the local forecast'}</Text>
    </Surface>
    <Button className="modern-advice" onClick={()=>onNavigate('outfit')}><Surface className="modern-advice-icon"><Icon name="shirt"/></Surface><Surface><Text className="modern-semibold">{feels===null?'Plan your layers':feels<65?'Wear layers':'Keep it comfortable'}</Text><Text className="modern-muted">{feels===null?'Choose clothes from your wardrobe.':feels<65?'Cool outside. Bring a jacket.':'Light layers for your day on campus.'}</Text></Surface><Text>›</Text></Button>
    <Surface className="modern-section-header"><Heading>Hourly</Heading><Button className="modern-link" onClick={()=>setExpanded(v=>!v)}>{expanded?'Show less':'See all'} ›</Button></Surface>
    <Surface className="modern-hourly">{hourly.length?hourly.map(h=><Surface key={h.time} className="modern-hour"><Text>{hourLabel(h.time)}</Text><WeatherIcon code={h.code}/><Text className="modern-semibold">{temperature(h.temperature,unit,false)}</Text></Surface>):<Text className="modern-muted">Hourly forecast is unavailable.</Text>}</Surface>
    <Surface className="modern-section-header"><Heading>Today’s plan</Heading><Button className="modern-link" onClick={()=>onNavigate('plan')}>See all ›</Button></Surface>
    <Surface className="modern-plan-preview">{activities.slice(0,3).map(a=>{
      const forecast=data?.hours.find(h=>h.time===`${data.date}T${a.start.slice(0,2)}:00`);
      return <Button key={a.id} className="modern-mini-activity" onClick={()=>onNavigate('plan')}><Text className="modern-mini-time">{hourLabel(`2000-01-01T${a.start}`)}</Text><Surface><Text className="modern-semibold">{a.name}</Text><Text className="modern-muted">{a.where} · {a.minutes} min {a.travel.toLowerCase()}</Text></Surface><Surface className="modern-mini-weather"><Text>{forecast?temperature(forecast.feels,unit,false):'—'}</Text><WeatherIcon code={forecast?.code}/></Surface></Button>;
    })}{!activities.length&&<Button className="modern-link" onClick={()=>onNavigate('plan')}>Add your first activity →</Button>}</Surface>
    <Surface className="modern-source"><Surface><Text>{weather.error||`Live forecast${data?` · ${data.location}`:''}`}</Text>{el('a',{href:'https://open-meteo.com/',target:'_blank',rel:'noreferrer'},'Weather data by Open-Meteo')}</Surface><Button className="modern-link" onClick={weather.refresh}>{weather.error?'Retry':'Refresh'}</Button></Surface>
  </Page>;
}
export function ModernOutfit({weather,unit,period,recommendation,onPeriod,onSlot,onSave,onSaved,onWhy,onNavigate}:{weather:WeatherState;unit:'F'|'C';period:string;recommendation:WardrobeRecommendation;onPeriod:(value:string)=>void;onSlot:(slot:string)=>void;onSave:()=>void;onSaved:()=>void;onWhy:()=>void;onNavigate:Navigate}) {
  return <Page tab="outfit" onNavigate={onNavigate}>
    <Surface className="modern-outfit-heading"><Button className="modern-back" label="Back to Today" onClick={()=>onNavigate('today')}>‹</Button><Title>{period==='morning'?'Morning outfit':period==='afternoon'?'Afternoon outfit':'Your outfit'}</Title></Surface>
    <Text className="modern-muted">{dateLabel(weather.data)}{weather.data?` · ${temperature(weather.data.temperature,unit,false)} and ${weatherDescription(weather.data.code).toLowerCase()}`:''}</Text>
    <Surface className="modern-period">
      {[['whole','Whole day'],['morning','Morning'],['afternoon','Afternoon']].map(([value,label])=>el('button',{type:'button',key:value,className:period===value?'is-active':'','aria-pressed':period===value,onClick:()=>onPeriod(value)},label))}
      <Button className="modern-period-saved" label="Open My Outfits" onClick={onSaved}>My outfits <span aria-hidden="true">›</span></Button>
    </Surface>
    <Surface className="modern-outfit-image"><ClothingPhotos items={recommendation.items}/></Surface>
    <Surface className="modern-outfit-list">{outfitSlots.map(slot=><Button key={slot} className="modern-outfit-item" onClick={()=>onSlot(slot)}><Icon name="shirt"/><Text className="modern-item-label">{slot}</Text><Text className="modern-item-value">{recommendation.pieces[slot]}</Text><Text>›</Text></Button>)}</Surface>
    <Button className="modern-primary" onClick={onSave}>Save to My Outfits</Button>
    <Surface className="modern-supporting"><Button className="modern-link" onClick={onWhy}>Why this outfit</Button></Surface>
  </Page>;
}
/** Location search in Settings: applies a picked suggestion, or the best match on Enter; otherwise keeps the current place. */
function SettingsPlaceField({place,onPlace}:{place:{label:string;town:string;college:string};onPlace:(place:Place)=>void}) {
  const [text,setText]=useState(place.label);
  const [editing,setEditing]=useState(false);
  const [status,setStatus]=useState('');
  const shown=editing?text:place.label;
  const commit=async()=>{
    if(!text.trim()||text===place.label){setEditing(false);return;}
    setStatus('Finding your campus…');
    const found=await resolvePlace(text,new AbortController().signal).catch(()=>null);
    if(found){onPlace(found);setEditing(false);setStatus('');}
    else setStatus('No match found. Try picking one of the suggestions.');
  };
  return <Surface className="modern-place-field">
    <Surface className="modern-location-field"><Icon name="location"/>
      <PlaceSearch ariaLabel="College or college town" text={shown} placeholder="Search a college or town" onTextChange={t=>{setText(t);setEditing(true);setStatus('');}} onSelect={p=>{onPlace(p);setEditing(false);setStatus('');}} onSubmitText={commit} onBlur={()=>setTimeout(()=>setEditing(false),250)}/>
    </Surface>
    <Text className="modern-muted modern-place-hint">{status||(place.college&&place.town&&place.town!==place.college?`Forecast for ${place.town}`:'Search by college name or town.')}</Text>
  </Surface>;
}
export type ModernPreferences={town:string;unit:'F'|'C';cold:number;priority:string;detail:string;morning:boolean;reminders:boolean;summaryTime:string;muted:string[]};
export function ModernSettings({darkMode,onDarkMode,place,onPlace,account,onLogout,onEditAccount,value,onChange,wardrobeCount,onWardrobe,onNavigate}:{darkMode:boolean;onDarkMode:(enabled:boolean)=>void;place:{label:string;town:string;college:string};onPlace:(place:Place)=>void;account:AccountView|null;onLogout:()=>void;onEditAccount:()=>void;value:ModernPreferences;onChange:(patch:Partial<ModernPreferences>)=>void;wardrobeCount:number;onWardrobe:()=>void;onNavigate:Navigate}) {
  const toggle=(name:string)=>onChange({muted:value.muted.includes(name)?value.muted.filter(t=>t!==name):[...value.muted,name]});
  const switches:[string,string,boolean,()=>void,string][]=[
    ['Morning summary','Weather + your outfit before class',value.morning,()=>onChange({morning:!value.morning}),'bell'],
    ['Snow alerts','Timing and waterproof layer reminders',!value.muted.includes('snow'),()=>toggle('snow'),'snow'],
    ['Wind chill alerts','When the air feels colder',!value.muted.includes('wind chill'),()=>toggle('wind chill'),'cloud'],
    ['Temperature-drop alerts','Heads-up to pack extra warmth',!value.muted.includes('temperature-drop'),()=>toggle('temperature-drop'),'cloud'],
    ['Plan change reminders','Remind me to check my outfit',value.reminders,()=>onChange({reminders:!value.reminders}),'plan'],
  ];
  return <Page tab="settings" onNavigate={onNavigate}>
    <Title>Settings</Title>
    {account&&<Surface className="modern-account-card">
      <Surface className="modern-account-summary"><Surface className="modern-account-avatar">{account.preferredName.slice(0,1).toUpperCase()}</Surface><Surface><Text>{account.preferredName}</Text><Text className="modern-muted">{`${account.firstName} ${account.lastName}`}</Text><Text className="modern-muted">{account.email}</Text></Surface></Surface>
      <Surface className="modern-account-actions"><Button className="modern-account-edit" onClick={onEditAccount}><Icon name="edit"/>Edit account</Button><Button className="modern-logout" onClick={onLogout}>Log out</Button></Surface>
    </Surface>}
    <Heading>Appearance</Heading>
    <Surface className="modern-settings-card modern-theme-card">
      <Surface className="modern-notification">
        <Surface className="modern-theme-icon"><span/></Surface>
        <Surface><Text>Dark mode</Text><Text className="modern-muted">Use darker colors throughout WeatherWise</Text></Surface>
        {el('button',{type:'button',role:'switch','aria-label':'Dark mode','aria-checked':darkMode,className:`modern-switch${darkMode?' is-on':''}`,onClick:()=>onDarkMode(!darkMode)},el('span',{}))}
      </Surface>
    </Surface>
    <Heading>Location</Heading>
    <SettingsPlaceField place={place} onPlace={onPlace}/>
    <Heading>Temperature units</Heading>
    <Surface className="modern-unit-control">{(['F','C'] as const).map(unit=>el('button',{type:'button',key:unit,className:value.unit===unit?'is-active':'','aria-pressed':value.unit===unit,onClick:()=>onChange({unit})},`°${unit}`))}</Surface>
    <Heading>Comfort</Heading>
    <Surface className="modern-settings-card">
      <Text>Temperature sensitivity</Text>
      {el('input',{type:'range',min:0,max:100,value:value.cold,'aria-label':'Temperature sensitivity',onChange:(e:any)=>onChange({cold:Number(e.target.value)}),className:'modern-range'})}
      <Surface className="modern-range-labels"><Text>Colder</Text><Text>Warmer</Text></Surface>
      <Text className="modern-settings-label">Outfit priority</Text>
      <Surface className="modern-priority">{['Comfort','Balanced','Style'].map(priority=>el('button',{type:'button',key:priority,className:priority===value.priority?'is-active':'','aria-pressed':priority===value.priority,onClick:()=>onChange({priority})},priority))}</Surface>
      <Text className="modern-settings-label">Recommendation detail</Text>
      <Surface className="modern-priority">{['Basics','Head to toe'].map(detail=>el('button',{type:'button',key:detail,className:detail===value.detail?'is-active':'','aria-pressed':detail===value.detail,onClick:()=>onChange({detail})},detail))}</Surface>
    </Surface>
    <Surface className="modern-section-header"><Heading>Wardrobe</Heading><Button className="modern-link" onClick={onWardrobe}>Edit ›</Button></Surface>
    <Button className="modern-wardrobe-link" onClick={onWardrobe}><Icon name="shirt"/><Text>{wardrobeCount} items selected</Text><Text>›</Text></Button>
    <Heading>Notifications</Heading>
    <Surface className="modern-settings-card modern-notifications">{switches.map(([label,description,enabled,change,icon])=><Surface key={label} className="modern-notification"><Icon name={icon}/><Surface><Text>{label}</Text><Text className="modern-muted">{description}</Text></Surface>{el('button',{type:'button',role:'switch','aria-label':label,'aria-checked':enabled,className:`modern-switch${enabled?' is-on':''}`,onClick:change},el('span',{}))}</Surface>)}
      <Surface className="modern-summary-time"><Text>Summary time</Text>{el('input',{type:'time',value:value.summaryTime,'aria-label':'Daily summary time',onChange:(e:any)=>onChange({summaryTime:e.target.value})})}</Surface>
    </Surface>
    <Text className="modern-footnote">Theme is saved on this device. Location, comfort, and wardrobe choices are saved to your account. Notification controls are prototype preferences.</Text>
  </Page>;
}
export function ModernActivityCard({activity,weather,unit,onEdit,onDelete,cardRef}:{activity:Activity;weather?:WeatherState;unit:'F'|'C';onEdit:()=>void;onDelete:()=>void;cardRef?:Ref<HTMLDivElement>}) {
  const forecast=weather?.data?.hours.find(h=>h.time===`${weather.data!.date}T${activity.start.slice(0,2)}:00`);
  return el('div',{'data-name':'Activity',className:'modern-timeline-entry',ref:cardRef},
    <Text className="modern-timeline-time">{hourLabel(`2000-01-01T${activity.start}`)}</Text>,
    <Surface className="modern-activity-card"><Button className="modern-activity-body" onClick={onEdit}><Surface><Text className="modern-activity-name">{activity.name}</Text><Text className="modern-muted">{activity.where} · {activity.minutes} min {activity.travel.toLowerCase()}</Text></Surface><Surface className="modern-mini-weather"><Text>{forecast?temperature(forecast.feels,unit,false):'—'}</Text><WeatherIcon code={forecast?.code}/></Surface></Button>
      <Surface className="modern-activity-actions"><Button className="modern-link" label={`Edit ${activity.name}`} onClick={onEdit}><Icon name="edit"/>Edit</Button><Button className="modern-link" label={`Delete ${activity.name}`} onClick={onDelete}><Icon name="delete"/>Delete</Button></Surface>
    </Surface>);
}

export function ModernAccountEdit({account,onCancel,onSaved,onNavigate}:{account:AccountView;onCancel:()=>void;onSaved:(account:AccountView)=>void;onNavigate:Navigate}) {
  const [values,setValues]=useState({firstName:account.firstName,lastName:account.lastName,preferredName:account.preferredName,email:account.email,currentPassword:'',newPassword:''});
  const [error,setError]=useState('');
  const [pending,setPending]=useState(false);
  const set=(key:keyof typeof values)=>(e:ChangeEvent<HTMLInputElement>)=>setValues(v=>({...v,[key]:e.target.value}));
  const needsCurrent=values.email.trim().toLowerCase()!==account.email.toLowerCase()||values.newPassword.length>0;
  const submit=async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();setPending(true);setError('');
    try{const result=await updateAccount(values);if(result.ok)onSaved(result.account);else setError(result.error);}
    catch{setError('Something went wrong. Please try again.');}
    finally{setPending(false);}
  };
  const field=(label:string,key:keyof typeof values,props:Record<string,unknown>={})=><label className="modern-field"><span>{label}</span><input value={values[key]} onChange={set(key)} {...props}/></label>;
  return <Page tab="settings" onNavigate={onNavigate}>
    <Surface className="modern-outfit-heading"><Button className="modern-icon-button" label="Back to settings" onClick={onCancel}><span aria-hidden="true">‹</span></Button><Title>Edit account</Title></Surface>
    <form className="modern-account-form" onSubmit={submit}>
      <Heading>Your name</Heading>
      <Surface className="modern-settings-card">
        <Surface className="modern-field-row">{field('First name','firstName',{autoComplete:'given-name',required:true})}{field('Last name','lastName',{autoComplete:'family-name',required:true})}</Surface>
        {field('What should we call you?','preferredName',{autoComplete:'nickname',required:true})}
        <Text className="modern-muted">Shown in your greeting on the Today screen.</Text>
      </Surface>
      <Heading>Sign-in details</Heading>
      <Surface className="modern-settings-card">
        {field('Email','email',{type:'email',autoComplete:'email',required:true})}
        {field('New password','newPassword',{type:'password',autoComplete:'new-password',minLength:8,placeholder:'Leave blank to keep your current password'})}
        {field('Current password','currentPassword',{type:'password',autoComplete:'current-password',required:needsCurrent,placeholder:needsCurrent?'Required to change email or password':'Only needed for email or password changes'})}
      </Surface>
      {error&&<p role="alert" className="account-error">{error}</p>}
      <Surface className="modern-account-form-actions">
        <Button className="modern-account-cancel" onClick={onCancel}>Cancel</Button>
        <button type="submit" className="modern-primary" disabled={pending}>{pending?'Saving…':'Save changes'}</button>
      </Surface>
    </form>
  </Page>;
}
