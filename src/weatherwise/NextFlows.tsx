import Toast from './Toast';
import React, { useEffect, useRef, useState, type ReactNode, type ReactElement } from 'react';
import Alerts from './screens/alerts';
import Plan from './screens/plan';
import PlanUpdated from './screens/planUpdated';
import AddActivity from './screens/addActivity';
import EditActivity from './screens/editActivity';
import SavedList from './screens/savedList';
import SavedDetail from './screens/savedDetail';
import EditOutfit from './screens/editOutfit';
import DeleteOutfit from './screens/deleteOutfit';
import Snow from './screens/snow';
import Deleted from './screens/deleted';
import { displayTemperature } from './temperature';
import { type WeatherState, temperature, weatherDescription } from './weather';
import { liveWeatherUI } from './LiveWeatherUI';
import { wardrobeItems, type WardrobeRecommendation } from './wardrobe';
import { WardrobePreview } from './WardrobeScreens';
import { ModernActivityCard, ModernNav } from './ModernScreens';
import { deleteSavedOutfit, saveSavedOutfit } from '../app/(frontend)/saved-outfit-actions';
import type { SavedOutfitView } from './savedOutfits';

const views = { alerts: Alerts, plan: Plan, planUpdated: PlanUpdated, addActivity: AddActivity, editActivity: EditActivity, savedList: SavedList, savedDetail: SavedDetail, editOutfit: EditOutfit, deleteOutfit: DeleteOutfit, snow: Snow, deleted: Deleted };
export type Flow = keyof typeof views;
export type Activity = { id: number; name: string; start: string; end: string; where: string; environment: string; travel: string; minutes: string; kind?:'gym' };
type Outfit = SavedOutfitView;
export const initialActivities: Activity[] = [
  {id:1,name:'Chemistry lecture',start:'09:00',end:'10:15',where:'Wetherill Lab',environment:'Indoors',travel:'Walk',minutes:'12'},
  {id:2,name:'Lunch with Maya',start:'12:00',end:'12:45',where:'Memorial Union',environment:'Indoors',travel:'Walk',minutes:'8'},
  {id:3,name:'Library study',start:'16:00',end:'17:30',where:'Hicks Library',environment:'Indoors',travel:'Bus',minutes:'5'},
];
const outfitTemplate: Outfit = {
  id:'primary',
  name:'My campus outfit',
  note:'Built from the pieces selected in your wardrobe.',
  tags:['Classes'],
  pieces:['Top','Coat','Pants','Shoes','Accessories'],
  kind:0,
};
function text(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(text).join(' ');
  return React.isValidElement(node) ? text((node.props as any).children) : '';
}
function find(node: ReactNode, name: string): ReactElement<any>[] {
  if (Array.isArray(node)) return node.flatMap(n=>find(n,name));
  if (!React.isValidElement(node)) return [];
  const e=node as ReactElement<any>;
  return [...(e.props['data-name']===name?[e]:[]),...find(e.props.children,name)];
}
const clock = (time: string) => {const date=new Date();const [hour,minute]=time.split(':').map(Number);date.setHours(hour,minute,0,0);return date.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});};
function ActivityTimePicker({label,value,onChange,displayClassName}:{label:string;value:string;onChange:(value:string)=>void;displayClassName:string}) {
  const [open,setOpen]=useState(false);
  const [hour,setHour]=useState('12');
  const [minute,setMinute]=useState('00');
  const [period,setPeriod]=useState<'AM'|'PM'>('PM');
  const openEditor=()=>{
    const [hours,minutes]=value.split(':').map(Number);
    setHour(String(hours%12||12));
    setMinute(String(minutes).padStart(2,'0'));
    setPeriod(hours>=12?'PM':'AM');
    setOpen(true);
  };
  const save=()=>{
    const hours=Number(hour)%12+(period==='PM'?12:0);
    onChange(`${String(hours).padStart(2,'0')}:${minute}`);
    setOpen(false);
  };
  return <>
    <button type="button" className={`${displayClassName} activity-time-button`} aria-label={`Change ${label.toLowerCase()} time, currently ${clock(value)}`} onClick={openEditor}>{clock(value)}</button>
    {open&&<div className="activity-time-backdrop" role="presentation" onClick={()=>setOpen(false)}>
      <section className="activity-time-dialog" role="dialog" aria-modal="true" aria-labelledby={`${label}-time-title`} onClick={event=>event.stopPropagation()}>
        <p className="activity-time-eyebrow">{label}</p>
        <h2 id={`${label}-time-title`}>Choose a time</h2>
        <div className="activity-time-controls">
          <label>Hour<select aria-label={`${label} hour`} value={hour} onChange={event=>setHour(event.target.value)}>{Array.from({length:12},(_,index)=>String(index+1)).map(option=><option key={option}>{option}</option>)}</select></label>
          <span aria-hidden="true">:</span>
          <label>Minute<select aria-label={`${label} minute`} value={minute} onChange={event=>setMinute(event.target.value)}>{Array.from({length:60},(_,index)=>String(index).padStart(2,'0')).map(option=><option key={option}>{option}</option>)}</select></label>
          <label>AM / PM<select aria-label={`${label} AM or PM`} value={period} onChange={event=>setPeriod(event.target.value as 'AM'|'PM')}><option>AM</option><option>PM</option></select></label>
        </div>
        <div className="activity-time-actions">
          <button type="button" className="activity-time-cancel" onClick={()=>setOpen(false)}>Cancel</button>
          <button type="button" className="activity-time-done" onClick={save}>Done</button>
        </div>
      </section>
    </div>}
  </>;
}
type Context = { field?: string; filter?: string; activity?: Activity; outfit?: Outfit; piece?: number };

