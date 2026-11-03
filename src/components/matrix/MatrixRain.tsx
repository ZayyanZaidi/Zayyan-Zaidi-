import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  density?: 'off' | 'low' | 'normal' | 'dense';
  darkMode: boolean;
}

export default function MatrixRain({ density = 'normal', darkMode }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (density === 'off') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Characters: Katakana, Binary 0/1, Hex, Cyber symbols
    const katakana = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ101010101010ABCDEF<>/{};:*#+=_~';
    const characters = katakana.split('');

    const fontSize = 14;
    let columns = Math.floor(width / fontSize);

    // Density factor
    const densityMap = {
      low: 0.4,
      normal: 0.8,
      dense: 1.2,
      off: 0,
    };
    const factor = densityMap[density] || 0.8;

    // Drops store the Y coordinate of each column
    const drops: number[] = [];
    const speeds: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -50);
      speeds[i] = 1 + Math.random() * 1.5;
    }

    // Cursor interaction
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops.length = 0;
      speeds.length = 0;
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -50);
        speeds[i] = 1 + Math.random() * 1.5;
      }
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    const render = () => {
      // Fade previous frame
      ctx.fillStyle = darkMode ? 'rgba(2, 4, 3, 0.09)' : 'rgba(250, 252, 250, 0.14)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > factor) continue;

        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Pick random character
        const text = characters[Math.floor(Math.random() * characters.length)];

        // Mouse proximity boost
        const dist = Math.hypot(x - mouseX, y - mouseY);
        const isNearMouse = dist < 120;

        if (isNearMouse) {
          // Bright glowing cyan/white near cursor
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#00ff66';
          ctx.shadowBlur = 12;
        } else if (Math.random() > 0.88) {
          // Glowing phosphor green head
          ctx.fillStyle = darkMode ? '#c7ffd8' : '#059669';
          ctx.shadowColor = '#00ff66';
          ctx.shadowBlur = 8;
        } else {
          // Classic matrix green
          ctx.fillStyle = darkMode ? '#00ff66' : '#10b981';
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, x, y);

        // Reset drop to top if past height or randomly
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += speeds[i] * (isNearMouse ? 1.8 : 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [density, darkMode]);

  if (density === 'off') return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${
        darkMode ? 'opacity-35' : 'opacity-15'
      }`}
    />
  );
}
