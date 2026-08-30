import React from 'react';
import {
  Phone,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  Calculator,
  Search,
  Flame,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

interface HeroProps {
  onExploreSmartPaint: () => void;
  onExploreCatalog: () => void;
  onOpenCalculator: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreSmartPaint,
  onExploreCatalog,
  onOpenCalculator,
  onSearchChange,
  searchQuery,
}) => {
  const quickCategories = [
    { label: 'Cement', query: 'Cement' },
    { label: 'Smart Paint', query: 'Paint' },
    { label: 'Iron Rods', query: 'Iron' },
    { label: 'Roofing Sheets', query: 'Roofing' },
    { label: 'Nails & Wire', query: 'Nails' },
    { label: 'Chippings & Gravel', query: 'Chippings' },
    { label: 'Timber & Wood', query: 'Timber' },
    { label: 'Tools', query: 'Wheelbarrows' },
    { label: 'Doors & Windows', query: 'Doors' },
    { label: 'Water Tanks', query: 'Water' },
    { label: 'Mart & Barber Shop', query: 'Shop' },
  ];

  return (
    <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white overflow-hidden pt-6 pb-16 lg:pb-24 border-b border-slate-800">
      {/* Subtle Construction Grid Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Ambient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Core Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Business Title & Tagline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-['Cabinet_Grotesk',sans-serif] leading-none">
                MAKAFUI <span className="text-amber-400">ENTERPRISE</span>
              </h1>
              <p className="text-lg sm:text-xl font-bold tracking-wider text-slate-300 uppercase">
                BUILDING MATERIALS &amp; CONSTRUCTION SUPPLIES
              </p>
            </div>

            {/* Slogan Banner */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-4 py-2.5 rounded-xl w-fit">
              <span>QUALITY MATERIALS</span>
              <span className="text-amber-600">•</span>
              <span>AFFORDABLE PRICES</span>
              <span className="text-amber-600">•</span>
              <span>RELIABLE SERVICE</span>
            </div>

            {/* Core Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {BUSINESS_INFO.welcomeText} We supply premium{' '}
              <strong className="text-amber-300 font-semibold">Smart Paint</strong>, roofing sheets, high-grade cement, certified high-tensile iron rods, timber, sand, chippings, plumbing, electrical, and construction tools with direct site delivery across Ho and all Volta Region.
            </p>

            {/* Search Bar for Direct Material Discovery */}
            <div className="pt-2">
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="hero-material-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search materials (e.g., Smart Paint, 16mm Iron Rod, Ghacem, Aluzinc)..."
                  className="w-full bg-slate-800/90 border border-slate-700 text-white pl-12 pr-4 py-3.5 rounded-xl text-sm sm:text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-inner"
                />
              </div>

              {/* Quick Search Chips */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                <span className="text-xs text-slate-400">Quick find:</span>
                {quickCategories.map((item) => (
                  <button
                    key={item.label}
                    id={`quick-filter-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => onSearchChange(item.query)}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 px-2.5 py-1 rounded-md border border-slate-700/60 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons & Location Badge Moved Down */}
            <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                id="hero-browse-catalog-btn"
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-6 py-3.5 rounded-xl text-sm sm:text-base transition-all shadow-lg shadow-amber-500/25 active:scale-95"
              >
                <span>Browse All Materials</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-explore-smart-paint-btn"
                onClick={onExploreSmartPaint}
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 font-bold px-5 py-3.5 rounded-xl text-sm sm:text-base transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Smart Paint Studio</span>
              </button>
            </div>

            {/* Location & Operating Hours Banner (Positioned Down in Hero) */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Ho-Titrinu, Volta Region, Ghana</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Open Mon – Sat: 7:00 AM – 5:00 PM</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Smart Paint & Material Fast Card */}
          <div className="lg:col-span-5 space-y-4">
            {/* Spotlight Card: Smart Paint Revolution */}
            <div className="bg-gradient-to-br from-slate-800/90 via-slate-850 to-slate-900 p-6 rounded-2xl border border-amber-500/30 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />

              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                      FEATURED INNOVATION
                    </span>
                    <h2 className="text-lg font-bold text-white">Smart Paint Technology</h2>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold px-2.5 py-1 rounded-full">
                  In Stock in Ho
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                Engineered for Volta weather: <strong className="text-amber-200">Heat-Reflective Nano Technology</strong> cools your rooms, while our <strong className="text-amber-200">Anti-Fungal DampGuard</strong> stops rain mildew and peeling.
              </p>

              {/* 3 Quick Smart Paint Highlights */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
                  <div className="text-amber-400 font-extrabold text-sm sm:text-base">-7°C</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Heat Deflection</div>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
                  <div className="text-emerald-400 font-extrabold text-sm sm:text-base">100%</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Anti-Mold Seal</div>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
                  <div className="text-sky-400 font-extrabold text-sm sm:text-base">10 Yrs</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Durability</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  id="hero-card-smart-paint-btn"
                  onClick={onExploreSmartPaint}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm transition-all"
                >
                  <span>Simulate Colors &amp; Coverage</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Estimator Card */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Site Bill of Quantities &amp; Material Estimator</h3>
                  <p className="text-xs text-slate-400">Calculate cement bags, sand, roofing &amp; iron rods for your site.</p>
                </div>
              </div>
              <button
                id="hero-card-calculator-btn"
                onClick={onOpenCalculator}
                className="shrink-0 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-600 transition-all"
              >
                Estimate
              </button>
            </div>

            {/* Fast Store Highlights */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-850/60 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300">Fast Site Tipper Delivery</span>
              </div>
              <div className="bg-slate-850/60 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300">Ghana Standards Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
