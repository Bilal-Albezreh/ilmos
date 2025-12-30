"use client";

import Link from "next/link";
import { BookOpen, Sparkles, Library, GraduationCap, Lock, Star, Moon, PlayCircle, Clock, User } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-andalusian animate-pattern flex flex-col font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-emerald-100/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-600 rounded-lg rotate-45 opacity-80"></div>
              <div className="absolute inset-0 bg-emerald-800 rounded-lg -rotate-12 opacity-80"></div>
              <BookOpen size={16} className="relative text-white z-10" />
            </div>
            <span className="font-serif text-lg font-bold text-emerald-950 tracking-tight">IlmOS</span>
          </div>

          {/* Nav Links & Login Button */}
          <div className="flex items-center gap-6">
            <Link href="/courses/usool" className="hidden md:block text-sm font-medium text-emerald-800 hover:text-emerald-600 transition">Courses</Link>
            <Link href="/quiz" className="hidden md:block text-sm font-medium text-emerald-800 hover:text-emerald-600 transition">Quizzes</Link>
            
            {/* NEW LOGIN BUTTON */}
            <Link 
              href="/login" 
              className="group flex items-center gap-2 bg-emerald-900 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-emerald-800 hover:scale-105 transition-all shadow-lg shadow-emerald-900/20"
            >
              <User size={14} className="text-emerald-200 group-hover:text-white transition-colors" />
              <span>Sign In</span>
            </Link>
          </div>

        </div>
      </nav>

      <main className="flex-1">
        
        {/* 2. HERO SECTION */}
        <section className="relative pt-32 pb-60 overflow-hidden">
          
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
             <div 
               className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 grayscale-[10%]"
               style={{ backgroundImage: "url('/hero.jpg')" }}
             ></div>
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-[#fdfcf8]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
             
             {/* Hadith Badge */}
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-8 shadow-md backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Sparkles size={12} className="text-amber-500" />
                <span>Prophetic Wisdom</span>
             </div>
             
             {/* Main Heading */}
             <h1 className="text-5xl md:text-7xl font-serif text-emerald-950 mb-6 leading-tight drop-shadow-sm animate-in fade-in slide-in-from-bottom-6 duration-1000">
               Seek Knowledge <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-teal-700 font-[var(--font-amiri)]">
                 from the Cradle to the Grave
               </span>
             </h1>
             
             <p className="text-lg md:text-xl text-slate-800 max-w-2xl mx-auto mb-10 leading-relaxed font-medium drop-shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both delay-200">
               Master the classical texts of Islam through an interactive, AI-powered interface. 
               Read the matn, watch scholar explanations, and test your understanding.
             </p>
             
             {/* CTA Buttons */}
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 fill-mode-both delay-300">
               <Link 
                 href="/courses/usool" 
                 className="h-14 px-8 rounded-2xl bg-emerald-900 text-white font-bold flex items-center gap-3 hover:bg-emerald-800 hover:scale-105 transition-all shadow-xl shadow-emerald-900/20"
               >
                 <BookOpen size={20} />
                 Start Level 1
               </Link>
               <button className="h-14 px-8 rounded-2xl bg-white/90 backdrop-blur-sm text-emerald-900 font-bold border border-emerald-200 flex items-center gap-3 hover:bg-white transition-all shadow-md">
                 <PlayCircle size={20} />
                 Watch Trailer
               </button>
             </div>

          </div>
        </section>


        {/* 3. LEARNING PATH */}
        <section className="py-20 bg-white/60 backdrop-blur-md border-t border-emerald-50 relative z-10 -mt-20">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-serif text-emerald-950 mb-2">The Student's Path</h2>
                <p className="text-slate-500">A structured journey through the Islamic sciences.</p>
              </div>
              <div className="hidden md:flex gap-2">
                 <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                 <span className="w-3 h-3 rounded-full bg-emerald-200"></span>
                 <span className="w-3 h-3 rounded-full bg-emerald-100"></span>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* CARD 1: ACTIVE (Usool) */}
              <Link href="/courses/usool" className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-30 group-hover:opacity-100 blur transition duration-500"></div>
                <div className="relative h-full bg-[#FFFCF5] border border-[#E8E1D0] rounded-2xl p-8 flex flex-col hover:-translate-y-1 transition duration-300">
                  
                  {/* Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-widest">
                      Level 1 • Aqeedah
                    </span>
                    <Star className="text-amber-400 fill-amber-400" size={20} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-serif text-emerald-950 mb-2 group-hover:text-emerald-700 transition">
                    The Three Fundamental Principles
                  </h3>
                  <p className="text-sm text-slate-500 mb-6 font-medium">Usūl ath-Thalātha</p>
                  
                  {/* Progress */}
                  <div className="mt-auto">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                       <Clock size={12} /> 20% Completed
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full w-1/5 bg-emerald-500 rounded-full"></div>
                    </div>
                  </div>

                </div>
              </Link>

              {/* CARD 2: LOCKED (40 Hadith) */}
              <div className="group relative opacity-70 hover:opacity-100 transition">
                <div className="h-full bg-white border border-slate-200 rounded-2xl p-8 flex flex-col">
                  
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                      Level 1 • Hadith
                    </span>
                    <Lock className="text-slate-300" size={20} />
                  </div>

                  <h3 className="text-2xl font-serif text-slate-700 mb-2">
                    40 Hadith of Nawawi
                  </h3>
                  <p className="text-sm text-slate-400 mb-6 font-medium">Al-Arba'īn An-Nawawiyyah</p>
                  
                  <div className="mt-auto pt-6 border-t border-slate-50">
                    <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                       <Moon size={12} /> Coming Soon
                    </span>
                  </div>
                </div>
              </div>

              {/* CARD 3: LOCKED (Kitab at-Tawheed) */}
              <div className="group relative opacity-70 hover:opacity-100 transition">
                <div className="h-full bg-white border border-slate-200 rounded-2xl p-8 flex flex-col">
                  
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                      Level 2 • Aqeedah
                    </span>
                    <Lock className="text-slate-300" size={20} />
                  </div>

                  <h3 className="text-2xl font-serif text-slate-700 mb-2">
                    Book of Monotheism
                  </h3>
                  <p className="text-sm text-slate-400 mb-6 font-medium">Kitāb at-Tawhīd</p>
                  
                  <div className="mt-auto pt-6 border-t border-slate-50">
                    <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                       <Moon size={12} /> Coming Soon
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. FEATURES SECTION */}
        <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
           
           <div className="bg-emerald-900 rounded-3xl p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
              
              <div className="relative z-10">
                 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-8 backdrop-blur-sm">
                   <Library className="text-emerald-200" size={24} />
                 </div>
                 <h2 className="text-3xl font-serif mb-6 leading-normal">
                   "Whoever travels a path in search of knowledge, Allah will make easy for him a path to Paradise."
                 </h2>
                 <p className="text-emerald-200/80 font-medium">— Prophet Muhammad ﷺ (Muslim)</p>
              </div>
           </div>

           <div className="space-y-8">
              <div className="flex gap-5">
                 <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                    <BookOpen size={24} />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-emerald-950 mb-2">Classic Texts, Modern Interface</h3>
                    <p className="text-slate-500 leading-relaxed">Study the original Arabic Matn with synchronized English translations and rich formatting.</p>
                 </div>
              </div>
              
              <div className="flex gap-5">
                 <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                    <GraduationCap size={24} />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-emerald-950 mb-2">Test Your Understanding</h3>
                    <p className="text-slate-500 leading-relaxed">Interactive quizzes at the end of every chapter to ensure you've mastered the concepts.</p>
                 </div>
              </div>

              <div className="flex gap-5">
                 <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
                    <Sparkles size={24} />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-emerald-950 mb-2">AI Research Assistant</h3>
                    <p className="text-slate-500 leading-relaxed">Stuck on a concept? Ask IlmOS to explain "Taghut" or "Ihsan" instantly.</p>
                 </div>
              </div>
           </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-emerald-900 rounded flex items-center justify-center text-white text-[10px] font-bold">I</div>
             <span className="font-serif font-bold text-emerald-950">IlmOS Platform</span>
           </div>
           <p className="text-slate-400 text-sm">© 2025 IlmOS. Built for the Ummah.</p>
        </div>
      </footer>

    </div>
  );
}