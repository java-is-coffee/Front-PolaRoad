import { useRef, useState } from "react";
import { IRoutesPointType } from "interface/map/IRoutesPointType";
import { IMapCard } from "interface/map/IMapCard";

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

const useKakaoMap = () => {
  const mapRef = useRef<any>(null); // map 인스턴스를 저장하기 위한 ref
  const infoWindowRef = useRef<any>(null); // infoWindow 인스턴스를 저장하기 위한 ref
  const [selectedPlace, setSelectedPlace] = useState<Place>();
  // 마커들을 저장하는 배열
  const markers = useRef<any[]>([]);

  const initKakaoMap = (
    mapContainer: HTMLElement,
    initLatitude: number,
    initLongitude: number,
    initLevel: number
  ) => {
    if (mapRef.current && infoWindowRef.current) return;
    const mapOption = {
      center: new kakao.maps.LatLng(initLatitude, initLongitude),
      level: initLevel,
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

  // // 마크 클러스터 랜더링 함수
  // const renderCluster = () => {
  //   const clusterer = new kakao.maps.MarkerClusterer({
  //     map: mapRef.current,
  //     averageCenter: true,
  //     minLevel: 10,
  //   });
  // };

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

  // 위도 경도 계산하는 메서드
  const getLatLng = (y: number, x: number) => {
    return new kakao.maps.LatLng(y, x);
  };

  const calculateCenterPoint = (routePointData: IRoutesPointType[]) => {
    if (routePointData.length === 0) return { lat: 0, lng: 0 };

    const sum = routePointData.reduce(
      (acc, curr) => {
        acc.lat += curr.latitude ? curr.latitude : 0;
        acc.lng += curr.longitude ? curr.longitude : 0;
        return acc;
      },
      { lat: 0, lng: 0 }
    );

    return {
      lat: sum.lat / routePointData.length,
      lng: sum.lng / routePointData.length,
    };
  };

  const renderOverlay = (routes: IRoutesPointType[]) => {
    const points = routes.map((route) => {
      if (route.latitude !== null && route.longitude !== null) {
        return getLatLng(route.latitude, route.longitude);
      } else {
        return null;
      }
    });
    renderMarker(routes);
    renderPolyline(routes, points);
  };

  const mapReload = () => {
    if (mapRef.current) {
      mapRef.current.relayout();
    }
  };

  const renderPolyline = (routes: IRoutesPointType[], points: any) => {
    if (routes.length <= 1) return;
    const path = routes.map(
      (route) => new kakao.maps.LatLng(route.latitude, route.longitude)
    );
    const map = mapRef.current;
    const polyLine = new kakao.maps.Polyline({
      path: path,
      strokeWeight: 2,

      strokeColor: "#13C4A3",
      strokeStyle: "longdash",
    });
    polyLine.setMap(map);
  };

  const renderMarker = (routes: IRoutesPointType[]) => {
    const bounds = new kakao.maps.LatLngBounds();
    routes.forEach((route, index) => {
      bounds.extend(new kakao.maps.LatLng(route.latitude, route.longitude));
      const content = `<div style="width: 35px; height: 35px; background-color: #13C4A3; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; font-size:1.4rem; font-weight:bold">${
        index + 1
      }</div>`;

      // 커스텀 오버레이 생성
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(route.latitude, route.longitude),
        content: content,
        yAnchor: 1,
      });
      // 지도에 오버레이 추가
      customOverlay.setMap(mapRef.current);
    });
    mapRef.current.setBounds(bounds);
  };

  // 지도의 영역을 변경 이벤트 리스너 등록하기
  const registerMapChange = (
    getMapArea: (level: number, swLatLng: any, neLatLng: any) => void
  ) => {
    const map = mapRef.current;
    // bounds_changed 이벤트 리스너 설정
    kakao.maps.event.addListener(map, "bounds_changed", () => {
      // 지도의 현재 bounds를 가져옵니다.
      const bounds = map.getBounds();
      const level = map.getLevel();
      const swLatLng = bounds.getSouthWest();
      const neLatLng = bounds.getNorthEast();
      getMapArea(level, swLatLng, neLatLng);
    });
  };

  const removeAllMarkers = () => {
    markers.current.forEach((marker) => {
      marker.setMap(null); // 지도에서 마커 제거
    });
    markers.current = []; // 배열 비우기
  };

  // 지도 페이지 마크 랜더링
  const renderMarkerForMapPage = (mapCards: IMapCard[]) => {
    removeAllMarkers();
    const bounds = new kakao.maps.LatLngBounds();
    const map = mapRef.current;
    const existingPositions = new Set(); // 중복 위치를 추적하기 위한 Set

    // 마커 이미지 설정
    const imageSrc = "/basic/marker.png";
    const imageSize = new kakao.maps.Size(35, 35); // 마커 이미지의 크기 설정
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 객체 생성

    mapCards.forEach((card) => {
      const positionKey = `${card.latitude},${card.longitude}`;
      // 이미 해당 위치에 마커가 있는지 확인
      if (existingPositions.has(positionKey)) {
        return; // 해당 위치에 마커가 이미 있으면 추가하지 않음
      }
      existingPositions.add(positionKey); // 위치를 Set에 추가

      // 마커 생성
      const maker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(card.latitude, card.longitude),
        image: markerImage, // 마커 이미지 사용
      });
      markers.current.push(maker);
      bounds.extend(new kakao.maps.LatLng(card.latitude, card.longitude)); // 마커의 위치를 bounds에 추가
    });
  };

  return {
    mapRef,
    selectedPlace,
    initKakaoMap,
    searchPlaceByKeyword,
    getLatLng,
    calculateCenterPoint,
    renderOverlay,
    mapReload,
    registerMapChange,
    renderMarkerForMapPage,
  };
};

export default useKakaoMap;
