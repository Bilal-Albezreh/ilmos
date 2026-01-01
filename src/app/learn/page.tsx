"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  BookOpen, ChevronLeft, ChevronRight, PlayCircle, Menu, 
  Sparkles, BookMarked, FileText, Download, RotateCcw, Plus, Minus, GraduationCap 
} from "lucide-react";
import bookData from "../../data/usool.json"; 
import { supabase } from "../../lib/supabaseClient";

// TYPE DEFINITIONS
type Section = {
  id: string;
  arabic: string;
  english: string;
  videoId?: string;
  videoIdEnglish?: string;
  videoIdArabic?: string;
  takeaways: string[];
};

export default function ReaderPage() {
  const [showTranslation, setShowTranslation] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // BOOK NAVIGATION STATE
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  // MEMORIZATION STATE
  const [repetitionCount, setRepetitionCount] = useState(0);

  // USER STATE
  const [userId, setUserId] = useState<string | null>(null);

  const currentChapter = bookData.chapters[currentChapterIndex];
  const section = currentChapter.sections[currentSectionIndex] as Section;

  // LOGIC: Split text by new lines for interleaved display
  // We filter out empty lines to prevent weird spacing
  const arabicLines = section.arabic.split('\n').filter(line => line.trim() !== '');
  const englishLines = section.english.split('\n').filter(line => line.trim() !== '');

  // Reset repetition count when section changes
  useEffect(() => {
    setRepetitionCount(0);
  }, [currentSectionIndex, currentChapterIndex]);

  // LOGIC: Video Toggle
  const currentVideoId = showTranslation 
    ? (section.videoIdEnglish || section.videoId)
    : (section.videoIdArabic || section.videoId);

  // --- CLOUD SYNC LOGIC ---
  useEffect(() => {
    const fetchProgress = async () => {
      const localSession = localStorage.getItem("currentUser");
      const uid = localSession ? JSON.parse(localSession).id : null;
      setUserId(uid);

      if (uid) {
        const { data, error } = await supabase
          .from('progress')
          .select('*')
          .eq('user_id', uid)
          .eq('course_id', 'usool')
          .single();

        if (data && !error) {
          if (data.current_chapter < bookData.chapters.length) {
            setCurrentChapterIndex(data.current_chapter);
            setCurrentSectionIndex(data.current_section);
          }
        }
      }
    };
    fetchProgress();
  }, []);

  useEffect(() => {
    const saveProgress = async () => {
      if (!userId) return;

      let totalSections = 0;
      bookData.chapters.forEach(c => totalSections += c.sections.length);

      let completedCount = 0;
      for (let i = 0; i < currentChapterIndex; i++) {
        completedCount += bookData.chapters[i].sections.length;
      }
      completedCount += currentSectionIndex + 1;
      
      const percent = Math.round((completedCount / totalSections) * 100);

      await supabase
        .from('progress')
        .upsert({
            user_id: userId,
            course_id: 'usool',
            current_chapter: currentChapterIndex,
            current_section: currentSectionIndex,
            completed_percent: percent,
            last_updated: new Date().toISOString()
        }, { onConflict: 'user_id, course_id' });
        
      localStorage.setItem(`usool-progress-${userId}`, JSON.stringify({
        chapter: currentChapterIndex, 
        section: currentSectionIndex 
      }));
    };

    const timeoutId = setTimeout(saveProgress, 1000);
    return () => clearTimeout(timeoutId);
  }, [currentChapterIndex, currentSectionIndex, userId]);


  // --- NAVIGATION LOGIC ---
  const handleNext = () => {
    if (currentSectionIndex < currentChapter.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    } else if (currentChapterIndex < bookData.chapters.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
      setCurrentSectionIndex(0); 
    }
  };

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    } else if (currentChapterIndex > 0) {
      const prevChapterIndex = currentChapterIndex - 1;
      setCurrentChapterIndex(prevChapterIndex);
      setCurrentSectionIndex(bookData.chapters[prevChapterIndex].sections.length - 1);
    }
  };

  return (
    <div className="h-screen bg-andalusian animate-pattern flex flex-col overflow-hidden selection:bg-emerald-100 selection:text-emerald-900 font-sans text-slate-900">
      
      {/* HEADER */}
      <header className="h-16 border-b border-emerald-100/50 bg-white/90 backdrop-blur-md flex items-center justify-between px-6 shadow-sm z-50 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-emerald-800 hover:bg-emerald-50 rounded-lg transition-all">
            <Menu size={20} />
          </button>
          
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-600 rounded-lg rotate-45 opacity-80"></div>
              <div className="absolute inset-0 bg-emerald-800 rounded-lg -rotate-12 opacity-80"></div>
              <BookOpen size={16} className="relative text-white z-10" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-emerald-950 tracking-tight leading-none font-serif">{bookData.bookTitle}</h1>
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5 uppercase tracking-widest">Al-Usool Al-Thalatha</p>
            </div>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
            {userId && (
               <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-emerald-100">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                 Cloud Sync Active
               </div>
            )}

            <Link 
              href="/quiz/usool" 
              className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-emerald-900 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-emerald-800 shadow-md transition-all"
            >
              <GraduationCap size={14} /> Start Exam
            </Link>

            <div className="flex items-center gap-1 bg-emerald-50/50 p-1 rounded-full border border-emerald-100">
              <button 
                onClick={() => setShowTranslation(true)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${showTranslation ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100' : 'text-emerald-600 hover:text-emerald-800'}`}
              >
                English
              </button>
              <button 
                onClick={() => setShowTranslation(false)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${!showTranslation ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100' : 'text-emerald-600 hover:text-emerald-800'}`}
              >
                عربي
              </button>
            </div>
        </div>
      </header>

      <div className="flex-1 flex w-full overflow-hidden relative">
        
        {/* LEFT SIDEBAR (Table of Contents) */}
        <aside className={`${isSidebarOpen ? 'w-72 translate-x-0 opacity-100' : 'w-0 -translate-x-full opacity-0'} bg-white/95 backdrop-blur-sm border-r border-emerald-100 transition-all duration-500 flex flex-col shrink-0 z-40`}>
          <div className="p-6 border-b border-emerald-50">
            <h2 className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              Table of Contents
            </h2>
            <p className="text-[10px] text-emerald-600/60 pl-3.5">28 Sections • 8 Chapters</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {bookData.chapters.map((chapter, idx) => (
              <button
                key={chapter.id}
                onClick={() => {
                  setCurrentChapterIndex(idx);
                  setCurrentSectionIndex(0);
                }}
                className={`w-full text-left px-3 py-3 text-sm rounded-lg transition-all duration-300 flex items-start gap-3 group relative overflow-hidden
                  ${idx === currentChapterIndex 
                    ? 'bg-emerald-50 text-emerald-900 font-semibold shadow-inner' 
                    : 'text-slate-600 hover:bg-emerald-50/50 hover:text-emerald-800'}`}
              >
                {idx === currentChapterIndex && <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600" />}
                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${idx === currentChapterIndex ? 'bg-emerald-600' : 'bg-slate-300 group-hover:bg-emerald-400'}`} />
                <span className="font-serif leading-relaxed z-10 relative">{chapter.title}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN READER AREA */}
        <main className="flex-1 flex flex-col min-w-0 relative z-0">
          
          {/* Progress Line */}
          <div className="h-1 w-full bg-emerald-50/50">
             <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                style={{ width: `${((currentSectionIndex + 1) / currentChapter.sections.length) * 100}%` }} 
             />
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth pb-32">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
              
              {/* THE MANUSCRIPT CARD */}
              <div className="relative group perspective-1000 min-h-[85vh]">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-100 to-amber-100 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                
                <div className="h-full bg-[#FFFCF5] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#E8E1D0] p-8 md:p-14 flex flex-col justify-center relative overflow-hidden transition-all duration-500">
                  
                  {/* Decorative Borders */}
                  <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-emerald-900/10 rounded-tl-2xl"></div>
                  <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-emerald-900/10 rounded-tr-2xl"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-emerald-900/10 rounded-bl-2xl"></div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-emerald-900/10 rounded-br-2xl"></div>

                  {/* TEXT CONTENT - INTERLEAVED */}
                  <div className="flex flex-col gap-10 text-center relative z-10 my-auto">
                    
                    <div className="relative mb-6">
                      <span className="text-6xl text-emerald-100/50 absolute -top-12 left-1/2 -translate-x-1/2 font-serif select-none">﴾ ﴿</span>
                    </div>

                    {/* MAPPED SECTIONS */}
                    {arabicLines.map((line, index) => (
                      <div key={index} className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                         
                         {/* Arabic Line */}
                         <p className="text-3xl md:text-5xl lg:text-5xl leading-[2.4] text-emerald-950 font-[var(--font-amiri)] drop-shadow-sm" dir="rtl">
                           {line}
                         </p>
                         
                         {/* Matching English Line */}
                         {showTranslation && englishLines[index] && (
                           <>
                             <div className="w-8 h-[1px] bg-amber-400/50 mx-auto" />
                             <p className="text-lg md:text-xl leading-relaxed text-slate-700 font-[var(--font-playfair)]">
                               {englishLines[index]}
                             </p>
                           </>
                         )}
                         
                         {/* Spacer for next block */}
                         {index < arabicLines.length - 1 && <div className="h-8" />}
                      </div>
                    ))}
                    
                    {/* Fallback if English is longer than Arabic (rare) */}
                    {showTranslation && englishLines.length > arabicLines.length && (
                      <div className="mt-4 pt-4 border-t border-emerald-100/50">
                         {englishLines.slice(arabicLines.length).map((line, i) => (
                           <p key={i} className="text-lg md:text-xl leading-relaxed text-slate-700 font-[var(--font-playfair)] mt-4">{line}</p>
                         ))}
                      </div>
                    )}

                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* FLOATING CONTROL DOCK */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
             <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-emerald-100/50 p-2 rounded-full shadow-2xl shadow-emerald-900/10 ring-1 ring-white/50">
                <button 
                   onClick={handlePrev}
                   disabled={currentChapterIndex === 0 && currentSectionIndex === 0}
                   className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-50 transition disabled:opacity-50"
                   title="Previous Page"
                >
                   <ChevronLeft size={20} />
                </button>

                <div className="hidden sm:flex flex-col items-center px-4 w-40">
                   <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest truncate max-w-full">
                     {currentChapter.title}
                   </span>
                   <span className="text-[10px] text-slate-400">
                     {currentSectionIndex + 1} / {currentChapter.sections.length}
                   </span>
                </div>

                <button 
                   onClick={handleNext}
                   disabled={currentChapterIndex === bookData.chapters.length - 1 && currentSectionIndex === currentChapter.sections.length - 1}
                   className="w-12 h-12 rounded-full flex items-center justify-center bg-emerald-900 text-white hover:bg-emerald-800 shadow-lg transition disabled:opacity-50"
                   title="Next Page"
                >
                   <ChevronRight size={24} />
                </button>
             </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR (Resources/Memorization/Takeaways) */}
        <aside className="w-80 bg-white/80 backdrop-blur-md border-l border-emerald-100 hidden xl:flex flex-col shrink-0 z-40">
           <div className="flex-1 flex flex-col h-full overflow-hidden">
              
              {/* SCROLLABLE CONTENT */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                 
                 {/* VIDEO */}
                 <div className="group">
                    <h3 className="text-xs font-bold text-emerald-800/50 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <PlayCircle size={14} /> Explanation
                    </h3>
                    <div className="aspect-video w-full bg-emerald-900 rounded-xl overflow-hidden shadow-lg relative cursor-pointer ring-1 ring-emerald-900/10 group-hover:ring-emerald-500/50 transition-all">
                       {currentVideoId ? (
                         <iframe 
                           width="100%" 
                           height="100%" 
                           src={`https://www.youtube.com/embed/${currentVideoId}`} 
                           className="border-0 w-full h-full"
                           allowFullScreen
                           title="Scholar Explanation"
                         />
                       ) : (
                         <div className="w-full h-full flex flex-col items-center justify-center text-emerald-100/30 gap-2">
                            <span className="text-xs">Video Coming Soon</span>
                         </div>
                       )}
                    </div>
                 </div>

                 {/* KEY TAKEAWAYS */}
                 <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4">
                    <h3 className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <Sparkles size={14} /> Key Takeaways
                    </h3>
                    <div className="space-y-3">
                       {section.takeaways.map((point, i) => (
                         <div key={i} className="flex gap-2.5 text-xs text-slate-700">
                            <div className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 shrink-0"></div>
                            <span className="leading-relaxed">{point}</span>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* CONTEXT */}
                 <div>
                    <h3 className="text-xs font-bold text-emerald-800/50 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <BookMarked size={14} /> Context
                    </h3>
                    <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm text-xs text-slate-600 leading-relaxed font-medium">
                       This section is part of <strong className="text-emerald-700">{currentChapter.title}</strong>. 
                       <div className="h-px w-full bg-slate-100 my-2" />
                       It lays the foundational principles that every student of knowledge must memorize.
                    </div>
                 </div>

                 {/* RESOURCES */}
                 <div>
                    <h3 className="text-xs font-bold text-emerald-800/50 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <FileText size={14} /> Resources
                    </h3>
                    <a 
                      href="/usool-book.pdf" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-emerald-400 hover:shadow-md hover:shadow-emerald-100/50 transition-all cursor-pointer"
                    >
                       <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                          <FileText size={20} />
                       </div>
                       <div className="flex-1">
                          <p className="text-xs font-bold text-slate-700 group-hover:text-emerald-800 transition-colors">Original Manuscript</p>
                          <p className="text-[10px] text-slate-400 group-hover:text-emerald-600/70">PDF Download</p>
                       </div>
                       <Download size={16} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                    </a>
                 </div>
              </div>
              
              {/* MEMORIZATION BOX (Fixed Bottom) */}
              <div className="p-5 border-t border-emerald-50 bg-white/80 backdrop-blur-md">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-widest flex items-center gap-2">
                       <RotateCcw size={14} className="text-emerald-600" /> Memorization
                    </h3>
                    <button 
                       onClick={() => setRepetitionCount(0)}
                       className="text-[10px] text-slate-400 hover:text-red-500 transition-colors"
                    >
                       Reset
                    </button>
                 </div>
                 
                 <div className="bg-slate-50 rounded-2xl p-1 border border-slate-200 flex items-center justify-between">
                    <button 
                       onClick={() => repetitionCount > 0 && setRepetitionCount(c => c - 1)}
                       className="w-12 h-12 flex items-center justify-center rounded-xl bg-white text-slate-400 hover:text-emerald-600 shadow-sm border border-slate-100 hover:border-emerald-200 transition-all active:scale-95"
                    >
                       <Minus size={18} />
                    </button>
                    
                    <div className="flex flex-col items-center">
                       <span className="text-2xl font-bold text-emerald-950 font-mono">{repetitionCount}</span>
                       <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Repetitions</span>
                    </div>

                    <button 
                       onClick={() => setRepetitionCount(c => c + 1)}
                       className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-900 text-white shadow-md hover:bg-emerald-800 transition-all active:scale-95"
                    >
                       <Plus size={18} />
                    </button>
                 </div>
              </div>

           </div>
        </aside>

      </div>
    </div>
  );
}