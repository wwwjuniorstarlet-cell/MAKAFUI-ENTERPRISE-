import { Product, SmartPaintPreset } from '../types';

import nailsWireImg from '../assets/images/nails_wire_materials_1787993886359.jpg';
import roofingImg from '../assets/images/roofing_sheets_metal_1787993899544.jpg';
import ironRodsImg from '../assets/images/iron_rods_rebar_1787993912588.jpg';
import cementImg from '../assets/images/cement_bags_depot_1787993924865.jpg';
import wheelbarrowHeavyImg from '../assets/images/wheelbarrow_heavy_1787994070875.jpg';
import hammersTrowelsImg from '../assets/images/hammers_trowels_tools_1787994059584.jpg';
import waterPolytanksImg from '../assets/images/water_storage_polytanks_1787993950021.jpg';
import timberImg from '../assets/images/timber_wood_lumber_1787993962186.jpg';
import paintBucketsImg from '../assets/images/paint_buckets_cans_1787993974133.jpg';
import chippingsSandImg from '../assets/images/chippings_gravel_sand_1787993992439.jpg';
import plumbingImg from '../assets/images/plumbing_pipes_fittings_1787994003736.jpg';
import electricalImg from '../assets/images/electrical_supplies_1787994015148.jpg';
import doorsWindowsImg from '../assets/images/doors_windows_fixtures_1787994026920.jpg';
import provisionMartImg from '../assets/images/barber_provisions_1787994040441.jpg';
import barberShopImg from '../assets/images/makafui_provision_barber_1787993490424.jpg';

export const BUSINESS_INFO = {
  name: 'MAKAFUI ENTERPRISE',
  tagline: 'BUILDING MATERIALS, CONVENIENCE & SERVICES DEPOT',
  slogan: 'QUALITY MATERIALS • RELIABLE SERVICE • BEST VALUE',
  location: 'Ho-Titrinu, Volta Region, Ghana',
  locationDetails: 'Main Ho–Titrinu Road, Volta Region, Ghana (Direct access for tippers, flatbed trucks, and private pickups)',
  phoneDisplay: '024 857 9070',
  phoneRaw: '0248579070',
  phoneInternational: '+233248579070',
  whatsappNumber: '233248579070',
  openingHours: '7:00 AM – 5:00 PM',
  openingDays: 'Monday – Saturday',
  closedDays: 'Sunday (Closed / WhatsApp orders 24/7)',
  email: 'info@makafuienterprise.com',
  welcomeText: 'Visit MAKAFUI ENTERPRISE in Ho-Titrinu for genuine building materials, tools, water tanks, provisions, and salon grooming!',
};

export const SMART_PAINT_PALETTES: SmartPaintPreset[] = [
  {
    id: 'sp-1',
    name: 'Titanium Pure White',
    hex: '#F8FAFC',
    family: 'neutral',
    popularFor: 'Ceilings & Exterior Facades',
    finishRecommended: 'Heat-Reflective Matt',
  },
  {
    id: 'sp-2',
    name: 'Warm Sandstone',
    hex: '#EAD7BA',
    family: 'warm',
    popularFor: 'Living Rooms & Front Porches',
    finishRecommended: 'Smart Satin Washable',
  },
  {
    id: 'sp-3',
    name: 'Mountain Mist Grey',
    hex: '#94A3B8',
    family: 'cool',
    popularFor: 'Modern Residential Exteriors',
    finishRecommended: 'WeatherGuard Anti-Fungal',
  },
  {
    id: 'sp-4',
    name: 'Golden Savannah Ochre',
    hex: '#D97706',
    family: 'accent',
    popularFor: 'Accent Walls & Commercial Pillars',
    finishRecommended: 'WeatherArmor Silk',
  },
  {
    id: 'sp-5',
    name: 'Lagoon Coastal Turquoise',
    hex: '#0D9488',
    family: 'accent',
    popularFor: 'Kitchens, Bathrooms & Features',
    finishRecommended: 'Smart Aqua-Block DampGuard',
  },
  {
    id: 'sp-6',
    name: 'Forest Sage Green',
    hex: '#4D7C0F',
    family: 'cool',
    popularFor: 'Perimeter Walls & Garden Villas',
    finishRecommended: 'Anti-Algae WeatherShield',
  },
  {
    id: 'sp-7',
    name: 'Volta Clay Terracotta',
    hex: '#C2410C',
    family: 'warm',
    popularFor: 'Corridors, Columns & Verandas',
    finishRecommended: 'Durable Texture Matt',
  },
  {
    id: 'sp-8',
    name: 'Midnight Royal Navy',
    hex: '#1E293B',
    family: 'neutral',
    popularFor: 'Fascia Boards, Gates & Trims',
    finishRecommended: 'Anti-Rust Smart Gloss',
  },
];

