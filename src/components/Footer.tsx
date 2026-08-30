import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Truck,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Business Identity & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-md">
                M
              </div>
              <div>
                <span className="font-extrabold text-lg text-white font-['Cabinet_Grotesk',sans-serif] block">
                  MAKAFUI ENTERPRISE
                </span>
                <span className="text-[11px] text-amber-400 font-bold tracking-wider">
                  BUILDING MATERIALS &amp; SUPPLIES
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {BUSINESS_INFO.slogan}
            </p>

            <p className="text-xs text-slate-300 italic">
              "{BUSINESS_INFO.welcomeText}"
            </p>
          </div>

          {/* Col 2: Fast Material Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              Core Supplies
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Cement (Ghacem, Dura Bond, Sol, Diamond, Dangote)', id: 'catalog' },
                { label: 'Paints (Smart Paint, Deluxy, Leyland - Emulsion & Oil)', id: 'smart-paint' },
                { label: 'Roofing Sheets (Aluzinc & IBR Profiles)', id: 'catalog' },
                { label: 'Iron Rods (10mm, 12mm, 16mm, 20mm, 25mm)', id: 'catalog' },
                { label: 'Nails & Binding Wire (All Kinds)', id: 'catalog' },
                { label: 'Chippings, Gravel & Sharp Sand', id: 'catalog' },
                { label: 'Timber & Wood (Hardwood 2x4, 2x6, Marine Plywood)', id: 'catalog' },
                { label: 'Shovels, Hoes, Pickaxes, Trowels & Wheelbarrows', id: 'catalog' },
                { label: 'Plumbing, Electrical & Doors/Windows', id: 'catalog' },
                { label: 'Water Supply (1,000L to 5,000L Tanks & Tanker)', id: 'catalog' },
                { label: 'On-Site Provision Mart & Hair Cut Barber Shop', id: 'catalog' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Location & Working Hours */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              Location &amp; Hours
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.location}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">7:00 AM – 5:00 PM</div>
                  <div className="text-slate-400">Monday – Saturday</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Tipper truck site deliveries across Volta Region</span>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Immediate Hotline */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              Direct Contact
            </h4>
            <div className="space-y-2">
              <span className="text-xs text-slate-400 block">Hotline &amp; WhatsApp:</span>
              <a
                id="footer-call-btn"
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="text-xl font-black text-amber-400 hover:underline block font-mono"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                id="footer-whatsapp-btn"
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Makafui Enterprise, I would like to inquire about building materials in Ho-Titrinu.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                id="footer-call-now-btn"
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold py-2.5 px-4 rounded-xl text-xs transition-all border border-slate-700"
              >
                <Phone className="w-4 h-4" />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MAKAFUI ENTERPRISE. All Rights Reserved. Ho-Titrinu, Volta Region, Ghana.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Quality Materials • Affordable Prices • Reliable Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
