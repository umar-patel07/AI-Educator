export interface AITool {
  name: string;
  category: string;
  description: string;
  pricing_tier: "Free" | "Freemium" | "Paid";
  usage_steps: string[];
  ranking_score: number;
  tutorial_video_url: string; // YouTube embeddable URL
  official_url?: string; // Direct link to tool website (e.g., https://chatgpt.com)
  pros: string[];
  cons: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  intent?: "general" | "ai_tools" | "realtime_search" | "open_app" | "system_control" | "youtube_search" | "automation_task";
  toolRecommendations?: AITool[];
  aiSuggestedTools?: {
    name: string;
    category: string;
    description: string;
    pricing_tier: "Free" | "Freemium" | "Paid";
    reason: string;
  }[];
  comparisonTable?: {
    tool: string;
    pricing: string;
    bestFor: string;
  }[];
  simulationAction?: {
    type: "open_app" | "system_control" | "file_explorer" | "timer" | "whatsapp" | "screenshot";
    name: string;
    value?: any; // e.g. volume level, timer count, WhatsApp recipient, filename
    status: "pending" | "running" | "completed" | "failed";
    steps?: { label: string; status: "pending" | "active" | "done" }[];
  };
  groundingSources?: { uri: string; title: string }[];
  attachment?: {
    name: string;
    type: string; // mimeType
    dataUrl: string; // base64 representation for preview & multimodal input
  };
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  messages: ChatMessage[];
  isPinned?: boolean;
}

export interface VoiceSettings {
  enabled: boolean;
  voiceName: string;
  pitch: number; // 0.5 to 2
  rate: number;  // 0.5 to 2
}
