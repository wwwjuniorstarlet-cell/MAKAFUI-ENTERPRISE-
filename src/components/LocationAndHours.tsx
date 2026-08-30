import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Truck,
  CheckCircle2,
  Calendar,
  Navigation,
  ShieldCheck,
  ExternalLink,
  Calculator,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';
import { getStoreLiveStatus, formatGHS } from '../utils/helpers';

export const LocationAndHours: React.FC = () => {
  const liveStatus = getStoreLiveStatus();
  const [selectedTown, setSelectedTown] = useState('Ho-Titrinu');
  const [truckType, setTruckType] = useState<'pickup' | 'tipper' | 'flatbed'>('tipper');

  const operatingSchedule = [
    { days: 'Monday', hours: '7:00 AM – 5:00 PM', status: 'Full Service & Site Deliveries' },
    { days: 'Tuesday', hours: '7:00 AM – 5:00 PM', status: 'Full Service & Site Deliveries' },
    { days: 'Wednesday', hours: '7:00 AM – 5:00 PM', status: 'Full Service & Site Deliveries' },
    { days: 'Thursday', hours: '7:00 AM – 5:00 PM', status: 'Full Service & Site Deliveries' },
    { days: 'Friday', hours: '7:00 AM – 5:00 PM', status: 'Full Service & Site Deliveries' },
    { days: 'Saturday', hours: '7:00 AM – 5:00 PM', status: 'Full Service & Site Deliveries' },
    { days: 'Sunday', hours: 'Closed', status: 'Orders accepted on WhatsApp 24/7' },
  ];

  const deliveryTowns = [
    { name: 'Ho-Titrinu', distKm: 2, time: '15–30 mins', baseFee: 60, type: 'Immediate Local Hub' },
    { name: 'Ho Township / Bankoe / Poly', distKm: 8, time: '30–60 mins', baseFee: 120, type: 'Express Truck' },
    { name: 'Sokode & Akrofu', distKm: 14, time: '1–2 hours', baseFee: 160, type: 'Direct Delivery' },
    { name: 'Kpetoe & Agortime', distKm: 22, time: 'Same-Day (2-3 hrs)', baseFee: 220, type: 'Direct Delivery' },
    { name: 'Adaklu & Surroundings', distKm: 28, time: 'Same-Day (2-3 hrs)', baseFee: 260, type: 'Site Dispatch' },
    { name: 'Dzodze & Ketu North', distKm: 65, time: 'Scheduled Freight', baseFee: 480, type: 'Volta Bulk Haulage' },
    { name: 'Keta & Anloga', distKm: 85, time: 'Scheduled Freight', baseFee: 650, type: 'Volta Bulk Haulage' },
    { name: 'Kpando & Hohoe', distKm: 75, time: 'Scheduled Freight', baseFee: 580, type: 'Volta Bulk Haulage' },
  ];

  const currentTownData = deliveryTowns.find((t) => t.name === selectedTown) || deliveryTowns[0];
  const multiplier = truckType === 'pickup' ? 0.7 : truckType === 'tipper' ? 1.0 : 1.4;
  const estimatedHaulageFee = Math.round(currentTownData.baseFee * multiplier);

  return (
    <section id="location-hours" className="py-16 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Store Location &amp; Operating Hours</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-['Cabinet_Grotesk',sans-serif] tracking-tight">
            VISIT MAKAFUI ENTERPRISE IN HO-TITRINU
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Conveniently located along the main Ho–Titrinu thoroughfare in the Volta Region. Ample loading space for heavy tipper trucks, flatbeds, and contractor pickups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Location, Map & Live Status Card */}
          <div className="lg:col-span-6 space-y-6">
            {/* Live Status Hero Block */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className={`w-3 h-3 rounded-full ${liveStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                  <span className="font-bold text-lg text-white">{liveStatus.statusText}</span>
                </div>
                <span className="bg-slate-800 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">
                  Volta Local Time (GMT)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {liveStatus.subText}
              </p>
            </div>

            {/* Address & Contact Quick Details */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-white">Physical Location</h4>
                  <p className="text-sm text-amber-300 font-semibold">{BUSINESS_INFO.location}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Main Ho–Titrinu Road, Ho Municipal District, Volta Region, Ghana.
                  </p>
                </div>
              </div>

              {/* Real Google Map Embed */}
              <div className="overflow-hidden rounded-2xl border border-slate-750 relative bg-slate-950">
                <iframe
                  title="Makafui Enterprise Ho-Titrinu Location Map"
                  src="https://maps.google.com/maps?q=Ho-Titrinu,+Volta+Region,+Ghana&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
                <div className="absolute bottom-2 right-2">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Ho-Titrinu+Volta+Region+Ghana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-900/90 hover:bg-slate-800 text-amber-300 text-[11px] font-bold px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-lg backdrop-blur-sm"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-800">
                <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-white">Direct Phone &amp; Orders</h4>
                  <div className="flex items-center gap-3">
                    <a
                      id="location-call-link"
                      href={`tel:${BUSINESS_INFO.phoneRaw}`}
                      className="text-lg font-black text-amber-400 hover:underline"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                  <p className="text-xs text-slate-400">
                    Call directly for current stock, spot price quotes, or truck bookings.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  id="location-call-btn"
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 024 857 9070</span>
                </a>
                <a
                  id="location-directions-whatsapp-btn"
                  href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                    'Hello Makafui Enterprise, please send me directions / GPS location to your store in Ho-Titrinu.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Interactive Regional Delivery Matrix & Haulage Calculator */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span>Volta Region Site Delivery Estimator</span>
                </h4>
                <span className="text-[11px] text-emerald-400 font-bold">Fast Fleet Dispatch</span>
              </div>

              {/* Interactive Town & Vehicle Selector */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block font-medium mb-1">Select Destination Town:</label>
                    <select
                      value={selectedTown}
                      onChange={(e) => setSelectedTown(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2 font-semibold text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    >
                      {deliveryTowns.map((t) => (
                        <option key={t.name} value={t.name}>
                          {t.name} (~{t.distKm} km)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block font-medium mb-1">Vehicle / Haulage Type:</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'pickup', label: 'Pickup / Aboboyaa' },
                        { id: 'tipper', label: 'Tipper Truck' },
                        { id: 'flatbed', label: 'Flatbed Long' },
                      ].map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setTruckType(v.id as any)}
                          className={`p-1.5 text-center rounded-lg font-bold text-[10px] transition-colors ${
                            truckType === v.id
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-850 text-slate-400 hover:text-white border border-slate-750'
                          }`}
                        >
                          {v.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated Dispatch ETA</span>
                    <span className="text-xs font-bold text-amber-300">{currentTownData.time}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Est. Haulage Fee</span>
                    <span className="text-sm font-black text-amber-400 font-mono">
                      ~ {formatGHS(estimatedHaulageFee)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {deliveryTowns.map((town, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedTown(town.name)}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                      selectedTown === town.name
                        ? 'bg-amber-500/10 border-amber-500/50'
                        : 'bg-slate-850 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-200">{town.name}</div>
                      <div className="text-[10px] text-slate-400">{town.type}</div>
                    </div>
                    <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {town.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Weekly Schedule Table */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Weekly Store Schedule</h3>
                    <p className="text-xs text-slate-400">Regular opening hours in Ho-Titrinu</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                    7:00 AM – 5:00 PM
                  </span>
                </div>
              </div>

              {/* Schedule List */}
              <div className="space-y-2.5">
                {operatingSchedule.map((sched) => {
                  const isClosed = sched.hours.toLowerCase().includes('closed');
                  const isWeekend = sched.days === 'Saturday' || sched.days === 'Sunday';
                  return (
                    <div
                      key={sched.days}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs sm:text-sm transition-colors ${
                        isClosed
                          ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                          : isWeekend
                          ? 'bg-slate-850 border-slate-700/80 text-slate-200'
                          : 'bg-slate-800/80 border-slate-700 text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className={`w-4 h-4 ${!isClosed ? 'text-amber-400' : 'text-slate-500'}`} />
                        <span className="font-bold">{sched.days}</span>
                      </div>

                      <div className="text-right">
                        <span className={`font-mono font-bold ${!isClosed ? 'text-amber-300' : 'text-slate-500'}`}>
                          {sched.hours}
                        </span>
                        <div className="text-[10px] text-slate-400">{sched.status}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Contractor Early Delivery Notice */}
              <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/30 text-xs space-y-1">
                <div className="font-bold text-amber-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Early Morning Concrete Casting Service (7:00 AM)</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  We open early at 7:00 AM promptly to enable contractors and masons in Volta to load cement, sand, and iron rods for morning concrete pouring before peak sun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
