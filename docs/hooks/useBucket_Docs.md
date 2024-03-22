# useBucket 커스텀 훅

이미지를 s3 bucket에 쉽게 올리고 삭제하기 위한 커스텀 훅입니다.

## API 참조

### Hook

- useBucket: aws bucket에 이미지를 올리고 삭제하기 위한 사용자 정의 훅입니다. uploadImage와 deleteImage. 각 함수는 비동기로 작동하며, Promise를 반환합니다.

### functions

1. uploadImage와(type: "POST" | "COMMENT", imageInfo: IUploadImage)

   2가지의 타입에 따른 이미지 경로를 지정하고 저장합니다. 저장 성공시 이미지 주소(string)을 반환합니다.

2. deleteImage(filePath: string)

   주어진 파일의 위치를 기반으로 버킷에서 이미지를 삭제합니다. 성공시 true, 실패시 false를 반환합니다.

## 사용 예시

### upload

```tsx
import React, { useState } from "react";
import useBucket from "./hooks/useBucket"; // useBucket 훅의 경로

const MyComponent = () => {
  const { uploadImage, deleteImage } = useBucket();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const uploadPath = await uploadImage({
        type: "POST",
        imageInfo: {
          postUserId: 123,
          postId: 456,
          image: file,
        },
      });
      console.log(uploadPath);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};
```

## delete

```tsx
import React, { useState } from "react";
import useBucket from "./hooks/useBucket"; // useBucket 훅의 경로

const MyComponent = () => {
  const { uploadImage, deleteImage } = useBucket();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDelete = async () => {
    if (file) {
      const result = await deleteImage("123/456/path");
      console.log(result);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
```

```

```
