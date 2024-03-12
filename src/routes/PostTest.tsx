import { useState } from "react";
import putFile from "../aws/putFile";

function PostTest() {
  const [input, setInput] = useState<File | null>();
  const handleUpload = () => {
    if (input) {
      console.log(input);
      putFile(input); // 파일 업로드 함수 호출
    } else {
      console.log("No file selected");
    }
  };
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setInput(event.target.files[0]);
    }
  };
  return (
    <div>
      <input id="files" type="file" onChange={handleFile} />
      <button id="button" onClick={handleUpload}>
        올리기
      </button>
    </div>
  );
}
export default PostTest;
