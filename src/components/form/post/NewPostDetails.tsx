import CardGrid from "components/grid/cardListGrid/CardGrid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store/store";

import formStyles from "./NewPostDetails.module.css";
import { useState } from "react";
import {
  addHashTags,
  removeHashTags,
} from "../../../redux/reducers/newPost/newPostReducers";
import { IoCloseSharp } from "react-icons/io5";

function NewPostDetails() {
  const cardList = useSelector(
    (state: RootState) => state.newPost.postDetail.cards
  );
  // post redux dispatch
  const dispatch = useDispatch();
  const hashTags = useSelector(
    (state: RootState) => state.newPost.postDetail.hashtags
  );

  const [newHashTag, setNewHashTag] = useState<string>("");
  const handleAddHashTag = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addHashTags(newHashTag));
  };
  const handleRemoveHashTag = (tag: string) => {
    dispatch(removeHashTags(tag));
  };
  return (
    <div className={formStyles.postDetailWrapper}>
      <CardGrid cards={cardList} />
      <div className={formStyles.inputContainer}>
        <input
          id="title"
          className={`${formStyles.input} ${formStyles.inputTitle}`}
          placeholder="타이틀을 입력하세요..."
        ></input>
        <div>
          <form onSubmit={handleAddHashTag}>
            <input
              id="hashTag"
              placeholder="해시태그를 추가해보세요"
              onChange={(e) => setNewHashTag(e.target.value)}
              className={`${formStyles.input} ${formStyles.inputHashTag}`}
            />
            <button type="submit">추가</button>
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
