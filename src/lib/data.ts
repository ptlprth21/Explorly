
'use server';
import type { Package, Review, Continent } from '@/types';
import { aiImageSelection } from '@/ai/flows/ai-image-selection';
import { slugify } from './utils';
import { packagesData, reviews as allReviews, continents as allContinents } from './mock-data';

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
      image: result?.selectedImageUrl || gallery[0],
      reason: result?.reason || 'This image was selected for its vibrant colors and dynamic composition, which perfectly captures the adventurous spirit of the tour.'
    };
  } catch (error) {
    console.error("AI image selection failed, using fallback.", error);
    // Simple logic for mock: pick the first image as "AI selected" on failure
    return {
      image: gallery[0],
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
      return {
        ...pkg,
        id,
        image,
        aiReasoning: reason,
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

export const getReviews = async (): Promise<Review[]> => {
  return allReviews;
}

export const getReviewsByPackageId = async (packageId: string): Promise<Review[]> => {
    return allReviews.filter(review => review.packageId === packageId);
}

export const getReviewsByCountry = async (countrySlug: string): Promise<Review[]> => {
    const countryPackages = await getPackagesByCountry(countrySlug);
    const packageIds = countryPackages.map(p => p.id);
    return allReviews.filter(r => packageIds.includes(r.packageId));
};

export const getContinents = async (): Promise<Continent[]> => {
    return allContinents;
}
