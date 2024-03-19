import { useSingleCard } from "hooks/modal/newFile/useSingleCard";
import INewCard from "interface/card/INewCard";
import formStyles from "./CardForm.module.css";
import { useEffect, useRef, useState } from "react";
import useKakaoMap from "hooks/map/useKakaoMap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

declare global {
  interface Window {
    kakao: any;
  }
}

interface CardFormProps {
  cardIndex: number;
  cardDetails: INewCard;
  updateCard: (newCard: INewCard, cardIndex: number) => void;
}

function CardForm({ cardIndex, cardDetails, updateCard }: CardFormProps) {
  const { newCard, handleFileChange, handleContentsChange, handlePlaceChange } =
    useSingleCard(cardDetails);
  const [isMapVisible, setIsMapVisible] = useState<boolean>(false);
  const [searchPlace, setSearchPlace] = useState<string>("");
  const mapContainer = useRef<HTMLElement>(null);
  const { selectedPlace, initKakaoMap, searchPlaceByKeyword } = useKakaoMap({
    latitude: 37.566826,
    longitude: 126.9786567,
    level: 3,
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

  const toggleMapVisibility = () => {
    setIsMapVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isMapVisible && mapContainer.current) {
      initKakaoMap(mapContainer.current);
    }
    // eslint-disable-next-line
  }, [isMapVisible, mapContainer]);

  useEffect(() => {
    handlePlaceChange(selectedPlace);
    // eslint-disable-next-line
  }, [selectedPlace]);

  useEffect(() => {
    updateCard(newCard, cardIndex);
    // eslint-disable-next-line
  }, [newCard, cardIndex]);

  return (
    <div className={formStyles.cardFormWrapper}>
      {!newCard.image ? (
        <div className={formStyles.imageWrapper}>
          <img
            src="./icons/photo/postPhoto.png"
            width="100px"
            alt="Placeholder for upload"
          />
          <span>위치사진을 입력해주세요</span>
          <label htmlFor={`file-${cardIndex}`}>
            <div className={formStyles.uploadBtn}>파일 업로드하기</div>
          </label>
          <input
            type="file"
            name={`file-${cardIndex}`}
            id={`file-${cardIndex}`}
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      ) : (
        <div className={formStyles.previewWrapper}>
          <img
            alt="Preview"
            src={newCard.previewUrl}
            width="100%"
            height="100%"
          />
        </div>
      )}
      {
        <div
          className={formStyles.detailWrapper}
          style={{
            width: newCard.image && newCard.previewUrl ? "100%" : "0px",
            height: newCard.image && newCard.previewUrl ? "100%" : "0px",
            padding: newCard.image && newCard.previewUrl ? "0 20px" : "0px",
            overflow: "hidden",
          }}
        >
          <textarea
            className={formStyles.cardContent}
            cols={5}
            placeholder="문구를 입력하세요"
            wrap="hard"
            onChange={handleContentsChange}
          />
          <div className={formStyles.locationAction}>
            <input
              placeholder="위치추가"
              onFocus={() => handleMapVisibility(true)}
              onChange={handleSearchValueChange}
              value={searchPlace}
              onKeyDown={handleSearch}
            />
            <div>
              <button className={formStyles.uploadBtn}>현재위치</button>

              <button
                className={formStyles.mapToggleBtn}
                onClick={toggleMapVisibility}
              >
                {isMapVisible ? <FaChevronDown /> : <FaChevronUp />}
              </button>
            </div>
          </div>
          <p className={formStyles.selectedPlace}>
            {selectedPlace?.place_name}
          </p>
          <section
            id="map"
            ref={mapContainer}
            style={{
              opacity: isMapVisible ? "1" : "0",
              width: "370px",
              height: "200px",
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
