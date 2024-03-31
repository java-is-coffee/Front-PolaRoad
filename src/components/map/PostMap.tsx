import useKakaoMap from "hooks/map/useKakaoMap";
import mapStyles from "./PostMap.module.css";
import { useEffect, useRef } from "react";
import INewCard from "interface/card/INewCard";
import { IRoutesPointType } from "interface/map/IRoutesPointType";

interface PostMapProps {
  cards: INewCard[];
}

function PostMap({ cards }: PostMapProps) {
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
    const centerPoint = calculateCenterPoint(routePointData);
    initKakaoMap(containerRef.current, centerPoint.lat, centerPoint.lng, 1);
    renderOverlay(routePointData);
  }, [containerRef.current]);
  return (
    <div className={mapStyles.wrapper}>
      <h2>상세경로</h2>
      <div ref={containerRef} className={mapStyles.mapContainer}></div>
      <article className={mapStyles.mapContents}>
        <div>
          {cards &&
            cards.map((card, index) => (
              <div key={index} className={mapStyles.mapItem}>
                <span className={mapStyles.itemIndex}>{index + 1}</span>
                <span className={mapStyles.itemLocation}>{card.location}</span>
              </div>
            ))}
        </div>
      </article>
    </div>
  );
}

export default PostMap;
