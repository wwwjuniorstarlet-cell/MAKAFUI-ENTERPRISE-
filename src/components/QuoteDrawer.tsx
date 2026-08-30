import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  MapPin,
  User,
  Phone,
  Check,
  Copy,
  ShoppingBag,
  Printer,
} from 'lucide-react';
import { QuoteItem } from '../types';
import { generateWhatsAppQuoteMessage, buildWhatsAppLink } from '../utils/helpers';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearQuote: () => void;
}

export const QuoteDrawer: React.FC<QuoteDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearQuote,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('Ho-Titrinu');
  const [needsDelivery, setNeedsDelivery] = useState(true);
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const formattedWhatsAppMsg = generateWhatsAppQuoteMessage(items, {
    name: customerName,
    phone: customerPhone,
    deliveryLocation,
    needsDelivery,
    additionalNotes: notes,
  });

  const handleSendWhatsApp = () => {
    const url = buildWhatsAppLink(formattedWhatsAppMsg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(formattedWhatsAppMsg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const voltaTowns = [
    'Ho-Titrinu (Store area)',
    'Ho Central / Bankoe / Dome',
    'Ho Poly / Sokode Etoe',
    'Kpetoe / Agortime',
    'Adaklu / Waya',
    'Taviefe / Matse',
    'Dzodze / Ketu North',
    'Keta / Anloga',
    'Aflao / Denu',
    'Kpando / Hohoe',
    'Other Volta Location',
  ];

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        id="quote-drawer-backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-slate-900 text-white shadow-2xl border-l border-slate-800 flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Material Order &amp; Quotation List</h3>
                <p className="text-xs text-slate-400">
                  {items.length} material item{items.length !== 1 ? 's' : ''} ({totalQuantity} total units)
                </p>
              </div>
            </div>

            <button
              id="close-quote-drawer-btn"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="p-4 bg-slate-800 text-slate-400 rounded-full w-fit mx-auto">
                  <ShoppingBag className="w-10 h-10 text-amber-400" />
                </div>
                <h4 className="text-lg font-bold text-white">Your Material List is Empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Browse our catalog or use the Material Calculator to add cement, iron rods, roofing sheets, sand, or Smart Paint to your inquiry list.
                </p>
                <button
                  onClick={onClose}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              <>
                {/* List of Selected Materials */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Selected Items</span>
                    <button
                      onClick={onClearQuote}
                      className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear All</span>
                    </button>
                  </div>

                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          {item.product.imageUrl && (
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                            />
                          )}
                          <div>
                            <div className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                              {item.product.subcategory}
                            </div>
                            <h5 className="font-bold text-sm text-white">{item.product.name}</h5>
                            {item.customNotes && (
                              <p className="text-[11px] text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded-md mt-1 border border-slate-700">
                                {item.customNotes}
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-red-400 p-1"
                          title="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-700/60">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="p-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-bold text-sm px-2 text-white">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs text-slate-300 font-semibold">{item.product.unit}</span>
                        </div>

                        <div className="text-right text-xs text-emerald-400 font-semibold">
                          Depot Stock
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Information & Delivery Form */}
                <div className="bg-slate-850 p-4 rounded-2xl border border-slate-700 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                    Site Delivery &amp; Contact Details
                  </span>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Your Name / Contractor Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Master Kwaku / Site Engineer"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Your Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="e.g. 024 XXX XXXX"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Project Town / Location in Volta
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <select
                          value={deliveryLocation}
                          onChange={(e) => setDeliveryLocation(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
                        >
                          {voltaTowns.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={needsDelivery}
                          onChange={(e) => setNeedsDelivery(e.target.checked)}
                          className="w-4 h-4 text-amber-500 rounded border-slate-700 bg-slate-900"
                        />
                        <span>Require Tipper / Flatbed Site Delivery</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Additional Instructions / Cut Specs
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Need 14ft roofing sheets; delivery by Thursday morning..."
                        rows={2}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer with Summary & WhatsApp Button */}
          {items.length > 0 && (
            <div className="p-5 bg-slate-850 border-t border-slate-800 space-y-4">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-700/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider block">
                    Material Schedule
                  </span>
                  <div className="text-sm font-bold text-white">
                    {items.length} Item types • {totalQuantity} Total Units
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-400 font-bold block">
                    Direct Depot Quotation
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Ho-Titrinu, Volta
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  id="send-quote-whatsapp-btn"
                  onClick={handleSendWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Request Spot Quotation on WhatsApp</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    id="copy-quote-clipboard-btn"
                    onClick={handleCopyQuote}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-xl text-xs transition-all border border-slate-700 flex items-center justify-center gap-1.5"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy Material List'}</span>
                  </button>

                  <button
                    id="print-quote-btn"
                    onClick={handlePrint}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-xl text-xs transition-all border border-slate-700 flex items-center justify-center gap-1.5"
                    title="Print Bill of Quantities / Order"
                  >
                    <Printer className="w-4 h-4 text-amber-400" />
                    <span>Print Order Sheet</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
