import { useState } from "react";
import putFile from "../aws/putFile";
import useBucket from "../hooks/bucket/useBucket";
import { IUploadImage } from "../interface/bucket/IUploadImage";

const IMAGE_URL = process.env.REACT_APP_BUCKET_BASEURL;

function PostTest() {
  const [input, setInput] = useState<File | null>();
  const { uploadImage, deleteImage } = useBucket();
  const handleUpload = () => {
    if (input) {
      const data: IUploadImage = {
        postUserId: 1, // Ensure these IDs are of the correct type (string vs number)
        postId: 1, // Adjust if necessary
        image: input,
      };

      (async () => {
        try {
          const uploadPath = await uploadImage({
            type: "POST",
            imageInfo: data,
          });
          console.log(uploadPath);
        } catch (error) {
          console.error("Upload failed", error);
        }
      })();
    } else {
      console.log("No file selected");
    }
  };
  const handleDelate = () => {
    (async () => {
      try {
        const result = await deleteImage(
          "1/post/1/788a5add-a437-a233-bfed-bdd46a2d8aedIMG_5878.jpeg"
        );
        console.log(result);
      } catch (error) {
        console.error("Upload failed", error);
      }
    })();
  };
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setInput(event.target.files[0]);
    }
  };
  return (
    <div>
      <input id="files" type="file" onChange={handleFile} required />
      <img src={`${IMAGE_URL}/docker.png`} />
      <button id="button" onClick={handleUpload}>
        올리기
      </button>
      <button onClick={handleDelate}>삭제하기</button>
    </div>
  );
}
export default PostTest;
