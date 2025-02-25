import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  color: white;

  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(255, 255, 255, 0.2);
    border-top: 5px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .spinner,
  .text {
    @media (max-width: 768px) {
      scale: 0.7;
      white-space: nowrap;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

interface LoadingProps {
  children: React.ReactNode; // children prop의 타입 정의
}

export const Loading: React.FC<LoadingProps> = ({ children }) => {
  return (
    <Overlay>
      <div className="spinner" />
      <div className="text">{children}</div>
    </Overlay>
  );
};
