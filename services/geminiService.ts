import { GoogleGenAI } from "@google/genai";
import { GroundingChunk } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Fetches location details using Google Maps Grounding.
 * This ensures we provide accurate, up-to-date location data.
 */
export const fetchLocationData = async (query: string): Promise<{ text: string, chunks: GroundingChunk[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find the location for: ${query}. return a brief confirmation of the address and a link.`,
      config: {
        tools: [{ googleMaps: {} }],
        // We use a specific retrieval config to bias towards the user's region if known, 
        // but for this specific address, the query is specific enough.
      },
    });

    const text = response.text || "Informação de mapa não disponível no momento.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] || [];

    return { text, chunks };
  } catch (error) {
    console.error("Error fetching map data:", error);
    return { 
      text: "Não foi possível carregar os dados do mapa em tempo real.", 
      chunks: [] 
    };
  }
};