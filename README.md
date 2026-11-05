# WeatherWise

## Outfit recommendation rules

Recommendations use the feels-like temperature in Fahrenheit. Displaying Celsius does not change the algorithm.

| Feels like | Suggested clothing |
| --- | --- |
| Below 32°F | Heavy coat, sweater, warm pants, thermal bottoms, boots, gloves |
| 32°F to below 50°F | Jacket, long sleeves, pants, closed shoes |
| 50°F to below 65°F | Light jacket or hoodie, pants, sneakers |
| 65°F to below 80°F | T-shirt, light pants or shorts, sneakers |
| 80°F and above | Breathable shirt, shorts or light pants, sandals |

The rules are defined in `src/weatherwise/wardrobe.ts` (`temperatureRules`). Change the thresholds or warmth targets there to tune recommendations.

- Choose the closest available clothing from the user's wardrobe; missing pieces are shown as unselected.
- Rain (including at least 50% forecast precipitation chance) favors waterproof footwear and outerwear. Snow favors waterproof boots.
- Wind of at least 20 mph adds an outer layer and favors a windbreaker in dry weather.
- The comfort slider adjusts the effective temperature by 3°F at either end. Manual coat choices and gym plans remain supported.
- Today uses current conditions. Outfit periods use the coolest feels-like temperature and precipitation across their forecast hours. Wind uses the current measurement.
- Without weather, show an unavailable-weather message and a provisional outfit.

Run algorithm checks with Node supporting TypeScript stripping:

```sh
node --experimental-strip-types --test tests/wardrobe.test.mjs
```
