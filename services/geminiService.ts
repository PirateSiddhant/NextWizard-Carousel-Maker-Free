
import { GoogleGenAI, Type } from "@google/genai";
import { Slide } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function generateCarouselSlides(topic: string): Promise<Slide[]> {
  const prompt = `Create a high-engagement social media carousel about "${topic}". 
  The response must be a JSON array of 5 to 7 slides.
  - Slide 1 should be a high-impact 'hook' headline.
  - Intermediate slides should contain valuable insights or steps.
  - The last slide must be a strong 'Call to Action'.
  Keep text punchy and concise for visual cards.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING, description: 'A unique UUID or index string' },
            headline: { type: Type.STRING, description: 'The main punchy headline' },
            body: { type: Type.STRING, description: 'The supporting context or body text' },
          },
          required: ['id', 'headline', 'body'],
        },
      },
    },
  });

  try {
    const text = response.text.trim();
    return JSON.parse(text) as Slide[];
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Could not generate valid slides. Please try a different topic.");
  }
}
