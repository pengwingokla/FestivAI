export interface Festival {
  id: string;
  name: string;
  location: string;
  flag: string;
  date: string;
  description: string;
  highlights: string[];
}

export const festivals: Record<string, Festival[]> = {
  march: [
    {
      id: "holi-india",
      name: "Holi Festival",
      location: "India",
      flag: "🇮🇳",
      date: "March 13-14, 2025",
      description: "The vibrant Festival of Colors celebrating the arrival of spring with colorful powders, music, and joy.",
      highlights: ["Color Throwing", "Street Food", "Music & Dance"]
    },
    {
      id: "cherry-blossom-japan",
      name: "Cherry Blossom Festival",
      location: "Japan",
      flag: "🇯🇵",
      date: "March 20 - April 10, 2025",
      description: "Hanami season where millions celebrate the blooming of cherry blossoms with picnics and festivities.",
      highlights: ["Hanami Parties", "Traditional Music", "Photography"]
    },
    {
      id: "st-patricks-ireland",
      name: "St. Patrick's Day",
      location: "Ireland",
      flag: "🇮🇪",
      date: "March 17, 2025",
      description: "Ireland's national day celebrated with parades, traditional music, and the wearing of green.",
      highlights: ["Parades", "Traditional Music", "Cultural Pride"]
    }
  ],
  april: [
    {
      id: "songkran-thailand",
      name: "Songkran Water Festival",
      location: "Thailand",
      flag: "🇹🇭",
      date: "April 13-15, 2025",
      description: "Thai New Year celebration with massive water fights, temple visits, and traditional ceremonies.",
      highlights: ["Water Fights", "Temple Visits", "Traditional Dance"]
    },
    {
      id: "easter-greece",
      name: "Greek Orthodox Easter",
      location: "Greece",
      flag: "🇬🇷",
      date: "April 20, 2025",
      description: "Spectacular celebration with midnight services, fireworks, and traditional feasts.",
      highlights: ["Midnight Services", "Fireworks", "Traditional Feasts"]
    }
  ],
  may: [
    {
      id: "cinco-de-mayo-mexico",
      name: "Cinco de Mayo",
      location: "Mexico",
      flag: "🇲🇽",
      date: "May 5, 2025",
      description: "Celebration of Mexican heritage with music, dancing, and traditional cuisine.",
      highlights: ["Mariachi Music", "Traditional Dance", "Mexican Cuisine"]
    },
    {
      id: "vesak-sri-lanka",
      name: "Vesak Festival",
      location: "Sri Lanka",
      flag: "🇱🇰",
      date: "May 12, 2025",
      description: "Buddhist celebration of Buddha's birth, enlightenment, and death with colorful lanterns.",
      highlights: ["Lantern Displays", "Buddhist Ceremonies", "Cultural Shows"]
    }
  ],
  june: [
    {
      id: "midsummer-sweden",
      name: "Midsummer Festival",
      location: "Sweden",
      flag: "🇸🇪",
      date: "June 21, 2025",
      description: "Traditional celebration of the summer solstice with dancing around maypoles and flower crowns.",
      highlights: ["Maypole Dancing", "Flower Crowns", "Traditional Food"]
    },
    {
      id: "dragon-boat-china",
      name: "Dragon Boat Festival",
      location: "China",
      flag: "🇨🇳",
      date: "June 14, 2025",
      description: "Ancient festival featuring dragon boat races and traditional zongzi rice dumplings.",
      highlights: ["Dragon Boat Races", "Traditional Food", "Cultural Heritage"]
    }
  ],
  july: [
    {
      id: "bastille-day-france",
      name: "Bastille Day",
      location: "France",
      flag: "🇫🇷",
      date: "July 14, 2025",
      description: "French national day with military parades, fireworks, and celebrations of liberty.",
      highlights: ["Military Parades", "Fireworks", "Cultural Pride"]
    },
    {
      id: "san-fermin-spain",
      name: "San Fermín (Running of Bulls)",
      location: "Spain",
      flag: "🇪🇸",
      date: "July 6-14, 2025",
      description: "Famous festival in Pamplona featuring the running of bulls and week-long celebrations.",
      highlights: ["Running of Bulls", "Street Parties", "Traditional Music"]
    }
  ],
  august: [
    {
      id: "edinburgh-fringe-scotland",
      name: "Edinburgh Fringe Festival",
      location: "Scotland",
      flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
      date: "August 1-25, 2025",
      description: "World's largest arts festival featuring thousands of performances across comedy, theatre, and music.",
      highlights: ["Comedy Shows", "Theatre", "Street Performances"]
    },
    {
      id: "burning-man-usa",
      name: "Burning Man",
      location: "Nevada, USA",
      flag: "🇺🇸",
      date: "August 25 - September 2, 2025",
      description: "Unique desert festival celebrating art, self-expression, and community in a temporary city.",
      highlights: ["Art Installations", "Music", "Community Spirit"]
    }
  ]
};

export const months = [
  { key: 'march', label: 'March' },
  { key: 'april', label: 'April' },
  { key: 'may', label: 'May' },
  { key: 'june', label: 'June' },
  { key: 'july', label: 'July' },
  { key: 'august', label: 'August' }
];