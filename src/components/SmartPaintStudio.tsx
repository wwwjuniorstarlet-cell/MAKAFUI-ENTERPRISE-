import React, { useState } from 'react';
import {
  Sparkles,
  Sun,
  Droplets,
  CheckCircle2,
  Layers,
  ThermometerSnowflake,
  Calculator,
  Eye,
  Plus,
  MessageCircle,
  Pipette,
  RefreshCw,
} from 'lucide-react';
import { SMART_PAINT_PALETTES, PRODUCTS, BUSINESS_INFO } from '../data/products';
import { Product, SmartPaintPreset } from '../types';

interface SmartPaintStudioProps {
  onAddToQuote: (product: Product, quantity: number, notes?: string) => void;
  onInstantWhatsAppOrder: (product: Product, quantity: number, customNote?: string) => void;
}

export const SmartPaintStudio: React.FC<SmartPaintStudioProps> = ({
  onAddToQuote,
  onInstantWhatsAppOrder,
}) => {
  const smartPaintProducts = PRODUCTS.filter((p) => p.category === 'paint');

  // Simulator State
  const [selectedSurface, setSelectedSurface] = useState<'exterior' | 'interior' | 'roof' | 'perimeter'>('exterior');
  const [selectedColor, setSelectedColor] = useState<SmartPaintPreset>(SMART_PAINT_PALETTES[1]); // Titrinu Warm Sandstone
  const [customHex, setCustomHex] = useState<string>('#E6AF2E');
  const [activeTab, setActiveTab] = useState<'visualizer' | 'calculator' | 'products'>('visualizer');
  const [showBeforeAfter, setShowBeforeAfter] = useState<boolean>(false);

  // Calculator State
  const [wallLength, setWallLength] = useState<number>(12); // meters
  const [wallHeight, setWallHeight] = useState<number>(3); // meters
  const [doorsAndWindowsDeduction, setDoorsAndWindowsDeduction] = useState<number>(4); // sq meters
  const [numberOfCoats, setNumberOfCoats] = useState<number>(2);
  const [selectedPaintId, setSelectedPaintId] = useState<string>(smartPaintProducts[0].id);

  // Compute calculated metrics
  const rawArea = Math.max(1, wallLength * wallHeight - doorsAndWindowsDeduction);
  const totalCoatedArea = rawArea * numberOfCoats;
  const coveragePerLiter = 6; // average sq.m per liter for 2-coat finish (~12 sq.m per coat)
  const totalLitersNeeded = Math.ceil(totalCoatedArea / coveragePerLiter);
  const buckets20LNeeded = Math.ceil(totalLitersNeeded / 20);

  const currentPaint = smartPaintProducts.find((p) => p.id === selectedPaintId) || smartPaintProducts[0];

  const handleAddCalculatedToQuote = () => {
    const note = `Smart Paint: ${selectedColor.name} | Area: ${rawArea.toFixed(1)} m² (${numberOfCoats} coats) | Req: ${buckets20LNeeded}x 20L Buckets`;
    onAddToQuote(currentPaint, buckets20LNeeded, note);
  };

  const handleOrderCalculatedWhatsApp = () => {
    const note = `Smart Paint Order: ${currentPaint.name} (${selectedColor.name}) - ${buckets20LNeeded} bucket(s) 20L for ${rawArea.toFixed(1)} m² wall`;
    onInstantWhatsAppOrder(currentPaint, buckets20LNeeded, note);
  };

  const currentColorHex = showBeforeAfter ? '#8a8d91' : selectedColor.hex;

  return (
    <section id="smart-paint" className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Next-Gen Smart Coating Technology</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Cabinet_Grotesk',sans-serif] tracking-tight">
            MAKAFUI <span className="text-amber-400">SMART PAINT</span> STUDIO
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Standard paints peel, fade, and trap heat. Makafui Smart Paint is formulated with nano-ceramic thermal barriers and crystalline anti-mold resins specifically engineered for Ghana's tropical climate.
          </p>

          {/* Navigation Pill Tabs */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              id="smart-tab-visualizer"
              onClick={() => setActiveTab('visualizer')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'visualizer'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Color &amp; Surface Visualizer</span>
            </button>
            <button
              id="smart-tab-calculator"
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'calculator'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Smart Paint Estimator</span>
            </button>
            <button
              id="smart-tab-products"
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'products'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Smart Formulations ({smartPaintProducts.length})</span>
            </button>
          </div>
        </div>

        {/* 4 Core Pillars of Smart Paint */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 hover:border-amber-500/50 transition-all">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl w-fit mb-3">
              <ThermometerSnowflake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white mb-1">Thermal Heat Reflection</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Nano-spheres deflect up to 88% solar infrared heat, reducing inside room temperatures by up to 7°C.
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 hover:border-emerald-500/50 transition-all">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl w-fit mb-3">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white mb-1">Anti-Mold &amp; Damp Barrier</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Biocidal active resins eliminate moss, algae, and damp peeling on foundation walls in Volta rainy seasons.
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl w-fit mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white mb-1">Ultra-Washable Satin</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tough polymer crosslinks allow dirt, grease, and hand marks to be wiped off effortlessly without color loss.
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-all">
            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl w-fit mb-3">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white mb-1">10-Year UV Color Lock</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Heavy grade inorganic pigments resist harsh West African sunlight without yellowing, chalking, or cracking.
            </p>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE VISUALIZER */}
        {activeTab === 'visualizer' && (
          <div className="bg-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-2xl mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Surface & Color Picker */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                    1. Select Architectural Surface
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'exterior', label: 'Exterior Façade' },
                      { id: 'interior', label: 'Living Room Wall' },
                      { id: 'roof', label: 'Roof Surface' },
                      { id: 'perimeter', label: 'Perimeter Wall' },
                    ].map((surf) => (
                      <button
                        key={surf.id}
                        id={`surface-btn-${surf.id}`}
                        onClick={() => setSelectedSurface(surf.id as any)}
                        className={`p-3 rounded-xl text-xs font-bold text-left transition-all border ${
                          selectedSurface === surf.id
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                        }`}
                      >
                        {surf.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Swatches */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                      2. Choose Smart Paint Shade
                    </label>
                    <span className="text-xs text-slate-400 font-medium">
                      {selectedColor.family.toUpperCase()} PALETTE
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2.5">
                    {SMART_PAINT_PALETTES.map((preset) => {
                      const isSelected = selectedColor.id === preset.id;
                      return (
                        <button
                          key={preset.id}
                          id={`color-swatch-${preset.id}`}
                          onClick={() => {
                            setSelectedColor(preset);
                            setCustomHex(preset.hex);
                          }}
                          className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center group ${
                            isSelected
                              ? 'border-amber-400 bg-slate-800 ring-2 ring-amber-400/50 shadow-md'
                              : 'border-slate-700 bg-slate-800/60 hover:bg-slate-800'
                          }`}
                        >
                          <div
                            className="w-10 h-10 rounded-lg shadow-inner border border-white/20 transition-transform group-hover:scale-105"
                            style={{ backgroundColor: preset.hex }}
                          />
                          <span className="text-[10px] text-slate-300 font-semibold line-clamp-1">
                            {preset.name.split(' ')[1] || preset.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Color Pipette / Picker */}
                <div className="p-3.5 bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Pipette className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">Custom Tint Mixer:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customHex}
                      onChange={(e) => {
                        const newHex = e.target.value;
                        setCustomHex(newHex);
                        setSelectedColor({
                          id: 'custom',
                          name: `Custom Tint (${newHex.toUpperCase()})`,
                          hex: newHex,
                          family: 'Custom',
                          popularFor: 'Bespoke architectural projects',
                          finishRecommended: 'Satin Shield',
                        });
                      }}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <span className="font-mono text-xs text-amber-300 font-bold">{customHex.toUpperCase()}</span>
                  </div>
                </div>

                {/* Selected Color Info Box */}
                <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{selectedColor.name}</span>
                    <span className="font-mono text-amber-400 font-semibold">{selectedColor.hex}</span>
                  </div>
                  <p className="text-slate-300">
                    <strong className="text-slate-400">Ideal For:</strong> {selectedColor.popularFor}
                  </p>
                  <p className="text-slate-300">
                    <strong className="text-slate-400">Recommended Smart Finish:</strong>{' '}
                    <span className="text-amber-300">{selectedColor.finishRecommended}</span>
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    id="add-selected-color-quote-btn"
                    onClick={() => {
                      const p = smartPaintProducts[0];
                      onAddToQuote(p, 1, `Selected Shade: ${selectedColor.name} (${selectedColor.hex}) for ${selectedSurface}`);
                    }}
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Color to Material List</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Dynamic Architectural Vector Preview Stage */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative rounded-3xl overflow-hidden border border-slate-700 bg-slate-950 p-6 sm:p-8 flex flex-col justify-between min-h-[460px] shadow-2xl">
                  {/* Top Bar Controls on Canvas */}
                  <div className="relative z-20 flex flex-wrap items-center justify-between gap-2">
                    <div className="bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-white text-xs font-bold flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: currentColorHex }} />
                      <span>{selectedSurface.toUpperCase()} SIMULATION</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Before / After Toggle */}
                      <button
                        type="button"
                        onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                          showBeforeAfter
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:text-white'
                        }`}
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>{showBeforeAfter ? 'Raw Plaster (Before)' : 'Smart Shield (After)'}</span>
                      </button>

                      <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-400/40 text-amber-400 text-xs font-extrabold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>88% Solar Reflection</span>
                      </div>
                    </div>
                  </div>

                  {/* Architectural Simulation Canvas Graphics */}
                  <div className="relative z-10 my-4 flex items-center justify-center">
                    {/* SVG Realistic Architectural Mockup */}
                    <div className="w-full max-w-lg aspect-[16/10] rounded-2xl overflow-hidden relative shadow-2xl border border-slate-800 bg-gradient-to-b from-sky-900/40 via-slate-900 to-slate-950">
                      {selectedSurface === 'exterior' && (
                        <svg viewBox="0 0 500 300" className="w-full h-full">
                          {/* Sky / Environment */}
                          <defs>
                            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#1e293b" />
                              <stop offset="100%" stopColor="#0f172a" />
                            </linearGradient>
                          </defs>
                          <rect width="500" height="300" fill="url(#skyGrad)" />
                          
                          {/* Sun */}
                          <circle cx="430" cy="50" r="28" fill="#f59e0b" opacity="0.8" />
                          <circle cx="430" cy="50" r="40" fill="#f59e0b" opacity="0.2" />

                          {/* Ground */}
                          <rect x="0" y="240" width="500" height="60" fill="#1e293b" />
                          <rect x="20" y="248" width="460" height="12" fill="#334155" rx="6" />

                          {/* Main Exterior Wall Base (Applies Selected Color) */}
                          <rect
                            x="70"
                            y="110"
                            width="360"
                            height="130"
                            fill={currentColorHex}
                            className="transition-colors duration-500"
                            stroke="#0f172a"
                            strokeWidth="2"
                          />

                          {/* Porch Columns */}
                          <rect x="90" y="140" width="16" height="100" fill="#f1f5f9" rx="2" />
                          <rect x="230" y="140" width="16" height="100" fill="#f1f5f9" rx="2" />

                          {/* Roof (Charcoal Tile) */}
                          <polygon points="50,110 250,35 450,110" fill="#1e293b" stroke="#334155" strokeWidth="3" />
                          <polygon points="65,110 250,42 435,110" fill="#0f172a" opacity="0.6" />

                          {/* Big Modern Windows */}
                          <rect x="270" y="135" width="60" height="50" fill="#38bdf8" fillOpacity="0.4" stroke="#e2e8f0" strokeWidth="2" rx="3" />
                          <line x1="300" y1="135" x2="300" y2="185" stroke="#e2e8f0" strokeWidth="1.5" />
                          <line x1="270" y1="160" x2="330" y2="160" stroke="#e2e8f0" strokeWidth="1.5" />

                          <rect x="350" y="135" width="60" height="50" fill="#38bdf8" fillOpacity="0.4" stroke="#e2e8f0" strokeWidth="2" rx="3" />
                          <line x1="380" y1="135" x2="380" y2="185" stroke="#e2e8f0" strokeWidth="1.5" />
                          <line x1="350" y1="160" x2="410" y2="160" stroke="#e2e8f0" strokeWidth="1.5" />

                          {/* Front Hardwood Door */}
                          <rect x="130" y="140" width="75" height="100" fill="#78350f" stroke="#451a03" strokeWidth="2" rx="2" />
                          <rect x="140" y="150" width="22" height="40" fill="#92400e" rx="2" />
                          <rect x="170" y="150" width="22" height="40" fill="#92400e" rx="2" />
                          <circle cx="195" cy="190" r="3" fill="#f59e0b" />

                          {/* Tropical Plant on Porch */}
                          <circle cx="115" cy="225" r="16" fill="#10b981" />
                          <rect x="107" y="228" width="16" height="14" fill="#d97706" rx="2" />
                        </svg>
                      )}

                      {selectedSurface === 'interior' && (
                        <svg viewBox="0 0 500 300" className="w-full h-full">
                          {/* Ceiling & Floor */}
                          <polygon points="0,0 500,0 420,50 80,50" fill="#0f172a" />
                          <polygon points="0,300 500,300 420,240 80,240" fill="#334155" />

                          {/* Side Walls */}
                          <polygon points="0,0 80,50 80,240 0,300" fill="#1e293b" />
                          <polygon points="500,0 420,50 420,240 500,300" fill="#1e293b" />

                          {/* Center Main Accent Wall (Applies Selected Color) */}
                          <rect
                            x="80"
                            y="50"
                            width="340"
                            height="190"
                            fill={currentColorHex}
                            className="transition-colors duration-500"
                          />

                          {/* Wall Art Frame */}
                          <rect x="180" y="80" width="140" height="70" fill="#0f172a" stroke="#d97706" strokeWidth="3" rx="4" />
                          <text x="250" y="120" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
                            MAKAFUI LIVING
                          </text>

                          {/* Modern Interior Sofa */}
                          <rect x="140" y="170" width="220" height="55" fill="#1e293b" rx="8" stroke="#475569" strokeWidth="2" />
                          <rect x="150" y="160" width="95" height="35" fill="#334155" rx="5" />
                          <rect x="255" y="160" width="95" height="35" fill="#334155" rx="5" />
                          <rect x="130" y="175" width="20" height="40" fill="#475569" rx="4" />
                          <rect x="350" y="175" width="20" height="40" fill="#475569" rx="4" />

                          {/* Floor Lamp */}
                          <line x1="390" y1="120" x2="390" y2="230" stroke="#f59e0b" strokeWidth="2" />
                          <polygon points="380,120 400,120 405,100 375,100" fill="#fde047" opacity="0.9" />
                          <circle cx="390" cy="230" r="10" fill="#d97706" />
                        </svg>
                      )}

                      {selectedSurface === 'roof' && (
                        <svg viewBox="0 0 500 300" className="w-full h-full">
                          {/* Sky */}
                          <rect width="500" height="300" fill="#0f172a" />
                          
                          {/* Walls */}
                          <rect x="100" y="150" width="300" height="110" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />

                          {/* Roof Panels (Takes Selected Color) */}
                          <polygon
                            points="60,150 250,40 440,150"
                            fill={currentColorHex}
                            className="transition-colors duration-500"
                            stroke="#0f172a"
                            strokeWidth="3"
                          />

                          {/* Corrugated Roof Texture Ribs */}
                          {[100, 140, 180, 220, 250, 280, 320, 360, 400].map((x, i) => (
                            <line
                              key={i}
                              x1={x}
                              y1={150}
                              x2={250 + (x - 250) * 0.1}
                              y2={42}
                              stroke="#000000"
                              strokeWidth="1.5"
                              strokeOpacity="0.25"
                            />
                          ))}

                          {/* Windows & Doors */}
                          <rect x="140" y="170" width="60" height="45" fill="#38bdf8" fillOpacity="0.5" stroke="#334155" strokeWidth="2" />
                          <rect x="300" y="170" width="60" height="45" fill="#38bdf8" fillOpacity="0.5" stroke="#334155" strokeWidth="2" />
                          <rect x="230" y="175" width="40" height="85" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                        </svg>
                      )}

                      {selectedSurface === 'perimeter' && (
                        <svg viewBox="0 0 500 300" className="w-full h-full">
                          {/* Sky */}
                          <rect width="500" height="300" fill="#0f172a" />

                          {/* Ground/Driveway */}
                          <rect x="0" y="230" width="500" height="70" fill="#1e293b" />
                          <line x1="0" y1="230" x2="500" y2="230" stroke="#475569" strokeWidth="2" />

                          {/* Perimeter Solid Boundary Wall (Takes Selected Color) */}
                          <rect
                            x="30"
                            y="100"
                            width="280"
                            height="130"
                            fill={currentColorHex}
                            className="transition-colors duration-500"
                            stroke="#0f172a"
                            strokeWidth="2"
                          />

                          {/* Wall Coping / Top Cap */}
                          <rect x="20" y="90" width="300" height="14" fill="#475569" rx="2" />

                          {/* Security Pillars */}
                          <rect x="25" y="80" width="30" height="150" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
                          <rect x="295" y="80" width="30" height="150" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />

                          {/* Grand Sliding Steel Gate */}
                          <rect x="325" y="95" width="150" height="135" fill="#0f172a" stroke="#d97706" strokeWidth="3" rx="4" />
                          {[345, 365, 385, 405, 425, 445].map((gx, idx) => (
                            <line key={idx} x1={gx} y1="100" x2={gx} y2="225" stroke="#f59e0b" strokeWidth="2" />
                          ))}
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Visual Center Graphic Simulation */}
                  <div className="relative z-10 max-w-md mx-auto text-center p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 shadow-2xl space-y-2">
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      {selectedColor.name}
                    </h3>
                    <p className="text-xs text-slate-300">
                      Applied with Makafui Smart Guard™ formulation on {selectedSurface}.
                    </p>

                    {/* Temperature Benchmark Demonstration */}
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <div className="bg-red-950/60 p-2 rounded-xl border border-red-500/30 text-left">
                        <div className="text-[10px] text-red-300 uppercase font-semibold">Standard Paint</div>
                        <div className="text-red-400 font-extrabold text-base sm:text-lg">36.5°C</div>
                        <div className="text-[9px] text-slate-400">Traps heat inside</div>
                      </div>
                      <div className="bg-emerald-950/60 p-2 rounded-xl border border-emerald-500/30 text-left">
                        <div className="text-[10px] text-emerald-300 uppercase font-semibold">Makafui Smart Paint</div>
                        <div className="text-emerald-400 font-extrabold text-base sm:text-lg">29.8°C (-6.7°C)</div>
                        <div className="text-[9px] text-emerald-200">Cool rooms &amp; energy saver</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Preview Footer */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-xs text-white/90 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-white/10 mt-3">
                    <span className="font-medium">📍 Available for direct tinting &amp; mixing at Ho-Titrinu Store</span>
                    <a
                      id="smart-paint-whatsapp-inquire-btn"
                      href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                        `Hello Makafui Enterprise, I would like to order Smart Paint in color "${selectedColor.name}" (${selectedColor.hex}) for my building in Volta Region.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-amber-400 font-bold hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Order this Color on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SMART PAINT QUANTITY ESTIMATOR */}
        {activeTab === 'calculator' && (
          <div className="bg-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-2xl mb-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-1">
                <h3 className="text-2xl font-bold text-white">Smart Paint Area &amp; Bucket Estimator</h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Input your wall dimensions to calculate the exact number of 20L buckets and undercoat primer required.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase">
                    Wall Length (Meters)
                  </label>
                  <input
                    id="paint-calc-wall-length"
                    type="number"
                    min="1"
                    step="0.5"
                    value={wallLength}
                    onChange={(e) => setWallLength(parseFloat(e.target.value) || 1)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-bold text-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-400">e.g. 12 meters per wall</span>
                </div>

                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase">
                    Wall Height (Meters)
                  </label>
                  <input
                    id="paint-calc-wall-height"
                    type="number"
                    min="1"
                    step="0.1"
                    value={wallHeight}
                    onChange={(e) => setWallHeight(parseFloat(e.target.value) || 1)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-bold text-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-400">Standard ceiling is ~3.0m</span>
                </div>

                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase">
                    Deduct Doors/Windows (m²)
                  </label>
                  <input
                    id="paint-calc-deduction"
                    type="number"
                    min="0"
                    step="0.5"
                    value={doorsAndWindowsDeduction}
                    onChange={(e) => setDoorsAndWindowsDeduction(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-bold text-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-400">Door is ~2m², Window ~1.5m²</span>
                </div>
              </div>

              {/* Number of coats & Product Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase">
                    Select Smart Paint Formulation
                  </label>
                  <select
                    id="paint-calc-select-formula"
                    value={selectedPaintId}
                    onChange={(e) => setSelectedPaintId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {smartPaintProducts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.unit})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase">
                    Number of Protective Coats
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        id={`coat-btn-${num}`}
                        onClick={() => setNumberOfCoats(num)}
                        className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all border ${
                          numberOfCoats === num
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-750'
                        }`}
                      >
                        {num} {num === 1 ? 'Coat (Touchup)' : num === 2 ? 'Coats (Standard)' : 'Coats (Heavy Armor)'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output Result Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-2xl border border-amber-500/40 shadow-xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
                      RECOMMENDED SMART SPECIFICATION
                    </span>
                    <h4 className="text-xl font-black text-white">{currentPaint.name}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Packaging Unit:</span>
                    <span className="text-sm font-bold text-amber-400 font-mono">
                      {currentPaint.unit}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <div className="text-xs text-slate-400">Total Net Area</div>
                    <div className="text-lg font-bold text-white">{rawArea.toFixed(1)} m²</div>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <div className="text-xs text-slate-400">Total Volume</div>
                    <div className="text-lg font-bold text-amber-300">{totalLitersNeeded} Liters</div>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <div className="text-xs text-slate-400">20L Buckets</div>
                    <div className="text-xl font-black text-emerald-400">{buckets20LNeeded} Buckets</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                  <button
                    id="calc-add-to-quote-btn"
                    onClick={handleAddCalculatedToQuote}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add {buckets20LNeeded} Buckets to Material List</span>
                  </button>
                  <button
                    id="calc-order-whatsapp-btn"
                    onClick={handleOrderCalculatedWhatsApp}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant Order on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SMART FORMULATIONS PRODUCT CARDS */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {smartPaintProducts.map((paint) => (
              <div
                key={paint.id}
                id={`smart-product-card-${paint.id}`}
                className="bg-slate-850 rounded-2xl border border-slate-700 hover:border-amber-500/50 p-6 flex flex-col justify-between transition-all group shadow-xl hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold px-2.5 py-1 rounded-full">
                      {paint.badge || 'Smart Tech'}
                    </span>
                    <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      In Stock
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {paint.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">{paint.subcategory}</p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {paint.description}
                  </p>

                  {/* Specifications checklist */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-750">
                    {paint.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-750 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Unit: {paint.unit}
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-400">Available at Titrinu Depot</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      id={`smart-card-add-${paint.id}`}
                      onClick={() => onAddToQuote(paint, 1)}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold p-2.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1 text-xs"
                      title="Add to Material List"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to List</span>
                    </button>
                    <button
                      id={`smart-card-whatsapp-${paint.id}`}
                      onClick={() => onInstantWhatsAppOrder(paint, 1)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-2.5 rounded-xl transition-all shadow-md active:scale-95"
                      title="Order on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
