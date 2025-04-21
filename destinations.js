document.addEventListener("DOMContentLoaded", function () {
    // Load Navbar and Footer
    fetch("navbar.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("navbar-placeholder").innerHTML = data;
            initNavbar();
        })
        .catch(error => console.error('Error loading navbar:', error));

    fetch("footer.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("footer-placeholder").innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));

    // Initialize destinations
    initDestinations();
});

function initNavbar() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    window.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

// Global variable for all destinations
const allDestinations = [
    // Africa (10 destinations)
    {
        id: 1,
        title: "Marrakech, Morocco",
        image: "https://images.unsplash.com/photo-1518544866330-95a2b5d0e3e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "africa",
        activities: ["cultural", "adventure"],
        seasons: ["spring", "autumn"],
        description: "A vibrant city known for its medieval walled medina, bustling souks, and stunning palaces.",
        highlights: [
            "Explore the Jemaa el-Fnaa square",
            "Visit the Bahia Palace",
            "Wander through the souks",
            "Experience a traditional hammam",
            "Day trip to the Atlas Mountains"
        ],
        price: "$799"
    },
    {
        id: 2,
        title: "Cape Town, South Africa",
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80",
        region: "africa",
        activities: ["adventure", "wildlife", "beach"],
        seasons: ["summer", "autumn"],
        description: "A stunning coastal city with Table Mountain, beautiful beaches, and nearby wine regions.",
        highlights: [
            "Hike up Table Mountain",
            "Visit Robben Island",
            "Explore the Cape Peninsula",
            "Wine tasting in Stellenbosch",
            "Penguin spotting at Boulders Beach"
        ],
        price: "$1,199"
    },
    {
        id: 3,
        title: "Serengeti National Park, Tanzania",
        image: "https://images.unsplash.com/photo-1605568427561-42ef7a5b0d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "africa",
        activities: ["wildlife", "adventure"],
        seasons: ["summer", "winter"],
        description: "World-famous for the Great Migration and incredible wildlife viewing opportunities.",
        highlights: [
            "Witness the Great Migration",
            "Hot air balloon safari",
            "Big Five game viewing",
            "Visit Ngorongoro Crater",
            "Cultural visits to Maasai villages"
        ],
        price: "$2,499"
    },
    {
        id: 4,
        title: "Victoria Falls, Zambia/Zimbabwe",
        image: "https://images.unsplash.com/photo-1587330970470-1641136e5d0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "africa",
        activities: ["adventure", "wildlife"],
        seasons: ["summer", "autumn"],
        description: "One of the world's most spectacular waterfalls, known locally as 'The Smoke That Thunders'.",
        highlights: [
            "Helicopter flight over the falls",
            "White water rafting",
            "Devil's Pool swim",
            "Sunset cruise on the Zambezi",
            "Visit Livingstone Island"
        ],
        price: "$1,599"
    },
    {
        id: 5,
        title: "Zanzibar, Tanzania",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "africa",
        activities: ["beach", "cultural"],
        seasons: ["summer", "winter"],
        description: "Tropical island paradise with white sand beaches, turquoise waters, and rich Swahili culture.",
        highlights: [
            "Stone Town UNESCO site",
            "Prison Island giant tortoises",
            "Spice plantation tours",
            "Snorkeling at Mnemba Atoll",
            "Jozani Forest red colobus monkeys"
        ],
        price: "$1,299"
    },
    {
        id: 6,
        title: "Cairo, Egypt",
        image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "africa",
        activities: ["cultural", "adventure"],
        seasons: ["spring", "autumn"],
        description: "Home to the Great Pyramids of Giza and the Sphinx, with millennia of history to explore.",
        highlights: [
            "Great Pyramids of Giza",
            "Egyptian Museum",
            "Khan el-Khalili bazaar",
            "Nile River cruise",
            "Day trip to Alexandria"
        ],
        price: "$999"
    },
    {
        id: 7,
        title: "Maasai Mara, Kenya",
        image: "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "africa",
        activities: ["wildlife", "adventure"],
        seasons: ["summer", "autumn"],
        description: "Famous for its exceptional population of wildlife and the annual wildebeest migration.",
        highlights: [
            "Game drives to see the Big Five",
            "Hot air balloon safari",
            "Cultural visits to Maasai villages",
            "Photographic safaris",
            "River crossings during migration"
        ],
        price: "$2,799"
    },
    {
        id: 8,
        title: "Djenne, Mali",
        image: "https://images.unsplash.com/photo-1515658323406-25d61c141a6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "africa",
        activities: ["cultural", "adventure"],
        seasons: ["winter"],
        description: "Home to the world's largest mud-brick building and a UNESCO World Heritage site.",
        highlights: [
            "Great Mosque of Djenne",
            "Monday market day",
            "Traditional mudcloth weaving",
            "Boat trips on the Bani River",
            "Nearby Timbuktu excursions"
        ],
        price: "$1,899"
    },
    {
        id: 9,
        title: "Sossusvlei, Namibia",
        image: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "africa",
        activities: ["adventure", "wildlife"],
        seasons: ["winter", "spring"],
        description: "Famous for its towering red sand dunes and stark desert landscapes.",
        highlights: [
            "Climb Dune 45 at sunrise",
            "Dead Vlei clay pan",
            "Hot air balloon rides",
            "Desert-adapted wildlife",
            "Stargazing in the desert"
        ],
        price: "$2,199"
    },
    {
        id: 10,
        title: "Luxor, Egypt",
        image: "https://images.unsplash.com/photo-1526397751294-331021109fbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        region: "africa",
        activities: ["cultural", "adventure"],
        seasons: ["winter", "spring"],
        description: "Often called the world's greatest open-air museum, with ancient temples and tombs.",
        highlights: [
            "Valley of the Kings",
            "Karnak Temple complex",
            "Luxor Temple",
            "Hot air balloon over West Bank",
            "Nile felucca rides"
        ],
        price: "$1,499"
    },

    // Asia (15 destinations)
    {
        id: 11,
        title: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
        region: "asia",
        activities: ["beach", "cultural", "wellness"],
        seasons: ["summer", "autumn"],
        description: "Tropical paradise with lush jungles, stunning beaches, and vibrant culture.",
        highlights: [
            "Ubud's rice terraces",
            "Seminyak's luxury resorts",
            "Uluwatu's cliffside views",
            "Traditional Balinese dance",
            "World-class surfing"
        ],
        price: "$899"
    },
    {
        id: 12,
        title: "Kyoto, Japan",
        image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80",
        region: "asia",
        activities: ["cultural", "wellness"],
        seasons: ["spring", "autumn"],
        description: "Ancient capital with temples, tea houses, and stunning cherry blossoms.",
        highlights: [
            "Fushimi Inari Shrine",
            "Kinkaku-ji Golden Pavilion",
            "Arashiyama Bamboo Forest",
            "Traditional tea ceremony",
            "Gion district geisha culture"
        ],
        price: "$2,499"
    },
    {
        id: 13,
        title: "Hoi An, Vietnam",
        image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "asia",
        activities: ["cultural", "beach"],
        seasons: ["spring", "autumn"],
        description: "Charming ancient town with lantern-lit streets, tailors, and nearby beaches.",
        highlights: [
            "Ancient Town UNESCO site",
            "Japanese Covered Bridge",
            "Tailor-made clothing",
            "Cooking classes",
            "An Bang Beach"
        ],
        price: "$699"
    },
    {
        id: 14,
        title: "Jaipur, India",
        image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        region: "asia",
        activities: ["cultural", "adventure"],
        seasons: ["winter", "spring"],
        description: "The Pink City, known for its stunning palaces, forts, and vibrant markets.",
        highlights: [
            "Amber Fort",
            "Hawa Mahal",
            "City Palace",
            "Jantar Mantar observatory",
            "Local textile shopping"
        ],
        price: "$799"
    },
    {
        id: 15,
        title: "Luang Prabang, Laos",
        image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        region: "asia",
        activities: ["cultural", "wellness"],
        seasons: ["winter", "spring"],
        description: "Serene UNESCO-listed town with Buddhist temples and French colonial architecture.",
        highlights: [
            "Alms giving ceremony",
            "Kuang Si Falls",
            "Night market",
            "Mount Phousi sunset views",
            "Mekong River cruises"
        ],
        price: "$899"
    },
    {
        id: 16,
        title: "Seoul, South Korea",
        image: "https://images.unsplash.com/photo-1538485399081-7f897e4255c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        region: "asia",
        activities: ["cultural", "wellness"],
        seasons: ["spring", "autumn"],
        description: "Vibrant metropolis blending ancient palaces with cutting-edge technology.",
        highlights: [
            "Gyeongbokgung Palace",
            "Bukchon Hanok Village",
            "DMZ tour",
            "Namsan Seoul Tower",
            "Korean BBQ and street food"
        ],
        price: "$1,599"
    },
    {
        id: 17,
        title: "Angkor Wat, Cambodia",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        region: "asia",
        activities: ["cultural", "adventure"],
        seasons: ["winter", "spring"],
        description: "The world's largest religious monument and a stunning archaeological site.",
        highlights: [
            "Angkor Wat sunrise",
            "Ta Prohm (Tomb Raider temple)",
            "Bayon's smiling faces",
            "Banteay Srei's carvings",
            "Tonle Sap floating villages"
        ],
        price: "$999"
    },
    {
        id: 18,
        title: "Himalayas, Nepal",
        image: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "asia",
        activities: ["adventure", "wellness"],
        seasons: ["spring", "autumn"],
        description: "The world's highest mountain range offering incredible trekking opportunities.",
        highlights: [
            "Everest Base Camp trek",
            "Annapurna Circuit",
            "Pokhara's lakeside",
            "Kathmandu's temples",
            "Mountain flightseeing"
        ],
        price: "$1,299"
    },
    {
        id: 19,
        title: "Singapore",
        image: "https://images.unsplash.com/photo-1532703109991-1e5828f1e9c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "asia",
        activities: ["cultural", "wellness"],
        seasons: ["all"],
        description: "Modern city-state with diverse cultures, futuristic gardens, and world-class cuisine.",
        highlights: [
            "Gardens by the Bay",
            "Marina Bay Sands",
            "Chinatown and Little India",
            "Sentosa Island",
            "Hawker center food"
        ],
        price: "$1,799"
    },
    {
        id: 20,
        title: "Shanghai, China",
        image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "asia",
        activities: ["cultural"],
        seasons: ["spring", "autumn"],
        description: "Ultra-modern metropolis with historic neighborhoods and futuristic skyline.",
        highlights: [
            "The Bund waterfront",
            "Yu Garden",
            "Shanghai Tower",
            "French Concession",
            "Zhujiajiao water town"
        ],
        price: "$1,499"
    },
    {
        id: 21,
        title: "Boracay, Philippines",
        image: "https://images.unsplash.com/photo-1582034986517-1d989ff7a8a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "asia",
        activities: ["beach", "wellness"],
        seasons: ["winter", "spring"],
        description: "Tiny island famous for its powdery white sand beaches and vibrant nightlife.",
        highlights: [
            "White Beach",
            "Puka Shell Beach",
            "Island hopping",
            "Helmet diving",
            "Sunset sailing"
        ],
        price: "$1,099"
    },
    {
        id: 22,
        title: "Petra, Jordan",
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        region: "asia",
        activities: ["cultural", "adventure"],
        seasons: ["spring", "autumn"],
        description: "Ancient Nabatean city carved into rose-red cliffs, known as the 'Lost City'.",
        highlights: [
            "The Treasury (Al-Khazneh)",
            "The Monastery (Ad-Deir)",
            "Siq canyon walk",
            "High Place of Sacrifice",
            "Wadi Rum desert"
        ],
        price: "$1,899"
    },
    {
        id: 23,
        title: "Maldives",
        image: "https://images.unsplash.com/photo-1573995974701-1af577c7de08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "asia",
        activities: ["beach", "wellness"],
        seasons: ["winter", "spring"],
        description: "Tropical paradise with overwater bungalows and crystal-clear lagoons.",
        highlights: [
            "Overwater villa stays",
            "Snorkeling with manta rays",
            "Sandbank picnics",
            "Spa treatments over water",
            "Bioluminescent beaches"
        ],
        price: "$2,999"
    },
    {
        id: 24,
        title: "Bhutan",
        image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        region: "asia",
        activities: ["cultural", "wellness"],
        seasons: ["spring", "autumn"],
        description: "Himalayan kingdom focused on Gross National Happiness with stunning dzongs.",
        highlights: [
            "Tiger's Nest Monastery",
            "Punakha Dzong",
            "Thimphu's markets",
            "Traditional hot stone baths",
            "Himalayan trekking"
        ],
        price: "$3,499"
    },
    {
        id: 25,
        title: "Taipei, Taiwan",
        image: "https://images.unsplash.com/photo-1580034283359-822a8c0a8a7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "asia",
        activities: ["cultural", "wellness"],
        seasons: ["spring", "autumn"],
        description: "Dynamic capital known for night markets, hot springs, and Taipei 101 skyscraper.",
        highlights: [
            "Taipei 101 observatory",
            "Shilin Night Market",
            "Beitou hot springs",
            "National Palace Museum",
            "Maokong gondola"
        ],
        price: "$1,299"
    },

    // Europe (15 destinations)
    {
        id: 26,
        title: "Paris, France",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1520&q=80",
        region: "europe",
        activities: ["cultural", "wellness"],
        seasons: ["spring", "summer", "autumn"],
        description: "The City of Light, renowned for its art, architecture, and cuisine.",
        highlights: [
            "Eiffel Tower",
            "Louvre Museum",
            "Montmartre",
            "Seine River cruise",
            "French gastronomy"
        ],
        price: "$1,299"
    },
    {
        id: 27,
        title: "Santorini, Greece",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1534&q=80",
        region: "europe",
        activities: ["beach", "cultural"],
        seasons: ["summer"],
        description: "Famous for whitewashed buildings with blue domes overlooking the Aegean Sea.",
        highlights: [
            "Oia's sunset views",
            "Red Beach",
            "Ancient Akrotiri ruins",
            "Wine tasting tours",
            "Caldera cruise"
        ],
        price: "$1,599"
    },
    {
        id: 28,
        title: "Rome, Italy",
        image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
        region: "europe",
        activities: ["cultural"],
        seasons: ["spring", "autumn"],
        description: "The Eternal City with ancient ruins, Renaissance art, and vibrant street life.",
        highlights: [
            "Colosseum",
            "Vatican City",
            "Trevi Fountain",
            "Roman Forum",
            "Trastevere neighborhood"
        ],
        price: "$1,199"
    },
    {
        id: 29,
        title: "Barcelona, Spain",
        image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "europe",
        activities: ["cultural", "beach"],
        seasons: ["spring", "summer", "autumn"],
        description: "Cosmopolitan city with Gaudí architecture, Mediterranean beaches, and vibrant nightlife.",
        highlights: [
            "Sagrada Familia",
            "Park Güell",
            "La Rambla",
            "Gothic Quarter",
            "Barceloneta beach"
        ],
        price: "$1,099"
    },
    {
        id: 30,
        title: "Amsterdam, Netherlands",
        image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "europe",
        activities: ["cultural"],
        seasons: ["spring", "summer"],
        description: "Canals, cycling, and world-class museums in this liberal European capital.",
        highlights: [
            "Van Gogh Museum",
            "Anne Frank House",
            "Canal cruises",
            "Rijksmuseum",
            "Bloemenmarkt"
        ],
        price: "$1,199"
    },
    {
        id: 31,
        title: "Prague, Czech Republic",
        image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "europe",
        activities: ["cultural"],
        seasons: ["spring", "autumn"],
        description: "Fairytale city with a medieval old town, castle, and famous astronomical clock.",
        highlights: [
            "Charles Bridge",
            "Prague Castle",
            "Old Town Square",
            "Jewish Quarter",
            "Czech beer tasting"
        ],
        price: "$899"
    },
    {
        id: 32,
        title: "Swiss Alps, Switzerland",
        image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "europe",
        activities: ["adventure", "wellness"],
        seasons: ["winter", "summer"],
        description: "Majestic mountains offering world-class skiing and breathtaking hiking trails.",
        highlights: [
            "Jungfraujoch railway",
            "Zermatt and Matterhorn",
            "Interlaken adventure sports",
            "Luxury mountain resorts",
            "Scenic train journeys"
        ],
        price: "$2,199"
    },
    {
        id: 33,
        title: "Dubrovnik, Croatia",
        image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "europe",
        activities: ["cultural", "beach"],
        seasons: ["summer"],
        description: "Stunning walled city on the Adriatic coast, known as the 'Pearl of the Adriatic'.",
        highlights: [
            "Walk the city walls",
            "Game of Thrones filming sites",
            "Lokrum Island",
            "Cable car to Mount Srd",
            "Elafiti Islands cruise"
        ],
        price: "$1,299"
    },
    {
        id: 34,
        title: "Edinburgh, Scotland",
        image: "https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "europe",
        activities: ["cultural"],
        seasons: ["summer"],
        description: "Historic capital with a dramatic castle, medieval old town, and literary heritage.",
        highlights: [
            "Edinburgh Castle",
            "Royal Mile",
            "Arthur's Seat hike",
            "Whisky tasting",
            "Edinburgh Festival (August)"
        ],
        price: "$1,099"
    },
    {
        id: 35,
        title: "Reykjavik, Iceland",
        image: "https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "europe",
        activities: ["adventure"],
        seasons: ["summer", "winter"],
        description: "Gateway to Iceland's stunning landscapes, geothermal pools, and Northern Lights.",
        highlights: [
            "Golden Circle tour",
            "Blue Lagoon",
            "Northern Lights viewing",
            "South Coast waterfalls",
            "Whale watching"
        ],
        price: "$1,799"
    },
    {
        id: 36,
        title: "Budapest, Hungary",
        image: "https://images.unsplash.com/photo-1551867633-194f125bddfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "europe",
        activities: ["cultural", "wellness"],
        seasons: ["spring", "autumn"],
        description: "The 'Paris of the East' with thermal baths, grand architecture, and Danube views.",
        highlights: [
            "Széchenyi Thermal Bath",
            "Buda Castle",
            "Parliament building",
            "Fisherman's Bastion",
            "Ruin bars"
        ],
        price: "$899"
    },
    {
        id: 37,
        title: "Venice, Italy",
        image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "europe",
        activities: ["cultural"],
        seasons: ["spring", "autumn"],
        description: "Romantic canal city with historic palaces, bridges, and gondola rides.",
        highlights: [
            "St. Mark's Square",
            "Grand Canal",
            "Rialto Bridge",
            "Murano glass island",
            "Carnival masks"
        ],
        price: "$1,499"
    },
    {
        id: 38,
        title: "Vienna, Austria",
        image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
        region: "europe",
        activities: ["cultural", "wellness"],
        seasons: ["spring", "autumn"],
        description: "Imperial capital known for classical music, coffee houses, and baroque architecture.",
        highlights: [
            "Schönbrunn Palace",
            "Vienna State Opera",
            "Belvedere Museum",
            "St. Stephen's Cathedral",
            "Café culture"
        ],
        price: "$1,199"
    },
    {
        id: 39,
        title: "Lisbon, Portugal",
        image: "https://images.unsplash.com/photo-1580041065738-e72023778cd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "europe",
        activities: ["cultural", "beach"],
        seasons: ["spring", "summer", "autumn"],
        description: "Hilly coastal capital with trams, azulejos, and nearby Atlantic beaches.",
        highlights: [
            "Belém Tower",
            "Alfama district",
            "Tram 28 ride",
            "Sintra day trip",
            "Pastéis de Belém"
        ],
        price: "$999"
    },
    {
        id: 40,
        title: "St. Petersburg, Russia",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        region: "europe",
        activities: ["cultural"],
        seasons: ["summer"],
        description: "Imperial city with world-class museums, canals, and opulent palaces.",
        highlights: [
            "Hermitage Museum",
            "Church of the Savior on Spilled Blood",
            "Peterhof Palace",
            "White Nights festival",
            "Mariinsky Theatre"
        ],
        price: "$1,599"
    },

    // North America (5 destinations)
    {
        id: 41,
        title: "New York City, USA",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "north-america",
        activities: ["cultural"],
        seasons: ["spring", "autumn"],
        description: "The city that never sleeps, with iconic landmarks and endless energy.",
        highlights: [
            "Times Square",
            "Central Park",
            "Statue of Liberty",
            "Broadway shows",
            "Museum Mile"
        ],
        price: "$1,499"
    },
    {
        id: 42,
        title: "Banff National Park, Canada",
        image: "https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "north-america",
        activities: ["adventure"],
        seasons: ["summer", "winter"],
        description: "Stunning Canadian Rockies with turquoise lakes and world-class skiing.",
        highlights: [
            "Lake Louise",
            "Moraine Lake",
            "Banff Gondola",
            "Johnston Canyon",
            "Skiing at Sunshine Village"
        ],
        price: "$1,799"
    },
    {
        id: 43,
        title: "Grand Canyon, USA",
        image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
        region: "north-america",
        activities: ["adventure"],
        seasons: ["spring", "autumn"],
        description: "One of the world's most spectacular natural wonders, carved by the Colorado River.",
        highlights: [
            "South Rim viewpoints",
            "Havasu Falls hike",
            "Colorado River rafting",
            "Helicopter tours",
            "Grand Canyon Railway"
        ],
        price: "$1,299"
    },
    {
        id: 44,
        title: "Tulum, Mexico",
        image: "https://images.unsplash.com/photo-1525873020571-08690094e301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "north-america",
        activities: ["beach", "cultural"],
        seasons: ["winter", "spring"],
        description: "Boho-chic beach town with Mayan ruins and cenotes on the Caribbean coast.",
        highlights: [
            "Tulum Ruins",
            "Gran Cenote",
            "Sian Ka'an Biosphere",
            "Beachfront yoga",
            "Playa Paraíso"
        ],
        price: "$1,099"
    },
    {
        id: 45,
        title: "Yosemite National Park, USA",
        image: "https://images.unsplash.com/photo-1458966480358-a0ac9de99c9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "north-america",
        activities: ["adventure"],
        seasons: ["summer"],
        description: "Iconic granite cliffs, waterfalls, and giant sequoias in California's Sierra Nevada.",
        highlights: [
            "El Capitan",
            "Half Dome hike",
            "Yosemite Falls",
            "Glacier Point",
            "Mariposa Grove"
        ],
        price: "$1,399"
    },

    // South America (5 destinations)
    {
        id: 46,
        title: "Rio de Janeiro, Brazil",
        image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "south-america",
        activities: ["beach", "adventure"],
        seasons: ["summer"],
        description: "Vibrant city with stunning beaches, lush mountains, and carnival spirit.",
        highlights: [
            "Christ the Redeemer",
            "Copacabana Beach",
            "Sugarloaf Mountain",
            "Tijuca Forest",
            "Samba clubs"
        ],
        price: "$1,099"
    },
    {
        id: 47,
        title: "Machu Picchu, Peru",
        image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "south-america",
        activities: ["cultural", "adventure"],
        seasons: ["winter", "spring"],
        description: "Ancient Incan city high in the Andes mountains with breathtaking views.",
        highlights: [
            "Inca Trail trek",
            "Sun Gate at sunrise",
            "Huayna Picchu hike",
            "Sacred Valley tour",
            "Cusco exploration"
        ],
        price: "$1,499"
    },
    {
        id: 48,
        title: "Galapagos Islands, Ecuador",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
        region: "south-america",
        activities: ["wildlife", "adventure"],
        seasons: ["all"],
        description: "Unique archipelago with incredible wildlife that inspired Darwin's theory of evolution.",
        highlights: [
            "Giant tortoises",
            "Blue-footed boobies",
            "Snorkeling with sea lions",
            "Island-hopping cruises",
            "Lava tunnels"
        ],
        price: "$2,999"
    },
    {
        id: 49,
        title: "Patagonia, Chile/Argentina",
        image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1530&q=80",
        region: "south-america",
        activities: ["adventure"],
        seasons: ["summer"],
        description: "Vast wilderness with glaciers, mountains, and unique wildlife at the end of the world.",
        highlights: [
            "Torres del Paine trek",
            "Perito Moreno Glacier",
            "Fitz Roy mountain",
            "Penguin colonies",
            "Estancia stays"
        ],
        price: "$2,499"
    },
    {
        id: 50,
        title: "Cartagena, Colombia",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        region: "south-america",
        activities: ["cultural", "beach"],
        seasons: ["winter", "spring"],
        description: "Colorful colonial city on the Caribbean coast with nearby tropical islands.",
        highlights: [
            "Walled City",
            "Getsemaní neighborhood",
            "Rosario Islands",
            "Castillo San Felipe",
            "Gabriel García Márquez sites"
        ],
        price: "$999"
    }
];

