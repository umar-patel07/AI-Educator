import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { AI_TOOLS_DATABASE } from "./src/data/tools";
import { AITool } from "./src/types";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// A standard list of English stopwords to clean query strings
const STOPWORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "arent", "as", "at", 
  "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "cant", "cannot", "could", 
  "did", "didnt", "do", "does", "doesnt", "doing", "dont", "down", "during", "each", "few", "for", "from", "further", 
  "had", "hadnt", "has", "hasnt", "have", "havent", "having", "he", "hed", "hell", "hes", "her", "here", "heres", 
  "hers", "herself", "him", "himself", "his", "how", "hows", "i", "id", "ill", "im", "ive", "if", "in", "into", "is", 
  "isnt", "it", "its", "itself", "lets", "me", "more", "most", "mustnt", "my", "myself", "no", "nor", "not", "of", 
  "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", 
  "shant", "she", "shed", "shell", "shes", "should", "shouldnt", "so", "some", "such", "than", "that", "thats", 
  "the", "their", "theirs", "them", "themselves", "then", "there", "theres", "these", "they", "theyd", "theyll", 
  "theyre", "theyve", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasnt", 
  "we", "wed", "well", "were", "weve", "werent", "what", "whats", "when", "whens", "where", "wheres", "which", 
  "while", "who", "whos", "whom", "why", "whys", "with", "wont", "would", "wouldnt", "you", "youd", "youll", 
  "youre", "youve", "your", "yours", "yourself", "yourselves"
]);

// ---------------------------------------------------------
// Helper: Cheap Local Short-Circuit for AI Tools Recommendation
// ---------------------------------------------------------
function isAIToolsShortCircuit(message: string): boolean {
  const clean = message.toLowerCase().replace(/[^\w\s]/g, "");
  const tokens = clean.split(/\s+/);
  
  // Rule 1: contains "ai" AND ("tool" or "tools")
  const hasAI = tokens.includes("ai");
  const hasTool = tokens.includes("tool") || tokens.includes("tools") || tokens.includes("software") || tokens.includes("app") || tokens.includes("apps");
  if (hasAI && hasTool) return true;

  // Rule 2: matches common tool searching phrases
  const phrases = [
    "tools for", "software for", "app for", "how to use", "tutorial", 
    "recommend", "suggest tools", "alternative to", "best tool", "chatting tool",
    "chat tool", "chatbot", "presentation tool", "coding tool", "video tool",
    "pdf to word", "pdf converter", "convert pdf", "document tool", "converter",
    "music tool", "song generator", "resume builder", "homework solver", "math tool",
    "notes tool", "research tool", "marketing tool", "seo tool", "productivity tool"
  ];
  if (phrases.some(p => clean.includes(p))) return true;

  return false;
}

