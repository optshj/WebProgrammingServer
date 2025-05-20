# 웹프로그래밍 프로젝트 서버

| 기능                  | method | url                                     | request    | response  | status         |
| --------------------- | ------ | --------------------------------------- | ---------- | --------- | -------------- |
| 기상 정보 조회        | GET    | /api/weather/data?{sidoName}&{cityName} | 요청 param | 단건 응답 | 200: 정상 조회 |
| 더위 쉼터 데이터 조회 | GET    | /api/shelter/data?{perPage}&{page}      | 요청 param | 다건 응답 | 200: 정상 조회 |

# 기상 정보 조회

상세기능 설명

| 현재 기상, 공기오염, 자외선 지수 조회, GEMINI기반 날씨 평가 메시지

현재 기상 : [OpenWeatherMap](https://openweathermap.org/api)

공기 오염 : [한국환경공단*에어코리아*대기오염통계 현황](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15073855)

자외선 지수 조회 : [기상청\_생활기상지수 조회서비스(3.0)](https://www.data.go.kr/iim/api/selectAPIAcountView.do)

-   요청 Request

*   GET /api/weather/data?sidoName=인천&cityName=연수구

| 변수명 | 변수이름  | 타입   | 설명                   |
| ------ | --------- | ------ | ---------------------- |
| 시도명 | numOfRows | string | 서울,인천,부산,제주... |
| 시명   | cityName  | string | 연수구,미추홀구...     |

-   응답 Response

```
{
    "weather": {
        "coord": {
            "lon": 126.6338,
            "lat": 37.3745
        },
        "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 24,
            "feels_like": 25,
            "temp_min": 15,
            "temp_max": 24,
            "pressure": 1009,
            "humidity": 94,
            "sea_level": 1009,
            "grnd_level": 1007
        },
        "visibility": 6492,
        "wind": {
            "speed": 2.71,
            "deg": 216,
            "gust": 4.24
        },
        "clouds": {
            "all": 100
        },
        "dt": 1747720246,
        "sys": {
            "country": "KR",
            "sunrise": 1747686067,
            "sunset": 1747737547
        },
        "timezone": 32400,
        "id": 1843564,
        "name": "Incheon",
        "cod": 200,
        "UV": "5"
    },
    "airPollution": {
        "cityName": "연수구",
        "cityNameEng": "Yeonsu-gu",
        "coValue": "0.3",
        "dataTime": "2025-05-20 14:00",
        "districtCode": "032",
        "districtNumSeq": "008",
        "khaiValue": "41",
        "no2Value": "0.007",
        "numOfRows": "10",
        "o3Value": "0.025",
        "pageNo": "1",
        "pm10Value": "13",
        "pm25Value": "4",
        "returnType": "json",
        "serviceKey": "",
        "sidoName": "인천",
        "so2Value": "0.003"
    },
    "message": "구름 가득하지만, 덥지는 않겠네! 😊"
}
```

# 더위 쉼터 데이터 조회

| 주변 더위 쉼터 데이터 조회

현재 기상 : [행정안전부\_무더위쉼터](https://www.safetydata.go.kr/disaster-data/view?dataSn=1338)

-   요청 Request

*   GET /api/shelter/data?perPage=2

| 변수명 | 변수이름 | 타입   | 설명               |
| ------ | -------- | ------ | ------------------ |
| 갯수   | perPage  | number | 가져올 데이터 갯수 |
| 갯수   | page     | number | 페이지수           |

-   응답 Response

```
{
    "page": 1,
    "perPage": 2,
    "total": 1000,
    "totalPages": 500,
    "data": [
        {
            "DTL_ADRES": "299-3",
            "XCORD": "934025.201498",
            "LO": "126.7537335",
            "CHCK_MATTER_WKEND_HDAY_OPN_AT": "N",
            "WKEND_HDAY_OPER_BEGIN_TIME": "",
            "MODF_TIME": "2025-05-11 15:17:34.000",
            "ARCD": "4119459000",
            "WKDAY_OPER_BEGIN_TIME": "0900",
            "YEAR": "2025",
            "USE_PSBL_NMPR": "5",
            "CHCK_MATTER_NIGHT_OPN_AT": "N",
            "RSTR_NM": "부천시흥원예농협송내역지점",
            "WKEND_HDAY_OPER_END_TIME": "",
            "CHCK_MATTER_STAYNG_PSBL_AT": "N",
            "MNGDPT_CD": "3860750",
            "COLR_HOLD_ARCNDTN": "2",
            "OPER_END_DE": "20240930",
            "RN_DTL_ADRES": "경기도 부천시 소사구 송내대로 34 (송내동)",
            "OPER_BEGIN_DE": "20240805",
            "FCLTY_OPRN_AT": "Y",
            "INPT_TIME": "2024-08-08 14:53:33.000",
            "DTL_POSITION": "",
            "WKDAY_OPER_END_TIME": "1600",
            "FCLTY_SCLAS": "001",
            "COLR_HOLD_ELEFN": "0",
            "AR": "30",
            "YCORD": "1943305.062161",
            "USE_AT": "Y",
            "LA": "37.486635",
            "RSTR_FCLTY_NO": "4119401150",
            "RM": "",
            "FCLTY_TY": "004"
        },
        {
            "DTL_ADRES": "394-2",
            "XCORD": "",
            "LO": "126.7542189",
            "CHCK_MATTER_WKEND_HDAY_OPN_AT": "N",
            "WKEND_HDAY_OPER_BEGIN_TIME": "",
            "MODF_TIME": "2025-05-07 19:55:52.000",
            "ARCD": "4119268000",
            "WKDAY_OPER_BEGIN_TIME": "0900",
            "YEAR": "2025",
            "USE_PSBL_NMPR": "15",
            "CHCK_MATTER_NIGHT_OPN_AT": "N",
            "RSTR_NM": "부천시립동화도서관",
            "WKEND_HDAY_OPER_END_TIME": "",
            "CHCK_MATTER_STAYNG_PSBL_AT": "N",
            "MNGDPT_CD": "3860750",
            "COLR_HOLD_ARCNDTN": "8",
            "OPER_END_DE": "20240930",
            "RN_DTL_ADRES": "경기도 부천시 원미구 장말로 107 (상동)",
            "OPER_BEGIN_DE": "20240805",
            "FCLTY_OPRN_AT": "Y",
            "INPT_TIME": "2024-08-08 11:32:22.000",
            "DTL_POSITION": "",
            "WKDAY_OPER_END_TIME": "1800",
            "FCLTY_SCLAS": "002",
            "COLR_HOLD_ELEFN": "0",
            "AR": "513",
            "YCORD": "",
            "USE_AT": "Y",
            "LA": "37.4947796",
            "RSTR_FCLTY_NO": "4119201157",
            "RM": "",
            "FCLTY_TY": "001"
        }
    ]
}
```
