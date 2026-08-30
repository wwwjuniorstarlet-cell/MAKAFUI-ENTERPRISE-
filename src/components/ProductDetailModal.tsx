import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Package,
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuote: (product: Product, quantity: number) => void;
  onInstantWhatsAppOrder: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToQuote,
  onInstantWhatsAppOrder,
}) => {
  const [qty, setQty] = useState<number>(1);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        id="product-detail-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm transition-opacity"
      />

      <div className="relative bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full text-white shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
        {/* Top Image Preview Banner */}
        {product.imageUrl && (
          <div className="relative w-full h-64 bg-slate-950 overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />

            <button
              id="close-product-modal-btn"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white bg-slate-950/70 hover:bg-slate-800 rounded-xl backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-700 backdrop-blur-sm">
                {product.subcategory}
              </span>
              {product.badge && (
                <span className="bg-amber-500 text-slate-950 text-[11px] font-black px-2.5 py-1 rounded-md shadow">
                  {product.badge}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header (when no image banner or title area) */}
          {!product.imageUrl && (
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {product.subcategory}
                  </span>
                  {product.isSmartPaint && (
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Smart Formulation
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-['Cabinet_Grotesk',sans-serif]">
                  {product.name}
                </h3>
              </div>

              <button
                id="close-product-modal-btn"
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {product.imageUrl && (
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-['Cabinet_Grotesk',sans-serif]">
                {product.name}
              </h3>
            </div>
          )}

          {/* Product Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-850 p-4 rounded-2xl border border-slate-800">
            {product.description}
          </p>

          {/* Technical Specifications */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Technical Specifications &amp; Features
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.specs.map((spec, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 flex items-center gap-2 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Selection Box */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-amber-400 uppercase block font-bold tracking-wider">
                  Packaging Unit
                </span>
                <div className="text-base font-bold text-white">
                  {product.unit} <span className="text-xs text-emerald-400 font-normal">(Wholesale &amp; Retail Available)</span>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400 px-2 font-medium">Quantity:</span>
                <button
                  id="modal-qty-decrease-btn"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  id="modal-qty-input"
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center bg-transparent text-white font-bold text-sm focus:outline-none"
                />
                <button
                  id="modal-qty-increase-btn"
                  onClick={() => setQty((q) => q + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="pt-2.5 border-t border-slate-850 flex items-center justify-between text-xs text-slate-400">
              <span>Selected Total:</span>
              <span className="font-bold text-amber-400 text-sm">
                {qty} {qty > 1 ? `${product.unit}s` : product.unit}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              id="modal-add-quote-btn"
              onClick={() => {
                onAddToQuote(product, qty);
                onClose();
              }}
              className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add ({qty}) to Material List</span>
            </button>

            <button
              id="modal-whatsapp-order-btn"
              onClick={() => {
                onInstantWhatsAppOrder(product, qty);
                onClose();
              }}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
