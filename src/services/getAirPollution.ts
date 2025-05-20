import axios from "axios";

export default async function getAirPollution(
    sidoName: string,
    cityName: string
) {
    const response = await axios.get(
        `http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst?serviceKey=${process.env.DATA_API_KEY}&sidoName=${sidoName}&searchCondition=HOUR&returnType=json`
    );
    const data = response.data;
    const airPollutionData = data.response.body.items.filter(
        (item: any) => item.cityName === cityName
    );
    return airPollutionData[0];
}
