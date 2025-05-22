import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateChatResponse(weatherData: any) {
    console.log(weatherData);
    const enhancedPrompt = `
    당신은 친절한사람입니다.\n
    입력받은 날씨정보에 대해 한 줄 평을 남겨주세요.\n
    지역명은 제외해주세요\n
    feels_like인 체감온도로 판단해주세요\n
    체감온도가 28도 이상이면 더운 날씨라고 적어주세요.\n
    체감온도,습도,미세먼지,초미세먼지,오존,일산화탄소,이산화질소,아황산가스,자외선지수,날씨상태를 포함해주세요.\n
    날씨가 좋으면 외부활동 예시하나를 적일 수 있으면 적어주세요\n
    자외선수치가 8이상일 때 유의해주세요\n
    15자 이내로 해주세요.\n
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
