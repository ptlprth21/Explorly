
import { Package, Review, Continent } from '@/types';
import { aiImageSelection } from '@/ai/flows/ai-image-selection';
import { slugify } from './utils';

// This is a mock function that simulates the AI selection process.
// In a real app, this would be an async call to the Genkit flow.
const getAiSelectedImage = async (gallery: string[], title: string) => {
  // Simple logic for mock: pick one image randomly as "AI selected"
  const selectedImage = gallery[Math.floor(Math.random() * gallery.length)];
  
  try {
    const { output } = await aiImageSelection({
      imageUrls: gallery,
      packageId: title,
      reviewSentiment: 'Very positive reviews, customers love the scenic views and cultural experiences.',
      averageRating: 4.8
    });
    
    // Return the real AI selected image if the flow succeeds, otherwise a random one.
    return {
      image: output?.selectedImageUrl || selectedImage,
      reason: output?.reason || 'This image was selected for its vibrant colors and dynamic composition, which perfectly captures the adventurous spirit of the tour.'
    };
  } catch (error) {
    console.error("AI image selection failed, using fallback.", error);
    return {
      image: selectedImage,
      reason: 'This image was selected for its vibrant colors and dynamic composition, which perfectly captures the adventurous spirit of the tour.'
    }
  }
};

