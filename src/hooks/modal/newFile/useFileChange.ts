import INewCard from "interface/card/INewCard";
import { useState } from "react";

export const useFileHandler = (initialFile: INewCard) => {
  const [file, setFile] = useState(initialFile);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    const newFile = event.target.files[0];
    const fileUrl = URL.createObjectURL(newFile);
    setFile({ ...file, image: newFile, previewUrl: fileUrl });
  };

  return { file, handleFileChange };
};
