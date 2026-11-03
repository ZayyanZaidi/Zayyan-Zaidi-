import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X, Github, MessageSquare, Terminal, Linkedin, Download, Sparkles, ChevronRight } from 'lucide-react';
import GlitchText from './matrix/GlitchText';
import { playMatrixKeystroke, playAccessGranted } from '../utils/matrixAudio';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const linkedinUrl = "https://www.linkedin.com/in/zayyan-zaidi-a73210287?utm_source=share_via&utm_content=profile&utm_medium=member_android";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'github-stats', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home', code: '01', sub: 'Overview' },
    { label: 'About', href: '#about', id: 'about', code: '02', sub: 'Profile' },
    { label: 'Activity', href: '#github-stats', id: 'github-stats', code: '03', sub: 'GitHub Stats' },
    { label: 'Projects', href: '#projects', id: 'projects', code: '04', sub: 'Portfolio' },
    { label: 'Skills', href: '#skills', id: 'skills', code: '05', sub: 'Tech Stack' },
    { label: 'Contact', href: '#contact', id: 'contact', code: '06', sub: 'Get in Touch' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playMatrixKeystroke(1600);
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(targetId);
      setSidebarOpen(false);
    }
  };

  const toggleTheme = () => {
    playMatrixKeystroke(1800);
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      playAccessGranted();
    }
  };

  return (
    <>
      <nav
        id="main-nav"
        className={`w-full transition-all duration-300 font-mono ${
          scrolled
            ? 'py-2 bg-white/95 dark:bg-[#020503]/95 backdrop-blur-md border-b border-neutral-300 dark:border-emerald-500/25 shadow-[0_4px_25px_rgba(0,0,0,0.4)]'
            : 'py-2.5 bg-white/90 dark:bg-[#020503]/90 backdrop-blur-sm border-b border-neutral-200/80 dark:border-emerald-500/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11">
            {/* Logo */}
            <motion.a
              id="nav-logo"
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2 text-sm sm:text-base font-bold font-display tracking-wider text-neutral-900 dark:text-white group flex-shrink-0"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="p-1 rounded bg-emerald-500/15 border border-emerald-500/30 group-hover:border-[#00ff66] transition-colors">
                <Terminal className="w-4 h-4 text-emerald-600 dark:text-[#00ff66] group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-mono text-xs sm:text-sm truncate">
                0xZZ::<span className="text-emerald-600 dark:text-[#00ff66] group-hover:text-glow-matrix">ZAYYAN_ZAIDI</span>
              </span>
            </motion.a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  id={`nav-item-desktop-${item.id}`}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative font-mono text-[11px] font-bold tracking-wider py-1.5 px-2.5 rounded-md transition-all ${
                    activeSection === item.id
                      ? 'text-emerald-700 dark:text-[#00ff66] bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_10px_rgba(0,255,102,0.15)]'
                      : 'text-neutral-600 hover:text-neutral-900 dark:text-emerald-400/70 dark:hover:text-[#00ff66] hover:bg-neutral-100 dark:hover:bg-emerald-950/20'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                >
                  <GlitchText text={`[${item.code}] ${item.label}`} scrambleOnHover={true} />
                </motion.a>
              ))}
            </div>

            {/* Right Controls: Desktop */}
            <div className="hidden md:flex items-center gap-2 pl-2">
              {/* LinkedIn */}
              <a
                id="nav-linkedin-link"
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMatrixKeystroke(1400)}
                className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 dark:text-emerald-400 dark:hover:text-[#00ff66] hover:bg-neutral-100 dark:hover:bg-emerald-500/15 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-emerald-500/30"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {/* GitHub */}
              <a
                id="nav-github-link"
                href="https://github.com/ZayyanZaidi"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMatrixKeystroke(1400)}
                className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 dark:text-emerald-400 dark:hover:text-[#00ff66] hover:bg-neutral-100 dark:hover:bg-emerald-500/15 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-emerald-500/30"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              {/* WhatsApp Quick Chat */}
              <a
                id="whatsapp-quick-nav"
                href="https://wa.me/923187974475"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMatrixKeystroke(1400)}
                className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 dark:text-emerald-400 dark:hover:text-[#00ff66] hover:bg-neutral-100 dark:hover:bg-emerald-500/15 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-emerald-500/30"
                title="Direct WhatsApp Chat"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              {/* Theme Toggle Button */}
              <button
                id="theme-toggle-desktop"
                type="button"
                onClick={toggleTheme}
                className="ml-1 p-2 rounded-lg border border-neutral-300 dark:border-emerald-500/40 hover:bg-neutral-100 dark:hover:bg-[#07170a] text-neutral-800 dark:text-[#00ff66] transition-all cursor-pointer shadow-xs"
                title={darkMode ? 'Switch to Light Theme' : 'Switch to Matrix Phosphor Dark'}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-4 h-4 text-[#00ff66]" /> : <Moon className="w-4 h-4 text-neutral-800" />}
              </button>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                id="theme-toggle-mobile"
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-neutral-300 dark:border-emerald-500/30 text-neutral-800 dark:text-[#00ff66] cursor-pointer"
                aria-label="Toggle theme"
                title="Toggle Theme"
              >
                {darkMode ? <Sun className="w-4 h-4 text-[#00ff66]" /> : <Moon className="w-4 h-4 text-neutral-800" />}
              </button>

              <button
                id="mobile-sidebar-toggle"
                type="button"
                onClick={() => {
                  playMatrixKeystroke(1600);
                  setSidebarOpen(!sidebarOpen);
                }}
                className="p-2 rounded-lg border border-neutral-300 dark:border-emerald-500/30 text-neutral-800 dark:text-[#00ff66] hover:border-[#00ff66] transition-colors cursor-pointer"
                aria-label="Open navigation sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Off-Canvas Matrix Sidebar Drawer with Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              id="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                playMatrixKeystroke(1400);
                setSidebarOpen(false);
              }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs lg:hidden"
            />

            {/* Slide-over Drawer */}
            <motion.aside
              id="sidebar-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-white dark:bg-[#030905] border-l border-neutral-300 dark:border-emerald-500/30 shadow-2xl flex flex-col justify-between font-mono lg:hidden select-none"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-neutral-200 dark:border-emerald-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
                    <span className="text-xs font-bold font-display tracking-wider text-neutral-900 dark:text-white uppercase">
                      MATRIX_TERMINAL
                    </span>
                  </div>
                  <button
                    id="sidebar-close-btn"
                    type="button"
                    onClick={() => {
                      playMatrixKeystroke(1500);
                      setSidebarOpen(false);
                    }}
                    className="p-1.5 rounded-lg border border-neutral-300 dark:border-emerald-500/30 text-neutral-700 dark:text-[#00ff66] hover:bg-neutral-100 dark:hover:bg-[#07170a] cursor-pointer"
                    aria-label="Close sidebar"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3 p-2.5 rounded-lg bg-neutral-100 dark:bg-black/60 border border-neutral-200 dark:border-emerald-500/20 text-[11px]">
                  <p className="font-bold text-neutral-900 dark:text-[#00ff66] truncate">
                    Syed Zayyan Hussain Zaidi
                  </p>
                  <p className="text-neutral-500 dark:text-emerald-400/80 text-[10px] truncate mt-0.5">
                    Full-Stack Engineer • NED UET
                  </p>
                </div>
              </div>

              {/* Navigation Items List */}
              <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
                <div className="text-[10px] font-bold text-neutral-400 dark:text-emerald-500/60 uppercase tracking-widest px-2 mb-2">
                  Navigation
                </div>

                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      id={`sidebar-link-${item.id}`}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-bold tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-500/15 text-emerald-800 dark:text-[#00ff66] border border-emerald-500/40 shadow-[0_0_12px_rgba(0,255,102,0.15)]'
                          : 'text-neutral-700 hover:text-neutral-900 dark:text-emerald-400/80 dark:hover:text-[#00ff66] hover:bg-neutral-100 dark:hover:bg-[#051207]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[#00ff66] text-xs font-mono">[{item.code}]</span>
                        <span>{item.label}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 dark:text-emerald-500/50 font-normal">
                        {item.sub}
                      </span>
                    </a>
                  );
                })}

                {/* Theme Switcher Card inside Drawer */}
                <div className="pt-4 mt-4 border-t border-neutral-200 dark:border-emerald-500/20">
                  <div className="text-[10px] font-bold text-neutral-400 dark:text-emerald-500/60 uppercase tracking-widest px-2 mb-2">
                    Appearance
                  </div>
                  <button
                    id="sidebar-theme-toggle"
                    type="button"
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-neutral-100 dark:bg-black/60 border border-neutral-300 dark:border-emerald-500/30 text-xs font-bold text-neutral-800 dark:text-[#00ff66] cursor-pointer hover:border-[#00ff66] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {darkMode ? <Sun className="w-4 h-4 text-[#00ff66]" /> : <Moon className="w-4 h-4 text-neutral-700" />}
                      <span>MODE: {darkMode ? 'MATRIX_DARK' : 'CLEAN_LIGHT'}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-[#00ff66] uppercase">
                      TOGGLE
                    </span>
                  </button>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-neutral-200 dark:border-emerald-500/20 space-y-2 bg-neutral-50 dark:bg-[#020503]">
                <a
                  href="https://wa.me/923187974475"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playMatrixKeystroke(1500)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-[#00ff66] text-black font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>TRANSMIT VIA WHATSAPP</span>
                </a>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playMatrixKeystroke(1400)}
                    className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-neutral-200 dark:bg-[#07170a] border border-neutral-300 dark:border-emerald-500/30 text-neutral-800 dark:text-emerald-300 text-[11px] font-bold"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LINKEDIN</span>
                  </a>

                  <a
                    href="https://github.com/ZayyanZaidi"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playMatrixKeystroke(1400)}
                    className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-neutral-200 dark:bg-[#07170a] border border-neutral-300 dark:border-emerald-500/30 text-neutral-800 dark:text-emerald-300 text-[11px] font-bold"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GITHUB</span>
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
