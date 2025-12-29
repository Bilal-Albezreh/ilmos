import Link from "next/link";
import { BookOpen, Search, Library, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100">
      
      {/* Navbar */}
      <nav className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
              <Library size={18} />
            </div>
            <span>IlmOS</span>
          </div>
          <Link 
            href="/learn" 
            className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition"
          >
            Start Learning
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100 mb-8">
          <Sparkles size={12} />
          <span>v1.0 Beta Now Live</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8">
          Master the Classical <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
            Texts of Islam
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          A modern learning platform that combines structured walkthroughs with 
          AI-powered semantic search. Read, listen, and understand.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/learn" 
            className="h-12 px-8 rounded-full bg-emerald-600 text-white font-semibold flex items-center gap-2 hover:bg-emerald-700 transition shadow-lg shadow-emerald-200"
          >
            <BookOpen size={20} />
            Start Reading
          </Link>
          <button className="h-12 px-8 rounded-full bg-white text-slate-700 font-semibold border hover:bg-gray-50 transition flex items-center gap-2">
            <Search size={20} />
            Try Semantic Search
          </button>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-slate-50 border-t">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Structured Courses</h3>
            <p className="text-slate-500 leading-relaxed">
              Follow a linear curriculum designed for students, with progress tracking and quizzes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
              <Search size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Semantic Search</h3>
            <p className="text-slate-500 leading-relaxed">
              Ask complex questions and get answers directly from trusted classical sources.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6">
              <Library size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Scholar Context</h3>
            <p className="text-slate-500 leading-relaxed">
              Every text is paired with video explanations from reputable scholars.
            </p>
          </div>
        </div>
      </section>
      
       {/* Footer */}
      <footer className="py-12 border-t text-center text-slate-400 text-sm">
        <p>© 2025 IlmOS Platform. Built for the Ummah.</p>
      </footer>
    </div>
  );
}