import type { Coordinates } from './weather';

/** A place the person can pick: a college (with its town) or a town itself. */
export type Place = {
  kind: 'college' | 'town';
  /** College name, or the town name for towns. */
  name: string;
  /** "Town, ST" for the US, "Town, Country" elsewhere. Empty until resolved for some campus results. */
  town: string;
  /** Second line shown in suggestions. */
  detail: string;
  coordinates: Coordinates;
  us: boolean;
};

const stateNames: Record<string, string> = Object.fromEntries('AL:Alabama|AK:Alaska|AZ:Arizona|AR:Arkansas|CA:California|CO:Colorado|CT:Connecticut|DE:Delaware|FL:Florida|GA:Georgia|HI:Hawaii|ID:Idaho|IL:Illinois|IN:Indiana|IA:Iowa|KS:Kansas|KY:Kentucky|LA:Louisiana|ME:Maine|MD:Maryland|MA:Massachusetts|MI:Michigan|MN:Minnesota|MS:Mississippi|MO:Missouri|MT:Montana|NE:Nebraska|NV:Nevada|NH:New Hampshire|NJ:New Jersey|NM:New Mexico|NY:New York|NC:North Carolina|ND:North Dakota|OH:Ohio|OK:Oklahoma|OR:Oregon|PA:Pennsylvania|RI:Rhode Island|SC:South Carolina|SD:South Dakota|TN:Tennessee|TX:Texas|UT:Utah|VT:Vermont|VA:Virginia|WA:Washington|WV:West Virginia|WI:Wisconsin|WY:Wyoming|DC:District of Columbia'.split('|').map(s => s.split(':').reverse()));

const PHOTON = 'https://photon.komoot.io';
// Gently favors US results without excluding the rest of the world.
const US_BIAS = { lat: '39.8', lon: '-98.6', location_bias_scale: '0.3' };

export const placeLabel = (place: Pick<Place, 'kind' | 'name' | 'town'>) => (place.kind === 'college' ? place.name : place.town);

function townLabel(city: string | undefined, state: string | undefined, country: string | undefined, countryCode: string | undefined) {
  const name = city?.replace(/ (Township|Charter Township)$/, '').trim();
  if (!name) return '';
  if (countryCode?.toUpperCase() === 'US') return `${name}, ${stateNames[state ?? ''] ?? state ?? 'US'}`;
  return `${name}, ${state && state !== name ? state : country ?? ''}`.replace(/, $/, '');
}

type PhotonFeature = { geometry: { coordinates: [number, number] }; properties: Record<string, string | undefined> };

function fromPhoton(feature: PhotonFeature, kind: Place['kind']): Place | null {
  const p = feature.properties;
  const [longitude, latitude] = feature.geometry.coordinates;
  if (!p.name || !Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  const us = p.countrycode?.toUpperCase() === 'US';
  const town = kind === 'town' ? townLabel(p.name, p.state, p.country, p.countrycode) : townLabel(p.city ?? p.town ?? p.village ?? p.district ?? p.county?.replace(/ County$/, ''), p.state, p.country, p.countrycode);
  const detail = kind === 'college' ? town : [p.state, us ? 'United States' : p.country].filter(Boolean).join(', ');
  return { kind, name: p.name, town, detail, coordinates: { latitude, longitude }, us };
}

async function photon(path: string, params: Record<string, string | string[]>, signal: AbortSignal): Promise<PhotonFeature[]> {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) for (const v of [value].flat()) query.append(key, v);
  const response = await fetch(`${PHOTON}${path}?${query}`, { signal });
  if (!response.ok) return [];
  return (await response.json()).features ?? [];
}

const campusWords = /universit|college|campus|institute|polytechnic/i;
const notACampus = /school of|department|system|global|athletic|press|hospital|librar|stadium|museum|football|basketball|alumni|board of|^list of|medicine|medical|health|police|parking|airport|power station|(universit\w*|institute).*\bcollege of\b/i;

