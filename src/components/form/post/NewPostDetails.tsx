import CardGrid from "components/grid/cardListGrid/CardGrid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store/store";

import formStyles from "./NewPostDetails.module.css";
import { useState } from "react";
import {
  addHashTags,
  removeHashTags,
  setTitle,
} from "../../../redux/reducers/newPost/newPostReducers";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";

function NewPostDetails() {
  // post redux dispatch
  const dispatch = useDispatch();
  const hashTags = useSelector(
    (state: RootState) => state.newPost.postDetail.hashtags
  );
  const cardList = useSelector(
    (state: RootState) => state.newPost.postDetail.cards
  );
  const [newHashTag, setNewHashTag] = useState<string>("");

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(event.target.value));
  };
  const handleAddHashTag = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (hashTags.includes(newHashTag)) {
      toast.warning("이미 존재하는 해시태그 입니다.");
    } else {
      setNewHashTag("");
      dispatch(addHashTags(newHashTag));
    }
  };
  const handleRemoveHashTag = (tag: string) => {
    dispatch(removeHashTags(tag));
  };
  return (
    <div className={formStyles.postDetailWrapper}>
      <div className={formStyles.gridContainer}>
        <span className={formStyles.gridLabel}>썸네일 카드를 선택해주세요</span>
        <CardGrid cards={cardList} />
      </div>
      <div className={formStyles.inputContainer}>
        <input
          id="title"
          className={`${formStyles.input} ${formStyles.inputTitle}`}
          onChange={handleTitle}
          placeholder="타이틀을 입력하세요..."
        />
        <div>
          <form onSubmit={handleAddHashTag}>
            <input
              id="hashTag"
              value={newHashTag}
              placeholder="해시태그를 추가해보세요"
              onChange={(e) => setNewHashTag(e.target.value)}
              className={`${formStyles.input} ${formStyles.inputHashTag}`}
              required
            />
            <button className={formStyles.addBtn} type="submit">
              추가
            </button>
          </form>
          <section className={formStyles.hashTagContainer}>
            {hashTags.map((tag, index) => {
              return (
                <div key={index} className={formStyles.hashTag}>
                  <span>{`#${tag}`}</span>
                  <IoCloseSharp
                    className={formStyles.deleteHashTag}
                    size={"14px"}
                    onClick={() => handleRemoveHashTag(tag)}
                  />
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </div>
  );
}

export default NewPostDetails;
