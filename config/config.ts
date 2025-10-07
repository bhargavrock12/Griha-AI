import { Inspiration, ARStyle } from '../types';

export const BASE_DESIGN_STYLES = [
    { name: "Minimalist", description: "Emphasizes simplicity, neutral color palettes, and clean lines." },
    { name: "Bohemian", description: "A free-spirited, eclectic style with a mix of patterns and textures." },
    { name: "Modern Farmhouse", description: "A blend of rustic charm and modern simplicity." },
    { name: "Industrial", description: "Showcases exposed brick, metal, and raw materials." },
    { name: "Scandinavian", description: "Focuses on simplicity, functionality, and coziness (Hygge)." },
    { name: "Coastal", description: "A light and airy style inspired by the beach, using soft tones." },
    { name: "Art Deco", description: "A glamorous style known for bold geometric patterns and metallic finishes." },
    { name: "Mid-Century Modern", description: "Characterized by organic shapes, clean lines, and functionality." }
];

export const INDIAN_DESIGN_STYLES = [
    { name: "Mughal", description: "Opulent and symmetrical, featuring intricate floral patterns and arches." },
    { name: "Rajasthani", description: "Vibrant and royal, known for colorful textiles and mirror work." },
    { name: "Chettinad", description: "Stately mansions with large courtyards and Burmese teak." },
    { name: "Indian Colonial", description: "A blend of Victorian styles with Indian craftsmanship." },
    { name: "Kerala Mural Style", description: "Inspired by temple art, using earthy tones and traditional woodwork." },
    { name: "Contemporary Indian", description: "A modern fusion that combines minimalist principles with Indian textiles." }
];

export const roomTypes = ["Living Room", "Bedroom", "Kitchen", "Home Office", "Dining Room", "Bathroom", "Nursery"];

export const AR_STYLES: ARStyle[] = [
  {
    id: 'minimalist-ar',
    name: 'Minimalist',
    imageUrl: "assets/Scandivian_Serenity.png"
  },
  {
    id: 'bohemian-ar',
    name: 'Bohemian',
    imageUrl: "assets/Boehmian.png" },
  {
    id: 'mid-century-modern-ar',
    name: 'Mid-Century Modern',
    imageUrl: "assets/Mid_Century_Modern.png" },
  {
    id: 'contemporary-indian-ar',
    name: 'Contemporary Indian',
    imageUrl: "assets/Contemporary.png" },
];

