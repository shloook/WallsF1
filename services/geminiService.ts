import { GoogleGenAI } from "@google/genai";
import { GenerationConfig } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateWallpaper = async (config: GenerationConfig): Promise<string> => {
  const ai = getClient();
  
  // Using gemini-2.5-flash-image for standard generation, or upgrade to pro-image-preview if available and needed
  const model = 'gemini-2.5-flash-image'; 

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            text: config.prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: config.aspectRatio,
          // imageSize: "1K" // Supported on pro-image-preview
        },
      },
    });

    // Check response structure for image data
    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) throw new Error("No content generated");

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
