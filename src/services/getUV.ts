import axios from "axios";
import { Dayjs } from "dayjs";
import dotenv from "dotenv";
dotenv.config();

export default async function getUV(now: Dayjs) {
    const params = {
        serviceKey: process.env.DATA_API_KEY,
        areaNo: "2818582000",
        time: now.format("YYYYMMDDHH"),
        dataType: "JSON",
    };
    const response = await axios.get(
        `http://apis.data.go.kr/1360000/LivingWthrIdxServiceV4/getUVIdxV4?serviceKey=${params.serviceKey}&areaNo=${params.areaNo}&time=${params.time}&dataType=${params.dataType}`
    );
    return response.data.response.body.items.item[0].h0;
}
