import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Search, Star, GitFork, SlidersHorizontal, Layers, FolderGit2, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { GitHubRepo, FeaturedProject } from '../types';
import PixelGlitchCard from './matrix/PixelGlitchCard';
import GlitchText from './matrix/GlitchText';
import GlitchSectionEntry from './matrix/GlitchSectionEntry';
import { playMatrixKeystroke, playAccessGranted } from '../utils/matrixAudio';

interface ProjectsProps {
  repos: GitHubRepo[];
  loading: boolean;
}

export default function Projects({ repos, loading }: ProjectsProps) {
  const [activeTab, setActiveTab] = useState<'featured' | 'github'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  // Resume-exact Projects with crisp, high-signal bullets
  const featuredProjects: (FeaturedProject & { bulletHighlights: string[] })[] = [
    {
      id: 'farokht',
      title: 'Farokht — Content Commerce Platform',
      roleSubtitle: 'Full-Stack Engineer // MERN Stack',
      description: 'Full-stack commercial e-commerce and discovery platform built for regional brands.',
      bulletHighlights: [
        'Built with MongoDB, Express, React, and Node.js with JWT authentication and dynamic admin dashboard.',
        'Engineered scalable REST APIs for catalogs & media; deployed via Vercel and Railway with automated CI.',
      ],
      detailedDescription: 'Full production-ready commercial platform with secure token management, product discovery pipelines, media CDNs, and transactional database integrity.',
      techStack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Vercel', 'Railway', 'REST APIs'],
      githubUrl: 'https://github.com/ZayyanZaidi',
      liveUrl: 'https://wa.me/923187974475?text=Hi%20Zayyan,%20I%20am%20interested%20in%20the%20Farokht%20Commerce%20Platform.',
      category: 'Full-Stack',
      featured: true,
    },
    {
      id: 'budgetwise',
      title: 'BudgetWise — Personal Finance Manager',
      roleSubtitle: 'Software Design & Project Lead',
      description: 'Personal finance ecosystem supporting income/expense tracking and real-time ledger analytics.',
      bulletHighlights: [
        'Led end-to-end architecture and system design with complete ER diagrams and technical engineering docs.',
        'Engineered modules for automated threshold notifications, savings-goal allocation, and cloud DB sync.',
      ],
      detailedDescription: 'Designed modular architecture separating transaction ingestion from analytics calculation engines, validated through rigorous software engineering methodologies.',
      techStack: ['Architecture', 'System Design', 'ER Modeling', 'React', 'Node.js', 'Cloud DB'],
      githubUrl: 'https://github.com/ZayyanZaidi',
      liveUrl: 'https://wa.me/923187974475?text=Hi%20Zayyan,%20discussing%20the%20BudgetWise%20system%20architecture.',
      category: 'Software Design',
      featured: true,
    },
    {
      id: 'insurance-system',
      title: 'Insurance Data Management System',
      roleSubtitle: 'Independent Systems Developer',
      description: 'Production-ready desktop CRUD application for corporate insurance policy management.',
      bulletHighlights: [
        'Designed normalized relational schemas in MS Access with complex SQL queries and strict constraint validation.',
        'Engineered ergonomic desktop UI in Python (Tkinter/CustomTkinter) with Role-Based Access Control (RBAC).',
      ],
      detailedDescription: 'Engineered for robust actuarial data management, policy lifecycle tracking, relational constraints, and audit-proof role separation.',
      techStack: ['Python', 'Tkinter', 'CustomTkinter', 'Relational SQL', 'MS Access', 'RBAC'],
      githubUrl: 'https://github.com/ZayyanZaidi',
      liveUrl: 'https://wa.me/923187974475?text=Hi%20Zayyan,%20inquiry%20regarding%20the%20Insurance%20System.',
      category: 'AI & Systems',
      featured: true,
    },
  ];

  // Dynamic language filters for live GitHub repos
  const gitHubLanguages = useMemo(() => {
    if (!repos) return ['All'];
    const langs = new Set<string>();
    repos.forEach((repo) => {
      if (repo.language) langs.add(repo.language);
    });
    return ['All', ...Array.from(langs).sort()];
  }, [repos]);

  // Filter live GitHub repositories based on query & language
  const filteredGitHubRepos = useMemo(() => {
    if (!repos) return [];
    return repos.filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLanguage = selectedLanguage === 'All' || repo.language === selectedLanguage;

      return matchesSearch && matchesLanguage;
    });
  }, [repos, searchQuery, selectedLanguage]);

  const toggleExpand = (id: string) => {
    playMatrixKeystroke(1700);
    setExpandedProjectId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="projects"
      className="py-20 bg-transparent dark:bg-transparent border-t border-neutral-200 dark:border-emerald-500/20 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Ambient Multi-Tone Radial Bloom in Dark Mode */}
      <div className="absolute top-1/4 right-[-5%] w-[420px] h-[420px] bg-cyan-500/[0.08] dark:bg-cyan-400/[0.1] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-5%] w-[420px] h-[420px] bg-[#00ff66]/[0.08] dark:bg-[#00ff66]/[0.1] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Glitch Transition */}
        <GlitchSectionEntry
          badge="Featured Projects"
          title="Engineered Systems & Applications"
          subtitle="Production web platforms, personal finance ecosystems, and desktop systems."
          align="center"
        />

        {/* Tab Controls */}
        <div className="flex justify-center mb-8">
          <div className="p-1 rounded-xl bg-neutral-100 dark:bg-[#040a05] border border-neutral-300 dark:border-emerald-500/25 flex gap-1 font-mono text-xs shadow-inner">
            <button
              id="tab-featured-projects"
              type="button"
              onClick={() => {
                playMatrixKeystroke(1500);
                setActiveTab('featured');
              }}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'featured'
                  ? 'bg-white dark:bg-[#07170a] text-black dark:text-[#00ff66] border border-neutral-300 dark:border-[#00ff66] shadow-[0_0_10px_rgba(0,255,102,0.15)]'
                  : 'text-neutral-600 hover:text-neutral-900 dark:text-emerald-400/70 dark:hover:text-[#00ff66]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00ff66]" />
              <span>Core Projects ({featuredProjects.length})</span>
            </button>
            <button
              id="tab-github-repos"
              type="button"
              onClick={() => {
                playMatrixKeystroke(1500);
                setActiveTab('github');
              }}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'github'
                  ? 'bg-white dark:bg-[#07170a] text-black dark:text-[#00ff66] border border-neutral-300 dark:border-[#00ff66] shadow-[0_0_10px_rgba(0,255,102,0.15)]'
                  : 'text-neutral-600 hover:text-neutral-900 dark:text-emerald-400/70 dark:hover:text-[#00ff66]'
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00ff66]" />
              <span>GitHub Repositories ({repos?.length || '..'})</span>
            </button>
          </div>
        </div>

        {/* Dynamic Tab Render */}
        <AnimatePresence mode="wait">
          {activeTab === 'featured' ? (
            /* FEATURED CURATED PROJECTS */
            <motion.div
              key="featured-tab"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {featuredProjects.map((project) => (
                <PixelGlitchCard
                  key={project.id}
                  id={`project-featured-${project.id}`}
                  tag={project.category}
                  title={project.title}
                  className="flex flex-col justify-between p-5 sm:p-6 bg-white/95 dark:bg-[#06140b]/85 dark:backdrop-blur-md border border-neutral-300 dark:border-t-emerald-400/35 dark:border-r-cyan-400/25 dark:border-b-emerald-500/20 dark:border-l-emerald-500/20 shadow-sm group hover:border-[#00ff66]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-[#00ff66] border border-emerald-500/30 uppercase font-bold">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-500/60 font-semibold">
                        Production Ready
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-mono text-neutral-900 dark:text-white group-hover:text-[#00ff66] transition-colors leading-snug break-words">
                      {project.title}
                    </h3>

                    <p className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                      {project.roleSubtitle}
                    </p>

                    <p className="text-xs text-neutral-600 dark:text-slate-300 font-sans leading-relaxed">
                      {project.description}
                    </p>

                    {/* High-Signal Bullet Points */}
                    <ul className="space-y-1.5 pt-1">
                      {project.bulletHighlights.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-[#00ff66] flex-shrink-0 mt-0.5" />
                          <span className="text-[11px] text-neutral-700 dark:text-slate-200 font-sans leading-tight">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Expandable Engineering Blueprint */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => toggleExpand(project.id)}
                        className="text-[10px] font-mono text-emerald-700 dark:text-[#00ff66] hover:underline flex items-center gap-1 uppercase tracking-wider font-semibold cursor-pointer"
                      >
                        <span>{expandedProjectId === project.id ? '[-] Hide Details' : '[+] View Details'}</span>
                        {expandedProjectId === project.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      <AnimatePresence>
                        {expandedProjectId === project.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 p-2.5 rounded-md bg-neutral-100 dark:bg-black/60 border border-neutral-200 dark:border-emerald-500/25 text-[10px] font-mono text-neutral-700 dark:text-emerald-300 leading-relaxed overflow-hidden"
                          >
                            <span className="text-[9px] text-emerald-600 dark:text-emerald-500/60 font-bold uppercase block mb-1">
                              System Details:
                            </span>
                            {project.detailedDescription}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Tech Stacks Chips */}
                    <div className="flex flex-wrap gap-1 pt-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 rounded text-[9px] font-mono font-medium bg-neutral-100 dark:bg-[#020503] border border-neutral-200 dark:border-emerald-500/25 text-neutral-700 dark:text-emerald-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Metrics Row */}
                  <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-neutral-200 dark:border-emerald-500/20">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono">
                      <span className="text-emerald-700 dark:text-[#00ff66] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold uppercase">
                        Verified Project
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        id={`project-featured-${project.id}-source`}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playMatrixKeystroke(1500)}
                        className="p-1.5 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-black/60 dark:hover:bg-[#00ff66]/20 border border-neutral-300 dark:border-emerald-500/30 text-neutral-700 dark:text-emerald-300 transition-all shadow-xs"
                        title="GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                      <a
                        id={`project-featured-${project.id}-live`}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playMatrixKeystroke(1500)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-[#00ff66] text-black font-mono text-[10px] font-bold uppercase transition-all shadow-xs cursor-pointer"
                      >
                        <span>Inquire</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </PixelGlitchCard>
              ))}
            </motion.div>
          ) : (
            /* GITHUB REAL REPOSITORIES */
            <motion.div
              key="github-tab"
              className="space-y-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {/* Filter & Search Bar */}
              <div className="flex flex-col md:flex-row gap-3 justify-between items-center bg-white/95 dark:bg-[#040905]/95 p-3 rounded-xl border border-neutral-300 dark:border-emerald-500/25 w-full font-mono">
                <div className="relative w-full md:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-500/60" />
                  <input
                    id="repo-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search repositories..."
                    className="pl-9 pr-3 py-1.5 w-full rounded-lg bg-neutral-100 dark:bg-[#020503] border border-neutral-200 dark:border-emerald-500/30 text-xs text-neutral-900 dark:text-[#00ff66] placeholder:text-neutral-400 dark:placeholder:text-emerald-700/60 focus:outline-none focus:border-[#00ff66]"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto py-0.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-500/60 flex-shrink-0" />
                  <div className="flex gap-1">
                    {gitHubLanguages.slice(0, 6).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        id={`filter-lang-${lang}`}
                        onClick={() => {
                          playMatrixKeystroke(1600);
                          setSelectedLanguage(lang);
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer flex-shrink-0 border ${
                          selectedLanguage === lang
                            ? 'bg-[#00ff66]/15 text-[#00ff66] border-[#00ff66] shadow-[0_0_6px_rgba(0,255,102,0.2)]'
                            : 'bg-neutral-100 dark:bg-[#020503] text-neutral-600 dark:text-emerald-500/70 border-neutral-200 dark:border-emerald-500/20'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Repos Grid */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-5 rounded-xl bg-white dark:bg-[#040905] border border-emerald-500/20 animate-pulse h-40"
                    />
                  ))}
                </div>
              ) : filteredGitHubRepos.length === 0 ? (
                <div className="text-center py-12 rounded-xl bg-white dark:bg-[#040905] border border-neutral-200 dark:border-emerald-500/20 font-mono">
                  <FolderGit2 className="w-8 h-8 text-emerald-500/40 mx-auto mb-2" />
                  <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase">
                    NO_MATCHING_REPOSITORIES
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-emerald-500/60 mt-0.5">
                    Adjust search criteria or filter tags.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredGitHubRepos.map((repo) => (
                    <PixelGlitchCard
                      key={repo.id}
                      id={`repo-card-${repo.id}`}
                      hexId={`REPO_0x${(repo.id % 255).toString(16).toUpperCase()}`}
                      title={repo.language || 'BYTECODE'}
                      className="flex flex-col justify-between p-4 bg-white/95 dark:bg-[#06140b]/85 dark:backdrop-blur-md border border-neutral-300 dark:border-t-emerald-400/35 dark:border-r-cyan-400/25 dark:border-b-emerald-500/20 dark:border-l-emerald-500/20 shadow-xs group hover:border-[#00ff66]"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-xs font-bold font-mono text-neutral-900 dark:text-white truncate group-hover:text-[#00ff66] transition-colors">
                            {repo.name}
                          </h4>
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                            {repo.size} KB
                          </span>
                        </div>

                        <p className="text-[11px] text-neutral-500 dark:text-slate-300 font-sans line-clamp-2 leading-relaxed min-h-8">
                          {repo.description || 'Public open-source repository by Syed Zayyan Hussain Zaidi.'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-2.5 border-t border-neutral-200 dark:border-emerald-500/20 font-mono text-[10px]">
                        <span className="text-emerald-700 dark:text-emerald-500/70 font-semibold">
                          {repo.language || 'Code'}
                        </span>

                        <div className="flex items-center gap-2.5">
                          <span className="flex items-center gap-0.5 text-amber-500 text-xs">
                            <Star className="w-2.5 h-2.5" />
                            <span>{repo.stargazers_count}</span>
                          </span>
                          <span className="flex items-center gap-0.5 text-emerald-600 dark:text-[#00ff66] text-xs">
                            <GitFork className="w-2.5 h-2.5" />
                            <span>{repo.forks_count}</span>
                          </span>

                          <a
                            id={`repo-source-link-${repo.id}`}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playMatrixKeystroke(1500)}
                            className="p-1 rounded bg-neutral-100 dark:bg-black/60 border border-neutral-200 dark:border-emerald-500/30 text-neutral-700 dark:text-[#00ff66] hover:border-[#00ff66]"
                            title="Inspect GitHub Repository"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </PixelGlitchCard>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
