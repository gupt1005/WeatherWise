'use client';
import dynamic from 'next/dynamic';
import type { AccountView } from './account';

// The WeatherWise prototype is a browser app (live forecasts, geolocation, local time),
// so render it on the client only, as it was before moving to Next.js.
const App = dynamic(() => import('./App'), { ssr: false });

export default function WeatherWiseClient({ initialAccount }: { initialAccount: AccountView | null }) {
  return <App initialAccount={initialAccount} />;
}
