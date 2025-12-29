"use client";

import { useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight, PlayCircle, Menu, Sparkles, BookMarked } from "lucide-react";
import bookData from "../../data/usool.json"; 

// Helper type for our data
type Section = {
  id: string;
  arabic: string;
  english: string;
  videoId: string;
  takeaways: string[];
};

export default function ReaderPage() {
  const [showTranslation, setShowTranslation] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const currentChapter = bookData.chapters[currentChapterIndex];
  const section: Section = currentChapter.sections[currentSectionIndex];

  // Navigation Logic
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
    // MAIN CONTAINER: Uses a subtle slate background
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* HEADER: Glassmorphism effect */}
      <header className="h-16 border-b border-slate-200/60 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 shadow-sm z-50 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-lg flex items-center justify-center shadow-emerald-200 shadow-lg">
              <BookOpen size={16} />
            </div>
            <div>
              <h1 className="font-bold text-sm text-slate-800 tracking-tight leading-none">{bookData.bookTitle}</h1>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5 uppercase tracking-wider">Interactive Reader</p>
            </div>
          </div>
        </div>
        
        {/* Modern Toggle */}
        <div className="flex items-center gap-3 bg-slate-100/50 p-1 rounded-full border border-slate-200">
          <button 
            onClick={() => setShowTranslation(!showTranslation)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${showTranslation ? 'bg-white text-emerald-700 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-700'}`}
          >
            English
          </button>
          <button 
             onClick={() => setShowTranslation(!showTranslation)}
             className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${!showTranslation ? 'bg-white text-emerald-700 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Arabic Only
          </button>
        </div>
      </header>

      {/* CONTENT AREA */}
      <div className="flex-1 flex w-full overflow-hidden">
        
        {/* SIDEBAR: Clean typography and spacing */}
        <aside className={`${isSidebarOpen ? 'w-72 translate-x-0 opacity-100' : 'w-0 -translate-x-full opacity-0'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col shrink-0`}>
          <div className="p-6">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Table of Contents</h2>
            <div className="space-y-1">
              {bookData.chapters.map((chapter, idx) => (
                <button
                  key={chapter.id}
                  onClick={() => {
                    setCurrentChapterIndex(idx);
                    setCurrentSectionIndex(0);
                  }}
                  className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-200 flex items-center gap-3 group
                    ${idx === currentChapterIndex 
                      ? 'bg-emerald-50/80 text-emerald-800 font-semibold' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentChapterIndex ? 'bg-emerald-500' : 'bg-slate-300 group-hover:bg-slate-400'}`} />
                  <span className="truncate font-sans">{chapter.title}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN READER: The "Premium Paper" Look */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#F5F7F6] relative">
          
          {/* Progress Bar (Top) */}
          <div className="h-1 w-full bg-slate-200">
             <div 
                className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                style={{ width: `${((currentSectionIndex + 1) / currentChapter.sections.length) * 100}%` }} 
             />
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth">
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
              
              {/* THE BOOK CARD */}
              <div className="bg-[#FEFCF8] rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 md:p-16 min-h-[60vh] flex flex-col justify-center relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500/10 via-emerald-500/20 to-emerald-500/10" />

                <div className="flex flex-col gap-10 text-center relative z-10">
                  {/* Arabic Text */}
                  <p className="text-4xl md:text-5xl lg:text-6xl leading-[2.2] text-slate-800 font-[var(--font-amiri)]" dir="rtl">
                    {section.arabic}
                  </p>

                  {/* English Text */}
                  {showTranslation && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                       <div className="w-16 h-px bg-emerald-200 mx-auto mb-8" />
                       <p className="text-xl md:text-2xl leading-relaxed text-slate-600 font-[var(--font-playfair)] italic">
                        "{section.english}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* CONTROLS AREA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                
                {/* Navigation Buttons */}
                <div className="flex items-center gap-3">
                    <button 
                      onClick={handlePrev}
                      disabled={currentChapterIndex === 0 && currentSectionIndex === 0}
                      className="h-12 w-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div className="flex-1 text-center">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Section {currentSectionIndex + 1} of {currentChapter.sections.length}</span>
                    </div>
                    <button 
                      onClick={handleNext}
                      disabled={currentChapterIndex === bookData.chapters.length - 1 && currentSectionIndex === currentChapter.sections.length - 1}
                      className="h-12 w-12 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={20} />
                    </button>
                </div>

                {/* Takeaways Card */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 flex flex-col justify-center">
                   <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Key Takeaways</span>
                   </div>
                   <div className="flex flex-wrap gap-2">
                      {section.takeaways.map((point, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-1 rounded-md bg-amber-50 text-amber-900 text-sm font-medium border border-amber-100">
                          {point}
                        </span>
                      ))}
                   </div>
                </div>

              </div>

            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR: Tools */}
        <aside className="w-80 bg-white border-l border-slate-200 hidden xl:flex flex-col shrink-0">
           <div className="p-6 space-y-8">
              
              {/* Context Widget */}
              <div>
                 <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <BookMarked size={14} /> Context
                 </h3>
                 <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed">
                    This section establishes the foundational definition of <strong>Ilm (Knowledge)</strong> as the precursor to all action.
                 </div>
              </div>

              {/* Video Widget */}
              <div>
                 <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <PlayCircle size={14} /> Explanation
                 </h3>
                 <div className="aspect-video w-full bg-slate-900 rounded-xl overflow-hidden shadow-lg relative group cursor-pointer">
                    {section.videoId ? (
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://www.youtube.com/embed/${section.videoId}`} 
                        className="border-0 opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">No Video</div>
                    )}
                 </div>
              </div>
              
              {/* Chat Widget */}
              <div className="flex-1 flex flex-col min-h-[200px]">
                 <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span>🤖</span> AI Assistant
                 </h3>
                 <div className="flex-1 bg-gradient-to-b from-slate-50 to-white border border-slate-200 rounded-xl p-4 flex flex-col relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="flex-1 flex flex-col items-center justify-center text-center z-10">
                       <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 text-lg border border-slate-100">👋</div>
                       <p className="text-xs text-slate-500 font-medium">Ask about the definition of "Rabb"</p>
                    </div>
                    <div className="mt-4 z-10">
                       <input 
                         type="text" 
                         placeholder="Ask a question..."
                         className="w-full text-sm px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                       />
                    </div>
                 </div>
              </div>

           </div>
        </aside>

      </div>
    </div>
  );
}