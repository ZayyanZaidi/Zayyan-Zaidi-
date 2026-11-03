import { useState, useEffect, useCallback, ReactNode } from 'react';
import { playMatrixKeystroke, playGlitchChirp } from '../../utils/matrixAudio';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';
  scrambleOnHover?: boolean;
  autoScramble?: boolean;
  intervalMs?: number;
  playAudio?: boolean;
  binaryOnly?: boolean;
  children?: ReactNode;
}

const GLITCH_CHARS = '01010101010101<>/{}[];_+=*&^%$#@!ABCDEF';
const BINARY_CHARS = '01';

export default function GlitchText({
  text,
  className = '',
  as: Component = 'span',
  scrambleOnHover = true,
  autoScramble = false,
  intervalMs = 6000,
  playAudio = false,
  binaryOnly = false,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    if (playAudio) {
      playGlitchChirp();
    }

    const chars = binaryOnly ? BINARY_CHARS : GLITCH_CHARS;
    const originalText = text;
    let iteration = 0;
    const maxIterations = originalText.length;

    const interval = setInterval(() => {
      setDisplayText(() =>
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(originalText);
        setIsScrambling(false);
      }

      iteration += 1 / 2; // Speed of resolving
    }, 25);

    return () => clearInterval(interval);
  }, [text, isScrambling, binaryOnly, playAudio]);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  // Initial mount decode effect
  useEffect(() => {
    const timer = setTimeout(() => {
      scramble();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Optional recurring interval
  useEffect(() => {
    if (!autoScramble) return;
    const timer = setInterval(() => {
      scramble();
    }, intervalMs);
    return () => clearInterval(timer);
  }, [autoScramble, intervalMs, scramble]);

  const handleMouseEnter = () => {
    if (scrambleOnHover) {
      if (playAudio) playMatrixKeystroke(1400);
      scramble();
    }
  };

  return (
    <Component
      onMouseEnter={handleMouseEnter}
      className={`font-mono transition-colors ${isScrambling ? 'text-emerald-400 dark:text-[#00ff66]' : ''} ${className}`}
    >
      {displayText}
    </Component>
  );
}
