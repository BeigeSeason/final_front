import { JSX, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  return accessToken ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
