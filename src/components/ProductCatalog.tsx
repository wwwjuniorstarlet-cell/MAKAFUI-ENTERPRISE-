import React, { useState, useMemo } from 'react';
import {
  Search,
  Sparkles,
  Layers,
  Plus,
  MessageCircle,
  CheckCircle2,
  Phone,
  Info,
  ArrowUpDown,
  Eye,
} from 'lucide-react';
import { PRODUCTS, BUSINESS_INFO } from '../data/products';
import { ProductCategory, Product } from '../types';

interface ProductCatalogProps {
  onAddToQuote: (product: Product, quantity: number) => void;
  onInstantWhatsAppOrder: (product: Product, quantity: number) => void;
  onViewProductDetails: (product: Product) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onAddToQuote,
  onInstantWhatsAppOrder,
  onViewProductDetails,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'default' | 'name'>('default');

  const categories: { id: ProductCategory; label: string; count: number; iconText?: string }[] = [
    { id: 'all', label: 'All Materials & Services', count: PRODUCTS.length },
    { id: 'cement', label: 'Cement Bags (Ghacem, Dangote, Diamond...)', count: PRODUCTS.filter((p) => p.category === 'cement').length },
    { id: 'paint', label: 'Paints & Coatings (Smart, Deluxy, Leyland)', count: PRODUCTS.filter((p) => p.category === 'paint').length },
    { id: 'roofing', label: 'Roofing Sheets & Aluzinc (0.45mm / IBR)', count: PRODUCTS.filter((p) => p.category === 'roofing').length },
    { id: 'iron-rods', label: 'Iron Rods & Rebar (12mm, 20mm, BRC)', count: PRODUCTS.filter((p) => p.category === 'iron-rods').length },
    { id: 'nails-wire', label: 'Nails & Binding Wire (All kinds)', count: PRODUCTS.filter((p) => p.category === 'nails-wire').length },
    { id: 'sand-chippings', label: 'Chippings, Gravel & Sand (Tipper Supply)', count: PRODUCTS.filter((p) => p.category === 'sand-chippings').length },
    { id: 'timber', label: 'Timber & Wood (Scantlings, Plywood)', count: PRODUCTS.filter((p) => p.category === 'timber').length },
    { id: 'tools-equipment', label: 'Tools, Wheelbarrows, Shovels & Hammers', count: PRODUCTS.filter((p) => p.category === 'tools-equipment').length },
    { id: 'water-supply', label: 'Water Supply & Polytanks (1,000L - 5,000L)', count: PRODUCTS.filter((p) => p.category === 'water-supply').length },
    { id: 'plumbing', label: 'Plumbing (PVC, PPR, Soil Pipes)', count: PRODUCTS.filter((p) => p.category === 'plumbing').length },
    { id: 'electrical', label: 'Electrical Supplies (Copper Cables)', count: PRODUCTS.filter((p) => p.category === 'electrical').length },
    { id: 'doors-windows', label: 'Doors & Windows (Security Steel)', count: PRODUCTS.filter((p) => p.category === 'doors-windows').length },
    { id: 'provision-barber', label: 'Provision Shop & Hair Cut Salon', count: PRODUCTS.filter((p) => p.category === 'provision-barber').length },
  ];

