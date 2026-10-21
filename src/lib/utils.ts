import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format monetary amount in PKR with commas (e.g. PKR 15,500,000)
 */
export function formatPKR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return "PKR 0";
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format monetary amount in descriptive Pakistani terms (e.g. 2.5 Crore, 85 Lacs)
 */
export function formatPKRShort(amount: number): string {
  if (isNaN(amount) || amount === 0) return "PKR 0";
  if (amount >= 10000000) {
    const crore = amount / 10000000;
    return `PKR ${crore % 1 === 0 ? crore : crore.toFixed(2)} Crore`;
  }
  if (amount >= 100000) {
    const lac = amount / 100000;
    return `PKR ${lac % 1 === 0 ? lac : lac.toFixed(2)} Lac`;
  }
  return formatPKR(amount);
}

/**
 * Format area in Square Feet
 */
export function formatArea(sqFt: number): string {
  if (!sqFt) return "0 sq ft";
  return `${new Intl.NumberFormat("en-US").format(sqFt)} sq ft`;
}

/**
 * Generate URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim — from start of text
    .replace(/-+$/, ""); // Trim — from end of text
}

/**
 * Format date nicely
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Generate direct WhatsApp chat URL with pre-filled message
 */
export function getWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^\d+]/g, "").replace(/^\+/, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
