import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Server, Database, ChevronRight, Cpu, CheckCircle2 } from 'lucide-react';
import PixelGlitchCard from './matrix/PixelGlitchCard';
import GlitchText from './matrix/GlitchText';
import { playMatrixKeystroke } from '../utils/matrixAudio';

interface Layer {
  id: string;
  title: string;
  subtitle: string;
  hexCode: string;
  icon: ReactNode;
  technologies: string[];
  details: string[];
}

export default function ArchitectureDiagram() {
  const [activeLayer, setActiveLayer] = useState<string>('presentation');

  // Grounded 3-tier full-stack architecture matching Syed Zayyan's actual project experience
  const layers: Layer[] = [
    {
      id: 'presentation',
      title: 'Presentation Layer',
      subtitle: 'Single Page Web & Desktop Interfaces',
      hexCode: 'Layer 1',
      icon: <Globe className="w-4 h-4 text-[#00ff66]" />,
      technologies: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'Python Tkinter UI'],
      details: [
        'Responsive client interfaces built with React components and modern Vite tooling.',
        'Desktop client forms engineered using Python Tkinter with input validation checkpoints.',
        'Clear visual separation between interface state and backend data communication.'
      ],
    },
    {
      id: 'logic',
      title: 'Application & API Layer',
      subtitle: 'REST Services & Business Logic',
      hexCode: 'Layer 2',
      icon: <Server className="w-4 h-4 text-[#00ff66]" />,
      technologies: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'Google ADK'],
      details: [
        'Modular Express routers handling authentication, catalog management, and transactional requests.',
        'Integration with Google Agent Development Kit (ADK) for conversational AI bot workflows.',
        'Validated endpoints tested with Postman and structured error handling.'
      ],
    },
    {
      id: 'persistence',
      title: 'Database & Data Layer',
      subtitle: 'Relational Schemas & Document Stores',
      hexCode: 'Layer 3',
      icon: <Database className="w-4 h-4 text-[#00ff66]" />,
      technologies: ['MongoDB', 'MS Access SQL', 'Relational Schemas', 'ER Modeling'],
      details: [
        'Document-based collections in MongoDB for catalog, user, and content schemas (MERN stack).',
        'Relational table schemas with foreign keys, integrity constraints, and SQL queries (MS Access).',
        'Systematic Entity-Relationship (ER) modeling before writing code.'
      ],
    },
  ];

  const currentLayerObj = layers.find((l) => l.id === activeLayer) || layers[0];

  const handleSelectLayer = (id: string) => {
    playMatrixKeystroke(1700);
    setActiveLayer(id);
  };

  return (
    <PixelGlitchCard
      id="architecture-diagram-container"
      tag="Architecture"
      title="Full-Stack System Stack"
      className="p-5 sm:p-7 bg-white/95 dark:bg-[#030804]/95 border border-neutral-300 dark:border-emerald-500/25 shadow-md relative overflow-hidden"
    >
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff6608_1px,transparent_1px),linear-gradient(to_bottom,#00ff6608_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Top Banner Indicator */}
      <div className="flex items-center justify-between mb-5 pb-2.5 border-b border-neutral-200 dark:border-emerald-500/15 relative z-10">
        <h4 className="text-xs font-bold font-mono text-neutral-800 dark:text-[#00ff66] flex items-center gap-2 uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00ff66]" />
          <span>Full-Stack Architecture Overview</span>
        </h4>
        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-[#00ff66] border border-emerald-500/20">
          MERN + SQL + PYTHON
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
        {/* Left Stack (6 columns) */}
        <div className="md:col-span-6 relative flex flex-col justify-between space-y-3">
          {layers.map((layer) => {
            const isActive = activeLayer === layer.id;

            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => handleSelectLayer(layer.id)}
                className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer relative group flex items-center justify-between ${
                  isActive
                    ? 'bg-neutral-50 dark:bg-[#071409] border-[#00ff66] shadow-[0_0_12px_rgba(0,255,102,0.15)]'
                    : 'bg-white dark:bg-[#040a05] border-neutral-200 dark:border-emerald-500/20 hover:border-emerald-500/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-md bg-neutral-100 dark:bg-black/60 border border-neutral-200 dark:border-emerald-500/30 text-emerald-600 dark:text-[#00ff66]">
                    {layer.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold font-mono truncate text-neutral-900 dark:text-white">
                        {layer.title}
                      </p>
                      <span className="text-[9px] font-mono text-emerald-600 dark:text-[#00ff66] px-1 py-0.2 bg-emerald-500/10 rounded">
                        {layer.hexCode}
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-500 dark:text-emerald-400/70 truncate mt-0.5 font-mono">
                      {layer.subtitle}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isActive ? 'translate-x-1 text-emerald-600 dark:text-[#00ff66]' : 'text-neutral-400 group-hover:translate-x-0.5'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Details (6 columns) */}
        <div className="md:col-span-6 flex flex-col justify-center min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-3.5"
            >
              <div>
                <span className="text-[9px] font-mono font-bold uppercase text-emerald-600 dark:text-[#00ff66] tracking-[0.2em]">
                  Layer Overview // {currentLayerObj.hexCode}
                </span>
                <GlitchText
                  as="h4"
                  text={currentLayerObj.title}
                  className="text-base font-bold text-neutral-900 dark:text-white mt-0.5 font-display tracking-tight"
                />
                <p className="text-xs text-neutral-500 dark:text-emerald-400/80 font-mono mt-0.5">
                  {currentLayerObj.subtitle}
                </p>
              </div>

              {/* Bullet Details */}
              <div className="space-y-2">
                {currentLayerObj.details.map((detail, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00ff66] mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-neutral-600 dark:text-slate-300 font-sans leading-relaxed">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Technologies Grid */}
              <div className="pt-2.5 border-t border-neutral-200 dark:border-emerald-500/15">
                <p className="text-[10px] font-bold font-mono uppercase text-emerald-600 dark:text-emerald-500/70 mb-1.5">
                  Hands-on Technologies:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {currentLayerObj.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-neutral-100 dark:bg-[#020503] border border-neutral-200 dark:border-emerald-500/30 text-neutral-700 dark:text-emerald-300 shadow-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PixelGlitchCard>
  );
}
