import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateChatResponse(weatherData: any) {
    const enhancedPrompt = `
    당신은 친절하고 센스있는 날씨 요약 챗봇입니다.
    아래는 오늘의 날씨와 대기질 정보입니다.  
    15자 이내로 꼭 작성해 주세요.
    이 데이터를 종합해서,  
    - 체감온도, 습도, 미세먼지(PM10), 초미세먼지(PM2.5), 오존, 자외선지수(UV), 날씨 상태, 일교차 등을 모두 고려해  
    - 15자 이내의 한 줄 평을 한국어로 작성해 주세요.  
    - 체감온도가 28도 이상이면 '더운 날씨'임을 반드시 언급해 주세요.  
    - 자외선지수가 8 이상이면 '자외선 주의'를 반드시 언급해 주세요.  
    - 미세먼지, 초미세먼지가 높으면 '미세먼지 주의'를 언급해 주세요.  
    - 너무 추운 날씨(체감온도 5도 이하)면 '쌀쌀'이나 '추움'을 언급해 주세요.  
    - 날씨가 맑으면 긍정적으로, 흐리거나 비가 오면 주의 메시지를 포함해 주세요.  
    - 이모지(☀️🌤️🌧️🌫️😷 등)를 적절히 활용해 주세요.

    아래는 오늘의 데이터입니다:
    ${JSON.stringify(weatherData, null, 2)}

    예시 출력:  
    맑고 쾌적! 자외선은 주의!☀️  
    더운 날씨, 자외선 주의!☀️  
    미세먼지 주의!🌫️  
    쌀쌀한 날씨, 외투 챙기세요!🧥
    일교차가 큰 하루에요, 외투 챙기세요!
    날벼락이 우르릉 쾅쾅쾅!⛈️
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
