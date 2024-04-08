import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Explore from "./routes/Explore";
import MyPage from "./routes/MyPage";
import Login from "./containers/login/LoginContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles/globals.css";
import Post from "routes/Post";

// 사용되는 모달 등록
import { ModalProvider, useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import NewPostModal from "components/modal/newPost/NewPostModal";
import WarningModal from "components/modal/warn/WarningModal";
import EditProfileImgModal from "components/modal/profileImg/EditProfileImgModal";
import PostPreviewModal from "components/modal/post/PostPreviewModal";
import ShareModal from "components/modal/shareModal/ShareModal";
import UserInfoModal from "components/modal/userSetting/userInfo/UserInfoModal";
import PostOptionModal from "components/modal/option/PostOptionModal";
import UserSettingModal from "components/modal/userSetting/UserSettingModal";
import NewAlbumModal from "components/modal/album/newAlbum/NewAlbumModal";

function App() {
  const { registerModal, closeModal } = useModal();
  useEffect(() => {
    registerModal(ModalOption.POST, <NewPostModal />);
    registerModal(ModalOption.WARNING, <WarningModal />);
    registerModal(ModalOption.EDIT_PROFILE_IMG, <EditProfileImgModal />);
    registerModal(ModalOption.POST_PREVIEW, <PostPreviewModal />);
    registerModal(ModalOption.SHARE, <ShareModal />);
    registerModal(ModalOption.USER_SETTING, <UserSettingModal />);
    registerModal(ModalOption.USER_INFO, <UserInfoModal />);
    registerModal(ModalOption.POST_OPTION, <PostOptionModal />);
    registerModal(ModalOption.ALBUM, <NewAlbumModal />);
    return () => {
      closeModal(ModalOption.POST);
      closeModal(ModalOption.WARNING);
      closeModal(ModalOption.EDIT_PROFILE_IMG);
      closeModal(ModalOption.POST_PREVIEW);
      closeModal(ModalOption.SHARE);
      closeModal(ModalOption.USER_SETTING);
      closeModal(ModalOption.USER_INFO);
      closeModal(ModalOption.POST_OPTION);
      closeModal(ModalOption.ALBUM);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      <Router>
        <ModalProvider>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/explore" element={<Explore />}></Route>
            <Route path="/my" element={<MyPage />}></Route>
            <Route path="/post/:postId" element={<Post />}></Route>
          </Routes>
        </ModalProvider>
      </Router>
      <ToastContainer
        position="top-right"
        limit={1}
        closeButton={true}
        autoClose={3000}
        draggable={true}
        closeOnClick={true}
        pauseOnHover={true}
      />
    </div>
  );
}

export default App;
