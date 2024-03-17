import { useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const kakao = (window as any).kakao;

interface KakaoMapProps {
  latitude: number;
  longitude: number;
}

const useKakaoMap = ({ latitude, longitude }: KakaoMapProps) => {
  const [map, setMap] = useState<any | null>(null);
  const [selectedPlace, setSelectedPlace] = useState();
  const infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  // 지도 옵션 정의
  const mapOption = {
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 3,
  };

  // 지도 초기화 함수
  const initKakaoMap = (mapContainer: HTMLElement) => {
    const newMap = new kakao.maps.Map(mapContainer, mapOption);
    setMap(newMap);
  };

  // 키워드 검색 결과 처리 함수
  const searchResult = (data: any, status: any) => {
    if (status === kakao.maps.services.Status.OK && map) {
      const bounds = new kakao.maps.LatLngBounds();
      data.forEach((place: any) => {
        displayMarker(place);
        bounds.extend(new kakao.maps.LatLng(place.y, place.x));
      });
      map.setBounds(bounds);
    }
  };

  // 키워드로 장소를 검색하는 함수
  const searchPlaceByKeyword = (keyword: string) => {
    if (!map) return;
    const places = new kakao.maps.services.Places(map);
    places.keywordSearch(keyword, searchResult);
  };

  // 지도에 마커를 표시하는 함수
  const displayMarker = (place: any) => {
    if (!map) return;

    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
    });

    kakao.maps.event.addListener(marker, "click", () => {
      infoWindow.setContent(
        `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
      );
      infoWindow.open(map, marker);
      setSelectedPlace(place);
    });
  };

  return { selectedPlace, initKakaoMap, searchPlaceByKeyword };
};

export default useKakaoMap;
