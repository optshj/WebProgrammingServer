import { Router } from "express";
import csv from "csv-parser";
import fs from "fs";
import path from "path";

const router = Router();

// 절대 경로 생성
const getCSVPath = () => path.join(process.cwd(), "src", "data", "shelter.csv");

// 페이지네이션 API (요청 시마다 CSV 읽기)
router.get("/data", async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const perPage = parseInt(req.query.perPage as string) || 10;

        const results: any[] = [];
        await new Promise<void>((resolve, reject) => {
            fs.createReadStream(getCSVPath())
                .pipe(csv())
                .on("data", (data) => results.push(data))
                .on("end", () => resolve())
                .on("error", reject);
        });

        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;

        res.json({
            page,
            perPage,
            total: results.length,
            totalPages: Math.ceil(results.length / perPage),
            data: results.slice(startIndex, endIndex),
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
