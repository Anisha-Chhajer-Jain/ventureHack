import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ GEMINI_API_KEY is not defined in the environment.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export interface GeminiDiseaseResult {
  cropName: string;
  diseaseName: string;
  confidence: number;
  symptoms: string[];
  causes: string[];
  precautions: string[];
  recommendedPesticides: string[];
  recommendedFertilizers: string[];
}

/**
 * Converts a Blob or File to a base64 string
 */
async function fileToBase64(file: Blob): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer.toString("base64");
}

export async function analyzeCropDisease(file: Blob): Promise<GeminiDiseaseResult> {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Please configure your environment variables.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const base64Data = await fileToBase64(file);
  // Ensure we send correct mime type. Fallback to jpeg if unknown.
  const mimeType = file.type || "image/jpeg";

  const imagePart = {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };

  const prompt = `Analyze this crop leaf image.

Identify:
1. Crop type
2. Disease name (if any)
3. Confidence level (as a number between 0 and 100)
4. Symptoms
5. Causes
6. Precautions farmers should take
7. Recommended pesticides (generic active ingredients or well-known brands)
8. Recommended fertilizers

Return the result strictly in JSON format matching this exact structure, with no markdown formatting or backticks outside of the JSON block:

{
  "cropName": "",
  "diseaseName": "",
  "confidence": 0,
  "symptoms": [],
  "causes": [],
  "precautions": [],
  "recommendedPesticides": [],
  "recommendedFertilizers": []
}

If the crop is healthy, indicate 'Healthy Plant' for diseaseName.`;

  console.log(`[GeminiService] Calling gemini-1.5-flash for image analysis...`);
  const result = await model.generateContent([prompt, imagePart]);
  const responseText = result.response.text();

  try {
    // Strip markdown code block wrappers if Gemini includes them
    const cleanedText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsedData: GeminiDiseaseResult = JSON.parse(cleanedText);
    return parsedData;
  } catch (error) {
    console.error("[GeminiService] Failed to parse JSON from Gemini response:", responseText);
    throw new Error("Failed to parse Gemini API response. The model did not return valid JSON.");
  }
}