// A comprehensive list of 12 hard-coded inspirations with pre-generated results.
export const INSPIRATIONS: Inspiration[] = [
    {
        id: 'scandi-serenity',
        title: 'Scandinavian Serenity',
        imageUrl: "assets/Scandivian_Serenity.png",
        inputs: {
            roomType: 'Living Room',
            dimensions: '15ft x 20ft', styles: ['Scandinavian', 'Minimalist'], budget: '₹2,50,000',
            description: 'A bright, airy Scandinavian living room with a focus on natural light, light oak woods, and cozy, neutral-toned textiles. Features a comfortable linen sofa, a minimalist coffee table, and functional, clean-lined storage.',
            designTradition: 'Western',
        },
        result: {
            id: 'scandi-serenity-res',
            imageUrl: "assets/Scandivian_Serenity.png",
            products: [
                { name: 'Light Oak Coffee Table', price: 22000, retailer: 'WoodenStreet', link: 'https://www.google.com/search?q=Light+Oak+Coffee+Table' },
                { name: 'Neutral Linen Sofa', price: 75000, retailer: 'Pepperfry', link: 'https://www.google.com/search?q=Neutral+Linen+Sofa' },
                { name: 'Woven Wool Rug', price: 18000, retailer: 'IKEA India', link: 'https://www.google.com/search?q=Woven+Wool+Rug' },
                { name: 'Minimalist Floor Lamp', price: 9000, retailer: 'Amazon.in', link: 'https://www.google.com/search?q=Minimalist+Floor+Lamp' },
            ],
            totalCost: 124000
        }
    },
    {
        id: 'jaipur-dreams',
        title: 'Jaipur Dreams',
        imageUrl: "assets/Rajasthani_Bedroom.png",
        inputs: {
            roomType: 'Bedroom',
            dimensions: '14ft x 16ft', styles: ['Rajasthani', 'Indian Colonial'], budget: '₹3,00,000',
            description: 'A vibrant bedroom inspired by Rajasthani palaces. Features a carved teak wood bed, colorful block-printed textiles, jali-work lamps, and a traditional jharokha-style mirror.',
            designTradition: 'Indian',
        },
        result: {
            id: 'jaipur-dreams-res',
            imageUrl: "assets/Rajasthani_Bedroom.png",
            products: [
                { name: 'Carved Teak Wood Bed', price: 85000, retailer: 'Fabindia', link: 'https://www.google.com/search?q=Carved+Teak+Wood+Bed' },
                { name: 'Block-Printed Quilt Set', price: 12000, retailer: 'Jaypore', link: 'https://www.google.com/search?q=Block-Printed+Quilt+Set' },
                { name: 'Jali Work Table Lamps', price: 7000, retailer: 'Local Artisan Market', link: 'https://www.google.com/search?q=Jali+Work+Table+Lamps' },
                { name: 'Jharokha Wall Mirror', price: 15000, retailer: 'Pepperfry', link: 'https://www.google.com/search?q=Jharokha+Wall+Mirror' },
            ],
            totalCost: 119000
        }
    },
    {
        id: 'boho-retreat',
        title: 'Bohemian Retreat',
        imageUrl: "assets/Boehmian.png",
        inputs: {
            roomType: 'Bedroom',
            dimensions: '12ft x 14ft', styles: ['Bohemian'], budget: '₹1,50,000',
            description: 'A free-spirited Bohemian bedroom filled with patterns, textures, and an abundance of plants. Includes a rattan bed frame, macrame wall hangings, and a variety of colorful, mismatched cushions and throws.',
            designTradition: 'Western',
        },
        result: {
            id: 'boho-retreat-res',
            imageUrl: "assets/Boehmian.png",
            products: [
                { name: 'Rattan Queen Bed', price: 40000, retailer: 'IKEA India', link: 'https://www.google.com/search?q=Rattan+Queen+Bed' },
                { name: 'Macrame Wall Hanging', price: 3500, retailer: 'Amazon.in', link: 'https://www.google.com/search?q=Macrame+Wall+Hanging' },
                { name: 'Jute Area Rug', price: 8000, retailer: 'Pepperfry', link: 'https://www.google.com/search?q=Jute+Area+Rug' },
                { name: 'Assorted Throw Pillows', price: 5000, retailer: 'Fabindia', link: 'https://www.google.com/search?q=Assorted+Throw+Pillows' },
            ],
            totalCost: 56500
        }
    },
    {
        id: 'mid-century-focus',
        title: 'Mid-Century Focus',
        imageUrl: "assets/Mid_Century_Modern.png",
        inputs: {
            roomType: 'Home Office',
            dimensions: '10ft x 12ft', styles: ['Mid-Century Modern'], budget: '₹2,00,000',
            description: 'A functional and stylish Mid-Century Modern home office. Features a teak wood desk with tapered legs, an iconic Eames-style chair, and geometric-patterned decor.',
            designTradition: 'Western',
        },
        result: {
            id: 'mid-century-focus-res',
            imageUrl: "assets/Mid_Century_Modern.png",
            products: [
                { name: 'Teak Wood Desk', price: 35000, retailer: 'West Elm', link: 'https://www.google.com/search?q=Teak+Wood+Desk' },
                { name: 'Eames Style Office Chair', price: 25000, retailer: 'Herman Miller', link: 'https://www.google.com/search?q=Eames+Style+Office+Chair' },
                { name: 'Sputnik Chandelier', price: 15000, retailer: 'Pepperfry', link: 'https://www.google.com/search?q=Sputnik+Chandelier' },
                { name: 'Geometric Print Rug', price: 9000, retailer: 'Amazon.in', link: 'https://www.google.com/search?q=Geometric+Print+Rug' },
            ],
            totalCost: 84000
        }
    },
    {
        id: 'chettinad-courtyard',
        title: 'Chettinad Courtyard',
        imageUrl: "assets/Chettinad.png",
        inputs: {
            roomType: 'Dining Room',
            dimensions: '18ft x 16ft', styles: ['Chettinad', 'Indian'], budget: '₹4,00,000',
            description: 'A grand dining room inspired by Chettinad mansions. Features a massive dark wood dining table, glossy walls, traditional Athangudi floor tiles, and brass decor elements.',
            designTradition: 'Indian',
        },
        result: {
            id: 'chettinad-courtyard-res',
            imageUrl: "assets/Chettinad.png",
            products: [
                { name: 'Rosewood Dining Table', price: 120000, retailer: 'Local Artisan', link: 'https://www.google.com/search?q=Rosewood+Dining+Table' },
                { name: 'Athangudi Tiles', price: 50000, retailer: 'Local Supplier', link: 'https://www.google.com/search?q=Athangudi+Tiles' },
                { name: 'Brass Urli Bowl', price: 8000, retailer: 'Fabindia', link: 'https://www.google.com/search?q=Brass+Urli+Bowl' },
                { name: 'Pendant Lamps', price: 12000, retailer: 'Pepperfry', link: 'https://www.google.com/search?q=Pendant+Lamps' },
            ],
            totalCost: 190000
        }
    },
    {
        id: 'industrial-loft',
        title: 'Industrial Loft Living',
        imageUrl: "assets/Industrial_Loft_Living.png",
        inputs: {
            roomType: 'Living Room',
            dimensions: '25ft x 30ft', styles: ['Industrial'], budget: '₹5,00,000',
            description: 'An open-concept industrial loft living room with exposed brick walls, high ceilings with metal pipes, a distressed leather sofa, and a raw wood and steel coffee table.',
            designTradition: 'Western',
        },
        result: {
            id: 'industrial-loft-res',
            imageUrl: "assets/Industrial_Loft_Living.png",
            products: [
                { name: 'Distressed Leather Sofa', price: 150000, retailer: 'Restoration Hardware', link: 'https://www.google.com/search?q=Distressed+Leather+Sofa' },
                { name: 'Steel and Wood Coffee Table', price: 28000, retailer: 'Crate & Barrel', link: 'https://www.google.com/search?q=Steel+and+Wood+Coffee+Table' },
                { name: 'Edison Bulb Chandelier', price: 18000, retailer: 'Amazon.in', link: 'https://www.google.com/search?q=Edison+Bulb+Chandelier' },
                { name: 'Reclaimed Wood Bookshelf', price: 45000, retailer: 'Pepperfry', link: 'https://www.google.com/search?q=Reclaimed+Wood+Bookshelf' },
            ],
            totalCost: 241000
        }
    },
    {
        id: 'mughal-opulence',
        title: 'Mughal Opulence',
        imageUrl: "assets/Mughal.png",
        inputs: {
            roomType: 'Bedroom',
            dimensions: '20ft x 18ft',
            styles: ['Mughal', 'Indian'],
            budget: '₹8,00,000',
            description: 'An opulent bedroom reflecting Mughal grandeur. Features walls with floral motifs, an arched headboard, silk drapes, and mother-of-pearl inlay furniture.',
            designTradition: 'Indian',
        },
        result: {
            id: 'mughal-opulence-res',
            imageUrl: "assets/Mughal.png",
            products: [
                { name: 'Inlay Work Bedside Tables', price: 60000, retailer: 'Local Artisan', link: 'https://www.google.com/search?q=Inlay+Work+Bedside+Tables' },
                { name: 'Silk Persian Rug', price: 120000, retailer: 'Obeetee', link: 'https://www.google.com/search?q=Silk+Persian+Rug' },
                { name: 'Arched Velvet Headboard', price: 75000, retailer: 'Custom Made', link: 'https://www.google.com/search?q=Arched+Velvet+Headboard' },
                { name: 'Crystal Chandelier', price: 90000, retailer: 'Pepperfry', link: 'https://www.google.com/search?q=Crystal+Chandelier' },
            ],
            totalCost: 345000
        }
    },
    {
        id: 'coastal-calm',
        title: 'Coastal Calm',
        imageUrl: "assets/Costal.png",
        inputs: {
            roomType: 'Living Room',
            dimensions: '16ft x 22ft',
            styles: ['Coastal'],
            budget: '₹3,50,000',
            description: 'A light, airy, and relaxing coastal living room. Dominated by shades of white, soft blues, and sandy beige. Features a slipcovered sofa, driftwood accents, and sheer curtains.',
            designTradition: 'Western',
        },
        result: {
            id: 'coastal-calm-res',
            imageUrl: "assets/Costal.png",
            products: [
                { name: 'White Slipcovered Sofa', price: 80000, retailer: 'Pottery Barn', link: 'https://www.google.com/search?q=White+Slipcovered+Sofa' },
                { name: 'Driftwood Coffee Table', price: 25000, retailer: 'Etsy', link: 'https://www.google.com/search?q=Driftwood+Coffee+Table' },
                { name: 'Sisal Area Rug', price: 15000, retailer: 'IKEA India', link: 'https://www.google.com/search?q=Sisal+Area+Rug' },
                { name: 'Sheer Linen Curtains', price: 6000, retailer: 'Amazon.in', link: 'https://www.google.com/search?q=Sheer+Linen+Curtains' },
            ],
            totalCost: 126000
        }
    },
    {
        id: 'kerala-tranquility',
        title: 'Kerala Tranquility',
        imageUrl: "assets/Kerala.png",
        inputs: {
            roomType: 'Bedroom',
            dimensions: '15ft x 15ft',
            styles: ['Kerala Mural Style', 'Indian'],
            budget: '₹2,80,000',
            description: 'A serene bedroom with Kerala mural art as a feature wall. The room is styled with traditional dark wood furniture, a nilavilakku (brass lamp), and handloom textiles.',
            designTradition: 'Indian',
        },
        result: {
            id: 'kerala-tranquility-res',
            imageUrl: "assets/Kerala.png",
            products: [
                { name: 'Dark Wood Bed Frame', price: 65000, retailer: 'Local Furniture Store', link: 'https://www.google.com/search?q=Dark+Wood+Bed+Frame' },
                { name: 'Kerala Mural Wall Decal', price: 5000, retailer: 'Amazon.in', link: 'https://www.google.com/search?q=Kerala+Mural+Wall+Decal' },
                { name: 'Nilavilakku Brass Lamp', price: 8000, retailer: 'Fabindia', link: 'https://www.google.com/search?q=Nilavilakku+Brass+Lamp' },
                { name: 'Kasavu Cotton Throw', price: 4000, retailer: 'Kerala Handloom', link: 'https://www.google.com/search?q=Kasavu+Cotton+Throw' },
            ],
            totalCost: 82000
        }
    },
    {
        id: 'art-deco-glamour',
        title: 'Art Deco Glamour',
        imageUrl: "assets/Art_Deco.png",
        inputs: {
            roomType: 'Dining Room',
            dimensions: '14ft x 18ft',
            styles: ['Art Deco'],
            budget: '₹6,00,000',
            description: 'A glamorous Art Deco dining room featuring a lacquered wood table, velvet chairs, a geometric brass chandelier, and a bold, patterned wallpaper on one wall.',
            designTradition: 'Western',
        },
        result: {
            id: 'art-deco-glamour-res',
            imageUrl: "assets/Art_Deco.png",
            products: [
                { name: 'Lacquered Dining Table', price: 90000, retailer: 'Jonathan Adler', link: 'https://www.google.com/search?q=Lacquered+Dining+Table' },
                { name: 'Velvet Dining Chairs', price: 60000, retailer: 'West Elm', link: 'https://www.google.com/search?q=Velvet+Dining+Chairs' },
                { name: 'Geometric Brass Chandelier', price: 45000, retailer: 'Pepperfry', link: 'https://www.google.com/search?q=Geometric+Brass+Chandelier' },
                { name: 'Art Deco Wallpaper', price: 15000, retailer: 'Nilaya by Asian Paints', link: 'https://www.google.com/search?q=Art+Deco+Wallpaper' },
            ],
            totalCost: 210000
        }
    },
    {
        id: 'farmhouse-feast',
        title: 'Modern Farmhouse Feast',
        imageUrl: "assets/Farmhouse.png",
        inputs: {
            roomType: 'Kitchen',
            dimensions: '18ft x 16ft',
            styles: ['Modern Farmhouse'],
            budget: '₹4,50,000',
            description: 'A charming Modern Farmhouse kitchen with white shaker cabinets, a large reclaimed wood island, subway tile backsplash, and matte black metal accents. It feels both rustic and clean.',
            designTradition: 'Western',
        },
        result: {
            id: 'farmhouse-feast-res',
            imageUrl: "assets/Farmhouse.png",
            products: [
                { name: 'White Shaker Cabinets', price: 180000, retailer: 'Local Contractor', link: 'https://www.google.com/search?q=White+Shaker+Cabinets' },
                { name: 'Reclaimed Wood Island', price: 70000, retailer: 'Custom Made', link: 'https://www.google.com/search?q=Reclaimed+Wood+Island' },
                { name: 'Matte Black Faucet', price: 8000, retailer: 'Amazon.in', link: 'https://www.google.com/search?q=Matte+Black+Faucet' },
                { name: 'Industrial Pendant Lights', price: 12000, retailer: 'Pepperfry', link: 'https://www.google.com/search?q=Industrial+Pendant+Lights' },
            ],
            totalCost: 270000
        }
    },
    {
        id: 'contemporary-fusion',
        title: 'Contemporary Indian Fusion',
        imageUrl: "assets/Contemporary.png",
        inputs: {
            roomType: 'Living Room',
            dimensions: '16ft x 20ft',
            styles: ['Contemporary Indian', 'Minimalist'],
            budget: '₹3,20,000',
            description: 'A contemporary living room that blends clean minimalist lines with distinct Indian elements. Features a simple sofa, but adds character with a block-printed rug, brass decor, and a Madhubani painting.',
            designTradition: 'Indian',
        },
        result: {
            id: 'contemporary-fusion-res',
            imageUrl: "assets/Contemporary.png",
            products: [
                { name: 'Minimalist Grey Sofa', price: 65000, retailer: 'IKEA India', link: 'https://www.google.com/search?q=Minimalist+Grey+Sofa' },
                { name: 'Hand-Blocked Dhurrie Rug', price: 15000, retailer: 'Jaipur Rugs', link: 'https://www.google.com/search?q=Hand-Blocked+Dhurrie+Rug' },
                { name: 'Madhubani Painting', price: 9000, retailer: 'Etsy', link: 'https://www.google.com/search?q=Madhubani+Painting' },
                { name: 'Brass Planters', price: 4000, retailer: 'Amazon.in', link: 'https://www.google.com/search?q=Brass+Planters' },
            ],
            totalCost: 93000
        }
    }
];