function initDestinations() {
    const destinationsGrid = document.getElementById("destinationsGrid");
    const pagination = document.getElementById("pagination");
    const destinationModal = new bootstrap.Modal(document.getElementById('destinationModal'));
    const filterButton = document.getElementById("filterButton");
    
    // Pagination variables
    let currentPage = 1;
    const itemsPerPage = 16;
    let filteredDestinations = [...allDestinations];
    
    // Display destinations with pagination
    function displayDestinations(destinations, page = 1) {
        destinationsGrid.innerHTML = '';
        
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = destinations.slice(startIndex, endIndex);
        
        if (paginatedItems.length === 0) {
            destinationsGrid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <h4>No destinations found matching your criteria</h4>
                    <p>Try adjusting your filters</p>
                </div>
            `;
            return;
        }
        
        paginatedItems.forEach(destination => {
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4 col-xl-3';
            card.innerHTML = `
                <div class="card border-0 shadow-sm h-100 destination-card" data-id="${destination.id}">
                    <div class="position-relative">
                        <img src="${destination.image}" class="card-img-top destination-card-img" alt="${destination.title}" loading="lazy">
                        <span class="badge bg-primary destination-badge">${destination.region.replace('-', ' ').toUpperCase()}</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${destination.title}</h5>
                        <div class="d-flex flex-wrap gap-1 mb-2">
                            ${destination.activities.map(a => `<span class="badge bg-success">${a.charAt(0).toUpperCase() + a.slice(1)}</span>`).join('')}
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-primary fw-bold">From ${destination.price}</span>
                            <button class="btn btn-sm btn-outline-primary">Details</button>
                        </div>
                    </div>
                </div>
            `;
            destinationsGrid.appendChild(card);
        });
        
        // Setup pagination
        setupPagination(destinations, page);
    }
    
    function setupPagination(destinations, page) {
        pagination.innerHTML = '';
        const pageCount = Math.ceil(destinations.length / itemsPerPage);
        
        if (pageCount <= 1) return;
        
        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${page === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="#" tabindex="-1">Previous</a>`;
        prevLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (page > 1) {
                currentPage = page - 1;
                displayDestinations(filteredDestinations, currentPage);
                window.scrollTo({top: 0, behavior: 'smooth'});
            }
        });
        pagination.appendChild(prevLi);
        
        // Page numbers
        for (let i = 1; i <= pageCount; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === page ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            li.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                displayDestinations(filteredDestinations, currentPage);
                window.scrollTo({top: 0, behavior: 'smooth'});
            });
            pagination.appendChild(li);
        }
        
        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${page === pageCount ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a class="page-link" href="#">Next</a>`;
        nextLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (page < pageCount) {
                currentPage = page + 1;
                displayDestinations(filteredDestinations, currentPage);
                window.scrollTo({top: 0, behavior: 'smooth'});
            }
        });
        pagination.appendChild(nextLi);
    }
    
    // Set up click handlers for destination cards
    document.addEventListener('click', function(e) {
        if (e.target.closest('.destination-card')) {
            const card = e.target.closest('.destination-card');
            const destinationId = parseInt(card.getAttribute('data-id'));
            const destination = allDestinations.find(d => d.id === destinationId);
            
            if (destination) {
                showDestinationModal(destination);
            }
        }
    });

    // Set up filter functionality
    filterButton.addEventListener('click', function() {
        const region = document.getElementById('regionFilter').value;
        const activity = document.getElementById('activityFilter').value;
        const season = document.getElementById('seasonFilter').value;
        
        // Filter the destinations based on selections
        filteredDestinations = allDestinations.filter(destination => {
            return (region === 'all' || destination.region === region) &&
                   (activity === 'all' || destination.activities.includes(activity)) &&
                   (season === 'all' || destination.seasons.includes(season));
        });
        
        // Reset to first page when filtering
        currentPage = 1;
        
        // Display filtered destinations
        displayDestinations(filteredDestinations, currentPage);
    });

    function showDestinationModal(destination) {
        // Set modal content
        document.getElementById('modalDestinationTitle').textContent = destination.title;
        document.getElementById('modalDestinationImage').src = destination.image;
        document.getElementById('modalDestinationImage').alt = destination.title;
        document.getElementById('modalDestinationDescription').textContent = destination.description;
        document.getElementById('modalDestinationPrice').textContent = destination.price;
        
        // Set region and activities badges
        document.getElementById('modalDestinationRegion').textContent = 
            destination.region.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        document.getElementById('modalDestinationActivities').textContent = 
            destination.activities.map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(', ');
        
        document.getElementById('modalDestinationSeasons').textContent = 
            destination.seasons.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ');
        
        // Set highlights
        const highlightsList = document.getElementById('modalDestinationHighlights');
        highlightsList.innerHTML = '';
        destination.highlights.forEach(highlight => {
            const li = document.createElement('li');
            li.textContent = highlight;
            highlightsList.appendChild(li);
        });
        
        // Show modal
        destinationModal.show();
    }
    
    // Initial display
    displayDestinations(allDestinations, currentPage);
}