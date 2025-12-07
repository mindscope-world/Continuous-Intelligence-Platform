import { GoogleGenAI } from "@google/genai";

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  // Retrieve API Key from Local Storage first, then fallback to Env
  const apiKey = localStorage.getItem('mindverse_api_key') || process.env.API_KEY;

  if (!apiKey) {
    return "MindVerse API Key is missing. Please go to Settings > API Configuration to configure your Google Gemini API Key.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are MindVerse, an advanced GTM (Go-To-Market) intelligence platform. 
        
        Your Mission: Transform raw data into strategic decisions for sales, marketing, and RevOps teams.

        Your Core Capabilities (The MindVerse Framework):
        1. TRACK: You monitor real-time KPIs (Revenue, CAC, Pipeline Velocity, MQLs).
        2. ANALYZE: You identify root causes of performance changes (e.g., "Why did CAC increase in Q3?").
        3. EXPERIMENT: You simulate "what-if" scenarios (e.g., "What if we shift 20% budget to LinkedIn?").
        4. ACTION ENGINE: You provide tailored, high-impact recommendations.

        Tone: Strategic, professional, data-driven, yet conversational and accessible. You are an expert analyst and strategist rolled into one.
        
        When answering:
        - Use business terminology (ROI, Churn, Conversion Rate).
        - Be concise but insightful.
        - If asked about "Simulations", explain that you can forecast outcomes before execution.
        - If asked about "Integration", mention you connect to CRM, Marketing Automation, and Ad Platforms.`,
      },
      history: history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: h.parts
      })),
    });

    const result = await chat.sendMessage({ message });
    return result.text || "";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    if (error.message?.includes('API_KEY_INVALID') || error.status === 400) {
       return "The provided API Key is invalid. Please check your settings and try again.";
    }
    
    return "I'm having trouble connecting to the MindVerse intelligence network right now. Please try again later.";
  }
};