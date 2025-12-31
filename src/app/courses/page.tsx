"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BookOpen, User, Star, Clock, Trophy, ArrowRight, 
  Lock, CheckCircle2, BarChart3, GraduationCap 
} from "lucide-react";
import bookData from "../../data/usool.json";
import { supabase } from "../../lib/supabaseClient"; // 1. Import Supabase

export default function CoursesDashboard() {
  const [user, setUser] = useState({ name: "Guest Student", id: "guest", email: "" });
  const [stats, setStats] = useState({ progress: 0, completed: 0, avgScore: 0 });

  useEffect(() => {
    const loadDashboardData = async () => {
      // 1. Load User Session
      const localSession = localStorage.getItem("currentUser");
      if (!localSession) return;
      
      const u = JSON.parse(localSession);
      setUser(u);
      
      // 2. Load Reading Progress (from Supabase, fallback to local)
      let percent = 0;
      
      // Try fetching fresh progress from Cloud first
      const { data: cloudProgress } = await supabase
        .from('progress')
        .select('completed_percent')
        .eq('user_id', u.id)
        .eq('course_id', 'usool')
        .single();

      if (cloudProgress) {
        percent = cloudProgress.completed_percent;
      } else {
        // Fallback to local if cloud fails or empty
        const savedProgress = localStorage.getItem(`usool-progress-${u.id}`);
        if (savedProgress) {
           const { chapter, section } = JSON.parse(savedProgress);
           let total = 0;
           bookData.chapters.forEach(c => total += c.sections.length);
           let done = 0;
           for (let i = 0; i < chapter; i++) done += bookData.chapters[i].sections.length;
           done += section + 1;
           percent = Math.round((done / total) * 100);
        }
      }

      // 3. Load Exam Results (REAL DATA)
      const { data: examData } = await supabase
        .from('exam_results')
        .select('score, max_score')
        .eq('user_id', u.id);

      let calculatedAvg = 0;
      let examsTaken = 0;

      if (examData && examData.length > 0) {
        // Calculate average of all exams taken
        const totalPercentage = examData.reduce((acc, curr) => {
           return acc + ((curr.score / curr.max_score) * 100);
        }, 0);
        calculatedAvg = Math.round(totalPercentage / examData.length);
        examsTaken = examData.length;
      }

      setStats({
        progress: percent,
        completed: percent >= 100 ? 1 : 0,
        avgScore: calculatedAvg
      });
    };

    loadDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-andalusian animate-pattern font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-emerald-100/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-emerald-900 rounded-lg flex items-center justify-center text-white"><BookOpen size={16} /></div>
            <span className="font-serif text-lg font-bold text-emerald-950">IlmOS</span>
          </Link>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-sm font-medium text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                <User size={14} /> {user.name}
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT: PROFILE CARD (Sticky) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
               
               {/* Identity Card */}
               <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden text-center">
                  <div className="absolute top-0 left-0 w-full h-32 bg-emerald-900"></div>
                  <div className="absolute top-0 left-0 w-full h-32 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
                  
                  <div className="relative z-10">
                    <div className="w-24 h-24 bg-white p-1 rounded-full mx-auto mb-4 shadow-lg">
                       <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-3xl font-serif font-bold">
                          {user.name.charAt(0).toUpperCase()}
                       </div>
                    </div>
                    <h2 className="text-xl font-bold text-emerald-950">{user.name}</h2>
                    <p className="text-sm text-slate-500 mb-6">Student of Knowledge</p>
                    
                    <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-6">
                       <div>
                          <p className="text-emerald-600 font-bold text-xl">{stats.completed}</p>
                          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Courses</p>
                       </div>
                       <div>
                          <p className="text-amber-500 font-bold text-xl">{stats.avgScore}%</p>
                          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Avg Score</p>
                       </div>
                       <div>
                          <p className="text-blue-500 font-bold text-xl">1</p>
                          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Rank</p>
                       </div>
                    </div>
                  </div>
               </div>

               {/* Achievement Badges */}
               <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                     <Trophy size={16} className="text-amber-500" /> Badges
                  </h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                     <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center shrink-0 transition-all ${stats.avgScore >= 70 ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100 grayscale opacity-50'}`} title="Passed Exam">
                        <Star size={24} className={stats.avgScore >= 70 ? 'text-emerald-500' : 'text-slate-300'} />
                     </div>
                     <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center shrink-0 transition-all ${stats.progress >= 100 ? 'bg-amber-50 border-amber-100' : 'bg-slate-50 border-slate-100 grayscale opacity-50'}`} title="Reader">
                        <Trophy size={24} className={stats.progress >= 100 ? 'text-amber-500' : 'text-slate-300'} />
                     </div>
                     <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 grayscale opacity-50" title="Locked">
                        <GraduationCap size={24} className="text-blue-300" />
                     </div>
                  </div>
               </div>

            </div>
          </div>

          {/* RIGHT: COURSE LIST */}
          <div className="lg:col-span-8 space-y-8">
             <div className="flex items-end justify-between">
               <h1 className="text-3xl font-serif text-emerald-950">My Curriculum</h1>
               <p className="text-slate-500 text-sm">Academic Year 1446 AH</p>
             </div>

             {/* COURSE 1: USOOL (Active) */}
             <div className="group bg-white border border-emerald-100 rounded-3xl p-6 md:p-8 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                   <BookOpen size={100} className="text-emerald-800" />
                </div>
                
                <div className="relative z-10">
                   <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-widest">
                         Aqeedah • Level 1
                      </span>
                      {stats.completed === 1 && <CheckCircle2 className="text-emerald-500" />}
                   </div>
                   
                   <h3 className="text-2xl font-serif text-emerald-950 mb-2">The Three Fundamental Principles</h3>
                   <p className="text-slate-500 mb-8 max-w-md">Master the three questions of the grave through the classic text of Imam Muhammad ibn Abd al-Wahhab.</p>

                   <div className="flex items-center gap-4">
                      <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                         <div className="bg-emerald-500 h-full rounded-full" style={{width: `${stats.progress}%`}}></div>
                      </div>
                      <span className="text-xs font-bold text-emerald-700">{stats.progress}%</span>
                   </div>

                   <div className="mt-8 flex gap-4">
                      <Link 
                        href="/courses/usool" 
                        className="px-6 py-3 rounded-xl bg-emerald-900 text-white font-bold text-sm hover:bg-emerald-800 transition flex items-center gap-2"
                      >
                        {stats.progress > 0 ? "Continue" : "Start Course"} <ArrowRight size={16} />
                      </Link>
                      <Link 
                        href="/quiz/usool"
                        className="px-6 py-3 rounded-xl border border-emerald-200 text-emerald-900 font-bold text-sm hover:bg-emerald-50 transition flex items-center gap-2"
                      >
                         {stats.avgScore > 0 ? "Retake Exam" : "Take Exam"}
                      </Link>
                   </div>
                </div>
             </div>

             {/* LOCKED COURSES */}
             <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 opacity-70 grayscale relative overflow-hidden">
                   <div className="absolute inset-0 flex items-center justify-center z-20 bg-white/50 backdrop-blur-[2px]">
                      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                         <Lock size={12} /> Coming Soon
                      </div>
                   </div>
                   <h3 className="text-xl font-serif text-slate-800 mb-2">40 Hadith of Nawawi</h3>
                   <p className="text-xs text-slate-500">Prophetic Guidance</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 opacity-70 grayscale relative overflow-hidden">
                   <div className="absolute inset-0 flex items-center justify-center z-20 bg-white/50 backdrop-blur-[2px]">
                      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                         <Lock size={12} /> Coming Soon
                      </div>
                   </div>
                   <h3 className="text-xl font-serif text-slate-800 mb-2">Book of Monotheism</h3>
                   <p className="text-xs text-slate-500">Advanced Aqeedah</p>
                </div>
             </div>

          </div>
        </div>
      </main>
    </div>
  );
}