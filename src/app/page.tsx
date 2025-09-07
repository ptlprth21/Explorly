

import Hero from '@/components/home/Hero';
import ContinentsExplorer from '@/components/home/ContinentsExplorer';
import Container from '@/components/ui/Container';
import { getContinents, getCountries, getPackages } from '@/lib/data';
import CountrySpotlight from '@/components/home/CountrySpotlight';
import MusicPlayerPackages from '@/components/home/MusicPlayerPackages';

export default async function Home() {
  const continents = await getContinents();
  const countries = await getCountries();
  const packages = await getPackages();

  const spotlightCountry = countries.find(c => c.name === 'Italy');

  return (
    <div className="bg-black">
      <Hero />
      <MusicPlayerPackages packages={packages} />
      {spotlightCountry && <CountrySpotlight country={spotlightCountry} packages={packages} />}
      <ContinentsExplorer />
    </div>
  );
}
