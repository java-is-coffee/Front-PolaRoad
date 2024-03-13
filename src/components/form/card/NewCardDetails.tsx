import { useState } from "react";

import formStyles from "./NewCardDetails.module.css";

function NewCardDetails() {
  const [uploadFiles, setUploadFiles] = useState<File>();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    console.log(file);
    setUploadFiles(file);
  };

  const detailWrapperClass = uploadFiles
    ? `${formStyles.detailWrapper} ${formStyles.detailWrapperVisible}`
    : formStyles.detailWrapper;

  return (
    <div className={formStyles.formWrapper}>
      {!uploadFiles && (
        <div className={formStyles.imageWrapper}>
          <img src="./icons/photo/postPhoto.png" width="100px" />
          <span>위치사진을 입력해주세요</span>
          <label htmlFor="file">
            <div className={formStyles.uploadBtn}>파일 업로드하기</div>
          </label>
          <input
            type="file"
            name="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      )}
      {uploadFiles && (
        <div className={formStyles.previewWrapper}>
          <img
            src={URL.createObjectURL(uploadFiles)}
            alt="Preview"
            width="300px"
            height="300px"
          />
          <div className={detailWrapperClass}>
            <input
              className={formStyles.cardContent}
              placeholder="문구를 입력하세요"
            ></input>
            <button>위치추가</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewCardDetails;
