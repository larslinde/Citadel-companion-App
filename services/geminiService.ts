import { GoogleGenAI, Type } from "@google/genai";
import { MatchedColor } from "../types";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment");
  }
  return new GoogleGenAI({ apiKey });
};

export const identifyPaintsFromImage = async (base64Image: string): Promise<MatchedColor[]> => {
  const ai = getAI();

  const prompt = `
    Analyze this image which is a reference for miniature painting.
    Identify the 3-5 most dominant or distinct colors in the image.
    For each color found:
    1. Identify the closest matching Citadel Paint Name (e.g., Mephiston Red, Leadbelcher).
    2. Identify the Paint Type (Base, Layer, Contrast, Shade, etc.).
    3. Provide a short reason why this matches.
    4. Provide an approximate Hex code for the color seen in the image.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: {
      parts: [
        { inlineData: { mimeType: "image/jpeg", data: base64Image } },
        { text: prompt },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            colorName: { type: Type.STRING, description: "Name of the color found in image" },
            citadelPaint: { type: Type.STRING, description: "Exact Citadel paint name" },
            paintType: { type: Type.STRING, description: "Type of paint (Base, Layer, etc)" },
            reasoning: { type: Type.STRING, description: "Why this paint fits" },
            hexEstimate: { type: Type.STRING, description: "Hex code of the visual color" },
          },
          required: ["colorName", "citadelPaint", "paintType", "reasoning", "hexEstimate"],
        },
      },
    },
  });

  if (response.text) {
    return JSON.parse(response.text) as MatchedColor[];
  }
  return [];
};

export const getPaintingAdvice = async (userPrompt: string, history: {role: 'user' | 'model', text: string}[]): Promise<string> => {
  const ai = getAI();

  // Format history for the chat
  const contents = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));
  
  // Add new message
  contents.push({
    role: 'user',
    parts: [{ text: userPrompt }]
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `You are a world-class miniature painting coach (Golden Demon standard). 
      You specialize in Games Workshop Citadel paints.
      When asked for a recipe:
      1. Break it down by technique (Base, Shade, Layer, Highlight).
      2. Mention specific Citadel paint names.
      3. Be encouraging but technical.
      4. If asked about Non-Metallic Metal (NMM), Object Source Lighting (OSL), or weathering, give step-by-step guides.`,
    },
  });

  return response.text || "I couldn't generate a response. Try again.";
};