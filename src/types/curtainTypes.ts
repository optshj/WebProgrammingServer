export interface CurtainType {
    currentCount: number;
    data: {
        관리번호: string;
        설치일시: string;
        설치장소명: string;
        시군구: string;
        시도: string;
        연번: number;
        "읍면동(행정동)": string;
        종류: "그늘막(고정형)" | "그늘막(스마트형)";
        지번주소: string;
    }[];
    matchCount: number;
    page: number;
    perPage: number;
    totalCount: number;
}
export interface LocationType {
    id: number;
    type: "그늘막(고정형)" | "그늘막(스마트형)";
    sido: string;
    sigungu: string;
    dong: string;
    managementId: string;
    installationName: string;
    address: string;
    installAt: string;
    latitude: string;
    longitude: string;
}
