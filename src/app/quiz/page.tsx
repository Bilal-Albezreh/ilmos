"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Trophy, Clock, AlertCircle, ArrowRight } from "lucide-react";

export default function QuizDashboard() {
  return (
    <div className="min-h-screen bg-andalusian animate-pattern font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-emerald-100/50 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-emerald-800 transition">
            <ArrowLeft size={20} />
            <span className="text-sm font-bold">Back to Home</span>
          </Link>
          <span className="font-serif font-bold text-emerald-950">Exam Portal</span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        
        <div className="text-center mb-16">
           <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl mb-6 shadow-inner">
              <Trophy size={32} />
           </div>
           <h1 className="text-4xl md:text-5xl font-serif text-emerald-950 mb-4">Assessment Center</h1>
           <p className="text-slate-500 max-w-lg mx-auto">Verify your understanding. Certification exams are timed and grading is automated.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           
           {/* EXAM 1: USOOL (Active) */}
           <div className="bg-white border border-emerald-200 rounded-3xl p-8 shadow-xl shadow-emerald-900/5 hover:border-emerald-400 transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-300"></div>
              
              <div className="flex justify-between items-start mb-6">
                 <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-widest">
                    Available
                 </span>
                 <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                    <Clock size={14} /> 20 Mins
                 </span>
              </div>

              <h3 className="text-2xl font-serif text-emerald-950 mb-2 group-hover:text-emerald-700 transition">The Three Fundamental Principles</h3>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">Comprehensive exam covering the Introduction, the Three Questions, and the Conclusion.</p>

              <div className="flex items-center justify-between mt-auto">
                 <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">?</div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">?</div>
                 </div>
                 <Link 
                   href="/quiz/usool" 
                   className="px-6 py-2.5 bg-emerald-900 text-white rounded-xl font-bold text-sm hover:bg-emerald-800 transition flex items-center gap-2 shadow-lg shadow-emerald-900/20"
                 >
                    Start Exam <ArrowRight size={16} />
                 </Link>
              </div>
           </div>

           {/* EXAM 2: HADITH (Locked) */}
           <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 opacity-60 relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                 <span className="px-3 py-1 rounded-lg bg-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    Locked
                 </span>
              </div>

              <h3 className="text-2xl font-serif text-slate-700 mb-2">40 Hadith of Nawawi</h3>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">Complete the course material to unlock this certification exam.</p>

              <div className="flex items-center gap-2 text-amber-600/70 bg-amber-50 px-4 py-3 rounded-xl text-xs font-bold border border-amber-100">
                 <AlertCircle size={16} /> Prerequisites not met
              </div>
           </div>

        </div>

      </main>
    </div>
  );
}