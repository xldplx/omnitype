import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Fingerprint, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulate login and persist user profile details
    const defaultProfile = {
      name: name || (email ? email.split('@')[0] : "Explore User"),
      age: 25,
      gender: "Non-Binary",
      memberSince: "May 2026",
      showAge: true,
      showGender: true,
      avatarUrl: ""
    };
    
    localStorage.setItem('omnitype_user_profile', JSON.stringify(defaultProfile));
    
    // Redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafa] flex items-center justify-center pt-24 pb-24 px-6 relative text-slate-800 font-sans selection:bg-indigo-100">
      
      {/* Ambient background gradients */}
      <div className="fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10vh] right-[-10vw] w-[40vw] h-[40vw] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white border border-slate-100 p-8 md:p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative z-10"
      >
        {/* Header/Logo */}
        <div className="flex flex-col items-center text-center mb-8 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100 mb-2">
            <Fingerprint className="w-6 h-6 text-indigo-650" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {isSignUp ? "Create your Stack" : "Access your Stack"}
          </h2>
          <p className="text-slate-500 text-xs font-medium">
            {isSignUp ? "Register to save your psychometric blueprint." : "Sign in to view your verified identity pass."}
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {isSignUp && (
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Preferred Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Mercer"
                  className="w-full bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none rounded-xl pl-4 pr-4 py-3 font-bold text-xs text-slate-800 transition"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Email address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none rounded-xl pl-11 pr-4 py-3 font-bold text-xs text-slate-800 transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Security Key / Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none rounded-xl pl-11 pr-4 py-3 font-bold text-xs text-slate-800 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-950 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs mt-6 cursor-pointer"
          >
            <span>{isSignUp ? "Get Started" : "Authenticate"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="text-center mt-6 pt-6 border-t border-slate-100">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs font-semibold text-indigo-650 hover:underline cursor-pointer"
          >
            {isSignUp ? "Already have a stack? Authenticate here" : "Don't have a profile? Register here"}
          </button>
        </div>

      </motion.div>
    </div>
  );
}
