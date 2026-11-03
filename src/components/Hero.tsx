import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Github, MessageSquare, Terminal as TerminalIcon, ExternalLink, Linkedin, Sparkles, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { GitHubUser } from '../types';
import GlitchText from './matrix/GlitchText';
import PixelGlitchCard from './matrix/PixelGlitchCard';
import { playMatrixKeystroke, playAccessGranted } from '../utils/matrixAudio';

interface HeroProps {
  githubUser: GitHubUser | null;
  loading: boolean;
}

export default function Hero({ githubUser, loading }: HeroProps) {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'whoami', output: 'Syed Zayyan Hussain Zaidi // Software Engineering Undergrad' },
    { cmd: 'cat status.sys', output: 'ROLE: Software Project Management / Full-Stack Dev [READY]' },
  ]);

  const linkedinUrl = "https://www.linkedin.com/in/zayyan-zaidi-a73210287?utm_source=share_via&utm_content=profile&utm_medium=member_android";

  const handleScrollTo = (id: string) => {
    playMatrixKeystroke(1400);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    playMatrixKeystroke(1600);
    let output = '';

    switch (cmd) {
      case 'help':
        output = 'COMMANDS: whoami, bio, certs, skills, repos, clear, matrix, contact';
        break;
      case 'whoami':
        output = 'Syed Zayyan Hussain Zaidi — Karachi, PK. Software Engineering @ NED UET.';
        break;
      case 'bio':
        output = 'Full-stack engineer with hands-on MERN experience, AI system validation, and project leadership.';
        break;
      case 'certs':
        output = 'Google Cloud: (1) Engineer AI Agents with ADK, (2) Build a Website on GCP.';
        break;
      case 'skills':
        output = 'Python, JavaScript/TypeScript, React, Node.js, Express, MongoDB, SQL, C++, Tkinter';
        break;
      case 'repos':
        output = `REPOSITORIES: ${githubUser?.public_repos || 24} // STACK: MERN + Python Systems`;
        break;
      case 'contact':
        output = 'PHONE/WA: +92-318-7974475 // EMAIL: zayyanzaidi57@gmail.com';
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'matrix':
        output = 'THE MATRIX IS REAL. BYTECODE RECONSTRUCTED.';
        playAccessGranted();
        break;
      default:
        output = `COMMAND NOT FOUND: "${cmd}". Type "help" for options.`;
    }

    setTerminalHistory((prev) => [...prev.slice(-4), { cmd, output }]);
    setTerminalInput('');
  };

  // Recruiter Key Highlights (No walls of text, high impact visual metrics)
  const quickSpecs = [
    { label: 'ACADEMICS', val: 'NED UET — B.E. Software Eng', icon: <Sparkles className="w-3.5 h-3.5 text-[#00ff66]" /> },
    { label: 'EXPERIENCE', val: 'Growth Intern @ Farokht Tech', icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff66]" /> },
    { label: 'CERTIFIED', val: 'Google Cloud AI Agents (ADK)', icon: <Award className="w-3.5 h-3.5 text-[#00ff66]" /> },
    { label: 'DOMAINS', val: 'Full-Stack MERN & Systems', icon: <ShieldCheck className="w-3.5 h-3.5 text-[#00ff66]" /> },
  ];

  const [heroGlitchActive, setHeroGlitchActive] = useState(false);

  // Trigger momentary RGB channel shift on load and periodically after time delay
  React.useEffect(() => {
    // Initial mount glitch
    setHeroGlitchActive(true);
    const initialTimer = setTimeout(() => setHeroGlitchActive(false), 600);

    // Periodic time-delayed glitch every 5.5 seconds to keep the title reactive and alive
    const interval = setInterval(() => {
      setHeroGlitchActive(true);
      setTimeout(() => setHeroGlitchActive(false), 500);
    }, 5500);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center pt-20 pb-16 overflow-hidden bg-transparent dark:bg-transparent transition-colors duration-300"
    >
      {/* Background Matrix Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff6608_1px,transparent_1px),linear-gradient(to_bottom,#00ff6608_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Multi-Tone Atmospheric Ambient Lighting (Emerald, Cyan, Violet in Dark Mode) */}
      <div className="absolute top-1/6 left-[-5%] w-[450px] h-[450px] bg-cyan-500/10 dark:bg-cyan-400/[0.12] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#00ff66]/10 dark:bg-[#00ff66]/[0.12] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-5%] w-[400px] h-[400px] bg-purple-600/10 dark:bg-fuchsia-600/[0.08] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Introductions & Reactive Widgets */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5">
            
            {/* Status Banner with Dual-Tone Glow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/20 dark:bg-gradient-to-r dark:from-[#081a10] dark:via-[#051108] dark:to-[#020805] border border-emerald-500/30 dark:border-t-emerald-400/40 dark:border-r-cyan-400/30 text-emerald-700 dark:text-[#00ff66] font-mono text-[11px] shadow-xs dark:shadow-[inset_0_1px_0_rgba(0,255,102,0.2),0_0_15px_rgba(0,255,102,0.1)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff66] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff66]"></span>
              </span>
              <span className="font-bold tracking-wider uppercase">
                Available for Roles
              </span>
              <span className="text-emerald-500/40">|</span>
              <span className="text-[10px] tracking-wide text-neutral-600 dark:text-emerald-200 font-semibold truncate max-w-[200px] sm:max-w-none">
                Software Project Management &amp; Full-Stack
              </span>
            </motion.div>

            {/* Profile Avatar Widget with Laser Sweep */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="w-full sm:w-auto"
            >
              <PixelGlitchCard
                id="hero-profile-widget"
                tag="Profile"
                title="Syed Zayyan Hussain Zaidi"
                className="p-3 shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative flex-shrink-0 group">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#00ff66] via-cyan-400 to-emerald-600 opacity-40 blur-xs group-hover:opacity-75 transition-opacity" />
                    <img
                      id="hero-profile-picture"
                      src={githubUser?.avatar_url || "https://github.com/ZayyanZaidi.png"}
                      alt="Syed Zayyan Hussain Zaidi Portrait"
                      className="relative w-14 h-14 rounded-full border-2 border-emerald-500/70 object-cover shadow-sm group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    {/* Matrix scanner laser line over avatar */}
                    <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#00f3ff] to-[#00ff66] shadow-[0_0_8px_#00f3ff] animate-laser-sweep" />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 bg-emerald-500/10 text-emerald-700 dark:text-[#00ff66] border border-emerald-500/30 dark:border-cyan-500/30 rounded font-bold">
                        IDENT: 0xZZ
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 dark:text-cyan-400/80 truncate">
                        KARACHI, PAKISTAN
                      </span>
                    </div>
                    <GlitchText
                      as="h3"
                      text="Syed Zayyan Hussain Zaidi"
                      className="text-base sm:text-lg font-bold font-display text-neutral-900 dark:text-white truncate"
                    />
                    <p className="text-[11px] font-mono text-emerald-700 dark:text-emerald-300 font-semibold tracking-wide truncate">
                      Software Engineering Undergrad @ NED UET
                    </p>
                  </div>
                </div>
              </PixelGlitchCard>
            </motion.div>

            {/* Matrix Hero Headline with Momentary RGB Channel Glitch */}
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                onMouseEnter={() => {
                  setHeroGlitchActive(true);
                  setTimeout(() => setHeroGlitchActive(false), 500);
                }}
              >
                <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-emerald-600 dark:text-[#00ff66] uppercase flex items-center gap-2">
                  <span>Software Engineering &amp; Project Lead</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-950/40 border border-cyan-500/40 text-cyan-400">
                    MERN + AI
                  </span>
                </div>
                <h1
                  id="hero-heading"
                  className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight font-display leading-[1.08] mt-1 transition-all ${
                    heroGlitchActive ? 'rgb-glitch-active' : ''
                  }`}
                  style={
                    heroGlitchActive
                      ? {
                          textShadow:
                            '-2.5px 0 0 rgba(0, 243, 255, 0.9), 2.5px 0 0 rgba(255, 0, 85, 0.9), 0 0 16px rgba(0, 255, 102, 0.7)',
                        }
                      : undefined
                  }
                >
                  ENGINEERING <br />
                  <span className="text-emerald-600 dark:text-[#00ff66] font-mono text-glow-matrix">
                    HIGH-SIGNAL
                  </span> SYSTEMS.
                </h1>
              </motion.div>

              {/* Scannable, Crisp Elevator Pitch (Anti-bombardment) */}
              <motion.p
                id="hero-description"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="text-neutral-700 dark:text-emerald-100/90 text-sm max-w-xl font-sans leading-relaxed pt-1"
              >
                Software engineering student with commercial internship experience at <strong className="text-neutral-900 dark:text-[#00ff66] font-semibold">Farokht Tech</strong>, Google Cloud AI certifications, and production-tested MERN &amp; Python architectures.
              </motion.p>
            </div>

            {/* Recruiter Quick Spec Chips (Rich Dark Mode Surfaces with Dual-Tone Glowing Edges) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-xl pt-1"
            >
              {quickSpecs.map((spec, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/80 dark:bg-gradient-to-r dark:from-[#0a1c12] dark:via-[#06140b] dark:to-[#030906] border border-neutral-200 dark:border-t-emerald-400/30 dark:border-r-cyan-400/25 dark:border-b-emerald-500/20 dark:border-l-emerald-500/20 shadow-xs dark:shadow-[inset_0_1px_0_rgba(0,255,102,0.15),0_2px_10px_-2px_rgba(0,0,0,0.6)] hover:border-emerald-500/50 dark:hover:border-r-cyan-400/60 transition-all"
                >
                  <div className="p-1 rounded bg-emerald-500/10 dark:bg-emerald-500/20 text-[#00ff66] dark:text-[#00ff66] flex-shrink-0 shadow-[0_0_8px_rgba(0,255,102,0.3)]">
                    {spec.icon}
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[9px] font-mono font-bold text-neutral-400 dark:text-cyan-400/70 uppercase">
                      {spec.label}
                    </span>
                    <span className="block text-xs font-mono font-semibold text-neutral-800 dark:text-emerald-200 truncate">
                      {spec.val}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Actions with High-Tech Glow */}
            <motion.div
              id="hero-ctas"
              className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <button
                id="hero-cta-projects"
                onClick={() => handleScrollTo('projects')}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-[#00ff66] hover:from-[#00ff66] hover:to-cyan-400 text-black font-mono font-bold rounded-lg shadow-[0_0_18px_rgba(0,255,102,0.35)] hover:shadow-[0_0_25px_rgba(0,243,255,0.45)] transition-all cursor-pointer group text-xs uppercase tracking-wider"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-cta-contact"
                onClick={() => handleScrollTo('contact')}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-white dark:bg-gradient-to-r dark:from-[#081a10] dark:to-[#040e07] hover:bg-neutral-100 dark:hover:from-[#0b2416] dark:hover:to-[#06150b] text-neutral-800 dark:text-emerald-200 border border-neutral-300 dark:border-emerald-500/40 hover:border-[#00ff66] dark:hover:border-cyan-400 font-mono font-bold rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs dark:shadow-[inset_0_1px_0_rgba(0,255,102,0.2)]"
              >
                <TerminalIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00ff66]" />
                <span>Contact Me</span>
              </button>
            </motion.div>

            {/* Direct Channel Coordinates */}
            <motion.div
              id="hero-socials"
              className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs font-mono text-neutral-500 dark:text-emerald-500/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <a
                id="hero-social-github"
                href="https://github.com/ZayyanZaidi"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMatrixKeystroke(1500)}
                className="hover:text-emerald-600 dark:hover:text-[#00ff66] transition-colors flex items-center gap-1 font-semibold"
              >
                <Github className="w-3.5 h-3.5" />
                <span>github.com/ZayyanZaidi</span>
              </a>
              <span className="text-emerald-500/30">|</span>
              <a
                id="hero-social-linkedin"
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMatrixKeystroke(1500)}
                className="hover:text-emerald-600 dark:hover:text-[#00ff66] transition-colors flex items-center gap-1 font-semibold"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <span className="text-emerald-500/30">|</span>
              <a
                id="hero-social-whatsapp"
                href="https://wa.me/923187974475"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMatrixKeystroke(1500)}
                className="hover:text-emerald-600 dark:hover:text-[#00ff66] transition-colors flex items-center gap-1 font-semibold"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>+92-318-7974475</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive Matrix Terminal CLI & Live Github Telemetry */}
          <motion.div
            id="hero-graphics-column"
            className="lg:col-span-5 relative w-full flex flex-col gap-3.5"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Interactive Terminal Window Card */}
            <PixelGlitchCard
              id="hero-interactive-terminal"
              tag="Terminal"
              title="Interactive CLI Console"
              className="bg-white/95 dark:bg-[#040905]/95 border border-neutral-300 dark:border-emerald-500/30 shadow-xl overflow-hidden font-mono text-xs"
            >
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-3 py-2 bg-neutral-100 dark:bg-[#020503] border-b border-neutral-200 dark:border-emerald-500/20">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00ff66]" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider truncate">
                  <TerminalIcon className="w-3 h-3" />
                  <span>zayyan@matrix:~$</span>
                </div>
                <span className="text-[9px] text-emerald-500/50">BASH</span>
              </div>

              {/* Terminal Body with overflow protection */}
              <div className="p-3.5 space-y-2.5 font-mono text-[11px] min-h-[150px] max-h-[190px] overflow-y-auto break-words">
                <p className="text-emerald-700 dark:text-emerald-400/80 text-[10px]">
                  Click chips below or type: <span className="text-emerald-600 dark:text-[#00ff66] font-bold cursor-pointer underline" onClick={() => setTerminalInput('certs')}>certs</span>, <span className="text-emerald-600 dark:text-[#00ff66] font-bold cursor-pointer underline" onClick={() => setTerminalInput('skills')}>skills</span>, <span className="text-emerald-600 dark:text-[#00ff66] font-bold cursor-pointer underline" onClick={() => setTerminalInput('repos')}>repos</span>.
                </p>

                {terminalHistory.map((entry, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex items-center gap-1 text-neutral-900 dark:text-emerald-200 font-bold">
                      <span className="text-emerald-600 dark:text-[#00ff66]">&gt;</span>
                      <span>{entry.cmd}</span>
                    </div>
                    <div className="pl-3 text-neutral-600 dark:text-emerald-400/90 text-[10px] leading-relaxed border-l border-emerald-500/30 break-all">
                      {entry.output}
                    </div>
                  </div>
                ))}

                {/* Input Prompt */}
                <form onSubmit={handleTerminalSubmit} className="flex items-center gap-1.5 pt-0.5">
                  <span className="text-emerald-600 dark:text-[#00ff66] font-bold">&gt;</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type command..."
                    className="flex-1 bg-transparent text-neutral-900 dark:text-[#00ff66] focus:outline-none placeholder:text-neutral-400 dark:placeholder:text-emerald-700/60 font-mono text-xs"
                  />
                  <span className="w-1.5 h-3.5 bg-emerald-600 dark:bg-[#00ff66] animate-pulse" />
                </form>
              </div>

              {/* Quick CLI command chips */}
              <div className="px-3 py-2 border-t border-neutral-200 dark:border-emerald-500/15 bg-neutral-50 dark:bg-[#030704] flex flex-wrap gap-1">
                {['help', 'whoami', 'certs', 'skills', 'repos', 'contact', 'clear'].map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => {
                      setTerminalInput(cmd);
                      playMatrixKeystroke(1700);
                    }}
                    className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-neutral-200/80 dark:bg-emerald-950/40 hover:bg-[#00ff66]/20 text-neutral-700 dark:text-emerald-300 border border-neutral-300 dark:border-emerald-500/30 transition-all cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </PixelGlitchCard>

            {/* Live GitHub Card */}
            <PixelGlitchCard
              id="hero-github-telemetry"
              tag="GitHub"
              title="Verified Activity Sync"
              className="bg-white/95 dark:bg-[#040905]/95 border border-neutral-300 dark:border-emerald-500/30 p-3 shadow-sm"
            >
              {loading ? (
                <div className="flex items-center gap-3 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-emerald-950/40" />
                  <div className="flex-1 space-y-1">
                    <div className="h-2.5 bg-emerald-950/40 rounded w-1/3" />
                    <div className="h-2 bg-emerald-950/40 rounded w-1/2" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative flex-shrink-0">
                      <img
                        id="hero-avatar"
                        src={githubUser?.avatar_url || "https://github.com/ZayyanZaidi.png"}
                        alt="GitHub Avatar"
                        className="w-9 h-9 rounded-full border border-emerald-500/70 object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00ff66] border border-black flex items-center justify-center">
                        <span className="w-1 h-1 rounded-full bg-black animate-ping" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                          {githubUser?.name || 'Syed Zayyan Hussain Zaidi'}
                        </span>
                        <span className="text-[9px] font-mono px-1 bg-emerald-500/10 text-emerald-700 dark:text-[#00ff66] border border-emerald-500/25 rounded">
                          SYNCED
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-neutral-500 dark:text-emerald-400/80 truncate">
                        {githubUser?.public_repos ?? 24} Repositories • {githubUser?.followers ?? 14} Followers
                      </p>
                    </div>
                  </div>

                  <a
                    id="hero-github-link"
                    href="https://github.com/ZayyanZaidi"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playMatrixKeystroke(1500)}
                    className="flex-shrink-0 px-2.5 py-1.5 rounded-md bg-emerald-500/15 hover:bg-[#00ff66]/25 text-emerald-800 dark:text-[#00ff66] border border-emerald-500/40 text-[10px] font-mono font-bold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span>GITHUB</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </PixelGlitchCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
