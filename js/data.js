// ============================================
// Idukki Tourism - Data Layer
// All tourist places, stays, transport & lookups
// ============================================

const CATEGORIES = [
  { id: "waterfalls", label: "Waterfalls", icon: "💧", color: "#4a90d9" },
  { id: "wildlife", label: "Wildlife", icon: "🐘", color: "#2d5016" },
  { id: "hill-stations", label: "Hill Stations", icon: "⛰️", color: "#6b8f71" },
  { id: "dams", label: "Dams & Lakes", icon: "🏞️", color: "#1a5276" },
  { id: "tea-gardens", label: "Tea Gardens", icon: "🍃", color: "#3d7a3d" },
  { id: "adventure", label: "Adventure", icon: "🧗", color: "#8b4513" }
];

const SEASONS = [
  { id: "all", label: "All Seasons" },
  { id: "year-round", label: "Year Round" },
  { id: "september-may", label: "Sep – May" },
  { id: "october-march", label: "Oct – Mar" },
  { id: "june-september", label: "Jun – Sep (Monsoon)" }
];

const TOURIST_PLACES = [
  {
    id: 1,
    name: "Eravikulam National Park",
    description: "Home to the endangered Nilgiri Tahr, this stunning national park features rolling grasslands and the famous Neelakurinji flowers that bloom once every 12 years.",
    longDescription: "Spanning 97 sq km of rolling grasslands and shola forests at an altitude of over 2,000 metres, Eravikulam National Park is one of South India's most treasured wildlife sanctuaries. The park is famous for sheltering the largest viable population of the endangered Nilgiri Tahr (mountain goat). The landscape is breathtaking — mist-covered peaks, cascading streams, and during the rare Neelakurinji bloom season (every 12 years, next in 2030), the entire hillside turns a mesmerizing blue-violet. Trekking trails through the park offer panoramic views of the Western Ghats.",
    category: "wildlife",
    location: "Rajamala, Munnar",
    bestSeason: "september-may",
    entryFee: { adult: 125, child: 50, foreign: 420 },
    feeType: "paid",
    rating: 4.7,
    popularity: 97,
    timings: "7:30 AM – 4:00 PM",
    images: [
      { src: "images/places/eravikulam.jpg", alt: "Eravikulam National Park panorama" }
    ],
    coordinates: { lat: 10.1833, lng: 77.0608 },
    highlights: ["Nilgiri Tahr sightings", "Neelakurinji blooms (next: 2030)", "Trekking trails", "Panoramic Western Ghats views"],
    nearbyPlaces: ["Munnar Tea Gardens", "Mattupetty Dam"]
  },
  {
    id: 2,
    name: "Munnar Tea Gardens",
    description: "Endless emerald carpets of tea plantations stretching across rolling hills, offering a serene and photogenic landscape unique to Kerala's high ranges.",
    longDescription: "Munnar's tea gardens are the heart and soul of this hill station. Established during the British colonial era, these lush plantations cover thousands of hectares of undulating terrain at elevations between 1,500 and 2,000 metres. Walking through the neatly manicured rows of tea bushes while mist drifts through the valleys is an unforgettable experience. Visit the Tata Tea Museum (Kannan Devan Hills) to learn about tea processing, or simply drive along the winding roads where every turn reveals a new panoramic vista of green hills meeting blue sky.",
    category: "tea-gardens",
    location: "Munnar Town",
    bestSeason: "year-round",
    entryFee: { adult: 0, child: 0, foreign: 0 },
    feeType: "free",
    rating: 4.6,
    popularity: 95,
    timings: "Open 24 hours (Tea Museum: 9 AM – 4 PM)",
    images: [
      { src: "images/places/munnar-tea.jpg", alt: "Rolling tea plantations of Munnar" }
    ],
    coordinates: { lat: 10.0889, lng: 77.0595 },
    highlights: ["Tata Tea Museum", "Photography spots", "Tea tasting experiences", "Scenic drives"],
    nearbyPlaces: ["Pothamedu View Point", "Echo Point"]
  },
  {
    id: 3,
    name: "Mattupetty Dam",
    description: "A picturesque concrete gravity dam surrounded by lush tea gardens and dense forests, perfect for boating and enjoying the misty mountain scenery.",
    longDescription: "Built in 1940 for water storage and hydroelectric power, Mattupetty Dam sits at an elevation of 1,700 metres and is surrounded by verdant tea plantations and evergreen forests. The reservoir created by the dam offers scenic boat rides operated by the District Tourism Promotion Council. The area is also known for the Indo-Swiss Dairy Farm nearby. On clear days, the reflections of the surrounding mountains on the calm waters create picture-perfect moments. Speed boating and pedal boating are popular activities.",
    category: "dams",
    location: "Mattupetty, 13 km from Munnar",
    bestSeason: "september-may",
    entryFee: { adult: 30, child: 15, foreign: 30 },
    feeType: "paid",
    rating: 4.3,
    popularity: 85,
    timings: "9:00 AM – 5:00 PM",
    images: [
      { src: "images/places/mattupetty.jpg", alt: "Mattupetty Dam with misty mountains" }
    ],
    coordinates: { lat: 10.1093, lng: 77.1350 },
    highlights: ["Boating (speed & pedal)", "Indo-Swiss Dairy Farm", "Mountain reflections", "Birdwatching"],
    nearbyPlaces: ["Echo Point", "Kundala Dam"]
  },
  {
    id: 4,
    name: "Echo Point",
    description: "A natural echo phenomenon set against a stunning backdrop of misty hills and a serene lake, where your voice bounces back from the surrounding mountains.",
    longDescription: "Located 15 km from Munnar town, Echo Point gets its name from the natural echo phenomenon — shout towards the hills and hear your voice reverberate across the valley. Set beside a tranquil lake surrounded by lush green hills often draped in mist, this is one of Munnar's most visited spots. The drive to Echo Point through tea plantations is equally scenic. Pedal boats are available on the lake, and the surrounding area is perfect for nature walks and photography.",
    category: "hill-stations",
    location: "15 km from Munnar",
    bestSeason: "year-round",
    entryFee: { adult: 50, child: 25, foreign: 50 },
    feeType: "paid",
    rating: 4.2,
    popularity: 82,
    timings: "9:00 AM – 5:30 PM",
    images: [
      { src: "images/places/echo-point.jpg", alt: "Echo Point lake and misty hills" }
    ],
    coordinates: { lat: 10.0750, lng: 77.1200 },
    highlights: ["Natural echo phenomenon", "Pedal boating", "Mist-covered valleys", "Nature photography"],
    nearbyPlaces: ["Mattupetty Dam", "Top Station"]
  },
  {
    id: 5,
    name: "Top Station",
    description: "The highest point on the Munnar–Kodaikanal road, offering breathtaking panoramic views of the Tamil Nadu plains and the Western Ghats.",
    longDescription: "At 1,880 metres above sea level, Top Station is the highest point in Munnar and marks the border between Kerala and Tamil Nadu. It served as the upper terminal of a ropeway that once carried tea from the Kannan Devan Hills to Bodinayakanur. The panoramic views from the top are simply spectacular — on clear days, you can see all the way to Theni and Vaigai Dam in Tamil Nadu. This is also one of the best spots to witness the Neelakurinji blooms. The winding 32 km drive from Munnar is an adventure in itself.",
    category: "hill-stations",
    location: "32 km from Munnar",
    bestSeason: "september-may",
    entryFee: { adult: 0, child: 0, foreign: 0 },
    feeType: "free",
    rating: 4.5,
    popularity: 88,
    timings: "6:00 AM – 6:00 PM",
    images: [
      { src: "images/places/top-station.jpg", alt: "Panoramic view from Top Station" }
    ],
    coordinates: { lat: 10.1278, lng: 77.2428 },
    highlights: ["Panoramic Tamil Nadu views", "Neelakurinji blooms", "Scenic drive", "Sunrise viewpoint"],
    nearbyPlaces: ["Echo Point", "Kundala Dam"]
  },
  {
    id: 6,
    name: "Idukki Arch Dam",
    description: "Asia's first and one of the world's highest arch dams, nestled between the Kuravan and Kurathi hills with a massive reservoir.",
    longDescription: "The Idukki Arch Dam is an engineering marvel and a must-visit landmark. Built across the Periyar River between the Kuravan and Kurathi hills, it is Asia's first arch dam and one of the highest in the world at 168 metres. The dam creates the Idukki Reservoir which supplies water for one of Kerala's largest hydroelectric projects. The hill park near the dam offers spectacular views of the reservoir and surrounding forests. Due to security considerations, visitor access may be limited, so check current regulations before visiting.",
    category: "dams",
    location: "Idukki, near Cheruthoni",
    bestSeason: "september-may",
    entryFee: { adult: 25, child: 10, foreign: 25 },
    feeType: "paid",
    rating: 4.4,
    popularity: 80,
    timings: "10:00 AM – 5:00 PM (check availability)",
    images: [
      { src: "images/places/idukki-dam.jpg", alt: "Idukki Arch Dam between hills" }
    ],
    coordinates: { lat: 9.8400, lng: 76.9703 },
    highlights: ["Asia's first arch dam", "Hill park views", "Hydroelectric project", "Kuravan & Kurathi hills"],
    nearbyPlaces: ["Kalvari Mount", "Cheeyappara Waterfalls"]
  },
  {
    id: 7,
    name: "Cheeyappara Waterfalls",
    description: "A magnificent seven-tiered waterfall cascading down rocky terrain, visible right from the Kochi–Munnar highway amidst lush greenery.",
    longDescription: "Cheeyappara is one of the most accessible and dramatic waterfalls in the Idukki district. Cascading down seven tiers over mossy rocks surrounded by dense tropical forest, it's located right alongside the Kochi–Munnar highway (NH 85), making it a popular stop for travellers heading to the hills. During the monsoon season (June–September), the falls are at their most magnificent, with water thundering down in massive volumes. There's a small parking area and viewing spots at road level. Swimming near the falls is officially restricted due to strong currents.",
    category: "waterfalls",
    location: "Adimali–Munnar Highway",
    bestSeason: "june-september",
    entryFee: { adult: 0, child: 0, foreign: 0 },
    feeType: "free",
    rating: 4.3,
    popularity: 78,
    timings: "Open 24 hours",
    images: [
      { src: "images/places/cheeyappara.jpg", alt: "Seven tiers of Cheeyappara Waterfalls" }
    ],
    coordinates: { lat: 10.0575, lng: 76.8828 },
    highlights: ["Seven-tiered cascade", "Roadside viewing", "Monsoon spectacle", "Photography paradise"],
    nearbyPlaces: ["Valara Waterfalls", "Idukki Arch Dam"]
  },
  {
    id: 8,
    name: "Valara Waterfalls",
    description: "A stunning waterfall hidden within dense forest, plunging down from a great height — often called the twin of Cheeyappara.",
    longDescription: "Located just a few kilometres from Cheeyappara, Valara Waterfalls is surrounded by much denser forest and feels more remote and wild. The water plunges from a considerable height through thick vegetation, creating a mystical atmosphere especially when mist and spray mix with the forest air. Unlike Cheeyappara, approaching the base of Valara is restricted to protect the fragile ecosystem and for visitor safety. The best views are from designated viewpoints along the highway. It's particularly stunning during and just after the monsoon.",
    category: "waterfalls",
    location: "Adimali–Munnar Highway",
    bestSeason: "june-september",
    entryFee: { adult: 0, child: 0, foreign: 0 },
    feeType: "free",
    rating: 4.1,
    popularity: 70,
    timings: "Open 24 hours",
    images: [
      { src: "images/places/valara.jpg", alt: "Valara Waterfalls in dense forest" }
    ],
    coordinates: { lat: 10.0475, lng: 76.8700 },
    highlights: ["Dense forest setting", "Tall single drop", "Misty atmosphere", "Monsoon best time"],
    nearbyPlaces: ["Cheeyappara Waterfalls", "Idukki Arch Dam"]
  },
  {
    id: 9,
    name: "Thommankuthu Waterfalls",
    description: "A spectacular seven-step waterfall with natural pools, tribal settlements, and ancient caves — an off-the-beaten-path gem in Idukki.",
    longDescription: "Thommankuthu is a seven-step waterfall tucked away near Thodupuzha, relatively less crowded compared to Munnar's popular spots. The trek to the upper tiers leads through tribal settlements and ancient rock caves with pre-historic carvings. Natural pools at various levels invite visitors for a refreshing dip. The area is managed by the Idukki District Tourism Promotion Council and has basic facilities. The 3 km trek through forested paths is moderately challenging and highly rewarding. Local guides from the tribal community are available.",
    category: "waterfalls",
    location: "Thodupuzha, 72 km from Munnar",
    bestSeason: "october-march",
    entryFee: { adult: 40, child: 20, foreign: 40 },
    feeType: "paid",
    rating: 4.2,
    popularity: 68,
    timings: "8:00 AM – 5:00 PM",
    images: [
      { src: "images/places/thommankuthu.jpg", alt: "Thommankuthu seven-step waterfall" }
    ],
    coordinates: { lat: 9.9478, lng: 76.7828 },
    highlights: ["Seven-step waterfall", "Natural swimming pools", "Tribal cave paintings", "Forest trekking"],
    nearbyPlaces: ["Idukki Arch Dam", "Kalvari Mount"]
  },
  {
    id: 10,
    name: "Periyar Wildlife Sanctuary",
    description: "One of India's finest wildlife reserves, centred around the beautiful Periyar Lake, famous for wild elephant and tiger sightings.",
    longDescription: "The Periyar Tiger Reserve, commonly known as Thekkady, encompasses 925 sq km of tropical forests, grasslands, and the vast Periyar Lake formed by the Mullaperiyar Dam. It's one of the 50 tiger reserves in India and shelters a rich biodiversity including elephants, gaur, sambar deer, and over 260 bird species. The signature experience is a boat cruise on Periyar Lake at dawn, when elephants and other wildlife come to the water's edge. Adventure activities include bamboo rafting, border hiking, jungle night patrol, and the Tiger Trail — a demanding multi-day trek deep into the reserve.",
    category: "wildlife",
    location: "Thekkady, Kumily",
    bestSeason: "october-march",
    entryFee: { adult: 150, child: 75, foreign: 525 },
    feeType: "paid",
    rating: 4.6,
    popularity: 94,
    timings: "6:00 AM – 6:00 PM",
    images: [
      { src: "images/places/periyar.jpg", alt: "Elephants at Periyar Lake" }
    ],
    coordinates: { lat: 9.4681, lng: 77.2365 },
    highlights: ["Boat cruise on Periyar Lake", "Elephant & tiger sightings", "Bamboo rafting", "Tiger Trail trek"],
    nearbyPlaces: ["Ramakkalmedu", "Vagamon Hill Station"]
  },
  {
    id: 11,
    name: "Vagamon Hill Station",
    description: "A serene and lesser-known hill station with rolling meadows, pine forests, and a mystical charm — an emerging paragliding destination.",
    longDescription: "Vagamon (or Wagamon) sits at 1,100 metres and is a hidden paradise that has managed to retain its unspoilt charm. Three beautiful hills — Thangal, Murugan, and Kurismala — surround the town, each associated with a different religious tradition (Muslim, Hindu, Christian), symbolising Kerala's cultural harmony. The Pine Valley with its tall, swaying pine trees is magical. Vagamon has emerged as Kerala's premier paragliding destination, with international competitions held on its grassy slopes. The rolling meadows, dairy farms, and seasonal waterfalls make it perfect for a peaceful getaway.",
    category: "hill-stations",
    location: "Vagamon, 65 km from Kottayam",
    bestSeason: "october-march",
    entryFee: { adult: 0, child: 0, foreign: 0 },
    feeType: "free",
    rating: 4.4,
    popularity: 83,
    timings: "Open 24 hours",
    images: [
      { src: "images/places/vagamon.jpg", alt: "Rolling green meadows of Vagamon" }
    ],
    coordinates: { lat: 9.6900, lng: 76.9100 },
    highlights: ["Paragliding", "Pine Valley", "Three sacred hills", "Rolling meadows"],
    nearbyPlaces: ["Ramakkalmedu", "Periyar Wildlife Sanctuary"]
  },
  {
    id: 12,
    name: "Ramakkalmedu",
    description: "A windswept plateau with one of South India's strongest wind corridors, massive wind turbines, and stunning panoramic valley views.",
    longDescription: "Ramakkalmedu, at 1,100 metres altitude, is literally swept by powerful winds — it hosts one of the largest wind farms in Kerala. The hilltop offers 360-degree panoramic views of both Kerala and Tamil Nadu, with the vast Cumbum Valley stretching out below. Two massive stone statues of Kuravan and Kurathi (a tribal couple from local legend) stand at the viewpoint, adding cultural significance to the natural beauty. The area is dotted with unique rock formations and offers excellent hiking. Sunrise and sunset views here are spectacular and relatively uncrowded.",
    category: "hill-stations",
    location: "Ramakkalmedu, 15 km from Nedumkandam",
    bestSeason: "year-round",
    entryFee: { adult: 20, child: 10, foreign: 20 },
    feeType: "paid",
    rating: 4.3,
    popularity: 72,
    timings: "6:00 AM – 6:00 PM",
    images: [
      { src: "images/places/ramakkalmedu.jpg", alt: "Wind turbines at Ramakkalmedu" }
    ],
    coordinates: { lat: 9.7855, lng: 77.1499 },
    highlights: ["Wind farm panorama", "Kuravan & Kurathi statues", "Cumbum Valley views", "Sunrise/sunset"],
    nearbyPlaces: ["Vagamon Hill Station", "Periyar Wildlife Sanctuary"]
  },
  {
    id: 13,
    name: "Meesapulimala",
    description: "The second highest peak in the Western Ghats south of the Himalayas, offering an exhilarating trek through grasslands and cloud forests.",
    longDescription: "Standing at 2,640 metres, Meesapulimala is the second-highest peak in the Western Ghats (south of the Himalayas) and the highest point in Kerala accessible by trekking. The name translates to 'mountain of the whiskered leopard.' The trek (approximately 10 km one way) passes through rhododendron thickets, montane grasslands, and cloud forests. The summit offers a surreal experience — standing above the clouds with views extending to Munnar, Kodaikanal, and the Tamil Nadu plains. A guide from the Forest Department is mandatory. The trek is rated moderate to difficult.",
    category: "adventure",
    location: "Kolukumalai, 40 km from Munnar",
    bestSeason: "october-march",
    entryFee: { adult: 200, child: 100, foreign: 500 },
    feeType: "paid",
    rating: 4.8,
    popularity: 76,
    timings: "Trek starts 5:00 AM (permit required)",
    images: [
      { src: "images/places/meesapulimala.jpg", alt: "Meesapulimala peak above the clouds" }
    ],
    coordinates: { lat: 10.0978, lng: 77.1508 },
    highlights: ["Second highest Western Ghats peak", "Cloud forest trekking", "Above-the-clouds summit", "Rare montane flora"],
    nearbyPlaces: ["Top Station", "Kolukumalai Tea Estate"]
  },
  {
    id: 14,
    name: "Anamudi Peak",
    description: "The highest peak in South India at 2,695 metres, located within Eravikulam National Park — a challenging trek for experienced adventurers.",
    longDescription: "Anamudi, meaning 'elephant's forehead' in Malayalam, soars to 2,695 metres making it the highest peak in South India and the highest point in India south of the Himalayas. Located within Eravikulam National Park, reaching the summit requires special permission from the Kerala Forest Department. The trek traverses diverse ecosystems — from dense shola forests to open grasslands grazed by Nilgiri Tahr. The summit offers unparalleled views in all directions. This trek is only for experienced trekkers in good physical condition and is subject to weather and forest department permissions.",
    category: "adventure",
    location: "Eravikulam National Park, Munnar",
    bestSeason: "september-may",
    entryFee: { adult: 300, child: 150, foreign: 700 },
    feeType: "paid",
    rating: 4.7,
    popularity: 70,
    timings: "By permit only (Forest Department)",
    images: [
      { src: "images/places/anamudi.jpg", alt: "Anamudi Peak, South India's highest" }
    ],
    coordinates: { lat: 10.1667, lng: 77.0583 },
    highlights: ["South India's highest peak", "Permit-only trek", "Nilgiri Tahr habitat", "360° summit views"],
    nearbyPlaces: ["Eravikulam National Park", "Munnar Tea Gardens"]
  },
  {
    id: 15,
    name: "Kundala Dam & Lake",
    description: "A charming arch dam with a picturesque lake surrounded by tea gardens, famous for Kashmiri-style shikara boat rides.",
    longDescription: "Kundala Dam was built in 1946 and is one of the three dams in the Sethuparvathipuram area. The lake formed by the dam is set amidst a stunning landscape of tea gardens, eucalyptus groves, and hills. What makes Kundala special is the Kashmiri-style shikara (gondola) boat rides available on the lake — a unique experience in the Kerala hills. Cherry blossoms bloom around the lake in February-March, adding splashes of pink to the green landscape. The drive to Kundala along the Munnar–Top Station road is scenic with several photo-worthy viewpoints.",
    category: "dams",
    location: "23 km from Munnar",
    bestSeason: "year-round",
    entryFee: { adult: 0, child: 0, foreign: 0 },
    feeType: "free",
    rating: 4.4,
    popularity: 81,
    timings: "8:00 AM – 5:30 PM",
    images: [
      { src: "images/places/kundala.jpg", alt: "Shikara boats on Kundala Lake" }
    ],
    coordinates: { lat: 10.0600, lng: 77.1700 },
    highlights: ["Shikara boat rides", "Cherry blossoms (Feb-Mar)", "Tea garden backdrop", "Scenic drive"],
    nearbyPlaces: ["Top Station", "Echo Point"]
  },
  {
    id: 16,
    name: "Pothamedu View Point",
    description: "A breathtaking viewpoint offering panoramic views of vast tea, coffee, and cardamom plantations rolling across the hills of Munnar.",
    longDescription: "Pothamedu View Point, just 5 km from Munnar town, offers one of the most accessible yet stunning panoramic views in the region. From this vantage point, you can see vast stretches of tea, coffee, and cardamom plantations layered across the hills in different shades of green. It's a popular spot for trekking enthusiasts and photographers, especially during early morning when mist rolls through the valleys. The area is also a starting point for short nature walks through the plantations. Sunrise from Pothamedu is legendary among photographers.",
    category: "tea-gardens",
    location: "5 km from Munnar Town",
    bestSeason: "year-round",
    entryFee: { adult: 0, child: 0, foreign: 0 },
    feeType: "free",
    rating: 4.3,
    popularity: 75,
    timings: "Open 24 hours",
    images: [
      { src: "images/places/pothamedu.jpg", alt: "Panoramic plantation views from Pothamedu" }
    ],
    coordinates: { lat: 10.0800, lng: 77.0650 },
    highlights: ["Plantation panorama", "Sunrise photography", "Short nature walks", "Tea-coffee-cardamom views"],
    nearbyPlaces: ["Munnar Tea Gardens", "Echo Point"]
  },
  {
    id: 17,
    name: "Kalvari Mount",
    description: "A hilltop pilgrimage site offering incredible views of the Idukki Arch Dam, reservoir, and surrounding forested hills.",
    longDescription: "Kalvari Mount (Calvary Mount) is a prominent hilltop near Idukki town, primarily known as a Christian pilgrimage site with a large cross and chapel at the summit. However, it attracts visitors of all backgrounds thanks to its extraordinary panoramic views. From the top, you get a spectacular bird's-eye view of the Idukki Arch Dam, the vast reservoir, and the endless canopy of forests stretching to the horizon. The 2 km climb up the hill is steep but manageable, with steps carved into the hillside. It's especially beautiful at sunrise and during the monsoon when clouds sweep through the valleys below.",
    category: "adventure",
    location: "Idukki Town",
    bestSeason: "year-round",
    entryFee: { adult: 0, child: 0, foreign: 0 },
    feeType: "free",
    rating: 4.1,
    popularity: 58,
    timings: "Open 24 hours",
    images: [
      { src: "images/places/kalvari.jpg", alt: "View from Kalvari Mount overlooking Idukki Dam" }
    ],
    coordinates: { lat: 9.8505, lng: 76.9422 },
    highlights: ["Idukki Dam bird's-eye view", "Sunrise viewpoint", "Hilltop pilgrimage", "Monsoon cloud walks"],
    nearbyPlaces: ["Idukki Arch Dam", "Thommankuthu Waterfalls"]
  },
  {
    id: 18,
    name: "Lakkam Waterfalls",
    description: "A hidden gem tucked inside Eravikulam National Park — a serene waterfall reached via a short forest trail through misty grasslands.",
    longDescription: "Lakkam Waterfalls is a lesser-known treasure located on the periphery of Eravikulam National Park. Reached via a gentle 2 km forest trail from the main road, the waterfall cascades down rocky ledges into a clear pool surrounded by montane grasslands and shola forests. The trail itself is as rewarding as the destination — walking through mist-laden grasslands with the chance to spot Nilgiri Tahr, various bird species, and rare orchids. Because it requires a short trek, it remains relatively uncrowded compared to roadside waterfalls, offering a peaceful communion with nature.",
    category: "waterfalls",
    location: "Near Eravikulam, 10 km from Munnar",
    bestSeason: "june-september",
    entryFee: { adult: 0, child: 0, foreign: 0 },
    feeType: "free",
    rating: 4.2,
    popularity: 62,
    timings: "8:00 AM – 5:00 PM",
    images: [
      { src: "images/places/lakkam.jpg", alt: "Lakkam Waterfalls in misty grasslands" }
    ],
    coordinates: { lat: 10.1600, lng: 77.0550 },
    highlights: ["Forest trail walk", "Montane grassland setting", "Uncrowded", "Nilgiri Tahr sightings"],
    nearbyPlaces: ["Eravikulam National Park", "Anamudi Peak"]
  }
];

