import ProfileCard from "../profile/ProfileCard";
import UserHistoryContainer from "../userGallery/UserGallery";

import containerStyle from "./MyPageContainer.module.css";

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
