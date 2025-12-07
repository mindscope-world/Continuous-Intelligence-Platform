import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
let ai: GoogleGenAI | null = null;
if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  if (!ai) {
    return "MindVerse API Key is missing. Please configure it to access GTM Intelligence.";
  }

  try {
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
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the MindVerse intelligence network right now. Please try again later.";
  }
};