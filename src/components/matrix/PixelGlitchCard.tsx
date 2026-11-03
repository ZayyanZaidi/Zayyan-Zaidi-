import React, { useState, ReactNode } from 'react';

interface PixelGlitchCardProps {
  key?: React.Key;
  children: ReactNode;
  id?: string;
  className?: string;
  tag?: string;
  title?: string;
  reactiveHover?: boolean;
  accentGlow?: boolean;
  scanline?: boolean;
  hexId?: string; // backwards compatibility
}

export default function PixelGlitchCard({
  children,
  id,
  className = '',
  tag,
  title,
  reactiveHover = true,
  accentGlow = true,
  scanline = true,
  hexId,
}: PixelGlitchCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const displayTag = tag || hexId;

  return (
    <div
      id={id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-xl transition-all duration-300 border ${
        isHovered && accentGlow
          ? 'border-emerald-500/60 dark:border-t-[#00ff66]/70 dark:border-r-cyan-400/50 dark:border-b-emerald-500/40 dark:border-l-emerald-500/40 shadow-[0_0_24px_-4px_rgba(0,255,102,0.28),0_0_15px_-4px_rgba(0,243,255,0.18),inset_0_1px_0_rgba(0,255,102,0.35)] -translate-y-0.5'
          : 'border-neutral-200 dark:border-t-emerald-400/35 dark:border-r-cyan-500/20 dark:border-b-emerald-500/20 dark:border-l-emerald-500/20 shadow-xs dark:shadow-[inset_0_1px_0_rgba(0,255,102,0.18),0_6px_24px_-6px_rgba(0,0,0,0.7)]'
      } bg-white dark:bg-gradient-to-b dark:from-[#091a10]/95 dark:via-[#051108]/95 dark:to-[#020704]/98 dark:backdrop-blur-md ${className}`}
    >
      {/* Corner Cyber Reticles (Dual-Tone Emerald + Cyan Accents) */}
      <span className="absolute -top-[1px] -left-[1px] text-[10px] font-mono leading-none text-emerald-500/50 group-hover:text-[#00ff66] transition-colors pointer-events-none select-none z-10">
        ┌
      </span>
      <span className="absolute -top-[1px] -right-[1px] text-[10px] font-mono leading-none text-cyan-500/50 group-hover:text-[#00f3ff] transition-colors pointer-events-none select-none z-10">
        ┐
      </span>
      <span className="absolute -bottom-[1px] -left-[1px] text-[10px] font-mono leading-none text-cyan-500/50 group-hover:text-[#00f3ff] transition-colors pointer-events-none select-none z-10">
        └
      </span>
      <span className="absolute -bottom-[1px] -right-[1px] text-[10px] font-mono leading-none text-emerald-500/50 group-hover:text-[#00ff66] transition-colors pointer-events-none select-none z-10">
        ┘
      </span>

      {/* Top Header System Bar (Polished Cyber Header) */}
      {(displayTag || title) && (
        <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-neutral-200 dark:border-emerald-500/20 bg-neutral-50/80 dark:bg-gradient-to-r dark:from-[#0a1e12] dark:via-[#06140b] dark:to-[#030905] text-[11px] font-mono text-emerald-700 dark:text-emerald-300 select-none rounded-t-xl">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-emerald-500/60 dark:text-[#00f3ff]/70 font-semibold">#</span>
            {displayTag && (
              <span className="font-semibold tracking-wider uppercase text-neutral-800 dark:text-emerald-200">
                {displayTag}
              </span>
            )}
            {title && (
              <>
                <span className="text-emerald-500/40">::</span>
                <span className="text-neutral-600 dark:text-emerald-400/80 truncate">
                  {title}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                isHovered
                  ? 'bg-[#00f3ff] shadow-[0_0_8px_#00f3ff]'
                  : 'bg-[#00ff66]/70 shadow-[0_0_4px_rgba(0,255,102,0.5)]'
              }`}
            />
          </div>
        </div>
      )}

      {/* Main Content (Unblocked, fully interactive) */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Multi-Chromatic Laser Sweep on hover */}
      {scanline && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f3ff]/40 to-[#00ff66]/40 animate-laser-sweep shadow-[0_0_6px_#00f3ff]" />
        </div>
      )}
    </div>
  );
}
