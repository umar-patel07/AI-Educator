import React, { useState, useEffect } from "react";
import AuthScreen from "./components/AuthScreen";
import Dashboard from "./components/Dashboard";
import ChatWorkspace from "./components/ChatWorkspace";
import Features from "./components/Features";
import About from "./components/About";
import Contact from "./components/Contact";
import { Sparkles, Bot, LogOut, Moon, Sun, Compass, MessageSquare, ListFilter, HelpCircle, Mail, User } from "lucide-react";

type Tab = "dashboard" | "chat" | "features" | "about" | "contact";
type Theme = "dark" | "light";

export default function App() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ai_educator_theme");
      if (saved === "light" || saved === "dark") return saved;
    }
    return "dark";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ai_educator_theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  // Load auth session from localStorage on startup
  useEffect(() => {
    const savedEmail = localStorage.getItem("ai_educator_user_email");
    if (savedEmail) {
      setUserEmail(savedEmail);
    }
  }, []);

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    localStorage.setItem("ai_educator_user_email", email);
    setActiveTab("dashboard"); // Go straight to personalized dashboard landing page
  };

  const handleLogout = () => {
    setUserEmail(null);
    localStorage.removeItem("ai_educator_user_email");
    setActiveTab("dashboard");
  };

  const isLight = theme === "light";

  // If user is not logged in, render the AuthScreen
  if (!userEmail) {
    return (
      <div className={`min-h-screen font-sans flex flex-col justify-between selection:bg-violet-500/30 selection:text-violet-200 ${isLight ? "light-mode bg-slate-100 text-slate-900" : "bg-[#0B0B12] text-slate-100"}`}>
        {/* Top Floating Logo */}
        <header className="px-6 py-4 border-b border-slate-900/60 bg-slate-950/20 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-950/30">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold tracking-tight text-white font-mono text-sm uppercase">
              AI Educator <span className="text-violet-400 font-sans">SaaS</span>
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              title={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
              className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-bold transition-all active:scale-95"
            >
              {isLight ? <Moon className="w-3.5 h-3.5 text-indigo-500" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
              <span>{isLight ? "Dark Mode" : "Light Mode"}</span>
            </button>

            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-widest bg-slate-900/40 px-3 py-1.5 rounded-xl border border-slate-800/40">
              <Moon className="w-3.5 h-3.5 text-violet-400" />
              <span>Secure Sandbox</span>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center">
          <AuthScreen onLoginSuccess={handleLoginSuccess} />
        </main>

        <footer className="py-4 text-center text-[10px] text-slate-600 border-t border-slate-950">
          © 2026 AI Educator Systems. Authored for Google AI Studio Showcase.
        </footer>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans flex flex-col justify-between selection:bg-violet-500/30 selection:text-violet-200 ${isLight ? "light-mode bg-slate-100 text-slate-900" : "bg-[#0B0B12] text-slate-100"}`}>
      
      {/* --- TOP PERSISTENT NAVBAR --- */}
      <header className="px-6 py-3 border-b border-slate-900/80 bg-slate-950/40 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
        
        {/* Logo and product tag */}
        <div className="flex items-center gap-2.5">
          <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-950/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-white font-mono text-xs uppercase">
              AI Educator
            </span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">ALL-IN-ONE WORKSPACE</span>
          </div>
        </div>

        {/* Dynamic Nav Tabs */}
        <nav className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              activeTab === "dashboard"
                ? "bg-slate-900 text-white border border-slate-800/60"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
            }`}
          >
            Dashboard
          </button>
          
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
              activeTab === "chat"
                ? "bg-slate-900 text-white border border-slate-800/60"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>

          <button
            onClick={() => setActiveTab("features")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              activeTab === "features"
                ? "bg-slate-900 text-white border border-slate-800/60"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
            }`}
          >
            Features
          </button>

          <button
            onClick={() => setActiveTab("about")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              activeTab === "about"
                ? "bg-slate-900 text-white border border-slate-800/60"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
            }`}
          >
            About
          </button>

          <button
            onClick={() => setActiveTab("contact")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              activeTab === "contact"
                ? "bg-slate-900 text-white border border-slate-800/60"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right side profile / action menu */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-850 text-slate-300 hover:text-white rounded-xl transition-all duration-200 active:scale-95 flex items-center gap-1.5 text-xs font-bold"
          >
            {isLight ? <Moon className="w-4 h-4 text-indigo-500" /> : <Sun className="w-4 h-4 text-amber-400" />}
            <span className="hidden sm:inline">{isLight ? "Dark" : "Light"}</span>
          </button>

          <div className="flex items-center gap-2 border border-slate-850 bg-slate-900/30 px-3 py-1.5 rounded-xl">
            <div className="w-5 h-5 rounded-full bg-violet-600/30 text-violet-300 flex items-center justify-center font-bold text-[10px] uppercase font-mono">
              {userEmail.charAt(0)}
            </div>
            <span className="text-[10px] font-semibold text-slate-300 max-w-[120px] truncate">
              {userEmail}
            </span>
          </div>

          <button
            onClick={handleLogout}
            title="Log Out Session"
            className="p-2 bg-slate-900 hover:bg-red-950/20 border border-slate-850 hover:border-red-900/40 text-slate-400 hover:text-red-400 rounded-xl transition-all duration-200 active:scale-95"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* --- CORE WORKSPACE SWITCHER --- */}
      <main className="flex-1 p-6 relative">
        {activeTab === "dashboard" && (
          <Dashboard onNavigateToChat={() => setActiveTab("chat")} userEmail={userEmail} />
        )}
        {activeTab === "chat" && (
          <ChatWorkspace userEmail={userEmail} />
        )}
        {activeTab === "features" && (
          <Features />
        )}
        {activeTab === "about" && (
          <About />
        )}
        {activeTab === "contact" && (
          <Contact />
        )}
      </main>

      {/* --- BOTTOM FLOATING STATS FOOTER --- */}
      <footer className="px-6 py-4 border-t border-slate-900/80 bg-slate-950/10 text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <span className="text-[10px] tracking-wider font-mono">APP-VERSION: 1.1.4</span>
          <span className="w-1 h-1 rounded-full bg-slate-800" />
          <span className="text-[10px] tracking-wider font-mono">LATENCY: SYNCED</span>
        </div>
        <p className="text-[10px] text-center sm:text-right">
          © 2026 AI Educator Systems. Empowered by Gemini-3.6-Flash capabilities.
        </p>
      </footer>
    </div>
  );
}
