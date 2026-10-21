import {
  Project,
  Unit,
  PaymentPlan,
  Inquiry,
  SiteSettings,
  CMSPageContent,
  AuditLog,
  UserProfile,
  MediaAsset,
} from './types';
import { slugify } from './utils';

// ============================================================================
// INITIAL SEED DATA FOR TAUHEED BUILDERS & DEVELOPERS
// ============================================================================

export const INITIAL_SETTINGS: SiteSettings = {
  companyName: "Tauheed Builders & Developers",
  tagline: "Mastering Architectural Excellence & Enduring Value",
  phonePrimary: "+92 21 3584 9200",
  phoneSecondary: "+92 300 824 5511",
  whatsappNumber: "+92 300 824 5511",
  emailPrimary: "info@tauheedbuilders.com",
  emailSales: "sales@tauheedbuilders.com",
  headOfficeAddress: "Executive Tower, Suite 401-403, Main Shahrah-e-Faisal",
  city: "Karachi",
  country: "Pakistan",
  officeHours: "Monday - Saturday: 9:30 AM to 6:30 PM",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14480.0!2d67.06!3d24.86",
  socialLinks: {
    facebook: "https://facebook.com/tauheedbuilders",
    instagram: "https://instagram.com/tauheedbuilders",
    linkedin: "https://linkedin.com/company/tauheed-builders",
    youtube: "https://youtube.com/@tauheedbuilders",
  },
  brochureUrl: "/documents/tauheed-corporate-brochure.pdf",
  seoDefaultTitle: "Tauheed Builders & Developers | Landmark Real Estate Projects in Karachi",
  seoDefaultDescription: "Premier real estate developer in Karachi offering luxury residential towers, executive commercial suites, and master-planned communities with flexible payment plans.",
  enablePublicRegistration: false,
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-1",
    name: "Tauheed Heights",
    slug: "tauheed-heights",
    category: "residential",
    status: "under-construction",
    publicationStatus: "published",
    shortDescription: "An elite 18-storey architectural landmark featuring 2, 3, and 4-bedroom panoramic residences with bespoke interiors and world-class leisure amenities.",
    fullDescription: "Tauheed Heights redefines urban living in Karachi with modern biophilic architecture, high-efficiency spatial planning, and panoramic cityscape views. Designed by acclaimed architectural consultants, the tower incorporates seismic-resistant Grade-60 reinforced concrete, multi-tier access security, high-speed acoustic elevators, and an exclusive rooftop infinity terrace.\n\nEvery residence is oriented to optimize natural light and cross-ventilation, complemented by imported porcelain finishes, designer kitchen cabinetry, and dedicated resident parking.",
    address: "Plot 42, Sector 17-A, Main University Road, Scheme 33",
    city: "Karachi",
    locationMapUrl: "https://maps.google.com/?q=24.95,67.12",
    heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    priceStartingFrom: 18500000,
    expectedCompletion: "December 2026",
    totalFloors: 18,
    totalUnits: 144,
    featured: true,
    displayOrder: 1,
    seoTitle: "Tauheed Heights | Luxury Apartments in Scheme 33 Karachi",
    seoDescription: "Invest in Tauheed Heights: 2, 3, and 4 bed luxury apartments with easy 36-month installment plans. SBCA approved.",
    specifications: [
      { label: "Building Height", value: "Ground + 18 Storeys" },
      { label: "Structure", value: "Seismic Zone 2B Compliant RCC" },
      { label: "Elevators", value: "3 High-Speed Mitsubishi Lifts with Power Backup" },
      { label: "Parking", value: "3 Dedicated Covered Basements" },
      { label: "Approvals", value: "100% SBCA Approved & Utility NOC Cleared" },
      { label: "Power Backup", value: "100% Generator Standby for Common & Essential Loads" },
    ],
    amenities: [
      "Rooftop Infinity Lap Pool",
      "Executive Fitness Club & Sauna",
      "Smart Access RFID Entry & CCTV",
      "Dedicated High-Speed Passenger & Cargo Lifts",
      "Children's Secure Indoor Play Arena",
      "Community Banquet & Reception Hall",
      "24/7 Security Concierge",
      "EV Charging Stations",
    ],
    gallery: [
      {
        id: "img-1-1",
        projectId: "proj-1",
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        caption: "Architectural Exterior Facade",
        isHero: true,
        displayOrder: 1,
      },
      {
        id: "img-1-2",
        projectId: "proj-1",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        caption: "Double-Height Grand Entrance Lobby",
        isHero: false,
        displayOrder: 2,
      },
      {
        id: "img-1-3",
        projectId: "proj-1",
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        caption: "Executive Living Room with Skyline Balcony",
        isHero: false,
        displayOrder: 3,
      },
      {
        id: "img-1-4",
        projectId: "proj-1",
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        caption: "Contemporary Open Kitchen with European Fittings",
        isHero: false,
        displayOrder: 4,
      },
    ],
    floorPlans: [
      {
        id: "fp-1-1",
        title: "Type A - 3 Bedroom Executive (1,850 Sq Ft)",
        unitType: "3-bedroom",
        imageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80",
        areaSqFt: 1850,
      },
      {
        id: "fp-1-2",
        title: "Type B - 2 Bedroom Deluxe (1,250 Sq Ft)",
        unitType: "2-bedroom",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
        areaSqFt: 1250,
      },
      {
        id: "fp-1-3",
        title: "Sky Penthouse - 4 Bedroom Duplex (3,600 Sq Ft)",
        unitType: "penthouse",
        imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80",
        areaSqFt: 3600,
      },
    ],
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2026-02-15T14:30:00Z",
  },
  {
    id: "proj-2",
    name: "Tauheed Executive Tower",
    slug: "tauheed-executive-tower",
    category: "commercial",
    status: "under-construction",
    publicationStatus: "published",
    shortDescription: "A prestigious corporate address on Main Shahrah-e-Faisal offering Grade-A corporate offices, retail spaces, and business conference facilities.",
    fullDescription: "Positioned in Karachi's commercial powerhouse corridor, Tauheed Executive Tower provides forward-looking enterprises with an unmatched corporate footprint. Boasting glass-curtain architecture with double-glazed low-E thermal insulation, the building integrates advanced smart building management systems (BMS), high-speed fiber connectivity, and dedicated executive valet services.\n\nThe ground and mezzanine floors house exclusive retail outlets and banking lounges, making it the supreme hub for multinational corporations and ambitious financial institutions.",
    address: "Plot 108-B, Main Shahrah-e-Faisal, Block 6, PECHS",
    city: "Karachi",
    locationMapUrl: "https://maps.google.com/?q=24.87,67.07",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    priceStartingFrom: 24000000,
    expectedCompletion: "March 2027",
    totalFloors: 22,
    totalUnits: 88,
    featured: true,
    displayOrder: 2,
    seoTitle: "Tauheed Executive Tower | Grade-A Offices on Shahrah-e-Faisal",
    seoDescription: "Prime commercial office spaces and retail showrooms in Karachi. Flexible commercial payment plans available.",
    specifications: [
      { label: "Building Grade", value: "Grade-A Corporate Tower" },
      { label: "Energy Efficiency", value: "Double-Glazed Low-E Glass Facade" },
      { label: "HVAC", value: "Centralized VRF Inverter Air Conditioning" },
      { label: "Security", value: "Turnstile Access Gates with Biometric Authentication" },
      { label: "Emergency Safety", value: "Dual Fire Stairs with Pressurization & Automated Sprinklers" },
      { label: "Floor Plates", value: "Column-Free Flexible Layouts" },
    ],
    amenities: [
      "Executive Business Lounge & Boardrooms",
      "High-Tech Video Conferencing Suites",
      "Centralized HVAC & Air Filtration",
      "Dedicated Corporate Banking Pavilion",
      "24/7 Redundant Optical Fiber Network",
      "Multi-Level Secure Underground Parking",
      "Rooftop Cafe & Networking Terrace",
      "Valet Parking Concierge",
    ],
    gallery: [
      {
        id: "img-2-1",
        projectId: "proj-2",
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        caption: "Contemporary Glass & Steel Facade",
        isHero: true,
        displayOrder: 1,
      },
      {
        id: "img-2-2",
        projectId: "proj-2",
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
        caption: "Corporate Reception & Lobby",
        isHero: false,
        displayOrder: 2,
      },
      {
        id: "img-2-3",
        projectId: "proj-2",
        url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
        caption: "Furnished Executive Suite",
        isHero: false,
        displayOrder: 3,
      },
    ],
    floorPlans: [
      {
        id: "fp-2-1",
        title: "Executive Office Suite (1,450 Sq Ft)",
        unitType: "office",
        imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        areaSqFt: 1450,
      },
      {
        id: "fp-2-2",
        title: "Full Floor Corporate Plate (6,500 Sq Ft)",
        unitType: "floor",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
        areaSqFt: 6500,
      },
    ],
    createdAt: "2025-02-01T10:00:00Z",
    updatedAt: "2026-03-01T11:20:00Z",
  },
  {
    id: "proj-3",
    name: "Tauheed Signature Villas",
    slug: "tauheed-signature-villas",
    category: "residential",
    status: "ready-to-move",
    publicationStatus: "published",
    shortDescription: "Ultra-luxury 500 and 1,000 sq yd bespoke architectural residences set in a private gated enclave with private landscaped gardens and swimming pools.",
    fullDescription: "Tauheed Signature Villas represents the pinnacle of private residential opulence. Crafted for discerning connoisseurs, each villa integrates Spanish marble flooring, private climate-controlled plunge pools, German fittings, and customized smart home automation.\n\nSurrounded by lush green boulevards and secure perimeter surveillance, this sanctuary provides absolute tranquility within easy reach of the city's key thoroughfares.",
    address: "Block 7, Clifton & Malir Greens Enclave",
    city: "Karachi",
    locationMapUrl: "https://maps.google.com/?q=24.81,67.03",
    heroImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
    priceStartingFrom: 75000000,
    expectedCompletion: "Completed & Ready for Possession",
    totalFloors: 3,
    totalUnits: 24,
    featured: true,
    displayOrder: 3,
    seoTitle: "Tauheed Signature Villas | Luxury Mansions in Karachi",
    seoDescription: "Exclusive 500 and 1,000 sq yd signature residences ready for immediate possession. Private pools and landscaped terraces.",
    specifications: [
      { label: "Plot Sizes", value: "500 Sq Yds & 1,000 Sq Yds" },
      { label: "Covered Area", value: "6,200 to 11,500 Sq Ft" },
      { label: "Bedrooms", value: "5 & 6 En-suite Master Bedrooms" },
      { label: "Finishes", value: "Imported Italian Botticino Marble & Solid Burma Teak" },
      { label: "Solar Energy", value: "Pre-installed 15kW Hybrid Solar Grid" },
      { label: "Servants Quarters", value: "Dedicated 2-Room Staff Annexe" },
    ],
    amenities: [
      "Private Heated Lap Pool",
      "Integrated Smart Home Automation (Control4)",
      "Designer Italian Show Kitchen & Dirty Kitchen",
      "Private Home Cinema & Entertainment Room",
      "Lush Landscaped Courtyard & Pergola",
      "3-Car Covered Portico",
      "24/7 Armed Security Escort & Gated Entry",
    ],
    gallery: [
      {
        id: "img-3-1",
        projectId: "proj-3",
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
        caption: "Villa Exterior with Private Pool",
        isHero: true,
        displayOrder: 1,
      },
      {
        id: "img-3-2",
        projectId: "proj-3",
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        caption: "Master Suite with Walk-In Dressing",
        isHero: false,
        displayOrder: 2,
      },
    ],
    floorPlans: [
      {
        id: "fp-3-1",
        title: "500 Sq Yd Villa Layout (6,200 Sq Ft)",
        unitType: "duplex",
        imageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80",
        areaSqFt: 6200,
      },
    ],
    createdAt: "2024-11-15T09:00:00Z",
    updatedAt: "2026-01-20T16:00:00Z",
  },
  {
    id: "proj-4",
    name: "Tauheed Business Hub",
    slug: "tauheed-business-hub",
    category: "mixed-use",
    status: "upcoming",
    publicationStatus: "published",
    shortDescription: "A multi-level retail galleria and corporate workspace complex designed for maximum pedestrian footfall and premier investor return.",
    fullDescription: "Strategically situated in Clifton, Tauheed Business Hub presents an exceptional high-yield investment vehicle. Combining open-plan boutique showrooms, international culinary terraces, and state-of-the-art co-working floors, this project is engineered for long-term commercial vitality and sustained asset appreciation.",
    address: "Block 4, Marine Promenade, Clifton",
    city: "Karachi",
    locationMapUrl: "https://maps.google.com/?q=24.82,67.02",
    heroImage: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=80",
    priceStartingFrom: 12000000,
    expectedCompletion: "September 2027",
    totalFloors: 14,
    totalUnits: 96,
    featured: false,
    displayOrder: 4,
    seoTitle: "Tauheed Business Hub | Retail Shops & Offices in Clifton",
    seoDescription: "Book commercial showrooms and executive offices in Clifton Karachi. Pre-launch pricing and investor discounts available.",
    specifications: [
      { label: "Footfall Design", value: "360-Degree Open Atrium Circulation" },
      { label: "Retail Frontage", value: "Wide Glass Display Facades" },
      { label: "Power", value: "Dedicated Substation with 100% Redundancy" },
    ],
    amenities: [
      "Open Atrium Shopping Galleria",
      "Rooftop Fine Dining Terraces",
      "Executive Boardrooms & Co-working Desks",
      "High-Traffic Escalators & Capsule Lifts",
    ],
    gallery: [
      {
        id: "img-4-1",
        projectId: "proj-4",
        url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
        caption: "Main Plaza Facade",
        isHero: true,
        displayOrder: 1,
      },
    ],
    floorPlans: [
      {
        id: "fp-4-1",
        title: "Retail Shop Layout (650 Sq Ft)",
        unitType: "shop",
        imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
        areaSqFt: 650,
      },
    ],
    createdAt: "2025-03-01T12:00:00Z",
    updatedAt: "2026-03-10T10:00:00Z",
  },
];

