import { axiosInstance } from "api/token/axiosInstance";
import { IAlbumListDTO } from "interface/album/IAlbumListDTO";

const getAlbumList = async (page: number): Promise<IAlbumListDTO | null> => {
  try {
    const API_URI = `/api/album/list/paging?page=${page}`;
    const response = await axiosInstance.get(API_URI);
    const { status, data } = response;
    console.log(data);
    if (status === 200) {
      return data as IAlbumListDTO;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getAlbumList;
