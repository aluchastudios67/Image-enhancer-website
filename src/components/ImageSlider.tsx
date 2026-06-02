import React, { useState } from "react";
import { MoveHorizontal } from "lucide-react";

interface ImageSliderProps {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export default function ImageSlider({
  beforeUrl,
  afterUrl,
  beforeLabel = "Original Lower-Res",
  afterLabel = "Upscaled AI HD",
  className = "",
}: ImageSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <div className={`relative select-none overflow-hidden rounded-2xl bg-slate-100 border border-slate-200/80 shadow-md ${className}`}>
      {/* Before Image (Background, slightly soft/pixelated to simulate original quality) */}
      <div className="absolute inset-0 h-full w-full">
        <img
          src={beforeUrl}
          alt="Original quality"
          className="h-full w-full object-contain filter blur-[1.5px] brightness-[0.98] contrast-[0.95]"
          style={{ imageRendering: "pixelated" }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-4 left-4 rounded-md bg-stone-900/75 px-2.5 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
          {beforeLabel}
        </div>
      </div>

      {/* After Image (Foreground, clipped based on slider position) */}
      <div
        className="absolute inset-y-0 left-0 right-0 h-full overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <div className="absolute inset-0 h-full" style={{ width: "100%" }}>
          <img
            src={afterUrl}
            alt="Upscaled ultra-hd quality"
            className="h-full w-full object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 left-4 whitespace-nowrap rounded-md bg-emerald-600/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm shadow-sm">
            {afterLabel}
          </div>
        </div>
      </div>

      {/* Slider Bar & Handle */}
      <div
        className="absolute inset-y-0 pointer-events-none z-10 flex items-center justify-center"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="h-full w-0.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
        <div className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-600 shadow-lg border border-slate-200 pointer-events-none">
          <MoveHorizontal className="h-4 w-4" />
        </div>
      </div>

      {/* Invisible HTML range input covering the area to intercept mouse and touch drag */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={handleSliderChange}
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        aria-label="Before and after slider position"
      />
    </div>
  );
}