export const INITIAL_UNITS: Unit[] = [
  {
    id: "unit-101",
    projectId: "proj-1",
    projectName: "Tauheed Heights",
    projectSlug: "tauheed-heights",
    unitNumber: "TH-302",
    slug: "th-302-3-bed-executive",
    category: "residential",
    type: "3-bedroom",
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 1850,
    pricePKR: 24500000,
    availability: "available",
    floorNumber: 3,
    description: "East-open luxury 3-bedroom corner apartment with scenic boulevard view, drawing room, and maid suite.",
    floorPlanUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80",
    displayOrder: 1,
    isPublic: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "unit-102",
    projectId: "proj-1",
    projectName: "Tauheed Heights",
    projectSlug: "tauheed-heights",
    unitNumber: "TH-505",
    slug: "th-505-2-bed-deluxe",
    category: "residential",
    type: "2-bedroom",
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 1250,
    pricePKR: 18500000,
    availability: "available",
    floorNumber: 5,
    description: "Compact luxury 2-bedroom suite designed for young families or high-yield rental returns.",
    floorPlanUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
    displayOrder: 2,
    isPublic: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "unit-103",
    projectId: "proj-1",
    projectName: "Tauheed Heights",
    projectSlug: "tauheed-heights",
    unitNumber: "TH-PH1",
    slug: "th-ph1-royal-sky-penthouse",
    category: "residential",
    type: "penthouse",
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 3600,
    pricePKR: 55000000,
    availability: "reserved",
    floorNumber: 18,
    description: "Exclusive duplex penthouse occupying the entire southern crest with private deck and plunge jacuzzi.",
    floorPlanUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80",
    displayOrder: 3,
    isPublic: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "unit-201",
    projectId: "proj-2",
    projectName: "Tauheed Executive Tower",
    projectSlug: "tauheed-executive-tower",
    unitNumber: "TET-701",
    slug: "tet-701-executive-corporate-suite",
    category: "commercial",
    type: "office",
    bedrooms: 0,
    bathrooms: 2,
    areaSqFt: 1450,
    pricePKR: 29000000,
    availability: "available",
    floorNumber: 7,
    description: "Pre-fitted Grade-A office suite with panoramic views of Shahrah-e-Faisal and dedicated executive washroom.",
    floorPlanUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    displayOrder: 1,
    isPublic: true,
    createdAt: "2025-02-10T10:00:00Z",
    updatedAt: "2026-02-10T10:00:00Z",
  },
];

