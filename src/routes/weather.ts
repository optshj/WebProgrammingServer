import express from "express";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import getWeather from "../services/getWeather";
import getUV from "../services/getUV";
import getAirPollution from "../services/getAirPollution";
import { generateChatResponse } from "../services/getGemini";

const router = express.Router();

dayjs.extend(utc);
dayjs.extend(timezone);

router.get("/data", async (req, res) => {
    try {
        const sidoName = (req.query.sidoName as string) || "인천";
        const cityName = (req.query.cityName as string) || "연수구";
        const now = dayjs().tz("Asia/Seoul");
        const [weatherData, uvData, airPollution] = await Promise.all([
            getWeather(),
            getUV(now),
            getAirPollution(sidoName, cityName),
        ]);
        const evaluation = await generateChatResponse(weatherData);
        const result = {
            weather: {
                ...weatherData,
                UV: uvData,
            },
            airPollution: {
                ...airPollution,
            },
            message: evaluation,
        };
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "API 호출 실패" });
    }
});
export default router;
