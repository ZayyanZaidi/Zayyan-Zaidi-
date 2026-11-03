import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Code2, GraduationCap, Calendar, BookOpen, Download, Terminal, Check, Briefcase, Bot, Sparkles, ExternalLink, ShieldCheck, Layers, Copy } from 'lucide-react';
import { GitHubUser } from '../types';
import ArchitectureDiagram from './ArchitectureDiagram';
import PixelGlitchCard from './matrix/PixelGlitchCard';
import GlitchText from './matrix/GlitchText';
import GlitchSectionEntry from './matrix/GlitchSectionEntry';
import { playMatrixKeystroke, playAccessGranted } from '../utils/matrixAudio';

interface AboutProps {
  githubUser: GitHubUser | null;
}

export default function About({ githubUser }: AboutProps) {
  const [downloadingResume, setDownloadingResume] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const linkedinUrl = "https://www.linkedin.com/in/zayyan-zaidi-a73210287?utm_source=share_via&utm_content=profile&utm_medium=member_android";

  const certifications = [
    {
      id: 'cert-adk',
      title: 'Engineer AI Agents with Agent Development Kit (ADK)',
      issuer: 'Google Cloud (GoogleAISeekho)',
      date: 'Sep 2026',
      badgeId: 'GCP-ADK-2026',
      tags: ['Autonomous Agents', 'Multi-Agent ADK', 'LLM Validation'],
    },
    {
      id: 'cert-web',
      title: 'Build a Website on Google Cloud Skill Badge',
      issuer: 'Google Cloud (GoogleAISeekho)',
      date: 'Sep 2026',
      badgeId: 'GCP-WEB-2026',
      tags: ['Cloud Run', 'Compute Engine', 'CI/CD Pipelines'],
    }
  ];

  const doctrines = [
    {
      hex: 'VAL_0x01',
      title: 'Full-Stack Rigor',
      icon: <Code2 className="w-4 h-4 text-[#00ff66]" />,
      takeaway: 'Scalable MERN architectures, modular REST APIs, and strict data validation pipelines.'
    },
    {
      hex: 'VAL_0x02',
      title: 'AI Agent Systems',
      icon: <Bot className="w-4 h-4 text-[#00ff66]" />,
      takeaway: 'Autonomous agents, Google ADK tool calling, and validation for Conversational Commerce bots.'
    },
    {
      hex: 'VAL_0x03',
      title: 'SQA & Leadership',
      icon: <ShieldCheck className="w-4 h-4 text-[#00ff66]" />,
      takeaway: 'Project management, test-driven validation, ER modeling, and cross-team execution.'
    }
  ];

  const handleCopyEmail = () => {
    playAccessGranted();
    navigator.clipboard.writeText('zayyanzaidi57@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDownloadResume = () => {
    if (downloadingResume || downloadComplete) return;
    setDownloadingResume(true);
    playMatrixKeystroke(1800);

    setTimeout(() => {
      setDownloadingResume(false);
      setDownloadComplete(true);
      playAccessGranted();

      const resumeContent = `SYED ZAYYAN HUSSAIN ZAIDI
Karachi, Pakistan • +92-318-7974475 • zayyanzaidi57@gmail.com
GitHub: https://github.com/ZayyanZaidi
LinkedIn: ${linkedinUrl}

PROFESSIONAL SUMMARY
Adaptable Software Engineering student with hands-on full-stack development experience, technical copywriting skills, and a professional internship background. Proven ability to manage cross-functional operations, validate AI systems, and design software from architecture through quality assurance. Seeking to apply strong technical and team-coordination skills in a Software Project Management or Development role.

PROFESSIONAL EXPERIENCE
Growth Intern | Farokht Tech, Karachi, Pakistan (On-site) | Apr 2026 – Jun 2026
- Supported development, validation, and testing workflows for the Farokht Conversational Commerce AI (CCAI) Bot Beta, built for the Google AI Hackathon, using targeted reference data.
- Contributed to cross-functional initiatives for structural maintenance, feature updates, and optimization of the main Farokht web platform.
- Provided internal coordination, workflow management, and operational support to fellow interns and team members.
- Participated in strategic growth campaigns and ongoing operations to accelerate user acquisition.

PROJECTS
1. Farokht – Content Commerce Platform | Full-Stack Engineer
- Built a full-stack e-commerce and product discovery platform for regional brands using the MERN stack (MongoDB, Express, React, Node.js).
- Implemented secure authentication, dynamic admin dashboard, and scalable REST APIs to manage product catalogs, blogs, and media; deployed via Vercel and Railway with automated CI pipelines.

2. BudgetWise – Personal Finance Manager | Software Design & Project Lead
- Led architecture and design of a personal finance ecosystem supporting income/expense tracking and real-time analytics.
- Designed modules for budget notifications, savings-goal allocation, and cloud database synchronization, backed by ER diagrams and full engineering documentation.

3. Insurance Data Management System | Independent Developer
- Developed a secure, production-ready desktop CRUD application to manage corporate insurance records and policy constraints.
- Built relational schemas in MS Access with SQL for complex queries and validation; designed a Tkinter UI with role-based access control.

EDUCATION
- NED University of Engineering and Technology — B.E. Software Engineering | Sep 2023 – Present
  Coursework: Software Engineering Theory, Data Structures & Algorithms, Software Quality Assurance, Probability & Statistics, Formal Specifications
- Usman College, Karachi — Higher Secondary School Certificate (HSSC) | 2021 – 2023
- Beaconhouse School System, Karachi — GCE O-Levels | 2019 – 2021

CERTIFICATIONS
- Build a Website on Google Cloud Skill Badge — Google Cloud (GoogleAISeekho) | Sep 2026
- Engineer AI Agents with Agent Development Kit (ADK) — Google Cloud (GoogleAISeekho) | Sep 2026

TECHNICAL SKILLS
- Programming Languages: Python, JavaScript, C++, SQL, Java
- Web & Frameworks: Node.js, Express, MongoDB, React, Vite, Tkinter, CustomTkinter
- Cloud & AI: AI Agents (ADK), Cloud Run, Compute Engine, Microservices, LLM Fine-Tuning, Model Training, Tokenization
- Methodologies & Tools: Software Project Management, SQA, Technical Documentation, Team Coordination, Git/GitHub, Postman API Testing
`;
      const blob = new Blob([resumeContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Syed_Zayyan_Zaidi_Resume.txt';
      a.click();
      URL.revokeObjectURL(url);

      setTimeout(() => setDownloadComplete(false), 3500);
    }, 900);
  };

  return (
    <section
      id="about"
      className="py-20 bg-transparent dark:bg-transparent border-t border-neutral-200 dark:border-emerald-500/20 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Ambient Multi-Tone Radial Bloom in Dark Mode */}
      <div className="absolute top-1/4 right-[-5%] w-[420px] h-[420px] bg-cyan-500/[0.08] dark:bg-cyan-400/[0.1] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-5%] w-[420px] h-[420px] bg-[#00ff66]/[0.08] dark:bg-[#00ff66]/[0.1] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Framer Motion Glitch & RGB Split */}
        <GlitchSectionEntry
          badge="About Me"
          title="Professional Background & Experience"
          subtitle="Scannable qualification matrix for recruiters and technical engineering leads."
          align="center"
        />

        {/* Bento Grid: Summary + Commercial Experience + Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (7 cols): Primary Bio & Farokht Tech Internship */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Bio Dossier Card */}
            <PixelGlitchCard
              id="about-bio-widget"
              tag="Profile"
              title="Candidate Overview"
              className="bg-white/95 dark:bg-[#06140b]/85 dark:backdrop-blur-md border border-neutral-300 dark:border-t-emerald-400/35 dark:border-r-cyan-400/25 dark:border-b-emerald-500/20 dark:border-l-emerald-500/20 p-5 sm:p-6 shadow-sm"
            >
              {/* Header with portrait and fast tags */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pb-4 border-b border-neutral-200 dark:border-emerald-500/20">
                <div className="relative flex-shrink-0">
                  <img
                    id="about-profile-portrait"
                    src={githubUser?.avatar_url || "https://github.com/ZayyanZaidi.png"}
                    alt="Syed Zayyan Hussain Zaidi"
                    className="w-16 h-16 rounded-full border-2 border-emerald-500/80 object-cover shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#00ff66] border-2 border-black" />
                </div>

                <div className="text-center sm:text-left min-w-0">
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <h3 className="text-lg font-bold font-display text-neutral-900 dark:text-white truncate">
                      Syed Zayyan Hussain Zaidi
                    </h3>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-emerald-500/10 text-emerald-700 dark:text-[#00ff66] border border-emerald-500/25 rounded font-bold">
                      NED UET // SE
                    </span>
                  </div>
                  <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider mt-0.5">
                    Target: Software Project Management • Full-Stack Development
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-emerald-500/70 font-mono mt-0.5 truncate">
                    Karachi, PK • +92-318-7974475 • zayyanzaidi57@gmail.com
                  </p>
                </div>
              </div>

              {/* Crisp 3-bullet Elevator Snapshot (No wall of text) */}
              <div className="py-4 space-y-2.5">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-[#00ff66] font-mono text-xs mt-0.5 font-bold">&gt;</span>
                  <p className="text-xs text-neutral-700 dark:text-slate-200 leading-relaxed font-sans">
                    <strong className="font-semibold text-neutral-900 dark:text-white">Full-Stack Engineering:</strong> Hands-on experience developing modular MERN web applications, secure REST APIs, and automated Vercel/Railway CI pipelines.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-[#00ff66] font-mono text-xs mt-0.5 font-bold">&gt;</span>
                  <p className="text-xs text-neutral-700 dark:text-slate-200 leading-relaxed font-sans">
                    <strong className="font-semibold text-neutral-900 dark:text-white">AI Systems &amp; Validation:</strong> Certified in Google Cloud Agent Development Kit (ADK); validated Conversational Commerce AI bots for Google AI Hackathon.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-[#00ff66] font-mono text-xs mt-0.5 font-bold">&gt;</span>
                  <p className="text-xs text-neutral-700 dark:text-slate-200 leading-relaxed font-sans">
                    <strong className="font-semibold text-neutral-900 dark:text-white">Project Operations &amp; SQA:</strong> Experienced in cross-functional team coordination, ER diagrams, formal technical specifications, and QA workflows.
                  </p>
                </div>
              </div>

              {/* Quick Action Bar: Resume Download + Email Copy */}
              <div className="pt-3 border-t border-neutral-200 dark:border-emerald-500/20 flex flex-wrap items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadResume}
                  disabled={downloadingResume}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-[#00ff66]/25 text-emerald-800 dark:text-[#00ff66] border border-emerald-500/40 text-[11px] font-mono font-bold tracking-wider transition-all cursor-pointer disabled:opacity-50"
                >
                  {downloadComplete ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#00ff66]" />
                      <span>Saved to Disk</span>
                    </>
                  ) : downloadingResume ? (
                    <>
                      <Terminal className="w-3.5 h-3.5 animate-spin text-[#00ff66]" />
                      <span>Preparing...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Resume (TXT)</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-black/60 border border-neutral-300 dark:border-emerald-500/30 text-[10px] font-mono text-neutral-700 dark:text-emerald-300 hover:border-[#00ff66] transition-colors cursor-pointer"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-[#00ff66]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
                  </button>

                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playMatrixKeystroke(1500)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-black/60 border border-neutral-300 dark:border-emerald-500/30 text-[10px] font-mono text-neutral-700 dark:text-[#00ff66] hover:border-[#00ff66] transition-colors"
                  >
                    <span>LINKEDIN</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </PixelGlitchCard>

            {/* Commercial Work Experience Widget (Farokht Tech) */}
            <PixelGlitchCard
              id="about-experience-widget"
              tag="Experience"
              title="Farokht Tech Internship"
              className="bg-white/95 dark:bg-[#06140b]/85 dark:backdrop-blur-md border border-neutral-300 dark:border-t-emerald-400/35 dark:border-r-cyan-400/25 dark:border-b-emerald-500/20 dark:border-l-emerald-500/20 p-5 sm:p-6 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-200 dark:border-emerald-500/20 gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-[#00ff66]">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-mono text-neutral-900 dark:text-white">
                      Growth Intern — Farokht Tech
                    </h4>
                    <p className="text-[11px] font-mono text-emerald-700 dark:text-[#00ff66]">
                      Karachi, Pakistan (On-site)
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-neutral-100 dark:bg-black/60 text-neutral-700 dark:text-emerald-300 border border-neutral-300 dark:border-emerald-500/30 self-start sm:self-auto">
                  Apr 2026 — Jun 2026
                </span>
              </div>

              {/* High-Signal Deliverable Cards */}
              <div className="pt-3.5 space-y-2.5">
                <div className="p-3 rounded-lg bg-neutral-50 dark:bg-[#061208] border border-neutral-200 dark:border-emerald-500/20 flex items-start gap-2.5">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-[#00ff66] flex-shrink-0 mt-0.5">
                    AI BOT
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-neutral-900 dark:text-white font-mono">
                      Farokht CCAI Bot Beta (Google AI Hackathon)
                    </p>
                    <p className="text-[11px] text-neutral-600 dark:text-slate-300 font-sans leading-relaxed mt-0.5">
                      Supported development, testing, and reference-data validation workflows for the conversational commerce bot.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-neutral-50 dark:bg-[#061208] border border-neutral-200 dark:border-emerald-500/20 flex items-start gap-2.5">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-[#00ff66] flex-shrink-0 mt-0.5">
                    WEB PLATFORM
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-neutral-900 dark:text-white font-mono">
                      Core Web Platform Optimization
                    </p>
                    <p className="text-[11px] text-neutral-600 dark:text-slate-300 font-sans leading-relaxed mt-0.5">
                      Contributed to cross-functional initiatives for structural maintenance, feature updates, and platform performance.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-neutral-50 dark:bg-[#061208] border border-neutral-200 dark:border-emerald-500/20 flex items-start gap-2.5">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-[#00ff66] flex-shrink-0 mt-0.5">
                    OPS LEAD
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-neutral-900 dark:text-white font-mono">
                      Team Coordination &amp; Growth Strategy
                    </p>
                    <p className="text-[11px] text-neutral-600 dark:text-slate-300 font-sans leading-relaxed mt-0.5">
                      Delivered internal coordination, sprint management to interns, and executed strategic user acquisition campaigns.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tag Chips */}
              <div className="pt-3 border-t border-neutral-200 dark:border-emerald-500/15 flex flex-wrap gap-1.5 mt-3">
                {['Conversational Commerce AI', 'Google AI Hackathon', 'MERN Stack', 'AI Validation', 'Sprint Management'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-[#020503] border border-neutral-200 dark:border-emerald-500/25 text-neutral-700 dark:text-emerald-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </PixelGlitchCard>
          </div>

          {/* Right Column (5 cols): Google Cloud Certifications & Doctrines */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Google Cloud Certifications Card */}
            <PixelGlitchCard
              id="about-certifications-widget"
              tag="Certifications"
              title="Google Cloud Credentials"
              className="bg-white/95 dark:bg-[#06140b]/85 dark:backdrop-blur-md border border-neutral-300 dark:border-t-emerald-400/35 dark:border-r-cyan-400/25 dark:border-b-emerald-500/20 dark:border-l-emerald-500/20 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-emerald-500/20 mb-3.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-800 dark:text-[#00ff66] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00ff66]" />
                  <span>Google Cloud Certifications</span>
                </h4>
                <span className="text-[10px] font-mono text-emerald-500/70 font-semibold">[GoogleAISeekho]</span>
              </div>

              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3 rounded-lg bg-neutral-50 dark:bg-[#061208] border border-neutral-200 dark:border-emerald-500/30 font-mono space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-emerald-700 dark:text-[#00ff66] px-1.5 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20 font-bold">
                        {cert.badgeId}
                      </span>
                      <span className="text-[10px] text-neutral-500 dark:text-emerald-500/70 font-semibold">
                        {cert.date}
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-neutral-900 dark:text-white leading-snug">
                      {cert.title}
                    </h5>
                    <p className="text-[10px] text-emerald-700 dark:text-emerald-400">
                      Issuer: {cert.issuer}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {cert.tags.map((t) => (
                        <span key={t} className="px-1.5 py-0.2 rounded text-[9px] bg-neutral-200 dark:bg-black/60 text-neutral-700 dark:text-emerald-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </PixelGlitchCard>

            {/* 3 Core Engineering Principles */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between pb-1">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-800 dark:text-[#00ff66]">
                  Core Engineering Principles
                </h4>
                <span className="text-[10px] font-mono text-emerald-500/50">[Core Values]</span>
              </div>

              {doctrines.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-white/95 dark:bg-[#06140b]/85 dark:backdrop-blur-md border border-neutral-300 dark:border-t-emerald-400/30 dark:border-r-cyan-400/20 dark:border-b-emerald-500/20 dark:border-l-emerald-500/20 flex items-start gap-3 shadow-xs hover:border-[#00ff66]/50 transition-all"
                >
                  <div className="p-2 rounded-md bg-neutral-100 dark:bg-black/60 border border-neutral-200 dark:border-emerald-500/30 text-emerald-600 dark:text-[#00ff66] flex-shrink-0 mt-0.5">
                    {doc.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h5 className="text-xs font-bold font-mono text-neutral-900 dark:text-white truncate">
                        {doc.title}
                      </h5>
                    </div>
                    <p className="text-[11px] text-neutral-600 dark:text-slate-300 font-sans leading-relaxed mt-0.5">
                      {doc.takeaway}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Academic Journey Section with Coursework Grid */}
        <div className="mt-16 pt-12 border-t border-neutral-200 dark:border-emerald-500/20">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-emerald-600 dark:text-[#00ff66] uppercase">
              Academic Background
            </span>
            <GlitchText
              as="h3"
              text="Education & Formal Coursework"
              className="text-xl sm:text-2xl font-bold font-display text-neutral-900 dark:text-white mt-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {/* NED University */}
            <PixelGlitchCard
              tag="University"
              title="NED University"
              className="p-4 bg-white/95 dark:bg-[#040905]/95 border border-neutral-300 dark:border-emerald-500/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-[#00ff66]">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-[#00ff66] font-bold">
                    Sep 2023 — Present
                  </span>
                </div>
                <h4 className="text-sm font-bold font-mono text-neutral-900 dark:text-white">
                  B.E. Software Engineering
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-mono mt-0.5">
                  NED University of Eng. &amp; Technology
                </p>

                <div className="mt-3 pt-2.5 border-t border-neutral-200 dark:border-emerald-500/15">
                  <p className="text-[10px] font-mono font-bold text-neutral-500 dark:text-emerald-500/70 uppercase mb-1.5">
                    Core Coursework:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {[
                      'Software Eng. Theory',
                      'Data Structures & Algorithms',
                      'Software Quality Assurance',
                      'Probability & Statistics',
                      'Formal Specifications',
                    ].map((course) => (
                      <span
                        key={course}
                        className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-neutral-100 dark:bg-black/60 border border-neutral-200 dark:border-emerald-500/20 text-neutral-700 dark:text-emerald-300"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </PixelGlitchCard>

            {/* Usman College */}
            <PixelGlitchCard
              tag="College"
              title="Usman College"
              className="p-4 bg-white/95 dark:bg-[#040905]/95 border border-neutral-300 dark:border-emerald-500/25 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-[#00ff66]">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 dark:text-emerald-500/70 font-semibold">
                    2021 — 2023
                  </span>
                </div>
                <h4 className="text-sm font-bold font-mono text-neutral-900 dark:text-white">
                  HSSC (Pre-Engineering)
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono mt-0.5">
                  Usman College, Karachi
                </p>
                <p className="text-[11px] text-neutral-500 dark:text-slate-300 font-sans mt-2 leading-relaxed">
                  Advanced analytical mathematics, mechanics, physics principles, and systematic reasoning.
                </p>
              </div>
            </PixelGlitchCard>

            {/* Beaconhouse */}
            <PixelGlitchCard
              tag="School"
              title="Beaconhouse"
              className="p-4 bg-white/95 dark:bg-[#040905]/95 border border-neutral-300 dark:border-emerald-500/25 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-[#00ff66]">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 dark:text-emerald-500/70 font-semibold">
                    2019 — 2021
                  </span>
                </div>
                <h4 className="text-sm font-bold font-mono text-neutral-900 dark:text-white">
                  GCE O-Levels
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono mt-0.5">
                  Beaconhouse School System
                </p>
                <p className="text-[11px] text-neutral-500 dark:text-slate-300 font-sans mt-2 leading-relaxed">
                  International science stream curriculum emphasizing critical thinking and scientific inquiry.
                </p>
              </div>
            </PixelGlitchCard>
          </div>
        </div>

        {/* Architecture Schematic Blueprint Section */}
        <div className="mt-16 pt-12 border-t border-neutral-200 dark:border-emerald-500/20">
          <div className="mb-6 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-emerald-600 dark:text-[#00ff66] uppercase">
              System Design
            </span>
            <GlitchText
              as="h3"
              text="Full-Stack Production System Architecture"
              className="text-xl sm:text-2xl font-bold font-display text-neutral-900 dark:text-white mt-1"
            />
          </div>

          <ArchitectureDiagram />
        </div>
      </div>
    </section>
  );
}
