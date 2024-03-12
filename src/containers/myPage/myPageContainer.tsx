import ProfileCard from "../profile/profileCard";
import UserHistoryContainer from "../userGallery/userGallery";

import containerStyle from "./myPageContainer.module.css";

function MyPageContainer() {
  return (
    <div className={containerStyle.wrapper}>
      <div className={containerStyle.profileWrapper}>
        <ProfileCard />
      </div>
      <div className={containerStyle.userHistoryWrapper}>
        <UserHistoryContainer />
      </div>
    </div>
  );
}

export default MyPageContainer;
