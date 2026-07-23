import React from "react";
import { Sparkles, Play, Mic, Terminal, Bot, Zap, ArrowRight, ShieldCheck } from "lucide-react";

interface DashboardProps {
  onNavigateToChat: () => void;
  userEmail: string | null;
}

export default function Dashboard({ onNavigateToChat, userEmail }: DashboardProps) {
  const features = [
    {
      icon: <Bot className="w-5 h-5 text-violet-400" />,
      title: "Tool Recommendations",
      desc: "Our search scoring algorithms find, compare, and recommend the best AI tools from a list of 50+ curated products instantly."
    },
    {
      icon: <Mic className="w-5 h-5 text-indigo-400" />,
      title: "Voice Commands",
      desc: "Ditch the keyboard and dictate queries or control simulated system sound and brightness adjustments using your voice."
    },
    {
      icon: <Play className="w-5 h-5 text-pink-400" />,
      title: "Interactive Video Gallery",
      desc: "Every recommended tool features an embedded YouTube video so you can learn how to implement it without leaving the workspace."
    },
    {
      icon: <Terminal className="w-5 h-5 text-emerald-400" />,
      title: "Simulated OS Automation",
      desc: "Experience simulated terminal scripts, countdown timers, WhatsApp link generators, and local screenshots designed to save you steps."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10 pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-950/40 border border-violet-800/40 text-violet-300 text-xs font-semibold tracking-wider uppercase mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>Polished AI Assistant Workspace</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-slate-50 via-slate-100 to-indigo-200 bg-clip-text text-transparent mb-6 leading-tight">
          Find the Perfect AI Tool <br />
          <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
            And Automate Your Workflow
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
          The ultimate SaaS educator and desk companion. Search 50+ curated industry solutions, learn step-by-step through embedded YouTube guides, and control operations hands-free.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onNavigateToChat}
            className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-violet-950/40 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            <span>Start Chatting</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center gap-2 text-xs text-slate-400 border border-slate-800/60 bg-slate-900/20 rounded-xl px-4 py-3.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Logged in as <strong className="text-slate-200">{userEmail || "Guest User"}</strong></span>
          </div>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="relative z-10 mb-16">
        <h2 className="text-sm font-bold tracking-wider uppercase text-slate-400 text-center mb-10">
          Core Capabilities Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/30 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-xl hover:border-violet-500/30 transition-all duration-300 hover:translate-y-[-2px] group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800/60 flex items-center justify-center mb-5 group-hover:bg-violet-950/40 group-hover:text-white transition-all duration-300 border border-slate-700/30">
                {feat.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-100 mb-2 tracking-wide group-hover:text-violet-300 transition-colors">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Tip Banner */}
      <div className="bg-slate-900/20 backdrop-blur-md border border-slate-800/60 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 border border-amber-500/20">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200">Tip: Quick Recommendation</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
              Type or speak <strong className="text-slate-300">"tools for writing blogs"</strong> or <strong className="text-slate-300">"how to use Elevenlabs"</strong> inside the chat window to test our scoring matches!
            </p>
          </div>
        </div>
        <button
          onClick={onNavigateToChat}
          className="bg-slate-800 hover:bg-slate-700 text-slate-100 hover:text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all duration-200 shrink-0"
        >
          Try Now
        </button>
      </div>
    </div>
  );
}
