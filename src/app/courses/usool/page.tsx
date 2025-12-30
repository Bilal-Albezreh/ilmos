"use client";

import Link from "next/link";
import { 
  BookOpen, Clock, BarChart, CheckCircle2, PlayCircle, 
  ArrowLeft, Star, Users, BookMarked, GraduationCap 
} from "lucide-react";

export default function UsoolLandingPage() {
  return (
    <div className="min-h-screen bg-andalusian animate-pattern font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* NAVBAR (Simplified) */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-emerald-100/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 text-slate-400 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-all">
            <ArrowLeft size={20} />
          </Link>
          <span className="font-serif font-bold text-emerald-950 tracking-tight">IlmOS Platform</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* 1. HERO HEADER */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Star size={12} className="fill-emerald-800" />
                Level 1 • Aqeedah
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-emerald-950 mb-6 leading-tight">
                The Three Fundamental Principles <br/>
                <span className="text-emerald-700 italic text-2xl md:text-3xl">(Usūl ath-Thalātha)</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                The most studied primer in Islamic theology. It systematically answers the three questions every human will face in the grave: Who is your Lord? What is your Religion? Who is your Prophet?
              </p>
            </div>

            {/* 2. STATS BAR */}
            <div className="flex flex-wrap gap-6 p-6 bg-white border border-emerald-100/50 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Clock size={20} /></div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Duration</p>
                  <p className="font-semibold text-emerald-950">2-3 Hours</p>
                </div>
              </div>
              <div className="w-px bg-slate-100"></div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><BarChart size={20} /></div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Level</p>
                  <p className="font-semibold text-emerald-950">Beginner</p>
                </div>
              </div>
              <div className="w-px bg-slate-100"></div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><GraduationCap size={20} /></div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Students</p>
                  <p className="font-semibold text-emerald-950">1,240 Enrolled</p>
                </div>
              </div>
            </div>

            {/* 3. ABOUT THE BOOK & AUTHOR */}
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-emerald-950 flex items-center gap-2">
                <BookMarked size={24} className="text-emerald-600" />
                About the Text
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <p>
                  This treatise is considered the <strong>first step</strong> for any student of knowledge. It is not merely a book to be read, but a manual to be memorized and internalized.
                </p>
                <p className="mt-4">
                  <strong>The Author:</strong> Imam Muhammad ibn Abd al-Wahhab (1115-1206 AH) was a renowned scholar and reformer who called for the purification of worship and a return to the pristine methodology of the Salaf.
                </p>
              </div>
            </div>

            {/* 4. WHAT YOU WILL LEARN */}
            <div className="bg-[#FFFCF5] border border-[#E8E1D0] rounded-2xl p-8">
              <h3 className="font-serif text-xl text-emerald-950 mb-6">Learning Outcomes</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "The 4 Matters (Surah Al-Asr)",
                  "The 3 Types of Tawheed",
                  "The meaning of Taghut",
                  "The 3 Levels of Religion",
                  "The 5 Pillars of Islam",
                  "The 6 Pillars of Iman"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-slate-700 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. SYLLABUS / CHAPTERS */}
            <div>
               <h2 className="text-2xl font-serif text-emerald-950 mb-6">Course Syllabus</h2>
               <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                 {[
                   { title: "Introduction: The Four Matters", time: "15 min" },
                   { title: "The Three Fundamental Principles", time: "45 min" },
                   { title: "The Religion of Islam (3 Levels)", time: "30 min" },
                   { title: "The Prophet Muhammad ﷺ", time: "20 min" },
                   { title: "Conclusion: Resurrection & Taghut", time: "15 min" },
                 ].map((chapter, i) => (
                   <div key={i} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-slate-50 transition">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                          {i + 1}
                        </div>
                        <span className="font-medium text-slate-700">{chapter.title}</span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">{chapter.time}</span>
                   </div>
                 ))}
               </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Action Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50">
                
                {/* Book Preview Image */}
                <div className="aspect-[3/4] bg-emerald-900 rounded-lg mb-6 relative overflow-hidden group shadow-inner">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 border-2 border-emerald-500/30 m-2 rounded">
                      <h3 className="text-emerald-100 font-serif text-2xl font-bold mb-2">ثلاثة الأصول</h3>
                      <p className="text-emerald-400/80 text-xs uppercase tracking-widest">Al-Usool Al-Thalatha</p>
                   </div>
                </div>

                <div className="space-y-4">
                  <Link 
                    href="/learn"
                    className="w-full h-12 flex items-center justify-center gap-2 bg-emerald-900 text-white rounded-xl font-bold hover:bg-emerald-800 hover:scale-[1.02] transition-all shadow-lg shadow-emerald-900/20"
                  >
                    <PlayCircle size={20} /> Start Reading
                  </Link>
                  
                  <Link 
                    href="/quiz"
                    className="w-full h-12 flex items-center justify-center gap-2 bg-white text-emerald-900 border border-emerald-200 rounded-xl font-bold hover:bg-emerald-50 transition-all"
                  >
                    Take Quiz
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-400 mb-2">Features Included</p>
                  <div className="flex justify-center gap-4 text-emerald-700">
                    <div title="Full Text" className="cursor-help">
                      <BookOpen size={18} />
                    </div>
                    <div title="Video Explanations" className="cursor-help">
                      <PlayCircle size={18} />
                    </div>
                    <div title="Quizzes" className="cursor-help">
                      <CheckCircle2 size={18} />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}