import useKakaoMap from "hooks/map/useKakaoMap";
import containerStyles from "./MapPageContainer.module.css";
import { useEffect, useRef, useState } from "react";

interface position {
  latitude: number;
  longitude: number;
}

const MapPageContainer = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const { mapRef, initKakaoMap, registerMapChange } = useKakaoMap();
  const [bottomLeftLatLng, setBottomLeftLatLng] = useState<position | null>();
  const [topRightLatLag, setTopRightLatLag] = useState<position | null>();
  // const [postPage, setPostPage] = useState<number>(1);
  // const [hasNext, setHasNext] = useState<boolean>(true);
  // const [postData, setPostData] = useState<MapPostData[]>([]);

  // const fetchPostList = async (page: number) => {
  //   const postConfig: GetListDTO = {
  //     paging: page,
  //     pagingNumber: 10,
  //     searchType: "KEYWORD",
  //     sortBy: "RECENT",
  //   };
  //   const data = await getPostList(postConfig);
  //   if (data) {
  //     setPostData((prev) => [...prev, ...data.posts]); // 이전 데이터에 새로운 데이터 추가
  //     setHasNext(data.hasNext);
  //     if (data.hasNext) {
  //       fetchPostList(page + 1); // 다음 페이지가 있으면 재귀 호출
  //     }
  //   }
  // };

  useEffect(() => {
    console.log(bottomLeftLatLng);
    console.log(topRightLatLag);
  }, [bottomLeftLatLng, topRightLatLag]);

  const getMapArea = (swLatLng: any, neLatLng: any) => {
    // 상태 업데이트
    setBottomLeftLatLng({
      latitude: swLatLng.getLat(),
      longitude: swLatLng.getLng(),
    });
    setTopRightLatLag({
      latitude: neLatLng.getLat(),
      longitude: neLatLng.getLng(),
    });
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // 지도 초기화
    initKakaoMap(mapContainerRef.current, 36.2683, 127.6358, 10);
    registerMapChange(getMapArea);
  }, []);

  return (
    <div ref={mapContainerRef} className={containerStyles.container}></div>
  );
};

export default MapPageContainer;
