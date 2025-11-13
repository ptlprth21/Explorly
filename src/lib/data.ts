
//'use server';
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
      { name: 'Asia', image: 'https://picsum.photos/seed/asian-monument-landmark/800/600', dataAiHint: 'monument asia', emoji: '🏯' }
    ];
}

export async function getCountries(): Promise<Country[]> {
  return [
    { 
      name: 'UAE', 
      flag: 'https://flagcdn.com/w40/ae.png', 
      heroImage: 'https://firebasestorage.googleapis.com/v0/b/roamready-kyyht.appspot.com/o/uploads%2Fuae-skyline-night.png?alt=media', 
      dataAiHint: 'grand mosque', 
      tagline: 'The Land of Seven Emirates', 
      description: 'The UAE is a federation of seven Emirates (Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Fujairah, and Ras Al Khaimah). It is a global hub of commerce, luxury, and innovation, known for its audacious architecture, world-class resorts, and deep commitment to cultural preservation.',
      continent: 'Asia', 
      culture: 'The UAE is an Islamic country, and while modern and cosmopolitan, visitors are expected to observe certain local customs, particularly regarding respect and public conduct.', 
      cultureDetails: [
        {
          title: 'Dress Code',
          details: '• For Women: Shoulders and knees should generally be covered in public (malls, souks, Old Dubai). Lightweight scarves are useful for spontaneous visits to mosques or historical sites. Inside a resort or on a private beach, standard swimwear is fine.\n\n• For Men: Shorts and t-shirts are acceptable, but shirts must be worn at all times. Avoid revealing or excessively casual clothing in formal settings or at religious sites.\n\n• Mosques: When visiting a mosque (like the Sheikh Zayed Grand Mosque), both men and women must cover their arms and legs. Women must cover their hair. Appropriate clothing is often provided free of charge at the entrance of major mosques.'
        },
        {
          title: 'Public Conduct ',
          details: '• Public Display of Affection (PDA): It’s best to keep public affection to a minimum. Holding hands is generally acceptable, but kissing or hugging in public can be considered offensive.\n\n• Gestures: Avoid pointing the sole of your foot at anyone, as this is considered rude. Using your right hand for greetings, eating, and passing objects is considered good manners.\n\n• Alcohol: Alcohol is available in licensed hotels, restaurants, and bars. However, being intoxicated in public or driving under the influence is strictly prohibited and carries severe penalties.\n\n• Photography: Always ask permission before taking photos of local residents, especially Emirati women. Avoid taking pictures of government buildings, military sites, or police.'
        },
        {
          title: 'Ramadan',
          details: '• Do not eat, drink, or smoke in public outside of designated tourist zones or private hotel areas.\n\n• Business hours may be reduced.\n\n• Respect and quiet observance are appreciated.'
        },
      ],
      bestTime: 'Oct-Apr', 
      currency: 'AED', 
      language: 'Arabic' 
    }
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
