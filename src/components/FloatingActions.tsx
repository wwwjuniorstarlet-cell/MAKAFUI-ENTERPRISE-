import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';
import { QuoteItem } from '../types';

interface FloatingActionsProps {
  quoteItems: QuoteItem[];
  onOpenQuote: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  quoteItems,
  onOpenQuote,
}) => {
  const totalCount = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Floating Order Trigger (if items exist) */}
      {totalCount > 0 && (
        <button
          id="floating-quote-btn"
          onClick={onOpenQuote}
          className="pointer-events-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 text-xs sm:text-sm transition-all transform hover:scale-105 active:scale-95 border-2 border-slate-950 animate-bounce"
        >
          <FileText className="w-4 h-4" />
          <span>View My Material List ({totalCount})</span>
        </button>
      )}

      {/* Floating Action Cluster */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Direct Call Button */}
        <a
          id="floating-call-btn"
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="w-12 h-12 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
          title={`Call ${BUSINESS_INFO.phoneDisplay}`}
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* WhatsApp Quick Order Button */}
        <a
          id="floating-whatsapp-btn"
          href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
            'Hello Makafui Enterprise, I would like to inquire about building materials and site delivery in Ho-Titrinu.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3.5 px-4 rounded-full shadow-2xl shadow-emerald-950/60 transition-all hover:scale-105 active:scale-95"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="hidden sm:inline-block text-xs font-bold">
            Chat on WhatsApp
          </span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-slate-900 animate-ping" />
        </a>
      </div>
    </div>
  );
};
