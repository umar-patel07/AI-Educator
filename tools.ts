import { AITool } from "../types";

export const AI_TOOLS_DATABASE: AITool[] = [
  // --- Chatbots ---
  {
    name: "ChatGPT",
    category: "Chatbots",
    description: "OpenAI's flagship conversational assistant, excels at reasoning, writing, coding, math, and custom GPT workflows.",
    pricing_tier: "Freemium",
    official_url: "https://chatgpt.com",
    usage_steps: [
      "Open Chrome or your browser and navigate to https://chatgpt.com.",
      "Click 'Log in' or 'Sign up'. Choose 'Continue with Google' or register using your email address.",
      "On the chat workspace homepage, select your preferred model (e.g., GPT-4o or GPT-4o-mini).",
      "Type your query in the prompt box or click the paperclip icon to upload images, PDFs, or spreadsheets.",
      "Click 'Send' or press Enter to generate the response. Ask follow-up questions to refine the output.",
      "Use the 'Share' or 'Copy' buttons to copy text formatting, tables, or code snippets directly."
    ],
    ranking_score: 98,
    tutorial_video_url: "https://youtu.be/IcCAEudzEDw",
    pros: ["Extremely versatile", "Custom GPTs store and web browsing", "Great at structured logical analysis"],
    cons: ["GPT-4o Plus costs $20/month", "Occasional visual formatting quirks in code rendering"]
  },
  {
    name: "Claude",
    category: "Chatbots",
    description: "Anthropic's articulate AI assistant, renowned for high-context long document analysis, natural writing, and coding.",
    pricing_tier: "Freemium",
    official_url: "https://claude.ai",
    usage_steps: [
      "Open Chrome or your browser and visit https://claude.ai.",
      "Click 'Sign In' and authenticate with your Google account or email verification code.",
      "On the Claude dashboard, click 'Start a new chat'.",
      "Drag and drop documents, PDF files, or code files (up to 200k tokens of context).",
      "Instruct Claude with specific prompts (e.g. 'Summarize key findings and synthesize action items').",
      "View interactive code, diagrams, or documents in the side 'Artifacts' panel and copy or download them."
    ],
    ranking_score: 97,
    tutorial_video_url: "https://youtu.be/rRrBbyv3ChM",
    pros: ["Superb coding syntax and formatting", "Nuanced, articulate human writing voice", "Handles massive 200,000 token documents"],
    cons: ["Strict message limit per hour on free tier", "No real-time web search in default free view"]
  },
  {
    name: "Gemini",
    category: "Chatbots",
    description: "Google's multimodal AI assistant with direct Google Workspace integration, YouTube search, and real-time grounding.",
    pricing_tier: "Freemium",
    official_url: "https://gemini.google.com",
    usage_steps: [
      "Open Chrome and navigate to https://gemini.google.com.",
      "Click 'Sign In' using your Google account credentials.",
      "Enable Google Workspace Extensions in Settings if you want Gemini to access Gmail, Docs, or Drive.",
      "Type a direct prompt, click the Microphone icon for voice input, or upload images/documents.",
      "Click the Google 'G' Double-Check button at the bottom to verify statements against real-time web sources.",
      "Click 'Export' to send generated drafts directly to Google Docs or Gmail as drafts."
    ],
    ranking_score: 96,
    tutorial_video_url: "https://youtu.be/-_FizlRlfYs",
    pros: ["1 Million+ token context window in Advanced", "Free real-time web search grounding", "Seamless Workspace ecosystem syncing"],
    cons: ["Slightly verbose conversational responses", "Occasional latency on complex multi-file parsing"]
  },
  {
    name: "Perplexity AI",
    category: "Chatbots",
    description: "An AI-powered conversational search engine that provides real-time answers backed by inline web citations and sources.",
    pricing_tier: "Freemium",
    official_url: "https://perplexity.ai",
    usage_steps: [
      "Open Chrome and navigate to https://perplexity.ai.",
      "Click 'Sign Up' in the sidebar and log in using Google, Apple, or email.",
      "Select a search 'Focus' filter (e.g., All, Academic, YouTube, Reddit, Writing).",
      "Type your research question in the search bar and press Enter.",
      "Read the synthesized summary and click the numbered source citations to open original web pages.",
      "Ask follow-up questions or use 'Pro Search' for multi-step deep research."
    ],
    ranking_score: 95,
    tutorial_video_url: "https://youtu.be/Wx-zdBj62x4?list=PLiPg-L3z8VWNIGOvCr3cwlvu5U9Dkbahv",
    pros: ["Verifiable citations for every claim", "Real-time up to the minute web data", "Focus filters for specific academic domains"],
    cons: ["Daily limit on Pro Search queries", "Can synthesize contradictory points if web sources conflict"]
  },
  {
    name: "Character.ai",
    category: "Chatbots",
    description: "A specialized conversational chatbot platform featuring thousands of user-created AI characters, historical figures, and tutors.",
    pricing_tier: "Freemium",
    official_url: "https://character.ai",
    usage_steps: [
      "Open Chrome and go to https://character.ai.",
      "Click 'Log In / Sign Up' at top right and log in via Google or email.",
      "Browse trending characters, language tutors, or click 'Create' to build your own custom AI persona.",
      "Type your message into the chat room and receive interactive roleplay or educational responses.",
      "Swipe left on responses to generate alternative character replies."
    ],
    ranking_score: 91,
    tutorial_video_url: "https://youtu.be/YtKPc0oVWYs",
    pros: ["Huge variety of engaging conversational personas", "Fun for language immersion & creative brainstorming", "100% free core chat"],
    cons: ["Not designed for high-accuracy factual coding", "Queue waiting times during peak server loads"]
  },
  {
    name: "Poe by Quora",
    category: "Chatbots",
    description: "An all-in-one AI chatbot aggregator letting you chat with ChatGPT, Claude, Gemini, Llama, and custom bots in a single app.",
    pricing_tier: "Freemium",
    official_url: "https://poe.com",
    usage_steps: [
      "Open Chrome and navigate to https://poe.com.",
      "Click 'Sign In' and log in with Google, Apple, or phone number.",
      "Select any chatbot from the left sidebar (e.g. Claude-3.5-Sonnet, GPT-4o, Llama-3).",
      "Type your prompt in the chat input or build your own custom bot using system instructions.",
      "Switch between models instantly to compare responses to the same prompt."
    ],
    ranking_score: 93,
    tutorial_video_url: "https://youtu.be/In6FykVEnCo",
    pros: ["Access multiple AI models under one subscription", "Easily build and monetize custom bots", "Clean unified chat interface"],
    cons: ["Points-based daily limit on top-tier models", "Requires paid plan for unlimited heavy access"]
  },

  // --- AI Writing ---
  {
    name: "Jasper",
    category: "AI Writing",
    description: "A premium AI content platform built for enterprise copywriting, marketing campaigns, blogs, and brand voice positioning.",
    pricing_tier: "Paid",
    official_url: "https://jasper.ai",
    usage_steps: [
      "Open Chrome and go to https://jasper.ai.",
      "Click 'Try Jasper Free' or 'Log In' using your company email.",
      "Upload your company's brand voice guidelines, tone examples, and style guides in Brand Hub.",
      "Select a marketing template (e.g., Blog Post Starter, AIDA Copy, Social Campaign).",
      "Enter product details and target audience, then click 'Generate Copy'.",
      "Edit inline, run SEO checks, and export directly to WordPress or Google Docs."
    ],
    ranking_score: 88,
    tutorial_video_url: "https://youtu.be/W9y2rodf7Zg",
    pros: ["Outstanding brand-voice personalization", "Campaign templates accelerate content calendars", "Built-in SEO integrations"],
    cons: ["No free tier available", "Steep learning curve for advanced multi-asset workflows"]
  },
  {
    name: "WriteSonic",
    category: "AI Writing",
    description: "An SEO-optimized article writer and landing page copy generator with built-in factual web-grounding.",
    pricing_tier: "Freemium",
    official_url: "https://writesonic.com",
    usage_steps: [
      "Open Chrome and navigate to https://writesonic.com.",
      "Click 'Sign Up Free' and authenticate via Google or email.",
      "Select 'AI Article Writer 5.0' from the template library.",
      "Input target keywords, select competitor articles from search results as references, and build an outline.",
      "Click 'Generate Article' to produce an SEO-optimized draft.",
      "Review the SEO score gauge, polish phrasing, and publish directly to WordPress."
    ],
    ranking_score: 87,
    tutorial_video_url: "https://youtu.be/KxREs7lrZiI",
    pros: ["Factual up-to-date sources used in drafts", "Includes direct SEO analyzer checklist", "Fast, high-volume generation"],
    cons: ["Free tier credits reset slowly", "Can sometimes produce repetitive sentence structures"]
  },
  {
    name: "QuillBot",
    category: "AI Writing",
    description: "An interactive paraphrasing, grammar checking, and content re-writing tool suited for students, writers, and researchers.",
    pricing_tier: "Freemium",
    official_url: "https://quillbot.com",
    usage_steps: [
      "Open Chrome and navigate to https://quillbot.com.",
      "No mandatory login required for basic use; click 'Log In' for account syncing.",
      "Paste your paragraph into the left input box.",
      "Choose a mode: Standard, Fluency, Formal, Academic, or Creative.",
      "Adjust the 'Synonyms' slider to control vocabulary changes and click 'Paraphrase'.",
      "Click individual highlighted words in the right box to choose custom synonym replacements."
    ],
    ranking_score: 91,
    tutorial_video_url: "https://youtu.be/8_Xfp6liyoc",
    pros: ["Incredibly intuitive synonym-swapping dropdowns", "Very fast processing times", "Excellent native browser extensions"],
    cons: ["Free tier restricts text length to 125 words per run", "Can lose original context if synonym slider is maxed"]
  },

  // --- Image Generation ---
  {
    name: "Midjourney",
    category: "Image Generation",
    description: "The gold standard for generative AI imagery, producing photorealistic graphics, artistic renderings, and cinematic textures.",
    pricing_tier: "Paid",
    official_url: "https://midjourney.com",
    usage_steps: [
      "Open Chrome and visit https://midjourney.com (or join their Discord server).",
      "Log in with your Discord account or Midjourney web credentials.",
      "Navigate to the web generator or a '#general' channel on Discord.",
      "Type your prompt: `/imagine prompt: [Subject], [Lighting], [Camera Angle] --ar 16:9 --v 6.0`.",
      "Review the 4 generated image options; click 'U' to upscale or 'V' for variations.",
      "Right-click or click download to save the full high-resolution artwork."
    ],
    ranking_score: 97,
    tutorial_video_url: "https://youtu.be/9WVZbitXbck",
    pros: ["Unmatched aesthetic realism and artistic quality", "Superb texture rendering", "Great aspect ratio flexibility"],
    cons: ["Requires paid subscription plan", "Prompt parameters (--ar, --v) take time to master"]
  },
  {
    name: "DALL-E 3",
    category: "Image Generation",
    description: "OpenAI's prompt-intuitive image generator, integrated natively inside ChatGPT for conversational image creation and editing.",
    pricing_tier: "Freemium",
    official_url: "https://chatgpt.com",
    usage_steps: [
      "Open Chrome and go to https://chatgpt.com.",
      "Log in with your OpenAI account.",
      "In the prompt box, ask ChatGPT in simple English: 'Create an image of [your idea]'.",
      "ChatGPT expands your prompt automatically and renders the image.",
      "Click the image to view the expanded prompt or click the edit brush to select zones to modify.",
      "Click the Download button in top right to save the high-res PNG."
    ],
    ranking_score: 92,
    tutorial_video_url: "https://youtu.be/dznRyGdBudU",
    pros: ["Incredible prompt compliance", "Renders text inside images accurately", "Direct conversational adjustments"],
    cons: ["Lacks cinematic texture depth of Midjourney", "Strict safety filters"]
  },
  {
    name: "Stable Diffusion",
    category: "Image Generation",
    description: "An open-source, highly customizable image generation model running locally or on web platforms like Clipdrop.",
    pricing_tier: "Free",
    official_url: "https://stability.ai",
    usage_steps: [
      "Open Chrome and go to https://clipdrop.co/stable-diffusion (or set up Automatic1111 locally).",
      "Enter your positive prompt describing desired elements.",
      "Enter a negative prompt (e.g. 'blurry, low quality, distorted hands') to exclude unwanted details.",
      "Select aspect ratio and style checkpoint (e.g., SDXL 1.0).",
      "Click 'Generate' and download your artwork."
    ],
    ranking_score: 94,
    tutorial_video_url: "https://youtu.be/CWoZbpgL0aw",
    pros: ["100% free open-source core model", "Complete creative control via ControlNet", "No mandatory online limits for local runs"],
    cons: ["High GPU hardware requirements for local install", "Complex interface for beginners"]
  },

  // --- Video Editing ---
  {
    name: "HeyGen",
    category: "Video Editing",
    description: "A leading AI video generator that creates photorealistic speaking avatars with voice cloning from simple text scripts.",
    pricing_tier: "Freemium",
    official_url: "https://heygen.com",
    usage_steps: [
      "Open Chrome and visit https://heygen.com.",
      "Click 'Get Started for Free' and log in with Google or email.",
      "Choose an avatar from the studio gallery or record a 2-minute video to build an instant custom digital avatar.",
      "Type or paste your video script into the text panel and select a cloned or AI voice.",
      "Select a video template (16:9 for YouTube, 9:16 for TikTok/Reels) and click 'Submit'.",
      "Wait for rendering to complete and download your MP4 spokesperson video."
    ],
    ranking_score: 93,
    tutorial_video_url: "https://youtu.be/RTmlxuroR50",
    pros: ["Unbelievably accurate lip-sync and facial expressions", "Multi-language voice translation on video", "Huge production time savings"],
    cons: ["Free tier provides limited video credits", "High resolution rendering takes processing time"]
  },
  {
    name: "Runway Gen-2",
    category: "Video Editing",
    description: "A powerful text-to-video and image-to-video generator capable of generating cinematic video clips from photos or prompts.",
    pricing_tier: "Freemium",
    official_url: "https://runwayml.com",
    usage_steps: [
      "Open Chrome and go to https://runwayml.com.",
      "Click 'Try Runway for Free' and log in.",
      "Select 'Gen-2: Text/Image to Video' from the dashboard.",
      "Upload a high-res reference image or type a detailed camera motion prompt (e.g. 'Drone view flying over mountains').",
      "Use Motion Brush to highlight specific areas of the image to animate.",
      "Click 'Generate 4s Video' and export your MP4 clip."
    ],
    ranking_score: 90,
    tutorial_video_url: "https://youtu.be/5JWNDiJu7VY",
    pros: ["Excellent motion control overlays", "Generates video from static photos brilliantly", "Constantly improving video quality"],
    cons: ["Video length capped at 4-15 seconds per run", "Occasional morphing artifacts"]
  },

  // --- Coding Assistants ---
  {
    name: "GitHub Copilot",
    category: "Coding Assistants",
    description: "The pioneer AI pair programmer, suggesting lines and complete functions directly inside VS Code and IDEs.",
    pricing_tier: "Paid",
    official_url: "https://github.com/features/copilot",
    usage_steps: [
      "Open VS Code, JetBrains, or your preferred IDE.",
      "Install the 'GitHub Copilot' extension from the Extensions marketplace.",
      "Sign in with your GitHub account containing an active Copilot subscription.",
      "Start typing code or write a descriptive comment (e.g. `// Function to calculate fibonacci sequence`).",
      "Press Tab to accept grey ghost suggestions or press Alt+] to cycle alternative completions.",
      "Use Cmd+I / Ctrl+I to open Copilot Inline Chat to rewrite code blocks."
    ],
    ranking_score: 96,
    tutorial_video_url: "https://youtu.be/n0NlxUyA7FI?list=PL0lo9MOBetEFc6rN_y9-YKA3plCSUb1NP",
    pros: ["Blazing fast autocompletes in-editor", "Supports almost all programming languages", "Understands local workspace context"],
    cons: ["Costs $10/month after trial", "Can suggest deprecated code if unguided"]
  },
  {
    name: "Cursor",
    category: "Coding Assistants",
    description: "An advanced fork of VS Code engineered specifically for AI-first programming with inline edits and full codebase indexing.",
    pricing_tier: "Freemium",
    official_url: "https://cursor.com",
    usage_steps: [
      "Open Chrome and navigate to https://cursor.com.",
      "Download and install the Cursor application for Mac/Windows/Linux.",
      "Import your VS Code extensions and settings in one click.",
      "Open your codebase folder in Cursor.",
      "Press Cmd+K / Ctrl+K to request inline code modifications or press Cmd+L / Ctrl+L to open codebase chat.",
      "Use `@Files` or `@Codebase` to let the AI reference your whole repository."
    ],
    ranking_score: 98,
    tutorial_video_url: "https://youtu.be/ocMOZpuAMw4",
    pros: ["Outstanding multi-file editing capabilities", "Incredibly fast codebase indexing", "Seamless diff preview"],
    cons: ["Fast-tier AI usage is capped on free tier", "Requires installing Cursor IDE application"]
  },

  // --- Presentation Tools ---
  {
    name: "Gamma",
    category: "Presentation Tools",
    description: "A modern alternative to PowerPoint that generates beautiful, interactive presentation decks, webpage mockups, and briefs in seconds.",
    pricing_tier: "Freemium",
    official_url: "https://gamma.app",
    usage_steps: [
      "Open Chrome or your browser and navigate to https://gamma.app.",
      "Click 'Sign Up Free' or 'Log In' in the top right corner. Choose 'Continue with Google' or register with your email.",
      "On your Gamma dashboard, click 'New with AI' or 'Generate Presentation'.",
      "Select your format: 'Presentation' (slides deck), 'Document', or 'Webpage'.",
      "Type your topic or paste your outline/notes into the input box (e.g. 'Future of Artificial Intelligence in Business').",
      "Pick a visual theme preset (e.g. Retro, Cyberpunk, Minimalist Light) and click 'Generate Deck'.",
      "Use the AI side editor or drag cards to add images, videos, maps, or interactive polls.",
      "Click 'Export' at top right to download as PDF / PowerPoint (.pptx) or copy the public web link."
    ],
    ranking_score: 93,
    tutorial_video_url: "https://youtu.be/KcbXKUR7-a0",
    pros: ["Stunning modern design layouts", "Interactive embeds (videos, forms) work live in slides", "Responsive deck viewing on mobile"],
    cons: ["Custom branding requires Pro tier", "Credits decrease during heavy revision cycles"]
  },

  // --- Voice/Audio ---
  {
    name: "ElevenLabs",
    category: "Voice/Audio",
    description: "The gold standard for ultra-realistic AI voice synthesis, text-to-speech, and voice cloning in 29+ languages.",
    pricing_tier: "Freemium",
    official_url: "https://elevenlabs.io",
    usage_steps: [
      "Open Chrome and go to https://elevenlabs.io.",
      "Click 'Sign Up' and log in using Google or email.",
      "Select 'Speech Synthesis' from the left navigation menu.",
      "Choose a voice profile from the library (e.g., Adam, Rachel, Bella) or upload audio to clone a voice.",
      "Paste your text narrative, adjust Stability and Clarity sliders, and click 'Generate Speech'.",
      "Listen to the generated preview and click Download to save the MP3 file."
    ],
    ranking_score: 97,
    tutorial_video_url: "https://youtu.be/yDTbAxJ3sKI",
    pros: ["Flawless vocal inflections, breathing, and emotional nuance", "Supports 29+ languages", "Realistic voice cloning"],
    cons: ["Free tier character quota resets monthly", "Consumes credits fast on audiobooks"]
  },

  // --- Design ---
  {
    name: "Canva Magic Design",
    category: "Design",
    description: "An AI design generator that turns text prompts and images into complete social graphics, presentations, and brand templates.",
    pricing_tier: "Freemium",
    official_url: "https://canva.com",
    usage_steps: [
      "Open Chrome and navigate to https://canva.com.",
      "Click 'Log in' or 'Sign up' with Google or email.",
      "Click the 'Magic Studio' tab on the left dashboard.",
      "Type a prompt into 'Magic Design' (e.g., 'A modern promotional poster for a tech conference').",
      "Upload your company logo or product photo to customize brand colors.",
      "Drag and edit text, adjust fonts, and click 'Share' -> 'Download' to save as PNG/PDF."
    ],
    ranking_score: 91,
    tutorial_video_url: "https://youtu.be/tb2LqkNQUko",
    pros: ["Massive template and stock asset library", "Drag-and-drop customization", "Great presentation generators"],
    cons: ["Pro templates require Canva Pro subscription", "AI designs can occasionally look templated"]
  },

  // --- PDF & Document Converters ---
  {
    name: "ILovePDF",
    category: "PDF & Document Tools",
    description: "The world's most popular free online PDF utility. Convert PDF to Word (.docx), merge, split, compress, and edit documents instantly with flawless formatting.",
    pricing_tier: "Freemium",
    official_url: "https://www.ilovepdf.com/pdf_to_word",
    usage_steps: [
      "Open Chrome and visit https://www.ilovepdf.com/pdf_to_word.",
      "Click 'Select PDF file' or drag and drop your PDF file directly into the converter box.",
      "Choose 'No OCR' for standard PDFs or enable 'OCR' to extract editable text from scanned image PDFs.",
      "Click the big red 'Convert to WORD' button.",
      "Wait 2 seconds for processing to finish, then click 'Download WORD' to save your editable .docx file."
    ],
    ranking_score: 99,
    tutorial_video_url: "https://youtu.be/9LJRm3MMttw",
    pros: ["100% Free core conversion", "Preserves original fonts, columns, and image alignment", "Fast bulk conversion"],
    cons: ["Batch conversion of 10+ large files requires Premium", "Max file size limits on free tier"]
  },
  {
    name: "Adobe Acrobat AI",
    category: "PDF & Document Tools",
    description: "Adobe's official PDF to Word converter and document intelligence platform. Industry standard for layout retention and AI document summaries.",
    pricing_tier: "Freemium",
    official_url: "https://www.adobe.com/acrobat/online/pdf-to-word.html",
    usage_steps: [
      "Open Chrome and visit https://www.adobe.com/acrobat/online/pdf-to-word.html.",
      "Click 'Select a file' or drag your PDF document onto the drop area.",
      "Log in with Google or Adobe account to enable cloud editing and AI summary.",
      "Acrobat automatically converts your file to DOCX with original layout formatting.",
      "Click 'Download' or open in Microsoft Word for Web directly."
    ],
    ranking_score: 98,
    tutorial_video_url: "https://youtu.be/VMralq_Et68",
    pros: ["Gold-standard Adobe engine for exact visual fidelity", "Integrated AI Assistant for summarizing PDFs", "Bank-level security & encryption"],
    cons: ["Requires free Adobe account sign-in", "Full offline desktop suite requires subscription"]
  },
  {
    name: "Smallpdf",
    category: "PDF & Document Tools",
    description: "A top-rated global PDF workspace offering fast PDF to Word conversion, OCR text recognition, digital signing, and compression.",
    pricing_tier: "Freemium",
    official_url: "https://smallpdf.com/pdf-to-word",
    usage_steps: [
      "Open Chrome and navigate to https://smallpdf.com/pdf-to-word.",
      "Drag your PDF into the blue conversion box.",
      "Select 'Convert selectable text' (Free) or 'Convert text from scanned pages (OCR)' (Pro).",
      "Click 'Choose option' and let Smallpdf process your document.",
      "Click 'Download' or export directly to Google Drive or Dropbox."
    ],
    ranking_score: 96,
    tutorial_video_url: "https://youtu.be/3vhQsVjaO78",
    pros: ["Ultra-clean intuitive interface", "Direct cloud drive exports", "Supports mobile browser conversion"],
    cons: ["2 free document conversions per day limit", "Pro plan needed for heavy OCR"]
  },
  {
    name: "PDF2Go",
    category: "PDF & Document Tools",
    description: "A powerful free online PDF converter and document editor to transform PDFs into Word, Excel, PowerPoint, and images.",
    pricing_tier: "Free",
    official_url: "https://www.pdf2go.com/pdf-to-word",
    usage_steps: [
      "Open Chrome and go to https://www.pdf2go.com/pdf-to-word.",
      "Click 'Choose File' or paste a URL / Cloud link.",
      "Select target format (DOC or DOCX) and choose OCR language if needed.",
      "Click 'START' to initiate conversion.",
      "Download your converted Word file or save it as a ZIP archive."
    ],
    ranking_score: 92,
    tutorial_video_url: "https://youtu.be/EiZVXjARhuA",
    pros: ["No account registration required", "Supports older .doc as well as modern .docx", "100% free online conversion"],
    cons: ["Slightly slower queue speeds during peak usage", "Ad banners on free web page"]
  },
  {
    name: "Soda PDF",
    category: "PDF & Document Tools",
    description: "Full-featured web PDF suite to convert digital and scanned PDFs to Microsoft Word with accurate page formatting.",
    pricing_tier: "Freemium",
    official_url: "https://www.sodapdf.com/pdf-to-word/",
    usage_steps: [
      "Open Chrome and navigate to https://www.sodapdf.com/pdf-to-word/.",
      "Upload your PDF file from your computer or Google Drive.",
      "Click 'Convert' to trigger the online conversion engine.",
      "Download the Word document to your computer."
    ],
    ranking_score: 90,
    tutorial_video_url: "https://youtu.be/lyLnhiOdF-A",
    pros: ["Great desktop and web parity", "Batch document handling", "Rich annotation tools"],
    cons: ["Free version limits daily conversions", "Frequent upgrade prompts"]
  },
  {
    name: "ChatPDF",
    category: "PDF & Document Tools",
    description: "An AI document reader that lets you chat directly with any PDF file—ask questions, extract key quotes, and summarize lengthy manuals instantly.",
    pricing_tier: "Freemium",
    official_url: "https://www.chatpdf.com",
    usage_steps: [
      "Open Chrome and visit https://www.chatpdf.com.",
      "Drop any PDF document (research paper, manual, textbook, contract) into the upload box.",
      "ChatPDF immediately creates a chatbot trained on your document.",
      "Ask specific questions like 'What are the main conclusions?' or 'Summarize section 3'.",
      "Click the page number references in the AI answer to jump directly to the original page."
    ],
    ranking_score: 95,
    tutorial_video_url: "https://youtu.be/EmXltoyXHH8",
    pros: ["Zero setup needed", "Direct page citations for all answers", "Multi-language document support"],
    cons: ["Free plan limited to 120 pages per PDF", "Maximum 3 PDFs per day on free tier"]
  },

  // --- AI Music & Song Generators ---
  {
    name: "Suno AI",
    category: "Voice & Audio",
    description: "The world's leading AI music generator capable of producing full studio-quality songs with lyrics, vocals, and realistic instrumentation from a simple prompt.",
    pricing_tier: "Freemium",
    official_url: "https://suno.com",
    usage_steps: [
      "Open Chrome and go to https://suno.com.",
      "Click 'Create' and sign in with Google or Discord.",
      "Toggle 'Custom' mode if you want to write your own lyrics, or enter a prompt description like 'An upbeat synthwave pop song about night driving'.",
      "Click 'Create' to generate two distinct 2-minute audio tracks with vocals.",
      "Listen, extend the track into a full 4-minute song, and download as MP3 or MP4 video."
    ],
    ranking_score: 98,
    tutorial_video_url: "https://youtu.be/72R1NjNaUnE",
    pros: ["Unbelievable vocal quality and lyric rhyming", "Creates full songs across any genre in 15 seconds", "Free daily credits"],
    cons: ["Commercial use requires Pro plan", "Occasional audio clipping on heavy bass tracks"]
  },
  {
    name: "Udio AI",
    category: "Voice & Audio",
    description: "Next-generation AI music creation platform created by former Google DeepMind researchers, offering exceptional vocal fidelity and genre control.",
    pricing_tier: "Freemium",
    official_url: "https://www.udio.com",
    usage_steps: [
      "Open Chrome and visit https://www.udio.com.",
      "Sign in with your Google or Twitter account.",
      "Describe the song style (e.g., '1970s soulful funk track with expressive female lead voice').",
      "Click 'Create' to render two 32-second song snippets.",
      "Use 'Extend' to add intro/outro sections and polish the mix before downloading."
    ],
    ranking_score: 96,
    tutorial_video_url: "https://youtu.be/XXyq_x-7Mfg",
    pros: ["Rich acoustic resonance and warm vocal textures", "Advanced stem separation options", "Generous daily creation credits"],
    cons: ["Extending tracks requires precise prompt timing", "Slightly longer generation times"]
  },

  // --- More Presentation Tools ---
  {
    name: "Tome AI",
    category: "Presentation Tools",
    description: "AI-powered storytelling and presentation builder that builds complete visual slide decks, pitch proposals, and interactive web pages.",
    pricing_tier: "Freemium",
    official_url: "https://tome.app",
    usage_steps: [
      "Open Chrome and visit https://tome.app.",
      "Log in with Google and click 'Create'.",
      "Type a prompt like 'A pitch deck for an eco-friendly EV battery startup'.",
      "Tome automatically generates structured slides with headers, narrative text, and DALL-E generated visuals.",
      "Edit slide text, embed Figma prototypes or live web views, and share via URL."
    ],
    ranking_score: 92,
    tutorial_video_url: "https://youtu.be/gagDblJWwi8",
    pros: ["Sleek modern dark-mode aesthetic", "Interactive embeds work live in presentation mode", "Fast deck outline generation"],
    cons: ["PDF export requires paid subscription", "Fewer traditional slide layout controls"]
  },
  {
    name: "Beautiful.ai",
    category: "Presentation Tools",
    description: "Smart slide design software with automated adaptive layout engines that keep fonts, spacing, and brand colors aligned effortlessly.",
    pricing_tier: "Paid",
    official_url: "https://www.beautiful.ai",
    usage_steps: [
      "Open Chrome and navigate to https://www.beautiful.ai.",
      "Start a free trial or log in to your account.",
      "Pick a smart slide template or type a prompt into DesignerBot AI.",
      "Add content or data—charts and diagrams auto-resize dynamically as you type.",
      "Export your completed presentation directly to PowerPoint (.pptx) or PDF."
    ],
    ranking_score: 91,
    tutorial_video_url: "https://youtu.be/YiWrqmembVo",
    pros: ["Automatic alignment stops messy slide formatting", "Direct .pptx export with editable vectors", "Great corporate chart options"],
    cons: ["No permanent free tier (trial only)", "Can feel restrictive if you want total custom alignment"]
  },

  // --- More Image Generation ---
  {
    name: "Leonardo.ai",
    category: "Image Generation",
    description: "Feature-rich generative AI art and game asset platform offering fine-tuned visual models, canvas editing, and 3D texture synthesis.",
    pricing_tier: "Freemium",
    official_url: "https://leonardo.ai",
    usage_steps: [
      "Open Chrome and visit https://leonardo.ai.",
      "Sign in with Google, Apple, or Microsoft.",
      "Select a fine-tuned model (e.g. Leonardo Phoenix, Absolute Reality, Anime XL).",
      "Enter your prompt and choose style preset (Photoreal, Cinematic, Anime, 3D).",
      "Click 'Generate' (150 free token refreshes daily) and upscale your favorite artwork."
    ],
    ranking_score: 95,
    tutorial_video_url: "https://youtu.be/jaJnZH9gH2w",
    pros: ["150 free creation tokens every day", "Incredible control over image styles and seeds", "Canvas real-time painting editor"],
    cons: ["Dense interface with many settings for beginners", "High-res alchemy mode consumes tokens faster"]
  },
  {
    name: "Ideogram AI",
    category: "Image Generation",
    description: "Best-in-class AI image generator specialized in rendering perfect, legible typography, logo text, T-shirt prints, and graphic design posters.",
    pricing_tier: "Freemium",
    official_url: "https://ideogram.ai",
    usage_steps: [
      "Open Chrome and go to https://ideogram.ai.",
      "Sign in with your Google account.",
      "Type a prompt containing exact text quotes (e.g. 'A neon sign in a rainy alley reading \"NEON DREAMS\"').",
      "Select aspect ratio (1:1, 16:9, 9:16) and visual style tags.",
      "Click 'Generate' and download your high-resolution image."
    ],
    ranking_score: 94,
    tutorial_video_url: "https://youtu.be/NENTuJ1y-J4",
    pros: ["Flawless text spelling inside images", "Great for logo and merchandise design", "100% free daily generations"],
    cons: ["Free images are publicly visible on the community feed", "Fast queue requires subscription"]
  },

  // --- More Coding Assistants ---
  {
    name: "v0 by Vercel",
    category: "Coding Assistants",
    description: "Generative UI system by Vercel that converts natural language descriptions or design screenshots into clean, production-ready React and Tailwind CSS components.",
    pricing_tier: "Freemium",
    official_url: "https://v0.dev",
    usage_steps: [
      "Open Chrome and navigate to https://v0.dev.",
      "Sign in with GitHub or Vercel account.",
      "Describe a UI component or upload a screenshot mockup (e.g., 'A modern analytics dashboard header with dark mode toggle').",
      "v0 generates three interactive React + Tailwind CSS code variations.",
      "Copy the React code or install directly into your app using `npx v0 add`."
    ],
    ranking_score: 97,
    tutorial_video_url: "https://youtu.be/41SR07p243Q",
    pros: ["Generates exceptionally clean Tailwind CSS code", "Supports shadcn/ui components out of the box", "Live interactive preview iframe"],
    cons: ["Free credits refresh monthly", "Primarily focused on frontend UI rather than backend logic"]
  },
  {
    name: "Replit Agent",
    category: "Coding Assistants",
    description: "Autonomous software engineer built into Replit that plans, builds, installs dependencies, and deploys full-stack web applications from plain natural language.",
    pricing_tier: "Freemium",
    official_url: "https://replit.com",
    usage_steps: [
      "Open Chrome and visit https://replit.com.",
      "Log in and click 'Create Repl' -> select 'Replit Agent'.",
      "Describe what app you want to build (e.g. 'A real-time multiplayer chess game with database storage').",
      "Watch Replit Agent write code, set up the database schema, and test local execution.",
      "Click 'Deploy' to publish your app directly to a live web URL."
    ],
    ranking_score: 96,
    tutorial_video_url: "https://youtu.be/xpc5aRLTa8s",
    pros: ["Builds complete full-stack apps autonomously", "Handles database provisioning and API keys", "One-click deployment"],
    cons: ["Requires Replit Core membership for heavy usage", "Complex multi-file debugging can take processing minutes"]
  },

  // --- AI Productivity & Notes ---
  {
    name: "Notion AI",
    category: "Productivity & Notes",
    description: "Integrated workspace assistant that writes, summarizes, answers questions across your team's documents, and automates project databases.",
    pricing_tier: "Freemium",
    official_url: "https://www.notion.so",
    usage_steps: [
      "Open Chrome and navigate to https://www.notion.so.",
      "Sign in to your Notion workspace.",
      "Press Spacebar on any new line or highlight existing text to bring up Notion AI.",
      "Select 'Summarize', 'Brainstorm ideas', 'Fix spelling & grammar', or ask questions about your workspace notes.",
      "Use Q&A mode to query your entire company wiki in natural language."
    ],
    ranking_score: 96,
    tutorial_video_url: "https://youtu.be/rQ4oa-9lje8",
    pros: ["Directly integrated into your existing notes and docs", "Reads across your entire team workspace", "Excellent summary tables"],
    cons: ["Notion AI add-on costs $8–$10/user/month", "Requires organized Notion structure for best Q&A results"]
  },
  {
    name: "Otter.ai",
    category: "Productivity & Notes",
    description: "AI meeting assistant that automatically records, transcribes, summarizes key action items, and answers questions during Zoom, Teams, and Google Meet calls.",
    pricing_tier: "Freemium",
    official_url: "https://otter.ai",
    usage_steps: [
      "Open Chrome and go to https://otter.ai.",
      "Sign up with Google or Microsoft work calendar.",
      "Connect your Google Calendar so OtterPilot automatically joins scheduled video calls.",
      "During the meeting, view live real-time speech transcription and slide capture.",
      "After the meeting, review the automated executive summary and export key action items to Slack or Jira."
    ],
    ranking_score: 94,
    tutorial_video_url: "https://youtu.be/yUxlIDKIHhA",
    pros: ["Never miss meeting notes or action items", "Captures presented slides automatically", "300 free transcription minutes per month"],
    cons: ["Requires permission to join meeting calls", "Can misidentify speaker names if voices overlap"]
  },

  // --- AI Research & Academic ---
  {
    name: "Consensus AI",
    category: "Academic Research",
    description: "An AI search engine for scientific research that searches over 200 Million peer-reviewed academic papers to deliver evidence-backed answers.",
    pricing_tier: "Freemium",
    official_url: "https://consensus.app",
    usage_steps: [
      "Open Chrome and visit https://consensus.app.",
      "Sign up for a free account.",
      "Ask a direct scientific question (e.g., 'Does intermittent fasting improve insulin sensitivity?').",
      "Consensus analyzes top peer-reviewed papers and displays a 'Consensus Meter' showing agreement percentage across studies.",
      "Read key extracted findings and click to view full PubMed / journal papers."
    ],
    ranking_score: 96,
    tutorial_video_url: "https://youtu.be/I8VC6R7-J6M",
    pros: ["Strictly relies on peer-reviewed scientific literature", "No hallucinated facts or unverified blog sources", "Synthesizes paper consensus meters"],
    cons: ["Limited to academic scientific studies", "Pro search requires subscription"]
  },

  // --- AI Math & Homework Solvers ---
  {
    name: "Photomath AI",
    category: "Math & Homework",
    description: "Google's AI math learning app that scans handwritten or typed math equations and provides step-by-step explanations and graph visualizations.",
    pricing_tier: "Free",
    official_url: "https://photomath.com",
    usage_steps: [
      "Open Chrome on desktop or mobile and navigate to https://photomath.com.",
      "Upload an image or snap a photo of any math problem (algebra, calculus, trigonometry, statistics).",
      "Photomath instantly solves the equation and breaks down every algebraic step in detail.",
      "Click 'Show Solving Steps' or view interactive 2D function graphs."
    ],
    ranking_score: 97,
    tutorial_video_url: "https://youtu.be/V7IF0kauzac",
    pros: ["100% Free core math solver", "Step-by-step pedagogical breakdown for learning", "Recognizes handwritten math problems"],
    cons: ["Advanced textbook deep animated tutorials require Plus", "Word problems require precise phrasing"]
  },

  // --- AI Resume & Career Builders ---
  {
    name: "Resume.io AI",
    category: "Resume & Career",
    description: "An AI resume and cover letter builder offering ATS-friendly professional templates, automated bullet-point suggestions, and job description matching.",
    pricing_tier: "Freemium",
    official_url: "https://resume.io",
    usage_steps: [
      "Open Chrome and visit https://resume.io.",
      "Select a professional ATS-optimized resume template.",
      "Enter your job target title (e.g., 'Software Engineer' or 'Marketing Manager').",
      "Use AI phrase suggestions to generate impactful metric-driven work experience bullet points.",
      "Click 'Download PDF' or share your interactive web resume link."
    ],
    ranking_score: 93,
    tutorial_video_url: "https://youtu.be/xj0oVcsD600?list=PLtiFbXwnmy60ZmP5tRhdOqDCVc2PzWErf",
    pros: ["Passes Applicant Tracking Systems (ATS) cleanly", "Tailored bullet points for over 500 job titles", "Matching cover letter builder"],
    cons: ["PDF download requires 7-day trial or plan", "Limited custom font controls on free preview"]
  },

  // --- More Top Chatbots ---
  {
    name: "DeepSeek AI",
    category: "AI Chatbots & LLMs",
    description: "Open-weights reasoning AI engine (DeepSeek-R1 & V3) providing top-tier math, logic, complex reasoning, and coding benchmarks for free.",
    pricing_tier: "Free",
    official_url: "https://chat.deepseek.com",
    usage_steps: [
      "Open Chrome and navigate to https://chat.deepseek.com.",
      "Sign in with Google, GitHub, or email.",
      "Toggle 'DeepSeek-R1' for chain-of-thought mathematical reasoning or 'DeepSeek-V3' for fast general chat.",
      "Type complex math proofs, coding logic queries, or detailed analytical prompts.",
      "Inspect the visible 'Thought' step-by-step reasoning dropdown before reading the final solution."
    ],
    ranking_score: 99,
    tutorial_video_url: "https://youtu.be/_8tcA9-14JQ",
    pros: ["100% Free core reasoning model", "State-of-the-art mathematical and coding benchmarks", "Visible step-by-step thinking process"],
    cons: ["Occasional server queue timeouts during viral global peak hours", "Strict message rate limits during high load"]
  },
  {
    name: "Grok AI (xAI)",
    category: "AI Chatbots & LLMs",
    description: "Elon Musk's xAI chatbot with direct real-time access to X (formerly Twitter) trends, news breaking updates, multimodal understanding, and fun unhinged mode.",
    pricing_tier: "Freemium",
    official_url: "https://grok.x.ai",
    usage_steps: [
      "Open Chrome and visit https://grok.x.ai or open X (Twitter).",
      "Sign in with your X account.",
      "Select 'Grok-2' or 'Grok-2 mini'.",
      "Ask about current breaking news stories happening live right now on social media.",
      "Toggle between 'Fun Mode' or 'Regular Mode' to suit your preferred conversational tone."
    ],
    ranking_score: 95,
    tutorial_video_url: "https://youtu.be/TAirq97G7ow",
    pros: ["Up-to-the-second real-time social news integration", "High-speed multimodal image generation and vision", "Uncensored conversational options"],
    cons: ["Requires X subscription or account", "Information on viral news can inherit unverified user tweets"]
  },

  // --- More Coding Assistants ---
  {
    name: "Blackbox AI",
    category: "Coding Assistants",
    description: "AI-powered coding assistant and code search engine built to autocomplete code, convert text to code, and extract code from YouTube videos or images.",
    pricing_tier: "Freemium",
    official_url: "https://www.blackbox.ai",
    usage_steps: [
      "Open Chrome and visit https://www.blackbox.ai.",
      "Type a coding task like 'How to send an email in Node.js using Nodemailer' or paste an error trace.",
      "Blackbox outputs clean code snippets with copy-paste buttons.",
      "Install the Blackbox VS Code Extension for inline autocomplete inside your code editor."
    ],
    ranking_score: 94,
    tutorial_video_url: "https://youtu.be/xuDbclp9tks",
    pros: ["Extremely fast code generation and error searching", "VS Code extension works inline", "Extracts code text directly from video tutorials"],
    cons: ["Free daily search limits", "Pro tier needed for advanced repo indexing"]
  },
  {
    name: "Bolt.new (StackBlitz)",
    category: "Coding Assistants",
    description: "In-browser AI web application developer that creates, installs packages, runs Node dev servers, and deploys full-stack React / Vite / Next.js apps live.",
    pricing_tier: "Freemium",
    official_url: "https://bolt.new",
    usage_steps: [
      "Open Chrome and navigate to https://bolt.new.",
      "In the prompt bar, describe the web application you want to create (e.g., 'A Kanban project management board with drag-and-drop and dark mode').",
      "Bolt provisions a WebContainer container inside your browser, installs npm dependencies, and runs the live dev server preview.",
      "Chat with the AI to refine UI styles or add features.",
      "Click 'Deploy' or push directly to GitHub."
    ],
    ranking_score: 98,
    tutorial_video_url: "https://youtu.be/vB6JUrqnUTo",
    pros: ["Runs full WebContainer environments entirely inside browser", "Instant interactive live preview iframe", "One-click Netlify / Vercel deployment"],
    cons: ["Daily token limit on free tier", "Complex heavy backend servers can hit memory caps"]
  },

  // 🏋️ --- Fitness & Workout AI ---
  {
    name: "Fitbod AI",
    category: "Fitness & Workout AI",
    description: "Personalized AI strength training app that builds custom gym or home workouts based on your available equipment, fatigue levels, and recovery science.",
    pricing_tier: "Freemium",
    official_url: "https://fitbod.me",
    usage_steps: [
      "Open Chrome or download Fitbod from https://fitbod.me.",
      "Select your fitness goal (Muscle Building, Tone, Weight Loss) and select your gym equipment (Dumbbells, Barbells, Bodyweight).",
      "Fitbod calculates optimal set numbers, repetition targets, and resistance weights based on your muscle recovery heatmap.",
      "Log completed sets—Fitbod continuously adjusts future weights as you gain strength."
    ],
    ranking_score: 97,
    tutorial_video_url: "https://youtu.be/cgidALj_Cs8",
    pros: ["Automates weight progression and progressive overload", "Calculates muscle fatigue science per group", "Supports home bodyweight & full gym setups"],
    cons: ["Free plan offers 3 trial workouts before subscription", "Requires logging sets manually"]
  },
  {
    name: "Freeletics AI",
    category: "Fitness & Workout AI",
    description: "AI digital personal coach offering hyper-personalized HIIT bodyweight workouts, running plans, and audio coaching tailored to your daily schedule.",
    pricing_tier: "Freemium",
    official_url: "https://www.freeletics.com",
    usage_steps: [
      "Open Chrome or download Freeletics at https://www.freeletics.com.",
      "Take the AI fitness assessment test to establish your baseline strength.",
      "Tell the AI Coach how much time you have today (e.g. 15 mins, no equipment, quiet for apartment).",
      "Follow video demonstrations for each high-intensity interval exercise."
    ],
    ranking_score: 94,
    tutorial_video_url: "https://youtu.be/qHazsXwqecw",
    pros: ["Ideal for minimal equipment and bodyweight workouts", "Adapts workout intensity dynamically based on post-session feedback", "Huge global fitness community"],
    cons: ["Requires paid Coach subscription after initial trial", "High-intensity cardio workouts are challenging for absolute beginners"]
  },
  {
    name: "Evolve AI",
    category: "Fitness & Workout AI",
    description: "Advanced AI powerlifting and physique coaching algorithm developed by world-class coaches to optimize periodization, fatigue management, and strength gains.",
    pricing_tier: "Paid",
    official_url: "https://www.evolveai.app",
    usage_steps: [
      "Visit https://www.evolveai.app.",
      "Input your squat, bench press, deadlift 1RMs and target competition dates.",
      "The Evolve AI engine generates weekly periodized training blocks.",
      "Input your daily rating of perceived exertion (RPE) to let the algorithm adjust load volume in real time."
    ],
    ranking_score: 92,
    tutorial_video_url: "https://youtu.be/NHpvJEUNMbU",
    pros: ["Top-tier powerlifting and strength periodization math", "Real-time daily load auto-regulation", "Designed by world-class strength scientists"],
    cons: ["Subscription required", "Mainly built for serious barbell powerlifters"]
  },
  {
    name: "GymGenie AI",
    category: "Fitness & Workout AI",
    description: "Instant free AI workout routine generator that crafts targeted weekly workout schedules and cardio plans based on your body goals.",
    pricing_tier: "Free",
    official_url: "https://www.gymgenie.org",
    usage_steps: [
      "Visit https://www.gymgenie.org.",
      "Select your goal (e.g. 'Build chest and arms in 4 days/week').",
      "Enter your age, weight, and equipment preferences.",
      "Click 'Generate Routine' to instantly receive a structured PDF workout schedule."
    ],
    ranking_score: 90,
    tutorial_video_url: "https://youtu.be/nzbp4bcEcQc",
    pros: ["100% Free instant generation", "Easy exportable workout sheets", "No app install required"],
    cons: ["Does not track long-term workout history", "Basic exercise guides"]
  },

  // 🌍 --- Translation AI ---
  {
    name: "DeepL Translate AI",
    category: "Translation & Multilingual AI",
    description: "The world's most accurate neural translation engine, renowned for capturing subtle linguistic nuances, idiom accuracy, and natural document translations across 30+ languages.",
    pricing_tier: "Freemium",
    official_url: "https://www.deepl.com/translator",
    usage_steps: [
      "Open Chrome and navigate to https://www.deepl.com/translator.",
      "Paste text or drag and drop a PDF/Word (.docx) file into the translator.",
      "DeepL automatically detects source language and translates to target language instantly.",
      "Click any translated word to inspect context-aware synonym alternatives."
    ],
    ranking_score: 99,
    tutorial_video_url: "https://youtu.be/hi35fAfjNc8",
    pros: ["Far more natural and contextually accurate than standard tools", "Translates entire PDF and Word files while preserving document formatting", "Great desktop and browser apps"],
    cons: ["Character limit per translation on free tier", "Supports 30+ major languages compared to Google's 100+"]
  },
  {
    name: "Google Translate AI",
    category: "Translation & Multilingual AI",
    description: "Google's universal multilingual translation service powered by neural machine translation, supporting 130+ languages, real-time camera translation, and speech conversion.",
    pricing_tier: "Free",
    official_url: "https://translate.google.com",
    usage_steps: [
      "Open Chrome and visit https://translate.google.com.",
      "Paste text, upload documents, or type a web page URL to translate entire websites.",
      "Click the Microphone icon for real-time speech translation.",
      "Listen to native audio pronunciation for both source and target languages."
    ],
    ranking_score: 97,
    tutorial_video_url: "https://youtu.be/SO_Nsm2Lo1w",
    pros: ["100% Free with unlimited daily usage", "Supports over 130 global languages and dialects", "Instant camera image translation on mobile"],
    cons: ["Can occasionally struggle with complex poetic or legal idioms", "Document layout retention is basic"]
  },
  {
    name: "Microsoft Translator AI",
    category: "Translation & Multilingual AI",
    description: "Enterprise-grade translation engine supporting real-time multi-person conversational translation, offline packs, and document translation across Office apps.",
    pricing_tier: "Free",
    official_url: "https://translator.microsoft.com",
    usage_steps: [
      "Open Chrome or download Microsoft Translator.",
      "Start a live multi-device conversation session code.",
      "Speak or type in your native language—participants see your words translated in real time in their own language."
    ],
    ranking_score: 93,
    tutorial_video_url: "https://youtu.be/3ytnQHBy1Kg",
    pros: ["Seamless real-time multi-person spoken conversation mode", "Deep integration into Microsoft Word and PowerPoint", "Offline language pack downloads"],
    cons: ["Slightly formal wording in casual chats", "Web interface is basic"]
  },

  // 📈 --- Stock & Crypto Finance AI ---
  {
    name: "Finbrain AI (Stock Analysis)",
    category: "Stock & Crypto Finance AI",
    description: "AI financial forecasting platform that predicts stock prices, analyzes market sentiment, and generates technical indicators across global equity markets.",
    pricing_tier: "Freemium",
    official_url: "https://finbrain.tech",
    usage_steps: [
      "Open Chrome and visit https://finbrain.tech.",
      "Search for stock tickers (e.g. AAPL, NVDA, TSLA).",
      "Review AI deep-learning 10-day price predictions, news sentiment scores, and technical indicators.",
      "Export AI portfolio breakdown charts."
    ],
    ranking_score: 93,
    tutorial_video_url: "https://youtu.be/htApNnmgXJI",
    pros: ["Automated news sentiment analysis", "Deep learning technical stock predictions", "Clean visual charts"],
    cons: ["Financial predictions carry inherent market risk", "Full ticker access requires premium plan"]
  },
  {
    name: "Coinrule AI (Crypto Trading)",
    category: "Stock & Crypto Finance AI",
    description: "Automated AI crypto trading strategy builder that allows traders to build rule-based automated trading bots without writing code.",
    pricing_tier: "Freemium",
    official_url: "https://coinrule.com",
    usage_steps: [
      "Open Chrome and visit https://coinrule.com.",
      "Connect your crypto exchange account (Binance, Coinbase Pro, Kraken) via secure API read/trade keys.",
      "Select an automated template (e.g., 'Trend Following Accumulator' or 'Stop Loss Protection').",
      "Test strategies in Demo Mode before launching live automated trades."
    ],
    ranking_score: 92,
    tutorial_video_url: "https://youtu.be/-1BR5Xe6FIE",
    pros: ["No programming required to build complex trading logic", "Works across top global crypto exchanges", "Free Demo practice account"],
    cons: ["Paid tier needed for high-frequency trading rules", "Cryptocurrency markets remain volatile"]
  },
  {
    name: "PortfolioPilot AI",
    category: "Stock & Crypto Finance AI",
    description: "SEC-registered AI wealth advisor that analyzes your entire investment portfolio, checks risk exposures, and recommends asset rebalancing strategies.",
    pricing_tier: "Freemium",
    official_url: "https://www.portfoliopilot.com",
    usage_steps: [
      "Visit https://www.portfoliopilot.com.",
      "Connect your brokerage accounts or manually input your stock, ETF, and crypto assets.",
      "PortfolioPilot generates an AI Health Score checking inflation resistance, fee drain, and sector risk.",
      "Review personalized rebalancing advice to optimize long-term returns."
    ],
    ranking_score: 95,
    tutorial_video_url: "https://youtu.be/UghJ56w4qYY?list=PLHfgew86AyY9DCkUlbA8ueIKDwlPsmYS3",
    pros: ["SEC-registered advisor framework", "Comprehensive portfolio risk assessment", "Institutional-level asset tracking"],
    cons: ["Free tier covers portfolio health check", "Requires connecting financial accounts for auto-sync"]
  },

  // ⚕️ --- Medical & Health AI ---
  {
    name: "Ada Health AI (Symptom Checker)",
    category: "Medical & Health AI",
    description: "CE-certified medical AI health assessment app developed by doctors to evaluate health symptoms, provide probable condition analyses, and guide next care steps.",
    pricing_tier: "Free",
    official_url: "https://ada.com",
    usage_steps: [
      "Open Chrome or download Ada at https://ada.com.",
      "Answer simple AI-guided questions about your symptoms, medical history, and age.",
      "Ada evaluates thousands of medical conditions to provide a clear, easy-to-understand probability report.",
      "Share the detailed PDF assessment report directly with your doctor."
    ],
    ranking_score: 98,
    tutorial_video_url: "https://youtu.be/e8vKelBhlcY",
    pros: ["100% Free medical symptom checker", "Developed and validated by licensed medical doctors", "Strict HIPAA & GDPR data privacy"],
    cons: ["Does not replace emergency medical diagnosis", "For informational guidance only"]
  },
  {
    name: "Glass Health AI",
    category: "Medical & Health AI",
    description: "Clinical decision support system designed for medical students and clinicians to generate differential diagnoses and evidence-based treatment plans.",
    pricing_tier: "Freemium",
    official_url: "https://glass.health",
    usage_steps: [
      "Visit https://glass.health.",
      "Type a patient clinical case summary (e.g. '65yo male presenting with acute shortness of breath and elevated BNP').",
      "Glass Health AI analyzes medical literature to suggest differential diagnostic checklists and evidence-based clinical management plans."
    ],
    ranking_score: 95,
    tutorial_video_url: "https://youtu.be/PDlOk9vgadQ",
    pros: ["Outstanding educational tool for medical professionals", "Transparent clinical citations", "Accelerates diagnostic drafting"],
    cons: ["Intended strictly for licensed healthcare professionals and students", "Requires medical terminology knowledge"]
  },

  // 🍽️ --- Food & Meal Planning AI ---
  {
    name: "Eat This Much AI",
    category: "Food & Nutrition AI",
    description: "Automatic AI meal planner and calorie counter that creates custom diet plans based on your calorie targets, dietary restrictions, and food budget.",
    pricing_tier: "Freemium",
    official_url: "https://www.eatthismuch.com",
    usage_steps: [
      "Open Chrome and visit https://www.eatthismuch.com.",
      "Enter your target daily calories (e.g. 2,000 kcal) and diet preference (Keto, Vegan, High-Protein, Paleo).",
      "Click 'Generate' to get a complete breakfast, lunch, dinner, and snack meal plan.",
      "Export an automated weekly grocery shopping list with exact ingredient quantities."
    ],
    ranking_score: 97,
    tutorial_video_url: "https://youtu.be/Fc9p7w4Prx0",
    pros: ["Automates exact macro and calorie counting", "Generates consolidated grocery store lists", "Swaps recipes instantly if you dislike ingredients"],
    cons: ["Automatic grocery delivery sync requires Premium", "Requires initial calorie setup"]
  },
  {
    name: "Mealime AI",
    category: "Food & Nutrition AI",
    description: "Smart meal planning and grocery app designed for busy people, providing easy 30-minute recipes, waste reduction, and personalized diet filters.",
    pricing_tier: "Freemium",
    official_url: "https://www.mealime.com",
    usage_steps: [
      "Open Chrome or download Mealime at https://www.mealime.com.",
      "Select your dietary profile (Gluten-Free, Vegetarian, Low-Carb, Dairy-Free).",
      "Pick recipes for the week—Mealime combines all ingredients into a smart zero-waste grocery list.",
      "Follow step-by-step cooking mode instructions with built-in hands-free timers."
    ],
    ranking_score: 96,
    tutorial_video_url: "https://youtu.be/GLGIPyPgGUI",
    pros: ["Recipes designed to be cooked in under 30 minutes", "Eliminates food waste by reusing ingredients", "Ultra-clean step-by-step cooking mode"],
    cons: ["Pro tier needed for exclusive nutritional analysis", "Focuses on dinner meals primarily"]
  },

  // 🏠 --- Home Decor & Interior Design AI ---
  {
    name: "RoomGPT",
    category: "Home & Interior Decor AI",
    description: "Redesign your room in seconds using AI. Simply snap a photo of any living room, bedroom, or home office and watch RoomGPT generate photorealistic theme makeovers.",
    pricing_tier: "Freemium",
    official_url: "https://www.roomgpt.io",
    usage_steps: [
      "Open Chrome and navigate to https://www.roomgpt.io.",
      "Click 'Redesign your room' and sign in with Google.",
      "Upload a clear photo of your current empty or furnished room.",
      "Select your preferred interior design theme (Modern, Minimalist, Scandinavian, Industrial, Cyberpunk, Tropical).",
      "Click 'Render Room' to compare before-and-after side-by-side renders and save high-resolution designs."
    ],
    ranking_score: 98,
    tutorial_video_url: "https://youtu.be/xeSJ_A-KIUI",
    pros: ["Generates photorealistic room designs in 5 seconds", "Side-by-side before and after slider", "Offers 8+ distinct interior architectural themes"],
    cons: ["Free plan gives 3 rendering credits", "Requires clear lighting in input photo"]
  },
  {
    name: "DecorAI",
    category: "Home & Interior Decor AI",
    description: "AI Interior & Exterior Design engine that transforms home interiors, backyards, building facades, and patio architecture in seconds from a single photo.",
    pricing_tier: "Freemium",
    official_url: "https://decorai.io",
    usage_steps: [
      "Visit https://decorai.io in your browser.",
      "Choose 'Interior Mode' or 'Exterior Mode'.",
      "Upload a photo of your house exterior, garden, living area, or kitchen.",
      "Pick target color palettes, materials (wood, stone, glass), and furniture arrangements.",
      "Download renders with exact furniture item tags and styling suggestions."
    ],
    ranking_score: 96,
    tutorial_video_url: "https://youtu.be/aeBCw8eTAvk",
    pros: ["Handles both indoor rooms and outdoor house exteriors", "Material and color palette customization", "Instant high-definition downloads"],
    cons: ["Watermark on free export preview", "Pro subscription needed for unlimited exterior renders"]
  },
  {
    name: "REimagineHome AI",
    category: "Home & Interior Decor AI",
    description: "Generative AI virtual staging and remodeling platform that declutters rooms, adds virtual furniture, re-paints walls, and redesigns landscaping.",
    pricing_tier: "Freemium",
    official_url: "https://www.reimaginehome.ai",
    usage_steps: [
      "Open https://www.reimaginehome.ai.",
      "Upload a photo of an empty space or a room with old furniture.",
      "Use the AI Eraser tool to remove unwanted clutter or furniture items.",
      "Prompt the AI with desired decor styles (e.g. 'Bohemian chic with lush indoor plants and warm wooden coffee table').",
      "Export ultra-realistic staged photos for real estate or personal remodeling."
    ],
    ranking_score: 95,
    tutorial_video_url: "https://youtu.be/QpwM_UkoRkI",
    pros: ["Virtual staging is perfect for real estate listings", "Declutter tool removes old furniture cleanly", "Landscaping and lawn redesign mode"],
    cons: ["Sign-up required for HD renders", "Requires precise brush masking for small items"]
  },
  {
    name: "Home Design AI",
    category: "Home & Interior Decor AI",
    description: "All-in-one AI interior architect tool that turns rough floor plans, sketches, or room photos into 3D interior renders with lighting controls.",
    pricing_tier: "Freemium",
    official_url: "https://homedesignai.com",
    usage_steps: [
      "Visit https://homedesignai.com.",
      "Select 'Upload Photo' or 'Upload Floor Plan Sketch'.",
      "Choose room type (Kitchen, Bathroom, Bedroom, Office) and lighting mood (Daylight, Sunset, Cozy Warm).",
      "Click 'Generate Design' to inspect 3D perspective renders and furniture layout options."
    ],
    ranking_score: 94,
    tutorial_video_url: "https://youtu.be/AyiLQ-ElZx4",
    pros: ["Converts 2D floor plans directly into 3D renders", "Lighting and ambiance mood controls", "Inspirational furniture catalog"],
    cons: ["Requires high-res floor plan upload for best precision", "Daily creation limits on free tier"]
  },

  // 👗 --- Fashion, Makeup & Hairstyle AI ---
  {
    name: "OutfitMind AI (Fashion AI)",
    category: "Fashion, Makeup & Hairstyle AI",
    description: "AI virtual stylist and outfit try-on generator that pairs clothing items, creates personalized wardrobe capsules, and lets you test outfits on custom avatars.",
    pricing_tier: "Freemium",
    official_url: "https://outfitmind.com",
    usage_steps: [
      "Open Chrome and navigate to https://outfitmind.com.",
      "Upload photos of clothing items from your closet or paste product URLs.",
      "Set your body type, color preferences, and occasion (Casual, Business, Party, Summer Vacation).",
      "The AI styling engine combines clothes into complete color-matched outfits with shoes and accessories.",
      "Preview virtual model try-on photos before purchasing or dressing up."
    ],
    ranking_score: 96,
    tutorial_video_url: "https://youtu.be/6wO88Xyx1RI",
    pros: ["Builds smart outfit capsules from your existing closet", "Virtual model try-on visualization", "Color harmony and trend recommendations"],
    cons: ["Requires clear clothes photos without background noise", "Premium required for full closet sync"]
  },
  {
    name: "Perfect Corp AI (Virtual Makeup)",
    category: "Fashion, Makeup & Hairstyle AI",
    description: "Industry-standard AR & AI beauty ecosystem powering real-time virtual makeup try-ons, AR lipstick/eyeshadow shades, and deep AI skin tone diagnostics.",
    pricing_tier: "Freemium",
    official_url: "https://www.perfectcorp.com",
    usage_steps: [
      "Visit https://www.perfectcorp.com or open YouCam Makeup web app.",
      "Enable your webcam or upload a clear front-facing selfie photo.",
      "Test real-time virtual lipstick shades, foundation skin tone matches, eyeliner styles, and blush colors.",
      "Run the AI Skin Analyzer to assess hydration, wrinkles, dark circles, and texture with skincare product suggestions."
    ],
    ranking_score: 98,
    tutorial_video_url: "https://youtu.be/s18J8NKJw70",
    pros: ["Ultra-accurate AR face tracking for live virtual makeup", "Used by major global beauty brands (L'Oreal, Estee Lauder)", "Comprehensive AI skin diagnostic reports"],
    cons: ["Best experienced with good front lighting", "Full API integration is enterprise-focused"]
  },
  {
    name: "Hairstyle AI",
    category: "Fashion, Makeup & Hairstyle AI",
    description: "Virtual haircut, style, and hair color simulator that lets you try 40+ trending haircuts and hair colors on your face before visiting the salon.",
    pricing_tier: "Paid",
    official_url: "https://www.hairstyleai.com",
    usage_steps: [
      "Open Chrome and navigate to https://www.hairstyleai.com.",
      "Upload 5 to 10 selfies with good lighting and different angles.",
      "Select preferred gender styles (Men's Buzz cut, Fade, Pompadour; Women's Bob, Layers, Pixie, Curtain Bangs).",
      "Pick hair colors (Blonde, Brunette, Platinum, Red, Pastel).",
      "Receive 40+ photorealistic generated hairstyle photos directly to your inbox to show your hair stylist."
    ],
    ranking_score: 95,
    tutorial_video_url: "https://youtu.be/4P0JufnV7F8",
    pros: ["Extremely realistic headshots matched to your face shape", "Saves you from bad haircut mistakes", "Huge catalog of modern styles"],
    cons: ["Requires one-time photo generation purchase", "Processing takes 15–20 minutes to train custom face model"]
  }
];
