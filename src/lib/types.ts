export type ProjectCategory = 'residential' | 'commercial' | 'mixed-use' | 'corporate';

export type ProjectStatus = 'upcoming' | 'under-construction' | 'ready-to-move' | 'completed';

export type PublicationStatus = 'draft' | 'published' | 'archived';

export type UnitCategory = 'residential' | 'commercial' | 'office';

export type UnitType = 
  | 'studio'
  | '1-bedroom'
  | '2-bedroom'
  | '3-bedroom'
  | '4-bedroom'
  | 'penthouse'
  | 'duplex'
  | 'shop'
  | 'showroom'
  | 'office'
  | 'floor';

export type UnitAvailability = 'available' | 'reserved' | 'sold';

export type InquiryStatus = 'new' | 'contacted' | 'qualified' | 'site-visit' | 'converted' | 'lost';

export type ContactPreference = 'phone' | 'whatsapp' | 'email';

export type UserRole = 'super_admin' | 'admin' | 'sales_staff';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface ProjectSpecification {
  label: string;
  value: string;
}

export interface ProjectImage {
  id: string;
  projectId: string;
  url: string;
  caption?: string;
  altText?: string;
  isHero: boolean;
  displayOrder: number;
}

export interface ProjectFloorPlan {
  id: string;
  title: string;
  unitType?: string;
  imageUrl: string;
  documentUrl?: string;
  areaSqFt?: number;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  publicationStatus: PublicationStatus;
  shortDescription: string;
  fullDescription: string;
  address: string;
  city: string;
  locationMapUrl?: string;
  heroImage: string;
  gallery: ProjectImage[];
  specifications: ProjectSpecification[];
  amenities: string[];
  floorPlans: ProjectFloorPlan[];
  brochureUrl?: string;
  priceStartingFrom?: number; // in PKR
  expectedCompletion?: string;
  totalFloors?: number;
  totalUnits?: number;
  featured: boolean;
  displayOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Unit {
  id: string;
  projectId: string;
  projectName?: string;
  projectSlug?: string;
  unitNumber: string;
  slug: string;
  category: UnitCategory;
  type: UnitType;
  bedrooms?: number;
  bathrooms?: number;
  areaSqFt: number;
  pricePKR: number;
  availability: UnitAvailability;
  floorNumber: number | string;
  description: string;
  floorPlanUrl?: string;
  displayOrder: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentPlanItem {
  id: string;
  paymentPlanId?: string;
  milestoneTitle: string;
  percentage: number;
  amountPKR: number;
  dueDateDescription?: string;
  isCustomMilestone?: boolean;
  displayOrder: number;
}

export interface PaymentPlan {
  id: string;
  projectId: string;
  projectName?: string;
  unitId?: string;
  unitNumber?: string;
  name: string;
  slug: string;
  totalAmountPKR: number;
  bookingAmountPKR: number;
  confirmationAmountPKR: number;
  allocationAmountPKR: number;
  installmentFrequency: 'monthly' | 'quarterly' | 'bi-annual';
  numberOfInstallments: number;
  installmentAmountPKR: number;
  possessionAmountPKR: number;
  effectiveDate: string;
  currency: string; // e.g. "PKR"
  pdfDocumentUrl?: string;
  isPublic: boolean;
  publicationStatus: PublicationStatus;
  milestones: PaymentPlanItem[];
  createdAt: string;
  updatedAt: string;
}

export interface InquiryActivity {
  id: string;
  inquiryId: string;
  userId: string;
  userName: string;
  action: string;
  note?: string;
  timestamp: string;
}

export interface InquiryNote {
  id: string;
  inquiryId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredContact: ContactPreference;
  projectOfInterest?: string;
  projectId?: string;
  unitOfInterest?: string;
  unitId?: string;
  message: string;
  source: string;
  status: InquiryStatus;
  assignedStaffId?: string;
  assignedStaffName?: string;
  followUpDate?: string;
  internalNotes: InquiryNote[];
  activities: InquiryActivity[];
  createdAt: string;
  updatedAt: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  sizeBytes: number;
  mimeType: string;
  category: 'project-photo' | 'floor-plan' | 'brochure' | 'payment-plan' | 'general';
  projectId?: string;
  altText?: string;
  uploadedBy: string;
  createdAt: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  phonePrimary: string;
  phoneSecondary?: string;
  whatsappNumber: string;
  emailPrimary: string;
  emailSales?: string;
  headOfficeAddress: string;
  city: string;
  country: string;
  officeHours: string;
  googleMapsEmbedUrl?: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
  };
  brochureUrl?: string;
  seoDefaultTitle: string;
  seoDefaultDescription: string;
  enablePublicRegistration: boolean;
}

export interface CMSPageContent {
  homepage: {
    heroBadge: string;
    heroHeadline: string;
    heroSubheadline: string;
    heroCtaText: string;
    heroSecondaryCta: string;
    aboutHeading: string;
    aboutParagraph1: string;
    aboutParagraph2: string;
    stats: Array<{ label: string; value: string; suffix?: string }>;
    investmentCtaTitle: string;
    investmentCtaSubtitle: string;
  };
  aboutPage: {
    heroTitle: string;
    heroSubtitle: string;
    mission: string;
    vision: string;
    coreValues: Array<{ title: string; description: string; icon: string }>;
    milestones: Array<{ year: string; title: string; description: string }>;
    leadership: Array<{ name: string; designation: string; bio: string; image: string }>;
  };
  servicesPage: {
    heroTitle: string;
    heroSubtitle: string;
    services: Array<{ id: string; title: string; category: string; description: string; features: string[]; image: string; displayOrder: number }>;
  };
}

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: 'create' | 'update' | 'delete' | 'publish' | 'archive' | 'login' | 'status_change';
  entityType: 'project' | 'unit' | 'payment_plan' | 'inquiry' | 'media' | 'settings' | 'user' | 'cms';
  entityId: string;
  entityName?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}
