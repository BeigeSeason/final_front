import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import AdminReportUser from "./page/admin/AdminReportUser";
import AdminReportDiary from "./page/admin/AdminReportDiary";
import AdminReportReview from "./page/admin/AdminReportReview";
import MypageMain from "./page/user/MypageMain";
import { SearchPage } from "./page/itemlist/SearchPage";
import { TourList } from "./page/itemlist/TourList";
import { DiaryList } from "./page/itemlist/DiaryList";
import { FindIdPage } from "./page/auth/FindIdPage";
import { FindPwPage } from "./page/auth/FindPwPage";
import { SignupPage } from "./page/auth/SignupPage";
import CreateDiary from "./page/diary/CreateDiary";
import Diary from "./page/diary/Diary";
import { TourSpot } from "./page/itemlist/TourSpot";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <AuthInitializer />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Main />} />
              <Route path="/mypage" element={<MypageMain />} />
              <Route path="/searchpage" element={<SearchPage />} />
              <Route path="/tourlist" element={<TourList />} />
              <Route path="/diarylist" element={<DiaryList />} />
              <Route path="/findid" element={<FindIdPage />} />
              <Route path="/findpw" element={<FindPwPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/creatediary" element={<CreateDiary />} />
              <Route path="/diary/:diaryId" element={<Diary />} />
              <Route path="/tourspot" element={<TourSpot />} />
              <Route path="/tourspot/:id" element={<TourSpot />} />
            </Route>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/admin/report/user" element={<AdminReportUser />} />
              <Route
                path="/admin/report/diary"
                element={<AdminReportDiary />}
              />
              <Route
                path="/admin/report/review"
                element={<AdminReportReview />}
              />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

const AuthInitializer = () => {
  const dispatch = useDispatch();
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
          dispatch(clearTokens());
        }
      }
    };
    fetchUserInfo();
  }, [accessToken, userId]);

  return null;
};

export default App;
