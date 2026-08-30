import { QuoteItem } from '../types';
import { BUSINESS_INFO } from '../data/products';

export function formatGHS(amount: number): string {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount).replace('GHS', 'GH₵');
}

/**
 * Checks if Makafui Enterprise is currently open based on Ghana Local Time (GMT / UTC+0).
 * Schedule: Mon - Sat: 7:00 AM to 5:00 PM (07:00 - 17:00).
 */
export function getStoreLiveStatus(): {
  isOpen: boolean;
  statusText: string;
  subText: string;
  badgeColor: string;
} {
  // Ghana is UTC+0 year-round
  const now = new Date();
  const utcDay = now.getUTCDay(); // 0 = Sun, 1 = Mon, ... 6 = Sat
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  const currentTimeMinutes = utcHours * 60 + utcMinutes;

  const openTimeMinutes = 7 * 60; // 7:00 AM
  const closeTimeMinutes = 17 * 60; // 5:00 PM (17:00)

  const isWorkingDay = utcDay >= 1 && utcDay <= 6; // Monday to Saturday

  if (isWorkingDay) {
    if (currentTimeMinutes >= openTimeMinutes && currentTimeMinutes < closeTimeMinutes) {
      const minutesUntilClose = closeTimeMinutes - currentTimeMinutes;
      const hoursLeft = Math.floor(minutesUntilClose / 60);
      const minsLeft = minutesUntilClose % 60;
      const timeLeftStr = hoursLeft > 0 ? `${hoursLeft}h ${minsLeft}m` : `${minsLeft} mins`;

      return {
        isOpen: true,
        statusText: 'Open Now',
        subText: `Closes at 5:00 PM today (in ${timeLeftStr})`,
        badgeColor: 'bg-emerald-500 text-white',
      };
    } else if (currentTimeMinutes < openTimeMinutes) {
      return {
        isOpen: false,
        statusText: 'Opens at 7:00 AM',
        subText: 'Opening early today for site contractors and artisans',
        badgeColor: 'bg-amber-600 text-white',
      };
    } else {
      // After 5:00 PM
      if (utcDay === 6) {
        return {
          isOpen: false,
          statusText: 'Closed for the Day',
          subText: 'Re-opens Monday at 7:00 AM (WhatsApp orders open 24/7)',
          badgeColor: 'bg-slate-700 text-slate-200',
        };
      }
      return {
        isOpen: false,
        statusText: 'Closed for the Day',
        subText: 'Re-opens tomorrow at 7:00 AM (Send orders on WhatsApp anytime)',
        badgeColor: 'bg-slate-700 text-slate-200',
      };
    }
  } else {
    // Sunday
    return {
      isOpen: false,
      statusText: 'Closed Today (Sunday)',
      subText: 'Re-opens Monday at 7:00 AM in Ho-Titrinu (WhatsApp orders 24/7)',
      badgeColor: 'bg-slate-700 text-slate-200',
    };
  }
}

/**
 * Builds a direct WhatsApp link with pre-formatted message
 */
export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encoded}`;
}

/**
 * Formats a quotation and order request for WhatsApp
 */
export function generateWhatsAppQuoteMessage(
  items: QuoteItem[],
  customerInfo: {
    name: string;
    phone: string;
    deliveryLocation: string;
    needsDelivery: boolean;
    additionalNotes?: string;
  }
): string {
  const itemList = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.product.name}*\n   • Requested Quantity: ${item.quantity} ${item.product.unit}${item.customNotes ? `\n   • Note: ${item.customNotes}` : ''}`
    )
    .join('\n\n');

  return `🏗️ *MAKAFUI ENTERPRISE - MATERIAL INQUIRY & QUOTE REQUEST*
📍 *Ho-Titrinu, Volta Region, Ghana* | 📞 *024 857 9070*
----------------------------------------
👤 *Customer / Contractor:* ${customerInfo.name || 'Site Client'}
📞 *Contact Phone:* ${customerInfo.phone || 'Via WhatsApp'}
📍 *Delivery Destination:* ${customerInfo.deliveryLocation || 'Ho / Volta Region'}
🚚 *Haulage Option:* ${customerInfo.needsDelivery ? 'Site Delivery Required (Tipper/Truck Dispatch)' : 'Self-Pickup at Ho-Titrinu Depot'}

📋 *REQUESTED MATERIAL LIST:*
${itemList}

----------------------------------------
📝 *Special Instructions / Specs:* ${customerInfo.additionalNotes || 'Please provide current spot quotation and dispatch availability for Ho-Titrinu / Volta site.'}
----------------------------------------
_Generated via Makafui Enterprise Official Web Catalog_`;
}