export const INITIAL_PAYMENT_PLANS: PaymentPlan[] = [
  {
    id: "plan-1",
    projectId: "proj-1",
    projectName: "Tauheed Heights",
    name: "Standard 36-Month Construction Plan",
    slug: "tauheed-heights-36m-plan",
    totalAmountPKR: 24500000,
    bookingAmountPKR: 2450000, // 10%
    confirmationAmountPKR: 2450000, // 10%
    allocationAmountPKR: 2450000, // 10%
    installmentFrequency: "monthly",
    numberOfInstallments: 36,
    installmentAmountPKR: 400000, // 36 * 400,000 = 14,400,000
    possessionAmountPKR: 2750000, // Remaining on possession
    effectiveDate: "2025-01-01",
    currency: "PKR",
    isPublic: true,
    publicationStatus: "published",
    milestones: [],
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "plan-2",
    projectId: "proj-2",
    projectName: "Tauheed Executive Tower",
    name: "Corporate Flexible 24-Month Plan",
    slug: "executive-tower-24m-plan",
    totalAmountPKR: 29000000,
    bookingAmountPKR: 4350000, // 15%
    confirmationAmountPKR: 4350000, // 15%
    allocationAmountPKR: 2900000, // 10%
    installmentFrequency: "quarterly",
    numberOfInstallments: 8,
    installmentAmountPKR: 1800000, // 8 * 1,800,000 = 14,400,000
    possessionAmountPKR: 3000000,
    effectiveDate: "2025-02-01",
    currency: "PKR",
    isPublic: true,
    publicationStatus: "published",
    milestones: [],
    createdAt: "2025-02-10T10:00:00Z",
    updatedAt: "2026-02-10T10:00:00Z",
  },
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: "inq-1",
    name: "Farhan Siddiqui",
    email: "farhan.siddiqui@gmail.com",
    phone: "+92 321 445 8899",
    preferredContact: "phone",
    projectId: "proj-1",
    projectOfInterest: "Tauheed Heights",
    unitOfInterest: "TH-302 (3-Bed Executive)",
    message: "Interested in the 3-bed corner unit on 3rd floor. Please share the complete payment schedule and schedule a site visit this Saturday.",
    source: "Project Detail Page",
    status: "new",
    assignedStaffName: "Tariq Mahmood",
    followUpDate: "2026-10-25",
    internalNotes: [
      {
        id: "note-1",
        inquiryId: "inq-1",
        authorId: "user-1",
        authorName: "Tariq Mahmood",
        content: "Client is an overseas Pakistani returning in November. High purchase intent for 3-bed unit.",
        createdAt: "2026-10-21T11:00:00Z",
      },
    ],
    activities: [
      {
        id: "act-1",
        inquiryId: "inq-1",
        userId: "user-1",
        userName: "System",
        action: "Inquiry received from website form",
        timestamp: "2026-10-21T10:45:00Z",
      },
    ],
    createdAt: "2026-10-21T10:45:00Z",
    updatedAt: "2026-10-21T11:00:00Z",
  },
  {
    id: "inq-2",
    name: "Dr. Ayesha Malik",
    email: "ayesha.malik@outlook.com",
    phone: "+92 300 212 9944",
    preferredContact: "whatsapp",
    projectId: "proj-2",
    projectOfInterest: "Tauheed Executive Tower",
    unitOfInterest: "TET-701 (Corporate Suite)",
    message: "Looking for an executive office suite for our diagnostic medical consultancy on Shahrah-e-Faisal. Inquire regarding parking allocation.",
    source: "Contact Us Page",
    status: "contacted",
    assignedStaffName: "Tariq Mahmood",
    followUpDate: "2026-10-24",
    internalNotes: [],
    activities: [
      {
        id: "act-2",
        inquiryId: "inq-2",
        userId: "user-1",
        userName: "Tariq Mahmood",
        action: "Contacted client via WhatsApp with brochure & floor layout",
        timestamp: "2026-10-21T12:15:00Z",
      },
    ],
    createdAt: "2026-10-20T14:20:00Z",
    updatedAt: "2026-10-21T12:15:00Z",
  },
  {
    id: "inq-3",
    name: "Kamran Zubair",
    email: "kamran.zubair@zubairlogistics.com",
    phone: "+92 333 998 7711",
    preferredContact: "email",
    projectId: "proj-3",
    projectOfInterest: "Tauheed Signature Villas",
    message: "Seeking private tour of 500 sq yd villa. Please confirm if immediate handover is available upon 100% upfront settlement.",
    source: "Featured Projects Hero",
    status: "site-visit",
    assignedStaffName: "Tariq Mahmood",
    followUpDate: "2026-10-23",
    internalNotes: [
      {
        id: "note-2",
        inquiryId: "inq-3",
        authorId: "user-1",
        authorName: "Tariq Mahmood",
        content: "Site visit booked for 3:00 PM Friday. Property keys and visitor passes pre-arranged.",
        createdAt: "2026-10-20T17:00:00Z",
      },
    ],
    activities: [],
    createdAt: "2026-10-19T09:15:00Z",
    updatedAt: "2026-10-20T17:00:00Z",
  },
];

