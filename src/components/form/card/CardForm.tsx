import { useFileHandler } from "hooks/modal/newFile/useFileChange";
import INewCard from "interface/card/INewCard";
import formStyles from "./CardForm.module.css";
import { useEffect, useState } from "react";
import useKakaoMap from "hooks/map/useKakaoMap";
import { Hidden } from "@mui/material";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

interface CardFormProps {
  updateCard: (newCard: INewCard, cardIndex: number) => void;
}

// 초기 카드 상태
const initCard: INewCard = {
  location: null,
  latitude: null,
  longitude: null,
  image: null,
  previewUrl: undefined,
  content: null,
};

function CardForm({ updateCard }: CardFormProps) {
  const { file, handleFileChange } = useFileHandler(initCard);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [searchPlace, setSearchPlace] = useState<string>("");
  const { selectedPlace, initKakaoMap, searchPlaceByKeyword } = useKakaoMap({
    latitude: 37.566826,
    longitude: 126.9786567,
  });

  const handleMapVisibility = (visible: boolean) => {
    setIsMapVisible(visible);
  };

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPlace(e.target.value);
  };

  const handleSearch = () => {
    searchPlaceByKeyword(searchPlace);
  };

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    if (isMapVisible && mapContainer) {
      initKakaoMap(mapContainer);
    }
  }, [isMapVisible]); // isMapVisible 또는 map 상태가 변경될 때마다 실행

  useEffect(() => {
    console.log(selectedPlace);
  }, selectedPlace);

  return (
    <div className={formStyles.cardFormWrapper}>
      {!file.image ? (
        <div className={formStyles.imageWrapper}>
          <img
            src="./icons/photo/postPhoto.png"
            width="100px"
            alt="Placeholder for upload"
          />
          <span>위치사진을 입력해주세요</span>
          <label htmlFor="file">
            <div className={formStyles.uploadBtn}>파일 업로드하기</div>
          </label>
          <input
            type="file"
            name="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      ) : (
        <div className={formStyles.previewWrapper}>
          <img
            alt="Preview"
            src={file.previewUrl}
            width="300px"
            height="300px"
          />
        </div>
      )}
      {
        <div
          style={{
            width: file.image && file.previewUrl ? "100%" : "0px",
            height: file.image && file.previewUrl ? "100%" : "0px",
            overflow: "hidden",
          }}
        >
          <textarea
            className={formStyles.cardContent}
            placeholder="문구를 입력하세요"
            wrap="off"
          />
          <input
            placeholder="위치추가"
            onFocus={() => handleMapVisibility(true)}
            onChange={handleSearchValueChange}
            onKeyDown={handleSearch}
          />
          <button className={formStyles.uploadBtn}>현재위치</button>
          <section
            id="map"
            style={{
              display: isMapVisible ? "" : "hidden",
              height: "200px", // 높이가 반대로 설정되어 있었음
              overflow: "hidden", // 내용이 넘칠 경우 숨김 처리
              transition: "all 0.5s ease", // 부드러운 전환 효과
            }}
          />
        </div>
      }
    </div>
  );
}

export default CardForm;
