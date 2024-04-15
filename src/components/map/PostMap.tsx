import useKakaoMap from "hooks/map/useKakaoMap";
import mapStyles from "./PostMap.module.css";
import { useEffect, useRef } from "react";
import INewCard from "interface/card/INewCard";
import { IRoutesPointType } from "interface/map/IRoutesPointType";

interface PostMapProps {
  cards: INewCard[];
}

function PostMap({ cards }: PostMapProps) {
  const { initKakaoMap, calculateCenterPoint, renderOverlay, mapReload } =
    useKakaoMap();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 지도 초기화 및 오버레이 렌더링 로직
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
    if (routePointData.length === 0) return;
    const centerPoint = calculateCenterPoint(routePointData);
    initKakaoMap(containerRef.current, centerPoint.lat, centerPoint.lng, 3);
    renderOverlay(routePointData);
    // eslint-disable-next-line
  }, [cards]); // cards가 변할 때마다 지도 초기화

  useEffect(() => {
    const currentContainer = containerRef.current;
    const observer = new ResizeObserver((entries) => {
      mapReload();
    });

    if (currentContainer) observer.observe(currentContainer);

    return () => {
      if (currentContainer) observer.unobserve(currentContainer);
    };
    // eslint-disable-next-line
  }, [mapReload]);

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
