import React from "react";
import { Compass, Cpu, Zap, ArrowRight, Sparkles } from "lucide-react";

export default function About() {
  const steps = [
    {
      icon: <Compass className="w-6 h-6 text-violet-400" />,
      title: "1. Intent Detection",
      desc: "Our high-speed classification pipeline analyzes your query (whether typed or spoken) to understand exactly what you need: AI suggestions, real-time search, local app launching, or desktop automation."
    },
    {
      icon: <Cpu className="w-6 h-6 text-indigo-400" />,
      title: "2. Intelligent Routing",
      desc: "Queries are filtered by a cheap offline tokenizer to short-circuit simple matches instantly, and ambiguous inputs are routed to Gemini to extract structured parameter objects."
    },
    {
      icon: <Zap className="w-6 h-6 text-pink-400" />,
      title: "3. Action Execution",
      desc: "Results are returned as high-fidelity interactive cards, live step-by-step assistant tutorial checklist nodes, custom visual controls, or real counting timers."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 relative">
      {/* Background radial glows */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero section */}
      <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
        <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-violet-900/40 text-violet-300 border border-violet-800/50">
          The Platform Concept
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-200 via-indigo-200 to-slate-200 bg-clip-text text-transparent mt-4 mb-6">
          Empowering Users in the AI Era
        </h1>
        <p className="text-slate-300 leading-relaxed">
          AI Educator is built to close the gap between having thousands of state-of-the-art AI models at our disposal and actually knowing which ones fit our tasks, how to use them efficiently, and automating workspace operations contextually.
        </p>
      </div>

      {/* 3-Step Process Grid */}
      <div className="mb-20">
        <h2 className="text-xl font-bold text-slate-100 text-center mb-10 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-violet-400" />
          <span>How It Works</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-900/30 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl relative shadow-xl hover:border-violet-500/30 transition-all duration-300 hover:translate-y-[-2px] group"
            >
              <div className="p-3 rounded-xl bg-slate-800/60 inline-flex mb-5 group-hover:bg-violet-950/40 group-hover:text-white transition-colors">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-3">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission segment */}
      <div className="bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800/80 p-8 rounded-2xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="max-w-3xl relative z-10">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Our Core Philosophy</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            We believe that software should be intuitive, highly personalized, and hands-free. By bringing together advanced audio transcription engines, offline local fuzzy search indices, and state-of-the-art multi-modal LLMs into a consolidated glassmorphism interface, AI Educator demonstrates what a next-generation workspace can look like.
          </p>
          <p className="text-slate-400 text-xs">
            Designed for programmers, copywriters, video editors, designers, and students alike. Always learning, always guiding.
          </p>
        </div>
      </div>
    </div>
  );
}
