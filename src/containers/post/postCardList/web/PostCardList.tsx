import SingleCardDetails from "components/card/postDetail/SingleCardDetails";
import { IPostDTO } from "interface/post/IPostDTO";
import containerStyles from "./PostCardList.module.css";
import ThumbnailCard from "components/card/postDetail/thumbnailCard/ThumbnailCard";
import CardListHeader from "components/header/cardLIst/CardLIstHeader";

interface PostCardListProps {
  postDetails: IPostDTO;
  postId: number;
}

function PostCardList({ postDetails, postId }: PostCardListProps) {
  const cards = [
    <ThumbnailCard
      title={postDetails.title}
      goodNumber={postDetails.goodNumber}
      thumbnailImageURL={postDetails.cards[postDetails.thumbnailIndex].image}
      concept={postDetails.concept}
      region={postDetails.region}
      hashTags={postDetails.postHashtags}
      memberGood={postDetails.memberGood}
    />,
    ...postDetails.cards.map((card, index) => (
      <SingleCardDetails key={index} cardDetails={card} />
    )),
  ];

  return (
    <section className={containerStyles.wrapper}>
      <CardListHeader memberInfo={postDetails.memberInfo} postId={postId} />
      {cards.map((card, index) => (
        <div className={containerStyles.singleCard} key={index}>
          {card}
        </div>
      ))}
    </section>
  );
}

export default PostCardList;
