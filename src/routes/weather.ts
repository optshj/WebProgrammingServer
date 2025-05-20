import express from "express";
import dayjs from "dayjs";
import getWeather from "../services/getWeather";
import getUV from "../services/getUV";
import getAirPollution from "../services/getAirPollution";

const router = express.Router();

router.get("/data", async (req, res) => {
    try {
        const sidoName = (req.query.sidoName as string) || "인천";
        const cityName = (req.query.cityName as string) || "연수구";
        const now = dayjs();
        const [weatherData, uvData, airPollution] = await Promise.all([
            getWeather(),
            getUV(now),
            getAirPollution(sidoName, cityName),
        ]);
        const result = {
            weather: {
                ...weatherData,
                UV: uvData,
            },
            airPollution: {
                ...airPollution,
            },
        };
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "API 호출 실패" });
    }
});
export default router;
