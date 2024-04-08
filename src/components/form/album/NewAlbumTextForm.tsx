import UniversalInput from "components/input/UniversalInput";
import { useState } from "react";

interface NewAlbumTextFormProps {
  name: string;
  description: string;
  handleChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDescription: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isNameValidated: boolean;
  isDescriptionValidated: boolean;
}

const NewAlbumTextForm = ({
  name,
  description,
  handleChangeName,
  handleChangeDescription,
  isNameValidated,
  isDescriptionValidated,
}: NewAlbumTextFormProps) => {
  return (
    <div>
      <UniversalInput
        label="album name"
        value={name}
        onChange={handleChangeName}
        placeholder="앨범이름을 작성해주세요"
        type="text"
        id="album-name"
        errorMsg="필수항목입니다."
        isValidate={isNameValidated}
      />
      <UniversalInput
        label="description"
        value={description}
        onChange={handleChangeDescription}
        placeholder="간단한 설명을 작성해주세요"
        type="text"
        id="album-description"
        errorMsg="필수항목입니다."
        isValidate={isDescriptionValidated}
      />
    </div>
  );
};

export default NewAlbumTextForm;
