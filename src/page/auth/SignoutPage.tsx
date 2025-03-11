import { useState } from "react";
import { SignoutContainer } from "../../style/SignoutStyled";
import { Button } from "../../component/ButtonComponent";
import { Modal, CheckModal } from "../../component/ModalComponent";
import { colors } from "../../style/GlobalStyled";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Loading } from "../../component/Loading";
import { DeleteFolder } from "../../component/FirebaseComponent";
import { clearTokens } from "../../redux/authSlice";

const Signout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId, nickname } = useSelector((state: RootState) => state.auth);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [finalCheckModal, setFinalCheckModal] = useState<boolean>(false);
  const [finalByeModal, setFinalByeModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignout = async () => {
    if (userId) {
      setLoading(true);
      const response = await AxiosApi.signout(userId);
      const deleteParams = {
        type: "all" as const,
        userId,
      };
      const fbrsp = await DeleteFolder(deleteParams);
      setLoading(false);
      if (response && fbrsp) {
        setFinalCheckModal(false);
        setFinalByeModal(true);
        // dispatch(clearTokens());
      }
    } else {
      navigate("/");
    }
  };

  const handleFinalByeModal = () => {
    setFinalByeModal(false);
    dispatch(clearTokens());
    navigate("/");
  };

  return (
    <SignoutContainer>
      <h2>회원 탈퇴</h2>
      <div className="delete-details">
        <p className="sub-title">회원 탈퇴 시 삭제되는 내용</p>
        <div className="content">
          <p>
            • &nbsp;작성한 <span>여행일지</span> (내가 작성한 모든 여행 일지
            삭제)
          </p>
          <p>
            • &nbsp;작성한 <span>댓글 및 별점</span> (관광지에 남긴 댓글과 별점
            삭제)
          </p>
          <p>
            • &nbsp;<span>북마크한 관광지 및 여행일지</span> (저장한 목록에서
            삭제)
          </p>
          <p>
            • &nbsp;<span>내 계정 정보</span> (아이디, 이메일 등 모든 정보 삭제)
          </p>
        </div>
        <br />
        <p className="sub-title">회원 탈퇴 전 확인 사항</p>
        <div className="content">
          <p>• &nbsp;혹시 여행일지를 백업하고 싶으신가요?</p>
          <p>
            &nbsp;&nbsp;→ 탈퇴 전에 직접 여행일지를 복사하거나 스크린샷을 저장해
            두세요.
          </p>
          <p>
            • &nbsp;탈퇴 후에는 같은 계정으로 다시 가입하더라도&nbsp;
            <span>이전 데이터는 복구되지 않습니다.</span>
          </p>
        </div>
        <br />
        <br />
        <br />
        <div className="confirmation-checkbox">
          <label>
            <input
              type="checkbox"
              checked={isConfirmed}
              onChange={() => setIsConfirmed(!isConfirmed)}
            />
            위의 모든 내용을 숙지하고 동의합니다.
          </label>
        </div>
      </div>
      <div className="button-container">
        <Button
          onClick={() => setFinalCheckModal(true)}
          disabled={!isConfirmed}
        >
          계속 진행하기
        </Button>
        <Button
          bgColor={`${colors.colorC}`}
          onClick={() => navigate("/mypage")}
        >
          나중에 하기
        </Button>
      </div>
      {finalCheckModal && (
        <Modal
          isOpen={finalCheckModal}
          onConfirm={handleSignout}
          onClose={() => setFinalCheckModal(false)}
        >
          <div className="modal">
            <p>정말로 떠나시겠어요?😥</p>
            <p>
              <strong>{nickname}</strong>님과 함께했던 소중한 순간들이 많이
              아쉬워요.
            </p>
            <p>탈퇴하면 모든 데이터가 삭제되며, 되돌릴 수 없습니다.</p>
            <p>그래도 계속 진행하시겠습니까?</p>
            <br />
          </div>
        </Modal>
      )}
      {finalByeModal && (
        <CheckModal
          isOpen={finalByeModal}
          onClose={() => handleFinalByeModal()}
        >
          <div className="modal">
            <p>회원 탈퇴가 완료되었습니다.</p>
            <p>그동안 소중한 순간을 함께해주셔서 감사합니다.</p>
            <br />
          </div>
        </CheckModal>
      )}
      {loading && (
        <Loading>회원님의 정보를 안전하게 삭제하는 중입니다...</Loading>
      )}
    </SignoutContainer>
  );
};

export default Signout;
