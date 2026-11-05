export function displayTemperature(text: string, unit: 'F'|'C'): string {
  if(unit==='F') return text;
  return text
    .replace(/(-?\d+)–(-?\d+)°F/g,(_,low,high)=>`${Math.round((Number(low)-32)*5/9)}–${Math.round((Number(high)-32)*5/9)}°C`)
    .replace(/(-?\d+)°(?!C)F?/g,(_,value)=>`${Math.round((Number(value)-32)*5/9)}°C`);
}
