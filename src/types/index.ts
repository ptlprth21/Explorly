

export interface ItineraryStep {
  day: number;
  title: string;
  description: string;
}

export interface Review {
  id: string;
  packageId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  country?: string;
}

export type ThemeId = 'all' | 'safari' | 'cultural' | 'beach' | 'adventure' | 'city';
export interface Theme {
    id: ThemeId;
    name: string;
    icon: string;
}

export type ContinentName = 'Asia' | 'Europe' | 'Africa' | 'North America' | 'South America' | 'Australia' | 'Antarctica';

export interface Package {
  id: string;
  title: string;
  destination: string;
  country: string;
  continent: ContinentName;
  duration: string;
  price: number;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  type: 'Safari' | 'Cultural' | 'Beach' | 'Adventure' | 'City Break';
  theme: ThemeId;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  highlights: string[];
  description: string;
  itinerary: ItineraryStep[];
  inclusions: string[];
  exclusions: string[];
  availableDates: string[];
  aiReasoning: string;
}

export interface Continent {
  name: ContinentName;
  image: string;
  dataAiHint: string;
  emoji?: string;
  description?: string;
}

export interface Country {
    name: string;
    flag: string;
    heroImage: string;
    tagline: string;
    continent: ContinentName;
    culture: string;
    bestTime: string;
    currency: string;
    language: string;
}

export interface GlobalStats {
  countries: number;
  packages: number;
  happyTravelers: number;
  averageRating: number;
}
