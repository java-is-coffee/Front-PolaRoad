import { axiosInstance } from "api/token/axiosInstance";
import { INewAlbumDTO } from "interface/album/INewAlbumDTO";

const postNewAlbum = async (data: INewAlbumDTO): Promise<boolean> => {
  try {
    const API_URL = `/api/album/create`;

    const response = await axiosInstance.post(API_URL, { data: data });

    const { status } = response;
    if (status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.log("postDetails fetch fail");
    console.error(error);
    return false;
  }
};

export default postNewAlbum;
