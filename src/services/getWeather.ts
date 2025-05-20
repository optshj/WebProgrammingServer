import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const kelvinToCelsius = (kelvin: number): number => {
    return Math.floor(kelvin - 273.15);
};

export default async function getWeather() {
    const [lat, lon] = [37.37452095059928, 126.6337694513664];
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
    );
    const range = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=1&appid=${process.env.OPENWEATHER_API_KEY}`
    );
    response.data.main.temp_min = range.data.list[0].temp.min;
    response.data.main.temp_max = range.data.list[0].temp.max;

    const modifiedData = {
        ...response.data,
        main: {
            ...response.data.main,
            temp: kelvinToCelsius(response.data.main.temp),
            feels_like: kelvinToCelsius(response.data.main.feels_like),
            temp_min: kelvinToCelsius(response.data.main.temp_min),
            temp_max: kelvinToCelsius(response.data.main.temp_max),
        },
    };
    return modifiedData;
}
