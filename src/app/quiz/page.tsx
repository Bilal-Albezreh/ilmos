"use client";

import { useState } from "react";
import { ChevronRight, RefreshCcw, Trophy, CheckCircle2, XCircle, Home, ArrowRight } from "lucide-react";
import Link from "next/link";
import quizData from "../../data/quiz.json"; 

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const question = quizData.quizzes[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / quizData.quizzes.length) * 100;

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === question.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.quizzes.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  // --- RESULT SCREEN ---
  if (showResults) {
    return (
      <div className="min-h-screen bg-andalusian animate-pattern flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#FFFCF5] rounded-2xl shadow-2xl border border-[#E8E1D0] p-8 text-center relative overflow-hidden">
          {/* Confetti / Decor */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500"></div>
          
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600 shadow-inner">
            <Trophy size={40} />
          </div>
          
          <h2 className="text-3xl font-serif text-emerald-950 mb-2">Quiz Complete!</h2>
          <p className="text-slate-500 mb-8 font-sans">You have tested your knowledge of the fundamentals.</p>

          <div className="bg-white border border-slate-100 rounded-xl p-6 mb-8 shadow-sm">
            <div className="text-sm text-slate-400 uppercase tracking-widest mb-1">Your Score</div>
            <div className="text-5xl font-bold text-emerald-600 font-serif">
              {score} <span className="text-2xl text-slate-300">/ {quizData.quizzes.length}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={resetQuiz}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition font-bold"
            >
              <RefreshCcw size={18} /> Retry
            </button>
            <Link 
              href="/learn"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-900 text-white hover:bg-emerald-800 transition shadow-lg shadow-emerald-900/20 font-bold"
            >
              <Home size={18} /> Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- QUESTION SCREEN ---
  return (
    <div className="min-h-screen bg-andalusian animate-pattern flex flex-col items-center justify-center p-4 md:p-6 font-sans text-slate-900">
      
      {/* Top Bar */}
      <div className="w-full max-w-2xl mb-8 flex items-center justify-between">
        <Link href="/learn" className="flex items-center gap-2 text-emerald-800 hover:bg-white/50 px-3 py-1.5 rounded-lg transition">
           <Home size={18} /> <span className="text-sm font-bold">Back to Reader</span>
        </Link>
        <div className="text-sm font-medium text-emerald-800 bg-white/60 px-3 py-1 rounded-full border border-emerald-100/50 backdrop-blur-sm">
          Question {currentQuestionIndex + 1} of {quizData.quizzes.length}
        </div>
      </div>

      {/* Main Quiz Card */}
      <div className="w-full max-w-2xl bg-[#FFFCF5] rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-[#E8E1D0] relative overflow-hidden flex flex-col">
        
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-slate-100">
           <div 
             className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
             style={{ width: `${((currentQuestionIndex + 1) / quizData.quizzes.length) * 100}%` }}
           />
        </div>

        <div className="p-8 md:p-12">
           
           {/* Question Text */}
           <h2 className="text-xl md:text-2xl font-serif text-emerald-950 leading-relaxed mb-10">
             {question.question}
           </h2>

           {/* Options Grid */}
           <div className="space-y-3">
             {question.options.map((option, idx) => {
               const isSelected = selectedOption === idx;
               const isCorrect = idx === question.correctAnswer;
               const showCorrectness = isAnswered && isCorrect;
               const showWrongness = isAnswered && isSelected && !isCorrect;
               
               let borderClass = "border-slate-200 hover:border-emerald-400 hover:bg-white";
               let bgClass = "bg-white/50";
               let icon = null;

               if (isAnswered) {
                  if (isCorrect) {
                    borderClass = "border-emerald-500 ring-1 ring-emerald-500";
                    bgClass = "bg-emerald-50";
                    icon = <CheckCircle2 className="text-emerald-600" size={20} />;
                  } else if (isSelected) {
                    borderClass = "border-red-400 ring-1 ring-red-400";
                    bgClass = "bg-red-50";
                    icon = <XCircle className="text-red-500" size={20} />;
                  } else {
                    bgClass = "bg-slate-50 opacity-50";
                  }
               } else if (isSelected) {
                  borderClass = "border-emerald-500";
                  bgClass = "bg-emerald-50";
               }

               return (
                 <button
                   key={idx}
                   onClick={() => handleOptionClick(idx)}
                   disabled={isAnswered}
                   className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${borderClass} ${bgClass}`}
                 >
                   <span className={`font-medium ${isAnswered && !isCorrect && !isSelected ? 'text-slate-400' : 'text-slate-700'}`}>
                     {option}
                   </span>
                   {icon && <div className="animate-in zoom-in duration-300">{icon}</div>}
                 </button>
               );
             })}
           </div>

           {/* Explanation & Next Button */}
           {isAnswered && (
             <div className="mt-8 pt-8 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                   <div className="flex-1">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Explanation</div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {question.explanation}
                      </p>
                   </div>
                   <button 
                     onClick={handleNext}
                     className="px-6 py-3 bg-emerald-900 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap"
                   >
                     {currentQuestionIndex < quizData.quizzes.length - 1 ? "Next Question" : "Finish Quiz"} <ArrowRight size={18} />
                   </button>
                </div>
             </div>
           )}

        </div>
      </div>
    </div>
  );
}