const packagesData: Omit<Package, 'id' | 'image' | 'aiReasoning'>[] = [
  {
    title: 'Serengeti Wildlife Safari',
    destination: 'Serengeti National Park',
    country: 'Tanzania',
    continent: 'Africa',
    duration: '7 days',
    price: 3499,
    gallery: [
      'https://picsum.photos/seed/safari1/1200/800',
      'https://picsum.photos/seed/safari2/1200/800',
      'https://picsum.photos/seed/safari3/1200/800',
    ],
    rating: 4.9,
    reviewCount: 152,
    type: 'Safari',
    difficulty: 'Moderate',
    highlights: ['Big Five Sighting', 'Maasai Village Visit', 'Hot Air Balloon Safari'],
    description: 'Experience the raw beauty of the Serengeti, home to the Great Migration. Witness breathtaking landscapes and an abundance of wildlife in their natural habitat.',
    itinerary: [
      { day: 1, title: 'Arrival in Arusha', description: 'Transfer to your lodge and relax.' },
      { day: 2, title: 'Tarangire National Park', description: 'Full day game drive to see elephants and baobab trees.' },
      { day: 3-5, title: 'Central Serengeti', description: 'Explore the heart of the Serengeti, seeking out the Big Five.' },
      { day: 6, title: 'Ngorongoro Crater', description: 'Descend into the crater for a unique wildlife viewing experience.' },
      { day: 7, title: 'Departure', description: 'Return to Arusha for your flight home.' },
    ],
    inclusions: ['4x4 Vehicle', 'Park Fees', 'Experienced Guide', 'Full Board Accommodation'],
    exclusions: ['International Flights', 'Visa Fees', 'Gratuities'],
    availableDates: ['2025-07-15', '2025-08-01', '2025-09-10'],
  },
  {
    title: 'Kyoto Cultural Expedition',
    destination: 'Kyoto',
    country: 'Japan',
    continent: 'Asia',
    duration: '5 days',
    price: 2899,
    gallery: [
      'https://picsum.photos/seed/kyoto1/1200/800',
      'https://picsum.photos/seed/kyoto2/1200/800',
      'https://picsum.photos/seed/kyoto3/1200/800',
    ],
    rating: 4.8,
    reviewCount: 210,
    type: 'Cultural',
    difficulty: 'Easy',
    highlights: ['Kinkaku-ji Temple', 'Gion District Geisha Spotting', 'Arashiyama Bamboo Grove'],
    description: 'Immerse yourself in the ancient traditions and serene beauty of Kyoto. From golden temples to tranquil gardens, discover the heart of old Japan.',
    itinerary: [
        { day: 1, title: 'Arrival in Kyoto', description: 'Check into your traditional ryokan.' },
        { day: 2, title: 'Temples and Shrines', description: 'Visit Fushimi Inari and Kinkaku-ji.' },
        { day: 3, title: 'Gion and Tea Ceremony', description: 'Explore the historic Gion district and participate in a traditional tea ceremony.' },
        { day: 4, title: 'Arashiyama', description: 'Walk through the bamboo grove and visit the monkey park.' },
        { day: 5, title: 'Departure', description: 'Enjoy a final Japanese breakfast before heading to the airport.' },
    ],
    inclusions: ['Accommodation', 'Guided Tours', 'Tea Ceremony', 'Public Transport Pass'],
    exclusions: ['International Flights', 'Lunches and Dinners', 'Personal Expenses'],
    availableDates: ['2025-04-05', '2025-05-20', '2025-10-15'],
  },
  {
    title: 'Machu Picchu Inca Trail',
    destination: 'Cusco & Machu Picchu',
    country: 'Peru',
    continent: 'South America',
    duration: '8 days',
    price: 2950,
    gallery: [
      'https://picsum.photos/seed/peru1/1200/800',
      'https://picsum.photos/seed/peru2/1200/800',
      'https://picsum.photos/seed/peru3/1200/800',
    ],
    rating: 4.9,
    reviewCount: 340,
    type: 'Adventure',
    difficulty: 'Hard',
    highlights: ['Classic Inca Trail', 'Sunrise at Machu Picchu', 'Sacred Valley Tour'],
    description: 'Trek the ancient paths of the Incas to the lost city of Machu Picchu. A challenging but rewarding journey through stunning Andean landscapes.',
    itinerary: [
        { day: 1-2, title: 'Acclimatization in Cusco', description: 'Explore Cusco and the Sacred Valley.' },
        { day: 3-6, title: 'Inca Trail Trek', description: 'Four days of trekking through breathtaking scenery.' },
        { day: 7, title: 'Machu Picchu Tour', description: 'Guided tour of the ancient citadel.' },
        { day: 8, title: 'Departure', description: 'Return to Cusco for departure.' },
    ],
    inclusions: ['Inca Trail Permit', 'Porters and Cook', 'Camping Equipment', 'Machu Picchu Entrance'],
    exclusions: ['International Flights', 'Sleeping Bag', 'Travel Insurance'],
    availableDates: ['2025-06-10', '2025-07-22', '2025-08-18'],
  },
  {
    title: 'Greek Islands Hopping',
    destination: 'Santorini, Mykonos, Crete',
    country: 'Greece',
    continent: 'Europe',
    duration: '10 days',
    price: 4200,
    gallery: [
      'https://picsum.photos/seed/greece1/1200/800',
      'https://picsum.photos/seed/greece2/1200/800',
      'https://picsum.photos/seed/greece3/1200/800',
    ],
    rating: 4.7,
    reviewCount: 188,
    type: 'Beach',
    difficulty: 'Easy',
    highlights: ['Santorini Caldera Sunset', 'Mykonos Nightlife', 'Historical Knossos Palace'],
    description: 'Discover the magic of the Greek Islands. From the iconic white-washed villages of Santorini to the vibrant beaches of Mykonos, this is the ultimate Mediterranean escape.',
    itinerary: [
        { day: 1-3, title: 'Santorini', description: 'Explore Oia and Fira, and enjoy a catamaran cruise.' },
        { day: 4-6, title: 'Mykonos', description: 'Relax on the famous beaches and explore Mykonos Town.' },
        { day: 7-9, title: 'Crete', description: 'Visit Knossos Palace and hike the Samaria Gorge.' },
        { day: 10, title: 'Departure', description: 'Fly out from Heraklion.' },
    ],
    inclusions: ['Ferry Tickets', '4-star Hotels', 'Santorini Catamaran Cruise', 'Airport Transfers'],
    exclusions: ['International Flights', 'Most Meals', 'Optional Activities'],
    availableDates: ['2025-07-01', '2025-08-12', '2025-09-05'],
  },
  // Add more packages to reach at least 10
  {
    title: 'Canadian Rockies Adventure',
    destination: 'Banff & Jasper',
    country: 'Canada',
    continent: 'North America',
    duration: '9 days',
    price: 3800,
    gallery: [
        'https://picsum.photos/seed/canada1/1200/800',
        'https://picsum.photos/seed/canada2/1200/800',
        'https://picsum.photos/seed/canada3/1200/800',
    ],
    rating: 4.9,
    reviewCount: 255,
    type: 'Adventure',
    difficulty: 'Moderate',
    highlights: ['Lake Louise & Moraine Lake', 'Icefields Parkway Drive', 'Jasper Wildlife'],
    description: 'Explore the pristine wilderness of the Canadian Rockies. Witness turquoise lakes, towering glaciers, and abundant wildlife in two of Canada\'s most famous national parks.',
    itinerary: [],
    inclusions: ['National Park Passes', 'Accommodation', 'Ice Explorer Ride'],
    exclusions: ['Flights', 'Most Meals', 'Car Rental'],
    availableDates: ['2025-07-20', '2025-08-10', '2025-09-01'],
  },
  {
    title: 'Australian Outback Odyssey',
    destination: 'Uluru & Kings Canyon',
    country: 'Australia',
    continent: 'Australia',
    duration: '4 days',
    price: 2100,
    gallery: [
        'https://picsum.photos/seed/oz1/1200/800',
        'https://picsum.photos/seed/oz2/1200/800',
        'https://picsum.photos/seed/oz3/1200/800',
    ],
    rating: 4.6,
    reviewCount: 130,
    type: 'Safari',
    difficulty: 'Moderate',
    highlights: ['Uluru Sunrise & Sunset', 'Kings Canyon Rim Walk', 'Aboriginal Cultural Tour'],
    description: 'Journey into the heart of the Australian Outback to discover the spiritual significance and rugged beauty of Uluru and Kings Canyon.',
    itinerary: [],
    inclusions: ['Guided Tours', 'Accommodation', 'Park Entrance Fees'],
    exclusions: ['Flights to Alice Springs', 'Meals', 'Optional Camel Ride'],
    availableDates: ['2025-05-15', '2025-09-20', '2025-10-25'],
  },
  {
    title: 'Flavors of Italy',
    destination: 'Rome, Florence, Tuscany',
    country: 'Italy',
    continent: 'Europe',
    duration: '10 days',
    price: 3900,
    gallery: [
        'https://picsum.photos/seed/italy1/1200/800',
        'https://picsum.photos/seed/italy2/1200/800',
        'https://picsum.photos/seed/italy3/1200/800',
    ],
    rating: 4.8,
    reviewCount: 312,
    type: 'Cultural',
    difficulty: 'Easy',
    highlights: ['Colosseum Tour', 'Tuscan Wine Tasting', 'Florence Art Museums'],
    description: 'A gastronomic and cultural journey through Italy\'s most iconic cities and countryside. Taste, see, and experience the best of Italian life.',
    itinerary: [],
    inclusions: ['Train Tickets', 'Accommodation', 'Cooking Class', 'Wine Tasting'],
    exclusions: ['Flights', 'City Taxes', 'Lunches and Dinners'],
    availableDates: ['2025-05-10', '2025-09-15', '2025-10-05'],
  },
  {
    title: 'Vibrant Vietnam',
    destination: 'Hanoi, Ha Long Bay, Hoi An',
    country: 'Vietnam',
    continent: 'Asia',
    duration: '12 days',
    price: 2500,
    gallery: [
        'https://picsum.photos/seed/vietnam1/1200/800',
        'https://picsum.photos/seed/vietnam2/1200/800',
        'https://picsum.photos/seed/vietnam3/1200/800',
    ],
    rating: 4.7,
    reviewCount: 280,
    type: 'Cultural',
    difficulty: 'Easy',
    highlights: ['Ha Long Bay Cruise', 'Hoi An Lanterns', 'Hanoi Street Food Tour'],
    description: 'Experience the rich history, stunning landscapes, and delicious cuisine of Vietnam. From bustling cities to serene bays, this tour has it all.',
    itinerary: [],
    inclusions: ['Internal Flights', 'Accommodation', 'Ha Long Bay Cruise', 'Guided Tours'],
    exclusions: ['International Flights', 'Visa Fees', 'Some Meals'],
    availableDates: ['2025-03-10', '2025-04-12', '2025-11-20'],
  },
  {
    title: 'Patagonia Hiking Explorer',
    destination: 'El Chaltén & Torres del Paine',
    country: 'Argentina',
    continent: 'South America',
    duration: '14 days',
    price: 5500,
    gallery: [
        'https://picsum.photos/seed/patagonia1/1200/800',
        'https://picsum.photos/seed/patagonia2/1200/800',
        'https://picsum.photos/seed/patagonia3/1200/800',
    ],
    rating: 5.0,
    reviewCount: 195,
    type: 'Adventure',
    difficulty: 'Hard',
    highlights: ['Fitz Roy Trek', 'Perito Moreno Glacier', 'Torres del Paine W-Trek'],
    description: 'A trekker\'s paradise. Conquer the most iconic trails in Patagonia, witnessing granite spires, massive glaciers, and windswept plains.',
    itinerary: [],
    inclusions: ['All Accommodation', 'Guided Hikes', 'Glacier Tour', 'Bus Transfers'],
    exclusions: ['Flights', 'National Park Entrance Fees', 'Most Meals'],
    availableDates: ['2025-11-15', '2025-12-05', '2026-01-20'],
  },
  {
    title: 'Egyptian Wonders',
    destination: 'Cairo, Luxor, Aswan',
    country: 'Egypt',
    continent: 'Africa',
    duration: '9 days',
    price: 2750,
    gallery: [
        'https://picsum.photos/seed/egypt1/1200/800',
        'https://picsum.photos/seed/egypt2/1200/800',
        'https://picsum.photos/seed/egypt3/1200/800',
    ],
    rating: 4.7,
    reviewCount: 410,
    type: 'Cultural',
    difficulty: 'Easy',
    highlights: ['Pyramids of Giza', 'Nile River Cruise', 'Valley of the Kings'],
    description: 'Journey back in time to the land of pharaohs. Explore ancient temples, cruise the legendary Nile, and marvel at the last remaining wonder of the ancient world.',
    itinerary: [],
    inclusions: ['Nile Cruise (Full Board)', 'Domestic Flights', 'Egyptologist Guide'],
    exclusions: ['International Flights', 'Visa', 'Entrance Fees to some sites'],
    availableDates: ['2025-02-15', '2025-03-20', '2025-10-28'],
  },
];

