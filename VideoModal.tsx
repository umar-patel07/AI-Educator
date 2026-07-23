import React, { useState, useEffect } from "react";
import { AITool } from "../types";
import { X, Play, ExternalLink, CheckCircle2, Monitor, Volume2, Sparkles, AlertCircle, RefreshCw, Link2, Edit3, Globe } from "lucide-react";

interface VideoModalProps {
  tool: AITool | null;
  onClose: () => void;
  onLaunchSandbox?: (tool: AITool) => void;
}

// Utility to convert YouTube embed URL to a clean YouTube Watch URL for top-level navigation
export function getYouTubeWatchUrl(url: string): string {
  if (!url) return "https://www.youtube.com";
  
  // Handle embed format: https://www.youtube.com/embed/VIDEO_ID
  if (url.includes("/embed/")) {
    const parts = url.split("/embed/");
    const videoIdWithParams = parts[1] || "";
    const videoId = videoIdWithParams.split("?")[0];
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
  
  // Handle short format: https://youtu.be/VIDEO_ID
  if (url.includes("youtu.be/")) {
    const parts = url.split("youtu.be/");
    const videoIdWithParams = parts[1] || "";
    const videoId = videoIdWithParams.split("?")[0];
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  // Handle standard watch format: https://www.youtube.com/watch?v=VIDEO_ID
  if (url.includes("youtube.com/watch")) {
    return url;
  }

  return `https://www.youtube.com/results?search_query=${encodeURIComponent(url)}`;
}

// Utility to convert any YouTube URL to an embed URL
export function formatToEmbedUrl(url: string): string {
  if (!url) return "";
  if (url.includes("/embed/")) return url;
  
  if (url.includes("watch?v=")) {
    const vId = url.split("watch?v=")[1]?.split("&")[0];
    if (vId) return `https://www.youtube.com/embed/${vId}`;
  }
  if (url.includes("youtu.be/")) {
    const vId = url.split("youtu.be/")[1]?.split("?")[0];
    if (vId) return `https://www.youtube.com/embed/${vId}`;
  }

  return url;
}

// Utility to get YouTube thumbnail image URL
export function getYouTubeThumbnailUrl(url: string): string {
  if (!url) return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
  
  let videoId = "";
  if (url.includes("/embed/")) {
    videoId = url.split("/embed/")[1]?.split("?")[0] || "";
  } else if (url.includes("v=")) {
    videoId = url.split("v=")[1]?.split("&")[0] || "";
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
  }

  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
}

export default function VideoModal({ tool, onClose, onLaunchSandbox }: VideoModalProps) {
  if (!tool) return null;

  const [activeTab, setActiveTab] = useState<"embed" | "interactive">("embed");
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlayingStep, setIsPlayingStep] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  
  // Custom video URL input state allowing user to paste any video/MP4 URL
  const [customVideoUrl, setCustomVideoUrl] = useState(tool.tutorial_video_url);
  const [isEditingUrl, setIsEditingUrl] = useState(false);

  const watchUrl = getYouTubeWatchUrl(customVideoUrl);
  const isLocalVideo = customVideoUrl.endsWith(".mp4") || customVideoUrl.includes("/tutorials/");
  
  const formattedEmbedUrl = formatToEmbedUrl(customVideoUrl);
  const embedUrl = formattedEmbedUrl.includes("?") 
    ? `${formattedEmbedUrl}&rel=0&enablejsapi=1` 
    : `${formattedEmbedUrl}?rel=0&enablejsapi=1`;

  // Auto-step timer for interactive fallback lesson
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingStep && activeTab === "interactive") {
      timer = setInterval(() => {
        setActiveStepIndex(prev => {
          if (prev >= tool.usage_steps.length - 1) {
            setIsPlayingStep(false);
            return prev;
          }
          return prev + 1;
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlayingStep, activeTab, tool.usage_steps.length]);

  const handleSpeakStep = (stepText: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(`${tool.name} Step ${activeStepIndex + 1}: ${stepText}`);
      u.rate = 1.0;
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#0D0E15] border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-pink-950/50 border border-pink-800/40 flex items-center justify-center text-pink-400 font-bold">
              <Play className="w-4 h-4 fill-pink-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white">{tool.name} Video Lesson & Setup</h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-violet-950/60 text-violet-300 border border-violet-800/40">
                  {tool.category}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-slate-900 text-indigo-300 border border-slate-800">
                  {tool.pricing_tier}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-md mt-0.5">{tool.description}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* View mode toggle tabs & actions */}
        <div className="bg-slate-950 px-4 sm:px-6 py-2.5 border-b border-slate-850 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("embed")}
              className={`px-3 py-1.5 rounded-lg font-semibold text-[11px] transition-all ${
                activeTab === "embed"
                  ? "bg-violet-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Video Player
            </button>
            <button
              onClick={() => setActiveTab("interactive")}
              className={`px-3 py-1.5 rounded-lg font-semibold text-[11px] transition-all ${
                activeTab === "interactive"
                  ? "bg-violet-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Interactive Steps
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Custom URL Editor Toggle */}
            <button
              onClick={() => setIsEditingUrl(!isEditingUrl)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl transition-colors"
              title="Paste custom video or YouTube URL"
            >
              <Edit3 className="w-3.5 h-3.5 text-violet-400" />
              <span>{isEditingUrl ? "Hide URL Edit" : "Change Video Link"}</span>
            </button>

            {/* Direct Official Tool Website Link */}
            {tool.official_url && (
              <a
                href={tool.official_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/30 border border-emerald-900/40 px-3 py-1.5 rounded-xl transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Open {tool.name} Web App ↗</span>
              </a>
            )}

            {/* Direct YouTube watch button */}
            <a
              href={watchUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-pink-400 hover:text-pink-300 bg-pink-950/30 hover:bg-pink-950/50 border border-pink-900/40 px-3 py-1.5 rounded-xl transition-colors"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* URL Customization Bar */}
        {isEditingUrl && (
          <div className="p-3 bg-slate-900/80 border-b border-slate-800 px-4 sm:px-6 flex items-center gap-2 text-xs">
            <Link2 className="w-4 h-4 text-violet-400 shrink-0" />
            <input
              type="text"
              value={customVideoUrl}
              onChange={(e) => {
                setCustomVideoUrl(e.target.value);
                setIframeLoaded(false);
              }}
              placeholder="Paste YouTube or MP4 URL here..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-violet-500"
            />
            <button
              onClick={() => setIsEditingUrl(false)}
              className="px-3 py-1.5 bg-violet-600 text-white rounded-lg font-bold text-xs"
            >
              Apply
            </button>
          </div>
        )}

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {activeTab === "embed" && (
            <div className="space-y-4">
              {/* Responsive Video Container */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
                {isLocalVideo ? (
                  <video 
                    controls 
                    autoPlay 
                    className="w-full h-full object-cover"
                    src={customVideoUrl}
                  />
                ) : (
                  <>
                    {!iframeLoaded && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-slate-400 p-6 text-center">
                        <RefreshCw className="w-8 h-8 text-violet-400 animate-spin mb-3" />
                        <p className="text-xs font-medium">Loading video stream for {tool.name}...</p>
                      </div>
                    )}
                    <iframe
                      src={embedUrl}
                      title={`${tool.name} Tutorial Video`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      onLoad={() => setIframeLoaded(true)}
                    />
                  </>
                )}
              </div>

              {/* Troubleshooting hint */}
              <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2.5 text-slate-400">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>If YouTube shows "Video unavailable" in iframe due to region/embed restrictions, click to watch directly on YouTube.</span>
                </div>
                <a
                  href={watchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-pink-950/40 border border-pink-800/40 text-pink-300 hover:text-white font-semibold text-[11px] shrink-0"
                >
                  Open YouTube Tab ↗
                </a>
              </div>
            </div>
          )}

          {activeTab === "interactive" && (
            <div className="space-y-6">
              {/* Interactive Player Stage */}
              <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Interactive Step {activeStepIndex + 1} of {tool.usage_steps.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSpeakStep(tool.usage_steps[activeStepIndex])}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
                      title="Read step aloud"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsPlayingStep(!isPlayingStep)}
                      className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>{isPlayingStep ? "Pause Demo" : "Autoplay Walkthrough"}</span>
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-900 rounded-full mb-6 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300"
                    style={{ width: `${((activeStepIndex + 1) / tool.usage_steps.length) * 100}%` }}
                  />
                </div>

                {/* Active Step Card */}
                <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
                  <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest block">
                    {tool.name} Step {activeStepIndex + 1}
                  </span>
                  <p className="text-base font-semibold text-slate-100 leading-relaxed">
                    {tool.usage_steps[activeStepIndex]}
                  </p>
                </div>

                {/* Nav buttons */}
                <div className="flex items-center justify-between mt-6">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-xs font-bold text-slate-300 border border-slate-800"
                  >
                    ← Previous Step
                  </button>
                  
                  <div className="flex gap-1.5">
                    {tool.usage_steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStepIndex(i)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          i === activeStepIndex ? "bg-violet-400 scale-125" : "bg-slate-800 hover:bg-slate-700"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    disabled={activeStepIndex === tool.usage_steps.length - 1}
                    onClick={() => setActiveStepIndex(prev => Math.min(tool.usage_steps.length - 1, prev + 1))}
                    className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-xs font-bold text-white shadow"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Complete Usage Steps List */}
          <div className="bg-slate-950/60 border border-slate-850 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Complete Step-by-Step Setup Guide</span>
              </h4>
              {tool.official_url && (
                <a
                  href={tool.official_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-bold text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Go to official site ({tool.official_url})</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {tool.usage_steps.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveStepIndex(idx);
                    setActiveTab("interactive");
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 text-xs ${
                    idx === activeStepIndex && activeTab === "interactive"
                      ? "bg-violet-950/30 border-violet-800/60 text-violet-200"
                      : "bg-slate-900/30 border-slate-850 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <span className="w-5 h-5 rounded-lg bg-slate-800 font-mono text-[10px] font-bold text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="flex-1 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/30 space-y-2">
              <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Pros & Strengths</h5>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {tool.pros.map((pro, pIdx) => (
                  <li key={pIdx} className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/30 space-y-2">
              <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Considerations</h5>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {tool.cons.map((con, cIdx) => (
                  <li key={cIdx} className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sandbox launch banner */}
          {onLaunchSandbox && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-950/50 to-indigo-950/50 border border-violet-800/40 flex items-center justify-between gap-4">
              <div>
                <h5 className="text-xs font-bold text-white">Ready to practice hands-on?</h5>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Launch our split-screen guide sandbox to practice using {tool.name} side-by-side with our teaching agent!
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onLaunchSandbox(tool);
                }}
                className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-lg shadow-violet-950/50"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Launch Interactive Sandbox</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
