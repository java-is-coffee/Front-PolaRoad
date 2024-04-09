import { axiosInstance } from "api/token/axiosInstance";
import { ICardListDTO } from "interface/card/ICardListDTO";

const getCardList = async (
  page: number,
  pageSize: number
): Promise<ICardListDTO | null> => {
  try {
    const API_URI = `/api/post/mycard?page=${page}&pageSize=${pageSize}`;
    const response = await axiosInstance.get(API_URI);
    const { status, data } = response;
    if (status === 200) {
      return data as ICardListDTO;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getCardList;