export default function NextFlows({ active, navigate, exit, town, currentCoat, saveRequest, initialSavedOutfits=[], muted=[], setMuted=()=>{}, unit='F', liveWeather,wardrobe=[],recommendedPieces,onActivitiesChange,onWearOutfit }: {active:Flow|null; navigate:(flow:Flow|null)=>void; exit:(destination:'today'|'whole'|'settings')=>void; town:string; currentCoat:string; saveRequest?:{id:string;name:string;coat:string;pieces?:string[];itemIds?:string[];revision:number}|null; initialSavedOutfits?:SavedOutfitView[];muted?:string[];setMuted?:React.Dispatch<React.SetStateAction<string[]>>;unit?:'F'|'C';liveWeather?:WeatherState;wardrobe?:string[];recommendedPieces?:string[];onActivitiesChange?:(activities:Activity[])=>void;onWearOutfit?:(outfit:{pieces:string[];itemIds?:string[]})=>void}) {
  const [activities,setActivities]=useState(initialActivities);
  useEffect(()=>{onActivitiesChange?.(activities);},[activities,onActivitiesChange]);
  const [draft,setDraft]=useState<Activity>(initialActivities[2]);
  const gym=activities.some(activity=>activity.kind==='gym');
  const gymCardRef=useRef<HTMLDivElement|null>(null);
  const revealGymRef=useRef(false);
  const toggleGym=(enabled:boolean)=>{
    revealGymRef.current=enabled&&!gym;
    setActivities(previous=>{
      if(!enabled)return previous.filter(activity=>activity.kind!=='gym');
      if(previous.some(activity=>activity.kind==='gym'))return previous;
      return [...previous,{id:-1,name:'Gym workout',start:'18:00',end:'19:00',where:'Campus gym',environment:'Indoors',travel:'Walk',minutes:'10',kind:'gym'}];
    });
  };
  useEffect(()=>{
    if(!revealGymRef.current||!gym||!['plan','planUpdated'].includes(active||''))return;
    revealGymRef.current=false;
    const frame=requestAnimationFrame(()=>{
      const card=gymCardRef.current;
      if(!card)return;
      const rect=card.getBoundingClientRect();
      const navigation=card.closest('.screen')?.querySelector('[data-name="Bottom navigation"]');
      const visibleBottom=Math.min(window.innerHeight,navigation?.getBoundingClientRect().top??window.innerHeight);
      if(rect.top<0||rect.bottom>visibleBottom){
        card.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
      }
    });
    return()=>cancelAnimationFrame(frame);
  },[gym,active]);
  const [outfits,setOutfits]=useState<Outfit[]>(()=>initialSavedOutfits.map(outfit=>({...outfit,pieces:[...outfit.pieces],tags:[...outfit.tags]})));
  const [outfit,setOutfit]=useState(outfitTemplate);
  const [weather,setWeather]=useState('All weather');
  const [activityFilter,setActivityFilter]=useState('All activities');
  const [lastDeleted,setLastDeleted]=useState<{outfit:Outfit;index:number}|null>(null);
  const [message,setMessage]=useState('');
  const [alertType,setAlertType]=useState('snow');
  const [deleteActivity,setDeleteActivity]=useState<number|null>(null);
  useEffect(()=>{
    if(!saveRequest) return;
    const existing=outfits.find(o=>o.id===saveRequest.id) || {...outfitTemplate,id:saveRequest.id};
    const updated={...existing,name:saveRequest.name,note:'Built from the pieces selected in your wardrobe.',tags:['Classes'],pieces:saveRequest.pieces||existing.pieces.map((piece,i)=>i===1?saveRequest.coat:piece),wardrobeIds:saveRequest.itemIds};
    setOutfits(previous=>previous.some(o=>o.id===saveRequest.id)?previous.map(o=>o.id===saveRequest.id?updated:o):[updated,...previous]);
    void saveSavedOutfit(updated).then(result=>{if(!result.ok)setMessage(result.error);});
  },[saveRequest]);
  const go=(page:Flow)=>{navigate(page);setMessage('');window.scrollTo(0,0);};
  const back=()=> {
    if(active==='addActivity'||active==='editActivity') go('plan');
    else if(active==='editOutfit') go('savedDetail');
    else if(active==='savedDetail'||active==='deleteOutfit') go('savedList');
    else if(active==='snow') go('alerts');
    else if(active==='savedList'||active==='deleted') exit('whole');
    else exit('today');
  };
  const edit=(a:Activity)=>{setDraft({...a});go('editActivity');};
  const add=()=>{setDraft({id:Date.now(),name:'Evening walk',start:'18:00',end:'18:30',where:'Purdue campus',environment:'Outdoors',travel:'Walk',minutes:'15'});go('addActivity');};
  const toggleMute=(type:string)=>setMuted(v=>v.includes(type)?v.filter(x=>x!==type):[...v,type]);
  const saveActivity=()=>{
    if(!draft.name.trim()||!draft.where.trim()||!draft.start||!draft.end){setMessage('Complete the activity, location, and times.');return;}
    if(draft.end<=draft.start){setMessage('End time must be after start time.');return;}
    setActivities(v=>v.some(a=>a.id===draft.id)?v.map(a=>a.id===draft.id?{...draft}:a):[...v,{...draft}]);
    go('planUpdated');
  };
  const saveOutfit=()=>{
    if(!outfit.name.trim()){setMessage('Give your outfit a name.');return;}
    setOutfits(v=>v.some(o=>o.id===outfit.id)?v.map(o=>o.id===outfit.id?{...outfit}:o):[...v,{...outfit}]);
    void saveSavedOutfit(outfit).then(result=>{if(!result.ok)setMessage(result.error);});
    go('savedDetail');setMessage('Outfit saved to your account');
  };
  const visibleOutfits=outfits.filter(o=>(weather==='All weather'||weather==='Cold'&&o.tags.includes('Cold')||weather==='Rain'&&o.tags.includes('Rain')||weather==='Rain / snow'&&o.tags.some(t=>['Rain','Snow'].includes(t)))&&(activityFilter==='All activities'||o.tags.includes(activityFilter)));
  const cardTemplates=find(SavedList(),'Saved outfit preview');
  function walk(node:ReactNode, context:Context={}):ReactNode {
    if(Array.isArray(node)) return node.map((n,i)=><React.Fragment key={i}>{walk(n,context)}</React.Fragment>);
    if(!React.isValidElement(node)) {
      if(typeof node==='string') {
        let value=node.replace(/West Lafayette(, IN)?/g,town);
        if(active==='snow' && alertType!=='snow') {
          const wind=alertType==='wind chill';
          const replacements:Record<string,string>={
            'Snow is on its way.':wind?'Wind chill on campus.':'Colder evening ahead.',
            '3–7 PM':wind?'Now–noon':'5–9 PM',
            'Light snow · 1–2 in':wind?'Feels like 26°F':'Feels like 20°F',
            'Feels like 22°F at 4 PM. Sidewalks may become slick.':wind?'Wind makes it feel colder between campus buildings.':'Temperatures drop this evening. Bring extra layers if you stay late.',
            'Before 3 PM':wind?'Between buildings':'Before heading out',
            'Wear a waterproof parka.':wind?'Wear a scarf and beanie.':'Bring a warm coat and gloves.',
            'Mute snow alerts':`Mute ${alertType} alerts`,
            'Pause snow notifications only.':`Pause ${alertType} notifications only.`,
          };
          for(const [from,to] of Object.entries(replacements)) value=value.replace(from,to);
        }
        return displayTemperature(value,unit);
      }
      return node;
    }
    const e=node as ReactElement<any>,p=e.props,name=p['data-name'],id=p['data-node-id'];
    const label=text(p.children).trim().replace(/\s+/g,' ');
    const ctx={...context};
    const modernPlan=active==='plan'||active==='planUpdated';
    if(name==='Form field') ctx.field=text(React.Children.toArray(p.children)[0]).trim();
    if(name==='Weather filters'||name==='Activity filters') ctx.filter=name;
    let children=walk(p.children,ctx),props={...p},tag=e.type;
    const button=(fn:()=>void)=>{tag='button';props.type='button';props.onClick=fn;};
    const selected=(yes:boolean)=>{props['aria-pressed']=yes;props.style={...props.style,background:yes?'#6268c8':'white',borderColor:yes?'#6268c8':'#dfe5ee',color:yes?'white':'#68758a'};};
    if(modernPlan){
      if(id==='1:5641'||id==='1:5376')children='My plan';
      if(name==='sparkles'){button(add);props.className='modern-add-activity';props['aria-label']='Add activity';children='+';}
      if(name==='Bottom navigation')return <ModernNav active="plan" onNavigate={tab=>tab==='plan'?go('plan'):exit(tab==='outfit'?'whole':tab)}/>;
      if(name==='Activity'&&context.activity)return <ModernActivityCard key={context.activity.id} activity={context.activity} weather={liveWeather} unit={unit} onEdit={()=>edit(context.activity!)} onDelete={()=>setDeleteActivity(context.activity!.id)} cardRef={context.activity.kind==='gym'?gymCardRef:undefined}/>;
    }
    if(name==='Back control'){button(back);children=p.children;}
    if(name==='Tab') button(()=>label==='Plan'?go('plan'):label==='Today'?exit('today'):label==='Outfit'?exit('whole'):exit('settings'));
    if(name==='Action') {
      children=p.children;
      button(()=>{
        if(label==='Cancel') {back();return;}
        if(active==='addActivity'||active==='editActivity') {
          if(label==='Delete activity') setDeleteActivity(draft.id);else saveActivity();
        } else if(active==='plan') go('planUpdated');
        else if(active==='planUpdated') exit('whole');
        else if(active==='snow') exit('whole');
        else if(active==='savedList'||active==='deleted') {if(!wardrobe.length){setMessage('Add items to your wardrobe in Settings before creating an outfit.');return;}setOutfit({...outfitTemplate,id:crypto.randomUUID(),name:'New outfit',note:'Built from your wardrobe.',tags:['Classes'],pieces:recommendedPieces||outfitTemplate.pieces.map((x,i)=>i===1&&currentCoat?currentCoat:x),wardrobeIds:wardrobe.filter(id=>wardrobeItems.some(i=>i.id===id&&recommendedPieces?.some(p=>p.includes(i.name))))});go('editOutfit');}
        else if(active==='savedDetail') {
          if(label==='Edit Outfit') go('editOutfit');
          else if(label==='Delete Outfit') go('deleteOutfit');
          else {exit('today');onWearOutfit?.({pieces:[...outfit.pieces],itemIds:outfit.wardrobeIds?[...outfit.wardrobeIds]:undefined});}
        } else if(active==='editOutfit') saveOutfit();
        else if(active==='deleteOutfit') {
          if(label==='Delete'){setLastDeleted({outfit,index:outfits.findIndex(o=>o.id===outfit.id)});setOutfits(v=>v.filter(o=>o.id!==outfit.id));void deleteSavedOutfit(outfit.id).then(result=>{if(!result.ok)setMessage(result.error);});setWeather('All weather');setActivityFilter('All activities');go('deleted');}
          else back();
        }
      });
    }
    if(name==='Segment') {
      const yes=['Yes','No'].includes(label)?gym===(label==='Yes'):draft.environment===label;
      button(()=>['Yes','No'].includes(label)?toggleGym(label==='Yes'):setDraft(v=>({...v,environment:label})));
      props.style={background:yes?'white':'transparent',color:yes?'#6268c8':'#68758a'};
      props['aria-pressed']=yes;
    }
    if(name==='Choice'&&(active==='addActivity'||active==='editActivity')){selected(draft.travel===label);button(()=>setDraft(v=>({...v,travel:label})));}
    if(name==='Choice'&&(active==='savedList'||active==='deleteOutfit'||active==='deleted')) {
      const isWeather=ctx.filter==='Weather filters';
      const value=label==='All'?(isWeather?'All weather':'All activities'):label;
      selected((isWeather?weather:activityFilter)===value);
      button(()=>isWeather?setWeather(value):setActivityFilter(value));
    }
    if(name==='Choice'&&active==='editOutfit'){
      selected(outfit.tags.includes(label));button(()=>setOutfit(v=>({...v,tags:v.tags.includes(label)?v.tags.filter(t=>t!==label):[...v.tags,label]})));
    }
    if(name==='Input'&&(active==='addActivity'||active==='editActivity'||active==='editOutfit')) {
      const fields:Record<string,keyof Activity>={Activity:'name',Start:'start',Starts:'start',End:'end',Ends:'end',Location:'where',Where:'where','Travel time':'minutes','Travel time outside':'minutes'};
      const field=ctx.field||'';
      const key=fields[field];
      const outfitKey=field==='Name'?'name':'note';
      const value=active==='editOutfit'?outfit[outfitKey]:String(draft[key]);
      const old=React.Children.toArray(p.children);
      const source=old[0] as ReactElement<any>;
      const isTime=key==='start'||key==='end';
      const className=(source?.props.className||'')+' bg-transparent outline-none w-full min-w-0';
      const change=(v:string)=>active==='editOutfit'?setOutfit(o=>({...o,[outfitKey]:v})):setDraft(a=>({...a,[key]:v}));
      children=[key==='minutes'&&active!=='editOutfit'?
        <select key="field" className={className} aria-label={field} value={value} onChange={e=>change(e.target.value)}>{[...new Set(['5','8','10','12','15','20','30','45','60',value])].sort((a,b)=>Number(a)-Number(b)).map(n=><option key={n} value={n}>{n} min</option>)}</select>:
        isTime?<ActivityTimePicker key="field" label={field} value={value} onChange={change} displayClassName={source?.props.className||''}/>:
        <input key="field" className={className} aria-label={field} type="text" value={value} onChange={e=>change(e.target.value)}/>,
        ...old.slice(1)];
    }
    if(name==='Daily schedule') {
      const templates=find(e,'Activity');
      children=activities.map((a,i)=><React.Fragment key={a.id}>{walk(templates[Math.min(i,templates.length-1)],{activity:a})}</React.Fragment>);
      if(!activities.length) children=<p className="text-sm text-[#68758a]">No activities yet. Add one to plan your day.</p>;
    }
    if(context.activity){
      const a=context.activity;
      if(name==='Transit and forecast'&&liveWeather){
        const h=liveWeather.data?.hours.find(h=>h.time===`${liveWeather.data!.date}T${a.start.slice(0,2)}:00`);
        children=React.Children.map(p.children,(n,i)=>i===1&&React.isValidElement(n)?React.cloneElement(n as ReactElement<any>,{},h?`${weatherDescription(h.code)} · feels ${temperature(h.feels,unit)}`:'Forecast unavailable'):walk(n,context));
      }
      if(name==='Activity') {
        props.style={borderColor:active==='planUpdated'&&a.environment==='Outdoors'?'#6268c8':'#dfe5ee'};
        if(a.kind==='gym')props.ref=gymCardRef;
      }
      if(name==='pencil'){props['aria-label']=`Edit ${a.name}`;button(()=>edit(a));}
      if(name==='trash-2'){props['aria-label']=`Delete ${a.name}`;button(()=>setDeleteActivity(a.id));}
      if(e.type==='p') {
        if(/^\d.*[AP]M$/.test(label)) children=`${clock(a.start)}–${clock(a.end)}`;
        else if(['Chemistry lecture','Lunch with Maya','Library study','Study on the terrace'].includes(label)) children=a.name;
        else if(/ · (Indoors|Outdoors)$/.test(label)) children=`${a.where} · ${a.environment}`;
        else if(/^(Walk|Bus) ·/.test(label)) children=`${a.travel} · ${a.minutes} min`;
      }
    }
    if(e.type==='p' && label==='+ Add') button(add);
    if(id==='1:5391') button(()=>exit('whole'));
    if(id==='1:5402') children=gym?'Pack your gym bag and a fresh base layer.':'Gym bag stays out.';
    if(id==='1:5390')children=recommendedPieces?recommendedPieces.slice(0,3).join(' · '):'Choose items you own in Settings to personalize your layers.';
    if(id==='1:5402'&&gym){const gymItems=wardrobeItems.filter(i=>wardrobe.includes(i.id)&&i.role.startsWith('gym'));children=gymItems.length?`Pack: ${gymItems.map(i=>i.name).slice(0,3).join(', ')}.`:'Add gym clothing in Settings to personalize your gym bag.';}
    if(name==='Saved outfit cards') {
      const deletedTemplates=find(Deleted(),'Saved outfit preview');
      children=visibleOutfits.map(o=><React.Fragment key={o.id}>{walk(active==='deleted'&&o.kind>0?deletedTemplates[o.kind-1]:cardTemplates[o.kind],{outfit:o})}</React.Fragment>);
      if(!visibleOutfits.length) children=<p className="saved-outfits-empty">{outfits.length?'No outfits match these filters.':'No saved outfits yet. Save an outfit from the Outfit tab to see it here.'}</p>;
    }
    if(name==='Saved outfit preview'&&ctx.outfit) {
      button(()=>{setOutfit({...ctx.outfit!,pieces:[...ctx.outfit!.pieces],tags:[...ctx.outfit!.tags]});go('savedDetail');});
      props.style={textAlign:'left'};
    }
    if(e.type==='p' && ctx.outfit && ['Snow day','Library','Rainy lecture','Library layers','Rainy lecture day'].includes(label)) children=ctx.outfit.name;
    if(id==='1:6021'||id==='1:5737') children=`${outfits.length} outfits`;
    if(id==='1:6347') children=`${outfits.length} saved outfits`;
    if(name==='Undo snackbar'&&!lastDeleted) return null;
    if(id==='1:6408'&&lastDeleted) children=`“${lastDeleted.outfit.name}” removed`;
    if(id==='1:6409') button(()=>{
      if(lastDeleted){setOutfits(v=>{const restored=[...v];restored.splice(Math.max(0,lastDeleted.index),0,lastDeleted.outfit);return restored;});void saveSavedOutfit(lastDeleted.outfit).then(result=>{if(!result.ok)setMessage(result.error);});setLastDeleted(null);go('savedList');setMessage('Outfit restored');}
    });
    if(id==='1:5942') children=outfit.name;
    if(id==='1:5991') children=outfit.note;
    if(id==='1:5820') children=`“${outfit.name}” will be removed from Saved Outfits. Your clothing stays.`;
    if(name==='Delete confirmation'){tag='section';props.role='dialog';props['aria-modal']=true;props['aria-label']='Delete outfit?';}
    if(name==='Confirmation scrim') button(()=>go('savedDetail'));
    if(name==='Saved item'){
      const index=['1:5974','1:5977','1:5980','1:5983','1:5986'].indexOf(id);
      children=React.Children.map(p.children,(n,i)=>i===1&&React.isValidElement(n)?React.cloneElement(n as ReactElement<any>,{},outfit.pieces[index]):n);
    }
    if(name==='Edit clothing'){
      const index=['1:5864','1:5870','1:5876','1:5882','1:5888'].indexOf(id);
      const labels=find(e,'Item labels')[0];
      const parts=React.Children.toArray(labels.props.children);
      const value=parts[1] as ReactElement<any>;
      children=[React.cloneElement(labels,{key:'labels'},parts[0],<input key="piece" aria-label={text(parts[0])} className={value.props.className+' w-full min-w-0 outline-none'} value={outfit.pieces[index]} onChange={event=>setOutfit(o=>({...o,pieces:o.pieces.map((p,i)=>i===index?event.target.value:p)}))}/>),...React.Children.toArray(p.children).slice(1)];
    }
    if(name==='Outfit tags'&&active==='savedDetail'){
      const choices=React.Children.toArray(p.children) as ReactElement<any>[];
      children=outfit.tags.map((t,i)=>React.cloneElement(choices[Math.min(i,choices.length-1)],{key:t},<span className="text-xs">{t==='Cold'?'20–34°F':t}</span>));
    }
    if(name==='Coordinated outfit illustration'&&active==='savedDetail'&&outfit.kind!==0){
      const preview=find(cardTemplates[outfit.kind],'Clothing preview')[0];children=preview.props.children;
    }
    if(name==='Outerwear'&&(ctx.outfit || active==='savedDetail'||active==='editOutfit')){
      const chosen=(ctx.outfit||outfit).pieces[1];
      const assets:Record<string,string>={'Wool coat':'a3ff9.svg','Puffer jacket':'4d85e.svg'};
      if(assets[chosen]) children=React.Children.map(p.children,(child,i)=>i===0&&React.isValidElement(child)?React.cloneElement(child as ReactElement<any>,{},<img alt={chosen} className="absolute inset-0 size-full" src={`/assets/${assets[chosen]}`}/>):child);
    }
    const displayed=ctx.outfit||outfit;
    if(displayed.wardrobeIds&&(ctx.outfit||['savedDetail','editOutfit'].includes(active||''))){
      if(name==='Coordinated outfit illustration'){
        const summary:WardrobeRecommendation={items:wardrobeItems.filter(i=>displayed.wardrobeIds!.includes(i.id)),pieces:{Tops:displayed.pieces[0],Layers:'',Coat:displayed.pieces[1],Pants:displayed.pieces[2],Shoes:displayed.pieces[3],Accessories:displayed.pieces[4]},note:displayed.note};
        props.className='wardrobe-preview-shell';children=<WardrobePreview recommendation={summary}/>;
      }
      if(name==='Warmth rating')return null;
      if(id==='1:5965')children='Your selected pieces';
    }
    if(name==='Mute type') {
      const type=label.includes('snow')?'snow':label.includes('wind')?'wind chill':'temperature-drop';
      button(()=>toggleMute(type));props['aria-pressed']=muted.includes(type);
      children=React.Children.map(p.children,n=>React.isValidElement(n)&&n.type==='p'?React.cloneElement(n as ReactElement<any>,{},`${muted.includes(type)?'Unmute':'Mute'} ${type} alerts`):n);
    }
    if(name==='Alert actions'){
      const type=id==='1:5319'?'snow':id==='1:5335'?'wind chill':'temperature-drop';
      button(()=>{setAlertType(type);go('snow');});
    }
    if(name==='Disabled'&&active==='snow') {
      button(()=>toggleMute(alertType));props.role='switch';props['aria-checked']=muted.includes(alertType);props['aria-label']=`Mute ${alertType} alerts`;
      props.style={borderRadius:99,background:muted.includes(alertType)?'#6268c8':'#dfe5ee'};
      children=muted.includes(alertType)?<span className="block size-5 rounded-full bg-white ml-[21px]"/>:p.children;
    }
    return React.createElement(tag,{...props,key:id},children);
  }
  if(!active) return null;
  const view=views[active]();
  const styledView=active==='plan'||active==='planUpdated'?React.cloneElement(view,{className:view.props.className+' modern-screen modern-plan'}):view;
  return <>{walk(liveWeather?liveWeatherUI(styledView,liveWeather,'F',active):styledView)}
    {message&&<Toast key={message} onDismiss={()=>setMessage('')}><button className="float-right ml-4" onClick={()=>setMessage('')}>Dismiss</button>{message}</Toast>}
    {deleteActivity!==null&&<div className="panel-backdrop"><section className="panel" role="dialog" aria-modal="true" aria-label="Delete activity"><h1>Delete activity?</h1><p>This activity will be removed from your plan.</p><button className="primary" onClick={()=>{setActivities(v=>v.filter(a=>a.id!==deleteActivity));setDeleteActivity(null);go('planUpdated');setMessage('Activity deleted');}}>Delete activity</button><button className="primary !bg-[#e8e9fc] !text-[#6268c8]" onClick={()=>setDeleteActivity(null)}>Cancel</button></section></div>}
  </>;
}
