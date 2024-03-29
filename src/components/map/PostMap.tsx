import useKakaoMap from "hooks/map/useKakaoMap";
import mapStyles from "./PostMap.module.css";
import { useEffect, useRef, useState } from "react";
import INewCard from "interface/card/INewCard";
import { IRoutesPointType } from "interface/map/IRoutesPointType";

interface PostMapProps {
  cards: INewCard[];
}

function PostMap({ cards }: PostMapProps) {
  const [routesPoints, setRoutesPoints] = useState<IRoutesPointType[]>([]);
  const { initKakaoMap, calculateCenterPoint, renderOverlay } = useKakaoMap();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const routePointData: IRoutesPointType[] = cards
      .filter(
        (card) =>
          Number.isFinite(card.latitude) && Number.isFinite(card.longitude)
      )
      .map((card) => ({
        latitude: card.latitude,
        longitude: card.longitude,
      }));
    setRoutesPoints(routePointData);
    const centerPoint = calculateCenterPoint(routePointData);
    initKakaoMap(containerRef.current, centerPoint.lat, centerPoint.lng, 1);
    renderOverlay(routePointData);
  }, [containerRef.current]);
  return (
    <div className={mapStyles.wrapper}>
      <h2>상세경로</h2>
      <div ref={containerRef} className={mapStyles.mapContainer}></div>
    </div>
  );
}

export default PostMap;
