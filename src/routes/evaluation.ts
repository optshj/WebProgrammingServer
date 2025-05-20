import { Router, Request, Response, NextFunction } from "express";
import { generateChatResponse } from "../services/getGemini";
import getWeather from "../services/getWeather";

const router = Router();

router.get(
    "/data",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const weatherData = await getWeather();
            const response = await generateChatResponse(weatherData);
            res.json({ message: response });
        } catch (err) {
            next(err);
        }
    }
);

export default router;
