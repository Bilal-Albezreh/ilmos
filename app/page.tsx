"use client";

import { useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import bookData from "../data/usool.json"; 

type Section = {
  id: string;
  arabic: string;
  english: string;
  videoId: string;
  takeaways: string[];
};

export default function ReaderPage() {
  const [showTranslation, setShowTranslation] = useState(true);
  
  // STATE: Track which section we are currently reading (Start at 0)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  // Load the current data based on the index
  const currentChapter = bookData.chapters[0];
  const section: Section = currentChapter.sections[currentSectionIndex];

  // LOGIC: Handle Next/Prev clicks
  const handleNext = () => {
    if (currentSectionIndex < currentChapter.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const isFirstPage = currentSectionIndex === 0;
  const isLastPage = currentSectionIndex === currentChapter.sections.length - 1;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-900">
      
      {/* Header */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm z-10">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <h1 className="font-semibold text-lg tracking-tight">{bookData.bookTitle}</h1>
        </div>
        
        <div className="flex items-center gap-3 bg-gray-100 px-3 py-1.5 rounded-full border">
          <span className="text-xs font-medium text-gray-600">Translation</span>
          <button 
            onClick={() => setShowTranslation(!showTranslation)}
            className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 ${showTranslation ? 'bg-emerald-600' : 'bg-gray-300'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${showTranslation ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: The Text */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-sm border p-8 min-h-[500px] flex flex-col items-center justify-center relative">
            
            {/* Arabic Text */}
            <p className="text-4xl leading-[2.5] text-center font-bold text-slate-800 mb-8" dir="rtl">
              {section.arabic}
            </p>

            {/* English Text */}
            {showTranslation && (
              <div className="w-full border-t pt-8 animate-in fade-in duration-300">
                <p className="text-xl leading-relaxed text-center text-slate-600 font-light">
                  {section.english}
                </p>
              </div>
            )}
            
            {/* Navigation Arrows (NOW FUNCTIONAL) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center text-gray-400 hover:text-gray-600">
              <button 
                onClick={handlePrev}
                disabled={isFirstPage}
                className={`flex items-center gap-1 transition p-2 ${isFirstPage ? 'opacity-30 cursor-not-allowed' : 'hover:text-emerald-600'}`}
              >
                <ChevronLeft size={24} /> <span className="text-sm font-medium">Prev</span>
              </button>
              
              <span className="text-xs text-gray-300 font-mono">
                {currentSectionIndex + 1} / {currentChapter.sections.length}
              </span>

              <button 
                onClick={handleNext}
                disabled={isLastPage}
                className={`flex items-center gap-1 transition p-2 ${isLastPage ? 'opacity-30 cursor-not-allowed' : 'hover:text-emerald-600'}`}
              >
                <span className="text-sm font-medium">Next</span> <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
            <h3 className="text-amber-800 font-semibold mb-2 flex items-center gap-2">
              <span className="bg-amber-200 text-amber-800 text-xs px-2 py-0.5 rounded-full">Memorize</span>
              Key Takeaways
            </h3>
            <ul className="list-disc list-inside space-y-1 text-amber-900/80">
              {section.takeaways.map((point: string, i: number) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          
          <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
            <div className="bg-slate-50 border-b px-4 py-3 flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-semibold text-slate-700">Explanation</span>
            </div>
            {section.videoId ? (
              <div className="aspect-video w-full bg-slate-900">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${section.videoId}`} 
                  title="YouTube video player" 
                  className="border-0"
                />
              </div>
            ) : (
              <div className="aspect-video w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                No Video Available
              </div>
            )}
            <div className="p-4">
              <p className="text-xs text-gray-500">
                Contextual explanation for this specific section.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border p-6 flex-1 shadow-sm min-h-[200px] flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <span className="text-2xl">🤖</span>
            </div>
            <h4 className="font-medium text-gray-900">AI Research Assistant</h4>
            <p className="text-sm text-gray-500 mt-1">Ask questions about this text...</p>
          </div>
        </div>
      </main>
    </div>
  );
}