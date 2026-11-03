import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import { playGlitchChirp, playMatrixKeystroke } from '../../utils/matrixAudio';

interface GlitchSectionEntryProps {
  children?: React.ReactNode;
  badge?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  delay?: number;
  align?: 'left' | 'center';
  intervalMs?: number; // Periodic reactive glitch interval
}

const GLITCH_GLYPHS = '01#%&<>/{}[];_+=*!?~@$010101XYZ';
const BINARY_GLYPHS = '01011001';

/**
 * GlitchSectionEntry
 * Framer Motion transition for section entry on page scroll and continuous time-delayed reactivity:
 * 1. Momentarily shifts characters (digital decipher / matrix reconstruction)
 * 2. Momentarily splits RGB color channels (Cyan #00f3ff, Magenta #ff0055, Emerald #00ff66)
 * 3. Sweeps a chromatic laser scan bar across the title
 * 4. Re-triggers periodically after a time delay while in view to keep the UI reactive and alive
 * 5. Re-triggers on hover / user interaction
 */
export default function GlitchSectionEntry({
  children,
  badge,
  title,
  subtitle,
  className = '',
  delay = 0,
  align = 'center',
  intervalMs = 6500,
}: GlitchSectionEntryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2 });

  const [displayTitle, setDisplayTitle] = useState(title || '');
  const [displayBadge, setDisplayBadge] = useState(badge || '');
  const [isGlitching, setIsGlitching] = useState(false);
  const [statusTag, setStatusTag] = useState('[SYS_RDY]');

  // Glitch execution trigger
  const triggerGlitch = useCallback((playAudio = false) => {
    setIsGlitching(true);
    setStatusTag(Math.random() > 0.5 ? '[PACKET_TX]' : '[RE-SYNC]');

    if (playAudio) {
      playGlitchChirp();
    }

    // Scramble title characters
    if (title) {
      let iteration = 0;
      const originalTitle = title;
      const totalLen = originalTitle.length;

      const titleInterval = setInterval(() => {
        setDisplayTitle(
          originalTitle
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) return originalTitle[index];
              return GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)];
            })
            .join('')
        );

        iteration += totalLen / 10;
        if (iteration >= totalLen) {
          clearInterval(titleInterval);
          setDisplayTitle(originalTitle);
        }
      }, 25);
    }

    // Scramble badge characters
    if (badge) {
      let bIteration = 0;
      const originalBadge = badge;
      const bLen = originalBadge.length;

      const badgeInterval = setInterval(() => {
        setDisplayBadge(
          originalBadge
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < bIteration) return originalBadge[index];
              return BINARY_GLYPHS[Math.floor(Math.random() * BINARY_GLYPHS.length)];
            })
            .join('')
        );

        bIteration += bLen / 7;
        if (bIteration >= bLen) {
          clearInterval(badgeInterval);
          setDisplayBadge(originalBadge);
        }
      }, 30);
    }

    // Settle back to stable state
    const settleTimer = setTimeout(() => {
      setIsGlitching(false);
      setStatusTag('[SYS_RDY]');
    }, 450);

    return () => clearTimeout(settleTimer);
  }, [title, badge]);

  // Initial glitch trigger on viewport entry
  useEffect(() => {
    if (!isInView) return;
    const initialTimer = setTimeout(() => {
      triggerGlitch(false);
    }, delay * 1000 + 100);

    return () => clearTimeout(initialTimer);
  }, [isInView, delay, triggerGlitch]);

  // Periodic time-delayed glitch while remaining in viewport
  useEffect(() => {
    if (!isInView) return;

    // Add slight random offset to prevent all sections synchronizing
    const randomJitter = (Math.random() - 0.5) * 1500;
    const effectiveInterval = Math.max(4500, intervalMs + randomJitter);

    const interval = setInterval(() => {
      triggerGlitch(false);
    }, effectiveInterval);

    return () => clearInterval(interval);
  }, [isInView, intervalMs, triggerGlitch]);

  const handleInteraction = () => {
    playMatrixKeystroke(1800, 0.02);
    triggerGlitch(true);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Optional integrated section header */}
      {(badge || title || subtitle) && (
        <div
          className={`mb-12 cursor-pointer select-none ${
            align === 'center' ? 'text-center max-w-2xl mx-auto' : 'text-left max-w-3xl'
          }`}
          onClick={handleInteraction}
          onMouseEnter={handleInteraction}
        >
          {/* Badge with Binary Glitch Transition */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.35, delay }}
              className={`inline-flex items-center gap-2 px-3 py-1 mb-2.5 rounded-full border text-[11px] font-mono font-semibold tracking-[0.2em] uppercase transition-all duration-200 ${
                isGlitching
                  ? 'border-[#00f3ff]/80 text-[#00f3ff] bg-cyan-950/50 shadow-[0_0_15px_rgba(0,243,255,0.5)] scale-[1.02]'
                  : 'border-emerald-500/30 text-emerald-700 dark:text-[#00ff66] bg-emerald-500/10 dark:bg-emerald-950/40 shadow-[0_0_10px_rgba(0,255,102,0.15)] hover:border-[#00ff66]/60'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  isGlitching ? 'bg-[#00f3ff] animate-ping' : 'bg-[#00ff66]'
                }`}
              />
              <span>{displayBadge}</span>
              <span className={`text-[9px] transition-colors ${isGlitching ? 'text-[#00f3ff]' : 'text-emerald-500 dark:text-emerald-400 opacity-60'}`}>
                {statusTag}
              </span>
            </motion.div>
          )}

          {/* Heading with RGB Channel Offset Glitch & Character Shifting */}
          {title && (
            <div className="relative overflow-visible group">
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        x: isGlitching ? [-2.5, 3, -1.5, 2, 0] : 0,
                        skewX: isGlitching ? ['-1.5deg', '2deg', '-0.5deg', '0deg'] : '0deg',
                      }
                    : { opacity: 0, y: 14 }
                }
                transition={{
                  opacity: { duration: 0.4, delay },
                  y: { duration: 0.4, delay },
                  x: { duration: 0.4, ease: 'easeInOut' },
                  skewX: { duration: 0.4, ease: 'easeInOut' },
                }}
                className={`text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight text-neutral-900 dark:text-white transition-all duration-75 ${
                  isGlitching ? 'rgb-glitch-active' : ''
                }`}
                style={
                  isGlitching
                    ? {
                        textShadow:
                          '-2.8px 0 0 rgba(0, 243, 255, 0.95), 2.8px 0 0 rgba(255, 0, 85, 0.95), 0 0 16px rgba(0, 255, 102, 0.7)',
                      }
                    : undefined
                }
              >
                {displayTitle}
              </motion.h2>

              {/* Chromatic Laser Scanline Sweep on Glitch */}
              {isGlitching && (
                <motion.div
                  initial={{ x: '-100%', opacity: 1 }}
                  animate={{ x: '100%', opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2.5px] bg-gradient-to-r from-transparent via-[#00f3ff] to-[#ff0055] pointer-events-none z-20 shadow-[0_0_12px_#00f3ff]"
                />
              )}
            </div>
          )}

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.45, delay: delay + 0.1 }}
              className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-emerald-300/80 font-mono leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Glowing Tech Divider with Dynamic Energy Pulse */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.15 }}
            className={`mt-4 h-[2px] transition-all duration-300 ${
              isGlitching
                ? 'w-32 bg-gradient-to-r from-[#00f3ff] via-[#00ff66] to-[#ff0055] shadow-[0_0_16px_rgba(0,243,255,0.8)]'
                : 'w-20 bg-gradient-to-r from-emerald-500 via-[#00ff66] to-[#00f3ff] shadow-[0_0_10px_rgba(0,255,102,0.6)]'
            } ${align === 'center' ? 'mx-auto' : ''}`}
          />
        </div>
      )}

      {/* Section Content */}
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: delay + 0.1, ease: [0.2, 0.9, 0.3, 1] }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