const SPONSORED_STAYS = [
  {
    id: 1,
    name: "Spice Jungle Resort",
    type: "resort",
    tagline: "Luxury amidst the spice plantations",
    description: "Nestled in Thekkady's spice country with stunning views of the Western Ghats. Premium cottages, infinity pool, and Ayurvedic spa.",
    priceRange: "₹3,500 – ₹8,000",
    rating: 4.5,
    amenities: ["Pool", "Spa", "Restaurant", "WiFi", "Parking", "Room Service"],
    nearTouristSpot: "Periyar Wildlife Sanctuary",
    contact: "+91 94XX XXX XXX",
    image: { src: "images/stays/spice-resort.jpg", alt: "Spice Jungle Resort" },
    sponsored: true
  },
  {
    id: 2,
    name: "Wind Valley Homestay",
    type: "homestay",
    tagline: "Warm hospitality in the tea hills",
    description: "A family-run homestay surrounded by tea plantations with home-cooked Kerala meals and personalised local guided experiences.",
    priceRange: "₹1,200 – ₹2,500",
    rating: 4.7,
    amenities: ["Home-cooked Meals", "Garden", "WiFi", "Guided Tours", "Parking"],
    nearTouristSpot: "Munnar Tea Gardens",
    contact: "+91 94XX XXX XXX",
    image: { src: "images/stays/tea-homestay.jpg", alt: "Wind Valley Homestay" },
    sponsored: true
  },
  {
    id: 3,
    name: "Misty Mountain Plantation Resort",
    type: "resort",
    tagline: "Where clouds meet comfort",
    description: "A hilltop resort offering panoramic valley views, plantation walks, campfire evenings, and luxurious wooden cottages.",
    priceRange: "₹4,000 – ₹10,000",
    rating: 4.6,
    amenities: ["Valley View", "Campfire", "Restaurant", "WiFi", "Trekking", "Parking"],
    nearTouristSpot: "Eravikulam National Park",
    contact: "+91 94XX XXX XXX",
    image: { src: "images/stays/mountain-resort.jpg", alt: "Misty Mountain Resort" },
    sponsored: true
  },
  {
    id: 4,
    name: "Jungle Cottage Kattappana",
    type: "homestay",
    tagline: "Rustic charm deep in the forest",
    description: "An eco-friendly forest cottage with minimal footprint, organic farm, and nature immersion — perfect for digital detox getaways.",
    priceRange: "₹900 – ₹1,800",
    rating: 4.3,
    amenities: ["Organic Farm", "Nature Trails", "Bonfire", "Parking", "Breakfast Included"],
    nearTouristSpot: "Idukki Arch Dam",
    contact: "+91 94XX XXX XXX",
    image: { src: "images/stays/forest-cottage.jpg", alt: "Jungle Cottage Kattappana" },
    sponsored: true
  },
  {
    id: 5,
    name: "Palette Hill View Resort",
    type: "resort",
    tagline: "Art meets nature in the meadows",
    description: "A boutique resort in Vagamon's rolling meadows with art-themed rooms, a meditation centre, and paragliding arrangements.",
    priceRange: "₹2,800 – ₹6,500",
    rating: 4.4,
    amenities: ["Meditation Centre", "Restaurant", "WiFi", "Paragliding", "Cycling", "Parking"],
    nearTouristSpot: "Vagamon Hill Station",
    contact: "+91 94XX XXX XXX",
    image: { src: "images/stays/vagamon-resort.jpg", alt: "Palette Hill View Resort" },
    sponsored: true
  },
  {
    id: 6,
    name: "Blanket Hotel & Spa",
    type: "hotel",
    tagline: "Five-star comfort in the highlands",
    description: "Premium hotel in the heart of Munnar with a rooftop restaurant, full-service spa, and curated heritage tea experiences.",
    priceRange: "₹6,000 – ₹15,000",
    rating: 4.8,
    amenities: ["Spa", "Rooftop Dining", "Bar", "WiFi", "Concierge", "Valet Parking"],
    nearTouristSpot: "Munnar Tea Gardens",
    contact: "+91 94XX XXX XXX",
    image: { src: "images/stays/luxury-hotel.jpg", alt: "Blanket Hotel and Spa" },
    sponsored: true
  },
  {
    id: 7,
    name: "Dreamcatcher Treehouse",
    type: "treehouse",
    tagline: "Sleep among the canopy",
    description: "Unique treehouse accommodation perched among the trees with glass walls, forest sounds, and a suspended walkway to the main lodge.",
    priceRange: "₹3,200 – ₹7,000",
    rating: 4.6,
    amenities: ["Treehouse", "Forest Walks", "Restaurant", "Birdwatching", "WiFi"],
    nearTouristSpot: "Eravikulam National Park",
    contact: "+91 94XX XXX XXX",
    image: { src: "images/stays/treehouse.jpg", alt: "Dreamcatcher Treehouse" },
    sponsored: true
  },
  {
    id: 8,
    name: "Green Valley Vista Homestay",
    type: "homestay",
    tagline: "Valley views and village life",
    description: "A traditional Kerala homestay overlooking green valleys with cooking classes, spice garden tours, and genuine village experiences.",
    priceRange: "₹1,000 – ₹2,200",
    rating: 4.5,
    amenities: ["Cooking Class", "Spice Garden", "WiFi", "Valley View", "Parking"],
    nearTouristSpot: "Idukki Arch Dam",
    contact: "+91 94XX XXX XXX",
    image: { src: "images/stays/valley-homestay.jpg", alt: "Green Valley Vista Homestay" },
    sponsored: true
  }
];

