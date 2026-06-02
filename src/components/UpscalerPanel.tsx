import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Upload, 
  Sparkles, 
  Settings, 
  RefreshCw, 
  Download, 
  Check, 
  Sliders, 
  FileImage,
  Layers
} from "lucide-react";
import ImageSlider from "./ImageSlider";

interface UpscaleProfile {
  id: string;
  name: string;
  description: string;
  accent: string;
}

const UPLOAD_PROFILES: UpscaleProfile[] = [
  { id: "photo", name: "Photorealistic Super-Res", description: "Enhances real-world textures, lighting, and natural depth", accent: "from-emerald-500 to-teal-500" },
  { id: "art", name: "Fine Art & Digital Illustration", description: "Smooths color gradients and restores brushstroke definitions", accent: "from-indigo-500 to-purple-500" },
  { id: "anime", name: "Anime & Cel-Shaded", description: "Preserves sharp boundaries, flat palettes, and anime line arts", accent: "from-pink-500 to-rose-500" },
  { id: "text", name: "Document & Vectorizer", description: "Maximizes edge-contrast to render small characters readable", accent: "from-amber-500 to-orange-500" },
];

export default function UpscalerPanel() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [scaleFactor, setScaleFactor] = useState<string>("4x");
  const [denoiseLevel, setDenoiseLevel] = useState<number>(30);
  const [sharpnessLevel, setSharpnessLevel] = useState<number>(50);
  const [selectedProfile, setSelectedProfile] = useState<string>("photo");
  
  // Processing state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [hasProcessed, setHasProcessed] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const processingSteps = [
    "Analyzing input image structure and color space...",
    "Clearing JPEG noise and compression artifacts...",
    "Executing neural super-resolution scaling matrices...",
    "Reconstructing fine textures and sub-pixel geometries...",
    "Applying local contrast tone-mapping and color recovery...",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      loadFile(e.target.files[0]);
    }
  };

  const loadFile = (file: File) => {
    setFileName(file.name);
    setFileSize((file.size / 1024).toFixed(1) + " KB");
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
        setHasProcessed(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      loadFile(e.dataTransfer.files[0]);
    }
  };

  const startUpscale = () => {
    if (!image) return;
    setIsProcessing(true);
    setCurrentStep(0);

    // Simulate multi-stage upscaling progress
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= processingSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setHasProcessed(true);
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 1400);
  };

  const resetUpscaler = () => {
    setImage(null);
    setFileName("");
    setFileSize("");
    setHasProcessed(false);
    setIsProcessing(false);
  };

  const currentProfileObj = UPLOAD_PROFILES.find(p => p.id === selectedProfile);

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Custom Image Upscaler</h2>
          <p className="text-sm text-slate-500">Upload your own graphic or photo to simulate AI super-resolution upscaling.</p>
        </div>
        {!image && (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <Sparkles className="h-3 w-3" /> Ready to enhance
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!image ? (
          // Upload Drag-and-Drop Area
          <motion.div
            key="uploader"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={triggerUpload}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-16 px-4 text-center cursor-pointer hover:bg-slate-50 hover:border-emerald-300 transition-all duration-300 group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 group-hover:bg-emerald-50 group-hover:scale-105 transition-all duration-300">
              <Upload className="h-6 w-6 text-slate-400 group-hover:text-emerald-600" />
            </div>
            <p className="text-sm font-semibold text-slate-700">
              Drag & drop your files here, or <span className="text-emerald-600 group-hover:underline">browse</span>
            </p>
            <p className="mt-1 text-xs text-slate-400">Supports PNG, JPG, JPEG, and WEBP (Up to 10MB)</p>
          </motion.div>
        ) : isProcessing ? (
          // Processing Stage Spinner/Loader
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
              {/* Outer rotating pulse */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className={`absolute inset-0 rounded-full border-4 border-dashed border-slate-100 border-t-emerald-500`}
              />
              <RefreshCw className="h-8 w-8 text-emerald-500 animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Upscaling in Progress</h3>
            <div className="mt-4 max-w-sm rounded-full bg-slate-150 h-2.5 w-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep + 1) / processingSteps.length) * 100}%` }}
                transition={{ duration: 1.2 }}
              />
            </div>
            {/* Step-by-step descriptive milestones */}
            <p className="mt-4 text-sm font-medium text-slate-600 min-h-[1.5rem]">
              {processingSteps[currentStep]}
            </p>
            <p className="mt-1 text-xs text-slate-400">Processing with {scaleFactor} Super-Resolution Matrix</p>
          </motion.div>
        ) : hasProcessed ? (
          // Success Display with Slider Comparing enhanced vs original
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Image Preview Container */}
              <div className="lg:col-span-2">
                <ImageSlider
                  beforeUrl={image}
                  afterUrl={image}
                  beforeLabel="Original"
                  afterLabel={`Enhanced ${scaleFactor}`}
                  className="aspect-square w-full shadow-lg"
                />
              </div>

              {/* Action Column */}
              <div className="flex flex-col justify-between rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">Upscaling Complete!</h4>
                      <p className="text-xs text-slate-500">{fileName}</p>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-150 text-xs">
                    <div className="flex justify-between py-2">
                      <span className="text-slate-400">Scaling</span>
                      <span className="font-semibold text-slate-700">{scaleFactor} Upscale</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-400">Profile</span>
                      <span className="font-semibold text-slate-700 italic">{currentProfileObj?.name}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-400">Noise Filter</span>
                      <span className="font-semibold text-slate-700">{denoiseLevel}% Smoothness</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-400">Edges</span>
                      <span className="font-semibold text-slate-700">{sharpnessLevel}% Clarity</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <a
                    href={image}
                    download={`upscaled_${fileName || "image"}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition"
                  >
                    <Download className="h-4 w-4" /> Download Enhanced
                  </a>
                  <button
                    onClick={resetUpscaler}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <RefreshCw className="h-4 w-4" /> Upscale New Image
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          // Configuration Panel before triggering processing
          <motion.div
            key="config"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 gap-6 lg:grid-cols-5"
          >
            {/* Image Preview & Info */}
            <div className="lg:col-span-2 flex flex-col justify-between">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-50 border border-slate-200">
                <img
                  src={image}
                  alt="Source preview"
                  className="h-full w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2 min-w-0">
                  <FileImage className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  <span className="truncate text-xs font-semibold text-slate-700">{fileName}</span>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap">{fileSize}</span>
              </div>
            </div>

            {/* Adjustable Parameters */}
            <div className="lg:col-span-3 space-y-5">
              {/* Profile Selector */}
              <div>
                <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5 mb-2.5">
                  <Layers className="h-3 w-3" /> Processing Profile
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {UPLOAD_PROFILES.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProfile(p.id)}
                      className={`relative flex flex-col p-3 rounded-xl border text-left transition group ${
                        selectedProfile === p.id
                          ? "bg-slate-50 border-emerald-500 shadow-sm"
                          : "bg-white border-slate-150 hover:border-slate-350 hover:bg-slate-50/50"
                      }`}
                    >
                      <span className={`text-xs font-semibold ${selectedProfile === p.id ? "text-slate-900" : "text-slate-700"}`}>
                        {p.name}
                      </span>
                      <span className="mt-0.5 text-[10px] leading-tight text-slate-400">
                        {p.description}
                      </span>
                      {selectedProfile === p.id && (
                        <div className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider variables */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl border border-slate-150 bg-slate-50/50 p-4">
                {/* Scale factor selection */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-2">
                    Super Resolution Scale
                  </label>
                  <div className="flex gap-1 bg-white p-1 rounded-lg border border-slate-200">
                    {["2x", "4x", "8xCustom"].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setScaleFactor(val.replace("Custom", ""))}
                        className={`flex-1 text-center py-1 text-xs font-bold rounded-md transition ${
                          scaleFactor === val.replace("Custom", "")
                            ? "bg-stone-900 text-white"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {val.replace("Custom", "x Ultra")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Denoise percentage */}
                <div>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-600">Denoise Filter</label>
                    <span className="text-xs font-mono text-slate-400">{denoiseLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={denoiseLevel}
                    onChange={(e) => setDenoiseLevel(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                {/* Sharpness detail */}
                <div>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-600">Texture Sharpen</label>
                    <span className="text-xs font-mono text-slate-400">{sharpnessLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sharpnessLevel}
                    onChange={(e) => setSharpnessLevel(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>

              {/* Action row */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={resetUpscaler}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-slate-900 transition font-medium text-sm flex items-center justify-center gap-1.5"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={startUpscale}
                  className="flex-1 py-2.5 rounded-xl bg-stone-900 text-white font-semibold text-sm hover:bg-stone-800 transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="h-4 w-4 text-emerald-400" /> Start Super-Res Upscale
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