/** Wikipedia prefix search covers newer or renamed campuses OpenStreetMap may not list by name. */
async function wikipediaPrefix(text: string, signal: AbortSignal): Promise<any[]> {
  const params = new URLSearchParams({ action: 'query', generator: 'prefixsearch', gpssearch: text, gpslimit: '10', prop: 'coordinates|description', format: 'json', origin: '*' });
  const response = await fetch(`https://en.wikipedia.org/w/api.php?${params}`, { signal });
  if (!response.ok) return [];
  return (Object.values((await response.json()).query?.pages ?? {}) as any[]).sort((a, b) => a.index - b.index);
}

async function wikipediaCampuses(text: string, signal: AbortSignal): Promise<Place[]> {
  // Branch campuses are often titled "X University in/at Town", so also try those forms.
  const words = text.trim().split(/\s+/);
  const variants = [text];
  if (words.length >= 3 && !/^(in|at)$/i.test(words.at(-2) ?? '')) for (const joiner of ['in', 'at']) variants.push([...words.slice(0, -1), joiner, words.at(-1)].join(' '));
  const batches = await Promise.all(variants.map(v => wikipediaPrefix(v, signal).catch(() => [])));
  const pages = batches.flat();
  return pages
    .filter(page => page.coordinates?.[0] && campusWords.test(`${page.title} ${page.description ?? ''}`) && !notACampus.test(page.title) && campusWords.test(page.description ?? page.title))
    .map(page => {
      // e.g. "Public university in West Lafayette, Indiana, U.S."
      const match = /\bin ([A-Z][^,]+), ([A-Z][A-Za-z .]+?)(?:,|$)/.exec(page.description ?? '');
      const us = !!match && !!stateNames[match[2]];
      // "...campus in Indiana, US" names a state, not a town; look the town up from coordinates instead.
      const usable = match && !stateNames[match[1]] && (us || !/^(US|U\.S\.|United States)$/.test(match[2]));
      const town = usable ? (us ? `${match[1]}, ${stateNames[match[2]]}` : `${match[1]}, ${match[2]}`) : '';
      const region = match && stateNames[match[1]] ? match[1] : '';
      return { kind: 'college' as const, name: page.title, town, detail: town || region || 'College campus', coordinates: { latitude: page.coordinates[0].lat, longitude: page.coordinates[0].lon }, us: us || /U\.?S\.?|United States/.test(page.description ?? '') };
    });
}

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\b(the|at|in|of)\b/g, ' ').replace(/\s+/g, ' ').trim();

/** Colleges and towns that match what the person has typed so far. */
export async function searchPlaces(text: string, signal: AbortSignal, limit = 6): Promise<Place[]> {
  const q = text.trim();
  if (q.length < 2) return [];
  if (signal.aborted) return [];
  const settle = <T,>(promise: Promise<T[]>) => promise.catch(() => [] as T[]);
  const [colleges, towns, campuses, meteoTowns] = await Promise.all([
    settle(photon('/api', { q, limit: '8', lang: 'en', ...US_BIAS, osm_tag: ['amenity:university', 'amenity:college'] }, signal)),
    settle(photon('/api', { q, limit: '6', lang: 'en', ...US_BIAS, osm_tag: ['place:city', 'place:town', 'place:village'] }, signal)),
    q.length >= 4 ? settle(wikipediaCampuses(q, signal)) : Promise.resolve([] as Place[]),
    settle(openMeteoTowns(q.split(',')[0], signal)),
  ]);
  if (signal.aborted) return [];
  const candidates = [
    ...colleges.map(f => fromPhoton(f, 'college')).filter(p => !p || !notACampus.test(p.name)),
    ...campuses,
    ...towns.map(f => fromPhoton(f, 'town')),
    ...meteoTowns,
  ].filter((p): p is Place => !!p);

  const query = normalize(q);
  const wantsCollege = campusWords.test(q) || /\b(state|tech|u)\b/i.test(q);
  const rank = (p: Place) => {
    const name = normalize(p.name);
    const label = normalize(placeLabel(p));
    const match = name.startsWith(query) || label.startsWith(query) ? 0 : name.includes(query) ? 1 : 2;
    return match * 10 + (p.us ? 0 : 4) + (p.kind === 'college' ? (wantsCollege ? 0 : 1) : wantsCollege ? 2 : 1);
  };
  const seen = new Set<string>();
  return candidates
    .map((p, i) => ({ p, i, r: rank(p) }))
    // Keep only results that actually contain what was typed.
    .filter(({ r }) => r < 20)
    .sort((a, b) => a.r - b.r || a.i - b.i)
    .map(({ p }) => p)
    .filter(p => {
      const key = p.kind === 'town' ? `town|${normalize(p.town)}` : `${p.kind}|${normalize(p.name)}|${normalize(p.town)}`;
      const nameKey = `${p.kind}|${normalize(p.name)}`;
      if (seen.has(key) || (p.kind === 'college' && seen.has(nameKey))) return false;
      seen.add(key);
      seen.add(nameKey);
      return true;
    })
    .slice(0, limit);
}

