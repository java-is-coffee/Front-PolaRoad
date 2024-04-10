import { axiosInstance } from "api/token/axiosInstance";
import { IAlbumDetailsDTO } from "interface/album/IAlbumDetailsDTO";

const getAlbumDetails = async (
  albumId: number
): Promise<IAlbumDetailsDTO | null> => {
  try {
    const API_URI = `/api/album/${albumId}`;
    const response = await axiosInstance.get(API_URI);
    const { status, data } = response;
    if (status === 200) {
      return data as IAlbumDetailsDTO;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getAlbumDetails;