export const PRODUCTS: Product[] = [
  // 1. CEMENT
  {
    id: 'cem-ghacem-extra-42',
    name: 'Cement Bags (Ghacem, Dangote, Diamond, Dura Bond, Sol Cement)',
    category: 'cement',
    subcategory: 'Grade 42.5R & 32.5R Portland Cement',
    description:
      'Original factory-sealed 50kg cement bags from Ghana’s leading certified manufacturers: Ghacem Extra (42.5R) & Super Rapid (32.5R), Dura Bond 42.5R, Diamond Cement, Dangote Falcon, and Sol Cement. Ideal for heavy structural concrete, slabs, pillars, block laying, and plaster screeding.',
    unit: '50kg Bag',
    inStock: true,
    featured: true,
    badge: 'Original Stock & All Brands',
    specs: [
      'Brands: Ghacem (42.5R / 32.5R), Dura Bond, Diamond, Dangote & Sol Cement',
      'Original moisture-sealed 50kg standard bags',
      'Ghana Standards Authority (GSA) certified',
      'Direct depot loading & site delivery across Volta Region',
    ],
    imageUrl: cementImg,
    imagePlaceholderColor: '#475569',
  },

  // 2. IRON RODS & REBAR
  {
    id: 'rod-high-tensile-12mm',
    name: 'Iron Rods & High-Tensile Steel Rebar (10mm, 12mm, 16mm, 20mm & BRC Mesh)',
    category: 'iron-rods',
    subcategory: 'BS 4449 Grade 500 High-Tensile Deformed Bars',
    description:
      'Mill-certified high-tensile deformed rebar for foundations, columns, lintels, suspended slabs, retaining walls, and civil structures. Available in full 12-meter lengths in 10mm, 12mm, 16mm, 20mm diameters, plus BRC reinforcement wire mesh rolls.',
    unit: '12-Meter Length / Tonne',
    inStock: true,
    featured: true,
    badge: 'Grade 500 Steel',
    specs: [
      'Available Diameters: 10mm, 12mm, 16mm, 20mm & BRC Mesh',
      'Standard 12-meter straight bundle lengths',
      'Ribbed high-adhesion surface for concrete bonding',
      'Free on-site cutting & bundle loading at Ho-Titrinu yard',
    ],
    imageUrl: ironRodsImg,
    imagePlaceholderColor: '#334155',
  },

  // 3. ROOFING SHEETS
  {
    id: 'roof-aluzinc-14ft',
    name: 'Aluzinc & IBR Metal Roofing Sheets (0.40mm, 0.45mm, 0.50mm)',
    category: 'roofing',
    subcategory: 'Anti-Corrosion Coated Aluminum-Zinc Alloy',
    description:
      'Heavy-gauge, heat-reflective Aluzinc and IBR longspan metal roofing sheets designed for maximum tropical weather resistance. Available in multiple gauges (0.40mm, 0.45mm, 0.50mm) and custom lengths (10ft to 20ft), alongside matching ridge caps and valley gutters.',
    unit: '14ft / Custom Sheet',
    inStock: true,
    featured: true,
    badge: 'Anti-Rust Coating',
    specs: [
      'Profiles: IBR Trapezoidal & Classic Corrugated',
      'Gauges: 0.40mm, 0.45mm, 0.50mm Heavy Duty',
      'Heat-reflective & leak-resistant zinc-aluminum coating',
      'Available lengths: 10ft, 12ft, 14ft, 16ft, 18ft, 20ft',
    ],
    imageUrl: roofingImg,
    imagePlaceholderColor: '#1E293B',
  },

  // 4. NAILS & BINDING WIRE
  {
    id: 'wire-binding-roll',
    name: 'Nails & Binding Wire (Wire Nails, Concrete Steel Nails & Annealed Wire)',
    category: 'nails-wire',
    subcategory: 'Fasteners & Structural Wire Rolls',
    description:
      'Comprehensive inventory of construction fasteners: wire nails (2-inch to 5-inch), hardened zinc-coated concrete masonry nails, rubber-washer roofing nails, and 25kg rolls of black annealed soft iron binding wire for rebar tying.',
    unit: 'Box / 25kg Roll',
    inStock: true,
    featured: true,
    badge: 'Site Essential',
    specs: [
      'Wire Nails: 2", 2.5", 3", 4", 5" in 25kg cartons or loose by kg',
      'Hardened Concrete Steel Nails: 1.5", 2", 3" fluted shank',
      'Roofing Nails with waterproof EPDM/rubber washers',
      'Soft Annealed Binding Wire: 25kg bulk rolls',
    ],
    imageUrl: nailsWireImg,
    imagePlaceholderColor: '#64748B',
  },

  // 5. HEAVY-DUTY WHEELBARROWS
  {
    id: 'tool-wheelbarrow-heavy',
    name: 'Heavy-Duty Construction Wheelbarrows (Steel Pan & Reinforced Chassis)',
    category: 'tools-equipment',
    subcategory: 'Site Material Handling & Transport',
    description:
      'Contractor-grade heavy-duty steel wheelbarrows built for transporting concrete, wet mortar, sand, gravel, and blocks. Features a deep pressed steel tray, tubular steel frame with front dump nose guard, and heavy-duty ball-bearing pneumatic tyre.',
    unit: 'Per Piece',
    inStock: true,
    featured: true,
    badge: 'Reinforced Steel',
    specs: [
      'Capacity: 85L to 100L heavy-duty pressed steel pan',
      'Reinforced tubular steel subframe & front tipping guard',
      'Heavy-duty 4.00-8 pneumatic rubber tyre with steel rim',
      'Corrosion-resistant epoxy powder coat finish',
    ],
    imageUrl: wheelbarrowHeavyImg,
    imagePlaceholderColor: '#3B82F6',
  },

  // 6. MASONRY & SITE HAND TOOLS
  {
    id: 'tool-masonry-hand-kit',
    name: 'Masonry & Construction Hand Tools (Trowels, Club Hammers, Shovels & Levels)',
    category: 'tools-equipment',
    subcategory: 'Professional Contractor Hand Tools',
    description:
      'High-grade hand tools for masons, carpenters, and steel benders. Includes forged steel bricklaying trowels, 4lb club hammers, round/square mouth steel shovels, pickaxes, spirit levels, measuring tapes, and chisels.',
    unit: 'Per Piece / Tool Set',
    inStock: true,
    featured: false,
    badge: 'Pro Grade',
    specs: [
      'Forged steel brick trowels (7", 8", 9") with ergonomic grips',
      'Hardened steel club sledge hammers & claw hammers',
      'Hardened manganese steel shovels & heavy pickaxes',
      'High-accuracy aluminum spirit levels & steel measuring tapes',
    ],
    imageUrl: hammersTrowelsImg,
    imagePlaceholderColor: '#0284C7',
  },

  // 7. WATER STORAGE POLY TANKS
  {
    id: 'tank-rambo-polytank-2000',
    name: 'Rambo Polytank & Water Storage Tanks (1,000L, 2,000L, 3,000L, 5,000L)',
    category: 'water-supply',
    subcategory: 'UV-Stabilized Food-Grade Polyethylene Tanks',
    description:
      'Genuine heavy-duty cylindrical & vertical water storage Polytanks (1,000L to 5,000L). Built with multi-layer food-grade polyethylene with anti-bacterial and anti-algae inner lining for rainwater harvesting, boreholes, and household water security.',
    unit: 'Tank Unit',
    inStock: true,
    featured: true,
    badge: '1,000L - 5,000L',
    specs: [
      'Capacities: 1,000 Litres, 2,000 Litres, 3,000 Litres, 5,000 Litres',
      'Multi-layer UV-stabilized heavy-duty polymer',
      'Anti-bacterial inner liner keeps water fresh and algae-free',
      'Threaded brass/PVC inlet, outlet, and overflow fittings included',
    ],
    imageUrl: waterPolytanksImg,
    imagePlaceholderColor: '#0369A1',
  },

  // 8. TIMBER & WOOD SCANTLINGS
  {
    id: 'timber-hardwood-scantlings',
    name: 'Hardwood & Softwood Timber Scantlings, Beams & Plywood (2x4, 2x6, Marine)',
    category: 'timber',
    subcategory: 'Roof Trusses, Formwork & Structural Lumber',
    description:
      'Naturally seasoned and kiln-treated Ghanaian hardwood and softwood timber. Essential for roof trusses, purlins, wall plates, concrete formwork, fascia boards, and high-density marine & red plywood boards.',
    unit: '12ft / 14ft Piece / Sheet',
    inStock: true,
    featured: false,
    badge: 'Seasoned Hardwood',
    specs: [
      'Scantling Dimensions: 2x2, 2x3, 2x4, 2x6, 1x12 boards',
      'Lengths: 12ft, 14ft, 16ft straight cut lumber',
      'Marine & Formwork Plywood: 1/2-inch, 3/4-inch sheets',
      'Treated against termite attack and wood borers',
    ],
    imageUrl: timberImg,
    imagePlaceholderColor: '#854D0E',
  },

  // 9. PAINTS & COATINGS
  {
    id: 'paint-smart-thermal-emulsion',
    name: 'Smart Paints, WeatherGuard Emulsion & Acrylic Gloss Enamels',
    category: 'paint',
    subcategory: 'Exterior WeatherGuard & Interior Washable Emulsion',
    description:
      'High-performance architectural coatings including Smart Paints, Deluxy, and Leyland. Features heat-reflective thermal insulation, anti-fungal weather resistance, washable satin acrylics, and anti-corrosive oil gloss enamels for metal and wood.',
    unit: '20L Bucket / 4L Gallon',
    inStock: true,
    featured: true,
    isSmartPaint: true,
    badge: 'Smart Thermal Tech',
    specs: [
      'Formulations: Exterior WeatherShield, Interior Washable Satin, Oil Gloss',
      'Packaging: 20-Litre jumbo buckets & 4-Litre gallons',
      'Alkali and fungal resistant for humid Volta climates',
      'Custom color mixing and Smart Studio tint matching available',
    ],
    imageUrl: paintBucketsImg,
    imagePlaceholderColor: '#059669',
  },

  // 10. CHIPPINGS, GRAVEL & SHARP SAND
  {
    id: 'agg-granite-chippings-34',
    name: 'Granite Chippings, Crushed Stones & Sharp River Sand (Tipper Loads)',
    category: 'sand-chippings',
    subcategory: 'Clean Aggregates for Concrete & Block Laying',
    description:
      'High-density 3/4-inch crushed granite chippings, gravel stones, and washed sharp river sand. Ideal for structural concrete mixes (Grade 20/25), column casting, foundation blinding, and clean block moulding.',
    unit: '5-Ton / 10-Ton Tipper Load',
    inStock: true,
    featured: true,
    badge: 'Fast Tipper Delivery',
    specs: [
      'Aggregates: 3/4" Granite Chippings, 1/2" Stone & River Sand',
      'Clean, silt-free washed river sand for maximum bonding',
      'Deliveries: 5-Tonne single axle & 10-Tonne double axle tipper trucks',
      'Direct site offloading in Ho-Titrinu and surrounding towns',
    ],
    imageUrl: chippingsSandImg,
    imagePlaceholderColor: '#78716C',
  },

  // 11. PLUMBING PIPES & FITTINGS
  {
    id: 'plumb-pvc-drainage-pipes',
    name: 'PVC Drainage Pipes, Pressure Water Pipes & Plumbing Fittings',
    category: 'plumbing',
    subcategory: 'Wavin, Astral & Certified PVC / PPR Systems',
    description:
      'Comprehensive plumbing solutions including 4-inch (110mm) and 2-inch PVC soil/waste drainage pipes, PN16 high-pressure potable water pipes, PPR hot/cold water pipes, PVC solvent cement, traps, valves, and brass gate valves.',
    unit: '4-Meter Length / Piece',
    inStock: true,
    featured: false,
    badge: 'Leak-Proof PVC',
    specs: [
      'Pipes: 4" (110mm) Soil Pipe, 2" Waste, 3/4" & 1/2" Pressure Pipes',
      'Fittings: Bends, Tees, Reducers, P-Traps, End Caps & Brass Valves',
      'UV resistant for above-ground & underground drainage',
      'Ghana & ISO certified pressure ratings',
    ],
    imageUrl: plumbingImg,
    imagePlaceholderColor: '#0284C7',
  },

  // 12. ELECTRICAL SUPPLIES
  {
    id: 'elec-conduits-cables',
    name: 'Electrical Conduits, Armoured Copper Cables & Circuit Breakers',
    category: 'electrical',
    subcategory: 'Residential & Commercial Wiring Essentials',
    description:
      'Safety-certified electrical supplies: pure copper single-core and twin-with-earth cables, high-impact PVC conduit pipes, junction boxes, distribution boards, MCB breakers, designer wall switches, and sockets.',
    unit: '100m Roll / Piece',
    inStock: true,
    featured: false,
    badge: '100% Pure Copper',
    specs: [
      'Cables: 1.5mm, 2.5mm, 4.0mm, 6.0mm & 16mm Armoured Mains',
      'Conduits: 20mm & 25mm PVC piping with bend accessories',
      'Distribution Boards with Earth Leakage Circuit Breakers (ELCB)',
      'Modern 13A socket outlets and multi-gang wall switches',
    ],
    imageUrl: electricalImg,
    imagePlaceholderColor: '#D97706',
  },

  // 13. DOORS & WINDOW FIXTURES
  {
    id: 'door-security-steel-exterior',
    name: 'Security Steel Exterior Doors, Solid Panel Doors & Glazed Windows',
    category: 'doors-windows',
    subcategory: 'Anti-Burglary Doors, Frames & Hardware',
    description:
      'High-security Turkish and Israeli style multi-lock steel security exterior doors, solid hardwood interior panel doors, aluminum window frames, heavy-duty door locks, stainless steel hinges, and architectural ironmongery.',
    unit: 'Door Set (Frame + Leaf + Lock)',
    inStock: true,
    featured: false,
    badge: 'Multi-Point Locking',
    specs: [
      'Security Doors: Heavy-gauge steel with 12-point multi-locking bolts',
      'Complete set includes frame, stainless steel handles, peephole & keys',
      'Internal Doors: Solid flush panel doors with wooden architraves',
      'Weather-sealed & anti-jemmy pry-resistant design',
    ],
    imageUrl: doorsWindowsImg,
    imagePlaceholderColor: '#475569',
  },

  // 14. PROVISION MART & CONVENIENCE
  {
    id: 'serv-provision-mart-titrinu',
    name: 'Makafui Provision Mart (Groceries, Cold Drinks & Builder Essentials)',
    category: 'provision-barber',
    subcategory: 'Convenience Groceries & Daily Needs in Ho-Titrinu',
    description:
      'Our on-site retail provision shop in Ho-Titrinu caters to workers, contractors, and local residents. Stocked with chilled bottled water, soft drinks, energy beverages, biscuits, canned foods, toiletries, phone cards, and daily pantry staples.',
    unit: 'Retail / Wholesale Pack',
    inStock: true,
    featured: true,
    badge: 'On-Site Convenience',
    specs: [
      'Chilled bottled mineral water, Malta Guinness, energy drinks & sodas',
      'Rice, cooking oil, canned fish/tomatoes, biscuits & snacks',
      'Toiletries, detergents, washing soaps & builder essentials',
      'Airtime, mobile money cash-in/out, and cold beverage coolers',
    ],
    imageUrl: provisionMartImg,
    imagePlaceholderColor: '#EA580C',
  },

  // 15. EXECUTIVE BARBERSHOP
  {
    id: 'serv-executive-barbershop-titrinu',
    name: 'Makafui Executive Barbershop & Grooming Salon',
    category: 'provision-barber',
    subcategory: 'Men’s Styling, Hair Cuts, Beard Grooming & Shave',
    description:
      'Modern, air-conditioned barbershop located right at Makafui Enterprise depot in Ho-Titrinu. Professional barbers providing clean fades, corporate cuts, beard trimming, hair washing, texturizing, and relaxing grooming services.',
    unit: 'Per Session',
    inStock: true,
    featured: true,
    badge: 'Air-Conditioned Salon',
    specs: [
      'Precision fades, low cuts, afro trims, wave styling & beard sculpting',
      'Sterilized clipper blades and professional scalp wash basins',
      'Comfortable leather styling chairs and ambient entertainment',
      'Open Monday – Saturday from 7:30 AM to 7:00 PM',
    ],
    imageUrl: barberShopImg,
    imagePlaceholderColor: '#0F172A',
  },
];