export const reviews: Review[] = [
  { id: '1', packageId: 'serengeti-wildlife-safari', userName: 'Alice', rating: 5, comment: 'Absolutely breathtaking! Our guide was incredible. Saw the Big Five!', date: '2024-07-20T10:00:00Z', verified: true },
  { id: '2', packageId: 'serengeti-wildlife-safari', userName: 'Bob', rating: 5, comment: 'The hot air balloon ride was a highlight. A must-do.', date: '2024-07-18T14:30:00Z', verified: true },
  { id: '3', packageId: 'kyoto-cultural-expedition', userName: 'Charlie', rating: 5, comment: 'Kyoto is magical. The ryokan stay was so authentic.', date: '2024-06-10T09:00:00Z', verified: true },
  { id: '4', packageId: 'kyoto-cultural-expedition', userName: 'Diana', rating: 4, comment: 'Loved the tour, but wish there was more free time to explore on our own.', date: '2024-06-12T11:20:00Z', verified: true },
  { id: '5', packageId: 'machu-picchu-inca-trail', userName: 'Ethan', rating: 5, comment: 'Toughest thing I\'ve ever done, but worth every second. The views are unreal.', date: '2024-08-01T18:00:00Z', verified: true },
  { id: '6', packageId: 'machu-picchu-inca-trail', userName: 'Fiona', rating: 5, comment: 'Our porters were superheroes. The food they cooked on the trail was amazing.', date: '2024-08-02T12:00:00Z', verified: true },
  { id: '7', packageId: 'greek-islands-hopping', userName: 'George', rating: 4, comment: 'Santorini was as beautiful as the pictures. Mykonos was a bit too crowded for me.', date: '2024-07-25T16:45:00Z', verified: true },
  { id: '8', packageId: 'canadian-rockies-adventure', userName: 'Hannah', rating: 5, comment: 'I cried when I saw Lake Louise. The color of the water is something you have to see to believe.', date: '2024-08-15T13:00:00Z', verified: true },
  { id: '9', packageId: 'egyptian-wonders', userName: 'Ian', rating: 5, comment: 'The Nile cruise was so relaxing and our Egyptologist guide brought history to life. Incredible trip.', date: '2024-03-05T09:30:00Z', verified: false },
  { id: '10', packageId: 'patagonia-hiking-explorer', userName: 'Jane', rating: 5, comment: 'Mind-blowing landscapes. The W-Trek was challenging but so rewarding. Be prepared for all four seasons in one day!', date: '2024-02-10T20:00:00Z', verified: true },
  { id: '11', packageId: 'flavors-of-italy', userName: 'Kevin', rating: 5, comment: 'The cooking class in Tuscany was the highlight of our trip. Absolutely delicious food and wine.', date: '2024-05-30T19:00:00Z', verified: true },
  { id: '12', packageId: 'vibrant-vietnam', userName: 'Laura', rating: 4, comment: 'Ha Long Bay is stunning, but the boat was a bit dated. Hoi An was my favorite part.', date: '2024-04-20T11:00:00Z', verified: true },
  { id: '13', packageId: 'serengeti-wildlife-safari', userName: 'Mike', rating: 4, comment: 'Great wildlife sightings, but the accommodation was more basic than expected for the price.', date: '2024-07-22T08:00:00Z', verified: true },
  { id: '14', packageId: 'machu-picchu-inca-trail', userName: 'Nora', rating: 5, comment: 'The altitude is no joke, but the guides were fantastic at managing the pace. Reaching the Sun Gate at sunrise was a moment I\'ll never forget.', date: '2024-08-05T07:15:00Z', verified: true },
  { id: '15', packageId: 'kyoto-cultural-expedition', userName: 'Oscar', rating: 5, comment: 'Walking through the Arashiyama Bamboo Grove felt like being in another world. Japan is amazing.', date: '2024-06-14T15:00:00Z', verified: false },
  { id: '16', packageId: 'greek-islands-hopping', userName: 'Penny', rating: 5, comment: 'The perfect romantic getaway. The catamaran cruise in Santorini was magical.', date: '2024-07-28T21:00:00Z', verified: true },
  { id: '17', packageId: 'canadian-rockies-adventure', userName: 'Quinn', rating: 5, comment: 'The Icefields Parkway is the most beautiful drive I have ever been on. Saw a grizzly bear (from a safe distance!).', date: '2024-08-18T17:00:00Z', verified: true },
  { id: '18', packageId: 'australian-outback-odyssey', userName: 'Rachel', rating: 4, comment: 'Uluru is awe-inspiring, but be prepared for the flies! The cultural tour was very insightful.', date: '2024-10-01T06:00:00Z', verified: true },
  { id: '19', packageId: 'egyptian-wonders', userName: 'Sam', rating: 5, comment: 'Standing in front of the Pyramids is a surreal experience. I felt like I was in a movie.', date: '2024-03-10T10:45:00Z', verified: true },
  { id: '20', packageId: 'flavors-of-italy', userName: 'Tina', rating: 5, comment: 'I ate my weight in pasta and have no regrets. Rome was chaotic but wonderful.', date: '2024-06-02T13:20:00Z', verified: true },
];

export const continents: Continent[] = [
    { name: 'Africa', image: 'https://picsum.photos/seed/africa/800/600', dataAiHint: 'savannah animal' },
    { name: 'Asia', image: 'https://picsum.photos/seed/asia/800/600', dataAiHint: 'temple asia' },
    { name: 'Europe', image: 'https://picsum.photos/seed/europe/800/600', dataAiHint: 'old city' },
    { name: 'North America', image: 'https://picsum.photos/seed/northamerica/800/600', dataAiHint: 'mountain lake' },
    { name: 'South America', image: 'https://picsum.photos/seed/southamerica/800/600', dataAiHint: 'inca ruins' },
    { name: 'Australia', image: 'https://picsum.photos/seed/australia/800/600', dataAiHint: 'outback desert' },
];

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
    return allPackages.filter(p => slugify(p.country) === countrySlug);
};

export const getReviewsByPackageId = (packageId: string): Review[] => {
    return reviews.filter(review => review.packageId === packageId);
}

export const getReviewsByCountry = async (countrySlug: string): Promise<Review[]> => {
    const countryPackages = await getPackagesByCountry(countrySlug);
    const packageIds = countryPackages.map(p => p.id);
    return reviews.filter(r => packageIds.includes(r.packageId));
};
