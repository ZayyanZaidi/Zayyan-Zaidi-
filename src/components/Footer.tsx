import { Github, Mail, MessageSquare, Linkedin, Terminal, Cpu } from 'lucide-react';
import { playMatrixKeystroke } from '../utils/matrixAudio';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const linkedinUrl = "https://www.linkedin.com/in/zayyan-zaidi-a73210287?utm_source=share_via&utm_content=profile&utm_medium=member_android";

  return (
    <footer className="py-12 bg-transparent dark:bg-black/40 backdrop-blur-md border-t border-neutral-200 dark:border-emerald-500/20 font-mono text-xs transition-colors duration-300 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Status */}
          <div className="text-center md:text-left space-y-1.5">
            <div className="flex items-center justify-center md:justify-start gap-2 text-neutral-900 dark:text-white font-bold text-sm">
              <Terminal className="w-4 h-4 text-[#00ff66]" />
              <span>
                0xZZ::<span className="text-[#00ff66]">SYED_ZAYYAN_ZAIDI</span>
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-emerald-500/70">
              Software Engineering Undergrad @ NED University • Karachi, Pakistan
            </p>
            <p className="text-[10px] text-neutral-400 dark:text-emerald-500/50">
              © {currentYear} Syed Zayyan Hussain Zaidi. Matrix Architecture // All Systems Nominal.
            </p>
          </div>

          {/* Social Links Matrix Grid */}
          <div className="flex items-center gap-3">
            <a
              id="footer-linkedin-link"
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playMatrixKeystroke(1500)}
              className="p-2.5 rounded-lg bg-neutral-100 dark:bg-[#040905] border border-neutral-200 dark:border-emerald-500/30 text-neutral-600 dark:text-[#00ff66] hover:border-[#00ff66] hover:shadow-[0_0_10px_rgba(0,255,102,0.3)] transition-all"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              id="footer-github-link"
              href="https://github.com/ZayyanZaidi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playMatrixKeystroke(1500)}
              className="p-2.5 rounded-lg bg-neutral-100 dark:bg-[#040905] border border-neutral-200 dark:border-emerald-500/30 text-neutral-600 dark:text-[#00ff66] hover:border-[#00ff66] hover:shadow-[0_0_10px_rgba(0,255,102,0.3)] transition-all"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              id="footer-whatsapp-link"
              href="https://wa.me/923187974475"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playMatrixKeystroke(1500)}
              className="p-2.5 rounded-lg bg-neutral-100 dark:bg-[#040905] border border-neutral-200 dark:border-emerald-500/30 text-neutral-600 dark:text-[#00ff66] hover:border-[#00ff66] hover:shadow-[0_0_10px_rgba(0,255,102,0.3)] transition-all"
              title="WhatsApp Uplink"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <a
              id="footer-email-link"
              href="mailto:zayyanzaidi57@gmail.com"
              onClick={() => playMatrixKeystroke(1500)}
              className="p-2.5 rounded-lg bg-neutral-100 dark:bg-[#040905] border border-neutral-200 dark:border-emerald-500/30 text-neutral-600 dark:text-[#00ff66] hover:border-[#00ff66] hover:shadow-[0_0_10px_rgba(0,255,102,0.3)] transition-all"
              title="Email Inbox"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
