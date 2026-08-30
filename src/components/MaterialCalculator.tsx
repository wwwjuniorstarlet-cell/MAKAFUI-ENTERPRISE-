import React, { useState } from 'react';
import {
  Calculator,
  Layers,
  Sparkles,
  Building,
  Home,
  Plus,
  MessageCircle,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface MaterialCalculatorProps {
  onAddMultipleToQuote: (items: { product: Product; quantity: number; notes: string }[]) => void;
  onInstantWhatsAppCustomText: (text: string) => void;
}

export const MaterialCalculator: React.FC<MaterialCalculatorProps> = ({
  onAddMultipleToQuote,
  onInstantWhatsAppCustomText,
}) => {
  const [activeTab, setActiveTab] = useState<'concrete' | 'blocks' | 'roofing' | 'paint'>('concrete');

  // Concrete Slab / Foundation State
  const [slabLength, setSlabLength] = useState<number>(10); // meters
  const [slabWidth, setSlabWidth] = useState<number>(8); // meters
  const [slabThickness, setSlabThickness] = useState<number>(0.15); // 15cm / 6 inches
  const [mixRatio, setMixRatio] = useState<'1:2:4' | '1:1.5:3'>('1:2:4');

  // Block Wall State
  const [wallLength, setWallLength] = useState<number>(20); // meters
  const [wallHeight, setWallHeight] = useState<number>(3); // meters
  const [blockType, setBlockType] = useState<'5-solid' | '6-solid' | '6-hollow'>('6-solid');

  // Roofing State
  const [roofLength, setRoofLength] = useState<number>(14); // meters
  const [roofSlopeWidth, setRoofSlopeWidth] = useState<number>(9); // meters (both sides)
  const [sheetLengthFt, setSheetLengthFt] = useState<number>(12); // 12ft sheets

  // Paint State
  const [paintArea, setPaintArea] = useState<number>(180); // sq. meters
  const [paintCoats, setPaintCoats] = useState<number>(2);

  // Find base products for calculation
  const cementProduct = PRODUCTS.find((p) => p.id === 'cem-ghacem-extra-42') || PRODUCTS.find((p) => p.category === 'cement') || PRODUCTS[0];
  const sandProduct = PRODUCTS.find((p) => p.id === 'agg-sharp-sand') || PRODUCTS.find((p) => p.category === 'sand-chippings') || PRODUCTS[0];
  const chippingsProduct = PRODUCTS.find((p) => p.id === 'agg-granite-chippings-34') || PRODUCTS.find((p) => p.category === 'sand-chippings') || PRODUCTS[0];
  const ironRod12mm = PRODUCTS.find((p) => p.id === 'rod-high-tensile-12mm') || PRODUCTS.find((p) => p.category === 'iron-rods') || PRODUCTS[0];
  const bindingWire = PRODUCTS.find((p) => p.id === 'wire-binding-roll') || PRODUCTS.find((p) => p.category === 'nails-wire') || PRODUCTS[0];
  const roofSheet = PRODUCTS.find((p) => p.id === 'roof-aluzinc-14ft') || PRODUCTS.find((p) => p.category === 'roofing') || PRODUCTS[0];
  const roofNails = PRODUCTS.find((p) => p.id === 'nails-roofing-washers') || PRODUCTS.find((p) => p.category === 'nails-wire') || PRODUCTS[0];
  const ridgeCaps = PRODUCTS.find((p) => p.id === 'roof-ridge-caps-valleys') || PRODUCTS.find((p) => p.category === 'roofing') || PRODUCTS[0];
  const smartPaint = PRODUCTS.find((p) => p.id === 'paint-smart-thermal-emulsion') || PRODUCTS.find((p) => p.category === 'paint') || PRODUCTS[0];
  const primerProduct = PRODUCTS.find((p) => p.id === 'paint-alkali-primer-sealer') || smartPaint;

  // 1. Concrete Calculations
  const concreteVolume = slabLength * slabWidth * slabThickness; // m³
  const cementMultiplier = mixRatio === '1:2:4' ? 6.5 : 7.8;
  const sandTonsMultiplier = 0.75;
  const chippingsTonsMultiplier = 1.35;

  const concreteCementBags = Math.ceil(concreteVolume * cementMultiplier);
  const concreteSandTons = Math.max(1, Math.ceil(concreteVolume * sandTonsMultiplier));
  const concreteSandTrips = Math.ceil(concreteSandTons / 5);
  const concreteChippingsTons = Math.max(1, Math.ceil(concreteVolume * chippingsTonsMultiplier));
  const concreteChippingsTrips = Math.ceil(concreteChippingsTons / 5);
  const slabArea = slabLength * slabWidth;
  const concreteIronRodLengths = Math.ceil((slabArea / 10) * 7);
  const concreteBindingWireRolls = Math.max(1, Math.ceil(concreteIronRodLengths / 35));

  // 2. Block Wall Calculations
  const wallArea = wallLength * wallHeight;
  const rawBlocks = wallArea * 10;
  const totalBlocksWithWaste = Math.ceil(rawBlocks * 1.05); // 5% site break allowance
  const blockMortarCementBags = Math.ceil(totalBlocksWithWaste / 35);
  const plasterCementBags = Math.ceil((wallArea * 2) / 10);
  const totalWallCementBags = blockMortarCementBags + plasterCementBags;
  const wallSandTons = Math.ceil(totalWallCementBags * 0.45);
  const wallSandTrips = Math.ceil(wallSandTons / 5);

  // 3. Roofing Calculations
  const effectiveCoverWidth = 0.76;
  const totalRoofArea = roofLength * roofSlopeWidth;
  const sheetsNeeded = Math.ceil((roofLength / effectiveCoverWidth) * (roofSlopeWidth / (sheetLengthFt * 0.3048)));
  const ridgeCapsNeeded = Math.ceil(roofLength / 2.2);
  const roofNailsBoxesNeeded = Math.max(1, Math.ceil(sheetsNeeded / 20));

  // 4. Smart Paint Calculations
  const paintLiters = Math.ceil((paintArea * paintCoats) / 6);
  const paint20LBuckets = Math.ceil(paintLiters / 20);
  const primerBuckets = Math.ceil(paintArea / 140);

  // Handlers for adding to quote
  const handleAddConcreteToQuote = () => {
    const items = [
      { product: cementProduct, quantity: concreteCementBags, notes: `Concrete Slab (${slabLength}x${slabWidth}m @ ${slabThickness * 100}cm)` },
      { product: sandProduct, quantity: concreteSandTrips, notes: `Sharp Sand (${concreteSandTons} Tons)` },
      { product: chippingsProduct, quantity: concreteChippingsTrips, notes: `3/4 Chippings (${concreteChippingsTons} Tons)` },
      { product: ironRod12mm, quantity: concreteIronRodLengths, notes: `12mm High-Tensile Steel Mesh` },
      { product: bindingWire, quantity: concreteBindingWireRolls, notes: `Annealed Binding Wire` },
    ];
    onAddMultipleToQuote(items);
  };

  const handleAddRoofingToQuote = () => {
    const items = [
      { product: roofSheet, quantity: sheetsNeeded, notes: `Aluzinc Roofing (${sheetLengthFt}ft lengths for ${roofLength}m x ${roofSlopeWidth}m roof)` },
      { product: ridgeCaps, quantity: ridgeCapsNeeded, notes: `Matching Ridge Caps` },
      { product: roofNails, quantity: roofNailsBoxesNeeded, notes: `Galvanized Roofing Nails with Rubber Washers` },
    ];
    onAddMultipleToQuote(items);
  };

  const handleAddWallToQuote = () => {
    const items = [
      { product: cementProduct, quantity: totalWallCementBags, notes: `Wall Masonry & Plastering for ${wallLength}x${wallHeight}m wall` },
      { product: sandProduct, quantity: wallSandTrips, notes: `Plastering Sand (${wallSandTons} Tons)` },
    ];
    onAddMultipleToQuote(items);
  };

  const handleAddPaintToQuote = () => {
    const items = [
      { product: smartPaint, quantity: paint20LBuckets, notes: `Smart Heat-Reflective Paint (${paintCoats} coats on ${paintArea} m²)` },
      { product: primerProduct, quantity: primerBuckets, notes: `Alkali Undercoat Primer (${paintArea} m²)` },
    ];
    onAddMultipleToQuote(items);
  };

  const handleSendWhatsAppBOM = () => {
    let summary = '';
    if (activeTab === 'concrete') {
      summary = `🏗️ *CONCRETE SLAB ESTIMATION INQUIRY*
*Site Dimensions:* ${slabLength}m x ${slabWidth}m x ${slabThickness * 100}cm (${concreteVolume.toFixed(1)} m³)
*Mix Design:* ${mixRatio}
----------------------------------------
• *Cement (42.5R):* ${concreteCementBags} bags
• *Sharp Sand:* ~${concreteSandTons} Tons / ${concreteSandTrips} Trips
• *3/4" Chippings:* ~${concreteChippingsTons} Tons / ${concreteChippingsTrips} Trips
• *12mm Iron Rods:* ${concreteIronRodLengths} lengths
• *Binding Wire:* ${concreteBindingWireRolls} roll(s)
----------------------------------------
Please provide a spot quotation and delivery schedule for Ho-Titrinu / Volta Region.`;
    } else if (activeTab === 'roofing') {
      summary = `🏠 *ROOFING MATERIAL ESTIMATION INQUIRY*
*Roof Dimensions:* ${roofLength}m x ${roofSlopeWidth}m slope (~${totalRoofArea} m²)
*Sheet Spec:* ${sheetLengthFt}ft Aluzinc Longspan
----------------------------------------
• *Roofing Sheets:* ${sheetsNeeded} lengths (${sheetLengthFt}ft)
• *Ridge Caps:* ${ridgeCapsNeeded} pcs
• *Roofing Nails (with washers):* ${roofNailsBoxesNeeded} box(es)
----------------------------------------
Please confirm current stock and quotation at Makafui Enterprise Ho-Titrinu.`;
    } else if (activeTab === 'blocks') {
      summary = `🧱 *BLOCK WALL ESTIMATION INQUIRY*
*Wall Area:* ${wallLength}m x ${wallHeight}m (${wallArea} m²)
*Block Type:* ${blockType}
----------------------------------------
• *Blocks Needed:* ~${totalBlocksWithWaste} pcs (incl. 5% allowance)
• *Cement for Mortar & Plaster:* ${totalWallCementBags} bags (50kg)
• *Plaster Sand:* ~${wallSandTons} Tons / ${wallSandTrips} Trips
----------------------------------------
Please provide quotation and haulage schedule for my site in Volta Region.`;
    } else {
      summary = `🎨 *SMART PAINT ESTIMATION INQUIRY*
*Wall Area:* ${paintArea} m² (${paintCoats} coats)
----------------------------------------
• *Smart Paint 20L Buckets:* ${paint20LBuckets} buckets
• *Alkali Primer 20L Buckets:* ${primerBuckets} bucket(s)
----------------------------------------
Please advise on available color shades and delivery from Ho-Titrinu.`;
    }

    onInstantWhatsAppCustomText(summary);
  };

  return (
    <section id="calculator" className="py-16 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Site Bill of Quantities Estimator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-['Cabinet_Grotesk',sans-serif] tracking-tight">
            CONSTRUCTION MATERIAL QUANTITY CALCULATOR
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Eliminate guesswork on your building site. Calculate the exact quantities of cement, iron rods, roofing sheets, aggregates, and Smart Paint needed for your structure in Volta Region.
          </p>

          {/* Calculator Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'concrete', label: 'Concrete Slab / Footing', icon: Building },
              { id: 'roofing', label: 'Roofing Sheets & Caps', icon: Home },
              { id: 'blocks', label: 'Block Wall & Plaster', icon: Layers },
              { id: 'paint', label: 'Smart Paint Area', icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`calc-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CALCULATOR 1: CONCRETE SLAB */}
        {activeTab === 'concrete' && (
          <div className="bg-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-2xl max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Inputs */}
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building className="w-5 h-5 text-amber-400" />
                  <span>Slab &amp; Foundation Dimensions</span>
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase">Length (m)</label>
                    <input
                      id="concrete-length-input"
                      type="number"
                      min="1"
                      step="0.5"
                      value={slabLength}
                      onChange={(e) => setSlabLength(parseFloat(e.target.value) || 1)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold mt-1 text-base focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase">Width (m)</label>
                    <input
                      id="concrete-width-input"
                      type="number"
                      min="1"
                      step="0.5"
                      value={slabWidth}
                      onChange={(e) => setSlabWidth(parseFloat(e.target.value) || 1)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold mt-1 text-base focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Thickness</label>
                    <span className="text-amber-400 font-bold text-xs">{(slabThickness * 100).toFixed(0)} cm ({slabThickness * 100 * 0.3937 < 5 ? '4 inches' : '6 inches'})</span>
                  </div>
                  <div className="flex gap-2">
                    {[
                      { val: 0.10, label: '10cm (Light Floor)' },
                      { val: 0.15, label: '15cm (Standard Slab)' },
                      { val: 0.20, label: '20cm (Heavy Beam/Footing)' },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => setSlabThickness(opt.val)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                          slabThickness === opt.val
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-900 text-slate-300 border-slate-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5">
                    Concrete Mix Design
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setMixRatio('1:2:4')}
                      className={`p-2.5 rounded-lg text-xs font-bold text-left border ${
                        mixRatio === '1:2:4'
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-900 text-slate-300 border-slate-700'
                      }`}
                    >
                      <div className="font-extrabold">1:2:4 Mix</div>
                      <div className="text-[10px] opacity-80">Standard Structural Concrete</div>
                    </button>
                    <button
                      onClick={() => setMixRatio('1:1.5:3')}
                      className={`p-2.5 rounded-lg text-xs font-bold text-left border ${
                        mixRatio === '1:1.5:3'
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-900 text-slate-300 border-slate-700'
                      }`}
                    >
                      <div className="font-extrabold">1:1.5:3 Mix</div>
                      <div className="text-[10px] opacity-80">High Strength Column/Deck</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Outputs Breakdown */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div>
                      <span className="text-xs text-slate-400 uppercase font-bold">Total Concrete Volume</span>
                      <div className="text-2xl font-black text-white">{concreteVolume.toFixed(2)} m³</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-amber-400 uppercase font-bold">Bill of Quantities</span>
                      <div className="text-xs font-semibold text-emerald-400">Direct Depot Supply</div>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between p-2.5 bg-slate-800/80 rounded-xl">
                      <span className="text-slate-300">Ghacem / Diamond 42.5R Cement:</span>
                      <strong className="text-amber-400 font-bold">{concreteCementBags} Bags (50kg)</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-800/80 rounded-xl">
                      <span className="text-slate-300">Clean Sharp Sand:</span>
                      <strong className="text-white font-bold">~{concreteSandTons} Tons ({concreteSandTrips} Tipper Trips)</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-800/80 rounded-xl">
                      <span className="text-slate-300">3/4" Granite Chippings:</span>
                      <strong className="text-white font-bold">~{concreteChippingsTons} Tons ({concreteChippingsTrips} Tipper Trips)</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-800/80 rounded-xl">
                      <span className="text-slate-300">12mm High-Tensile Iron Rods:</span>
                      <strong className="text-white font-bold">{concreteIronRodLengths} Lengths (12m)</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-800/80 rounded-xl">
                      <span className="text-slate-300">Annealed Binding Wire:</span>
                      <strong className="text-white font-bold">{concreteBindingWireRolls} Roll(s) (25kg)</strong>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    id="add-concrete-to-quote-btn"
                    onClick={handleAddConcreteToQuote}
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add All to Material List</span>
                  </button>
                  <button
                    id="whatsapp-concrete-bom-btn"
                    onClick={handleSendWhatsAppBOM}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3 px-4 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CALCULATOR 2: ROOFING */}
        {activeTab === 'roofing' && (
          <div className="bg-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-2xl max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Home className="w-5 h-5 text-amber-400" />
                  <span>Roofing Dimensions &amp; Sheet Specs</span>
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase">Building Length (m)</label>
                    <input
                      id="roof-length-input"
                      type="number"
                      min="2"
                      value={roofLength}
                      onChange={(e) => setRoofLength(parseFloat(e.target.value) || 2)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold mt-1 text-base focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase">Total Slope Width (m)</label>
                    <input
                      id="roof-slope-input"
                      type="number"
                      min="2"
                      value={roofSlopeWidth}
                      onChange={(e) => setRoofSlopeWidth(parseFloat(e.target.value) || 2)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold mt-1 text-base focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2">
                    Sheet Cut Length
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 12, 14, 16].map((len) => (
                      <button
                        key={len}
                        onClick={() => setSheetLengthFt(len)}
                        className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                          sheetLengthFt === len
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-900 text-slate-300 border-slate-700'
                        }`}
                      >
                        {len} Feet
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div>
                      <span className="text-xs text-slate-400 uppercase font-bold">Total Roof Area</span>
                      <div className="text-2xl font-black text-white">{totalRoofArea.toFixed(0)} m²</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-amber-400 uppercase font-bold">Bill of Quantities</span>
                      <div className="text-xs font-semibold text-emerald-400">Custom Cuts Available</div>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between p-2.5 bg-slate-800/80 rounded-xl">
                      <span className="text-slate-300">Aluzinc Roofing Sheets ({sheetLengthFt}ft):</span>
                      <strong className="text-amber-400 font-bold">{sheetsNeeded} Sheets</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-800/80 rounded-xl">
                      <span className="text-slate-300">Matching 8ft Ridge Caps:</span>
                      <strong className="text-white font-bold">{ridgeCapsNeeded} Pieces</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-800/80 rounded-xl">
                      <span className="text-slate-300">Roof Nails with Rubber Washers:</span>
                      <strong className="text-white font-bold">{roofNailsBoxesNeeded} Box(es)</strong>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    id="add-roof-to-quote-btn"
                    onClick={handleAddRoofingToQuote}
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Material List</span>
                  </button>
                  <button
                    id="whatsapp-roof-bom-btn"
                    onClick={handleSendWhatsAppBOM}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3 px-4 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CALCULATOR 3: BLOCK WALL */}
        {activeTab === 'blocks' && (
          <div className="bg-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-2xl max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <span>Wall Dimensions &amp; Block Selection</span>
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase">Wall Length (m)</label>
                    <input
                      id="block-wall-length"
                      type="number"
                      min="1"
                      value={wallLength}
                      onChange={(e) => setWallLength(parseFloat(e.target.value) || 1)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold mt-1 text-base focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase">Wall Height (m)</label>
                    <input
                      id="block-wall-height"
                      type="number"
                      min="1"
                      value={wallHeight}
                      onChange={(e) => setWallHeight(parseFloat(e.target.value) || 1)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold mt-1 text-base focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2">Block Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: '6-solid', label: '6" Solid (Foundation/Pillar)' },
                      { id: '6-hollow', label: '6" Hollow (Standard)' },
                      { id: '5-solid', label: '5" Solid (Internal)' },
                    ].map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setBlockType(b.id as any)}
                        className={`p-2 rounded-lg text-xs font-bold border transition-all ${
                          blockType === b.id
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-900 text-slate-300 border-slate-700'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div>
                      <span className="text-xs text-slate-400 uppercase font-bold">Total Wall Area</span>
                      <div className="text-2xl font-black text-white">{wallArea.toFixed(1)} m²</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-amber-400 uppercase font-bold">Bill of Quantities</span>
                      <div className="text-xs font-semibold text-emerald-400">Masonry &amp; Render</div>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between p-2.5 bg-slate-800/80 rounded-xl">
                      <span className="text-slate-300">Blocks Required (incl. 5% waste):</span>
                      <strong className="text-amber-400 text-base">{totalBlocksWithWaste} Blocks</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-800/80 rounded-xl">
                      <span className="text-slate-300">Cement for Laying &amp; Plastering:</span>
                      <strong className="text-white font-bold">{totalWallCementBags} Bags (50kg)</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-800/80 rounded-xl">
                      <span className="text-slate-300">Fine Plastering &amp; Masonry Sand:</span>
                      <strong className="text-white font-bold">~{wallSandTons} Tons ({wallSandTrips} Trips)</strong>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    id="add-wall-to-quote-btn"
                    onClick={handleAddWallToQuote}
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Material List</span>
                  </button>
                  <button
                    id="whatsapp-wall-bom-btn"
                    onClick={handleSendWhatsAppBOM}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3 px-4 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CALCULATOR 4: PAINT */}
        {activeTab === 'paint' && (
          <div className="bg-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-2xl max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Smart Paint Coverage Estimation</span>
                </h3>

                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Total Wall Area (Square Meters)
                  </label>
                  <input
                    id="paint-area-input"
                    type="number"
                    min="10"
                    step="5"
                    value={paintArea}
                    onChange={(e) => setPaintArea(parseFloat(e.target.value) || 10)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white font-bold text-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">A 3-bedroom house exterior is approx. 200–350 m²</span>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Number of Coats</label>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((c) => (
                      <button
                        key={c}
                        onClick={() => setPaintCoats(c)}
                        className={`flex-1 py-2.5 rounded-lg text-xs font-bold border transition-all ${
                          paintCoats === c
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-900 text-slate-300 border-slate-700'
                        }`}
                      >
                        {c} {c === 1 ? 'Coat' : 'Coats (Recommended)'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div>
                      <span className="text-xs text-slate-400 uppercase font-bold">Total Liters Needed</span>
                      <div className="text-2xl font-black text-white">{paintLiters} Liters</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-amber-400 uppercase font-bold">Bill of Quantities</span>
                      <div className="text-xs font-semibold text-emerald-400">Coverage Schedule</div>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between p-2.5 bg-slate-800/80 rounded-xl">
                      <span className="text-slate-300">Makafui Smart Shield / Deluxy:</span>
                      <strong className="text-amber-400 font-bold">{paint20LBuckets} x 20L Buckets</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-800/80 rounded-xl">
                      <span className="text-slate-300">Alkali Undercoat Primer:</span>
                      <strong className="text-white font-bold">{primerBuckets} x 20L Buckets</strong>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    id="add-paint-to-quote-btn"
                    onClick={handleAddPaintToQuote}
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Material List</span>
                  </button>
                  <button
                    id="whatsapp-paint-bom-btn"
                    onClick={handleSendWhatsAppBOM}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3 px-4 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
