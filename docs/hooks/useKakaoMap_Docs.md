# useKakaoMap

useKakaoMap 사용자 정의 훅은 React 애플리케이션에 카카오 맵스를 쉽게 통합할 수 있도록 설계되었습니다. 카카오 맵을 초기화하고, 키워드로 장소를 검색하며, 맵 위에 검색 결과에 대한 마커를 표시하는 기능을 제공합니다.

## 개요

useKakaoMap은 카카오 맵스를 사용하여 맵 초기화, 장소의 키워드 검색, 검색 결과에 대한 마커 표시 등의 기능을 캡슐화한 React 사용자 정의 훅입니다. React의 useState 훅을 사용하여 맵과 선택된 장소에 관련된 상태를 관리합니다.

## 사용 전 준비사항

useKakaoMap 훅을 사용하기 전에, 카카오 맵스 JavaScript API가 프로젝트에 포함되어 있는지 확인하세요. 다음 스크립트 태그를 HTML에 추가하여 카카오 맵스 API를 포함시킬 수 있습니다:

```html
<script
  type="text/javascript"
  src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY"
></script>
```

YOUR_APP_KEY를 실제 카카오 맵스 API 키로 교체하세요.

## 훅 파라미터

useKakaoMap 훅은 다음 속성을 가진 객체를 매개변수로 받습니다:

```
latitude: 맵의 초기 중심점 위도.
longitude: 맵의 초기 중심점 경도.
level: 맵의 줌 레벨.
```

### 반환 값

```
selectedPlace: 맵 위의 마커를 클릭하여 선택된 장소입니다. 초기에는 undefined이며, 마커를 클릭할 때 업데이트됩니다.
initKakaoMap: 카카오 맵을 초기화하는 함수입니다. 이 함수는 맵이 렌더링될 DOM 요소와 함께 호출되어야 합니다.
searchPlaceByKeyword: 키워드로 장소를 검색하는 함수입니다. 키워드 문자열을 매개변수로 받습니다.
```

## 사용 방법

useKakaoMap 훅을 컴포넌트에 임포트하세요:

```jsx
import useKakaoMap from './useKakaoMap'; // 파일 구조에 따라 경로를 조정하세요
맵의 원하는 위도, 경도, 레벨을 사용하여 훅을 초기화하세요:
```

```jsx
const { selectedPlace, initKakaoMap, searchPlaceByKeyword } = useKakaoMap({
  latitude: 37.5665,
  longitude: 126.978,
  level: 3,
});
```

useEffect 훅 내에서 initKakaoMap 함수를 사용하여 적합한 DOM 요소 내에 맵을 초기화하세요:

```jsx
useEffect(() => {
  const mapContainer = document.getElementById("map"); // 이 ID가 맵 컨테이너의 ID인지 확인하세요
  initKakaoMap(mapContainer);
}, []);
```

searchPlaceByKeyword 함수를 사용하여 장소를 검색하고 맵 위에 마커로 표시하세요:

```jsx
const handleSearch = (keyword) => {
  searchPlaceByKeyword(keyword);
};
```

선택적으로, 맵 위의 마커를 클릭하여 선택된 장소에 대한 정보를 표시하는 데 selectedPlace 상태를 사용할 수 있습니다.

### 예시

useKakaoMap 훅을 사용하는 컴포넌트의 간단한 예시입니다:

```jsx
import React, { useEffect } from "react";
import useKakaoMap from "./useKakaoMap";

const MapComponent = () => {
  const { selectedPlace, initKakaoMap, searchPlaceByKeyword } = useKakaoMap({
    latitude: 37.5665,
    longitude: 126.978,
    level: 3,
  });

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    initKakaoMap(mapContainer);
  }, []);

  const handleSearch = (keyword) => {
    searchPlaceByKeyword(keyword);
  };

  return (
    <div>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
      <button onClick={() => handleSearch("coffee")}>커피숍 검색</button>
      {selectedPlace && (
        <div>
          <h3>선택된 장소</h3>
          <p>{selectedPlace.place_name}</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
```
