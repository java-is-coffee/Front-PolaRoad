import { useSingleCard } from "hooks/modal/newFile/useSingleCard";
import INewCard from "interface/card/INewCard";
import formStyles from "./CardForm.module.css";
import { useEffect, useRef, useState } from "react";
import useKakaoMap from "hooks/map/useKakaoMap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateCardAtIndex } from "../../../redux/reducers/newPost/newPostReducers";
import useBucket from "hooks/bucket/useBucket";
import { RootState } from "redux/store/store";
import { IUploadImage } from "interface/bucket/IUploadImage";
import { toast } from "react-toastify";
import { IoMdCloseCircle } from "react-icons/io";

declare global {
  interface Window {
    kakao: any;
  }
}

interface CardFormProps {
  cardIndex: number;
  cardDetails: INewCard;
}

function CardForm({ cardIndex, cardDetails }: CardFormProps) {
  const {
    newCard,
    handleImageChange,
    handleContentsChange,
    handlePlaceChange,
    handleImageRemove,
  } = useSingleCard(cardDetails);
  // 이미지 업로딩 관련 const
  const { uploadImage, deleteImage } = useBucket();
  const postId = useSelector((state: RootState) => state.newPost.postId);
  // 리덕스 관련
  const dispatch = useDispatch();

  // 지도 관련
  const [isMapVisible, setIsMapVisible] = useState<boolean>(false);
  const [searchPlace, setSearchPlace] = useState<string>("");
  const mapContainer = useRef<HTMLElement>(null);
  const { selectedPlace, initKakaoMap, searchPlaceByKeyword } = useKakaoMap({
    latitude: 37.566826,
    longitude: 126.9786567,
    level: 3,
  });
  // 지도 투명도 조절 함수
  const handleMapVisibility = (visible: boolean) => {
    setIsMapVisible(visible);
  };
  // 지도 검색어 핸들러
  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPlace(e.target.value);
  };
  // 지도 키워드 겁색 핸들러
  const handleSearch = () => {
    searchPlaceByKeyword(searchPlace);
  };
  // 지도 토글 핸들러
  const toggleMapVisibility = () => {
    setIsMapVisible((prev) => !prev);
  };

  // 사진 업로딩
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0 || !postId) {
      return;
    }
    const newFile = event.target.files[0];
    const imageInfo: IUploadImage = {
      postUserId: 11,
      postId: postId,
      image: newFile,
    };
    const imageUrl = await uploadImage({ type: "POST", imageInfo });
    if (imageUrl) {
      handleImageChange(imageUrl);
    } else {
      toast.error("이미지 업로딩에 실패했습니다.");
    }
  };

  const handleDeleteImg = () => {
    deleteImage(`${process.env.REACT_APP_BUCKET_BASEURL}/${newCard.image}`);
    handleImageRemove();
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
    dispatch(updateCardAtIndex({ index: cardIndex, newCard }));
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
            onChange={handleImageUpload}
            style={{ display: "none" }}
            required
          />
        </div>
      ) : (
        <div className={formStyles.previewWrapper}>
          <img
            alt="Preview"
            className={formStyles.previewImg}
            src={`${process.env.REACT_APP_BUCKET_BASEURL}/${newCard.image}`}
            width="100%"
            height="100%"
          />
          <div className={formStyles.overlay}>
            <IoMdCloseCircle
              className={formStyles.deleteBtn}
              size={"20px"}
              onClick={handleDeleteImg}
            />
          </div>
        </div>
      )}
      {
        <div
          className={formStyles.detailWrapper}
          style={{
            width: newCard.image ? "100%" : "0px",
            height: newCard.image ? "100%" : "0px",
            padding: newCard.image ? "0 20px" : "0px",
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
            <div className={formStyles.mapAction}>
              <button className={formStyles.uploadBtn} onClick={handleSearch}>
                검색
              </button>
              <button
                className={formStyles.mapToggleBtn}
                onClick={toggleMapVisibility}
              >
                {isMapVisible ? <FaChevronDown /> : <FaChevronUp />}
              </button>
            </div>
          </div>
          {selectedPlace && (
            <p className={formStyles.selectedPlace}>
              {selectedPlace?.place_name}
            </p>
          )}
          <section
            id="map"
            ref={mapContainer}
            style={{
              opacity: isMapVisible ? "1" : "0",
              width: "370px",
              height: "200px",
              overflow: "hidden", // 내용이 넘칠 경우 숨김 처리
            }}
          />
        </div>
      }
    </div>
  );
}

export default CardForm;
