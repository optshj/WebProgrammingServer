import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateChatResponse(weatherData: any[]) {
    const enhancedPrompt = `
    입력받은 날씨정보에 대해 한줄 평을 남겨주세요.\n
    친근한느낌으로 해주세요\n
    지역명은 제외해주세요\n
    25자 이내로 해주세요.\n
    다음은 날씨 정보입니다:\n
    ${JSON.stringify(weatherData, null, 2)}
    `;
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "오늘 날씨를 평가해주세요.",
        config: {
            systemInstruction: enhancedPrompt,
        },
    });
    return response.text;
}
