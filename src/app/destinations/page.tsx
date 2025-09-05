import Container from '@/components/ui/Container';
import { getPackages } from '@/lib/data';
import type { Package } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import Image from 'next/image';

interface ContinentData {
  continent: string;
  image: string;
  dataAiHint: string;
  countries: {
    name: string;
    image: string;
  }[];
}

export default async function DestinationsPage() {
  const allPackages = await getPackages();

  const continentsMap = allPackages.reduce((acc, pkg) => {
    if (!acc[pkg.continent]) {
      acc[pkg.continent] = {
        continent: pkg.continent,
        // Find a representative image for the continent from a package
        image: pkg.gallery[0] || pkg.image,
        dataAiHint: 'continent landscape',
        countries: [],
      };
    }
    return acc;
  }, {} as Record<string, Omit<ContinentData, 'countries'> & { countries: Set<string> }>);

  const packagesByCountry: Record<string, Package[]> = {};
  allPackages.forEach(pkg => {
    if (!packagesByCountry[pkg.country]) {
      packagesByCountry[pkg.country] = [];
    }
    packagesByCountry[pkg.country].push(pkg);
  });
  
  const finalContinents = Object.values(continentsMap).map(continentInfo => {
    const countriesInContinent = new Set<string>();
    allPackages.forEach(pkg => {
      if (pkg.continent === continentInfo.continent) {
        countriesInContinent.add(pkg.country);
      }
    });

    return {
      ...continentInfo,
      countries: Array.from(countriesInContinent).map(countryName => ({
        name: countryName,
        // Use the main image of the first package in that country as representative
        image: packagesByCountry[countryName][0].image,
        dataAiHint: `${slugify(countryName)} landscape`,
      })).sort((a,b) => a.name.localeCompare(b.name)),
    };
  }).sort((a,b) => a.continent.localeCompare(b.continent));

  return (
    <Container className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">All Destinations</h1>
        <p className="text-lg text-muted-foreground mt-2">Explore the world, one continent at a time.</p>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {finalContinents.map((continent) => (
            <AccordionItem value={continent.continent} key={continent.continent}>
              <AccordionTrigger className="text-2xl font-headline hover:no-underline p-4">
                <div className="flex items-center gap-4">
                    <div className="relative w-20 h-16 rounded-md overflow-hidden shrink-0">
                        <Image src={continent.image} alt={continent.continent} fill className="object-cover" data-ai-hint={continent.dataAiHint} />
                    </div>
                    <span>{continent.continent}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-secondary/50">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {continent.countries.map(country => (
                        <Link href={`/country/${slugify(country.name)}`} key={country.name} className="group">
                            <div className="relative aspect-4/5 rounded-lg overflow-hidden shadow-md">
                                <Image src={country.image} alt={country.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={country.dataAiHint} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <h3 className="absolute bottom-2 left-3 font-bold text-white text-lg drop-shadow-md">{country.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  );
}
