import React, { useState } from "react";
import { LogIn, Key, Mail, ShieldAlert, Sparkles, ArrowRight } from "lucide-react";

interface AuthScreenProps {
  onLoginSuccess: (email: string) => void;
}

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(email);
    }, 800);
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess("umarpatelog@gmail.com");
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background radial soft glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-950/40 backdrop-blur-xl border border-slate-800/80 p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 shadow-lg shadow-violet-900/30 mb-4 animate-pulse">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-violet-200 via-indigo-100 to-slate-200 bg-clip-text text-transparent">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            {isLogin
              ? "Access the ultimate AI discovery and automation platform"
              : "Unlock full tutorials, voice recognition & simulation logs"}
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-950/30 border border-red-900/40 text-red-300 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                  <span className="text-xs">👤</span>
                </span>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all duration-200"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Password
              </label>
              {isLogin && (
                <a href="#forgot" className="text-[11px] text-violet-400 hover:text-violet-300 transition-colors">
                  Forgot Password?
                </a>
              )}
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                <Key className="w-4 h-4" />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all duration-200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl py-2.5 font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-violet-900/20 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{isLogin ? "Sign In" : "Sign Up"}</span>
                <LogIn className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-950 px-3 text-slate-500">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-slate-200 hover:text-white rounded-xl py-2.5 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
        >
          <svg className="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-xs text-slate-500 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
          >
            {isLogin ? "Sign Up Free" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
