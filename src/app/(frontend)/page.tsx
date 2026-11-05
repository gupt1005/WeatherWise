import WeatherWiseClient from '@/weatherwise/WeatherWiseClient'
import { getCurrentAccount } from './account-actions'

// Request-time: the greeting and saved choices belong to whoever is signed in.
export default async function HomePage() {
  const account = await getCurrentAccount()
  return <WeatherWiseClient initialAccount={account} />
}
