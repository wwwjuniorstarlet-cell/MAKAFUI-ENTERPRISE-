import React, { useState, useEffect } from 'react';
import {
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  FileText,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Truck,
  Calculator,
  Layers,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';
import { getStoreLiveStatus } from '../utils/helpers';
import { QuoteItem } from '../types';

interface HeaderProps {
  quoteItems: QuoteItem[];
  onOpenQuote: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenInstallModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  quoteItems,
  onOpenQuote,
  activeSection,
  onNavigate,
  onOpenInstallModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveStatus, setLiveStatus] = useState(getStoreLiveStatus());

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveStatus(getStoreLiveStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const totalItemsCount = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { id: 'catalog', label: 'All Materials', icon: Layers },
    { id: 'smart-paint', label: 'Smart Paint', icon: Sparkles, highlight: true },
    { id: 'calculator', label: 'Estimator', icon: Calculator },
    { id: 'about-values', label: 'Why Makafui', icon: ShieldCheck },
    { id: 'location-hours', label: 'Location & Hours', icon: MapPin },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-xl">
      {/* Top Banner with Business Schedule & Immediate Contact */}
      <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs md:text-sm font-semibold">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-950" />
              <span>Ho-Titrinu, Volta Region, Ghana</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 border-l border-amber-600/60 pl-3">
              <Clock className="w-3.5 h-3.5 shrink-0 text-slate-950" />
              <span>Mon – Sat: 7:00 AM – 5:00 PM</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block text-amber-950 font-medium">
              Call or WhatsApp for Instant Site Delivery:
            </span>
            <a
              id="header-top-phone"
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center gap-1.5 bg-slate-950 hover:bg-slate-900 text-amber-400 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm"
            >
              <Phone className="w-3 h-3" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div
            id="brand-logo-button"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform border border-amber-400/40">
              <div className="text-slate-950 font-black text-xl tracking-tighter flex flex-col items-center leading-none">
                <span>M</span>
                <span className="text-[9px] font-bold tracking-widest text-slate-900 uppercase">Volta</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white group-hover:text-amber-400 transition-colors font-['Cabinet_Grotesk',sans-serif]">
                  MAKAFUI ENTERPRISE
                </span>
              </div>
              <p className="text-xs text-amber-400 font-medium tracking-wide">
                BUILDING MATERIALS &amp; CONSTRUCTION SUPPLIES
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-800 text-amber-400 border border-slate-700 shadow-inner'
                      : item.highlight
                      ? 'text-amber-300 hover:text-amber-200 hover:bg-slate-800/60'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${item.highlight ? 'text-amber-400' : ''}`} />
                  <span>{item.label}</span>
                  {item.highlight && (
                    <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30">
                      FEATURED
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area (Status Badge, Quote Drawer Trigger, WhatsApp) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Store Status Pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs">
              <span className={`w-2.5 h-2.5 rounded-full ${liveStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
              <div>
                <div className="font-bold text-slate-200 flex items-center gap-1">
                  <span>{liveStatus.statusText}</span>
                  <span className="text-[10px] text-slate-400 font-normal">7AM–5PM</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout Button */}
            <a
              id="header-whatsapp-cta"
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Hello Makafui Enterprise, I would like to inquire about building materials and prices in Ho-Titrinu.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all shadow-md shadow-emerald-950/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            {/* Material List / Order Basket Button */}
            <button
              id="header-quote-basket-btn"
              onClick={onOpenQuote}
              className="relative inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs md:text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Material List &amp; Quote</span>
              <span className="sm:hidden">Material List</span>
              {totalItemsCount > 0 && (
                <span className="bg-slate-950 text-amber-400 font-extrabold text-xs px-2 py-0.5 rounded-full border border-amber-300 animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className={`w-2.5 h-2.5 rounded-full ${liveStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
              <span className="font-bold text-slate-200">{liveStatus.statusText}</span>
              <span className="text-slate-400">({liveStatus.subText})</span>
            </div>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.highlight && (
                  <span className="bg-amber-400/20 text-amber-300 text-xs px-2 py-0.5 rounded border border-amber-400/30">
                    Smart Tech
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <a
              id="mobile-call-btn"
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-400 py-3 rounded-xl font-bold text-sm border border-slate-700"
            >
              <Phone className="w-4 h-4" />
              <span>Call {BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <a
              id="mobile-whatsapp-btn"
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Hello Makafui Enterprise, I am contacting you from the website regarding building materials.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
