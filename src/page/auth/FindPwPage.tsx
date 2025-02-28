import { useState } from "react";
import { AuthBox, ResultBox, FindBox } from "../../style/AuthStyled";
import { InputBox } from "../../component/InputComponent";
import { Button } from "../../component/ButtonComponent";
import { CheckModal } from "../../component/ModalComponent";
import AxiosApi from "../../api/AxiosApi";
import emailjs from "@emailjs/browser";
import { Loading } from "../../component/Loading";

export const FindPwPage = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFormValid = id.trim() !== "" && email.trim() !== "";
  const [isLoading, setIsLoading] = useState(false);

  // 비밀번호 찾기
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await AxiosApi.findMemberPw(id, email);
      if (response.data) {
        changePassword(response.data);
      }
    } catch (error) {
      alert("해당 회원이 존재하지 않습니다.");
    }
  };

  // 비밀번호 변경
  const changePassword = async (newPassword: string) => {
    const response = await AxiosApi.changeMemberPw(
      id,
      newPassword
    );
    if (response.data) {
      sendEmail(newPassword);
    } else {
      alert("예기치 못한 오류가 발생했습니다. 관리자에게 문의해주세요.");
    }
  }

  // 이메일 보내기
  const sendEmail = (password: string) => {
    const templateParams = {
      to_email: email,
      from_name: "kh_final",
      message: `${password}`,
    };

    emailjs
      .send(
        "service_a5sldli",  // service id
        "template_59cggwi", // template id
        templateParams,
        "26R74sBvTB5bxhbNn" // public-key
      )
      .then((response) => {
        setIsModalOpen(true);
        setIsLoading(false);
      })
      .catch((error) => {
        alert("이메일 발송에 실패했습니다. 관리자에게 문의해주세요.");
      });
  };

  return (
    <>
      <AuthBox>
        <h2>임시 비밀번호 발급</h2>
        <FindBox>
          <InputBox
            className="inputbox"
            type="text"
            placeholder="아이디 입력"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <InputBox
            className="inputbox"
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FindBox>
        <Button onClick={handleSubmit} disabled={!isFormValid}>
          비밀번호 찾기
        </Button>
      </AuthBox>

      <CheckModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ResultBox>{email}로 임시 비밀번호가 발급되었습니다.</ResultBox>
      </CheckModal>

      {/* 로딩 */}
      {isLoading && (
        <Loading>
          <p>처리중...</p>
        </Loading>
      )}
    </>
  );
};
