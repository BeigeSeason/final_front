import { JSX, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface GuestRouteProps {
  children: ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps): JSX.Element => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  return accessToken ? <Navigate to="/" /> : <>{children}</>;
};

export default GuestRoute;
