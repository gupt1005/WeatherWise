import test from 'node:test';
import assert from 'node:assert/strict';
import { temperatureRule, recommendWardrobe, wardrobeItems } from '../src/weatherwise/wardrobe.ts';

const all = wardrobeItems.map(item => item.id);
const recommend = (feels, wet = false, snow = false, wind = 0) => recommendWardrobe(all, feels, 50, '', wet, false, snow, wind);

test('temperature ranges include each lower bound and exclude each upper bound', () => {
  for (const [value, label] of [[-10,'Freezing'],[31.9,'Freezing'],[32,'Cold'],[49.9,'Cold'],[50,'Cool'],[64.9,'Cool'],[65,'Warm'],[79.9,'Warm'],[80,'Hot'],[105,'Hot']]) {
    assert.equal(temperatureRule(value).label, label);
  }
  assert.throws(() => temperatureRule(NaN));
});

test('freezing outfits add insulation; warm and hot outfits remove extra layers', () => {
  const freezing = recommend(20);
  assert.ok(freezing.items.some(i => i.role === 'outer' && i.warmth === 4));
  assert.ok(freezing.items.some(i => i.role === 'baseBottom'));
  assert.ok(freezing.items.some(i => i.name === 'Gloves'));
  for (const feels of [65,80,100]) {
    assert.ok(recommend(feels).items.every(i => !['outer','layer','baseBottom'].includes(i.role)));
  }
  assert.equal(recommend(85).pieces.Shoes, 'Sandals');
});

test('rain, snow, and wind adjust even mild-weather outfits', () => {
  const rain = recommend(70, true);
  assert.ok(rain.items.some(i => i.role === 'outer' && i.wet));
  assert.ok(rain.items.some(i => i.role === 'shoe' && i.wet));
  assert.equal(recommend(40, false, true).pieces.Shoes, 'Waterproof boots');
  assert.equal(recommend(70, false, false, 25).pieces.Coat, 'Windbreaker');
});

test('recommendations only select owned clothes and handle missing weather', () => {
  const ids = ['cotton-t-shirt', 'casual-shorts'];
  const result = recommendWardrobe(ids, 20, 50);
  assert.ok(result.items.every(i => ids.includes(i.id)));
  assert.equal(result.pieces.Coat, 'No coat selected');
  assert.match(recommendWardrobe([], 80).note, /Choose wardrobe items/);
  assert.match(recommend(null).note, /Weather is unavailable/);
});

test('manual coat choices and gym plans are preserved', () => {
  assert.equal(recommendWardrobe(all, 70, 50, 'Wool coat').pieces.Coat, 'Wool coat');
  assert.ok(recommendWardrobe(all, 60, 50, '', false, true).items.some(i => i.role === 'gymTop'));
});
