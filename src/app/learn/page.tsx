"use client";

import { useState, useRef, useEffect } from "react";
import { 
  BookOpen, ChevronLeft, ChevronRight, PlayCircle, Menu, 
  Sparkles, BookMarked, Send, User, Bot, FileText, Download, X, Lightbulb 
} from "lucide-react";
import bookData from "../../data/usool.json"; 

type Section = {
  id: string;
  arabic: string;
  english: string;
  videoId: string;
  takeaways: string[];
};

type Message = {
  role: 'user' | 'ai';
  content: string;
};

export default function ReaderPage() {
  const [showTranslation, setShowTranslation] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showTakeaways, setShowTakeaways] = useState(false); // New state for popup
  
  // BOOK NAVIGATION STATE
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  // CHAT STATE
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Assalamu Alaykum. I am IlmOS. I have read the full text of 'The Three Fundamental Principles'. Ask me anything!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const currentChapter = bookData.chapters[currentChapterIndex];
  const section: Section = currentChapter.sections[currentSectionIndex];

  // LOGIC: Navigation
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

  // LOGIC: Chat
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse: Message = { 
        role: 'ai', 
        content: "This is a simulated response. You asked about: " + userMessage.content 
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="h-screen bg-andalusian animate-pattern flex flex-col overflow-hidden selection:bg-emerald-100 selection:text-emerald-900 font-sans text-slate-900">
      
      {/* HEADER */}
      <header className="h-16 border-b border-emerald-100/50 bg-white/90 backdrop-blur-md flex items-center justify-between px-6 shadow-sm z-50 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-emerald-800 hover:bg-emerald-50 rounded-lg transition-all">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-600 rounded-lg rotate-45 opacity-80"></div>
              <div className="absolute inset-0 bg-emerald-800 rounded-lg -rotate-12 opacity-80"></div>
              <BookOpen size={16} className="relative text-white z-10" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-emerald-950 tracking-tight leading-none font-serif">{bookData.bookTitle}</h1>
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5 uppercase tracking-widest">Al-Usool Al-Thalatha</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 bg-emerald-50/50 p-1 rounded-full border border-emerald-100">
          <button 
            onClick={() => setShowTranslation(!showTranslation)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${showTranslation ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100' : 'text-emerald-600 hover:text-emerald-800'}`}
          >
            English
          </button>
          <button 
             onClick={() => setShowTranslation(!showTranslation)}
             className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${!showTranslation ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100' : 'text-emerald-600 hover:text-emerald-800'}`}
          >
            عربي
          </button>
        </div>
      </header>

      <div className="flex-1 flex w-full overflow-hidden relative">
        
        {/* SIDEBAR */}
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
              
              {/* THE MANUSCRIPT CARD (Full Height/Maximized) */}
              <div className="relative group perspective-1000 min-h-[85vh]"> {/* Added min-h-[85vh] to stretch it */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-100 to-amber-100 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                
                <div className="h-full bg-[#FFFCF5] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#E8E1D0] p-8 md:p-14 flex flex-col justify-center relative overflow-hidden transition-all duration-500">
                  
                  {/* Decorative Borders */}
                  <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-emerald-900/10 rounded-tl-2xl"></div>
                  <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-emerald-900/10 rounded-tr-2xl"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-emerald-900/10 rounded-bl-2xl"></div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-emerald-900/10 rounded-br-2xl"></div>

                  <div className="flex flex-col gap-10 text-center relative z-10 my-auto">
                    
                    {/* Arabic Text */}
                    <div className="relative">
                      <span className="text-6xl text-emerald-100/50 absolute -top-8 left-1/2 -translate-x-1/2 font-serif select-none">﴾ ﴿</span>
                      <p className="text-3xl md:text-5xl lg:text-5xl leading-[2.4] text-emerald-950 font-[var(--font-amiri)] drop-shadow-sm whitespace-pre-line" dir="rtl">
  {section.arabic}
</p>
                    </div>
                    
                    {/* Divider */}
                    {showTranslation && (
                      <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto opacity-50" />
                    )}

                    {/* English Text */}
                    {showTranslation && (
                      <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
                        <p className="text-lg md:text-xl leading-relaxed text-slate-700 font-[var(--font-playfair)] whitespace-pre-line">
  {section.english}
</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* FLOATING CONTROL DOCK (Replaces static buttons) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
             <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-emerald-100/50 p-2 rounded-full shadow-2xl shadow-emerald-900/10 ring-1 ring-white/50">
                
                {/* Prev Button */}
                <button 
                   onClick={handlePrev}
                   disabled={currentChapterIndex === 0 && currentSectionIndex === 0}
                   className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-50 transition disabled:opacity-50"
                   title="Previous Page"
                >
                   <ChevronLeft size={20} />
                </button>

                {/* Chapter Info (Click to see syllabus maybe later) */}
                <div className="hidden sm:flex flex-col items-center px-4 w-40">
                   <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest truncate max-w-full">
                     {currentChapter.title}
                   </span>
                   <span className="text-[10px] text-slate-400">
                     {currentSectionIndex + 1} / {currentChapter.sections.length}
                   </span>
                </div>

                {/* Takeaways Toggle */}
                <button 
                   onClick={() => setShowTakeaways(true)}
                   className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-100 transition"
                   title="Key Takeaways"
                >
                   <Lightbulb size={20} className={showTakeaways ? "fill-amber-400 text-amber-500" : ""} />
                </button>

                {/* Next Button */}
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

          {/* TAKEAWAYS POPUP MODAL */}
          {showTakeaways && (
            <div className="absolute inset-0 z-[60] flex items-center justify-center p-4 bg-emerald-900/20 backdrop-blur-sm animate-in fade-in duration-200">
               <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-emerald-100 relative overflow-hidden animate-in zoom-in-95 duration-200">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-amber-400"></div>
                  
                  {/* Close Button */}
                  <button 
                    onClick={() => setShowTakeaways(false)}
                    className="absolute top-3 right-3 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
                  >
                    <X size={20} />
                  </button>

                  <div className="p-6">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                           <Sparkles size={20} />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-emerald-950">Key Takeaways</h3>
                     </div>
                     
                     <div className="space-y-3">
                        {section.takeaways.map((point, i) => (
                          <div key={i} className="flex gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                             <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></div>
                             <span className="leading-relaxed">{point}</span>
                          </div>
                        ))}
                     </div>
                  </div>
                  
                  <div className="bg-slate-50 p-3 text-center border-t border-slate-100">
                     <button 
                        onClick={() => setShowTakeaways(false)}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
                     >
                        Close Panel
                     </button>
                  </div>
               </div>
            </div>
          )}

        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="w-80 bg-white/80 backdrop-blur-md border-l border-emerald-100 hidden xl:flex flex-col shrink-0 z-40">
           <div className="flex-1 flex flex-col h-full overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                 <div className="group">
                    <h3 className="text-xs font-bold text-emerald-800/50 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <PlayCircle size={14} /> Explanation
                    </h3>
                    <div className="aspect-video w-full bg-emerald-900 rounded-xl overflow-hidden shadow-lg relative cursor-pointer ring-1 ring-emerald-900/10 group-hover:ring-emerald-500/50 transition-all">
                       {section.videoId ? (
                         <iframe 
                           width="100%" 
                           height="100%" 
                           src={`https://www.youtube.com/embed/${section.videoId}`} 
                           className="border-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                         />
                       ) : (
                         <div className="w-full h-full flex flex-col items-center justify-center text-emerald-100/30 gap-2">
                            <Bot size={24} />
                            <span className="text-xs">Video Coming Soon</span>
                         </div>
                       )}
                    </div>
                 </div>

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
              
              <div className="h-[40%] border-t border-emerald-50 bg-gradient-to-b from-white to-emerald-50/30 flex flex-col">
                 <div className="px-4 py-3 border-b border-emerald-50 flex justify-between items-center bg-white/50 backdrop-blur-sm">
                    <h3 className="text-xs font-bold text-emerald-800/50 uppercase tracking-widest flex items-center gap-2">
                       <Sparkles size={14} className="text-amber-500" /> Ask IlmOS
                    </h3>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">BETA</span>
                 </div>

                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border 
                          ${msg.role === 'user' ? 'bg-white border-slate-200' : 'bg-emerald-700 border-emerald-800 text-white'}`}>
                          {msg.role === 'user' ? <User size={14} className="text-slate-400" /> : <Bot size={14} />}
                        </div>
                        <div className={`text-xs p-3 rounded-2xl max-w-[85%] leading-relaxed shadow-sm
                          ${msg.role === 'user' ? 'bg-white text-slate-700 border border-slate-200 rounded-tr-sm' : 'bg-emerald-700 text-white rounded-tl-sm'}`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-emerald-700 text-white rounded-full flex items-center justify-center shrink-0"><Bot size={14} /></div>
                        <div className="text-xs p-3 rounded-2xl bg-emerald-700 text-white/80 rounded-tl-sm flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"/>
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-75"/>
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-150"/>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                 </div>

                 <div className="p-3 bg-white border-t border-emerald-50">
                    <form onSubmit={handleSendMessage} className="relative group">
                       <input 
                         type="text" 
                         value={input}
                         onChange={(e) => setInput(e.target.value)}
                         placeholder="Ask about this text..."
                         className="w-full text-xs pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-inner group-hover:bg-white"
                       />
                       <button 
                         type="submit"
                         disabled={!input.trim() || isLoading}
                         className="absolute right-2 top-2 p-1.5 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
                       >
                         <Send size={14} />
                       </button>
                    </form>
                 </div>
              </div>
           </div>
        </aside>

      </div>
    </div>
  );
}