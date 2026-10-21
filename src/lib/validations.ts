import { z } from 'zod';

export const InquirySchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone or WhatsApp number with country code").max(20),
  preferredContact: z.enum(['phone', 'whatsapp', 'email']),
  projectId: z.string().optional(),
  projectOfInterest: z.string().optional(),
  unitId: z.string().optional(),
  unitOfInterest: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters").max(1500),
  source: z.string().optional(),
});

export const ProjectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters").max(150),
  slug: z.string().min(3).max(150).regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  category: z.enum(['residential', 'commercial', 'mixed-use', 'corporate']),
  status: z.enum(['upcoming', 'under-construction', 'ready-to-move', 'completed']),
  publicationStatus: z.enum(['draft', 'published', 'archived']).default('draft'),
  shortDescription: z.string().min(10, "Short description is required").max(300),
  fullDescription: z.string().min(20, "Detailed description is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().default('Karachi'),
  locationMapUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  heroImage: z.string().url("Hero image must be a valid image URL"),
  priceStartingFrom: z.coerce.number().min(0, "Price must be non-negative").optional(),
  expectedCompletion: z.string().optional(),
  totalFloors: z.coerce.number().min(1).optional(),
  totalUnits: z.coerce.number().min(1).optional(),
  featured: z.boolean().default(false),
  displayOrder: z.coerce.number().default(0),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(160).optional(),
});

export const UnitSchema = z.object({
  projectId: z.string().min(1, "Please select an associated project"),
  unitNumber: z.string().min(1, "Unit number/identifier is required"),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  category: z.enum(['residential', 'commercial', 'office']),
  type: z.enum([
    'studio',
    '1-bedroom',
    '2-bedroom',
    '3-bedroom',
    '4-bedroom',
    'penthouse',
    'duplex',
    'shop',
    'showroom',
    'office',
    'floor'
  ]),
  bedrooms: z.coerce.number().min(0).default(0),
  bathrooms: z.coerce.number().min(0).default(0),
  areaSqFt: z.coerce.number().min(50, "Area must be at least 50 sq ft"),
  pricePKR: z.coerce.number().min(100000, "Price must be valid PKR amount"),
  availability: z.enum(['available', 'reserved', 'sold']).default('available'),
  floorNumber: z.string().min(1, "Floor number or label is required"),
  description: z.string().optional().default(''),
  floorPlanUrl: z.string().url().optional().or(z.literal('')),
  isPublic: z.boolean().default(true),
  displayOrder: z.coerce.number().default(0),
});

export const PaymentPlanSchema = z.object({
  projectId: z.string().min(1, "Project is required"),
  unitId: z.string().optional(),
  name: z.string().min(3, "Plan name must be at least 3 characters"),
  totalAmountPKR: z.coerce.number().min(100000, "Total amount is required"),
  bookingAmountPKR: z.coerce.number().min(0).default(0),
  confirmationAmountPKR: z.coerce.number().min(0).default(0),
  allocationAmountPKR: z.coerce.number().min(0).default(0),
  installmentFrequency: z.enum(['monthly', 'quarterly', 'bi-annual']).default('monthly'),
  numberOfInstallments: z.coerce.number().min(0).default(0),
  installmentAmountPKR: z.coerce.number().min(0).default(0),
  possessionAmountPKR: z.coerce.number().min(0).default(0),
  effectiveDate: z.string().default(() => new Date().toISOString().split('T')[0]),
  currency: z.string().default('PKR'),
  pdfDocumentUrl: z.string().url().optional().or(z.literal('')),
  isPublic: z.boolean().default(true),
  publicationStatus: z.enum(['draft', 'published', 'archived']).default('published'),
});

export const AdminLoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
