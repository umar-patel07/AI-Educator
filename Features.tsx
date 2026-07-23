import React from "react";
import { Search, Mic, Keyboard, Play, History, Paperclip, Monitor, CheckCircle } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Search className="w-5 h-5 text-violet-400" />,
      title: "Recommendation Core",
      desc: "Scores 50+ localized AI tools instantly, compiling comparative analysis tables and synthesizing custom recommendations."
    },
    {
      icon: <Mic className="w-5 h-5 text-indigo-400" />,
      title: "Hands-Free Voice",
      desc: "Harness native Web Speech SpeechRecognition to dictate queries effortlessly with responsive glowing animation states."
    },
    {
      icon: <Play className="w-5 h-5 text-pink-400" />,
      title: "Interactive Video",
      desc: "Instantly load and play YouTube video tutorials directly inline inside expanded recommendation results."
    },
    {
      icon: <Keyboard className="w-5 h-5 text-emerald-400" />,
      title: "Simulated OS Automation",
      desc: "Simulate volume level modifications, terminal file creation checklists, and actual browser-side alarms and timers."
    },
    {
      icon: <History className="w-5 h-5 text-amber-400" />,
      title: "Multi-Session Sync",
      desc: "Persists your active conversations, attachments, and settings safely across page loads using local storage."
    },
    {
      icon: <Paperclip className="w-5 h-5 text-cyan-400" />,
      title: "Multimodal Inputs",
      desc: "Attach images and custom documents to feed direct visual data straight into our visual analysis model."
    },
    {
      icon: <Monitor className="w-5 h-5 text-blue-400" />,
      title: "Polished Split View",
      desc: "Unlock our exclusive split training panel showing step-by-step guides alongside interactive mock coding playgrounds."
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-rose-400" />,
      title: "Web Grounding",
      desc: "Integrate live Google Search grounding automatically to fetch real-time facts and citation chips."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 relative">
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-violet-200 via-indigo-100 to-slate-200 bg-clip-text text-transparent mb-4">
          Uncompromised SaaS Features
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Explore the high-fidelity features baked directly into our system, bridging advanced automation, semantic analysis, and native browser APIs.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="bg-slate-900/30 backdrop-blur-md border border-slate-800/80 hover:border-violet-500/40 p-6 rounded-2xl shadow-lg hover:shadow-violet-950/10 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center mb-5 border border-slate-700/40">
                {feat.icon}
              </div>
              <h3 className="text-sm font-semibold text-slate-100 tracking-wide mb-2">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-violet-400 font-medium">
              <span>ACTIVE SYSTEM</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
