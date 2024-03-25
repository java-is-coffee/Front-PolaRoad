import { useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const kakao = window.kakao;

interface Place {
  place_name: string;
  y: string; // latitude
  x: string; // longitude
  // 필요에 따라 추가 프로퍼티 선언
}

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  level: number;
}

const useKakaoMap = ({ latitude, longitude, level }: KakaoMapProps) => {
  const mapRef = useRef<any>(null); // map 인스턴스를 저장하기 위한 ref
  const infoWindowRef = useRef<any>(null); // infoWindow 인스턴스를 저장하기 위한 ref
  const [selectedPlace, setSelectedPlace] = useState<Place>();

  const initKakaoMap = (mapContainer: HTMLElement) => {
    if (mapRef.current && infoWindowRef.current) return;
    const mapOption = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: level,
    };
    const newMap = new kakao.maps.Map(mapContainer, mapOption);
    const newInfoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    mapRef.current = newMap;
    infoWindowRef.current = newInfoWindow;
  };

  // 키워드 검색 결과 처리 함수
  const searchResult = (data: Place[], status: any) => {
    if (status === kakao.maps.services.Status.OK && mapRef.current) {
      const bounds = new kakao.maps.LatLngBounds();
      data.forEach((place) => {
        displayMarker(place);
        bounds.extend(new kakao.maps.LatLng(place.y, place.x));
      });
      mapRef.current.setBounds(bounds);
    }
  };

  // 키워드로 장소를 검색하는 함수
  const searchPlaceByKeyword = (keyword: string) => {
    if (!mapRef.current) return;
    const places = new kakao.maps.services.Places();
    places.setMap(mapRef);
    places.keywordSearch(keyword, searchResult);
  };

  // 지도에 마커를 표시하는 함수
  const displayMarker = (place: Place) => {
    if (!mapRef.current || !infoWindowRef.current) return;

    const marker = new kakao.maps.Marker({
      map: mapRef.current,
      position: new kakao.maps.LatLng(place.y, place.x),
    });
    kakao.maps.event.addListener(marker, "click", () => {
      infoWindowRef.current.setContent(
        `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
      );
      infoWindowRef.current.open(mapRef.current, marker);
      setSelectedPlace(place);
    });
  };

  return { selectedPlace, initKakaoMap, searchPlaceByKeyword };
};

export default useKakaoMap;
