import INewCard from "interface/card/INewCard";
import { toast } from "react-toastify";

export const validateCardDetails = (card: INewCard) => {
  if (!card.image) {
    toast.error(`이미지는 필수항목입니다.`);
    return false;
  }
  if (!card.latitude || !card.location || !card.longitude) {
    toast.error(`위치정보는 필수항목입니다.`);
    return false;
  }
  console.log("통과");
  return true;
};

export const validateCardList = (cardList: INewCard[]): boolean => {
  for (let i = 0; i < cardList.length; i++) {
    const card = cardList[i];
    if (!card.image) {
      toast.error(`${i}번째 이미지가 누락되었습니다.`);
      return false;
    }
    if (!card.latitude || !card.location || !card.longitude) {
      toast.error(`${i}번째 위치정보가 누락되었습니다.`);
      return false;
    }
  }
  return true;
};