export const INITIAL_CMS: CMSPageContent = {
  homepage: {
    heroBadge: "Pioneering Luxury & Precision",
    heroHeadline: "Architectural Elegance Built on Enduring Trust",
    heroSubheadline: "Tauheed Builders & Developers conceives, develops, and delivers iconic residential and commercial landmarks across Karachi with uncompromising structural integrity.",
    heroCtaText: "Explore Flagship Projects",
    heroSecondaryCta: "Schedule a Consultation",
    aboutHeading: "Crafting Modern Living Spaces with Timeless Standards",
    aboutParagraph1: "Founded on values of transparency, structural excellence, and uncompromising craftsmanship, Tauheed Builders & Developers has emerged as a premier force shaping modern urban skylines in Karachi.",
    aboutParagraph2: "From luxury high-rise residences to cutting-edge corporate commercial towers, each development is executed with rigorous engineering tolerances, premium materials, and verified legal clearances.",
    stats: [
      { label: "Years of Proven Delivery", value: "18", suffix: "+" },
      { label: "Delivered Square Feet", value: "1.2", suffix: "M+" },
      { label: "Satisfied Homeowners & Investors", value: "3,400", suffix: "+" },
      { label: "On-Time Completion Rate", value: "99.2", suffix: "%" },
    ],
    investmentCtaTitle: "Secure High-Yield Real Estate in Prime Karachi Locations",
    investmentCtaSubtitle: "Benefit from strong capital appreciation and sustainable rental yields across our approved commercial and luxury residential portfolio.",
  },
  aboutPage: {
    heroTitle: "Shaping Horizons with Integrity, Craftsmanship & Vision",
    heroSubtitle: "For nearly two decades, Tauheed Builders & Developers has stood as a benchmark of reliability, structural excellence, and transparent client partnerships.",
    mission: "To engineer iconic architectural landmarks that elevate urban lifestyle standards, protect investor capital, and deliver sustained generational value.",
    vision: "To be recognized as the foremost real estate developer in the region, celebrated for architectural innovation, uncompromising engineering, and transparent transactions.",
    coreValues: [
      { title: "Structural Integrity", description: "Rigorous engineering standards, seismic safety compliance, and premium Grade-60 steel with high-density certified concrete.", icon: "ShieldCheck" },
      { title: "Absolute Transparency", description: "100% legal approvals, transparent title documentation, and clearly defined payment schedules without hidden surcharges.", icon: "Eye" },
      { title: "Timely Delivery", description: "Modern critical-path construction management guaranteeing strict adherence to completion timelines.", icon: "Clock" },
      { title: "Client First Concierge", description: "Dedicated customer relationship managers, regular construction progress reporting, and post-handover maintenance.", icon: "Users" },
    ],
    milestones: [
      { year: "2006", title: "Inception & Foundational Projects", description: "Established in Karachi with a vision to redefine mid-rise residential developments." },
      { year: "2012", title: "Commercial Portfolio Expansion", description: "Delivered first major corporate complex on Main Shahrah-e-Faisal with 100% occupancy." },
      { year: "2019", title: "Luxury High-Rise Flagship", description: "Broke ground on signature high-rise towers featuring biophilic engineering." },
      { year: "2024", title: "Sustainable Green Construction", description: "Adopted solar-hybrid infrastructure and double-glazed low-E materials across all new developments." },
    ],
    leadership: [
      { name: "Muhammad Tauheed", designation: "Founder & Chief Executive Officer", bio: "With over 25 years of civil engineering and construction leadership, Engr. Tauheed spearheads the strategic vision and engineering precision of every development.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
      { name: "Bilal Tauheed", designation: "Director of Project Development", bio: "Oversees architectural planning, contractor procurement, and structural execution across all flagship sites.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
      { name: "Zainab Rashid", designation: "Head of Client Relations & Sales", bio: "Guides investors and homebuyers through transparent property acquisitions and flexible payment portfolios.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
    ],
  },
  servicesPage: {
    heroTitle: "End-to-End Real Estate Development Services",
    heroSubtitle: "From architectural planning and structural construction to interior styling and post-handover facility management.",
    services: [
      {
        id: "srv-1",
        title: "Luxury Residential Construction",
        category: "Residential",
        description: "Turnkey development of high-rise residential towers, penthouses, and signature gated villas built with world-class materials and earthquake-resistant engineering.",
        features: ["Seismic-compliant structural framing", "Custom interior joinery & cabinetry", "Smart-home automation pre-wiring", "Comprehensive warranty & snagging"],
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
        displayOrder: 1,
      },
      {
        id: "srv-2",
        title: "Commercial & Corporate Real Estate",
        category: "Commercial",
        description: "Grade-A corporate office towers, corporate retail pavilions, and multi-tenant commercial centers situated in high-value commercial corridors.",
        features: ["High-speed passenger lifts", "BMS automation & central HVAC", "Multi-tier security & turnstiles", "Column-free expansive floor layouts"],
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        displayOrder: 2,
      },
      {
        id: "srv-3",
        title: "Architectural Planning & Engineering",
        category: "Planning",
        description: "Visionary spatial layout design, structural engineering calculations, 3D visualization, and complete regulatory NOC liaison with municipal authorities.",
        features: ["SBCA and municipal compliance", "3D Building Information Modeling (BIM)", "Energy-efficient daylight modeling", "Geotechnical soil analysis"],
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
        displayOrder: 3,
      },
      {
        id: "srv-4",
        title: "Property & Facility Management",
        category: "Management",
        description: "Dedicated on-site facility upkeep, 24/7 security concierge, backup power operations, and asset value preservation for investors.",
        features: ["24/7 standby generator operations", "Trained security & CCTV monitoring", "Preventative mechanical maintenance", "Tenant relationship & leasing management"],
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        displayOrder: 4,
      },
    ],
  },
};

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "log-1",
    userId: "user-1",
    userEmail: "admin@tauheedbuilders.com",
    action: "login",
    entityType: "user",
    entityId: "user-1",
    entityName: "Super Admin",
    details: { method: "credentials", ip: "192.168.1.1" },
    timestamp: "2026-10-21T09:30:00Z",
  },
  {
    id: "log-2",
    userId: "user-1",
    userEmail: "admin@tauheedbuilders.com",
    action: "publish",
    entityType: "project",
    entityId: "proj-1",
    entityName: "Tauheed Heights",
    details: { previousStatus: "draft", newStatus: "published" },
    timestamp: "2026-10-21T09:45:00Z",
  },
];

export const INITIAL_USERS: UserProfile[] = [
  {
    id: "user-1",
    email: "admin@tauheedbuilders.com",
    fullName: "Muhammad Tauheed (Super Admin)",
    role: "super_admin",
    phone: "+92 300 824 5511",
    createdAt: "2025-01-01T00:00:00Z",
    lastLogin: "2026-10-21T09:30:00Z",
  },
  {
    id: "user-2",
    email: "sales@tauheedbuilders.com",
    fullName: "Tariq Mahmood",
    role: "sales_staff",
    phone: "+92 321 554 9900",
    createdAt: "2025-02-01T00:00:00Z",
    lastLogin: "2026-10-21T08:15:00Z",
  },
];

// ============================================================================
// SINGLETON REPOSITORY (IN-MEMORY WITH PERSISTENCE BACKED STORAGE)
// ============================================================================

class DataStore {
  private projects: Project[] = [...INITIAL_PROJECTS];
  private units: Unit[] = [...INITIAL_UNITS];
  private paymentPlans: PaymentPlan[] = [...INITIAL_PAYMENT_PLANS];
  private inquiries: Inquiry[] = [...INITIAL_INQUIRIES];
  private siteSettings: SiteSettings = { ...INITIAL_SETTINGS };
  private cmsPages: CMSPageContent = { ...INITIAL_CMS };
  private auditLogs: AuditLog[] = [...INITIAL_AUDIT_LOGS];
  private users: UserProfile[] = [...INITIAL_USERS];

  // Projects
  async getProjects(filters?: {
    category?: string;
    status?: string;
    publicationStatus?: string;
    featured?: boolean;
    search?: string;
  }): Promise<Project[]> {
    let result = [...this.projects];

    if (filters?.publicationStatus) {
      result = result.filter(p => p.publicationStatus === filters.publicationStatus);
    }
    if (filters?.category && filters.category !== 'all') {
      result = result.filter(p => p.category === filters.category);
    }
    if (filters?.status && filters.status !== 'all') {
      result = result.filter(p => p.status === filters.status);
    }
    if (filters?.featured !== undefined) {
      result = result.filter(p => p.featured === filters.featured);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
      );
    }

    return result.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    return this.projects.find(p => p.slug === slug) || null;
  }

  async getProjectById(id: string): Promise<Project | null> {
    return this.projects.find(p => p.id === id) || null;
  }

  async saveProject(data: Partial<Project> & { name: string }): Promise<Project> {
    const slug = data.slug || slugify(data.name);
    const existingIndex = data.id ? this.projects.findIndex(p => p.id === data.id) : -1;

    if (existingIndex >= 0) {
      const updated: Project = {
        ...this.projects[existingIndex],
        ...data,
        slug,
        updatedAt: new Date().toISOString(),
      };
      this.projects[existingIndex] = updated;
      await this.logAuditEvent({
        action: 'update',
        entityType: 'project',
        entityId: updated.id,
        entityName: updated.name,
      });
      return updated;
    } else {
      const newProject: Project = {
        id: `proj-${Date.now()}`,
        name: data.name,
        slug,
        category: data.category || 'residential',
        status: data.status || 'under-construction',
        publicationStatus: data.publicationStatus || 'draft',
        shortDescription: data.shortDescription || '',
        fullDescription: data.fullDescription || '',
        address: data.address || '',
        city: data.city || 'Karachi',
        locationMapUrl: data.locationMapUrl || '',
        heroImage: data.heroImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
        priceStartingFrom: data.priceStartingFrom || 0,
        expectedCompletion: data.expectedCompletion || 'TBD',
        totalFloors: data.totalFloors || 1,
        totalUnits: data.totalUnits || 1,
        featured: data.featured || false,
        displayOrder: data.displayOrder || this.projects.length + 1,
        seoTitle: data.seoTitle || `${data.name} | Tauheed Builders`,
        seoDescription: data.seoDescription || data.shortDescription,
        specifications: data.specifications || [],
        amenities: data.amenities || [],
        gallery: data.gallery || [],
        floorPlans: data.floorPlans || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.projects.push(newProject);
      await this.logAuditEvent({
        action: 'create',
        entityType: 'project',
        entityId: newProject.id,
        entityName: newProject.name,
      });
      return newProject;
    }
  }

  async deleteProject(id: string): Promise<boolean> {
    const project = this.projects.find(p => p.id === id);
    if (!project) return false;
    this.projects = this.projects.filter(p => p.id !== id);
    await this.logAuditEvent({
      action: 'delete',
      entityType: 'project',
      entityId: id,
      entityName: project.name,
    });
    return true;
  }

  // Units
  async getUnits(projectId?: string): Promise<Unit[]> {
    if (projectId) {
      return this.units.filter(u => u.projectId === projectId);
    }
    return [...this.units];
  }

  async getUnitBySlug(projectSlug: string, unitSlug: string): Promise<Unit | null> {
    const project = await this.getProjectBySlug(projectSlug);
    if (!project) return null;
    return this.units.find(u => u.projectId === project.id && u.slug === unitSlug) || null;
  }

  async saveUnit(data: Partial<Unit> & { unitNumber: string; projectId: string }): Promise<Unit> {
    const existingIndex = data.id ? this.units.findIndex(u => u.id === data.id) : -1;
    const project = this.projects.find(p => p.id === data.projectId);
    const slug = data.slug || slugify(`${data.unitNumber}-${data.type || 'unit'}`);

    if (existingIndex >= 0) {
      const updated: Unit = {
        ...this.units[existingIndex],
        ...data,
        slug,
        projectName: project?.name,
        projectSlug: project?.slug,
        updatedAt: new Date().toISOString(),
      };
      this.units[existingIndex] = updated;
      return updated;
    } else {
      const newUnit: Unit = {
        id: `unit-${Date.now()}`,
        projectId: data.projectId,
        projectName: project?.name,
        projectSlug: project?.slug,
        unitNumber: data.unitNumber,
        slug,
        category: data.category || 'residential',
        type: data.type || '2-bedroom',
        bedrooms: data.bedrooms ?? 2,
        bathrooms: data.bathrooms ?? 2,
        areaSqFt: data.areaSqFt || 1000,
        pricePKR: data.pricePKR || 10000000,
        availability: data.availability || 'available',
        floorNumber: data.floorNumber || 1,
        description: data.description || '',
        floorPlanUrl: data.floorPlanUrl,
        displayOrder: data.displayOrder || this.units.length + 1,
        isPublic: data.isPublic ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.units.push(newUnit);
      return newUnit;
    }
  }

  async deleteUnit(id: string): Promise<boolean> {
    this.units = this.units.filter(u => u.id !== id);
    return true;
  }

  // Payment Plans
  async getPaymentPlans(projectId?: string): Promise<PaymentPlan[]> {
    if (projectId) {
      return this.paymentPlans.filter(p => p.projectId === projectId);
    }
    return [...this.paymentPlans];
  }

  async savePaymentPlan(data: Partial<PaymentPlan> & { name: string; projectId: string; totalAmountPKR: number }): Promise<PaymentPlan> {
    const existingIndex = data.id ? this.paymentPlans.findIndex(p => p.id === data.id) : -1;
    const project = this.projects.find(p => p.id === data.projectId);
    const slug = data.slug || slugify(data.name);

    if (existingIndex >= 0) {
      const updated: PaymentPlan = {
        ...this.paymentPlans[existingIndex],
        ...data,
        slug,
        projectName: project?.name,
        updatedAt: new Date().toISOString(),
      };
      this.paymentPlans[existingIndex] = updated;
      return updated;
    } else {
      const newPlan: PaymentPlan = {
        id: `plan-${Date.now()}`,
        projectId: data.projectId,
        projectName: project?.name,
        unitId: data.unitId,
        unitNumber: data.unitNumber,
        name: data.name,
        slug,
        totalAmountPKR: data.totalAmountPKR,
        bookingAmountPKR: data.bookingAmountPKR || 0,
        confirmationAmountPKR: data.confirmationAmountPKR || 0,
        allocationAmountPKR: data.allocationAmountPKR || 0,
        installmentFrequency: data.installmentFrequency || 'monthly',
        numberOfInstallments: data.numberOfInstallments || 0,
        installmentAmountPKR: data.installmentAmountPKR || 0,
        possessionAmountPKR: data.possessionAmountPKR || 0,
        effectiveDate: data.effectiveDate || new Date().toISOString().split('T')[0],
        currency: 'PKR',
        pdfDocumentUrl: data.pdfDocumentUrl,
        isPublic: data.isPublic ?? true,
        publicationStatus: data.publicationStatus || 'published',
        milestones: data.milestones || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.paymentPlans.push(newPlan);
      return newPlan;
    }
  }

  async deletePaymentPlan(id: string): Promise<boolean> {
    this.paymentPlans = this.paymentPlans.filter(p => p.id !== id);
    return true;
  }

  // Inquiries / Leads
  async getInquiries(filters?: { status?: string; search?: string }): Promise<Inquiry[]> {
    let result = [...this.inquiries];

    if (filters?.status && filters.status !== 'all') {
      result = result.filter(i => i.status === filters.status);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(i => 
        i.name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        i.phone.includes(q) ||
        (i.projectOfInterest && i.projectOfInterest.toLowerCase().includes(q))
      );
    }

    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createInquiry(data: {
    name: string;
    email: string;
    phone: string;
    preferredContact?: 'phone' | 'whatsapp' | 'email';
    projectId?: string;
    projectOfInterest?: string;
    unitId?: string;
    unitOfInterest?: string;
    message: string;
    source?: string;
  }): Promise<Inquiry> {
    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      preferredContact: data.preferredContact || 'phone',
      projectId: data.projectId,
      projectOfInterest: data.projectOfInterest,
      unitId: data.unitId,
      unitOfInterest: data.unitOfInterest,
      message: data.message,
      source: data.source || 'Website Form',
      status: 'new',
      internalNotes: [],
      activities: [
        {
          id: `act-${Date.now()}`,
          inquiryId: `inq-${Date.now()}`,
          userId: 'system',
          userName: 'System Form',
          action: 'New website lead created',
          timestamp: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.inquiries.unshift(newInquiry);
    return newInquiry;
  }

  async updateInquiryStatus(id: string, status: Inquiry['status'], staffName?: string, note?: string): Promise<boolean> {
    const inquiry = this.inquiries.find(i => i.id === id);
    if (!inquiry) return false;

    const oldStatus = inquiry.status;
    inquiry.status = status;
    inquiry.updatedAt = new Date().toISOString();

    if (staffName) {
      inquiry.assignedStaffName = staffName;
    }

    inquiry.activities.unshift({
      id: `act-${Date.now()}`,
      inquiryId: id,
      userId: 'user-1',
      userName: staffName || 'Admin',
      action: `Status changed from ${oldStatus.toUpperCase()} to ${status.toUpperCase()}`,
      note,
      timestamp: new Date().toISOString(),
    });

    if (note) {
      inquiry.internalNotes.unshift({
        id: `note-${Date.now()}`,
        inquiryId: id,
        authorId: 'user-1',
        authorName: staffName || 'Admin',
        content: note,
        createdAt: new Date().toISOString(),
      });
    }

    return true;
  }

  async addInquiryNote(inquiryId: string, authorName: string, content: string): Promise<boolean> {
    const inquiry = this.inquiries.find(i => i.id === inquiryId);
    if (!inquiry) return false;

    inquiry.internalNotes.unshift({
      id: `note-${Date.now()}`,
      inquiryId,
      authorId: 'user-1',
      authorName,
      content,
      createdAt: new Date().toISOString(),
    });
    inquiry.updatedAt = new Date().toISOString();
    return true;
  }

  // Site Settings
  async getSiteSettings(): Promise<SiteSettings> {
    return { ...this.siteSettings };
  }

  async updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    this.siteSettings = {
      ...this.siteSettings,
      ...settings,
    };
    await this.logAuditEvent({
      action: 'update',
      entityType: 'settings',
      entityId: 'site-settings',
      entityName: 'Global Site Configuration',
    });
    return this.siteSettings;
  }

  // CMS Content
  async getCMSContent(): Promise<CMSPageContent> {
    return { ...this.cmsPages };
  }

  async updateCMSContent(updates: Partial<CMSPageContent>): Promise<CMSPageContent> {
    this.cmsPages = {
      ...this.cmsPages,
      ...updates,
    };
    await this.logAuditEvent({
      action: 'update',
      entityType: 'cms',
      entityId: 'cms-content',
      entityName: 'CMS Pages',
    });
    return this.cmsPages;
  }

  // Audit Logs
  async getAuditLogs(): Promise<AuditLog[]> {
    return [...this.auditLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async logAuditEvent(event: {
    action: AuditLog['action'];
    entityType: AuditLog['entityType'];
    entityId: string;
    entityName?: string;
    details?: Record<string, any>;
    userEmail?: string;
  }): Promise<void> {
    const log: AuditLog = {
      id: `log-${Date.now()}`,
      userId: 'user-1',
      userEmail: event.userEmail || 'admin@tauheedbuilders.com',
      action: event.action,
      entityType: event.entityType,
      entityId: event.entityId,
      entityName: event.entityName,
      details: event.details,
      timestamp: new Date().toISOString(),
    };
    this.auditLogs.unshift(log);
  }

  // Users
  async getUsers(): Promise<UserProfile[]> {
    return [...this.users];
  }

  // Dashboard Metrics
  async getDashboardMetrics() {
    const totalProjects = this.projects.length;
    const publishedProjects = this.projects.filter(p => p.publicationStatus === 'published').length;
    const draftProjects = this.projects.filter(p => p.publicationStatus === 'draft').length;
    const totalUnits = this.units.length;
    const availableUnits = this.units.filter(u => u.availability === 'available').length;
    const totalInquiries = this.inquiries.length;
    const newInquiries = this.inquiries.filter(i => i.status === 'new').length;
    const contactedInquiries = this.inquiries.filter(i => i.status === 'contacted').length;
    const convertedInquiries = this.inquiries.filter(i => i.status === 'converted').length;

    return {
      totalProjects,
      publishedProjects,
      draftProjects,
      totalUnits,
      availableUnits,
      totalInquiries,
      newInquiries,
      contactedInquiries,
      convertedInquiries,
      recentInquiries: this.inquiries.slice(0, 5),
      recentProjects: this.projects.slice(0, 5),
    };
  }
}

// Global Singleton Instance
const globalForStore = globalThis as unknown as { tauheedStore?: DataStore };

export const store = globalForStore.tauheedStore || new DataStore();

if (process.env.NODE_ENV !== 'production') {
  globalForStore.tauheedStore = store;
}
