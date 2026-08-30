import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SmartPaintStudio } from './components/SmartPaintStudio';
import { ProductCatalog } from './components/ProductCatalog';
import { MaterialCalculator } from './components/MaterialCalculator';
import { AboutAndValues } from './components/AboutAndValues';
import { LocationAndHours } from './components/LocationAndHours';
import { QuoteDrawer } from './components/QuoteDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { Product, QuoteItem } from './types';
import { BUSINESS_INFO } from './data/products';
import { buildWhatsAppLink } from './utils/helpers';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function App() {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState<boolean>(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToQuote = (product: Product, quantity: number = 1, notes?: string) => {
    setQuoteItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          customNotes: notes || updated[existingIndex].customNotes,
        };
        return updated;
      } else {
        return [...prev, { product, quantity, customNotes: notes }];
      }
    });

    showToast(`Added ${quantity} ${product.unit} of "${product.name}" to your Material List!`);
  };

  const handleAddMultipleToQuote = (
    itemsToAdd: { product: Product; quantity: number; notes: string }[]
  ) => {
    setQuoteItems((prev) => {
      let updated = [...prev];
      itemsToAdd.forEach(({ product, quantity, notes }) => {
        const idx = updated.findIndex((i) => i.product.id === product.id);
        if (idx > -1) {
          updated[idx] = {
            ...updated[idx],
            quantity: updated[idx].quantity + quantity,
            customNotes: notes,
          };
        } else {
          updated.push({ product, quantity, customNotes: notes });
        }
      });
      return updated;
    });

    showToast(`Added ${itemsToAdd.length} estimated items to your Material List!`);
    setIsQuoteDrawerOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setQuoteItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearQuote = () => {
    setQuoteItems([]);
  };

  const handleInstantWhatsAppOrder = (
    product: Product,
    quantity: number = 1,
    customNote?: string
  ) => {
    const text = `Hello Makafui Enterprise, I would like to inquire about:
• Material: *${product.name}*
• Quantity: ${quantity} ${product.unit}
${customNote ? `• Note: ${customNote}\n` : ''}
Please confirm current stock availability and delivery schedule in Volta Region.`;

    const url = buildWhatsAppLink(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleInstantWhatsAppCustomText = (text: string) => {
    const url = buildWhatsAppLink(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-amber-500 selection:text-slate-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-slate-900 border-2 border-amber-400 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200 max-w-sm">
          <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold leading-snug">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main App Bar Header */}
      <Header
        quoteItems={quoteItems}
        onOpenQuote={() => setIsQuoteDrawerOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Page Sections */}
      <main>
        <Hero
          onExploreSmartPaint={() => handleNavigate('smart-paint')}
          onExploreCatalog={() => handleNavigate('catalog')}
          onOpenCalculator={() => handleNavigate('calculator')}
          searchQuery={searchQuery}
          onSearchChange={(query) => {
            setSearchQuery(query);
            if (query.trim()) {
              handleNavigate('catalog');
            }
          }}
        />

        {/* Complete Building Materials Catalog (Materials First) */}
        <ProductCatalog
          onAddToQuote={handleAddToQuote}
          onInstantWhatsAppOrder={handleInstantWhatsAppOrder}
          onViewProductDetails={(prod) => setSelectedProductForModal(prod)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Featured Smart Paint Studio (Visualizer & Paint Solutions) */}
        <SmartPaintStudio
          onAddToQuote={handleAddToQuote}
          onInstantWhatsAppOrder={handleInstantWhatsAppOrder}
        />

        {/* Interactive Construction Estimator & Calculator */}
        <MaterialCalculator
          onAddMultipleToQuote={handleAddMultipleToQuote}
          onInstantWhatsAppCustomText={handleInstantWhatsAppCustomText}
        />

        {/* About & Core Business Values (Quality Materials, Affordable Prices, Reliable Service) */}
        <AboutAndValues />

        {/* Physical Location in Ho-Titrinu, Direct Contacts & Opening Hours (Placed Down at the Bottom) */}
        <LocationAndHours />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Slide-over Project Quote Drawer */}
      <QuoteDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        items={quoteItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearQuote={handleClearQuote}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToQuote={handleAddToQuote}
        onInstantWhatsAppOrder={handleInstantWhatsAppOrder}
      />

      {/* Floating Call & WhatsApp Action Buttons */}
      <FloatingActions
        quoteItems={quoteItems}
        onOpenQuote={() => setIsQuoteDrawerOpen(true)}
      />
    </div>
  );
}
