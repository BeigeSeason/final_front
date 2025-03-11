import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import styled, { keyframes } from "styled-components";

interface ToastMessage {
  message: string;
  type: "success" | "error" | "info"; // 메시지 유형
}

interface ToastContextType {
  showToast: (message: string, type?: ToastMessage["type"]) => void;
}

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
}

const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(20px); }
`;

const ToastContainer = styled.div<{ type: ToastProps["type"] }>`
  position: fixed;
  top: 160px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  background-color: ${({ type }) =>
    type === "success" ? "#28a745" : type === "error" ? "#dc3545" : "#f39c12"};
  animation: ${fadeInOut} 3s ease-in-out;
  z-index: 1000;
`;

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  return <ToastContainer type={type}>{message}</ToastContainer>;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (
    message: string,
    type: ToastMessage["type"] = "success"
  ) => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2900); // 2.9초 뒤 사라짐
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
};

// 커스텀 훅으로 쉽게 사용
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
