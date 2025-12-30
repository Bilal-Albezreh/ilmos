"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ArrowLeft, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call for 2 seconds
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-andalusian animate-pattern flex items-center justify-center p-4 font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 relative">
      
      {/* Back to Home Button (Top Left) */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 p-2 text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-all flex items-center gap-2 z-20"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-medium hidden sm:inline">Back to Home</span>
      </Link>

      {/* Main Auth Card */}
      <div className="w-full max-w-md bg-[#FFFCF5] border border-[#E8E1D0] rounded-3xl shadow-2xl relative overflow-hidden">
        
        {/* Decorative Top Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-600"></div>
        
        {/* Subtle Background Blurs for Atmosphere */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-2xl opacity-60"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-50 rounded-full blur-2xl opacity-60"></div>

        <div className="relative z-10 p-8 md:p-10">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-900 text-white rounded-xl mb-4 shadow-lg shadow-emerald-900/20 rotate-3">
               <BookOpen size={24} />
            </div>
            <h1 className="text-3xl font-serif text-emerald-950 mb-2">
              {isLogin ? "Welcome Back" : "Join the Halaqah"}
            </h1>
            <p className="text-slate-500 text-sm">
              {isLogin 
                ? "Continue your journey through the classical texts." 
                : "Begin your path to mastering Islamic knowledge."}
            </p>
          </div>

          {/* Toggle Switch (Login vs Signup) */}
          <div className="flex p-1 bg-slate-100/80 rounded-xl mb-8 border border-slate-200">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${isLogin ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${!isLogin ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name Input (Only for Sign Up) */}
            {!isLogin && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-3 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="e.g. Bilal Ibn Rabah"
                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm"
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
               <div className="flex justify-between items-center ml-1">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                 {isLogin && <a href="#" className="text-[10px] font-bold text-emerald-700 hover:underline">Forgot?</a>}
               </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-emerald-900 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"} <ArrowRight size={18} />
                </>
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <span className="relative px-4 bg-[#FFFCF5] text-xs text-slate-400 font-medium uppercase tracking-widest">Or continue with</span>
          </div>

          {/* Social Auth (Google) */}
          <button className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-2.5 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
             <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
             </svg>
             Google
          </button>

        </div>
      </div>

    </div>
  );
}