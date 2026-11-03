import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CyberBackground from './components/matrix/CyberBackground';
import { GitHubUser, GitHubRepo } from './types';

export default function App() {
  // Theme State (Matrix Phosphor Dark mode by default)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return true; // default dark
  });

  // GitHub integration state
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync Dark Mode state to root HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Fetch GitHub profile data dynamically
  useEffect(() => {
    const fetchGitHubData = async () => {
      setLoading(true);
      try {
        const userRes = await fetch('https://api.github.com/users/ZayyanZaidi');
        if (userRes.ok) {
          const userData = await userRes.json();
          setGithubUser(userData);
        }

        const reposRes = await fetch('https://api.github.com/users/ZayyanZaidi/repos?sort=updated&per_page=100');
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          const originalRepos = reposData.filter((repo: any) => !repo.fork);
          setRepos(originalRepos);
        }
      } catch (err) {
        console.error('Error fetching GitHub portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <div
      id="app-container"
      className="min-h-screen bg-[#fafcf9] dark:bg-[#020403] text-zinc-900 dark:text-emerald-100 font-mono transition-colors duration-300 antialiased selection:bg-[#00ff66]/30 selection:text-[#00ff66] relative"
    >
      {/* Multi-layered Cybernetic Environment: Matrix Digital Stream, Cyber Grid, Aurora Nebula & Cursor Spotlight */}
      <CyberBackground darkMode={darkMode} />

      {/* Sticky Main Navbar */}
      <header id="app-header" className="sticky top-0 z-40 w-full">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>

      {/* Structured Sections with Matrix Architecture */}
      <main className="w-full relative z-10">
        {/* Hero Section */}
        <Hero githubUser={githubUser} loading={loading} />

        {/* Story & Background Section */}
        <About githubUser={githubUser} />

        {/* GitHub stats and dynamic metrics */}
        <Stats githubUser={githubUser} repos={repos} loading={loading} />

        {/* Tab-driven Curated Featured & Dynamic Repositories */}
        <Projects repos={repos} loading={loading} />

        {/* Technical proficiency and practical scope */}
        <Skills />

        {/* Direct Contact & Inquiries */}
        <Contact />
      </main>

      {/* Copyright footer */}
      <Footer />
    </div>
  );
}
