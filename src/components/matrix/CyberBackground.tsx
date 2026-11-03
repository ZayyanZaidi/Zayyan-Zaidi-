import { useEffect, useRef, useState } from 'react';

interface CyberBackgroundProps {
  darkMode: boolean;
}

export default function CyberBackground({ darkMode }: CyberBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas Matrix Digital Rain Stream
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Rich Cyber Character Set: Katakana, Binary, Hex, Cyber Syntax
    const characters = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ101010101010ABCDEF01<>/{};:*#+=_~$%&'.split('');

    const fontSize = 15;
    let columns = Math.floor(width / fontSize);

    const drops: number[] = [];
    const speeds: number[] = [];
    const colorTypes: number[] = []; // 0: standard green, 1: cyber cyan, 2: electric white head

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -60);
      speeds[i] = 0.8 + Math.random() * 1.6;
      colorTypes[i] = Math.random() > 0.82 ? 1 : 0;
    }

    let currentMouseX = -1000;
    let currentMouseY = -1000;

    const handleCanvasMouseMove = (e: MouseEvent) => {
      currentMouseX = e.clientX;
      currentMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleCanvasMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops.length = 0;
      speeds.length = 0;
      colorTypes.length = 0;
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -60);
        speeds[i] = 0.8 + Math.random() * 1.6;
        colorTypes[i] = Math.random() > 0.82 ? 1 : 0;
      }
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      // Semi-transparent trailing fade
      ctx.fillStyle = darkMode ? 'rgba(2, 6, 4, 0.12)' : 'rgba(250, 252, 250, 0.16)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const char = characters[Math.floor(Math.random() * characters.length)];
        const dist = Math.hypot(x - currentMouseX, y - currentMouseY);
        const isNearMouse = dist < 140;

        if (isNearMouse) {
          // Interactive cursor energy: radiant white-cyan with bloom
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#00f3ff';
          ctx.shadowBlur = 14;
        } else if (Math.random() > 0.91) {
          // Tip leader: bright glowing white/mint head
          ctx.fillStyle = darkMode ? '#e6fff0' : '#047857';
          ctx.shadowColor = '#00ff66';
          ctx.shadowBlur = 9;
        } else if (colorTypes[i] === 1) {
          // High-tech Cyber Cyan glyph
          ctx.fillStyle = darkMode ? '#00f3ff' : '#0284c7';
          ctx.shadowColor = darkMode ? '#00f3ff' : 'transparent';
          ctx.shadowBlur = darkMode ? 6 : 0;
        } else {
          // Phosphor emerald matrix data
          ctx.fillStyle = darkMode ? '#00ff66' : '#10b981';
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);

        // Reset drop to top with randomized height
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
          speeds[i] = 0.8 + Math.random() * 1.6;
          colorTypes[i] = Math.random() > 0.82 ? 1 : 0;
        }

        // Accelerate slightly near mouse
        drops[i] += speeds[i] * (isNearMouse ? 1.6 : 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleCanvasMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [darkMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Base Canvas Matrix Stream */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          darkMode ? 'opacity-65' : 'opacity-25'
        }`}
      />

      {/* Cyber Grid & Sub-pixel Lattice Mesh */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-60 dark:opacity-75"
        style={{
          backgroundImage: darkMode
            ? `radial-gradient(circle at 1px 1px, rgba(0, 255, 102, 0.15) 1px, transparent 0),
               linear-gradient(to right, rgba(0, 255, 102, 0.04) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(0, 255, 102, 0.04) 1px, transparent 1px)`
            : `radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.1) 1px, transparent 0),
               linear-gradient(to right, rgba(16, 185, 129, 0.03) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(16, 185, 129, 0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px, 40px 40px, 40px 40px',
        }}
      />

      {/* Dynamic Multi-Chromatic Nebula Clouds (Cyan, Emerald, Violet, Amber) */}
      {darkMode && (
        <>
          {/* Top-Left Cyan Plasma */}
          <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(0,243,255,0.11)_0%,transparent_70%)] blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />

          {/* Center-Right Phosphor Emerald Node */}
          <div className="absolute top-1/3 -right-28 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,255,102,0.12)_0%,transparent_70%)] blur-[130px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />

          {/* Lower-Left Cyber Violet Glow */}
          <div className="absolute bottom-1/4 -left-36 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.08)_0%,transparent_70%)] blur-[140px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />

          {/* Bottom Deep Cyan & Emerald Horizon */}
          <div className="absolute -bottom-40 right-1/4 w-[800px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(0,255,102,0.09)_0%,rgba(0,243,255,0.07)_50%,transparent_75%)] blur-[130px]" />
        </>
      )}

      {/* Interactive Cursor Spotlight Aura */}
      {darkMode && mousePos.x > -500 && (
        <div
          className="absolute w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-75 ease-out"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background: 'radial-gradient(circle, rgba(0, 243, 255, 0.08) 0%, rgba(0, 255, 102, 0.04) 40%, transparent 70%)',
            filter: 'blur(35px)',
          }}
        />
      )}

      {/* CRT Scanlines Layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Cinematic CRT Peripheral Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse at center, transparent 45%, rgba(1, 4, 2, 0.55) 80%, rgba(0, 2, 1, 0.92) 100%)'
            : 'radial-gradient(ellipse at center, transparent 65%, rgba(0, 0, 0, 0.06) 100%)',
        }}
      />
    </div>
  );
}
