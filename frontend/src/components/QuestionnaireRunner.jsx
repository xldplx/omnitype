import { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Clock, Check, RotateCcw } from 'lucide-react';

function shuffleArray(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function QuestionnaireRunner({
  questions: rawQuestions = [],
  shuffleQuestions = false,
  questionsPerPage = 6,
  leftLabel = 'Strongly Disagree',
  rightLabel = 'Strongly Agree',
  loadingTitle = 'Analyzing Neural Patterns',
  loadingSubtitle = 'Please wait a moment',
  disclaimer = null,
  progressGradient = 'from-indigo-500 to-violet-500',
  spinnerColor = 'border-t-indigo-500',
  calculateResult,
  getRedirectPath,
  stateDataKey = 'resultData',
  transformState = null,
  delayMs = 3000,
}) {
  const storageKey = typeof window !== 'undefined' ? `omnitype_draft_${window.location.pathname}` : '';

  // Check if a saved session draft exists in localStorage
  const [savedDraft] = useState(() => {
    if (!storageKey) return null;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.answers && Object.keys(parsed.answers).length > 0) {
          return parsed;
        }
      }
    } catch {
      // storage unavailable
    }
    return null;
  });

  // Prompt the user if an existing session is found
  const [pendingResume, setPendingResume] = useState(() => !!savedDraft);

  const [questions, setQuestions] = useState(() => {
    if (savedDraft?.questions?.length === rawQuestions.length) {
      return savedDraft.questions;
    }
    return shuffleQuestions ? shuffleArray(rawQuestions) : rawQuestions;
  });

  const [answers, setAnswers] = useState(() => savedDraft?.answers || {});
  const [currentPage, setCurrentPage] = useState(() => {
    if (savedDraft && typeof savedDraft.currentPage === 'number') {
      const maxPage = Math.max(0, Math.ceil(rawQuestions.length / questionsPerPage) - 1);
      return Math.min(savedDraft.currentPage, maxPage);
    }
    return 0;
  });

  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState(null);
  const [focusedQuestionId, setFocusedQuestionId] = useState(null);

  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  // Derive active question cleanly without state inside effect
  const activeQuestionId = currentQuestions.some(q => q.id === focusedQuestionId)
    ? focusedQuestionId
    : (currentQuestions.find(q => answers[q.id] === undefined)?.id || currentQuestions[0]?.id || null);

  const answeredCount = Object.keys(answers).length;
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;
  const isPageComplete = currentQuestions.every(q => answers[q.id] !== undefined);

  // Remaining time estimate (~5.5 seconds per remaining question)
  const remainingCount = Math.max(0, questions.length - answeredCount);
  const estimatedMinsLeft = Math.max(1, Math.ceil((remainingCount * 5.5) / 60));

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Auto-save draft to localStorage whenever answers or page updates
  useEffect(() => {
    if (!storageKey || isFinished) return;
    if (answeredCount > 0) {
      try {
        localStorage.setItem(storageKey, JSON.stringify({
          answers,
          currentPage,
          questions,
          savedAt: Date.now()
        }));
      } catch {
        // storage error
      }
    }
  }, [answers, currentPage, questions, storageKey, isFinished, answeredCount]);

  // User confirms resuming previous test
  const handleConfirmResume = () => {
    setPendingResume(false);
  };

  // User rejects draft and starts over
  const handleStartOver = () => {
    if (storageKey) {
      try {
        localStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
    }
    setAnswers({});
    setCurrentPage(0);
    if (shuffleQuestions) {
      setQuestions(shuffleArray(rawQuestions));
    }
    setPendingResume(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinish = useCallback(() => {
    if (storageKey) {
      try {
        localStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
    }
    window.scrollTo(0, 0);
    setIsFinished(true);

    setTimeout(() => {
      const answersArray = Object.values(answers).map(a => ({
        id: a.id,
        value: a.value,
        type: a.type
      }));

      const simpleAnswersMap = {};
      Object.keys(answers).forEach(k => {
        simpleAnswersMap[k] = answers[k].value;
      });

      const calculatedResult = calculateResult(answersArray, simpleAnswersMap, questions);
      setResult(calculatedResult);
    }, delayMs);
  }, [storageKey, answers, calculateResult, questions, delayMs]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      handleFinish();
    }
  }, [currentPage, totalPages, handleFinish]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const handleAnswer = useCallback((questionId, value) => {
    const question = questions.find(q => q.id === questionId);
    setAnswers(prev => ({
      ...prev,
      [questionId]: { id: questionId, value, type: question?.type, rawValue: value }
    }));

    // Auto-scroll to next unanswered question on the current page
    const currIdx = currentQuestions.findIndex(q => q.id === questionId);
    let nextTarget = null;

    for (let i = currIdx + 1; i < currentQuestions.length; i++) {
      if (answers[currentQuestions[i].id] === undefined && currentQuestions[i].id !== questionId) {
        nextTarget = currentQuestions[i];
        break;
      }
    }
    if (!nextTarget) {
      for (let i = 0; i < currIdx; i++) {
        if (answers[currentQuestions[i].id] === undefined && currentQuestions[i].id !== questionId) {
          nextTarget = currentQuestions[i];
          break;
        }
      }
    }

    if (nextTarget) {
      setFocusedQuestionId(nextTarget.id);
      const el = document.getElementById(`q-card-${nextTarget.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      // All answered on this page
      setFocusedQuestionId(null);
      const continueBtn = document.getElementById('continue-button');
      if (continueBtn) {
        continueBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [questions, currentQuestions, answers]);

  // Desktop keyboard shortcuts: 1-7 to answer, Enter to advance, Alt+Left to go back
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;
      if (isFinished || pendingResume) return;

      const numMatch = e.key.match(/^[1-7]$/) || (e.code && e.code.match(/^Numpad([1-7])$/));
      if (numMatch) {
        e.preventDefault();
        const numVal = Number(numMatch[1] || numMatch[0]);

        const targetQ = currentQuestions.find(q => q.id === activeQuestionId)
          || currentQuestions.find(q => answers[q.id] === undefined)
          || currentQuestions[0];

        if (targetQ) {
          handleAnswer(targetQ.id, numVal);
        }
        return;
      }

      if (e.key === 'Enter') {
        if (isPageComplete) {
          e.preventDefault();
          handleNextPage();
        }
        return;
      }

      if ((e.key === 'ArrowLeft' && e.altKey) || (e.key === 'Backspace' && e.altKey)) {
        if (currentPage > 0) {
          e.preventDefault();
          handlePrevPage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeQuestionId, currentQuestions, answers, isPageComplete, isFinished, pendingResume, currentPage, handleAnswer, handleNextPage, handlePrevPage]);

  // ----------------------------------------
  // RESULTS / LOADING VIEW
  // ----------------------------------------
  if (isFinished && !result) {
    return (
      <div className="w-full min-h-screen bg-[#fafafa] flex flex-col items-center justify-center pt-24 pb-32">
        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center w-full max-w-xl px-6 flex flex-col items-center"
        >
          <div className={`w-12 h-12 border-4 border-slate-200 ${spinnerColor} rounded-full animate-spin mb-8`} />
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800 tracking-tight">{loadingTitle}</h2>
          <p className="text-slate-500 text-[1.1rem] tracking-wide font-medium flex items-center justify-center gap-2">
            {loadingSubtitle}
            <Motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>...</Motion.span>
          </p>
        </Motion.div>
      </div>
    );
  }

  if (result) {
    const redirectPath = getRedirectPath(result);
    const stateObj = transformState ? transformState(result) : { [stateDataKey]: result };
    return <Navigate to={redirectPath} state={stateObj} replace />;
  }

  // ----------------------------------------
  // TEST VIEW
  // ----------------------------------------
  const startQuestionNum = currentPage * questionsPerPage + 1;
  const endQuestionNum = Math.min((currentPage + 1) * questionsPerPage, questions.length);

  return (
    <div className="w-full min-h-screen bg-[#fafafa] pt-24 md:pt-36 pb-32 relative">
      
      {/* Resume Incomplete Session Modal */}
      <AnimatePresence>
        {pendingResume && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <Motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-4 text-indigo-600">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Resume Your Test?</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                You have a saved test session with <span className="font-semibold text-slate-700">{answeredCount} of {questions.length} questions completed</span>. Would you like to continue where you left off?
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleConfirmResume}
                  className="flex-1 py-3 px-5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-md cursor-pointer"
                >
                  Resume (Phase {currentPage + 1})
                </button>
                <button
                  type="button"
                  onClick={handleStartOver}
                  className="flex-1 py-3 px-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-sm transition-all cursor-pointer"
                >
                  Start Fresh
                </button>
              </div>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Clean Sticky Progress Bar (Offset cleanly below floating navbar) */}
      <div className="sticky top-20 md:top-28 z-30 bg-[#fafafa]/95 backdrop-blur-md border-b border-slate-200/60 shadow-2xs">
        <div className="w-full max-w-220 mx-auto px-4 md:px-8 py-3 md:py-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-slate-500 mb-2.5">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="font-bold text-indigo-600">{Math.round(progress)}% Complete</span>
              <span className="text-slate-300">•</span>
              <span>Questions {startQuestionNum}–{endQuestionNum} of {questions.length}</span>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-3 text-slate-400 text-[10px] sm:text-[11px]">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                ~{estimatedMinsLeft}m left
              </span>
              <span>Phase {currentPage + 1} of {totalPages}</span>
            </div>
          </div>

          {/* Slim progress line */}
          <div className="h-1.5 w-full bg-slate-200/70 overflow-hidden rounded-full">
            <Motion.div
              className={`h-full bg-linear-to-r ${progressGradient}`}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Question List with generous spacing */}
      <div className="w-full max-w-220 mx-auto px-3 sm:px-6 md:px-8 mt-8 md:mt-12 relative z-10">
        <div className="flex flex-col w-full gap-6 sm:gap-8">
          <AnimatePresence mode="wait">
            <Motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col w-full gap-8"
            >
              {currentQuestions.map((q, idx) => (
                <QuestionRow
                  key={q.id}
                  question={q}
                  questionNumber={currentPage * questionsPerPage + idx + 1}
                  totalQuestions={questions.length}
                  value={answers[q.id]?.value}
                  isActive={activeQuestionId === q.id}
                  onFocus={() => setFocusedQuestionId(q.id)}
                  onChange={(val) => handleAnswer(q.id, val)}
                  leftLabel={leftLabel}
                  rightLabel={rightLabel}
                />
              ))}
            </Motion.div>
          </AnimatePresence>

          {/* Footer Nav */}
          <div className="pt-10 sm:pt-14 pb-8 flex justify-center items-center w-full px-2 sm:px-4">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center">
              {currentPage > 0 && (
                <button
                  onClick={handlePrevPage}
                  className="flex-1 sm:flex-initial bg-white border border-slate-200 text-slate-600 shadow-xs flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold tracking-widest uppercase text-xs sm:text-sm transition-all duration-300 hover:bg-slate-50 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Back
                </button>
              )}

              <button
                id="continue-button"
                onClick={handleNextPage}
                disabled={!isPageComplete}
                className={`flex-1 sm:flex-initial bg-slate-900 border border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-12 py-3.5 sm:py-4 rounded-full text-white text-xs sm:text-[0.95rem] font-semibold tracking-widest uppercase transition-all duration-300 overflow-hidden relative group ${!isPageComplete ? 'opacity-30 cursor-not-allowed scale-100' : 'hover:scale-105 active:scale-95 hover:shadow-[0_12px_40px_rgb(0,0,0,0.2)] hover:bg-slate-800 cursor-pointer'}`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {currentPage === totalPages - 1 ? 'Analyze Data' : 'Continue'}
                  {isPageComplete && (
                    <span className="hidden sm:inline-block text-[10px] font-mono opacity-60 bg-white/10 px-1.5 py-0.5 rounded ml-1">
                      ↵
                    </span>
                  )}
                </span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 relative z-10 transition-transform duration-500 group-hover:translate-x-1" />

                {/* Subtle shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] transition-all duration-1000" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Footer if provided */}
      {disclaimer && (
        <div className="w-full max-w-4xl mx-auto px-6 mt-12 pb-20 text-center">
          <p className="text-[0.65rem] text-slate-400 uppercase tracking-widest leading-relaxed">
            {disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}

function QuestionRow({
  question,
  questionNumber,
  totalQuestions,
  value,
  isActive,
  onFocus,
  onChange,
  leftLabel,
  rightLabel
}) {
  const desktopOptions = [
    { val: 1, size: 'w-14 h-14 md:w-16 md:h-16 lg:w-[4.2rem] lg:h-[4.2rem]', border: 'border-[#6366f1]', bg: 'bg-[#6366f1]' },
    { val: 2, size: 'w-11 h-11 md:w-12 md:h-12 lg:w-[3.3rem] lg:h-[3.3rem]', border: 'border-[#6366f1]', bg: 'bg-[#6366f1]' },
    { val: 3, size: 'w-9 h-9 md:w-10 md:h-10 lg:w-[2.6rem] lg:h-[2.6rem]', border: 'border-[#6366f1]', bg: 'bg-[#6366f1]' },
    { val: 4, size: 'w-7 h-7 md:w-8 md:h-8 lg:w-[2.1rem] lg:h-[2.1rem]', border: 'border-slate-300', bg: 'bg-slate-300' },
    { val: 5, size: 'w-9 h-9 md:w-10 md:h-10 lg:w-[2.6rem] lg:h-[2.6rem]', border: 'border-[#10b981]', bg: 'bg-[#10b981]' },
    { val: 6, size: 'w-11 h-11 md:w-12 md:h-12 lg:w-[3.3rem] lg:h-[3.3rem]', border: 'border-[#10b981]', bg: 'bg-[#10b981]' },
    { val: 7, size: 'w-14 h-14 md:w-16 md:h-16 lg:w-[4.2rem] lg:h-[4.2rem]', border: 'border-[#10b981]', bg: 'bg-[#10b981]' },
  ];

  const mobileOptions = [
    { val: 1, size: 'w-9 h-9 min-[380px]:w-10 min-[380px]:h-10 sm:w-11 sm:h-11', border: 'border-[#6366f1]', bg: 'bg-[#6366f1]' },
    { val: 2, size: 'w-8 h-8 min-[380px]:w-8.5 min-[380px]:h-8.5 sm:w-9 sm:h-9', border: 'border-[#6366f1]', bg: 'bg-[#6366f1]' },
    { val: 3, size: 'w-7 h-7 min-[380px]:w-7 sm:w-7.5 sm:h-7.5', border: 'border-[#6366f1]', bg: 'bg-[#6366f1]' },
    { val: 4, size: 'w-5 h-5 min-[380px]:w-5.5 min-[380px]:h-5.5 sm:w-6 sm:h-6', border: 'border-slate-300', bg: 'bg-slate-300' },
    { val: 5, size: 'w-7 h-7 min-[380px]:w-7 sm:w-7.5 sm:h-7.5', border: 'border-[#10b981]', bg: 'bg-[#10b981]' },
    { val: 6, size: 'w-8 h-8 min-[380px]:w-8.5 min-[380px]:h-8.5 sm:w-9 sm:h-9', border: 'border-[#10b981]', bg: 'bg-[#10b981]' },
    { val: 7, size: 'w-9 h-9 min-[380px]:w-10 min-[380px]:h-10 sm:w-11 sm:h-11', border: 'border-[#10b981]', bg: 'bg-[#10b981]' },
  ];

  return (
    <div
      id={`q-card-${question.id}`}
      onClick={onFocus}
      className={`flex flex-col items-center py-6 sm:py-8 px-4 sm:px-6 md:px-8 w-full relative transition-all duration-200 rounded-2xl sm:rounded-3xl border ${
        isActive
          ? 'bg-white shadow-sm border-indigo-200 ring-2 ring-indigo-500/10'
          : 'bg-white/70 hover:bg-white border-slate-200/70 shadow-2xs'
      }`}
    >
      {/* Top Header: Question Number on Top Left, Answered on Top Right */}
      <div className="w-full flex items-center justify-between mb-5 sm:mb-6 pb-2.5 sm:pb-3 border-b border-slate-100">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Question {questionNumber} of {totalQuestions}
        </span>

        {value !== undefined ? (
          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-2 sm:px-2.5 py-0.5 rounded-full">
            <Check className="w-3 h-3 text-emerald-500" />
            Answered
          </span>
        ) : (
          <span className="text-[10px] sm:text-[11px] text-slate-300 font-medium">
            Not answered
          </span>
        )}
      </div>

      <h3 className="text-base sm:text-lg md:text-xl font-medium text-center mb-6 sm:mb-8 text-slate-800 leading-snug sm:leading-relaxed max-w-3xl px-1 sm:px-2 tracking-normal">
        {question.text}
      </h3>

      {/* DESKTOP VIEW - Clean circles without clutter */}
      <div className="hidden sm:flex items-center justify-center w-full max-w-4xl mt-2">
        <div className="flex-1 flex justify-end pr-3 md:pr-6 lg:pr-8">
          <span className="text-[#6366f1] font-semibold text-xs md:text-[0.8rem] uppercase tracking-widest text-right leading-tight">
            {leftLabel}
          </span>
        </div>

        <div className="flex gap-2.5 md:gap-4 lg:gap-5 items-center justify-center shrink-0">
          {desktopOptions.map((opt) => (
            <button
              key={opt.val}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(opt.val);
              }}
              className={`
                rounded-full border-2 transition-all duration-200 transform 
                flex items-center justify-center shrink-0 cursor-pointer
                hover:scale-105 active:scale-95 outline-none
                ${opt.size} 
                ${opt.border}
                ${value === opt.val ? opt.bg + ' scale-110 shadow-xs' : 'bg-transparent hover:bg-slate-50'}
              `}
            />
          ))}
        </div>

        <div className="flex-1 flex justify-start pl-3 md:pl-6 lg:pl-8">
          <span className="text-[#10b981] font-semibold text-xs md:text-[0.8rem] uppercase tracking-widest text-left leading-tight">
            {rightLabel}
          </span>
        </div>
      </div>

      {/* MOBILE VIEW - Scaled for seamless phone touch */}
      <div className="flex sm:hidden flex-col items-center w-full px-1 mt-4">
        <div className="flex justify-between items-center w-full px-1 max-w-sm mx-auto">
          {mobileOptions.map((opt) => (
            <button
              key={opt.val}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(opt.val);
              }}
              className={`
                rounded-full border-2 transition-all duration-150 transform 
                flex items-center justify-center shrink-0 cursor-pointer
                active:scale-90 touch-manipulation
                ${opt.size} 
                ${opt.border}
                ${value === opt.val ? opt.bg + ' scale-110 shadow-xs' : 'bg-transparent'}
              `}
            />
          ))}
        </div>
        <div className="flex justify-between w-full max-w-sm mx-auto px-2 text-[0.65rem] sm:text-xs uppercase font-semibold tracking-wider mt-5 opacity-75">
          <span className="text-[#6366f1]">{leftLabel}</span>
          <span className="text-[#10b981]">{rightLabel}</span>
        </div>
      </div>
    </div>
  );
}
