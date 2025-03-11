import React from "react";
import styled from "styled-components";
import { Button, CancelButton } from "./ButtonComponent";
import { InputBox } from "./InputComponent";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setTokens, setUserInfo } from "../redux/authSlice";
import store, { RootState } from "../redux/store";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  position: relative;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    button {
      height: 30px;
    }
  }

  @media (max-width: 768px) {
    scale: 0.7;
  }
`;

const LoginContainer = styled.div`
  min-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 20px;
  .inputbox {
    height: 50px;
    border-radius: 15px;
  }
  h2 {
    margin-bottom: 20px;
  }

  button {
    width: 100%;
  }
`;

const AuthMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: gray;
  cursor: pointer;
  a,
  p {
    font-size: 13px;
    margin-top: 20px;
    color: gray;
    text-decoration: none;
  }
  a {
    transition: all 0.3s ease;
    &:hover {
      text-decoration: underline;
      opacity: 0.7;
    }
  }
  p {
    margin-right: 5px;
    margin-left: 5px;
  }
  .find {
    display: flex;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: gray;
`;

// 기본 모달 ------------------------------------------------------------------------------------------
interface ModalProps {
  isOpen: boolean; // 모달의 열림 상태
  onClose: () => void; // 모달 닫기 함수
  onConfirm: () => void; // 확인 버튼 클릭 시 호출되는 함수
  children: React.ReactNode; // 모달의 자식 요소
  confirmText?: string; // 확인 버튼 텍스트 (기본값: "확인")
  cancelText?: string; // 취소 버튼 텍스트 (기본값: "취소")
  disabled?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  children,
  confirmText = "확인",
  cancelText = "취소",
  disabled,
}) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        {typeof children === "string" ? <p>{children}</p> : children}
        <div className="buttons">
          <Button onClick={onConfirm} disabled={disabled}>
            {confirmText}
          </Button>
          <CancelButton onClick={onClose}>{cancelText}</CancelButton>
        </div>
      </ModalContent>
    </ModalBackdrop>
  );
};

// 확인 모달 --------------------------------------------------------------------------------------------------
interface CheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  buttonProps?: React.ComponentProps<typeof Button>;
}

export const CheckModal: React.FC<CheckModalProps> = ({
  isOpen,
  onClose,
  children,
  buttonProps,
}) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        <div>{children}</div>
        <Button onClick={onClose} {...buttonProps}>
          확인
        </Button>
      </ModalContent>
    </ModalBackdrop>
  );
};

// 닫기 모달------------------------------------------------------------------------------------
interface CloseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ExitModal: React.FC<CloseModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalBackdrop onClick={handleBackdropClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>✖</CloseButton>
        {typeof children === "string" ? <p>{children}</p> : children}
      </ModalContent>
    </ModalBackdrop>
  );
};

// 로그인 모달 -----------------------------------------------------------------------------------------------
export const LoginModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 에러 메시지를 위한 상태
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setError(""); // 모달이 열릴 때 에러 메시지 초기화
      setUserId(""); // 모달 열릴 때 id, pw 초기화
      setPassword("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      onClose(); // 페이지 이동 시 모달 닫기
    }
  }, [location.pathname]);

  const handleLogin = async () => {
    try {
      console.log("로그인 시도:", { userId, password });
      const response = await AxiosApi.login(userId, password);

      // ✅ 백엔드가 정상적으로 토큰을 보내는지 확인
      if (response.status === 200 && response.data.accessToken) {
        // Redux에 토큰 저장
        dispatch(
          setTokens({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          })
        );

        // accessToken 디코딩
        const decoded = jwtDecode(response.data.accessToken);
        const decodedUserId = decoded.sub;
        console.log("userId : ", userId);

        const userResponse = await AxiosApi.memberInfo(decodedUserId);
        dispatch(
          setUserInfo({
            userId: userResponse.data.userId,
            nickname: userResponse.data.nickname,
            name: userResponse.data.name,
            email: userResponse.data.email,
            profile: userResponse.data.imgPath,
          })
        );
        onClose(); // 로그인 후 모달 닫기
      } else {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error: any) {
      console.error("로그인 요청 중 오류 발생:", error);

      // Axios 에러 처리
      if (error.response) {
        console.error(
          "서버 응답 오류:",
          error.response.status,
          error.response.data
        );
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      } else {
        setError("로그인 요청을 처리할 수 없습니다.");
      }
    } finally {
      setPassword("");
    }
  };

  return (
    <ExitModal isOpen={isOpen} onClose={onClose}>
      <LoginContainer>
        <h2>로그인</h2>
        {/* 에러 메시지 표시 */}
        <InputBox
          className="inputbox"
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <InputBox
          className="inputbox"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
        <Button onClick={handleLogin}>로그인</Button>
        {error && <p style={{ color: "red", margin: "0" }}>{error}</p>}{" "}
        <AuthMenu>
          <div className="find">
            <Link to="/findid">아이디 찾기</Link>
            <p>|</p>
            <Link to="/findpw">비밀번호 발급</Link>
          </div>
          <Link to="/signup">회원가입</Link>
        </AuthMenu>
      </LoginContainer>
    </ExitModal>
  );
};
