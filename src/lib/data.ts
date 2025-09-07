
'use server';
import type { Package, Review, Continent, Country, Theme } from '@/types';
import { aiImageSelection } from '@/ai/flows/ai-image-selection';
import { slugify } from './utils';
import { packagesData, reviews as allReviews, continents as allContinents, countries as allCountries, themes as allThemes } from './mock-data';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from './firebase';

// This is a mock function that simulates the AI selection process.
// In a real app, this would be an async call to the Genkit flow.
const getAiSelectedImage = async (gallery: string[], title: string) => {
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
  const processedPackages = await Promise.all(
    packagesData.map(async (pkg) => {
      const id = slugify(pkg.title);
      const { image, reason } = await getAiSelectedImage(pkg.gallery, pkg.title);
      const reviews = allReviews.filter(review => review.packageId === id);
      return {
        ...pkg,
        id,
        image,
        aiReasoning: reason,
        reviews,
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

export async function getReviews(): Promise<Review[]> {
  return allReviews;
}

export async function getReviewsByPackageId(packageId: string): Promise<Review[]> {
    return allReviews.filter(review => review.packageId === packageId);
}

export const getReviewsByCountry = async (countrySlug: string): Promise<Review[]> => {
    const countryPackages = await getPackagesByCountry(countrySlug);
    const packageIds = countryPackages.map(p => p.id);
    return allReviews.filter(r => packageIds.includes(r.packageId));
};

export async function getContinents(): Promise<Continent[]> {
    return allContinents;
}

export async function getCountries(): Promise<Country[]> {
  return allCountries;
}

export async function getCountryBySlug(slug: string): Promise<Country | undefined> {
  return allCountries.find(c => slugify(c.name) === slug);
}

export async function getThemes(): Promise<Theme[]> {
    return allThemes;
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