const TRANSPORT_OPTIONS = [
  {
    id: 1,
    mode: "bus",
    title: "KSRTC Bus Service",
    icon: "🚌",
    description: "Kerala State Road Transport Corporation operates regular bus services to Munnar, Thekkady, and other Idukki destinations from major Kerala cities.",
    routes: [
      { from: "Kochi (Ernakulam)", to: "Munnar", duration: "4–5 hours", fare: "₹188+", frequency: "Every 40 min" },
      { from: "Kochi", to: "Thekkady (Kumily)", duration: "5–6 hours", fare: "₹210+", frequency: "3–4 daily" },
      { from: "Kottayam", to: "Kumily", duration: "4 hours", fare: "₹160+", frequency: "Hourly" },
      { from: "Munnar", to: "Thekkady", duration: "5 hours", fare: "₹150+", frequency: "2–3 daily" }
    ],
    tips: [
      "Book KSRTC online at keralartc.com for long-distance routes",
      "Buses start from 5:30 AM; last buses around 8 PM",
      "Super Deluxe and AC buses available on popular routes",
      "Window seats on the left offer the best valley views"
    ]
  },
  {
    id: 2,
    mode: "private-bus",
    title: "Private Bus / Volvo",
    icon: "🚍",
    description: "Private operators run comfortable Volvo and sleeper buses on key routes, often with better timings and AC options.",
    routes: [
      { from: "Bangalore", to: "Munnar", duration: "9–10 hours", fare: "₹800+", frequency: "Night services" },
      { from: "Chennai", to: "Munnar", duration: "12–14 hours", fare: "₹1,000+", frequency: "Night services" },
      { from: "Kochi", to: "Munnar", duration: "4 hours", fare: "₹350+", frequency: "Multiple daily" }
    ],
    tips: [
      "Book via RedBus, Abhibus, or MakeMyTrip apps",
      "Volvo AC buses are recommended for overnight journeys",
      "Confirm pickup/drop points before booking",
      "Carry warm clothing — hill section gets cold at night"
    ]
  },
  {
    id: 3,
    mode: "train",
    title: "Train + Road",
    icon: "🚂",
    description: "No direct rail to Idukki. Reach the nearest railway stations and continue by bus or taxi into the hills.",
    routes: [
      { from: "Ernakulam Junction", to: "Munnar (by road)", duration: "4 hours road", fare: "Train fare varies", frequency: "Many trains to Ernakulam" },
      { from: "Aluva Station", to: "Munnar (by road)", duration: "3.5 hours road", fare: "Train fare varies", frequency: "Metro + train access" },
      { from: "Kottayam Station", to: "Thekkady (by road)", duration: "3.5 hours road", fare: "Train fare varies", frequency: "Many trains to Kottayam" }
    ],
    tips: [
      "Ernakulam Junction (ERS) is best for Munnar; Kottayam (KTYM) for Thekkady",
      "Book trains on IRCTC well in advance for holiday periods",
      "Pre-book a taxi from the station for a hassle-free hill drive",
      "Tatkal bookings open at 10 AM for AC and 11 AM for sleeper"
    ]
  },
  {
    id: 4,
    mode: "air",
    title: "Air + Road",
    icon: "✈️",
    description: "Fly into Cochin International Airport (COK), the nearest airport, and continue by road to your Idukki destination.",
    routes: [
      { from: "Cochin Airport (COK)", to: "Munnar", duration: "3.5–4 hours road", fare: "Taxi ₹3,000–4,500", frequency: "Daily flights from major cities" },
      { from: "Cochin Airport (COK)", to: "Thekkady", duration: "4.5–5 hours road", fare: "Taxi ₹4,000–5,500", frequency: "Daily flights from major cities" },
      { from: "Madurai Airport (IXM)", to: "Thekkady", duration: "3.5 hours road", fare: "Taxi ₹2,500–3,500", frequency: "Limited flights" }
    ],
    tips: [
      "Cochin International (COK) is 110 km from Munnar",
      "Pre-book airport taxi — official counter outside arrivals",
      "Morning flights allow arrival in Munnar by afternoon",
      "Madurai Airport is closer to Thekkady than Kochi"
    ]
  },
  {
    id: 5,
    mode: "taxi",
    title: "Taxi / Cab Hire",
    icon: "🚕",
    description: "Hire taxis or self-drive cars for a flexible and comfortable journey through the scenic Western Ghats roads.",
    routes: [
      { from: "Kochi", to: "Munnar", duration: "3.5–4 hours", fare: "₹3,000–4,500", frequency: "On demand" },
      { from: "Kochi", to: "Thekkady", duration: "4.5–5 hours", fare: "₹4,000–5,500", frequency: "On demand" },
      { from: "Munnar", to: "Thekkady", duration: "3.5–4 hours", fare: "₹2,500–3,500", frequency: "On demand" }
    ],
    tips: [
      "App-based cabs (Ola, Uber) may have limited availability in hills",
      "Pre-booked taxis from Kochi are more reliable",
      "Agree on fare before starting — metered cabs rare on hill routes",
      "Self-drive rentals available from Zoomcar and Revv in Kochi"
    ]
  },
  {
    id: 6,
    mode: "bike",
    title: "Bike / Scooter Rental",
    icon: "🏍️",
    description: "Rent a bike or scooter for the ultimate freedom to explore the winding hill roads and hidden corners of Idukki at your own pace.",
    routes: [
      { from: "Munnar Town", to: "Local sightseeing", duration: "Self-paced", fare: "₹500–1,200/day", frequency: "Multiple rental shops" },
      { from: "Thekkady (Kumily)", to: "Local sightseeing", duration: "Self-paced", fare: "₹400–1,000/day", frequency: "Limited rental shops" }
    ],
    tips: [
      "Carry a valid driving licence and ID proof",
      "Royal Enfield and KTM popular choices for hill roads",
      "Fuel up in town — petrol pumps are scarce on remote stretches",
      "Wear warm layers and rain gear — weather changes quickly in the hills",
      "Roads are winding with hairpin bends — ride within your comfort zone"
    ]
  }
];
