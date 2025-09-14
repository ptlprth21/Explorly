

'use server';
import type { Package, Review, Continent, Country, Theme } from '@/types';
import { aiImageSelection } from '@/ai/flows/ai-image-selection';
import { slugify } from './utils';
import { realPackagesData } from './real-data';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from './firebase';

// This is a mock function that simulates the AI selection process.
// In a real app, this would be an async call to the Genkit flow.
const getAiSelectedImage = async (gallery: string[], title: string) => {
  if (!gallery || gallery.length === 0) {
    // Return a placeholder if no images are available
    return {
      image: 'https://placehold.co/1200x800/222831/46C7C7?text=Image\\nNot+Found',
      reason: 'No images were provided for this package.'
    };
  }

  try {
    const result = await aiImageSelection({
      imageUrls: gallery,
      packageId: title,
      reviewSentiment: 'Very positive reviews, customers love the scenic views and cultural experiences.',
      averageRating: 4.8
    });
    
    // Return the real AI selected image if the flow succeeds, otherwise a random one.
    return {
      image: result?.selectedImageUrl || gallery[Math.floor(Math.random() * gallery.length)],
      reason: result?.reason || 'This image was selected for its vibrant colors and dynamic composition, which perfectly captures the adventurous spirit of the tour.'
    };
  } catch (error) {
    console.error("AI image selection failed, using fallback.", error);
    // Simple logic for mock: pick a random image as "AI selected" on failure
    return {
      image: gallery[Math.floor(Math.random() * gallery.length)],
      reason: 'This image was selected for its vibrant colors and dynamic composition, which perfectly captures the adventurous spirit of the tour.'
    }
  }
};


let packages: Promise<Package[]> | null = null;

const processPackages = async (): Promise<Package[]> => {
  const allPackagesData = [...realPackagesData];
  const processedPackages = await Promise.all(
    allPackagesData.map(async (pkg) => {
      const id = slugify(pkg.title);
      const { image, reason } = await getAiSelectedImage(pkg.gallery, pkg.title);
      // Reviews will now be fetched from Firebase, so we initialize with an empty array.
      return {
        ...pkg,
        id,
        image,
        aiReasoning: reason,
        reviews: [],
      };
    })
  );
  return processedPackages;
};

export const getPackages = async (): Promise<Package[]> => {
  // Caching mechanism: if packages are already processed, return them.
  // Otherwise, process and then cache.
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
    // This function will now fetch reviews from Firestore or a real backend.
    // For now, it returns an empty array as mock data is removed.
    return [];
};

export async function getContinents(): Promise<Continent[]> {
    return [
      { name: 'Asia', image: 'https://picsum.photos/seed/asia-pagoda/800/600', dataAiHint: 'temple asia', emoji: '🏯' }
    ];
}

export async function getCountries(): Promise<Country[]> {
  return [
    { name: 'UAE', flag: '🇦🇪', heroImage: 'https://picsum.photos/seed/uae-grand-mosque/1920/1080', dataAiHint: 'uae grand mosque', tagline: 'The Land of Seven Emirates', continent: 'Asia', culture: 'A blend of Bedouin heritage and futuristic ambition.', bestTime: 'Oct-Apr', currency: 'AED', language: 'Arabic' }
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


// In a real app, this data would be in Firestore and indexed for search.
// For the demo, we filter the mock data.
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
  ).slice(0, 8); // Return top 8 matches
}