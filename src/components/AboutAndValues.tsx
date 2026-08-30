import React from 'react';
import {
  ShieldCheck,
  BadgePercent,
  Truck,
  Sparkles,
  CheckCircle2,
  Phone,
  MessageCircle,
  Award,
  Users,
  Building2,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

export const AboutAndValues: React.FC = () => {
  const values = [
    {
      icon: ShieldCheck,
      title: 'QUALITY MATERIALS',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
      description:
        'We stock only certified, high-yield building materials from trusted manufacturers (Ghacem, Dangote, high-tensile Grade 500 steel, certified pure copper cables, and authentic Smart Paint formulations).',
    },
    {
      icon: BadgePercent,
      title: 'AFFORDABLE PRICES',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      description:
        'Direct bulk-sourcing allows us to pass genuine wholesale discounts to homebuilders, real estate developers, and local artisans throughout the Volta Region.',
    },
    {
      icon: Truck,
      title: 'RELIABLE SERVICE',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      description:
        'Punctual site deliveries with our dedicated tipper and flatbed trucks. We open promptly at 7:00 AM so your building crew starts on schedule without project delays.',
    },
  ];

  const materialTags = [
    'Roofing Sheets (Aluzinc / IBR)',
    'Cement (Ghacem, Dura Bond, Sol, Diamond, Dangote)',
    'Paints (Smart Paint, Deluxy, Leyland - Emulsion & Oil)',
    'Iron Rods (10mm, 12mm, 16mm, 20mm, 25mm)',
    'Nails & Binding Wire (All Kinds)',
    'Chippings, Gravel & Sharp Sand',
    'Timber & Wood (Hardwood 2x4, 2x6, Marine Plywood)',
    'Shovels, Hoes, Pickaxes, Trowels & Wheelbarrows',
    'Plumbing & Drainage Pipes',
    'Electrical Cables & Breakers',
    'Doors & Windows',
    'Site Machinery & Equipment',
    'Water Supply & Poly Tanks (1,000L to 5,000L)',
    'On-Site Provision Mart & Barber Shop',
  ];

  return (
    <section id="about-values" className="py-16 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Our Commitment to Volta Region</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-['Cabinet_Grotesk',sans-serif] tracking-tight">
            WHY BUILDERS CHOOSE <span className="text-amber-400">MAKAFUI ENTERPRISE</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {BUSINESS_INFO.welcomeText} We are your one-stop partner for foundation-to-roofing supplies in Ho-Titrinu and across the Volta Region.
          </p>
        </div>

        {/* 3 Core Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-slate-850 p-8 rounded-3xl border border-slate-700 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
              >
                <div className="space-y-4">
                  <div className={`p-4 ${val.bgColor} ${val.color} rounded-2xl w-fit group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black tracking-wide text-white font-['Cabinet_Grotesk',sans-serif]">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {val.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-750 flex items-center gap-2 text-xs font-bold text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Guaranteed Standards</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* All Kinds of Building Materials Grid Showcase */}
        <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-8 sm:p-10 rounded-3xl border border-amber-500/30 shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">
              WE DEAL IN ALL KINDS OF BUILDING MATERIALS
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-['Cabinet_Grotesk',sans-serif]">
              Everything Under One Roof in Ho-Titrinu
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              No need to drive to multiple stores. From initial excavation to final smart coating, get everything on one invoice.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
            {materialTags.map((tag, idx) => (
              <div
                key={idx}
                className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-amber-300 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{tag}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="font-bold text-base text-white">Have a specific bill of quantities (BOQ)?</h4>
              <p className="text-xs text-slate-400">
                Send your material schedule directly to <strong>024 857 9070</strong> on WhatsApp for an itemized quotation.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                id="about-call-cta"
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-700"
              >
                Call Store
              </a>
              <a
                id="about-whatsapp-cta"
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Makafui Enterprise, I would like to send my construction material bill of quantities for a quote.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp BOQ</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