// ---------------------------------------------------------
// Helper: Scoring Recommendation Engine with Domain Category Boosting
// ---------------------------------------------------------
function scoreLocalTools(query: string): AITool[] {
  const clean = query.toLowerCase().replace(/[^\w\s]/g, "");
  const rawTokens = clean.split(/\s+/).filter(t => t.length > 1 && !STOPWORDS.has(t));

  if (rawTokens.length === 0) {
    return AI_TOOLS_DATABASE.slice(0, 5);
  }

  // Normalize/Stem tokens
  const queryTokens = rawTokens.map(t => {
    if (t.startsWith("chat")) return "chat";
    if (t.startsWith("present") || t.startsWith("slid") || t.startsWith("deck")) return "presentation";
    if (t.startsWith("cod") || t.startsWith("program")) return "code";
    if (t.startsWith("imag") || t.startsWith("photo") || t.startsWith("art")) return "image";
    if (t.startsWith("vid") || t.startsWith("animat")) return "video";
    if (t.startsWith("writ") || t.startsWith("essay")) return "writing";
    if (t.startsWith("pdf") || t.startsWith("doc") || t.startsWith("convert")) return "pdf";
    if (t.startsWith("musi") || t.startsWith("song") || t.startsWith("audi") || t.startsWith("voic")) return "music";
    if (t.startsWith("note") || t.startsWith("productiv") || t.startsWith("task")) return "productivity";
    if (t.startsWith("researc") || t.startsWith("academic") || t.startsWith("paper")) return "research";
    if (t.startsWith("resum") || t.startsWith("cv") || t.startsWith("career")) return "resume";
    if (t.startsWith("math") || t.startsWith("homework") || t.startsWith("solver")) return "math";
    if (t.startsWith("market") || t.startsWith("seo")) return "marketing";
    if (t.startsWith("fit") || t.startsWith("workout") || t.startsWith("gym") || t.startsWith("exercise")) return "fitness";
    if (t.startsWith("translat") || t.startsWith("language")) return "translation";
    if (t.startsWith("stock") || t.startsWith("crypto") || t.startsWith("trad") || t.startsWith("invest") || t.startsWith("finance")) return "finance";
    if (t.startsWith("medic") || t.startsWith("health") || t.startsWith("symptom") || t.startsWith("doctor")) return "medical";
    if (t.startsWith("food") || t.startsWith("recip") || t.startsWith("meal") || t.startsWith("diet") || t.startsWith("calori") || t.startsWith("nutrit")) return "food";
    return t;
  });

  const isChattingQuery = queryTokens.some(t => t === "chat" || clean.includes("chatting") || clean.includes("chatbot") || clean.includes("conversation") || clean.includes("deepseek") || clean.includes("grok"));
  const isPresentationQuery = queryTokens.some(t => t === "presentation" || clean.includes("slides") || clean.includes("deck") || clean.includes("powerpoint") || clean.includes("gamma") || clean.includes("canva") || clean.includes("tome"));
  const isCodingQuery = queryTokens.some(t => t === "code" || clean.includes("coding") || clean.includes("programmer") || clean.includes("developer") || clean.includes("blackbox") || clean.includes("bolt"));
  const isImageQuery = queryTokens.some(t => t === "image" || clean.includes("drawing") || clean.includes("picture") || clean.includes("art") || clean.includes("midjourney") || clean.includes("dall-e"));
  const isVideoQuery = queryTokens.some(t => t === "video" || clean.includes("avatar") || clean.includes("movie") || clean.includes("clip"));
  const isWritingQuery = queryTokens.some(t => t === "writing" || clean.includes("essay") || clean.includes("copywriting") || clean.includes("blog"));
  const isPdfDocumentQuery = queryTokens.some(t => t === "pdf" || clean.includes("pdf") || clean.includes("word") || clean.includes("convert") || clean.includes("doc") || clean.includes("ilovepdf") || clean.includes("smallpdf"));
  const isMusicQuery = queryTokens.some(t => t === "music" || clean.includes("song") || clean.includes("audio") || clean.includes("voice") || clean.includes("suno") || clean.includes("udio"));
  const isProductivityQuery = queryTokens.some(t => t === "productivity" || clean.includes("notes") || clean.includes("notion") || clean.includes("otter"));
  const isResearchQuery = queryTokens.some(t => t === "research" || clean.includes("academic") || clean.includes("paper") || clean.includes("citations"));
  const isResumeQuery = queryTokens.some(t => t === "resume" || clean.includes("cv") || clean.includes("job") || clean.includes("career"));
  const isMathQuery = queryTokens.some(t => t === "math" || clean.includes("homework") || clean.includes("solver") || clean.includes("equation"));
  const isFitnessQuery = queryTokens.some(t => t === "fitness" || clean.includes("workout") || clean.includes("gym") || clean.includes("fitbod") || clean.includes("freeletics"));
  const isTranslationQuery = queryTokens.some(t => t === "translation" || clean.includes("deepl") || clean.includes("translate") || clean.includes("language"));
  const isFinanceQuery = queryTokens.some(t => t === "finance" || clean.includes("stock") || clean.includes("crypto") || clean.includes("trading") || clean.includes("invest"));
  const isMedicalQuery = queryTokens.some(t => t === "medical" || clean.includes("symptom") || clean.includes("health") || clean.includes("ada") || clean.includes("report"));
  const isFoodQuery = queryTokens.some(t => t === "food" || clean.includes("recipe") || clean.includes("meal") || clean.includes("nutrition") || clean.includes("calorie") || clean.includes("diet"));
  const isHomeDecorQuery = queryTokens.some(t => t === "decor" || clean.includes("room") || clean.includes("home") || clean.includes("interior") || clean.includes("exterior") || clean.includes("decor") || clean.includes("roomgpt"));
  const isFashionQuery = queryTokens.some(t => t === "fashion" || clean.includes("makeup") || clean.includes("hairstyle") || clean.includes("haircut") || clean.includes("outfit") || clean.includes("beauty") || clean.includes("dress"));

  const scored = AI_TOOLS_DATABASE.map(tool => {
    let score = 0;
    const nameLower = tool.name.toLowerCase();
    const catLower = tool.category.toLowerCase();
    const descLower = tool.description.toLowerCase();

    // Domain category massive boosts
    if (isHomeDecorQuery && (catLower.includes("home") || catLower.includes("decor") || nameLower.includes("roomgpt") || nameLower.includes("decorai") || nameLower.includes("reimaginehome"))) {
      score += 150;
    }
    if (isFashionQuery && (catLower.includes("fashion") || catLower.includes("makeup") || catLower.includes("hairstyle") || nameLower.includes("outfitmind") || nameLower.includes("perfect corp") || nameLower.includes("hairstyleai"))) {
      score += 150;
    }
    if (isFitnessQuery && (catLower.includes("fitness") || nameLower.includes("fitbod") || nameLower.includes("freeletics") || nameLower.includes("evolve") || nameLower.includes("gymgenie"))) {
      score += 150;
    }
    if (isTranslationQuery && (catLower.includes("translation") || nameLower.includes("deepl") || nameLower.includes("translate"))) {
      score += 150;
    }
    if (isFinanceQuery && (catLower.includes("finance") || catLower.includes("stock") || catLower.includes("crypto") || nameLower.includes("finbrain") || nameLower.includes("coinrule") || nameLower.includes("portfoliopilot"))) {
      score += 150;
    }
    if (isMedicalQuery && (catLower.includes("medical") || catLower.includes("health") || nameLower.includes("ada") || nameLower.includes("glass") || nameLower.includes("buoy"))) {
      score += 150;
    }
    if (isFoodQuery && (catLower.includes("food") || catLower.includes("nutrition") || nameLower.includes("eat this much") || nameLower.includes("mealime") || nameLower.includes("chefaide"))) {
      score += 150;
    }
    if (isPdfDocumentQuery && (catLower.includes("pdf") || catLower.includes("document") || nameLower.includes("pdf") || nameLower.includes("ilovepdf") || nameLower.includes("adobe") || nameLower.includes("smallpdf"))) {
      score += 150;
    }
    if (isPresentationQuery && (catLower.includes("presentation") || nameLower.includes("gamma") || nameLower.includes("slides") || nameLower.includes("tome") || nameLower.includes("beautiful") || nameLower.includes("canva"))) {
      score += 150;
    }
    if (isMusicQuery && (catLower.includes("music") || catLower.includes("audio") || catLower.includes("voice") || nameLower.includes("suno") || nameLower.includes("udio") || nameLower.includes("elevenlabs"))) {
      score += 150;
    }
    if (isProductivityQuery && (catLower.includes("productivity") || catLower.includes("notes") || nameLower.includes("notion") || nameLower.includes("otter"))) {
      score += 150;
    }
    if (isResearchQuery && (catLower.includes("research") || catLower.includes("academic") || nameLower.includes("consensus") || nameLower.includes("elicit"))) {
      score += 150;
    }
    if (isResumeQuery && (catLower.includes("resume") || catLower.includes("career") || nameLower.includes("resume") || nameLower.includes("rezi"))) {
      score += 150;
    }
    if (isMathQuery && (catLower.includes("math") || nameLower.includes("photomath") || nameLower.includes("mathway"))) {
      score += 150;
    }
    if (isChattingQuery && catLower.includes("chat") && !isPdfDocumentQuery) {
      score += 100;
    }
    if (isCodingQuery && catLower.includes("coding")) {
      score += 100;
    }
    if (isImageQuery && catLower.includes("image")) {
      score += 100;
    }
    if (isVideoQuery && catLower.includes("video")) {
      score += 100;
    }
    if (isWritingQuery && catLower.includes("writing")) {
      score += 100;
    }

    queryTokens.forEach(token => {
      // Rule A: Tool Name exact or substring match (+20)
      if (nameLower.includes(token)) {
        score += 20;
      }
      // Rule B: Category match (+10)
      if (catLower.includes(token)) {
        score += 10;
      }
      // Rule C: Description match (+4)
      if (descLower.includes(token)) {
        score += 4;
      }
    });

    return { tool, score };
  });

  // Sort descending by score, then ranking_score
  scored.sort((a, b) => b.score - a.score || b.tool.ranking_score - a.tool.ranking_score);

  const matched = scored.filter(item => item.score > 0).map(item => item.tool);
  return matched.length > 0 ? matched : AI_TOOLS_DATABASE.slice(0, 5);
}