  const filteredProducts = useMemo(() => {
    const list = PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        const matchSubcat = product.subcategory.toLowerCase().includes(query);
        const matchCategory = product.category.toLowerCase().includes(query);
        const matchSpecs = product.specs.some((s) => s.toLowerCase().includes(query));
        return matchName || matchDesc || matchSubcat || matchCategory || matchSpecs;
      }
      return true;
    });

    if (sortBy === 'name') {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [selectedCategory, inStockOnly, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-16 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Full Materials &amp; Services Inventory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-['Cabinet_Grotesk',sans-serif] tracking-tight text-white">
              MATERIALS, SUPPLIES &amp; SERVICES CATALOG
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              Genuine factory-certified construction materials, Smart Paints, roofing sheets, heavy equipment, Polytanks (1,000L to 5,000L), on-site convenience provisions, and executive barbershop services in Ho-Titrinu.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              id="catalog-call-direct"
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-700 transition-all shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Hotline: {BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-800 mb-8 space-y-4 shadow-xl">
          {/* Top Row: Search & Stock Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="catalog-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search materials, cement, 20mm rods, paint, tools, nails..."
                className="w-full bg-slate-950 border border-slate-700 text-white pl-10 pr-4 py-2.5 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between w-full sm:w-auto gap-4 text-xs font-semibold text-slate-300">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded border-slate-700 bg-slate-800 focus:ring-amber-500"
                />
                <span>Show in-stock only</span>
              </label>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-400">Sort:</span>
                <select
                  id="catalog-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-950 border border-slate-700 text-amber-300 text-xs rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-amber-500 focus:outline-none cursor-pointer"
                >
                  <option value="default">Default Order</option>
                  <option value="name">Name (A–Z)</option>
                </select>
              </div>

              <span className="text-slate-400">
                Showing <strong className="text-amber-400">{filteredProducts.length}</strong> items
              </span>
            </div>
          </div>

          {/* Horizontal Scrollable Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const isPaint = cat.id === 'paint';
              return (
                <button
                  key={cat.id}
                  id={`catalog-category-tab-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : isPaint
                      ? 'bg-slate-800 text-amber-300 hover:bg-slate-700 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {isPaint && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-slate-950 text-amber-400' : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-amber-500/50 flex flex-col justify-between transition-all group hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
                >
                  {/* Product Card Image Container */}
                  <div
                    className="relative w-full h-48 bg-slate-950 overflow-hidden cursor-pointer"
                    onClick={() => onViewProductDetails(product)}
                  >
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-95 group-hover:opacity-100"
                      />
                    ) : null}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30 pointer-events-none" />

                    {/* Top Badges Overlay */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
                      <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-700 backdrop-blur-sm">
                        {product.subcategory}
                      </span>
                      {product.badge ? (
                        <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow">
                          {product.badge}
                        </span>
                      ) : (
                        <span className="bg-emerald-950/80 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-500/40 flex items-center gap-1 backdrop-blur-sm">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          In Stock
                        </span>
                      )}
                    </div>

                    {/* Quick Preview Hover Overlay */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1">
                      <Eye className="w-3 h-3 text-amber-400" />
                      <span>View Material Details</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Product Name */}
                      <h3
                        onClick={() => onViewProductDetails(product)}
                        className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-2 leading-snug"
                      >
                        {product.name}
                      </h3>

                      {/* Product Description */}
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Quick Specs bullets */}
                      <div className="space-y-1 pt-2.5 mt-2 border-t border-slate-800 text-[11px] text-slate-300">
                        {product.specs.slice(0, 2).map((spec, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                            <span className="truncate">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer: Unit & Actions */}
                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 mt-2">
                      <div>
                        <div className="text-xs font-bold text-amber-400">
                          Unit: {product.unit}
                        </div>
                        <div className="text-[10px] text-emerald-400 font-medium">
                          Wholesale &amp; Retail
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          id={`btn-info-${product.id}`}
                          onClick={() => onViewProductDetails(product)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs"
                          title="View Details"
                        >
                          <Info className="w-4 h-4" />
                        </button>

                        <button
                          id={`btn-add-quote-${product.id}`}
                          onClick={() => onAddToQuote(product, 1)}
                          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold p-2 px-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1 text-xs"
                          title="Add to Material List"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>

                        <button
                          id={`btn-whatsapp-${product.id}`}
                          onClick={() => onInstantWhatsAppOrder(product, 1)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-2 rounded-xl transition-all shadow-md active:scale-95 text-xs"
                          title="Inquire on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-900 p-12 rounded-3xl border border-slate-800 text-center max-w-lg mx-auto space-y-4 shadow-xl">
            <div className="p-4 bg-slate-800 text-amber-400 rounded-full w-fit mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">No exact material match found</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              We stock additional custom sizes, heavy machinery, and specialized items at our Ho-Titrinu depot. Contact our sales team directly!
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs"
              >
                Call {BUSINESS_INFO.phoneDisplay}
              </a>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  onSearchChange('');
                }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-4 py-2.5 rounded-xl text-xs"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Bottom Banner for Custom / Bulk Contract Inquiries */}
        <div className="mt-12 bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Building a Large Project or Commercial Development?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We provide bulk wholesale supply for full truckloads of cement (Ghacem/Dangote/Diamond/Dura Bond/Sol), full tonnages of 12mm/16mm/20mm iron rods, custom roofing sheets, and 5,000L Polytanks with site delivery across Volta Region.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              id="bulk-order-call-btn"
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md"
            >
              Call 024 857 9070
            </a>
            <a
              id="bulk-order-whatsapp-btn"
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Hello Makafui Enterprise, I have a construction project in Volta and would like a quotation for materials and site delivery.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Sales Team</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
