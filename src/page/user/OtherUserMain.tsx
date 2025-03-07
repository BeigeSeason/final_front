import { useParams } from "react-router-dom";
import { GetProfileImageSrc } from "../../component/ProfileComponent";
import { Button } from "../../component/ButtonComponent";
import { Modal, CheckModal } from "../../component/ModalComponent";
import MyDiary from "./MyDiary";
import { ReportContent } from "../../style/DiaryStyled";
import {
  MypageMainContainer,
  ProfileInfo,
  MyContentContainer,
} from "../../style/MypageMainStyled";
import { useEffect, useState } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ReportData } from "../../types/CommonTypes";

export const OtherUserMain = () => {
  const { accessToken, userId } = useSelector((state: RootState) => state.auth);
  const { otheruserId } = useParams();
  const [nickname, setNickname] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [reportContent, setReportContent] = useState<string>("");

  const [reportModal, setReportModal] = useState<boolean>(false);
  const [needLoginModal, setNeedLoginModal] = useState<boolean>(false);

  // userId, otherUserId 구분 필요
  // 사용자 본인이면 마이페이지로 이동 or 사용자 본인이면 신고하기 버튼 안보이기

  useEffect(() => {
    const getMemberInfo = async () => {
      console.log(otheruserId);
      const memberInfo = (await AxiosApi.memberInfo(otheruserId)).data;
      setNickname(memberInfo.nickname);
      setProfile(memberInfo.imgPath);
    };
    getMemberInfo();
  }, []);

  const onClickReportButton = () => {
    if (accessToken) {
      setReportModal(true);
    } else {
      setNeedLoginModal(true);
    }
  };

  // 유저 신고
  const onClickReport = async () => {
    if (userId && otheruserId) {
      const reportData: ReportData = {
        reportType: "MEMBER",
        reporter: userId, // 신고하는 사람 아이디
        reported: otheruserId, // 신고 당한 사람
        reason: reportContent.trim(),
      };
      const response = await AxiosApi.reportMember(reportData);
      if (response) {
        setReportContent("");
        setReportModal(false);
      }
    }
  };

  return (
    <MypageMainContainer>
      <ProfileInfo>
        <div className="profile-img">
          <img src={GetProfileImageSrc(profile)} alt="프로필" />
        </div>
        <div className="user-info">
          <p className="content-font1">{nickname}</p>
        </div>
        <Button
          className="report-button"
          onClick={() => onClickReportButton()}
          bgColor={"#ee4444"}
        >
          신고하기
        </Button>
      </ProfileInfo>
      <MyContentContainer>
        <MyDiary
          type={`/otheruser/${otheruserId}`}
          userId={otheruserId as string}
        />
      </MyContentContainer>
      {reportModal && (
        <Modal
          isOpen={reportModal}
          onConfirm={onClickReport}
          onClose={() => setReportModal(false)}
          disabled={reportContent.trim().length < 1}
        >
          <ReportContent>
            <h3>신고 내용을 입력해주세요</h3>
            <textarea
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
              placeholder={
                "신고 내용을 입력해 주세요.\n허위 신고의 경우 신고자에게 불이익이 생길 수 있습니다."
              }
            />
          </ReportContent>
        </Modal>
      )}
      {needLoginModal && (
        <CheckModal
          isOpen={needLoginModal}
          onClose={() => setNeedLoginModal(false)}
        >
          <p>로그인이 필요한 서비스입니다.</p>
        </CheckModal>
      )}
    </MypageMainContainer>
  );
};
