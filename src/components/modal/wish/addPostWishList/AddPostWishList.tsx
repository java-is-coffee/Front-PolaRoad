import { useModal } from "hooks/modal/ModalProvider";
import modalStyles from "./AddPostWishList.module.css";
import ModalOption from "enum/modalOptionTypes";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getCheckWishList from "api/wishlist/getCheckWishList";
import { ICHeckWishListDTO } from "interface/wish/IWishList";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import postAddPostToWishList from "api/wishlist/postAddPostToWishList";

interface AddPostWishListProps {
  postId?: number;
}

const AddPostWishList = ({ postId }: AddPostWishListProps) => {
  const { closeModal } = useModal();
  const [wishList, setWishList] = useState<ICHeckWishListDTO[]>([]);
  const [selectedWishListId, setSelectedWishListId] = useState<string>("");
  useEffect(() => {
    const fetchMyWishList = async () => {
      if (!postId) return;
      const data = await getCheckWishList(postId);
      if (data) {
        setWishList(data);
        data.forEach((wishList) => {
          if (wishList.postInWishList)
            setSelectedWishListId(wishList.wishListId.toString());
        });
      }
    };
    fetchMyWishList();
    // eslint-disable-next-line
  }, []);

  if (!postId) {
    return <div></div>;
  }

  const handleClose = () => {
    closeModal(ModalOption.ADD_TO_WISH);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedWishListId(event.target.value);
  };

  const handleSubmitWishList = async () => {
    const result = await postAddPostToWishList(
      postId,
      Number(selectedWishListId)
    );
    if (result) {
      toast.info("위시리스트에 추가되었습니다.");
    } else {
      toast.error("업데이트하는데 문제가 발생했습니다.");
    }
    closeModal(ModalOption.ADD_TO_WISH);
  };

  return (
    <div className={modalStyles.backdrop} onClick={handleClose}>
      <div
        className={modalStyles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <IoMdClose
          size={"24px"}
          className={modalStyles.closeButton}
          onClick={handleClose}
        />
        <h1>위시리스트에 추가</h1>
        <div>
          <FormControl fullWidth>
            <InputLabel
              id="wishList-label"
              shrink={true}
              sx={{
                fontSize: "1.2rem", // 폰트 사이즈 조정
                fontWeight: "bold", // 폰트 두께 조정
                width: "fit-content", // 내용에 맞게 넓이를 조정
                maxWidth: "100%", // 최대 넓이 제한
                "&.Mui-focused": {
                  color: "#13c4a3", // 포커스 시 색상 변경
                },
                "&.MuiFormLabel-filled": {
                  width: "fit-content",
                },
              }}
            >
              WishList
            </InputLabel>
            <Select
              labelId="wishList-label"
              id="wishList"
              label="WishList"
              onChange={handleChange}
              value={selectedWishListId}
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#13c4a3", // 포커스 상태의 테두리 색상
                },
                "& .MuiSelect-select": {
                  fontSize: "1.4rem", // 폰트 사이즈 조정
                  fontWeight: "bold", // 폰트 두께 조정
                },
              }}
            >
              {wishList.map((wishList, index) => (
                <MenuItem
                  key={index}
                  value={wishList.wishListId}
                  className={modalStyles.selectItem}
                  sx={{
                    fontSize: "1.2rem", // MenuItem의 폰트 사이즈 조정
                    fontWeight: "bold", // MenuItem의 폰트 두께 조정
                  }}
                >
                  {wishList.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <button
          className={modalStyles.submitButton}
          onClick={handleSubmitWishList}
        >
          추가
        </button>
        <button className={modalStyles.cancelButton} onClick={handleClose}>
          취소
        </button>
      </div>
    </div>
  );
};

export default AddPostWishList;
