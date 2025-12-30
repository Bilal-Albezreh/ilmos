"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, RefreshCw, Trophy, BookOpen } from "lucide-react";
import quizData from "../../data/quiz.json";

export default function QuizPage() {
  // STATE: Quiz Progress
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  
  // STATE: Interaction
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  // STATE: Language ('en' or 'ar')
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  const question = quizData.questions[currentQuestion];
  const isArabic = lang === 'ar';

  // LOGIC: Handle Answer Click
  const handleAnswerOptionClick = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  // LOGIC: Next Question
  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  // LOGIC: Reset Quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="min-h-screen bg-andalusian animate-pattern flex flex-col font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-emerald-100/50 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-emerald-800 transition">
            <ArrowLeft size={20} />
            <span className="text-sm font-bold hidden sm:inline">Exit Exam</span>
          </Link>
          
          <div className="flex items-center gap-4">
             {/* Language Toggle */}
             <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                <button 
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${!isArabic ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => setLang('ar')}
                  className={`px-3 py-1 rounded-md text-xs font-bold font-serif transition-all ${isArabic ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  عربي
                </button>
             </div>
             
             <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
               {isArabic ? "سؤال" : "Question"} {currentQuestion + 1}/{quizData.questions.length}
             </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-3xl">

          {showScore ? (
            /* SCORE SCREEN */
            <div className="bg-white border border-emerald-100 rounded-3xl p-12 text-center shadow-xl shadow-emerald-900/5 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Trophy size={40} />
              </div>
              <h2 className="text-3xl font-serif text-emerald-950 mb-2">Exam Complete!</h2>
              <p className="text-slate-500 mb-8">You scored {score} out of {quizData.questions.length}</p>
              
              <div className="flex justify-center gap-4">
                <button 
                  onClick={resetQuiz}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-900 text-white rounded-xl font-bold hover:bg-emerald-800 transition shadow-lg shadow-emerald-900/20"
                >
                  <RefreshCw size={18} /> Retake Exam
                </button>
                <Link 
                  href="/learn"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-900 border border-emerald-200 rounded-xl font-bold hover:bg-emerald-50 transition"
                >
                  <BookOpen size={18} /> Review Book
                </Link>
              </div>
            </div>
          ) : (
            /* QUESTION CARD */
            <div className="bg-[#FFFCF5] border border-[#E8E1D0] rounded-3xl shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col">
               
               {/* Progress Bar */}
               <div className="w-full h-1.5 bg-emerald-900/10">
                 <div 
                   className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                   style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
                 ></div>
               </div>

               <div className="p-8 md:p-12 flex-1 flex flex-col">
                 
                 {/* The Question Text */}
                 <h2 
                   className={`text-2xl md:text-3xl font-serif text-emerald-950 mb-8 leading-relaxed ${isArabic ? 'text-right font-[var(--font-amiri)]' : 'text-left'}`}
                   dir={isArabic ? "rtl" : "ltr"}
                 >
                   {isArabic ? question.questionArabic : question.question}
                 </h2>

                 {/* Options Grid */}
                 <div className="space-y-3">
                   {(isArabic ? question.optionsArabic : question.options).map((option, index) => {
                      
                      // Determine button styling based on state
                      let buttonStyle = "bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50";
                      let icon = null;

                      if (isAnswered) {
                        if (index === question.correctAnswer) {
                          buttonStyle = "bg-emerald-100 border-emerald-500 text-emerald-900"; // Correct
                          icon = <CheckCircle2 size={20} className="text-emerald-600" />;
                        } else if (index === selectedOption) {
                          buttonStyle = "bg-red-50 border-red-200 text-red-900"; // Wrong
                          icon = <XCircle size={20} className="text-red-500" />;
                        } else {
                          buttonStyle = "bg-slate-50 border-slate-100 text-slate-400 opacity-60"; // Others
                        }
                      } else if (selectedOption === index) {
                         buttonStyle = "bg-emerald-50 border-emerald-500";
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerOptionClick(index)}
                          disabled={isAnswered}
                          className={`w-full p-4 md:p-5 rounded-xl border-2 text-lg font-medium transition-all duration-200 flex items-center justify-between group text-left
                            ${buttonStyle} ${isArabic ? 'flex-row-reverse text-right font-[var(--font-amiri)]' : ''}`}
                        >
                          <span>{option}</span>
                          {icon}
                        </button>
                      );
                   })}
                 </div>

                 {/* Explanation Panel (Shows after answering) */}
                 {isAnswered && (
                   <div className="mt-8 pt-6 border-t border-emerald-900/10 animate-in fade-in slide-in-from-bottom-2">
                     <div className={`flex gap-3 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                       <div className="p-2 bg-amber-100 text-amber-700 rounded-lg h-fit shrink-0">
                         <AlertCircle size={20} />
                       </div>
                       <div>
                         <h4 className="font-bold text-emerald-900 text-sm uppercase tracking-wider mb-1">
                           {isArabic ? "شرح وتوضيح" : "Explanation"}
                         </h4>
                         <p className={`text-slate-600 leading-relaxed ${isArabic ? 'font-[var(--font-amiri)]' : ''}`}>
                           {isArabic ? question.explanationArabic : question.explanation}
                         </p>
                       </div>
                     </div>
                     
                     <div className={`mt-6 flex ${isArabic ? 'justify-start' : 'justify-end'}`}>
                       <button
                         onClick={handleNextQuestion}
                         className="bg-emerald-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-800 transition shadow-lg shadow-emerald-900/20 flex items-center gap-2"
                       >
                         {currentQuestion === quizData.questions.length - 1 
                            ? (isArabic ? "إنهاء الاختبار" : "Finish Exam") 
                            : (isArabic ? "السؤال التالي" : "Next Question")
                         }
                       </button>
                     </div>
                   </div>
                 )}

               </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}