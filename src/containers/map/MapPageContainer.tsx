import useKakaoMap from "hooks/map/useKakaoMap";
import containerStyles from "./MapPageContainer.module.css";
import { useEffect, useRef, useState } from "react";
import { IMapCard } from "interface/map/IMapCard";
import getCardsByMapArea from "api/mapPost/getCardsByMapArea";
import MapSideContainer from "components/map/sideContainer/MapSideConatainer";
import ConceptType from "enum/ConceptOptionType";
import MapHeader from "components/map/mapHeader/MapHeader";

interface position {
  lat: number;
  lng: number;
}

const MapPageContainer = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const { mapRef, initKakaoMap, registerMapChange, renderMarkerForMapPage } =
    useKakaoMap();
  const [mapLevel, setMapLevel] = useState<number>(10);
  const [swLatLng, setSwLatLng] = useState<position>();
  const [neLatLng, setNeLatLng] = useState<position>();
  const [mapCards, setMapCards] = useState<IMapCard[]>([]);
  const [concept, setConcept] = useState<ConceptType>();

  const fetchMapCards = async () => {
    if (!swLatLng || !neLatLng) return;
    const data = await getCardsByMapArea(swLatLng, neLatLng, mapLevel);
    if (data) {
      setMapCards(data);
    }
  };

  useEffect(() => {
    fetchMapCards();
  }, [swLatLng, neLatLng]);

  useEffect(() => {
    console.log(mapCards);
    if (mapCards) renderMarkerForMapPage(mapCards);
  }, [mapCards]);

  const getMapArea = (level: number, swLatLng: any, neLatLng: any) => {
    // 상태 업데이트
    setMapLevel(level);
    setSwLatLng({
      lat: swLatLng.getLat(),
      lng: swLatLng.getLng(),
    });
    setNeLatLng({
      lat: neLatLng.getLat(),
      lng: neLatLng.getLng(),
    });
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;
    // 지도 초기화
    initKakaoMap(mapContainerRef.current, 36.2683, 127.6358, mapLevel);
    registerMapChange(getMapArea);
  }, []);

  const handleConceptChange = (type: ConceptType) => {
    setConcept(type);
  };

  return (
    <div ref={mapContainerRef} className={containerStyles.container}>
      {
        <MapHeader
          selectedConcept={concept}
          handleSelectConcept={handleConceptChange}
        />
      }
      {mapCards && <MapSideContainer cards={mapCards} />}
    </div>
  );
};

export default MapPageContainer;
