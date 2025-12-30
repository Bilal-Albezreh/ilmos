"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import Router
import Link from "next/link";
import { BookOpen, ArrowLeft, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter(); // Hook to move pages
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // SIMULATE BACKEND AUTHENTICATION
    setTimeout(() => {
      // 1. Generate a fake User ID based on email
      const userId = email.split('@')[0] || "guest";
      const userName = name || userId;

      // 2. Save "Session" to Local Storage (In a real app, this would be a secure Cookie)
      localStorage.setItem("currentUser", JSON.stringify({ 
        id: userId, 
        name: userName,
        email: email 
      }));

      setIsLoading(false);
      
      // 3. Redirect to Home
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-andalusian animate-pattern flex items-center justify-center p-4 font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 relative">
      <Link href="/" className="absolute top-6 left-6 p-2 text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-all flex items-center gap-2 z-20">
        <ArrowLeft size={20} /> <span className="text-sm font-medium hidden sm:inline">Back to Home</span>
      </Link>

      <div className="w-full max-w-md bg-[#FFFCF5] border border-[#E8E1D0] rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-600"></div>
        
        <div className="relative z-10 p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-900 text-white rounded-xl mb-4 shadow-lg shadow-emerald-900/20 rotate-3">
               <BookOpen size={24} />
            </div>
            <h1 className="text-3xl font-serif text-emerald-950 mb-2">{isLogin ? "Welcome Back" : "Join the Halaqah"}</h1>
          </div>

          <div className="flex p-1 bg-slate-100/80 rounded-xl mb-8 border border-slate-200">
            <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${isLogin ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Sign In</button>
            <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${!isLogin ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Sign Up</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-3 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                  <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Bilal Ibn Rabah" className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm" />
                </div>
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                <input required type="password" placeholder="••••••••" className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm" />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-emerald-900 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70">
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <>{isLogin ? "Sign In" : "Create Account"} <ArrowRight size={18} /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}