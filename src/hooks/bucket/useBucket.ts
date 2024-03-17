import AWS from "aws-sdk";
import { IUploadImage } from "../../interface/bucket/IUploadImage";
import uuid from "react-uuid";

const ALBUM_BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME; // S3의 버킷 이름
const REGION = process.env.REACT_APP_BUCKET_REGION; // 서울
const ACCESS_KEY_ID = process.env.REACT_APP_BUCKET_ACCESS_ID; // IAM에서 생성한 사용자의 ACCESS_ID
const SECRET_ACCESS_KEY = process.env.REACT_APP_BUCKET_ACCESS_KEY; // IAM에서 생성한 사용자의 SECRET_ACCESS_KEY

interface uploadImageProps {
  type: "POST" | "COMMENT";
  imageInfo: IUploadImage;
}

const pathResolver = ({ type, imageInfo }: uploadImageProps) => {
  return type === "POST"
    ? `${imageInfo.postUserId}/post/${imageInfo.postId}/${uuid()}${
        imageInfo.image.name
      }`
    : `${imageInfo.postUserId}/post/${imageInfo.postId}/comment/${uuid()}${
        imageInfo.image.name
      }`;
};

const S3 = new AWS.S3({
  region: REGION,
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const useBucket = () => {
  const uploadImage = async ({ type, imageInfo }: uploadImageProps) => {
    if (!ALBUM_BUCKET_NAME || !REGION || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
      console.log("버킷 설정을 확인해주세요");
      return null;
    }
    const filePath = pathResolver({ type, imageInfo });
    try {
      await S3.putObject({
        Bucket: ALBUM_BUCKET_NAME,
        Key: filePath,
        Body: imageInfo.image,
        ACL: "public-read",
      }).promise();
      console.log("Successfully uploaded photo.");
      return filePath;
    } catch (err) {
      if (err instanceof Error) {
        console.log("There was an error uploading your photo: ", err.message);
      } else {
        console.log("There was an error uploading your photo");
      }
      return null;
    }
  };

  const deleteImage = async (filePath: string) => {
    if (!ALBUM_BUCKET_NAME || !REGION || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
      console.log("버킷 설정을 확인해주세요");
      return null;
    }
    try {
      await S3.deleteObject({
        Bucket: ALBUM_BUCKET_NAME,
        Key: filePath,
      }).promise();
      console.log("Successfully deleted photo.");
      return true;
    } catch (err) {
      if (err instanceof Error) {
        console.log("There was an error deleting your photo: ", err.message);
      } else {
        console.log("There was an error deleting your photo");
      }
      return false;
    }
  };

  return { uploadImage, deleteImage };
};

export default useBucket;
