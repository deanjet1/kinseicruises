/**
 * Promotional content, destinations, and partner lines data.
 * Update this file to easily manage live promotional content.
 */

export interface Promotion {
  id: string;
  cruiseLine: string;
  badge: string;
  title: string;
  savings: string;
  highlights: string[];
  terms: string;
  actionText: string;
  featured: boolean;
  priority: number; // For ordering
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  startingPrice: string;
  duration: string;
  image: string;
  featured: boolean;
}

export const PARTNERS = [
  "Viking",
  "Seabourn",
  "Celebrity Cruises",
  "Princess Cruises",
  "Cunard Line",
  "Silversea",
  "Regent Seven Seas",
  "Oceania Cruises",
  "Azamara",
  "Royal Caribbean",
  "Norwegian Cruise Line",
  "Holland America Line",
  "MSC Cruises",
  "Carnival Cruise Line",
  "AmaWaterways",
  "Virgin Voyages"
];

export const DESTINATIONS: Destination[] = [
  {
    id: "mediterranean",
    name: "Mediterranean Fjord & Riviera",
    region: "Southern Europe",
    startingPrice: "$579",
    duration: "7 Nights",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663314711890/heJVAHE7qAVmpbSgEz97Jf/mediterranean_destination-Yx2HJZNKckHaqL9XoDPLri.webp",
    featured: true
  },
  {
    id: "caribbean",
    name: "Caribbean Sunsets & Cayes",
    region: "Tropical Islands",
    startingPrice: "$309",
    duration: "7 Nights",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663314711890/heJVAHE7qAVmpbSgEz97Jf/caribbean_destination-2xho6HaPuALrAge9W5JKB8.webp",
    featured: true
  },
  {
    id: "alaska",
    name: "Alaska Inside Passage",
    region: "Glaciers & Wildlife",
    startingPrice: "$608",
    duration: "7 Nights",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "scandinavia",
    name: "Scandinavia & Fjords",
    region: "Northern Europe",
    startingPrice: "$4,848",
    duration: "7 Nights",
    image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "river-cruises",
    name: "European River Cruises",
    region: "Historical Waterways",
    startingPrice: "$2,399",
    duration: "7 Nights",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
    featured: false
  }
];

export const PROMOTIONS: Promotion[] = [
  {
    id: "princess",
    cruiseLine: "PRINCESS CRUISES",
    badge: "Up to 40% OFF",
    title: "The Premier Sea Escape",
    savings: "+ Up to $400 Instant Savings + 3rd & 4th Guest FREE",
    highlights: [
      "Premier Upgrade: Unlimited Drinks, Wi-Fi, Crew Appreciation & Specialty Dining",
      "Military Appreciation: Up to $250 Onboard Credit",
      "Exclusive special rates for Solo Travelers"
    ],
    terms: "Select sailings & cabin categories. Subject to change.",
    actionText: "View Princess Sailings",
    featured: true,
    priority: 1
  },
  {
    id: "holland",
    cruiseLine: "HOLLAND AMERICA",
    badge: "Up to 30% OFF",
    title: "Signature Culinary Voyage",
    savings: "+ Up to $400 Onboard Credit + FREE Kids' Fares",
    highlights: [
      "Signature Beverage Package included",
      "Award-winning Specialty Dining & Shore Excursion credits",
      "Premium Wi-Fi package included"
    ],
    terms: "Select sailings & categories. Terms apply.",
    actionText: "View Holland America Sailings",
    featured: true,
    priority: 2
  },
  {
    id: "royal-caribbean",
    cruiseLine: "ROYAL CARIBBEAN",
    badge: "60% OFF 2nd Guest",
    title: "Ultimate Family Adventure",
    savings: "+ Kids Sail FREE + Exclusive Instant Savings",
    highlights: [
      "Complimentary Specialty Dining for two on select staterooms",
      "Exclusive Resident, Military, Police & Firefighter rates",
      "Access to industry-leading onboard activities and thrill parks"
    ],
    terms: "Select departures. Blackout dates apply.",
    actionText: "View Royal Caribbean Sailings",
    featured: true,
    priority: 3
  },
  {
    id: "celebrity",
    cruiseLine: "CELEBRITY CRUISES",
    badge: "Up to 75% OFF 2nd Guest",
    title: "Modern Luxury Reimagined",
    savings: "+ Free Classic Beverage Package + Basic Wi-Fi",
    highlights: [
      "Back-to-Back Cruise Savings: Save up to $200 additional",
      "THE RETREAT: All-Suite, All-Exclusive luxury enclave access",
      "Michelin-starred culinary experiences onboard"
    ],
    terms: "Applicable on non-refundable deposit rates.",
    actionText: "View Celebrity Sailings",
    featured: false,
    priority: 4
  },
  {
    id: "ncl",
    cruiseLine: "NORWEGIAN CRUISE LINE",
    badge: "50% OFF All Cruises",
    title: "Free at Sea Expedition",
    savings: "+ FREE Beverage, Wi-Fi, Excursions & Specialty Dining",
    highlights: [
      "Buy-One-Get-One (BOGO) Airfare deals",
      "50% Reduced Deposits to lock in your suite early",
      "No schedules, no dress codes—absolute freedom at sea"
    ],
    terms: "New bookings only. Offer subject to capacity controls.",
    actionText: "View Norwegian Sailings",
    featured: false,
    priority: 5
  }
];
