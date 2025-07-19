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
    },
    {
    id: "king-day-netherlands",
    name: "King's Day",
    location: "Netherlands",
    flag: "🇳🇱",
    date: "April 27, 2025",
    description: "National celebration of the Dutch King's birthday with street parties, markets, and orange everywhere.",
    highlights: ["Street Markets", "Boat Parades", "Orange Outfits"]
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
    },
    {
    id: "cannes-film-france",
    name: "Cannes Film Festival",
    location: "France",
    flag: "🇫🇷",
    date: "May 13-24, 2025",
    description: "Prestigious international film festival attracting global stars and premieres on the French Riviera.",
    highlights: ["Film Premieres", "Red Carpet", "International Celebrities"]
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
    },
    {
    id: "int-folk-festival-bulgaria",
    name: "International Folklore Festival",
    location: "Koprivshtitsa, Bulgaria",
    flag: "🇧🇬",
    date: "June 20-28, 2025",
    description: "A vibrant celebration of traditional folk music, dance, and costumes from Bulgaria and around the world.",
    highlights: ["Folk Music", "Traditional Dance", "Handicrafts"]
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
    },
    {
    id: "independence-usa",
    name: "Independence Day",
    location: "United States",
    flag: "🇺🇸",
    date: "July 4, 2025",
    description: "U.S. national holiday with fireworks, barbecues, and patriotic displays across the country.",
    highlights: ["Fireworks", "Parades", "Barbecues"]
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
    },
    {
    id: "notting-hill-uk",
    name: "Notting Hill Carnival",
    location: "United Kingdom",
    flag: "🇬🇧",
    date: "August 24-25, 2025",
    description: "Europe’s biggest street festival celebrating Caribbean culture with colorful parades and music.",
    highlights: ["Costume Parades", "Steel Bands", "Caribbean Food"]
  }
  ],
september: [
  {
    id: "mid-autumn-china",
    name: "Mid-Autumn Festival",
    location: "China",
    flag: "🇨🇳",
    date: "September 8, 2025",
    description: "A traditional harvest festival celebrated with mooncakes, lanterns, and family reunions under the full moon.",
    highlights: ["Mooncakes", "Lantern Displays", "Family Gatherings"]
  },
  {
    id: "oktoberfest-germany",
    name: "Oktoberfest",
    location: "Germany",
    flag: "🇩🇪",
    date: "September 20 – October 5, 2025",
    description: "The world’s largest beer festival held in Munich with Bavarian music, food, and traditional outfits.",
    highlights: ["Beer Tents", "Dirndls & Lederhosen", "Traditional Food"]
  },
  {
    id: "independence-day-mexico",
    name: "Mexican Independence Day",
    location: "Mexico",
    flag: "🇲🇽",
    date: "September 16, 2025",
    description: "Celebration of Mexico’s independence with fireworks, parades, and patriotic displays across the country.",
    highlights: ["Parades", "Fireworks", "Grito de Dolores"]
  }
],
october: [
  {
    id: "hoi-an-lantern-vietnam",
    name: "Hoi An Full Moon Lantern Festival",
    location: "Vietnam",
    flag: "🇻🇳",
    date: "October 6, 2025",
    description: "Held monthly in Hoi An Ancient Town, this magical night features thousands of colorful lanterns on the river.",
    highlights: ["Lantern Release", "Folk Music", "Street Performances"]
  },
  {
    id: "diwali-india",
    name: "Diwali",
    location: "India",
    flag: "🇮🇳",
    date: "October 20, 2025",
    description: "The Hindu Festival of Lights, symbolizing the victory of light over darkness and good over evil.",
    highlights: ["Fireworks", "Lighting Diyas", "Feasting & Gifts"]
  },
  {
    id: "halloween-usa",
    name: "Halloween",
    location: "United States",
    flag: "🇺🇸",
    date: "October 31, 2025",
    description: "Spooky celebration with costumes, candy, haunted houses, and trick-or-treating.",
    highlights: ["Costume Parties", "Trick-or-Treating", "Haunted Attractions"]
  }
],
november: [
  {
    id: "day-of-the-dead-mexico",
    name: "Día de los Muertos",
    location: "Mexico",
    flag: "🇲🇽",
    date: "November 1–2, 2025",
    description: "A colorful remembrance of deceased loved ones with altars, marigolds, and offerings.",
    highlights: ["Altars (Ofrendas)", "Skull Makeup", "Parades"]
  },
 {
    id: "festival-lantern-china",
    name: "Lantern Festival (Xi'an Edition)",
    location: "China",
    flag: "🇨🇳",
    date: "November 3–10, 2025",
    description: "A citywide festival in Xi’an featuring glowing lantern displays, parades, and folk performances.",
    highlights: ["Giant Lantern Sculptures", "Traditional Dance", "Food Stalls"]
  },
  {
    id: "thanksgiving-usa",
    name: "Thanksgiving",
    location: "United States",
    flag: "🇺🇸",
    date: "November 27, 2025",
    description: "A holiday to give thanks and gather with family, often celebrated with a large feast.",
    highlights: ["Family Meals", "Parades", "Gratitude"]
  }
],
december: [
{
  "id": "rothenburg-christmas-germany",
  "name": "Rothenburg Christmas Market (Reiterlesmarkt)",
  "location": "Germany",
  "flag": "🇩🇪",
  "date": "November 29 – December 23, 2025",
  "description": "A magical medieval Christmas market in Rothenburg ob der Tauber with twinkling lights, half-timbered houses, and old-world holiday charm.",
  "highlights": [
    "Medieval Atmosphere",
    "Traditional Christmas Stalls",
    "Käthe Wohlfahrt Christmas Village",
    "Mulled Wine & Gingerbread"
  ]
},

  {
    "id": "krampus-day-austria",
    "name": "Krampus Day",
    "location": "Austria",
    "flag": "🇦🇹",
    "date": "December 5, 2025",
    "description": "A dark Alpine tradition where the horned figure Krampus punishes misbehaving children before St. Nicholas arrives.",
    "highlights": ["Krampus Parades", "Costumed Marches", "Folklore Shows"]
  },
 
  {
    id: "new-years-eve-usa",
    name: "New Year’s Eve Times Square",
    location: "United States",
    flag: "🇺🇸",
    date: "December 31, 2025",
    description: "One of the world’s biggest NYE parties with the famous ball drop in New York City.",
    highlights: ["Ball Drop", "Live Performances", "Fireworks"]
  }
]




};

export const months = [
  { key: 'march', label: 'March' },
  { key: 'april', label: 'April' },
  { key: 'may', label: 'May' },
  { key: 'june', label: 'June' },
  { key: 'july', label: 'July' },
  { key: 'august', label: 'August' },
  { key: 'september', label: 'September' },
  { key: 'october', label: 'October' },
  { key: 'november', label: 'November' },
  { key: 'december', label: 'December' },
];