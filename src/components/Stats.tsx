import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Users, UserCheck, Calendar, Layers, ExternalLink, Code2 } from 'lucide-react';
import { GitHubUser, GitHubRepo } from '../types';
import PixelGlitchCard from './matrix/PixelGlitchCard';
import GlitchText from './matrix/GlitchText';
import GlitchSectionEntry from './matrix/GlitchSectionEntry';
import { playMatrixKeystroke } from '../utils/matrixAudio';

interface StatsProps {
  githubUser: GitHubUser | null;
  repos: GitHubRepo[];
  loading: boolean;
}

export default function Stats({ githubUser, repos, loading }: StatsProps) {
  const [selectedRepoFilter, setSelectedRepoFilter] = useState<string>('all');

  // Real statistics directly derived from public GitHub API responses
  const derivedStats = useMemo(() => {
    if (!repos || repos.length === 0) {
      return { totalRepos: 0, languages: [] };
    }

    const langCounts: Record<string, number> = {};
    repos.forEach((repo) => {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      }
    });

    const totalLangRepos = Object.values(langCounts).reduce((a, b) => a + b, 0);
    const languages = Object.entries(langCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: totalLangRepos > 0 ? Math.round((count / totalLangRepos) * 100) : 0,
        color: getLanguageColor(name),
      }))
      .sort((a, b) => b.count - a.count);

    return { totalRepos: repos.length, languages };
  }, [repos]);

  function getLanguageColor(lang: string): string {
    const colors: Record<string, string> = {
      TypeScript: '#3178c6',
      JavaScript: '#f1e05a',
      Python: '#3572A5',
      HTML: '#e34c26',
      CSS: '#563d7c',
      'C++': '#f34b7d',
      Java: '#b07219',
    };
    return colors[lang] || '#00ff66';
  }

  // Account creation year
  const memberSince = useMemo(() => {
    if (!githubUser?.created_at) return '2023';
    return new Date(githubUser.created_at).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  }, [githubUser]);

  // Verified Metrics (Grounded, factual, no false promises or fabricated stars)
  const statsItems = [
    {
      id: 'stat-repos',
      tag: 'Repositories',
      icon: <BookOpen className="w-4 h-4 text-emerald-600 dark:text-[#00ff66]" />,
      value: loading ? '...' : String(githubUser?.public_repos ?? repos.length),
      label: 'Public Repositories',
      desc: 'Active GitHub codebase repos',
    },
    {
      id: 'stat-followers',
      tag: 'Community',
      icon: <Users className="w-4 h-4 text-emerald-600 dark:text-[#00ff66]" />,
      value: loading ? '...' : String(githubUser?.followers ?? 0),
      label: 'GitHub Followers',
      desc: 'Developers following profile',
    },
    {
      id: 'stat-following',
      tag: 'Network',
      icon: <UserCheck className="w-4 h-4 text-emerald-600 dark:text-[#00ff66]" />,
      value: loading ? '...' : String(githubUser?.following ?? 0),
      label: 'Following',
      desc: 'Active network connections',
    },
    {
      id: 'stat-member',
      tag: 'Tenure',
      icon: <Calendar className="w-4 h-4 text-emerald-600 dark:text-[#00ff66]" />,
      value: loading ? '...' : memberSince,
      label: 'GitHub Active Since',
      desc: 'Verified account tenure',
    },
  ];

  return (
    <section
      id="github-stats"
      className="py-20 bg-transparent dark:bg-transparent border-t border-neutral-200 dark:border-emerald-500/20 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Ambient Multi-Tone Radial Bloom in Dark Mode */}
      <div className="absolute top-1/3 left-[-5%] w-[420px] h-[420px] bg-cyan-500/[0.08] dark:bg-cyan-400/[0.1] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-[-5%] w-[420px] h-[420px] bg-[#00ff66]/[0.08] dark:bg-[#00ff66]/[0.1] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Glitch Transition */}
        <GlitchSectionEntry
          badge="GitHub Activity"
          title="Verified GitHub Activity & Repositories"
          subtitle="Direct telemetry fetched live from the GitHub REST API (@ZayyanZaidi)."
          align="center"
        />

        {/* 4 Grounded Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mb-10">
          {statsItems.map((stat) => (
            <PixelGlitchCard
              key={stat.id}
              id={stat.id}
              tag={stat.tag}
              title={stat.label}
              className="p-4 sm:p-5 bg-white/95 dark:bg-[#06140b]/85 dark:backdrop-blur-md border border-neutral-300 dark:border-t-emerald-400/35 dark:border-r-cyan-400/25 dark:border-b-emerald-500/20 dark:border-l-emerald-500/20 shadow-xs"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-md bg-neutral-100 dark:bg-black/60 border border-neutral-200 dark:border-emerald-500/30">
                  {stat.icon}
                </div>
                <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-500/60 uppercase">
                  Verified
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-neutral-900 dark:text-white truncate">
                {stat.value}
              </div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-neutral-800 dark:text-emerald-200 mt-1 font-mono">
                {stat.label}
              </div>
              <div className="text-[10px] text-neutral-500 dark:text-emerald-500/70 mt-0.5 font-mono truncate">
                {stat.desc}
              </div>
            </PixelGlitchCard>
          ))}
        </div>

        {/* Bento Grid: Real Languages & Recent Public Repos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Real Language Breakdown Derived from repos */}
          <PixelGlitchCard
            id="github-stats-languages"
            tag="Languages"
            title="Repository Languages"
            className="lg:col-span-5 p-5 sm:p-6 bg-white/95 dark:bg-[#06140b]/85 dark:backdrop-blur-md border border-neutral-300 dark:border-t-emerald-400/35 dark:border-r-cyan-400/25 dark:border-b-emerald-500/20 dark:border-l-emerald-500/20"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold text-neutral-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00ff66]" />
                  <span>Repository Languages</span>
                </h3>
                <span className="text-[9px] font-mono text-emerald-700 dark:text-[#00ff66] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  API_PARSED
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-emerald-400/70 font-mono mt-1">
                Detected from public repos on GitHub account.
              </p>
            </div>

            <div className="py-4 space-y-3 font-mono">
              {loading ? (
                <div className="space-y-2 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 bg-neutral-200 dark:bg-emerald-950/40 rounded" />
                  ))}
                </div>
              ) : derivedStats.languages.length === 0 ? (
                <div className="text-center py-6 text-xs text-neutral-500 dark:text-emerald-500/60 font-mono">
                  No public language data available.
                </div>
              ) : (
                derivedStats.languages.slice(0, 6).map((lang) => (
                  <div key={lang.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 font-medium">
                        <span className="w-2 h-2 rounded-xs" style={{ backgroundColor: lang.color }} />
                        <span>{lang.name}</span>
                      </span>
                      <span className="text-neutral-600 dark:text-emerald-400 font-mono text-[10px]">
                        {lang.count} {lang.count === 1 ? 'repo' : 'repos'} ({lang.percentage}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-100 dark:bg-black/60 rounded overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${lang.percentage}%`,
                          backgroundColor: lang.color,
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-neutral-200 dark:border-emerald-500/15 flex items-center justify-between text-[10px] font-mono text-neutral-500 dark:text-emerald-500/60">
              <span>Source: api.github.com</span>
              <a
                href="https://github.com/ZayyanZaidi?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMatrixKeystroke(1400)}
                className="text-emerald-600 dark:text-[#00ff66] hover:underline flex items-center gap-0.5 font-bold"
              >
                <span>View All on GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </PixelGlitchCard>

          {/* Genuine Public Repos List (No fake hashes, no fake commits) */}
          <PixelGlitchCard
            id="github-stats-repos-preview"
            tag="Repositories"
            title="Public Code Repositories"
            className="lg:col-span-7 p-5 sm:p-6 bg-white/95 dark:bg-[#06140b]/85 dark:backdrop-blur-md border border-neutral-300 dark:border-t-emerald-400/35 dark:border-r-cyan-400/25 dark:border-b-emerald-500/20 dark:border-l-emerald-500/20"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-emerald-500/20">
              <div>
                <h3 className="text-xs font-mono font-bold text-neutral-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wider">
                  <Code2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00ff66]" />
                  <span>Public GitHub Repositories</span>
                </h3>
                <p className="text-[11px] text-neutral-500 dark:text-emerald-400/70 font-mono mt-0.5">
                  Synchronized repository records directly from @ZayyanZaidi.
                </p>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 dark:text-emerald-500/60 font-semibold">
                {repos.length} REPOSITORIES
              </span>
            </div>

            <div className="py-3 divide-y divide-neutral-200 dark:divide-emerald-500/15 font-mono max-h-[300px] overflow-y-auto">
              {loading ? (
                <div className="py-8 text-center text-xs text-neutral-500 animate-pulse">
                  Querying GitHub API...
                </div>
              ) : repos.length === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-500">
                  No public repositories found.
                </div>
              ) : (
                repos.slice(0, 5).map((repo) => (
                  <div key={repo.id} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-neutral-900 dark:text-white hover:text-emerald-600 dark:hover:text-[#00ff66] transition-colors truncate block"
                      >
                        {repo.name}
                      </a>
                      <p className="text-[10px] text-neutral-500 dark:text-slate-300 font-sans truncate mt-0.5">
                        {repo.description || 'Public GitHub repository'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {repo.language && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-neutral-100 dark:bg-black/60 border border-neutral-200 dark:border-emerald-500/20 text-neutral-700 dark:text-emerald-300">
                          {repo.language}
                        </span>
                      )}
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playMatrixKeystroke(1400)}
                        className="p-1 rounded bg-neutral-100 dark:bg-black/60 border border-neutral-200 dark:border-emerald-500/30 text-neutral-700 dark:text-[#00ff66] hover:border-[#00ff66]"
                        title="View on GitHub"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-neutral-200 dark:border-emerald-500/15 flex items-center justify-between text-[10px] font-mono text-neutral-500 dark:text-emerald-500/60">
              <span>Status: Live Origin Sync</span>
              <span className="text-emerald-600 dark:text-[#00ff66] font-semibold">Ready for Review</span>
            </div>
          </PixelGlitchCard>
        </div>
      </div>
    </section>
  );
}
