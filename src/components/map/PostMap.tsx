import useKakaoMap from "hooks/map/useKakaoMap";
import mapStyles from "./PostMap.module.css";
import { useEffect, useRef, useState } from "react";
import INewCard from "interface/card/INewCard";

interface PostMapProps {
  cards: INewCard[];
}

interface RoutesPointType {
  latitude: number | null;
  longitude: number | null;
}

function PostMap({ cards }: PostMapProps) {
  const [routesPoints, setRoutesPoints] = useState<RoutesPointType[]>([]);
  const { initKakaoMap, getLatLng } = useKakaoMap();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    console.log(cards);
    const routePointData: RoutesPointType[] = cards
      .filter(
        (card) =>
          Number.isFinite(card.latitude) && Number.isFinite(card.longitude)
      )
      .map((card) => ({
        latitude: card.latitude,
        longitude: card.longitude,
      }));
    setRoutesPoints(routePointData);
    console.log(routePointData);

    const calculateCenterPoint = () => {
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

    const centerPoint = calculateCenterPoint();
    console.log(getLatLng(centerPoint.lng, centerPoint.lat));
    initKakaoMap(containerRef.current, centerPoint.lat, centerPoint.lng, 1);
  }, [containerRef.current]);
  return (
    <div className={mapStyles.wrapper}>
      <h2>상세경로</h2>
      <div ref={containerRef} className={mapStyles.mapContainer}></div>
    </div>
  );
}

export default PostMap;
