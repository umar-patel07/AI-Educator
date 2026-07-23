import React, { useState, useEffect, useRef } from "react";
import { ChatMessage, Conversation, AITool, VoiceSettings } from "../types";
import SettingsPopover from "./SettingsPopover";
import VideoModal, { getYouTubeThumbnailUrl } from "./VideoModal";
import { 
  Plus, MessageSquare, Pin, Trash2, Mic, MicOff, Send, Paperclip, 
  Sparkles, ExternalLink, Play, HelpCircle, X, Check, Laptop, 
  Volume2, VolumeX, FolderPlus, Compass, Maximize2, Monitor, ArrowRight, CornerDownLeft,
  Bot, Globe
} from "lucide-react";

interface ChatWorkspaceProps {
  userEmail: string | null;
}

export default function ChatWorkspace({ userEmail }: ChatWorkspaceProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState<{ name: string; type: string; dataUrl: string } | null>(null);
  const [selectedVideoTool, setSelectedVideoTool] = useState<AITool | null>(null);
  
  // Voice & Speech State
  const [isListening, setIsListening] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ai_educator_voice_settings");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return {
      enabled: true,
      voiceName: "",
      pitch: 1.0,
      rate: 1.0
    };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ai_educator_voice_settings", JSON.stringify(voiceSettings));
    }
  }, [voiceSettings]);

  // Active Tutorial Split Screen State (Satisfying Screenshot 10)
  const [activeTutorial, setActiveTutorial] = useState<{
    toolName: string;
    category: string;
    steps: string[];
    completedSteps: boolean[];
    sandboxMessages: { sender: "user" | "assistant"; text: string }[];
  } | null>(null);

  // System Simulation States (Working timers/local storage)
  const [volumeLevel, setVolumeLevel] = useState<number>(66);
  const [brightnessLevel, setBrightnessLevel] = useState<number>(80);
  const [localVirtualTree, setLocalVirtualTree] = useState<string[]>(["Documents", "Downloads", "Projects"]);
  const [activeTimerSeconds, setActiveTimerSeconds] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // ---------------------------------------------------------
  // 1. Initial Seeding and LocalStorage Sync
  // ---------------------------------------------------------
  useEffect(() => {
    const saved = localStorage.getItem("ai_educator_conversations");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConversations(parsed);
        if (parsed.length > 0) {
          setActiveId(parsed[0].id);
        }
      } catch (e) {
        seedInitialConversation();
      }
    } else {
      seedInitialConversation();
    }
  }, []);

  const saveConversations = (updated: Conversation[]) => {
    setConversations(updated);
    localStorage.setItem("ai_educator_conversations", JSON.stringify(updated));
  };

  const seedInitialConversation = () => {
    const defaultConv: Conversation = {
      id: "seed-1",
      title: "AI Image & Code Guide",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      isPinned: true,
      messages: [
        {
          id: "msg-1",
          sender: "assistant",
          text: "Greetings, Commander. I am your AI Educator assistant. I can recommend top-tier AI applications, instruct you on how to leverage them side-by-side, or execute simulated desktop terminal automation commands. For instance, try speaking or typing: **'recommend tools for photo generation'** or **'open notepad'**.",
          timestamp: new Date(Date.now() - 3500000).toISOString()
        }
      ]
    };
    saveConversations([defaultConv]);
    setActiveId("seed-1");
  };

  const activeConv = conversations.find(c => c.id === activeId) || conversations[0];

  // ---------------------------------------------------------
  // 2. Chat Scroll Effect & Speech Recognition Setup
  // ---------------------------------------------------------
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.messages, loading]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-US";

        rec.onstart = () => {
          setIsListening(true);
        };

        rec.onresult = (event: any) => {
          const resultText = event.results[0][0].transcript;
          setInputText(prev => prev + (prev ? " " : "") + resultText);
        };

        rec.onerror = (e: any) => {
          console.error("SpeechRecognition error:", e);
          setIsListening(false);
        };

        rec.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = rec;
      }
    }
  }, []);

  // ---------------------------------------------------------
  // 3. Speech Synthesis Audio Voice-Over
  // ---------------------------------------------------------
  const speakAssistantMessage = (text: string) => {
    if (!voiceSettings.enabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    
    // Stop any active utterance
    window.speechSynthesis.cancel();

    // Clean text from raw markdown notations
    const cleanText = text.replace(/[*_#`\[\]()]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);

    if (voiceSettings.voiceName) {
      const allVoices = window.speechSynthesis.getVoices();
      const selectedVoice = allVoices.find(v => v.name === voiceSettings.voiceName);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    utterance.volume = 1.0;
    utterance.pitch = voiceSettings.pitch;
    utterance.rate = voiceSettings.rate;
    window.speechSynthesis.speak(utterance);
  };

  // ---------------------------------------------------------
  // 4. Working countdown alarm timer
  // ---------------------------------------------------------
  const startLocalTimer = (duration: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveTimerSeconds(duration);

    timerRef.current = setInterval(() => {
      setActiveTimerSeconds(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          // Trigger audio beep or notification
          if (typeof window !== "undefined") {
            try {
              const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
              const osc = audioCtx.createOscillator();
              osc.type = "sine";
              osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 tone
              osc.connect(audioCtx.destination);
              osc.start();
              osc.stop(audioCtx.currentTime + 0.5);
            } catch (err) {}
            alert("⏰ Timer completed! Simulated OS task finished.");
          }
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // ---------------------------------------------------------
  // 5. Sidebar and Conversation Actions
  // ---------------------------------------------------------
  const createNewChat = () => {
    const newId = `chat-${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      title: "New Dialogue Thread",
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "assistant",
          text: "I am ready. Ask me anything, recommend custom design workflows, or command automated browser tasks.",
          timestamp: new Date().toISOString()
        }
      ]
    };
    const updated = [newConv, ...conversations];
    saveConversations(updated);
    setActiveId(newId);
    setActiveTutorial(null);
  };

  const deleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (conversations.length <= 1) {
      alert("You must keep at least one conversation thread.");
      return;
    }
    if (confirm("Are you sure you want to discard this dialogue session?")) {
      const updated = conversations.filter(c => c.id !== id);
      saveConversations(updated);
      if (activeId === id) {
        setActiveId(updated[0].id);
      }
    }
  };

  const togglePinConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = conversations.map(c => {
      if (c.id === id) {
        return { ...c, isPinned: !c.isPinned };
      }
      return c;
    });
    // Sort so pinned are at the very top
    const pinned = updated.filter(c => c.isPinned);
    const unpinned = updated.filter(c => !c.isPinned);
    saveConversations([...pinned, ...unpinned]);
  };

  const renameConversation = (id: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    const updated = conversations.map(c => {
      if (c.id === id) {
        return { ...c, title: newTitle };
      }
      return c;
    });
    saveConversations(updated);
  };

  // ---------------------------------------------------------
  // 6. Voice and Attachment Handlers
  // ---------------------------------------------------------
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Web Speech Recognition is not supported in this browser. Please use Chrome/Safari.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setAttachment({
        name: file.name,
        type: file.type,
        dataUrl: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  // ---------------------------------------------------------
  // 7. Core Messaging Pipeline
  // ---------------------------------------------------------
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !attachment) return;

    const textToSend = inputText;
    const currentAttachment = attachment;
    
    setInputText("");
    setAttachment(null);

    // Create User Message
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: "user",
      text: textToSend || `Uploaded file: ${currentAttachment?.name}`,
      timestamp: new Date().toISOString(),
      attachment: currentAttachment ? currentAttachment : undefined
    };

    // Update state instantly with user bubble
    const updatedMessages = [...(activeConv?.messages || []), userMsg];
    const updatedConv = conversations.map(c => {
      if (c.id === activeId) {
        // Auto-generate title from first message
        const title = c.messages.length <= 1 ? (textToSend.slice(0, 24) + (textToSend.length > 24 ? "..." : "")) : c.title;
        return { ...c, title, messages: updatedMessages };
      }
      return c;
    });
    saveConversations(updatedConv);

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: activeConv?.messages || [],
          attachment: currentAttachment
        })
      });

      if (!response.ok) {
        throw new Error("Server error or rate limit hit");
      }

      const data = await response.json();

      // Create Assistant Message with all returned data structures
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        sender: "assistant",
        text: data.text,
        timestamp: new Date().toISOString(),
        intent: data.intent,
        toolRecommendations: data.toolRecommendations,
        aiSuggestedTools: data.aiSuggestedTools,
        comparisonTable: data.comparisonTable,
        groundingSources: data.groundingSources,
        simulationAction: data.simulationAction
      };

      // Apply actual system modifications locally based on simulationAction params
      if (data.simulationAction) {
        const { type, name, value } = data.simulationAction;
        if (type === "volume") {
          const val = parseInt(value) || 50;
          if (name === "increase") setVolumeLevel(prev => Math.min(100, prev + val));
          else if (name === "decrease") setVolumeLevel(prev => Math.max(0, prev - val));
          else setVolumeLevel(val);
        } else if (type === "brightness") {
          const val = parseInt(value) || 50;
          if (name === "increase") setBrightnessLevel(prev => Math.min(100, prev + val));
          else if (name === "decrease") setBrightnessLevel(prev => Math.max(0, prev - val));
          else setBrightnessLevel(val);
        } else if (type === "create_file" || type === "create_folder") {
          setLocalVirtualTree(prev => [...prev, value || name]);
        } else if (type === "timer") {
          const sec = parseInt(value) || 10;
          startLocalTimer(sec);
        } else if (type === "whatsapp") {
          // Send pre-filled whatsapp link in new tab safely
          setTimeout(() => {
            const url = `https://wa.me/?text=${encodeURIComponent(value || "Hello from AI Educator")}`;
            window.open(url, "_blank");
          }, 1500);
        }
      }

      // Update Conversations List
      const finalizedMessages = [...updatedMessages, assistantMsg];
      const finalizedConv = conversations.map(c => {
        if (c.id === activeId) {
          return { ...c, messages: finalizedMessages };
        }
        return c;
      });
      saveConversations(finalizedConv);

      // Trigger text-to-speech feedback if enabled
      speakAssistantMessage(data.text);

    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now()}-err`,
        sender: "assistant",
        text: "Apologies. I experienced an issue contacting the Gemini processor. Please verify your connection or click retry.",
        timestamp: new Date().toISOString()
      };
      const finalizedMessages = [...updatedMessages, errorMsg];
      const finalizedConv = conversations.map(c => {
        if (c.id === activeId) {
          return { ...c, messages: finalizedMessages };
        }
        return c;
      });
      saveConversations(finalizedConv);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // 8. Dynamic Guide Split View Logic (Screenshot 10)
  // ---------------------------------------------------------
  const launchSplitGuide = (tool: AITool | any) => {
    setActiveTutorial({
      toolName: tool.name,
      category: tool.category,
      officialUrl: tool.official_url,
      steps: tool.usage_steps || [
        `Open Chrome and navigate to ${tool.official_url || "the official website"}.`,
        "Click 'Sign Up' or 'Log In' and authenticate via Google or email.",
        "On the workspace dashboard, click 'Create' or start a new document/chat.",
        "Enter your prompt, upload reference files, or select a template.",
        "Review the AI output and export or share your finished creation."
      ],
      completedSteps: new Array((tool.usage_steps || []).length || 5).fill(false),
      sandboxMessages: [
        { sender: "assistant", text: `Welcome to the ${tool.name} interactive playground. Type commands or prompts in this terminal to simulate ${tool.name}'s features live!` }
      ]
    });
  };

  const handleSandboxSubmit = (text: string) => {
    if (!text.trim() || !activeTutorial) return;

    const newMsgs = [...activeTutorial.sandboxMessages, { sender: "user" as const, text }];
    setActiveTutorial({
      ...activeTutorial,
      sandboxMessages: newMsgs
    });

    // Simulate response delay
    setTimeout(() => {
      let reply = `[Sandbox: ${activeTutorial.toolName}] Proccessing prompt. Generating output matrix context... Completed successfully.`;
      if (activeTutorial.toolName.toLowerCase().includes("midjourney") || activeTutorial.toolName.toLowerCase().includes("dall")) {
        reply = `🎨 [Sandbox] Render successful! Generated high-fidelity asset link matching: "${text}". Ready for download.`;
      } else if (activeTutorial.toolName.toLowerCase().includes("code") || activeTutorial.toolName.toLowerCase().includes("cursor")) {
        reply = `💻 [Sandbox] Autocomplete parsed. Generated React hook component: \n\n\`\`\`tsx\nexport function useQuery() {\n  return { data: [] };\n}\n\`\`\``;
      }

      // Check off the next pending tutorial step!
      const nextStepIdx = activeTutorial.completedSteps.findIndex(s => !s);
      const updatedSteps = [...activeTutorial.completedSteps];
      if (nextStepIdx !== -1) {
        updatedSteps[nextStepIdx] = true;
      }

      setActiveTutorial({
        ...activeTutorial,
        completedSteps: updatedSteps,
        sandboxMessages: [...newMsgs, { sender: "assistant" as const, text: reply }]
      });
    }, 1000);
  };

  return (
    <div className="flex h-[80vh] bg-slate-950/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden relative shadow-2xl">
      
      {/* ----------------- SIDEBAR: Dialogue Sessions ----------------- */}
      <div className="w-64 bg-slate-950/90 border-r border-slate-900 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-900">
          <button
            onClick={createNewChat}
            className="w-full bg-gradient-to-r from-violet-700 to-indigo-700 hover:from-violet-600 hover:to-indigo-600 text-white rounded-xl py-2 px-3 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-violet-950/20"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat Thread</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Active Sessions
          </div>
          
          {conversations.map((conv) => {
            const isActive = conv.id === activeId;
            return (
              <div
                key={conv.id}
                onClick={() => {
                  setActiveId(conv.id);
                  setActiveTutorial(null);
                }}
                className={`group relative flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-violet-950/20 border border-violet-800/30 text-white"
                    : "text-slate-400 hover:bg-slate-900/40 hover:text-slate-200 border border-transparent"
                }`}
              >
                {/* Active Indicator Strip */}
                {isActive && (
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-violet-500 rounded-r-md" />
                )}

                <div className="flex items-center gap-2 max-w-[80%] pl-1.5">
                  <MessageSquare className="w-3.5 h-3.5 shrink-0 text-violet-400" />
                  
                  {/* Editable or clickable title */}
                  <input
                    type="text"
                    value={conv.title}
                    onChange={(e) => renameConversation(conv.id, e.target.value)}
                    className="bg-transparent border-none text-xs focus:outline-none focus:bg-slate-900 p-0.5 rounded w-full select-all font-medium"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => togglePinConversation(conv.id, e)}
                    title={conv.isPinned ? "Unpin thread" : "Pin thread"}
                    className={`p-1 rounded text-slate-500 hover:text-slate-300 ${conv.isPinned ? "text-violet-400" : ""}`}
                  >
                    <Pin className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => deleteConversation(conv.id, e)}
                    title="Discard dialogue"
                    className="p-1 rounded text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 border-t border-slate-900 text-[10px] text-slate-500 bg-slate-950/40 text-center leading-relaxed">
          Logged in as<br />
          <strong className="text-slate-300 truncate block px-2">{userEmail || "umarpatelog@gmail.com"}</strong>
        </div>
      </div>

      {/* ----------------- CORE WINDOW: Chat Thread OR Split Sandbox ----------------- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Main Thread (left in Split View, full width in normal view) */}
        <div className={`flex-1 flex flex-col justify-between ${activeTutorial ? "border-r border-slate-900 max-w-[50%]" : ""}`}>
          
          {/* Header Panel */}
          <div className="h-14 border-b border-slate-900 px-4 flex items-center justify-between bg-slate-950/60 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                {activeConv?.title || "Dialogue Workspace"}
              </h3>
            </div>
            
            {/* Quick Timer Pill (If running) */}
            {activeTimerSeconds !== null && (
              <div className="px-3 py-1 rounded-full bg-red-950/40 border border-red-900/60 text-red-300 text-xs font-mono flex items-center gap-1.5 animate-pulse">
                <span>⏰ Timer: {activeTimerSeconds}s</span>
              </div>
            )}
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
            {activeConv?.messages.map((msg, index) => {
              const isUser = msg.sender === "user";
              return (
                <div key={msg.id || index} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  
                  {/* Left avatar block for AI */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-violet-950/40 mr-3 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className="max-w-[85%] space-y-2">
                    {/* Message Bubble */}
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed border ${
                        isUser
                          ? "bg-gradient-to-br from-violet-700/80 to-indigo-800/80 border-violet-600/30 text-white rounded-tr-none"
                          : "bg-slate-900/50 border-slate-800/80 text-slate-200 rounded-tl-none shadow-md"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>

                      {/* Display attachment if any */}
                      {msg.attachment && (
                        <div className="mt-3 p-2 bg-slate-950/50 border border-slate-800/60 rounded-xl flex items-center gap-2.5 max-w-sm">
                          {msg.attachment.type.startsWith("image/") ? (
                            <img
                              src={msg.attachment.dataUrl}
                              alt="attached asset"
                              className="w-12 h-12 rounded-lg object-cover border border-slate-800"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-xs text-slate-400">
                              📄
                            </div>
                          )}
                          <div className="overflow-hidden">
                            <p className="text-[10px] text-slate-300 truncate font-mono">{msg.attachment.name}</p>
                            <p className="text-[9px] text-slate-500 uppercase">{msg.attachment.type.split("/")[1] || "document"}</p>
                          </div>
                        </div>
                      )}

                      {/* Grounding Source chips */}
                      {msg.groundingSources && msg.groundingSources.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-800/40">
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-2">Sources:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.groundingSources.map((src, sIdx) => (
                              <a
                                key={sIdx}
                                href={src.uri}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-950 hover:bg-slate-900 border border-slate-800 text-[10px] text-violet-300 font-mono transition-colors"
                              >
                                <span>{src.title.slice(0, 18)}...</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* DYNAMIC CARD 1: Local Tool Recommendations */}
                    {msg.toolRecommendations && msg.toolRecommendations.length > 0 && (
                      <div className="space-y-3.5 mt-3">
                        <div className="grid grid-cols-1 gap-3">
                          {msg.toolRecommendations.map((tool, tIdx) => (
                            <div
                              key={tIdx}
                              className="bg-slate-950/60 border border-slate-850 p-4.5 rounded-2xl shadow-xl hover:border-violet-500/20 transition-all duration-300"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="text-xs font-extrabold text-slate-100 flex items-center gap-2">
                                    <span>{tool.name}</span>
                                    <span className="text-[10px] text-violet-400 bg-violet-950/30 px-2 py-0.5 rounded-full font-normal">
                                      {tool.category}
                                    </span>
                                  </h4>
                                  <p className="text-[11px] text-slate-400 mt-1">{tool.description}</p>
                                </div>

                                <span
                                  className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                    tool.pricing_tier === "Free"
                                      ? "bg-emerald-950/40 border border-emerald-900 text-emerald-400"
                                      : tool.pricing_tier === "Freemium"
                                      ? "bg-amber-950/40 border border-amber-900 text-amber-400"
                                      : "bg-purple-950/40 border border-purple-900 text-purple-400"
                                  }`}
                                >
                                  {tool.pricing_tier}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-900">
                                <div className="space-y-1">
                                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Pros</span>
                                  <ul className="list-disc pl-3 text-[10px] text-slate-400 space-y-0.5">
                                    {tool.pros.slice(0, 2).map((p: string, i: number) => <li key={i}>{p}</li>)}
                                  </ul>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Cons</span>
                                  <ul className="list-disc pl-3 text-[10px] text-slate-400 space-y-0.5">
                                    {tool.cons.slice(0, 2).map((c: string, i: number) => <li key={i}>{c}</li>)}
                                  </ul>
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-2 mt-4.5">
                                {/* Direct Official Web App button */}
                                {tool.official_url && (
                                  <a
                                    href={tool.official_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 min-w-[110px] bg-emerald-950/30 hover:bg-emerald-950/60 border border-emerald-900/40 hover:border-emerald-500/50 text-[10px] font-bold text-emerald-300 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-all shadow-sm"
                                  >
                                    <Globe className="w-3 h-3 text-emerald-400" />
                                    <span>Open Web App ↗</span>
                                  </a>
                                )}

                                {/* Embedded Video Modal Trigger */}
                                <button
                                  type="button"
                                  onClick={() => setSelectedVideoTool(tool)}
                                  className="flex-1 min-w-[110px] bg-pink-950/20 hover:bg-pink-950/40 border border-pink-900/30 hover:border-pink-500/50 text-[10px] font-bold text-pink-300 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-all shadow-sm"
                                >
                                  <Play className="w-3 h-3 text-pink-400 fill-pink-400" />
                                  <span>Watch Video</span>
                                </button>

                                {/* Training guide deep-linker */}
                                <button
                                  type="button"
                                  onClick={() => launchSplitGuide(tool)}
                                  className="flex-1 min-w-[110px] bg-gradient-to-r from-violet-700/40 to-indigo-700/40 hover:from-violet-600 hover:to-indigo-600 border border-violet-800/30 hover:border-transparent text-[10px] font-bold text-white py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-all"
                                >
                                  <Monitor className="w-3 h-3 text-violet-300" />
                                  <span>Teach Me Inline</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* TUTORIAL VIDEO CARDS DISPLAY (Satisfying Screenshot 3) */}
                        <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-2xl shadow-xl space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-900">
                            <div className="flex items-center gap-2">
                              <Play className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                              <h5 className="text-[11px] font-extrabold text-slate-200 uppercase tracking-wider">
                                Tutorial Videos Available
                              </h5>
                            </div>
                            <span className="text-[9px] text-slate-400 font-mono font-semibold">
                              {msg.toolRecommendations.length} {msg.toolRecommendations.length === 1 ? "Video" : "Videos"} Ready
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {msg.toolRecommendations.map((vTool, vIdx) => (
                              <div
                                key={vIdx}
                                onClick={() => setSelectedVideoTool(vTool)}
                                className="group relative bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-pink-500/40 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer shadow-lg hover:shadow-pink-950/20"
                              >
                                <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                                  <img
                                    src={getYouTubeThumbnailUrl(vTool.tutorial_video_url)}
                                    alt={`${vTool.name} video tutorial thumbnail`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-90" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-9 h-9 rounded-full bg-pink-600/90 group-hover:bg-pink-500 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                      <Play className="w-4 h-4 fill-white ml-0.5" />
                                    </div>
                                  </div>
                                  <span className="absolute bottom-2 right-2 bg-slate-950/90 text-[9px] font-mono font-bold text-slate-300 px-1.5 py-0.5 rounded border border-slate-800">
                                    Video Lesson
                                  </span>
                                </div>

                                <div className="p-2.5">
                                  <div className="flex items-center justify-between mb-1">
                                    <h6 className="text-xs font-bold text-slate-100 group-hover:text-pink-300 transition-colors truncate">
                                      {vTool.name} Masterclass
                                    </h6>
                                    <span className="text-[9px] font-bold text-violet-400 bg-violet-950/40 px-1.5 py-0.5 rounded border border-violet-900/40 shrink-0">
                                      {vTool.category}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-slate-400 truncate">Click to play video lesson in-app</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}

                    {/* DYNAMIC CARD 2: AI Suggested Tools (labeled clearly) */}
                    {msg.aiSuggestedTools && msg.aiSuggestedTools.length > 0 && (
                      <div className="mt-3.5 space-y-3.5">
                        <div className="px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-slate-400 border border-slate-800 bg-slate-900/30 rounded-xl inline-flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                          <span>AI-Suggested Alternatives</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2.5">
                          {msg.aiSuggestedTools.map((sTool, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-4 bg-slate-950/40 border border-dashed border-slate-800 rounded-2xl flex flex-col justify-between"
                            >
                              <div className="flex justify-between items-start mb-1.5">
                                <h5 className="text-xs font-bold text-slate-200">
                                  {sTool.name}{" "}
                                  <span className="text-[9px] font-normal text-slate-400">({sTool.category})</span>
                                </h5>
                                <span className="text-[9px] text-indigo-400 font-mono font-bold uppercase">{sTool.pricing_tier}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 mb-2">{sTool.description}</p>
                              <div className="text-[10px] text-slate-300 bg-violet-950/20 border border-violet-900/30 p-2 rounded-xl italic">
                                <strong>Why fit:</strong> {sTool.reason}
                              </div>
                              <button
                                onClick={() => launchSplitGuide(sTool)}
                                className="mt-3 bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-300 font-bold py-1.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-800"
                              >
                                <Compass className="w-3 h-3 text-indigo-400" />
                                <span>Simulate Guide Sandbox</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* DYNAMIC CARD 3: Comparison Tables */}
                    {msg.comparisonTable && msg.comparisonTable.length > 0 && (
                      <div className="mt-3.5 bg-slate-950/40 border border-slate-900 rounded-2xl overflow-hidden shadow-xl">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-900 bg-slate-950/60 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                              <th className="p-3">Application</th>
                              <th className="p-3">Pricing Model</th>
                              <th className="p-3">Best-For Focus</th>
                            </tr>
                          </thead>
                          <tbody className="text-[10px] text-slate-300">
                            {msg.comparisonTable.map((row, rIdx) => (
                              <tr key={rIdx} className="border-b border-slate-900/60 hover:bg-slate-900/20 transition-colors">
                                <td className="p-3 font-semibold text-white">{row.tool}</td>
                                <td className="p-3 text-violet-300">{row.pricing}</td>
                                <td className="p-3 text-slate-400">{row.bestFor}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* DYNAMIC CARD 4: Simulated Desktop Automation Controls (Figures 7.7) */}
                    {msg.simulationAction && (
                      <div className="mt-3.5 bg-[#0E0E16] border border-violet-900/40 p-4.5 rounded-2xl shadow-xl shadow-purple-950/10">
                        <div className="flex items-center justify-between border-b border-slate-900 pb-2.5 mb-3">
                          <div className="flex items-center gap-2">
                            <Laptop className="w-4 h-4 text-violet-400 shrink-0" />
                            <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wide">
                              JARVIS: Simulated Desktop Command
                            </h4>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-violet-900/40 text-violet-300 animate-pulse border border-violet-800/40">
                            Simulated Action
                          </span>
                        </div>

                        {/* Visual checklist (Figure 7.7 response) */}
                        {msg.simulationAction.steps && (
                          <div className="space-y-2 mb-4">
                            {msg.simulationAction.steps.map((st: any, sIdx: number) => (
                              <div key={sIdx} className="flex items-center gap-2.5 text-[10px]">
                                {st.status === "done" ? (
                                  <div className="w-4 h-4 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center font-bold">
                                    ✓
                                  </div>
                                ) : st.status === "active" ? (
                                  <div className="w-4 h-4 rounded border border-violet-700 bg-violet-950/20 text-violet-300 flex items-center justify-center font-bold animate-spin text-[8px]">
                                    ⟳
                                  </div>
                                ) : (
                                  <div className="w-4 h-4 rounded border border-slate-800 text-slate-600 flex items-center justify-center text-[8px]">
                                    ⏳
                                  </div>
                                )}
                                <span className={st.status === "done" ? "text-slate-400 line-through" : "text-slate-200"}>
                                  {st.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Interactive UI widgets based on automation type */}
                        {msg.simulationAction.type === "volume" && (
                          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sound Output</span>
                              <span className="text-xs text-white font-mono">{volumeLevel}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={volumeLevel}
                              onChange={(e) => setVolumeLevel(parseInt(e.target.value))}
                              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
                            />
                          </div>
                        )}

                        {msg.simulationAction.type === "brightness" && (
                          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Display Brightness</span>
                              <span className="text-xs text-white font-mono">{brightnessLevel}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={brightnessLevel}
                              onChange={(e) => setBrightnessLevel(parseInt(e.target.value))}
                              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
                            />
                          </div>
                        )}

                        {msg.simulationAction.type === "create_file" && (
                          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850 space-y-2">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Virtual Filesystem</span>
                            <div className="flex flex-wrap gap-1.5">
                              {localVirtualTree.map((f, i) => (
                                <div key={i} className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-mono rounded-lg flex items-center gap-1.5">
                                  <span>📁 {f}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {msg.simulationAction.type === "timer" && (
                          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850 text-center space-y-1">
                            <span className="text-[10px] text-slate-400">JS Timer Active Session</span>
                            <div className="text-xl font-mono text-white tracking-widest font-bold">
                              {activeTimerSeconds !== null ? `${activeTimerSeconds}s` : "STANDBY"}
                            </div>
                          </div>
                        )}

                        {msg.simulationAction.type === "whatsapp" && (
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(msg.simulationAction.value || "Hello")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full bg-emerald-900/40 hover:bg-emerald-900/60 border border-emerald-800/80 text-[10px] font-bold text-emerald-400 py-2 rounded-xl flex items-center justify-center gap-2.5 transition-colors"
                          >
                            <span>Open WhatsApp wa.me link</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <p className="text-[9px] text-slate-500 mt-2 text-center italic">
                          "Automation runs safely inside your browser - some actions are simulated for demo purposes"
                        </p>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}

            {/* Pulsing typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white shrink-0 shadow-md mr-3 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-900/40 border border-slate-850 p-3.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 max-w-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Form Area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-900 bg-slate-950/80 backdrop-blur-md">
            
            {/* Attachment Thumbnail Preview */}
            {attachment && (
              <div className="mb-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between max-w-sm">
                <div className="flex items-center gap-2.5">
                  {attachment.type.startsWith("image/") ? (
                    <img
                      src={attachment.dataUrl}
                      alt="upload thumbnail"
                      className="w-10 h-10 rounded-lg object-cover border border-slate-800"
                    />
                  ) : (
                    <span className="text-lg">📄</span>
                  )}
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-slate-300 truncate font-mono">{attachment.name}</p>
                    <p className="text-[9px] text-slate-500 uppercase">{attachment.type.split("/")[1] || "document"}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAttachment(null)}
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 relative">
              {/* Paperclip upload button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Attach graphic or manual"
                className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all duration-200 active:scale-95 shrink-0"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf,text/plain"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Glowing Mic button (browser dictation) */}
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-xl border flex items-center justify-center transition-all duration-200 shrink-0 ${
                  isListening
                    ? "bg-red-950/40 border-red-700/60 text-red-400 ring-2 ring-red-500/20 animate-pulse"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
                title={isListening ? "Listening..." : "Dictate query"}
              >
                {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              {/* Main text input field */}
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isListening ? "Listening actively..." : "Type query or automate command..."}
                className="flex-1 bg-slate-900/60 border border-slate-800/80 rounded-xl py-2.5 px-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all duration-200"
              />

              {/* Voice Synthesizer control popover */}
              <SettingsPopover settings={voiceSettings} onUpdateSettings={setVoiceSettings} />

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || (!inputText.trim() && !attachment)}
                className="p-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl transition-all duration-200 disabled:opacity-40 active:scale-95 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* ----------------- SPLIT SCREEN training sandbox (Screenshot 10) ----------------- */}
        {activeTutorial && (
          <div className="flex-1 flex flex-col justify-between bg-slate-950">
            {/* Header */}
            <div className="h-14 border-b border-slate-900 px-4 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-indigo-400 shrink-0" />
                <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">
                  {activeTutorial.toolName} Interactive Sandbox
                </h4>
              </div>

              <div className="flex items-center gap-2">
                {activeTutorial.officialUrl && (
                  <a
                    href={activeTutorial.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 hover:text-white font-bold text-[10px] rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <Globe className="w-3 h-3 text-emerald-400" />
                    <span>Open Web App ↗</span>
                  </a>
                )}
                <button
                  onClick={() => setActiveTutorial(null)}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Split body: left guides, right terminal */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* Left training checklist guide */}
              <div className="w-1/2 p-4 border-r border-slate-900 overflow-y-auto space-y-4">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Instruction Guide</span>
                
                <div className="space-y-3">
                  {activeTutorial.steps.map((st, sIdx) => {
                    const isDone = activeTutorial.completedSteps[sIdx];
                    return (
                      <div
                        key={sIdx}
                        className={`p-3 rounded-xl border transition-all duration-200 ${
                          isDone 
                            ? "bg-slate-900/40 border-emerald-950 text-slate-400" 
                            : "bg-slate-900/10 border-slate-850 text-slate-200"
                        }`}
                      >
                        <div className="flex items-start gap-3 text-xs leading-relaxed">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...activeTutorial.completedSteps];
                              updated[sIdx] = !updated[sIdx];
                              setActiveTutorial({ ...activeTutorial, completedSteps: updated });
                            }}
                            className={`w-4.5 h-4.5 rounded border shrink-0 flex items-center justify-center font-bold text-[10px] transition-colors ${
                              isDone 
                                ? "bg-emerald-950 border-emerald-800 text-emerald-400" 
                                : "border-slate-800 hover:border-violet-500 text-transparent"
                            }`}
                          >
                            ✓
                          </button>
                          <div>
                            <span className="font-bold text-[10px] text-slate-500 block uppercase mb-0.5">Step {sIdx + 1}</span>
                            <span className={isDone ? "line-through text-slate-500" : ""}>{st}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 rounded-xl bg-violet-950/10 border border-violet-900/20 text-[10px] text-slate-400 leading-relaxed mt-4">
                  💡 <strong>Sandbox Guide:</strong> Type a prompt into the console on the right (for example: <em>"create a sketch of a futuristic city"</em>) to see the sandbox execute your requests live and check off steps!
                </div>
              </div>

              {/* Right interactive terminal mockup */}
              <div className="w-1/2 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono scrollbar-thin text-xs text-slate-300">
                  {activeTutorial.sandboxMessages.map((sm, smIdx) => (
                    <div key={smIdx} className={`p-2.5 rounded-lg ${sm.sender === "user" ? "bg-slate-900 text-violet-300" : "bg-slate-900/30 text-slate-300 border border-slate-900"}`}>
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-1">
                        {sm.sender === "user" ? "USER PROMPT" : activeTutorial.toolName}
                      </span>
                      <p className="whitespace-pre-wrap">{sm.text}</p>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = (e.currentTarget.elements.namedItem("sandboxInput") as HTMLInputElement);
                    handleSandboxSubmit(input.value);
                    input.value = "";
                  }}
                  className="p-3 border-t border-slate-900 bg-slate-950"
                >
                  <div className="relative">
                    <input
                      name="sandboxInput"
                      type="text"
                      placeholder={`Enter prompt into ${activeTutorial.toolName}...`}
                      className="w-full bg-slate-900 border border-slate-850 rounded-lg py-2 pl-3 pr-10 text-xs font-mono text-slate-100 focus:outline-none focus:border-violet-500"
                    />
                    <button
                      type="submit"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-violet-400 hover:text-white"
                    >
                      <CornerDownLeft className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Embedded Video Player Modal */}
      <VideoModal
        tool={selectedVideoTool}
        onClose={() => setSelectedVideoTool(null)}
        onLaunchSandbox={launchSplitGuide}
      />
    </div>
  );
}
