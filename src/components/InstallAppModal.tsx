import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Download,
  Share2,
  PlusSquare,
  MoreVertical,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Detect OS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isAndroidDevice = /android/.test(userAgent);
    setIsIOS(isIosDevice);
    setIsAndroid(isAndroidDevice);

    // Listen for PWA install prompt on Android/Chrome
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        {/* Header with amber accent */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-5 text-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center font-black text-xl shadow-md">
              M
            </div>
            <div>
              <h2 className="font-extrabold text-lg sm:text-xl font-['Cabinet_Grotesk',sans-serif] leading-tight">
                Install Makafui App
              </h2>
              <p className="text-xs font-semibold text-slate-900">
                Direct on your phone screen (Fast &amp; Offline Ready)
              </p>
            </div>
          </div>
          <button
            id="close-install-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-950/20 hover:bg-slate-950/40 text-slate-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Quick Benefits Banner */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
              <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-200">1-Tap Access</div>
              <div className="text-[10px] text-slate-400">Open like any app</div>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-200">No App Store</div>
              <div className="text-[10px] text-slate-400">Direct instant setup</div>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
              <Sparkles className="w-5 h-5 text-sky-400 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-200">Zero Storage</div>
              <div className="text-[10px] text-slate-400">Lightweight &amp; fast</div>
            </div>
          </div>

          {/* 1-Click Android Chrome Install (when prompt is available) */}
          {deferredPrompt && (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 text-center space-y-3">
              <p className="text-sm font-semibold text-emerald-300">
                Your device supports 1-Tap direct installation!
              </p>
              <button
                id="direct-pwa-install-btn"
                onClick={handleInstallClick}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl text-base shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                <Download className="w-5 h-5" />
                <span>Install Makafui App Now</span>
              </button>
            </div>
          )}

          {/* Instructions for Android Users */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Smartphone className="w-4 h-4" />
              <span>For Android Phones (Chrome, Samsung Internet, Edge)</span>
            </div>
            <ol className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  Tap the <strong className="text-white">Three Dots (⋮)</strong> menu at the top right of your browser.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  Tap <strong className="text-white">"Install app"</strong> or <strong className="text-white">"Add to Home screen"</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  Tap <strong className="text-amber-400">Install</strong>. The Makafui icon will appear on your phone home screen!
                </span>
              </li>
            </ol>
          </div>

          {/* Instructions for iPhone / iPad Users */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Smartphone className="w-4 h-4" />
              <span>For iPhone &amp; iPad (Safari Browser)</span>
            </div>
            <ol className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  Open this link in <strong className="text-white">Safari</strong> and tap the <strong className="text-white">Share button</strong> (square with arrow up at the bottom).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  Scroll down and tap <strong className="text-white">"Add to Home Screen"</strong> (with the [+] icon).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  Tap <strong className="text-amber-400">Add</strong> in the top right corner. You're all set!
                </span>
              </li>
            </ol>
          </div>

          {/* Direct Link Share / Copy */}
          <div className="pt-2">
            <div className="text-xs text-slate-400 mb-2">Direct App Web Address:</div>
            <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <input
                type="text"
                readOnly
                value={window.location.origin}
                className="bg-transparent text-xs text-amber-400 font-mono w-full focus:outline-none"
              />
              <button
                id="copy-app-link-btn"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.origin);
                  alert('App link copied to clipboard!');
                }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Makafui Depot • Ho-Titrinu
          </span>
          <button
            id="close-modal-bottom-btn"
            onClick={onClose}
            className="text-xs font-bold text-amber-400 hover:text-amber-300"
          >
            Got it, Close
          </button>
        </div>
      </div>
    </div>
  );
};
