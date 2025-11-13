
import { z } from 'zod';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface CultureDetail {
  title: string;
  details: string;
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
  tagline: string;
  country: string;
  continent: ContinentName;
  duration: string;
  price: number;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  theme: ThemeId;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  highlights: string[];
  description: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  availableDates: string[];
  aiReasoning: string;
  reviews: Review[];
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
  description: string;
  tagline: string;
  continent: ContinentName;
  culture: string;
  cultureDetails: CultureDetail[];
  bestTime: string;
  currency: string;
  language: string;
  dataAiHint?: string;
}

export interface GlobalStats {
  countries: number;
  packages: number;
  happyTravelers: number;
  averageRating: number;
}

export interface BookingData {
  id?: string;
  userId: string;
  packageId: string;
  packageName: string;
  packageImage: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  travelers: number;
  selectedDate: string;
  totalPrice: number;
  specialRequests?: string;
  bookingDate?: any;
  paymentIntentId?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

// Contact Form Schemas and Types
export const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person submitting the form.'),
  email: z.string().email().describe('The email address of the person.'),
  message: z.string().describe('The message content.'),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

export const ContactFormOutputSchema = z.object({
  reply: z.string().describe('A confirmation message to show the user.'),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;
