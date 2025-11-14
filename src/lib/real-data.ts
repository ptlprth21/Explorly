
import type { Package } from '@/types';

// This file contains the real, bookable packages for your live site.
export const realPackagesData: Omit<Package, 'id' | 'aiReasoning'>[] = [
  {
    title: 'Desert Calm: 4 Days of Culture & Escape in Abu Dhabi',
    destination: 'Abu Dhabi',
    tagline: 'Where golden sands meet timeless stories.',
    country: 'UAE',
    continent: 'Asia',
    duration: '4',
    price: 649,
    image: '',
    gallery: [''],
    rating: 4.8,
    reviewCount: 175,
    theme: 'cultural',
    difficulty: 'Easy',
    highlights: [
      'Spiritual Wonders: A guided visit to the colossal Sheikh Zayed Grand Mosque.',
      'Global Art & Culture: Explore masterpieces under the iconic dome of the Louvre Abu Dhabi.',
      'Sacred Serenity: A tranquil visit to the newly opened, intricately designed BAPS Hindu Mandir.',
      'Arabian Adventure: An exciting Evening Desert Safari featuring 4x4 dune bashing and a traditional BBQ dinner under the stars.',
      'Eco-Escape: A peaceful kayaking tour through the Jubail Mangrove Park.',
      'Luxury & Comfort: Stay in your choice of a top-rated 4-star or 5-star hotel.'
    ],
    description: 'Discover the captivating capital of the UAE with our curated 4-day escape. This package is meticulously designed to immerse you in Abu Dhabi’s rich cultural tapestry, from the awe-inspiring architecture of its sacred sites to the quiet beauty of its desert and natural reserves. Experience the city\'s highlights, including the magnificent Sheikh Zayed Grand Mosque and the contemporary wonder of the Louvre Abu Dhabi. Enjoy seamless logistics with private transfers on Day 1, Day 2, and Day 4, alongside a thrilling shared desert safari experience on Day 3. Perfect for culture seekers and luxury travelers looking for a balanced, hassle-free introduction to Abu Dhabi.',
    itinerary: [
      { day: 1, title: 'Arrival', description: 'Private pickup from Abu Dhabi International Airport (AUH) to the hotel.' },
      { day: 2, title: 'Spiritual Icons & Cultural Treasures', description: 'Morning pickup from the hotel for a guided visit to Sheikh Zayed Grand Mosque, followed by BAPS Hindu Mandir and Louvre Abu Dhabi. Return transfer to the hotel in the afternoon.' },
      { day: 3, title: 'Desert Adventure', description: 'Free morning. Afternoon pickup from the hotel for an Evening Desert Safari with dune bashing and BBQ dinner. Late evening return transfer to the hotel. *Shared*' },
      { day: 4, title: 'Nature & Farewell', description: 'Morning pickup from the hotel for a kayaking tour at Jubail Mangrove Park. Following the activity, a final private transfer from the hotel to AUH for departure.' }
    ],
    inclusions: [
      '3 nights in your chosen 4-Star or 5-Star hotel (booking managed by THEVIPGROUP)',
      'Daily breakfast at the hotel. BBQ Dinner during the desert safari.',
      'Private airport transfers (Arrival AUH & Departure AUH). Private transfers for Day 2 and Day 4 activities. Shared 4x4 air-conditioned vehicle for the Desert Safari (Day 3).',
      'Guided visit to Sheikh Zayed Grand Mosque. Entry to Louvre Abu Dhabi. Visit to BAPS Hindu Mandir. Kayaking tour at Jubail Mangrove Park. Evening Desert Safari with dune bashing, henna, sandboarding, and cultural shows.',
      'English-speaking guide for key cultural tours (Day 2).'
    ],
    exclusions: [
      'Airfare: International or domestic flights to/from Abu Dhabi (AUH).',
      'Meals: Lunch and dinner (except the desert safari BBQ).',
      'Personal Expenses: Tips, souvenirs, minibar, optional activities.',
      'Insurance: Travel or medical insurance (highly recommended).',
      'Visa Fees (If applicable).'
    ],
    availableDates: ['2025-11-10', '2025-12-05', '2026-01-20', '2026-02-15'],
    reviews: []
  },
  {
    title: 'Abu Dhabi Essentials',
    destination: 'Abu Dhabi & Dubai',
    tagline: 'Culture, comfort, and discovery—designed for value-conscious explorers.',
    country: 'UAE',
    continent: 'Asia',
    duration: '4',
    price: 449,
    image: '',
    gallery: [''],
    rating: 4.9,
    reviewCount: 210,
    theme: 'city',
    difficulty: 'Moderate',
    highlights: [
      'Architectural Marvel: Visit the magnificent Sheikh Zayed Grand Mosque.',
      'Global Art: Entry to the modern architectural wonder, the Louvre Abu Dhabi.',
      'New Heritage: A serene visit to the stunning BAPS Hindu Mandir (Temple).',
      'Desert Thrill: Experience an exciting Evening Desert Safari with 4x4 dune bashing and a traditional BBQ dinner.',
      'Value & Comfort: 3 nights in a great-value, well-located 4-Star Hotel.'
    ],
    description: 'Experience the must-see cultural and adventurous facets of Abu Dhabi without the premium price tag. This 4-day package is crafted for value-conscious travelers who want to cover all the city\'s essential highlights, from sacred mosques and world-class art museums to the thrills of the Arabian desert. You will enjoy comfortable 4-star accommodation (booked by us) and a smooth itinerary featuring private transfers for arrival, cultural day, and departure, alongside a popular shared desert safari. It\'s the perfect balance of organized sightseeing and personal free time to explore the city at your pace.',
    itinerary: [
      { day: 1, title: 'Arrival in Abu Dhabi', description: 'Private pickup from Abu Dhabi International Airport (AUH) to the hotel. Check-in and rest.' },
      { day: 2, title: 'Cultural Treasures', description: 'Pickup from hotel. Visit: Sheikh Zayed Grand Mosque, AUH city sightseeing, Louvre Museum, BAPS Temple. Afternoon return to hotel.' },
      { day: 3, title: 'Desert Adventure', description: 'Free morning. Afternoon pickup between 2:30–3:00 PM for shared Desert Safari with dune bashing, sandboarding & BBQ dinner. Late return to hotel.' },
      { day: 4, title: 'Departure', description: 'Checkout and return transfer to airport (if included) or continuation of trip.' }
    ],
    inclusions: [
      '3 nights in a 4-Star hotel (booking managed by THEVIPGROUP).',
      'Daily breakfast at the hotel. BBQ Dinner during the desert safari.',
      'Private airport transfers (Arrival AUH & Departure AUH). Private transfers for the full Cultural Day (Day 2). Shared 4x4 air-conditioned vehicle for the Desert Safari (Day 3).',
      'Entry to Sheikh Zayed Grand Mosque. Entry to Louvre Abu Dhabi. Visit to BAPS Hindu Mandir. Evening Desert Safari (includes dune bashing, henna, sandboarding, cultural shows).'
    ],
    exclusions: [
      'Airfare: International or domestic flights to/from Abu Dhabi (AUH).',
      'Meals: Lunch and dinner (except the desert safari BBQ).',
      'Personal Expenses: Tips, souvenirs, minibar, optional activities.',
      'Insurance: Travel or medical insurance (highly recommended).',
      'Visa Fees (If applicable).'
    ],
    availableDates: ['2025-10-15', '2025-11-22', '2025-12-10', '2026-01-25', '2026-02-20'],
    reviews: []
  },
  {
    title: 'Sands & Skylines: 7 Days Across Abu Dhabi & Dubai (Option 1)',
    destination: 'Abu Dhabi & Dubai',
    tagline: 'From sacred sands to shimmering towers, experience the UAE in one epic journey.',
    country: 'UAE',
    continent: 'Asia',
    duration: '7',
    price: 849,
    image: '',
    gallery: [''],
    rating: 4.9,
    reviewCount: 210,
    theme: 'city',
    difficulty: 'Easy',
    highlights: [
      'Ultimate Culture: Visits to the Sheikh Zayed Grand Mosque, Louvre Abu Dhabi, and BAPS Hindu Mandir in Abu Dhabi.',
      'Desert Adventure: A thrilling Evening Desert Safari with 4x4 dune bashing and a BBQ dinner in Abu Dhabi.',
      'Skyline Conqueror: Entry to the iconic Burj Khalifa (Dubai Icons Day).',
      'Historical Charm: An engaging walking tour of Old Dubai, including the Al Fahidi District and an Abra ride across Dubai Creek.',
      'Seamless Travel: All private airport and intercity transfers between Abu Dhabi and Dubai are included.',
      'Flexibility: A Choice Day in Dubai to select a waterpark, theme park, or an optional second desert safari.'
    ],
    description: 'Sands & Skylines offers the ultimate 7-day immersion into the heart of the United Arab Emirates. This package expertly balances the cultural richness and stunning architecture of Abu Dhabi with the modern energy and iconic landmarks of Dubai. Spend three days exploring Abu Dhabi’s spiritual sites, art, and desert, followed by three days conquering the high-rises and historical souks of Dubai. You\'ll enjoy comfort and convenience with private airport and intercity transfers, and all key activities included. This is the perfect itinerary for travelers seeking to check off the must-see highlights of both world-class cities in a single, well-organized trip.',
    itinerary: [
      { day: 1, title: 'Arrival & Coastal Welcome in Abu Dhabi', description: 'Private pickup from Abu Dhabi International Airport (AUH) to the hotel.' },
      { day: 2, title: 'Abu Dhabi: Culture, Art & Sacred Sites', description: 'Morning pickup from the hotel for visits to Sheikh Zayed Grand Mosque, BAPS Hindu Mandir, and Louvre Abu Dhabi. Return transfer to the hotel.' },
      { day: 3, title: 'Abu Dhabi: Desert Adventure', description: 'Afternoon pickup from the hotel for a Desert Safari. Late evening return transfer to the hotel.*Shared*' },
      { day: 4, title: 'Transfer to Dubai', description: 'Morning private transfer from the Abu Dhabi hotel to the Dubai hotel.' },
      { day: 5, title: 'Dubai Icons', description: 'Morning pickup from the hotel for a visit to Burj Khalifa and Dubai Mall. Return transfer to the hotel.' },
      { day: 6, title: 'Choice Day', description: 'Transport required for the chosen activity (Desert Safari if applicable, or transfers to a waterpark/theme park). Standard Desert Safari with BBQ dinner - SIC' },
      { day: 7, title: 'Departure (DXB)', description: 'Morning pickup from the hotel for a cultural tour of Old Dubai (Al Fahidi, abra ride, souks), followed by a final private transfer to Dubai International Airport (DXB) for departure. Old Dubai City Tour - SIC' }
    ],
    inclusions: [
      '6 nights in your chosen 4-Star or 5-Star hotel tier (3 in AUH, 3 in DXB). (Booking managed by THEVIPGROUP).',
      'Daily breakfast at the hotel. BBQ Dinner during the desert safari (Day 3).',
      'Private airport transfers (Arrival AUH & Departure DXB). Private transfer between Abu Dhabi and Dubai (Day 4). Shared (SIC) transport for all scheduled tours (Dubai Icons, Old Dubai Tour, and Desert Safaris).',
      'Entry/Visit to: Sheikh Zayed Grand Mosque, BAPS Hindu Mandir, Louvre Abu Dhabi, Desert Safari (Day 3, shared), Burj Khalifa (Burj Khalifa ticket is for non-prime hours), Old Dubai City Tour (walking tour, Abra ride, souks).',
      'English-speaking guide for the Old Dubai City Tour.'
    ],
    exclusions: [
      'Airfare: International or domestic flights to/from the UAE.',
      'Meals: Lunch and dinner (except the desert safari BBQ).',
      'Optional Activities: Entrance fees or transfers for the Day 6 \'Choice Day\' waterpark/theme park option.',
      'Personal Expenses: Tips, souvenirs, minibar, spa treatments.',
      'Insurance: Travel or medical insurance (highly recommended).',
      'Visa Fees (If applicable).'
    ],
    availableDates: ['2025-10-15', '2025-11-22', '2025-12-10', '2026-01-25', '2026-02-20'],
    reviews: []
  },
  {
    title: 'Sands & Skylines: 7 Days Across Abu Dhabi & Dubai (Option 2)',
    destination: 'Abu Dhabi & Dubai',
    tagline: 'Experience the best of the UAE, from sacred sands to world-class water adventures.',
    country: 'UAE',
    continent: 'Asia',
    duration: '7',
    price: 899,
    image: '',
    gallery: [''],
    rating: 4.8,
    reviewCount: 260,
    theme: 'city',
    difficulty: 'Easy',
    highlights: [
      'Sheikh Zayed Grand Mosque',
      'Louvre Museum Abu Dhabi',
      'Desert Safari with BBQ',
      'Burj Khalifa & Dubai Mall',
      'Old Dubai & Abra Ride'
    ],
    description: 'Discover the best of Abu Dhabi and Dubai with this 7-day tour including iconic landmarks, cultural experiences, desert adventure, and premium hotel stays.',
    itinerary: [
      { day: 1, title: 'Arrival in Abu Dhabi', description: 'Private pickup from AUH airport and check-in at hotel.' },
      { day: 2, title: 'Abu Dhabi Culture Tour', description: 'Full-day tour including Grand Mosque, Louvre Museum, BAPS Temple, and city sightseeing with return transfer.' },
      { day: 3, title: 'Abu Dhabi Desert Safari', description: 'Desert Safari with dune bashing, BBQ dinner and entertainment. Shared return transfers.' },
      { day: 4, title: 'Transfer to Dubai', description: 'Private morning transfer from Abu Dhabi hotel to the Dubai hotel.' },
      { day: 5, title: 'Dubai Icons Tour', description: 'Shared transfers for Burj Khalifa and Dubai Mall with free time for shopping.' },
      { day: 6, title: 'Optional Adventure Day', description: 'Includes Atlantis Aquaventure Waterpark ticket + private transfers (or alternate activity as selected).' },
      { day: 7, title: 'Old Dubai & Departure', description: 'Cultural city tour including Al Fahidi, abra ride and souks. Private airport transfer to DXB.' }
    ],
    inclusions: [
      '6 nights hotel accommodation in 4 or 5-star hotels',
      'Private airport transfers (AUH arrival, DXB departure)',
      'Private Abu Dhabi to Dubai transfer',
      'Shared Abu Dhabi Culture Tour',
      'Shared Dubai Icons Tour (Burj Khalifa + Dubai Mall)',
      'Desert Safari with BBQ dinner',
      'Atlantis Aquaventure Waterpark entry + private transfers (or chosen equivalent)',
      'Old Dubai city tour + abra ride',
      'Support team available 24/7'
    ],
    exclusions: [
      'Flights to/from UAE',
      'Meals not specified',
      'Personal expenses',
      'Travel insurance',
      'Visa fees (if required)'
    ],
    availableDates: ['2025-09-15', '2025-10-20', '2025-12-10', '2026-01-25'],
    reviews: []
  },
  {
    title: "UAE Highlights Getaway",
    destination: "Abu Dhabi & Dubai",
    tagline: 'The best of both cities for the value-conscious traveler.',
    country: "UAE",
    continent: "Asia",
    duration: "7",
    price: 949,
    image: "",
    gallery: [""],
    rating: 4.9,
    reviewCount: 210,
    theme: "city",
    difficulty: "Moderate",
    highlights: [
      "Sheikh Zayed Grand Mosque",
      "Louvre Abu Dhabi",
      "BAPS Hindu Mandir",
      "Desert Safari",
      "Dubai Marina",
      "Burj Khalifa",
      "Dubai Mall & Fountain Show"
    ],
    description: "A 7-day journey through the UAE's most iconic landmarks — from the cultural heart of Abu Dhabi to the dazzling modern wonders of Dubai.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Abu Dhabi",
        description: "Private pickup from Abu Dhabi International Airport (AUH) and transfer to hotel."
      },
      {
        day: 2,
        title: "Cultural Exploration in Abu Dhabi",
        description: "Visit Sheikh Zayed Grand Mosque, BAPS Hindu Mandir, and Louvre Abu Dhabi. Includes city photostops and private transportation."
      },
      {
        day: 3,
        title: "Abu Dhabi Desert Safari",
        description: "Afternoon desert safari with dune bashing, sandboarding, BBQ dinner & return transfer. *Shared* activity."
      },
      {
        day: 4,
        title: "Dubai Arrival",
        description: "Private transfer to Dubai. Free evening to explore Dubai Marina or JBR."
      },
      {
        day: 5,
        title: "Dubai Landmarks",
        description: "Visit Burj Khalifa observation deck, explore Dubai Mall and enjoy the Fountain Show."
      },
      {
        day: 6,
        title: "Free Day / Optional Mega Attractions",
        description: "Choose between Aquaventure Waterpark, IMG Worlds of Adventure, or another desert experience."
      },
      {
        day: 7,
        title: "Cultural Souks & Departure",
        description: "Explore Old Dubai: Al Fahidi District, abra ride on Dubai Creek, Gold & Spice Souks. Transfer to DXB Airport."
      }
    ],
    inclusions: [
      "6 nights hotel stay (3 in Abu Dhabi, 3 in Dubai) - 4★ category",
      "Daily breakfast",
      "Private airport transfers (AUH arrival, DXB departure)",
      "Private intercity transfer from Abu Dhabi to Dubai",
      "All scheduled transportation to attractions",
      "Entrance fees to key attractions including Sheikh Zayed Grand Mosque & Louvre Abu Dhabi",
      "Desert Safari with dinner",
      "English-speaking guide",
      "24/7 travel support team"
    ],
    exclusions: [
      "Flights to/from UAE",
      "Lunches & Dinners (except desert safari)",
      "Personal expenses (souvenirs, tips, etc.)",
      "Optional attractions not mentioned",
      "Visa fees and travel insurance"
    ],
    availableDates: [
      "2025-10-15",
      "2025-11-22",
      "2025-12-10",
      "2026-01-25",
      "2026-02-20"
    ],
    reviews: []
  },
  {
    "title": "Sky Above, Sands Below (Option 1)",
    "destination": "Dubai & Abu Dhabi",
    "tagline": "Conquer the UAE's skies, seas, and sands in five days of high-octane luxury.",
    "country": "UAE",
    "continent": "Asia",
    "duration": "5",
    "price": 1799,
    "image": "",
    "gallery": [""],
    "rating": 4.9,
    "reviewCount": 210,
    "theme": "city",
    "difficulty": "Moderate",
    "highlights": [
      "Skydive The Palm",
      "Platinum Heritage Desert Safari",
      "Private Sunset Yacht Cruise",
      "Sheikh Zayed Grand Mosque",
      "Louvre Abu Dhabi",
      "CLYMB Abu Dhabi"
    ],
    "description": "An elite luxury adventure where adrenaline meets elegance — jump over the iconic Palm Jumeirah, explore the desert in ultimate style, and dine on a private yacht at sunset.",
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Dubai",
        "description": "Private pickup from Dubai International Airport (DXB) and check-in at your 5★ hotel."
      },
      {
        "day": 2,
        "title": "Sky High Experience",
        "description": "Transfer to Skydive The Palm for a tandem jump experience over Dubai’s most spectacular skyline. Return transfer to hotel."
      },
      {
        "day": 3,
        "title": "Luxury Desert Safari + Yacht Dinner",
        "description": "Afternoon Platinum Heritage Desert Safari with 4-course dinner, camel ride & falcon show. Later, private transfer for a sunset yacht dinner cruise. Night return to hotel."
      },
      {
        "day": 4,
        "title": "Abu Dhabi Icons",
        "description": "Private morning transfer from Dubai to Abu Dhabi. Visits to Louvre Abu Dhabi, Sheikh Zayed Grand Mosque & CLYMB Abu Dhabi. Final transfer to hotel in Abu Dhabi."
      },
      {
        "day": 5,
        "title": "Departure",
        "description": "Private transfer to Abu Dhabi International Airport (AUH) for departure flight."
      }
    ],
    "inclusions": [
      "4 nights in 5★ hotels (2 nights Dubai, 2 nights Abu Dhabi)",
      "Daily breakfast",
      "Tandem skydiving experience at The Palm",
      "Platinum Heritage Luxury Desert Safari",
      "Private Yacht Sunset Dinner Cruise",
      "Private transportation between cities and attractions",
      "Entry tickets to Louvre Abu Dhabi, Sheikh Zayed Grand Mosque and CLYMB Abu Dhabi",
      "English-speaking support team",
      "24/7 on-trip assistance"
    ],
    "exclusions": [
      "Flights to/from UAE",
      "Lunches and dinners (except included experiences)",
      "Personal expenses and tips",
      "Optional activities not mentioned",
      "Visa fees and travel insurance"
    ],
    "availableDates": [
      "2025-10-08",
      "2025-11-18",
      "2025-12-05",
      "2026-01-14",
      "2026-03-02"
    ],
    "reviews": []
  },
  {
    title: 'Sky Above, Sands Below (Option 2)',
    destination: 'Dubai & Abu Dhabi',
    tagline: 'Luxury adventures, from a private sunset cruise to the heights of the Arabian sky.',
    country: 'UAE',
    continent: 'Asia',
    duration: '5',
    price: 1749,
    image: '',
    gallery: [''],
    rating: 4.9,
    reviewCount: 215,
    theme: 'city',
    difficulty: 'Moderate',
    highlights: [
      'Skydiving at The Palm',
      'Platinum Luxury Desert Safari',
      'Private Yacht Sunset Dinner Cruise',
      'Sheikh Zayed Grand Mosque',
      'Louvre Abu Dhabi',
      'CLYMB Abu Dhabi'
    ],
    description: 'Thrill in Dubai skies, glide across golden dunes, and explore Abu Dhabi’s top icons — a luxury-filled adventure from start to finish.',
    itinerary: [
      { day: 1, title: 'Arrival (DXB)', description: 'Private pickup from Dubai International Airport (DXB) to the hotel and free time.' },
      { day: 2, title: 'Sky High', description: 'Morning transfer for Tandem Skydive – Skydive At The Palm. Return transfer to the hotel.' },
      { day: 3, title: 'Desert & Yacht Luxury', description: 'Afternoon Platinum Luxury Desert Safari. Evening Private Yacht Sunset Dinner Cruise. Final return transfer to the hotel.' },
      { day: 4, title: 'Abu Dhabi Icons', description: 'Private transfer from Dubai to Abu Dhabi. Visits to Louvre Abu Dhabi, Sheikh Zayed Grand Mosque, and CLYMB Abu Dhabi. Return transfer to the hotel.' },
      { day: 5, title: 'Farewell', description: 'Free time and departure transfer from Abu Dhabi hotel.' }
    ],
    inclusions: [
      '4 nights hotel accommodation (5★: 2 in Dubai, 2 in Abu Dhabi)',
      'Daily breakfast',
      'Private airport transfers',
      'All scheduled transfers to activities',
      'Tandem Skydive – Skydive At The Palm',
      'Platinum Luxury Desert Safari with full experience inclusions',
      'Private Yacht Sunset Dinner Cruise (2 hours, BBQ snacks, water & soft drinks)',
      'Entry to Louvre Abu Dhabi, Sheikh Zayed Grand Mosque & CLYMB Abu Dhabi',
      '24/7 on-trip support'
    ],
    exclusions: [
      'Flights to/from UAE',
      'Travel insurance',
      'Meals other than breakfast and activity inclusions',
      'Personal expenses',
      'Visa fees (if applicable)'
    ],
    availableDates: ['2025-10-05', '2025-11-18', '2025-12-08', '2026-01-22'],
    reviews: []
  },
  {
    title: 'Coast to Culture',
    destination: 'Abu Dhabi & Dubai',
    tagline: "Beach, sea, and sacred architecture—an exclusive tour of the UAE's finest.",
    country: 'UAE',
    continent: 'Asia',
    duration: '6',
    price: 1299,
    image: '',
    gallery: [''],
    rating: 4.8,
    reviewCount: 190,
    theme: 'city',
    difficulty: 'Easy',
    highlights: [
      'Sheikh Zayed Grand Mosque',
      'Louvre Abu Dhabi',
      'BAPS Hindu Mandir',
      'Jubail Mangrove Park Kayaking',
      'Zaya Nurai Island',
      'Helicopter Tour Dubai',
      'Burj Khalifa & Downtown Dubai'
    ],
    description: 'Experience the perfect mix of stunning coastline, cultural wonders, and luxury adventures from Abu Dhabi to Dubai.',
    itinerary: [
      { day: 1, title: 'Arrival (AUH)', description: 'Private pickup from Abu Dhabi International Airport (AUH) to the hotel.' },
      { day: 2, title: 'Culture & Sacred Spaces', description: 'Visits to Sheikh Zayed Grand Mosque, BAPS Hindu Mandir, and Louvre Abu Dhabi. Return transfer to the hotel.' },
      { day: 3, title: 'Mangroves & Marina Transfer', description: 'Kayaking at Jubail Mangrove Park followed by private transfer from Abu Dhabi to Dubai hotel.' },
      { day: 4, title: 'Private Island Escape', description: 'Morning transfer for a day visit to Zaya Nurai Island. Return to the hotel.' },
      { day: 5, title: 'Helicopter Tour & Downtown', description: 'Morning helicopter tour followed by afternoon Burj Khalifa & Dubai Mall visit. Return transfer to hotel.' },
      { day: 6, title: 'Farewell', description: 'Free time and departure transfer from Dubai hotel.' }
    ],
    inclusions: [
      '5 nights hotel accommodation (5★: 3 in Abu Dhabi, 2 in Dubai)',
      'Daily breakfast',
      'Private airport transfers',
      'All scheduled transfers to activities',
      'Entry to Sheikh Zayed Grand Mosque, BAPS Hindu Mandir, and Louvre Abu Dhabi',
      'Kayaking at Jubail Mangrove Park',
      'Zaya Nurai Island visit with transfers',
      'Dubai Helicopter Tour + Burj Khalifa entry',
      '24/7 on-trip support'
    ],
    exclusions: [
      'Flights to/from UAE',
      'Travel insurance',
      'Meals other than breakfast',
      'Personal expenses',
      'Optional activities',
      'Visa fees (if applicable)'
    ],
    availableDates: ['2025-10-12', '2025-11-25', '2025-12-09', '2026-02-18'],
    reviews: []
  },
  {
    title: 'Luxury in the Air & Sea',
    destination: 'Dubai',
    tagline: 'Experience Dubai by sky, sea, and skyline in an exclusive short break.',
    country: 'UAE',
    continent: 'Asia',
    duration: '4',
    price: 1249,
    image: '',
    gallery: [''],
    rating: 4.9,
    reviewCount: 220,
    theme: 'city',
    difficulty: 'Easy',
    highlights: [
      'Helicopter Tour Dubai',
      'Private Yacht Tour',
      'Museum of the Future',
      'Dinner in the Sky'
    ],
    description: 'Experience Dubai from above and at sea with the perfect blend of luxury, iconic views, and exclusive experiences.',
    itinerary: [
      { day: 1, title: 'Arrival (DXB)', description: 'Private pickup from Dubai International Airport (DXB) to the hotel.' },
      { day: 2, title: 'Helicopter & Yacht Day', description: 'Helicopter ride above Palm Jumeirah in the morning, Private Yacht Tour in the afternoon. Return transfers included.' },
      { day: 3, title: 'Sky Dining & Futuristic Wonders', description: 'Visit to the Museum of the Future in the morning. Evening Dinner in the Sky experience. All transfers included.' },
      { day: 4, title: 'Farewell', description: 'Private transfer from the hotel to DXB for departure.' }
    ],
    inclusions: [
      '3 nights luxury hotel accommodation in Dubai',
      'Daily breakfast',
      'Private airport transfers',
      'Helicopter Ride (17 min - Palm Tour)',
      'Private Yacht Tour',
      'Museum of the Future entry',
      'Dinner in the Sky experience',
      'All scheduled transfers',
      '24/7 on-trip support'
    ],
    exclusions: [
      'Flights to/from UAE',
      'Travel insurance',
      'Meals other than breakfast and Dinner in the Sky',
      'Personal expenses',
      'Optional activities',
      'Visa fees (if applicable)'
    ],
    availableDates: ['2025-10-20', '2025-11-18', '2025-12-12', '2026-01-22'],
    reviews: []
  },
  {
    title: 'Golden Dunes & Sunrise Skies',
    destination: 'Abu Dhabi & Dubai Desert',
    tagline: 'A journey blending serene desert luxury with coastal tranquility.',
    country: 'UAE',
    continent: 'Asia',
    duration: '5',
    price: 1099,
    image: '',
    gallery: [''],
    rating: 4.9,
    reviewCount: 160,
    theme: 'city',
    difficulty: 'Moderate',
    highlights: ['Luxury Desert Resort Stay', 'Hot Air Balloon Flight', 'Camel Trekking', 'Wildlife Tour'],
    description: 'Sleep under the desert stars and rise above the golden dunes with a breathtaking hot air balloon ride. A perfect blend of luxury and adventure.',
    itinerary: [
      { day: 1, title: 'Arrival to Desert Retreat', description: 'Private pickup from Dubai (DXB) and check-in at a luxury desert resort.' },
      { day: 2, title: 'Sunrise Hot Air Balloon', description: 'Early morning Hot Air Balloon flight including international buffet breakfast, falconry demonstration, camel ride, and flight certificate. Return to the resort.' },
      { day: 3, title: 'Wildlife Discovery & Coastal Escape', description: 'Guided wildlife tour and camel trekking in the morning. Afternoon private transfer to an Abu Dhabi beachfront hotel.' },
      { day: 4, title: 'Beach Day & Optional Tours', description: 'Free day to enjoy the beach, relax, or add optional activities like Louvre Abu Dhabi or Yas Island attractions.' },
      { day: 5, title: 'Departure', description: 'Private transfer to the airport for departure.' }
    ],
    inclusions: [
      '4 nights accommodation (2 luxury desert resort + 2 Abu Dhabi beachfront hotel)',
      'Daily breakfast included',
      'Private airport and inter-hotel transfers',
      'Hot Air Balloon flight with breakfast',
      'Falconry show and camel ride experience',
      'Wildlife tour',
      'All scheduled transfers',
      '24/7 support during the trip'
    ],
    exclusions: [
      'Flights to/from UAE',
      'Meals not mentioned above',
      'Travel insurance',
      'Personal expenses',
      'Optional tours and activities',
      'Visa fees (if applicable)'
    ],
    availableDates: ['2025-10-12', '2025-11-20', '2025-12-18', '2026-02-10'],
    reviews: []
  },
  {
    title: 'Dubai Explorer',
    destination: 'Dubai',
    tagline: 'Balanced fun, modern city life, and a taste of authentic Dubai.',
    country: 'UAE',
    continent: 'Asia',
    duration: '5',
    price: 699,
    image: '',
    gallery: [''],
    rating: 4.8,
    reviewCount: 250,
    theme: 'city',
    difficulty: 'Easy',
    highlights: ['Burj Khalifa Visit', 'Desert Safari BBQ', 'Dubai Mall Experience'],
    description: 'Explore Dubai’s most iconic attractions and enjoy an authentic Desert Safari with BBQ dinner. Designed for travelers seeking comfort, convenience, and unforgettable experiences.',
    itinerary: [
      { day: 1, title: 'Arrival in Dubai', description: 'Private pickup from DXB airport and check-in at 4-star hotel.' },
      { day: 2, title: 'Dubai City Icons', description: 'Guided morning visit to Burj Khalifa and Dubai Mall with shared transfers.' },
      { day: 3, title: 'Desert Safari Adventure', description: 'Free morning. Afternoon Desert Safari with dune bashing, BBQ dinner, entertainment, and return transfers (shared).' },
      { day: 4, title: 'Free Day / Optional Tours', description: 'Relax at the hotel or choose optional tours such as Marina Cruise, Abu Dhabi Day Trip, or Dubai Frame ticket.' },
      { day: 5, title: 'Departure', description: 'Private transfer to the airport for your flight home.' }
    ],
    inclusions: [
      '4 nights hotel accommodation in a 4-star hotel in Dubai',
      'Private airport pickup & drop-off (DXB)',
      'Shared guided Burj Khalifa + Dubai Mall visit',
      'Desert Safari with BBQ dinner',
      'Dune bashing, sandboarding, henna, belly dance show',
      'Water & limited soft drinks during safari',
      '24/7 support during the trip'
    ],
    exclusions: [
      'Flights to/from UAE',
      'Meals not mentioned above',
      'Travel insurance',
      'Personal expenses',
      'Optional activities and attraction tickets',
      'Visa fees (if applicable)'
    ],
    availableDates: ['2025-10-05', '2025-11-15', '2025-12-20', '2026-01-18'],
    reviews: []
  }
];
