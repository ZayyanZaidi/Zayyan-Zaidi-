import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Shield, Laptop, Cloud, CheckCircle2 } from 'lucide-react';
import PixelGlitchCard from './matrix/PixelGlitchCard';
import GlitchText from './matrix/GlitchText';
import GlitchSectionEntry from './matrix/GlitchSectionEntry';
import { playMatrixKeystroke } from '../utils/matrixAudio';

interface SkillItem {
  name: string;
  scope: string;
  tag: string;
}

interface SkillCategoryDef {
  id: string;
  title: string;
  tag: string;
  icon: React.ReactNode;
  summary: string;
  skills: SkillItem[];
}

export default function Skills() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Resume-exact Technical Skills formatted as readable, high-signal lists
  const skillCategories: SkillCategoryDef[] = [
    {
      id: 'languages',
      title: 'Programming Languages',
      tag: 'Languages',
      icon: <Terminal className="w-4 h-4 text-emerald-600 dark:text-[#00ff66]" />,
      summary: 'Procedural, algorithmic, and object-oriented implementations.',
      skills: [
        { name: 'Python', scope: 'Desktop CRUD engineering in Insurance Data Management System with Tkinter and SQL.', tag: 'Desktop' },
        { name: 'JavaScript', scope: 'Full-stack MERN platform development (React, Express, Node.js) and DOM manipulation.', tag: 'Full-Stack' },
        { name: 'C++', scope: 'Academic coursework in Data Structures, Algorithms, and Object-Oriented principles.', tag: 'Algorithms' },
        { name: 'SQL', scope: 'Relational schema design, complex query optimization, and constraint enforcement in MS Access.', tag: 'Database' },
        { name: 'Java', scope: 'Core object-oriented design and formal software specification fundamentals.', tag: 'OOP' },
      ],
    },
    {
      id: 'web',
      title: 'Web & Frameworks',
      tag: 'Web',
      icon: <Laptop className="w-4 h-4 text-emerald-600 dark:text-[#00ff66]" />,
      summary: 'Production web platforms and user-facing interfaces.',
      skills: [
        { name: 'React & Vite', scope: 'Modular single-page architectures, responsive UI hooks, and Vite bundling.', tag: 'Frontend' },
        { name: 'Node.js & Express', scope: 'RESTful API routing, middleware authentication, and backend server logic.', tag: 'Backend' },
        { name: 'MongoDB', scope: 'Document database modeling, collections, and MERN stack synchronization.', tag: 'Database' },
        { name: 'Tkinter & CustomTkinter', scope: 'Ergonomic desktop forms and role-based access constraint management.', tag: 'Desktop' },
        { name: 'Tailwind CSS', scope: 'Modern utility-first responsive styling and theme configurations.', tag: 'Styling' },
      ],
    },
    {
      id: 'cloud-ai',
      title: 'Cloud & AI Engineering',
      tag: 'Cloud & AI',
      icon: <Cloud className="w-4 h-4 text-emerald-600 dark:text-[#00ff66]" />,
      summary: 'Google Cloud certified skill badge training and AI validation workflows.',
      skills: [
        { name: 'AI Agents (Google ADK)', scope: 'Certified Google Cloud skill badge in Agent Development Kit and autonomous agents.', tag: 'Google Cloud' },
        { name: 'Cloud Run & Compute Engine', scope: 'Certified Google Cloud skill badge for deploying high-availability containerized apps.', tag: 'Google Cloud' },
        { name: 'Microservices & REST APIs', scope: 'Decoupled service endpoints with structured payload contracts and CI/CD.', tag: 'Architecture' },
        { name: 'LLM Fine-Tuning & Validation', scope: 'Supported Farokht CCAI Bot Beta testing workflows for Google AI Hackathon.', tag: 'AI Systems' },
        { name: 'Model Training & Tokenization', scope: 'Foundational NLP tokenization pipelines, dataset prep, and prompt grounding.', tag: 'NLP' },
      ],
    },
    {
      id: 'methodologies',
      title: 'Methodologies & Tools',
      tag: 'Tools & QA',
      icon: <Shield className="w-4 h-4 text-emerald-600 dark:text-[#00ff66]" />,
      summary: 'Engineering governance, testing rigor, and cross-functional coordination.',
      skills: [
        { name: 'Software Project Management', scope: 'Coordinating sprint workflows, intern task management, and project roadmaps.', tag: 'Management' },
        { name: 'Software Quality Assurance (SQA)', scope: 'Formal SQA coursework @ NED University and test-driven validation cycles.', tag: 'SQA' },
        { name: 'Technical Documentation & ERD', scope: 'Comprehensive architectural docs, ER diagrams, and system specifications.', tag: 'Docs' },
        { name: 'Git & GitHub Version Control', scope: 'Branch workflows, pull request reviews, and repository management.', tag: 'VCS' },
        { name: 'Postman API Testing', scope: 'Automated REST API endpoint verification and status payload assertion.', tag: 'Testing' },
      ],
    },
  ];

  const visibleCategories = selectedFilter === 'all'
    ? skillCategories
    : skillCategories.filter((c) => c.id === selectedFilter);

  return (
    <section
      id="skills"
      className="py-20 bg-transparent dark:bg-transparent border-t border-neutral-200 dark:border-emerald-500/20 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Dark mode atmospheric lighting */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with dynamic RGB glitch entry */}
        <GlitchSectionEntry
          badge="Skills & Technologies"
          title="Technical Skills & Practical Scope"
          subtitle="Practical competencies applied in academic projects, commercial internship, and Google Cloud credentials."
          align="center"
          className="mb-10"
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-8">
          {[
            { id: 'all', label: 'All Domains' },
            { id: 'languages', label: 'Languages' },
            { id: 'web', label: 'Web & Frameworks' },
            { id: 'cloud-ai', label: 'Cloud & AI' },
            { id: 'methodologies', label: 'Tools & QA' },
          ].map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => {
                playMatrixKeystroke(1400);
                setSelectedFilter(pill.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedFilter === pill.id
                  ? 'bg-emerald-600 dark:bg-[#00ff66] text-black shadow-[0_0_12px_rgba(0,255,102,0.3)]'
                  : 'bg-white dark:bg-[#050e07] text-neutral-700 dark:text-emerald-300 border border-neutral-200 dark:border-emerald-500/25 hover:border-[#00ff66]'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* 4 Skill Categories Grid with Clean Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleCategories.map((category) => (
            <PixelGlitchCard
              key={category.id}
              id={`skills-category-${category.id}`}
              tag={category.tag}
              title={category.title}
              className="p-5 sm:p-6 bg-white/95 dark:bg-[#06140b]/85 dark:backdrop-blur-md border border-neutral-300 dark:border-t-emerald-400/35 dark:border-r-cyan-400/25 dark:border-b-emerald-500/20 dark:border-l-emerald-500/20 shadow-xs"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-200 dark:border-emerald-500/20">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-[#00ff66]">
                    {category.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold font-mono text-neutral-900 dark:text-white truncate">
                      {category.title}
                    </h3>
                    <p className="text-[11px] font-mono text-neutral-500 dark:text-emerald-400/70 truncate">
                      {category.summary}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-emerald-700 dark:text-[#00ff66] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold flex-shrink-0">
                  {category.skills.length} Skills
                </span>
              </div>

              {/* Clean Scannable List of Skills */}
              <ul className="space-y-2.5">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="p-2.5 rounded-lg bg-neutral-50/90 dark:bg-[#061208]/90 border border-neutral-200 dark:border-emerald-500/20 hover:border-emerald-500/50 transition-colors flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00ff66] flex-shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold font-mono text-neutral-900 dark:text-white truncate">
                          {skill.name}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-200/80 dark:bg-black/60 text-neutral-700 dark:text-emerald-300 flex-shrink-0">
                          {skill.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-600 dark:text-slate-300 font-sans mt-0.5 leading-snug">
                        {skill.scope}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </PixelGlitchCard>
          ))}
        </div>
      </div>
    </section>
  );
}
