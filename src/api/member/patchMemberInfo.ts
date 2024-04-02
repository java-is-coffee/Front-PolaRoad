import { axiosInstance } from "api/token/axiosInstance";
import { IMemberEditInfoDTO } from "interface/member/IMemberInfoDetails";
import getMemberInfo from "./getMemberInfo";

const patchMemberInfo = async ({
  memberId,
  email,
  name,
  nickname,
  profileImage,
}: IMemberEditInfoDTO): Promise<IMemberEditInfoDTO | null> => {
  try {
    const API_URI = "/api/member/my/edit";

    const memberInfo = await getMemberInfo();
    if (memberInfo) {
      if (memberId !== undefined) memberInfo.memberId = memberId;
      if (email !== undefined) memberInfo.email = email;
      if (name !== undefined) memberInfo.name = name;
      if (nickname !== undefined) memberInfo.nickname = nickname;
      if (profileImage !== undefined) memberInfo.profileImage = profileImage;
    }

    const response = await axiosInstance.patch(API_URI, { data: memberInfo });
    const { status, data } = response;
    if (status === 200) {
      return data as IMemberEditInfoDTO;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default patchMemberInfo;
