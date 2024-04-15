import { axiosInstance } from "api/token/axiosInstance";
import { IMapCard } from "interface/map/IMapCard";

interface position {
  lat: number;
  lng: number;
}

const getCardsByMapArea = async (
  swLatLng: position,
  neLatLng: position,
  concept: string | undefined,
  pageSize: number,
  searchType?: "KEYWORD" | "HASHTAG",
  keyWord?: string
): Promise<IMapCard[] | null> => {
  try {
    let API_URI = `/api/card/map/list?swLatitude=${swLatLng.lat}&swLongitude=${swLatLng.lng}&neLatitude=${neLatLng.lat}&neLongitude=${neLatLng.lng}&pageSize=${pageSize}`;
    if (concept) {
      API_URI += `&concept=${encodeURIComponent(concept)}`; // URL 인코딩을 추가하여 안전하게 파라미터 전송
    }
    if (searchType && keyWord) {
      API_URI += `&searchType=${encodeURIComponent(
        searchType
      )}&keyWord=${keyWord}`;
    }

    const response = await axiosInstance.get(API_URI);
    const { status, data } = response;
    if (status === 200) {
      return data as IMapCard[];
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default getCardsByMapArea;
