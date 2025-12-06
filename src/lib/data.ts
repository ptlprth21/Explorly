
//'use server';
import type { Package, Review, Continent, Country, Theme } from '@/types';
import { aiImageSelection } from '@/ai/flows/ai-image-selection';
import { slugify } from './utils';
import { fetchPackagesFromDB } from './real-data';
//import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { supabase } from './supabase';

// let packages: Promise<Package[]> | null = null;

// const processPackages = async (): Promise<Package[]> => {
//   const allPackagesData = [...realPackagesData];
//   const processedPackages = await Promise.all(
//     allPackagesData.map(async (pkg) => {
//       const id = slugify(pkg.title);
//       // Use the predefined image from real-data and ensure gallery has at least one image.
//       const image = pkg.image || `https://picsum.photos/seed/${id}/1200/800`;
      
//       return {
//         ...pkg,
//         id,
//         image: image,
//         gallery: pkg.gallery.length > 0 ? pkg.gallery : [image],
//         aiReasoning: 'This image was chosen to best represent the package.',
//         reviews: [],
//       };
//     })
//   );
//   return processedPackages;
// };

// export const getPackages = async (): Promise<Package[]> => {
//   if (!packages) {
//     packages = processPackages();
//   }
//   return await packages;
// };

let packagesCache = null;

export async function processPackages() {
  const rawPackages = await fetchPackagesFromDB();

  const processed = rawPackages.map((pkg) => {
    const slug = slugify(pkg.title, { lower: true });

    const mainImage = pkg.main_image ||
      `https://picsum.photos/seed/${slug}/1200/800`;

    const gallery =
      pkg.gallery && pkg.gallery.length > 0
        ? pkg.gallery
        : [mainImage];

    return {
      ...pkg,
      slug,
      image: mainImage,
      gallery,
      themes: pkg.themes?.map((t) => t.theme) ?? [],
      itineraries: pkg.itineraries ?? [],
      reviews: pkg.reviews ?? [],
      country: pkg.country ?? null,
      aiReasoning: pkg.ai_reasoning || 'This image was chosen to best represent the package.',
    };
  });

  return processed;
}

export async function getPackages() {
  if (!packagesCache) {
    packagesCache = await processPackages();
  }
  return packagesCache;
}

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
    const { data, error } = await supabase
    .from('continents')
    .select('id, image, data_ai_hint, emoji')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching continents:', error);
    return [];
  }

  return data.map((continent) => ({
    id: continent.id,
    image: continent.image,
    dataAiHint: continent.data_ai_hint,
    emoji: continent.emoji,
  }));
}