// ---------------------------------------------------------
// Endpoint: POST /api/chat
// ---------------------------------------------------------
app.post("/api/chat", async (req, res) => {
  const { message, history = [], attachment } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    let intent: string = "general";
    let cleanedQuery: string = message;
    let automationParam: any = null;

    // --- STEP 1: CHEAP LOCAL SHORT-CIRCUIT ---
    const isShortCircuit = isAIToolsShortCircuit(message);

    if (isShortCircuit) {
      intent = "ai_tools";
      cleanedQuery = message;
    } else {
      // --- STEP 2: GEMINI-POWERED INTENT CLASSIFIER & PARAMETER EXTRACTOR ---
      const classificationSystemInstruction = `
You are a highly structured classification system for "AI Educator".
Classify the user's input into exactly one of these intents:
1. "ai_tools": Recommendations, comparisons, searches of AI tools or instructions on how to use them.
2. "realtime_search": Questions about real-time factual events, up-to-date data, sports scores, news, or general search grounding queries.
3. "open_app": Requests to launch apps (e.g., "open spotify", "open chrome").
4. "system_control": System changes like volume or brightness (e.g., "increase volume by 5", "set brightness to 80%").
5. "automation_task": Tasks like timer setting, taking a screenshot, whatsapp messaging, file/folder creation (e.g., "set a timer for 10s", "create a folder projects").
6. "general": Conversational chat, math, standard logic, general programming questions, or greetings.

Also extract any parameters for automation. Respond with JSON strictly matching the schema.
`;

      const classificationResponse = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: message,
        config: {
          systemInstruction: classificationSystemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              intent: {
                type: Type.STRING,
                description: "The classified intent label.",
                enum: ["general", "ai_tools", "realtime_search", "open_app", "system_control", "automation_task"]
              },
              cleaned_query: {
                type: Type.STRING,
                description: "A refined version of the query stripping voice filler."
              },
              automation: {
                type: Type.OBJECT,
                description: "Automation details if intent is open_app, system_control, or automation_task.",
                properties: {
                  type: {
                    type: Type.STRING,
                    enum: ["open_app", "volume", "brightness", "create_file", "create_folder", "timer", "whatsapp", "screenshot", "none"]
                  },
                  target: {
                    type: Type.STRING,
                    description: "Target application, parameter name, or person name (e.g., 'chrome', 'increase', 'John')"
                  },
                  value: {
                    type: Type.STRING,
                    description: "Volume level, timer duration in seconds, WhatsApp message text, filename, etc."
                  }
                },
                required: ["type", "target", "value"]
              }
            },
            required: ["intent", "cleaned_query", "automation"]
          }
        }
      });

      const parsedResult = JSON.parse(classificationResponse.text || "{}");
      intent = parsedResult.intent || "general";
      cleanedQuery = parsedResult.cleaned_query || message;
      automationParam = parsedResult.automation;
    }

    // --- STEP 3: HANDLER ROUTING & EXECUTION ---
    let textResponse = "";
    let toolRecommendations: AITool[] = [];
    let aiSuggestedTools: any[] = [];
    let comparisonTable: any[] = [];
    let groundingSources: any[] = [];
    let simulationAction: any = null;

    if (intent === "ai_tools") {
      // Recommendation handler
      const matchedTools = scoreLocalTools(cleanedQuery);
      toolRecommendations = matchedTools.slice(0, 5);

      // Construct Gemini comparison & text summary
      const dbMatchListText = toolRecommendations.map(t => `- ${t.name} (${t.category}): ${t.description}`).join("\n");
      const requiresAISuggestions = toolRecommendations.length < 3;

      const aiToolsPrompts = `
You are the AI Educator Recommendation System.
The user's query is: "${cleanedQuery}".
We searched our local database of curated AI tools and found these matches:
${dbMatchListText || "No direct local database matches found."}

Provide a response in JSON format. Do not use markdown blocks inside the JSON fields.
Generate:
1. An introduction paragraph (text_summary) summarizing which kinds of tools fit this query.
2. A comparison table (comparison_table) mapping the recommended tools with columns: tool (name), pricing (pricing tier), and bestFor (the ideal use-case).
3. If '${requiresAISuggestions}' is true or we have fewer than 3 local tools, suggest 2-3 additional real-world tools that fit. Mark these as 'aiSuggested' with a logical reason.
`;

      const recommendationSynthesis = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: aiToolsPrompts,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              text_summary: {
                type: Type.STRING,
                description: "A friendly introduction and summary of findings."
              },
              comparison_table: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    tool: { type: Type.STRING },
                    pricing: { type: Type.STRING },
                    bestFor: { type: Type.STRING }
                  },
                  required: ["tool", "pricing", "bestFor"]
                }
              },
              ai_suggested_tools: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    category: { type: Type.STRING },
                    description: { type: Type.STRING },
                    pricing_tier: { type: Type.STRING, enum: ["Free", "Freemium", "Paid"] },
                    reason: { type: Type.STRING }
                  },
                  required: ["name", "category", "description", "pricing_tier", "reason"]
                }
              }
            },
            required: ["text_summary", "comparison_table", "ai_suggested_tools"]
          }
        }
      });

      const parsedRec = JSON.parse(recommendationSynthesis.text || "{}");
      textResponse = parsedRec.text_summary || "Here are our top recommended AI tools:";
      comparisonTable = parsedRec.comparison_table || [];
      aiSuggestedTools = parsedRec.ai_suggested_tools || [];

      // If database yielded absolutely nothing, and Gemini suggested some, use those
      if (toolRecommendations.length === 0 && aiSuggestedTools.length > 0) {
        textResponse += "\n\nWe couldn't find matches in our local offline database, so we've fetched these dynamic AI suggestions for you!";
      }
    } 
    else if (intent === "realtime_search") {
      // Realtime search grounding handler
      const searchResponse = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: cleanedQuery,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      textResponse = searchResponse.text || "I performed a search but couldn't synthesize a response.";
      
      const chunks = searchResponse.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        groundingSources = chunks
          .filter((c: any) => c.web)
          .map((c: any) => ({
            uri: c.web.uri,
            title: c.web.title || "Web Source"
          }));
      }
    } 
    else if (intent === "open_app" || intent === "system_control" || intent === "automation_task") {
      // Simulated Desktop Automation handler
      const type = automationParam?.type || "none";
      const target = automationParam?.target || "";
      const value = automationParam?.value || "";

      simulationAction = {
        type: type,
        name: target,
        value: value,
        status: "running"
      };

      // Formulate custom confirmation responses and step-by-step checklists!
      if (type === "open_app") {
        textResponse = `JARVIS: Executing your computer commands...\n\nInitializing desktop environment link. Requesting local program registry search for "${target}"...`;
        simulationAction.steps = [
          { label: `Locating program path for ${target}`, status: "done" },
          { label: `Checking local file system permissions`, status: "active" },
          { label: `Launching ${target} process securely`, status: "pending" }
        ];
      } else if (type === "volume") {
        textResponse = `JARVIS: Adjusting system sound level.\n\nRunning system terminal command to adjust volume level. Current volume level synced to indicator controls.`;
        simulationAction.steps = [
          { label: `Sending keyboard media controls`, status: "done" },
          { label: `Synthesizing volume change event`, status: "done" }
        ];
      } else if (type === "brightness") {
        textResponse = `JARVIS: Display brightness altered.\n\nExecuting brightness slider controls. Re-calibrating display contrast values.`;
        simulationAction.steps = [
          { label: `Reading device brightness capabilities`, status: "done" },
          { label: `Writing display brightness registers`, status: "done" }
        ];
      } else if (type === "create_file" || type === "create_folder") {
        textResponse = `JARVIS: Virtual workspace directory altered.\n\nGenerated secure virtual node block for file element "${value || target}".`;
        simulationAction.steps = [
          { label: `Validating name parameters`, status: "done" },
          { label: `Allocating local sandboxed sectors`, status: "done" },
          { label: `Writing node table reference`, status: "done" }
        ];
      } else if (type === "timer") {
        const sec = parseInt(value) || 10;
        textResponse = `JARVIS: Local countdown scheduled.\n\nCreating high-accuracy JavaScript interval handler for exactly ${sec} seconds. System alert will trigger at finish.`;
        simulationAction.steps = [
          { label: `Registering system interval`, status: "done" },
          { label: `Scheduling toast notifications`, status: "active" }
        ];
      } else if (type === "whatsapp") {
        textResponse = `JARVIS: External messaging link ready.\n\nFormatting secure wa.me callback URL for "${target}". Hover over button to launch messenger in new browser tab.`;
        simulationAction.steps = [
          { label: `Validating destination format`, status: "done" },
          { label: `Injecting payload: "${value}"`, status: "done" }
        ];
      } else if (type === "screenshot") {
        textResponse = `JARVIS: Taking a local workspace capture is restricted by browser security policies.\n\nI can, however, render a complete canvas snapshot of your active chat room session directly inside this frame!`;
        simulationAction.steps = [
          { label: `Detecting browser window limits`, status: "done" },
          { label: `Simulating document canvas paint`, status: "active" }
        ];
      } else {
        textResponse = `JARVIS: Automated action initialized. Command routed to system controller.`;
      }
    } 
    else {
      // General conversation and multimodal logic
      const chatContents: any[] = [];

      // Add historical messages
      // We take the last 10 messages for concise context
      const slicedHistory = history.slice(-10);
      slicedHistory.forEach((msg: any) => {
        chatContents.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      });

      // Add current message and attachment if present
      const parts: any[] = [];
      if (attachment && attachment.dataUrl) {
        const base64Data = attachment.dataUrl.split(",")[1] || attachment.dataUrl;
        parts.push({
          inlineData: {
            mimeType: attachment.type,
            data: base64Data
          }
        });
      }
      parts.push({ text: message });

      chatContents.push({
        role: "user",
        parts: parts
      });

      const conversationSystemInstruction = `
You are the AI Educator, a brilliant assistant helping users discover, learn, and implement AI workflows.
Keep your answers highly concise, clear, and perfectly formatted in standard markdown.
Always maintain a helpful, premium SaaS expert persona.
`;

      const chatResponse = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: chatContents,
        config: {
          systemInstruction: conversationSystemInstruction
        }
      });

      textResponse = chatResponse.text || "I received your message but couldn't generate a reply.";
    }

    return res.json({
      intent,
      text: textResponse,
      toolRecommendations,
      aiSuggestedTools,
      comparisonTable,
      groundingSources,
      simulationAction
    });

  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    return res.status(500).json({
      error: "Gemini server processing error. Please try again.",
      details: error.message || error
    });
  }
});

// ---------------------------------------------------------
// Serve Vite frontend
// ---------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Educator server listening on port ${PORT}`);
  });
}

startServer();