/** Town, state for a point, e.g. GPS coordinates or a campus without a parsed town. */
export async function reversePlace(coordinates: Coordinates, signal: AbortSignal): Promise<Place | null> {
  const [feature] = await photon('/reverse', { lat: String(coordinates.latitude), lon: String(coordinates.longitude), lang: 'en', limit: '1' }, signal).catch(() => []);
  if (!feature) return bigDataCloudReverse(coordinates, signal);
  const p = feature.properties;
  const isTown = p.osm_key === 'place';
  const town = townLabel(isTown ? p.name : p.city ?? p.town ?? p.village ?? p.district ?? p.county?.replace(/ County$/, ''), p.state, p.country, p.countrycode);
  if (!town) return null;
  return { kind: 'town', name: town.split(',')[0], town, detail: town, coordinates, us: p.countrycode?.toUpperCase() === 'US' };
}

async function bigDataCloudReverse(coordinates: Coordinates, signal: AbortSignal): Promise<Place | null> {
  const params = new URLSearchParams({ latitude: String(coordinates.latitude), longitude: String(coordinates.longitude), localityLanguage: 'en' });
  const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?${params}`, { signal }).catch(() => null);
  if (!response?.ok) return null;
  const d = await response.json();
  // Prefer the municipality (admin level 8) over civil townships, e.g. West Lafayette rather than "Township of Wabash".
  const municipality = d.localityInfo?.administrative?.find((a: any) => a.adminLevel === 8)?.name;
  const notTownship = (name?: string) => (name && !/^(Township|Town) of /i.test(name) ? name : undefined);
  const town = townLabel(notTownship(municipality) ?? notTownship(d.locality) ?? notTownship(d.city), d.principalSubdivision, d.countryName, d.countryCode);
  return town ? { kind: 'town', name: town.split(',')[0], town, detail: town, coordinates, us: d.countryCode === 'US' } : null;
}

/** Open-Meteo's geocoder (also used for forecasts) keeps town suggestions working if Photon is busy. */
async function openMeteoTowns(text: string, signal: AbortSignal): Promise<Place[]> {
  const params = new URLSearchParams({ name: text, count: '6', language: 'en', format: 'json' });
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`, { signal });
  if (!response.ok) return [];
  return ((await response.json()).results ?? [])
    .filter((r: any) => String(r.feature_code ?? '').startsWith('PPL'))
    .map((r: any): Place => {
      const us = r.country_code === 'US';
      const town = townLabel(r.name, r.admin1, r.country, r.country_code);
      return { kind: 'town', name: r.name, town, detail: [r.admin1, us ? 'United States' : r.country].filter(Boolean).join(', '), coordinates: { latitude: r.latitude, longitude: r.longitude }, us };
    });
}

/** Makes sure a picked place has a town, filling it from its coordinates when needed. */
export async function completePlace(place: Place, signal: AbortSignal): Promise<Place> {
  if (place.town) return place;
  const nearby = await reversePlace(place.coordinates, signal).catch(() => null);
  const town = nearby?.town ?? '';
  return { ...place, town, detail: town || place.detail };
}

/** Best match for free text the person typed without picking a suggestion. */
export async function resolvePlace(text: string, signal: AbortSignal): Promise<Place | null> {
  const [best] = await searchPlaces(text, signal, 1);
  return best ? completePlace(best, signal) : null;
}