// export async function getCountries(): Promise<Country[]> {
//   return [
//     { 
//       name: 'UAE', 
//       flag: 'https://flagcdn.com/w40/ae.png', 
//       heroVideo: '/videos/46950-450094784.mp4', 
//       dataAiHint: 'grand mosque', 
//       tagline: 'The Land of Seven Emirates', 
//       description: 'The UAE is a federation of seven Emirates (Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Fujairah, and Ras Al Khaimah). It is a global hub of commerce, luxury, and innovation, known for its audacious architecture, world-class resorts, and deep commitment to cultural preservation.',
//       capital: 'Abu Dhabi',
//       largestCity: 'Dubai',
//       timeZone: 'GMT +4',
//       formationDate: 'December 2, 1971',
//       continent: 'Asia', 
//       cultureDesciption: 'The UAE is an Islamic country, and while modern and cosmopolitan, visitors are expected to observe certain local customs, particularly regarding respect and public conduct.', 
//       cultureDetails: [
//         {
//           title: 'Dress Code',
//           details: '• For Women: Shoulders and knees should generally be covered in public (malls, souks, Old Dubai). Lightweight scarves are useful for spontaneous visits to mosques or historical sites. Inside a resort or on a private beach, standard swimwear is fine.\n\n• For Men: Shorts and t-shirts are acceptable, but shirts must be worn at all times. Avoid revealing or excessively casual clothing in formal settings or at religious sites.\n\n• Mosques: When visiting a mosque (like the Sheikh Zayed Grand Mosque), both men and women must cover their arms and legs. Women must cover their hair. Appropriate clothing is often provided free of charge at the entrance of major mosques.'
//         },
//         {
//           title: 'Public Conduct',
//           details: '• Public Display of Affection (PDA): It’s best to keep public affection to a minimum. Holding hands is generally acceptable, but kissing or hugging in public can be considered offensive.\n\n• Gestures: Avoid pointing the sole of your foot at anyone, as this is considered rude. Using your right hand for greetings, eating, and passing objects is considered good manners.\n\n• Alcohol: Alcohol is available in licensed hotels, restaurants, and bars. However, being intoxicated in public or driving under the influence is strictly prohibited and carries severe penalties.\n\n• Photography: Always ask permission before taking photos of local residents, especially Emirati women. Avoid taking pictures of government buildings, military sites, or police.'
//         },
//         {
//           title: 'Ramadan',
//           details: '• Do not eat, drink, or smoke in public outside of designated tourist zones or private hotel areas.\n\n• Business hours may be reduced.\n\n• Respect and quiet observance are appreciated.'
//         },
//       ],
//       historyDetails: [
//         {
//           title: 'The Past',
//           details: 'For centuries, the economy of the region was centered around fishing, date farming, and, most importantly, pearl diving. The Bedouin tribes maintained a nomadic, desert lifestyle characterized by hospitality and strong familial bonds. The area was known as the Trucial States under British protection.'
//         },
//         {
//           title: 'The Turning Point',
//           details: 'In the late 1950s and early 1960s, vast oil reserves were discovered, most notably in Abu Dhabi. This discovery rapidly transformed the economic landscape.'
//         },
//         {
//           title: 'The Federation',
//           details: 'On December 2, 1971, the seven Emirates formally united to form the UAE, establishing a government dedicated to modernizing the nation while preserving its core Arab and Islamic identity.'
//         },
//       ],
//       guide: [
//         {
//           emirate: 'Abu Dhabi',
//           vibeFocus: 'The Cultural Capital. Serious, stately, and culturally rich. The political and literal capital.',
//           keyHighlight: 'Sheikh Zayed Grand Mosque, Louvre Abu Dhabi'
//         },
//         {
//           emirate: 'Dubai',
//           vibeFocus: 'The Global Metropolis. Flashy, futuristic, and focused on tourism and commerce.',
//           keyHighlight: 'Burj Khalifa, Palm Jumeirah'
//         },
//         {
//           emirate: 'Sharjah',
//           vibeFocus: 'The Cultural Heart. Often called the cultural capital of the Arab world, with a stronger focus on tradition.',
//           keyHighlight: 'Museum of Islamic Civilization'
//         },
//         {
//           emirate: 'Ras Al Khaimah',
//           vibeFocus: 'The Adventure Hub. Known for its rugged mountains, beaches, and outdoor sports.',
//           keyHighlight: 'Jebel Jais (Zip-lining)'
//         },
//         {
//           emirate: 'Fujairah',
//           vibeFocus: 'The East Coast Gem. The only Emirate entirely on the Gulf of Oman, known for beautiful beaches and diving.',
//           keyHighlight: 'Al-Badiyah Mosque (oldest in the UAE)'
//         },
//         {
//           emirate: 'Ajman',
//           vibeFocus: 'The Smallest. A peaceful coastal retreat often favored by residents of other Emirates.',
//           keyHighlight: 'Ajman Museum'
//         },
//         {
//           emirate: 'Umm Al Quwain',
//           vibeFocus: 'The Quiet Explorer. Known for its mangroves, old forts, and peaceful lagoons.',
//           keyHighlight: 'Dreamland Aqua Park'
//         }
//       ],
//       facts: [
//         {
//           title: 'Skiing in the Desert',
//           description: 'Dubai is home to Ski Dubai, one of the world\'s largest indoor ski resorts, featuring five slopes and real snow, all maintained inside a massive mall.'
//         },
//         {
//           title: 'The World’s Tallest',
//           description: 'The Burj Khalifa is not just the tallest building; it holds world records for the highest outdoor observation deck and the highest number of stories.'
//         },
//         {
//           title: 'A Ministry of Happiness',
//           description: 'The UAE government is known for its forward-thinking ministries, including the Minister of State for Happiness and Well-being, appointed to ensure policies promote a happier and more positive society.'
//         },
//         {
//           title: 'The Palm Jumeirah',
//           description: 'This iconic, man-made archipelago required enough sand to fill the Empire State Building more than two times over. No concrete was used in its construction—just rock and sand.'
//         },
//         {
//           title: 'Golden ATM',
//           description: 'On occasion, you can find ATMs in Abu Dhabi and Dubai that dispense gold bars instead of cash.'
//         }
//       ],
//       bestTime: 'Oct-Apr', 
//       currency: 'AED', 
//       language: 'Arabic' 
//     }
//   ];
// }

