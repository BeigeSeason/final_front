import Profile1 from "../img/profile/profile1.png";
import Profile2 from "../img/profile/profile2.png";
import Profile3 from "../img/profile/profile3.png";
import Profile4 from "../img/profile/profile4.png";
import Profile5 from "../img/profile/profile5.png";

const profileImageMap: { [key: string]: string } = {
  profile1: Profile1,
  profile2: Profile2,
  profile3: Profile3,
  profile4: Profile4,
  profile5: Profile5,
};

export const GetProfileImageSrc = (profileValue: string | null) => {
  if (!profileValue) return profileImageMap["profile1"]; // 기본값
  if (profileValue.startsWith("http")) return profileValue; // Firebase URL
  return profileImageMap[profileValue] || profileImageMap["profile1"]; // 매핑된 정적 이미지
};
