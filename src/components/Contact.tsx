import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Send, Copy, Check, Linkedin, Terminal, Cpu, CheckCircle2 } from 'lucide-react';
import PixelGlitchCard from './matrix/PixelGlitchCard';
import GlitchText from './matrix/GlitchText';
import GlitchSectionEntry from './matrix/GlitchSectionEntry';
import { playMatrixKeystroke, playAccessGranted, playDeconstructSfx } from '../utils/matrixAudio';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [packetTransmitted, setPacketTransmitted] = useState(false);

  const linkedinUrl = "https://www.linkedin.com/in/zayyan-zaidi-a73210287?utm_source=share_via&utm_content=profile&utm_medium=member_android";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    playMatrixKeystroke(1900, 0.02);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = (text: string, label: string) => {
    playAccessGranted();
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleSendWhatsApp = () => {
    if (!formData.message) return;
    setIsEncrypting(true);
    playDeconstructSfx();

    setTimeout(() => {
      setIsEncrypting(false);
      playAccessGranted();
      const introText = `Hi Zayyan, my name is ${formData.name || 'Visitor'}.${formData.email ? ` (${formData.email})` : ''}\n\n`;
      const subjectLine = formData.subject ? `Regarding: ${formData.subject}\n` : '';
      const encodedText = encodeURIComponent(`${introText}${subjectLine}Message: ${formData.message}`);
      const waUrl = `https://wa.me/923187974475?text=${encodedText}`;
      window.open(waUrl, '_blank');
    }, 500);
  };

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsEncrypting(true);
    playDeconstructSfx();

    setTimeout(() => {
      setIsEncrypting(false);
      setPacketTransmitted(true);
      playAccessGranted();

      const subject = encodeURIComponent(formData.subject || `Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:zayyanzaidi57@gmail.com?subject=${subject}&body=${body}`;

      setTimeout(() => {
        setPacketTransmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 4000);
    }, 700);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-transparent dark:bg-transparent border-t border-neutral-200 dark:border-emerald-500/20 transition-colors duration-300 relative overflow-hidden font-mono"
    >
      {/* Dark mode atmospheric lighting */}
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with dynamic RGB glitch entry */}
        <GlitchSectionEntry
          badge="Direct Transmission"
          title="Establish Contact"
          subtitle="Available for Software Project Management, Full-Stack Development roles, and technical collaborations."
          align="center"
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Contact Channels */}
          <motion.div
            className="lg:col-span-5 space-y-3.5"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="pb-1">
              <h3 className="text-xs font-bold font-mono text-neutral-900 dark:text-[#00ff66] uppercase tracking-wider">
                Direct Contact Channels
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-slate-400 font-sans mt-0.5">
                Fastest response via WhatsApp or verified email inbox.
              </p>
            </div>

            {/* WhatsApp Card */}
            <PixelGlitchCard
              tag="WhatsApp"
              title="Fastest Response"
              className="p-3.5 bg-white/95 dark:bg-[#06140b]/85 dark:backdrop-blur-md border border-neutral-300 dark:border-t-emerald-400/35 dark:border-r-cyan-400/25 dark:border-b-emerald-500/20 dark:border-l-emerald-500/20"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-[#00ff66] flex-shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-500/60 uppercase font-mono block">
                      WhatsApp
                    </span>
                    <a
                      id="whatsapp-direct-link"
                      href="https://wa.me/923187974475"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playMatrixKeystroke(1500)}
                      className="block text-xs sm:text-sm font-bold font-mono text-neutral-900 dark:text-white hover:text-emerald-600 dark:hover:text-[#00ff66] transition-colors truncate"
                    >
                      +92-318-7974475
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy('+923187974475', 'whatsapp')}
                  className="p-1.5 rounded-lg bg-neutral-100 dark:bg-black/60 border border-neutral-300 dark:border-emerald-500/30 text-neutral-700 dark:text-[#00ff66] hover:border-[#00ff66] transition-colors cursor-pointer text-xs flex-shrink-0"
                  title="Copy Phone Number"
                >
                  {copiedText === 'whatsapp' ? <Check className="w-3.5 h-3.5 text-[#00ff66]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </PixelGlitchCard>

            {/* Email Card with Overflow Protection */}
            <PixelGlitchCard
              tag="Email"
              title="Primary Inbox"
              className="p-3.5 bg-white/95 dark:bg-[#06140b]/85 dark:backdrop-blur-md border border-neutral-300 dark:border-t-emerald-400/35 dark:border-r-cyan-400/25 dark:border-b-emerald-500/20 dark:border-l-emerald-500/20"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-[#00ff66] flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-500/60 uppercase font-mono block">
                      Email Address
                    </span>
                    <a
                      id="email-direct-link"
                      href="mailto:zayyanzaidi57@gmail.com"
                      onClick={() => playMatrixKeystroke(1500)}
                      className="block text-xs sm:text-sm font-bold font-mono text-neutral-900 dark:text-white hover:text-emerald-600 dark:hover:text-[#00ff66] transition-colors truncate"
                    >
                      zayyanzaidi57@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy('zayyanzaidi57@gmail.com', 'email')}
                  className="p-1.5 rounded-lg bg-neutral-100 dark:bg-black/60 border border-neutral-300 dark:border-emerald-500/30 text-neutral-700 dark:text-[#00ff66] hover:border-[#00ff66] transition-colors cursor-pointer text-xs flex-shrink-0"
                  title="Copy Email Address"
                >
                  {copiedText === 'email' ? <Check className="w-3.5 h-3.5 text-[#00ff66]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </PixelGlitchCard>

            {/* LinkedIn Card */}
            <PixelGlitchCard
              tag="LinkedIn"
              title="Professional Profile"
              className="p-3.5 bg-white/95 dark:bg-[#06140b]/85 dark:backdrop-blur-md border border-neutral-300 dark:border-t-emerald-400/35 dark:border-r-cyan-400/25 dark:border-b-emerald-500/20 dark:border-l-emerald-500/20"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-[#00ff66] flex-shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-500/60 uppercase font-mono block">
                      LinkedIn
                    </span>
                    <a
                      id="linkedin-direct-link"
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playMatrixKeystroke(1500)}
                      className="block text-xs sm:text-sm font-bold font-mono text-neutral-900 dark:text-white hover:text-emerald-600 dark:hover:text-[#00ff66] transition-colors truncate"
                    >
                      /in/zayyan-zaidi-a73210287
                    </a>
                  </div>
                </div>

                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-neutral-100 dark:bg-black/60 border border-neutral-300 dark:border-emerald-500/30 text-neutral-700 dark:text-[#00ff66] hover:border-[#00ff66] transition-colors cursor-pointer text-xs flex-shrink-0"
                  title="Open LinkedIn Profile"
                >
                  <Send className="w-3.5 h-3.5" />
                </a>
              </div>
            </PixelGlitchCard>
          </motion.div>

          {/* Right: Message Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <PixelGlitchCard
              id="contact-terminal-card"
              tag="Message"
              title="Send a Direct Message"
              className="p-5 sm:p-6 bg-white/95 dark:bg-[#06140b]/85 dark:backdrop-blur-md border border-neutral-300 dark:border-t-emerald-400/35 dark:border-r-cyan-400/25 dark:border-b-emerald-500/20 dark:border-l-emerald-500/20 shadow-md"
            >
              <div className="mb-4 pb-2.5 border-b border-neutral-200 dark:border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-600 dark:text-[#00ff66]" />
                  <span className="text-xs font-bold text-neutral-900 dark:text-white uppercase">
                    Compose Message
                  </span>
                </div>
                <span className="text-[10px] text-emerald-500/60 font-semibold">Direct Transmission</span>
              </div>

              <form onSubmit={handleSubmitEmail} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-emerald-700 dark:text-emerald-400 uppercase font-bold mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Hiring Manager / Recruiter"
                      className="w-full px-3 py-2 rounded-md bg-neutral-50 dark:bg-[#020503] border border-neutral-300 dark:border-emerald-500/30 text-xs text-neutral-900 dark:text-[#00ff66] placeholder:text-neutral-400 dark:placeholder:text-emerald-800/60 focus:outline-none focus:border-[#00ff66]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-emerald-700 dark:text-emerald-400 uppercase font-bold mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="name@company.com"
                      className="w-full px-3 py-2 rounded-md bg-neutral-50 dark:bg-[#020503] border border-neutral-300 dark:border-emerald-500/30 text-xs text-neutral-900 dark:text-[#00ff66] placeholder:text-neutral-400 dark:placeholder:text-emerald-800/60 focus:outline-none focus:border-[#00ff66]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-emerald-700 dark:text-emerald-400 uppercase font-bold mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-3 py-2 rounded-md bg-neutral-50 dark:bg-[#020503] border border-neutral-300 dark:border-emerald-500/30 text-xs text-neutral-900 dark:text-[#00ff66] placeholder:text-neutral-400 dark:placeholder:text-emerald-800/60 focus:outline-none focus:border-[#00ff66]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-emerald-700 dark:text-emerald-400 uppercase font-bold mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Describe your project, role, or inquiry..."
                    className="w-full px-3 py-2 rounded-md bg-neutral-50 dark:bg-[#020503] border border-neutral-300 dark:border-emerald-500/30 text-xs text-neutral-900 dark:text-[#00ff66] placeholder:text-neutral-400 dark:placeholder:text-emerald-800/60 focus:outline-none focus:border-[#00ff66]"
                  />
                </div>

                {/* Submit & Dispatch Action Row */}
                <div className="pt-1 flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={isEncrypting}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-emerald-600 hover:bg-[#00ff66] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      {packetTransmitted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                          <span>Message Sent!</span>
                        </>
                      ) : isEncrypting ? (
                        <>
                          <Cpu className="w-3.5 h-3.5 animate-spin text-black" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Email</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleSendWhatsApp}
                      disabled={isEncrypting}
                      className="flex items-center gap-1 px-3.5 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-black/60 dark:hover:bg-[#00ff66]/15 text-neutral-800 dark:text-[#00ff66] border border-neutral-300 dark:border-emerald-500/40 text-xs font-mono font-bold uppercase transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Open WhatsApp</span>
                    </button>
                  </div>

                  <span className="text-[10px] text-emerald-500/60 font-semibold">
                    Direct Response Guaranteed
                  </span>
                </div>
              </form>
            </PixelGlitchCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
