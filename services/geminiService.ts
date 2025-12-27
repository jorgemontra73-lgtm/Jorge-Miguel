
import { GoogleGenAI, Type } from "@google/genai";
import { ServiceType, Provider, AIRecommendation, MarketAnalysis } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getSmartProviderRecommendation = async (
  serviceNeeded: ServiceType,
  description: string,
  providers: Provider[]
): Promise<AIRecommendation[]> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const providerContext = providers.map(p => ({
    id: p.id,
    name: p.name,
    rating: p.rating,
    bio: p.bio,
    services: p.serviceTypes
  }));

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Com base na necessidade de "${serviceNeeded}" e descrição "${description}", 
               recomende os 2 melhores prestadores desta lista: ${JSON.stringify(providerContext)}.
               Explique brevemente por que cada um é adequado para o mercado de Angola.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            providerId: { type: Type.STRING },
            reason: { type: Type.STRING }
          },
          required: ["providerId", "reason"]
        }
      }
    }
  });

  return JSON.parse(response.text);
};

export const estimateMarketPrice = async (service: ServiceType, province: string = "Luanda"): Promise<MarketAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analise o mercado de serviços em Angola (especificamente em ${province}) para o serviço de ${service}. 
               Estime o preço médio em Kwanzas (AOA), o nível de demanda e as zonas com maior procura.`,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          avgPrice: { type: Type.NUMBER, description: "Preço médio em Kz" },
          demandLevel: { type: Type.STRING, enum: ["Baixa", "Média", "Alta"] },
          topAreas: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["avgPrice", "demandLevel", "topAreas"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generatePromoVideo = async (imageB64: string, prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  // Checking for API key from Window context if needed (handled in UI component usually, but keeping logic here)
  const operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: `Um vídeo promocional profissional para um prestador de serviços em Angola: ${prompt}`,
    image: {
      imageBytes: imageB64,
      mimeType: 'image/jpeg',
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  });

  let currentOp = operation;
  while (!currentOp.done) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    currentOp = await ai.operations.getVideosOperation({ operation: currentOp });
  }

  const downloadLink = currentOp.response?.generatedVideos?.[0]?.video?.uri;
  return `${downloadLink}&key=${API_KEY}`;
};
