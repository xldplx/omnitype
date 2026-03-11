import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, Palette, Loader2 } from 'lucide-react';
import { colorPsychologyQuestions, calculateColorPsychology } from '../utils/colorPsychologyLogic';

export default function ColorPsychologyTest() {
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const navigate = useNavigate();
  const questionsPerPage = 6;
  const totalPages = Math.ceil(colorPsychologyQuestions.length / questionsPerPage);

  const currentQuestions = colorPsychologyQuestions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const isPageComplete = currentQuestions.every(q => answers[q.id] !== undefined);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsAnalyzing(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      setTimeout(() => {
        const resultData = calculateColorPsychology(answers);
        navigate(`/result/color-psychology/${resultData.dominantArchetype}`, { state: { resultData } });
      }, 3000); // 3 seconds delay
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  // ----------------------------------------
  // RESULTS VIEW (Loading State)
  // ----------------------------------------
  if (isAnalyzing) {
    return (
      <div className="w-full min-h-screen bg-[#fafafa] flex flex-col items-center justify-center pt-24 pb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center w-full max-w-xl px-6 flex flex-col items-center"
        >
          <div className="w-12 h-12 border-4 border-slate-200 border-t-cyan-500 rounded-full animate-spin mb-8" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800 tracking-tight">Analyzing Results</h2>
          <p className="text-slate-500 text-[1.1rem] tracking-wide font-medium flex items-center justify-center gap-2">
            Please wait a moment<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>...</motion.span>
          </p>
        </motion.div>
      </div>
    );
  }

  // Progress calculations
  const totalAnswered = Object.keys(answers).length;
  const progressPercentage = (totalAnswered / colorPsychologyQuestions.length) * 100;

  // ----------------------------------------
  // TEST VIEW (Clean White Background)
  // ----------------------------------------
  return (
    <div className="w-full min-h-screen bg-white pt-24 pb-32 relative overflow-hidden">
      
      <div className="w-full max-w-220 mx-auto px-4 md:px-8 mt-12 relative z-10">
        
        {/* Progress Header */}
        <div className="bg-white/90 backdrop-blur-md sticky top-24 md:top-28 z-40 py-5 mb-16 border-b border-slate-100">
          <div className="flex justify-between items-center text-[0.65rem] md:text-xs font-bold text-slate-400 mb-4 tracking-[0.2em] uppercase">
            <span>Progress: {Math.round(progressPercentage)}%</span>
            <span className="hidden sm:inline bg-slate-50 px-3 py-1 rounded-full border border-slate-100">Phase {currentPage + 1} / {Math.ceil(colorPsychologyQuestions.length / questionsPerPage)}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 overflow-hidden rounded-full">
            <motion.div 
              className="h-full bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600"
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Question List */}
        <div className="flex flex-col w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col w-full"
            >
              {currentQuestions.map((q, idx) => (
                <QuestionRow 
                  key={q.id} 
                  question={q} 
                  value={answers[q.id]} 
                  onChange={(val) => handleAnswer(q.id, val)}
                  isLast={idx === currentQuestions.length - 1}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Footer Nav */}
          <div className="pt-20 pb-8 flex flex-col md:flex-row justify-center items-center w-full px-4 md:px-0">
            <div className="flex items-center gap-4">
              {currentPage > 0 && (
                <button 
                  onClick={handlePrevPage}
                  className="bg-white border border-slate-200 text-slate-600 shadow-sm flex items-center justify-center px-6 py-4 rounded-full font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-slate-50 hover:shadow-md"
                >
                  Back
                </button>
              )}
              
              <button 
                onClick={handleNextPage}
                disabled={!isPageComplete}
                className={`bg-slate-900 border border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 px-12 py-4 rounded-full text-white text-[0.95rem] font-semibold tracking-widest uppercase transition-all duration-500 overflow-hidden relative group ${!isPageComplete ? 'opacity-30 cursor-not-allowed scale-100' : 'hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.2)] hover:bg-slate-800'}`}
              >
                <span className="relative z-10">{currentPage === totalPages - 1 ? 'Analyze Data' : 'Continue'}</span>
                <ChevronRight className="w-5 h-5 opacity-70 relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] transition-all duration-1000" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionRow({ question, value, onChange, isLast }) {
  // Delicate borders and sizes
  const desktopOptions = [
    { val: 3, size: 'w-[4.5rem] h-[4.5rem]', border: 'border-[#10b981]', bg: 'bg-[#10b981]' },
    { val: 2, size: 'w-[3.5rem] h-[3.5rem]', border: 'border-[#10b981]', bg: 'bg-[#10b981]' },
    { val: 1, size: 'w-[2.8rem] h-[2.8rem]', border: 'border-[#10b981]', bg: 'bg-[#10b981]' },
    { val: 0, size: 'w-[2.2rem] h-[2.2rem]', border: 'border-slate-300', bg: 'bg-slate-300' },
    { val: -1, size: 'w-[2.8rem] h-[2.8rem]', border: 'border-[#6366f1]', bg: 'bg-[#6366f1]' },
    { val: -2, size: 'w-[3.5rem] h-[3.5rem]', border: 'border-[#6366f1]', bg: 'bg-[#6366f1]' },
    { val: -3, size: 'w-[4.5rem] h-[4.5rem]', border: 'border-[#6366f1]', bg: 'bg-[#6366f1]' },
  ];

  const mobileOptions = [
    { val: 3, size: 'w-12 h-12', border: 'border-[#10b981]', bg: 'bg-[#10b981]' },
    { val: 2, size: 'w-10 h-10', border: 'border-[#10b981]', bg: 'bg-[#10b981]' },
    { val: 1, size: 'w-8 h-8', border: 'border-[#10b981]', bg: 'bg-[#10b981]' },
    { val: 0, size: 'w-6 h-6', border: 'border-slate-300', bg: 'bg-slate-300' },
    { val: -1, size: 'w-8 h-8', border: 'border-[#6366f1]', bg: 'bg-[#6366f1]' },
    { val: -2, size: 'w-10 h-10', border: 'border-[#6366f1]', bg: 'bg-[#6366f1]' },
    { val: -3, size: 'w-12 h-12', border: 'border-[#6366f1]', bg: 'bg-[#6366f1]' },
  ];

  return (
    <div className={`flex flex-col items-center py-12 md:py-16 border-slate-100 w-full relative ${!isLast ? 'border-b' : ''}`}>
      <h3 className="text-[1.2rem] md:text-2xl font-medium text-center mb-10 md:mb-14 text-slate-700 leading-relaxed max-w-3xl px-4 tracking-normal">
        {question.text}
      </h3>
      
      {/* -------------------- 
          DESKTOP VIEW
          -------------------- */}
      <div className="hidden sm:flex items-center justify-center w-full max-w-4xl mt-4">
        <div className="flex-1 flex justify-end pr-4 md:pr-8">
          <span className="text-[#10b981] font-semibold text-xs md:text-[0.8rem] uppercase tracking-widest text-right leading-tight">Agree</span>
        </div>
        
        <div className="flex gap-3 md:gap-6 items-center justify-center shrink-0">
          {desktopOptions.map((opt) => (
            <button
              key={opt.val}
              onClick={() => onChange(opt.val)}
              className={`
                rounded-full border-2 transition-all duration-300 transform 
                flex items-center justify-center shrink-0
                hover:scale-105 active:scale-95 outline-none
                ${opt.size} 
                ${opt.border}
                ${value === opt.val ? opt.bg + ' scale-110' : 'bg-transparent hover:bg-slate-50'}
              `}
            />
          ))}
        </div>

        <div className="flex-1 flex justify-start pl-4 md:pl-8">
          <span className="text-[#6366f1] font-semibold text-xs md:text-[0.8rem] uppercase tracking-widest text-left leading-tight">Disagree</span>
        </div>
      </div>

      {/* -------------------- 
          MOBILE VIEW
          -------------------- */}
      <div className="flex sm:hidden flex-col items-center w-full px-1 mt-6">
        <div className="flex justify-between items-center w-full px-1 gap-1">
          {mobileOptions.map((opt) => (
            <button
              key={opt.val}
              onClick={() => onChange(opt.val)}
              className={`
                rounded-full border-2 transition-all duration-200 transform 
                flex items-center justify-center shrink-0
                active:scale-90
                ${opt.size} 
                ${opt.border}
                ${value === opt.val ? opt.bg : 'bg-transparent'}
              `}
            />
          ))}
        </div>
        <div className="flex justify-between w-full px-2 text-[0.65rem] uppercase font-semibold tracking-widest mt-6 opacity-60">
          <span className="text-[#10b981]">Agree</span>
          <span className="text-[#6366f1]">Disagree</span>
        </div>
      </div>
    </div>
  );
}
