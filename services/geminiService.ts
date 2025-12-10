import { GoogleGenAI } from "@google/genai";
import { GroundingChunk } from "../types";

// Initialize the client safely
let ai: GoogleGenAI | null = null; // Use explicit type or any if type issues persist in strict mode

try {
  // Tenta obter a chave de múltiplas fontes possíveis
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  } else {
    // Apenas loga um aviso, não quebra a aplicação
    console.warn("⚠️ Aviso: Gemini API Key não encontrada. O serviço de mapas funcionará em modo fallback.");
  }
} catch (error) {
  console.error("Erro ao inicializar cliente Gemini:", error);
}

/**
 * Fetches location details using Google Maps Grounding.
 * This ensures we provide accurate, up-to-date location data.
 */
export const fetchLocationData = async (query: string): Promise<{ text: string, chunks: GroundingChunk[] }> => {
  // Se a IA não foi inicializada (falta de chave), retorna erro gracioso sem quebrar
  if (!ai) {
    console.log("Gemini client not ready, skipping map fetch.");
    return {
      text: "Mapa indisponível temporariamente.",
      chunks: []
    };
  }

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