import { useEffect, useState } from "react";
import containerStyle from "./MyPageContainerMoblie.module.css";
import getMemberInfo from "api/member/getMemberInfo";
import { IMemberInfoDetails } from "interface/member/IMemberInfoDetails";
import secureLocalStorage from "react-secure-storage";
import ProfileCard from "containers/profile/ProfileCard";
import UserHistoryContainer from "containers/userGallery/UserGallery";

function MyPageContainerMobile() {
  const [memberInfo, setMemberInfo] = useState<IMemberInfoDetails>();
  const fetchMemberInfo = async () => {
    const result: IMemberInfoDetails | null = await getMemberInfo();
    if (result) setMemberInfo(result);
  };
  useEffect(() => {
    if (secureLocalStorage.getItem("accessToken")) fetchMemberInfo();
    //eslint-disable-next-line
  }, []);
  if (!memberInfo) return <div></div>;
  return (
    <div className={containerStyle.wrapper}>
      <div className={containerStyle.profileWrapper}>
        <div className={containerStyle.profileCard}>
          <ProfileCard memberInfo={memberInfo} />
        </div>
      </div>
      <div className={containerStyle.userHistoryWrapper}>
        <UserHistoryContainer memberId={memberInfo.memberId} />
      </div>
    </div>
  );
}

export default MyPageContainerMobile;
