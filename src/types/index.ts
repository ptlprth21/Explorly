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
}

export interface Package {
  id: string;
  title: string;
  destination: string;
  country: string;
  continent: 'Asia' | 'Europe' | 'Africa' | 'North America' | 'South America' | 'Australia';
  duration: string;
  price: number;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  type: 'Safari' | 'Cultural' | 'Beach' | 'Adventure' | 'City Break';
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
  name: 'Asia' | 'Europe' | 'Africa' | 'North America' | 'South America' | 'Australia';
  image: string;
  dataAiHint: string;
}
