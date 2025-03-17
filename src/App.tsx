import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastProvider } from "./context/ToastContext";

import ProtectedRoute from "./util/ProtectedRoute";
import GuestRoute from "./util/GuestRoute";
import { Provider, useDispatch, useSelector } from "react-redux";
import { setUserInfo, clearTokens } from "./redux/authSlice";
import { RootState } from "./redux/store";
import { jwtDecode } from "jwt-decode";
import store from "./redux/store";
import { useEffect } from "react";
import AxiosApi from "./api/AxiosApi";

import { Main } from "./page/MainPage";
import { Layout } from "./component/GlobalComponent";
import { AdminLayout } from "./component/GlobalComponent";
import AdminHome from "./page/admin/AdminHome";
import AdminReportUser from "./page/admin/report/AdminReportUser";
import AdminReportDiary from "./page/admin/report/AdminReportDiary";
import AdminReportReview from "./page/admin/report/AdminReportReview";
import AdminChartUser from "./page/admin/chart/AdminChartUser";
import AdminChartDiary from "./page/admin/chart/AdminChartDiary";
import AdminChartReport from "./page/admin/chart/AdminChartReport";
import MypageMain from "./page/user/MypageMain";
import Signout from "./page/auth/SignoutPage";
import { OtherUserMain } from "./page/user/OtherUserMain";
import { SearchPage } from "./page/itemlist/SearchPage";
import { TourList } from "./page/itemlist/TourList";
import { DiaryList } from "./page/itemlist/DiaryList";
import { FindIdPage } from "./page/auth/FindIdPage";
import { FindPwPage } from "./page/auth/FindPwPage";
import { SignupPage } from "./page/auth/SignupPage";
import CreateDiary from "./page/diary/CreateDiary";
import EditDiary from "./page/diary/EditDiary";
import Diary from "./page/diary/Diary";
import { TourSpot } from "./page/itemlist/TourSpot";
import TourRecommend from "./page/itemlist/TourRecommend";
import TourRecResult from "./page/itemlist/TourRecResult";

import Test from "./page/test";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <ToastProvider>
            <AuthInitializer />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/test" element={<Test />} />
                <Route path="/" element={<Main />} />
                <Route
                  path="/mypage"
                  element={
                    <ProtectedRoute>
                      <MypageMain />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/signout"
                  element={
                    <ProtectedRoute>
                      <Signout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/otheruser/:otheruserId"
                  element={<OtherUserMain />}
                />
                <Route path="/searchpage" element={<SearchPage />} />
                <Route path="/tourlist" element={<TourList />} />
                <Route path="/diarylist" element={<DiaryList />} />
                <Route
                  path="/findid"
                  element={
                    <GuestRoute>
                      <FindIdPage />
                    </GuestRoute>
                  }
                />
                <Route
                  path="/findpw"
                  element={
                    <GuestRoute>
                      <FindPwPage />
                    </GuestRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <GuestRoute>
                      <SignupPage />
                    </GuestRoute>
                  }
                />
                <Route
                  path="/creatediary"
                  element={
                    <ProtectedRoute>
                      <CreateDiary />
                    </ProtectedRoute>
                  }
                />
                <Route path="/diary/:diaryId" element={<Diary />} />
                <Route
                  path="/diary/:diaryId/edit"
                  element={
                    <ProtectedRoute>
                      <EditDiary />
                    </ProtectedRoute>
                  }
                />
                <Route path="/tourspot" element={<TourSpot />} />
                <Route path="/tourspot/:id" element={<TourSpot />} />
                <Route
                  path="/tourRecommend"
                  element={
                      <TourRecommend />
                  }
                />
                <Route
                  path="/tourRecommend/result"
                  element={
                      <TourRecResult />
                  }
                />
              </Route>

              {/* 관리자 접근 페이지 */}
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminHome />} />
                <Route
                  path="/admin/report/user"
                  element={<AdminReportUser />}
                />
                <Route
                  path="/admin/report/diary"
                  element={<AdminReportDiary />}
                />
                <Route
                  path="/admin/report/review"
                  element={<AdminReportReview />}
                />
                <Route path="/admin/chart/user" element={<AdminChartUser />} />
                <Route
                  path="/admin/chart/diary"
                  element={<AdminChartDiary />}
                />
                <Route
                  path="/admin/chart/report"
                  element={<AdminChartReport />}
                />
              </Route>
            </Routes>
          </ToastProvider>
        </Router>
      </Provider>
    </>
  );
}

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken, userId } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (accessToken && !userId) {
        const decoded = jwtDecode(accessToken);
        const decodedUserId = decoded.sub;
        try {
          const response = await AxiosApi.memberInfo(decodedUserId);
          dispatch(
            setUserInfo({
              userId: response.data.userId,
              nickname: response.data.nickname,
              name: response.data.name,
              email: response.data.email,
              profile: response.data.imgPath,
            })
          );
        } catch (error) {
          console.error("사용자 정보 복원 실패:", error);
        }
      } else if (!accessToken) {
        dispatch(clearTokens());
        // navigate("/");
      }
    };
    fetchUserInfo();
  }, [accessToken, userId]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken") || "";
    if (!token) {
      if (window.location.pathname.startsWith("/admin")) {
        navigate("/");
      }
      return;
    }

    const decodedToken = jwtDecode(token) as { auth: string[] };
    const auth = decodedToken.auth;

    if (
      auth &&
      !auth.includes("ROLE_ADMIN") &&
      window.location.pathname.startsWith("/admin")
    ) {
      navigate("/");
    }
  }, [navigate]);

  return null;
};

export default App;
