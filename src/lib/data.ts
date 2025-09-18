
'use server';
import type { Package, Review, Continent, Country, Theme } from '@/types';
import { aiImageSelection } from '@/ai/flows/ai-image-selection';
import { slugify } from './utils';
import { realPackagesData } from './real-data';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from './firebase';

let packages: Promise<Package[]> | null = null;

const processPackages = async (): Promise<Package[]> => {
  const allPackagesData = [...realPackagesData];
  const processedPackages = await Promise.all(
    allPackagesData.map(async (pkg) => {
      const id = slugify(pkg.title);
      // Use the predefined image from real-data and ensure gallery has at least one image.
      const image = pkg.image || `https://picsum.photos/seed/${id}/1200/800`;
      
      return {
        ...pkg,
        id,
        image: image,
        gallery: pkg.gallery.length > 0 ? pkg.gallery : [image],
        aiReasoning: 'This image was chosen to best represent the package.',
        reviews: [],
      };
    })
  );
  return processedPackages;
};

export const getPackages = async (): Promise<Package[]> => {
  if (!packages) {
    packages = processPackages();
  }
  return await packages;
};


export const getPackageById = async (id: string): Promise<Package | undefined> => {
  const allPackages = await getPackages();
  return allPackages.find(pkg => pkg.id === id);
};

export const getPackagesByCountry = async (countrySlug: string): Promise<Package[]> => {
    const allPackages = await getPackages();
    if (!countrySlug) return allPackages;
    return allPackages.filter(p => slugify(p.country) === countrySlug);
};


export const getReviewsByCountry = async (countrySlug: string): Promise<Review[]> => {
    return [];
};

export async function getContinents(): Promise<Continent[]> {
    return [
      { name: 'Asia', image: 'https://picsum.photos/seed/asian-temple-architecture/800/600', dataAiHint: 'temple asia', emoji: '🏯' }
    ];
}

export async function getCountries(): Promise<Country[]> {
  return [
    { name: 'UAE', flag: '🇦🇪', heroImage: 'https://picsum.photos/seed/sheikh-zayed-mosque/1920/1080', dataAiHint: 'grand mosque', tagline: 'The Land of Seven Emirates', continent: 'Asia', culture: 'A blend of Bedouin heritage and futuristic ambition.', bestTime: 'Oct-Apr', currency: 'AED', language: 'Arabic' }
  ];
}

export async function getCountryBySlug(slug: string): Promise<Country | undefined> {
  const countries = await getCountries();
  return countries.find(c => slugify(c.name) === slug);
}

export async function getThemes(): Promise<Theme[]> {
    return [
      { id: 'all', name: 'All Themes', icon: '🌍' },
      { id: 'cultural', name: 'Cultural', icon: '🏛️' },
      { id: 'city', name: 'City Break', icon: '🏙️' },
    ];
}

export async function searchPackages(searchTerm: string): Promise<Package[]> {
  const allPackages = await getPackages();
  if (!searchTerm) {
    return [];
  }
  const searchTermLower = searchTerm.toLowerCase();
  return allPackages.filter(pkg => 
    pkg.title.toLowerCase().includes(searchTermLower) ||
    pkg.destination.toLowerCase().includes(searchTermLower) ||
    pkg.country.toLowerCase().includes(searchTermLower) ||
    pkg.highlights.some(h => h.toLowerCase().includes(searchTermLower))
  ).slice(0, 8);
}
