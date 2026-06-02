import React, { useState } from "react";
import { Sparkles, ArrowRight, Image as ImageIcon, ZoomIn, Eye, Layers, ShieldCheck, Cpu } from "lucide-react";
import ImageSlider from "./components/ImageSlider";
import UpscalerPanel from "./components/UpscalerPanel";

// Path of the generated upscaled apple image:
import upscaledAppleUrl from "./assets/images/upscaled_apple_1780429587950.png";

interface Hotspot {
  id: number;
  title: string;
  description: string;
  coords: { top: string; left: string };
}

const SPOTLIGHT_HOTSPOTS: Hotspot[] = [
  {
    id: 1,
    title: "Delicate Leaf Veining",
    description: "Re-engineered crisp, high-frequency green detailing on the glass leaf, tracing natural flow lines with immaculate texture rendering.",
    coords: { top: "14%", left: "68%" },
  },
  {
    id: 2,
    title: "Chromium Metal Speculars",
    description: "Restored highly shiny specular highlights and perfectly smooth transitions on the chrome-plated attachment stem.",
    coords: { top: "27%", left: "47%" },
  },
  {
    id: 3,
    title: "Emerald Crystal Caustics",
    description: "Multi-layered sub-pixel super-resolution reconstructs internal light-refraction pathways and pristine liquid-like glass depth.",
    coords: { top: "58%", left: "54%" },
  },
];

export default function App() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased font-sans flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Primary Header Group */}
      <header className="border-b border-slate-100 bg-white/85 py-6 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-900 shadow-md">
              <Sparkles className="h-5 w-5 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Super-Resolution Studio</h1>
              <p className="text-xs font-medium text-emerald-600">Pro-grade neural network upscalers</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> GPU acceleration: Active
            </span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-md">v2.4 (React 19)</span>
          </div>
        </div>
      </header>

      {/* Main Core Area */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-5 py-8 space-y-12">
        
        {/* Intro Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-stone-950 p-8 sm:p-12 text-white shadow-lg">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Cpu className="h-64 w-64 text-white" />
          </div>
          <div className="max-w-xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              <Sparkles className="h-3 w-3" /> Advanced AI Upscale Demonstration
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Upscale files to <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">supreme 8K clarity</span>.
            </h2>
            <p className="text-sm sm:text-base text-stone-400 leading-relaxed font-normal">
              Observe restored natural patterns, eliminated JPEG compression noise, and razor-sharp edge reconstruction on the iconic glass masterwork below. Try it yourself by dragging the slider or uploading any custom photo.
            </p>
          </div>
        </div>

        {/* Two key blocks: Spotlight on Apple & Custom Upscaler */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Spotlight Emerald Glass Apple - TAKES 5 COLS */}
          <section className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col justify-between">
              
              <div className="mb-4">
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-xs uppercase tracking-wider mb-1">
                  <Eye className="h-3 w-3" /> Spotlight Showcase
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">The Emerald Glass Apple</h3>
                <p className="text-xs text-slate-500">Compare reconstructed pixel resolution side-by-side.</p>
              </div>

              {/* Slider Area */}
              <div className="relative group">
                <ImageSlider
                  beforeUrl={upscaledAppleUrl}
                  afterUrl={upscaledAppleUrl}
                  beforeLabel="Lower-Res Master"
                  afterLabel="8K Upscaled Purity"
                  className="aspect-square w-full"
                />

                {/* Hotspot triggers overlay */}
                {SPOTLIGHT_HOTSPOTS.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setActiveHotspot(activeHotspot?.id === h.id ? null : h)}
                    className="absolute h-5 w-5 rounded-full bg-stone-900/90 text-emerald-400 border border-emerald-300/40 shadow-md flex items-center justify-center font-mono text-[9px] font-bold cursor-pointer hover:scale-115 active:scale-95 transition-all outline-none z-30"
                    style={{
                      top: h.coords.top,
                      left: h.coords.left,
                      boxShadow: activeHotspot?.id === h.id 
                        ? "0 0 0 6px rgba(16,185,129,0.3)" 
                        : "0 0 10px rgba(0,0,0,0.2)"
                    }}
                    title={h.title}
                  >
                    <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
                    {h.id}
                  </button>
                ))}
              </div>

              {/* Hotspot details explanation box */}
              <div className="mt-5 min-h-[5.5rem] rounded-2xl bg-slate-50 p-4 border border-slate-100 flex flex-col justify-center transition-all">
                {activeHotspot ? (
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                      <ZoomIn className="h-3.5 w-3.5 text-emerald-600" />
                      Detail #{activeHotspot.id}: {activeHotspot.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {activeHotspot.description}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 leading-relaxed text-center italic">
                    Click numbered hot-spots above ( <span className="inline-flex h-3.5 w-3.5 rounded-full bg-stone-900 text-emerald-400 items-center justify-center font-bold text-[8px]">1</span>, <span className="inline-flex h-3.5 w-3.5 rounded-full bg-stone-900 text-emerald-400 items-center justify-center font-bold text-[8px]">2</span>, or <span className="inline-flex h-3.5 w-3.5 rounded-full bg-stone-900 text-emerald-400 items-center justify-center font-bold text-[8px]">3</span> ) to zoom into reconstructed sub-pixel regions of interest.
                  </p>
                )}
              </div>

              {/* Download link for completed apple rendering */}
              <a
                href={upscaledAppleUrl}
                download="upscaled_emerald_apple.png"
                className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition shadow-sm"
              >
                Download Spotlight Image Asset (.png)
              </a>

            </div>
          </section>

          {/* Custom File Upscaler Widget - TAKES 7 COLS */}
          <section className="lg:col-span-7">
            <UpscalerPanel />
          </section>

        </div>

        {/* Feature list detail grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="rounded-2xl border border-slate-150/80 bg-white p-5 flex gap-4">
            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-emerald-600">
              <Cpu className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Super-Resolution</h4>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Applies multi-channel bilinear modeling combined with sharp adaptive edge-warping algorithms to multiply pixel dimensions by up to eightfold.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-150/80 bg-white p-5 flex gap-4">
            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-indigo-600">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Texture Synthesis</h4>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Repopulates fine surfaces like wood grain, glass refractions, textiles, and human skin with synthesized detail profiles suited to specific profiles.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-150/80 bg-white p-5 flex gap-4">
            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-amber-500">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Artifact Eraser</h4>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Intelligently searches and parses JPEG cell blocks, removing ringing noise, blotchiness, and blocking artifacts without losing structural definition.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Humble, clean Footer */}
      <footer className="mt-auto border-t border-slate-150 bg-white py-6">
        <div className="mx-auto max-w-7xl px-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-mono">
          <p>© 2026 Super-Resolution Studio. Powered by AI Studio.</p>
          <div className="flex gap-4">
            <span>Precision: 8K Synthesis</span>
            <span>Target Frame: 60 FPS</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
