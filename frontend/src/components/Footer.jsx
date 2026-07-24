import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/60 bg-white/40 backdrop-blur-xl py-8 mt-auto relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center gap-3 text-center">
        
        {/* Social Media Links (Logo Only) */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/xldplx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-slate-900 border border-slate-200/80 hover:border-slate-900 flex items-center justify-center text-slate-700 hover:text-white shadow-2xs hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
          >
            <Github className="w-5 h-5 transition-transform group-hover:scale-110" />
          </a>
        </div>

        {/* Copyright & Branding */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 tracking-wide">
          <span>© {new Date().getFullYear()}</span>
          <span className="font-bold text-slate-800">xldplx</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-400">All rights reserved</span>
        </div>

      </div>
    </footer>
  );
}