export async function getCountries(): Promise<Country[]> {
  const { data: countries, error: countriesError } = await supabase
    .from('countries')
    .select(`
      id,
      name,
      flag,
      hero_video,
      data_ai_hint,
      tagline,
      description,
      capital,
      largest_city,
      time_zone,
      formation_date,
      culture_description,
      best_time,
      currency,
      language,
      continent
    `)
    .order('name', { ascending: true });

  if (countriesError) {
    console.error('Error fetching countries:', countriesError);
    return [];
  }

  const [cultureDetailsRes, historyDetailsRes, guideRes, factsRes] = await Promise.all([
    supabase.from('country_culture_details').select('*').order('order', { ascending: true }),
    supabase.from('country_history_details').select('*').order('order', { ascending: true }),
    supabase.from('country_guides').select('*').order('order', { ascending: true }),
    supabase.from('country_facts').select('*').order('order', { ascending: true })
  ]);

  if (
    cultureDetailsRes.error ||
    historyDetailsRes.error ||
    guideRes.error ||
    factsRes.error
  ) {
    console.error('Error fetching related country info:', {
      culture: cultureDetailsRes.error,
      history: historyDetailsRes.error,
      guide: guideRes.error,
      facts: factsRes.error
    });
    return [];
  }

  return countries.map((c) => ({
    id: c.id,
    name: c.name,
    flag: c.flag,
    heroVideo: c.hero_video,
    dataAiHint: c.data_ai_hint,
    tagline: c.tagline,
    description: c.description,
    capital: c.capital,
    largestCity: c.largest_city,
    timeZone: c.time_zone,
    formationDate: c.formation_date,
    continent: c.continent,
    cultureDesciption: c.culture_description,

    cultureDetails: cultureDetailsRes.data
      ?.filter((cd) => cd.country_id === c.id)
      .map((cd) => ({
        title: cd.title,
        details: cd.details
      })) ?? [],

    historyDetails: historyDetailsRes.data
      ?.filter((hd) => hd.country_id === c.id)
      .map((hd) => ({
        title: hd.title,
        details: hd.details
      })) ?? [],

    guide: guideRes.data
      ?.filter((g) => g.country_id === c.id)
      .map((g) => ({
        emirate: g.emirate,
        vibeFocus: g.vibe_focus,
        keyHighlight: g.key_highlight
      })) ?? [],

    facts: factsRes.data
      ?.filter((f) => f.country_id === c.id)
      .map((f) => ({
        title: f.title,
        description: f.description
      })) ?? [],

    bestTime: c.best_time,
    currency: c.currency,
    language: c.language
  }));
}

export async function getCountryBySlug(slug: string): Promise<Country | undefined> {
  const countries = await getCountries();
  return countries.find(c => slugify(c.name) === slug);
}

// export async function getThemes(): Promise<Theme[]> {
//     return [
//       { id: 'all', name: 'All Themes', icon: '🌍' },
//       { id: 'safari', name: 'Safari', icon: '🦁' },
//       { id: 'cultural', name: 'Cultural', icon: '🏛️' },
//       { id: 'beach', name: 'Beach', icon: '🏖️' },
//       { id: 'adventure', name: 'Adventure', icon: '⛰️' },
//       { id: 'city', name: 'City Break', icon: '🏙️' },
//       { id: 'luxury', name: 'Luxury', icon: '💎' },
//       { id: 'relaxation', name: 'Relaxation', icon: '😌' },
//       { id: 'value', name: 'Value', icon: '💰' },
//       { id: 'bespoke', name: 'Bespoke', icon: '🧵' },
//       { id: 'contrast', name: 'Contrast', icon: '⚖️' },
//       { id: 'familyAdventure', name: 'Family Adventure', icon: '👨‍👩‍👧‍👦' },
//       { id: 'explorer', name: 'Explorer', icon: '🧭' },
//       { id: 'highlights', name: 'Highlights', icon: '⭐' },
//       { id: 'adrenaline', name: 'Adrenaline', icon: '🔥' },
//       { id: 'VIPluxury', name: 'VIP Luxury', icon: '👑' },
//       { id: 'VIPculture', name: 'VIP Culture', icon: '🎭' },
//       { id: 'VIPexperience', name: 'VIP Experience', icon: '🥂' },
//       { id: 'wellness', name: 'Wellness', icon: '🧘‍♂️' },
//       { id: 'retreat', name: 'Retreat', icon: '🌿' },
//       { id: 'desert', name: 'Desert', icon: '🏜️' },
//       { id: 'immersion', name: 'Immersion', icon: '🌊' },
//       { id: 'mid-range', name: 'Mid-Range', icon: '💼' },
//       {id: 'heritage', name: 'Heritage', icon: '🏺'},
//     ];
// }

export async function getThemes(): Promise<Theme[]> {
  const { data, error } = await supabase
    .from('themes')
    .select('id, name, icon')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching themes:', error);
    return [];
  }

  return data.map((t) => ({
    id: t.id,
    name: t.name,
    icon: t.icon,
  }));
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
