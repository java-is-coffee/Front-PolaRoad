import useKakaoMap from "hooks/map/useKakaoMap";
import containerStyles from "./MapPageContainer.module.css";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IMapCard } from "interface/map/IMapCard";
import getCardsByMapArea from "api/mapPost/getCardsByMapArea";
import MapSideContainer from "containers/map/sideContainer/MapSideConatainer";
import ConceptType from "enum/ConceptOptionType";
import MapHeader from "components/map/mapHeader/MapHeader";
import { debounce } from "lodash";

interface position {
  lat: number;
  lng: number;
}

const MapPageContainer = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const { initKakaoMap, registerMapChange, renderMarkerForMapPage, mapReload } =
    useKakaoMap();
  const [mapLevel, setMapLevel] = useState<number>(10);
  const [swLatLng, setSwLatLng] = useState<position>();
  const [neLatLng, setNeLatLng] = useState<position>();
  const [mapCards, setMapCards] = useState<IMapCard[]>([]);
  const [concept, setConcept] = useState<ConceptType>();
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchMapCards = useCallback(async () => {
    if (!swLatLng || !neLatLng) return;
    const conceptKey = Object.keys(ConceptType).find(
      (key) => ConceptType[key as keyof typeof ConceptType] === concept
    );
    const data = await getCardsByMapArea(
      swLatLng,
      neLatLng,
      conceptKey,
      mapLevel,
      "KEYWORD",
      searchKeyword
    );
    console.log(data);
    if (data) {
      setMapCards(data);
    }
  }, [swLatLng, neLatLng, concept, mapLevel]);

  const debouncedFetchMapCards = React.useMemo(
    () => debounce(fetchMapCards, 300),
    [fetchMapCards]
  );

  useEffect(() => {
    debouncedFetchMapCards();
    return () => {
      debouncedFetchMapCards.cancel();
    };
    //eslint-disable-next-line
  }, [debouncedFetchMapCards]);

  useEffect(() => {
    console.log(mapCards);
    mapReload();
    if (mapCards) renderMarkerForMapPage(mapCards);
    //eslint-disable-next-line
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
    //eslint-disable-next-line
  }, []);

  const handleConceptChange = (type: ConceptType) => {
    if (type === concept) {
      setConcept(undefined);
    } else {
      setConcept(type);
    }
  };

  const handleSearchKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearch = () => {
    fetchMapCards();
  };

  return (
    <div ref={mapContainerRef} className={containerStyles.container}>
      {
        <MapHeader
          selectedConcept={concept}
          handleSelectConcept={handleConceptChange}
        />
      }
      {mapCards && (
        <MapSideContainer
          cards={mapCards}
          handleInputChange={handleSearchKeyword}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};

export default MapPageContainer;
