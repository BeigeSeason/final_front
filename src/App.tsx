import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./page/MainPage";
import { Layout } from "./component/GlobalComponent";
import { AdminLayout } from "./component/GlobalComponent";
import AdminHome from "./page/admin/AdminHome";
import AdminReportUser from "./page/admin/AdminReportUser";
import AdminReportDiary from "./page/admin/AdminReportDiary";
import AdminReportReview from "./page/admin/AdminReportReview";
import MypageMain from "./page/user/MypageMain";
import { SearchPage } from "./page/itemList/SearchPage";
import { TourList } from "./page/itemList/TourList";
import { DiaryList } from "./page/itemList/DiaryList";
import { FindIdPage } from "./page/auth/FindIdPage";
import { FindPwPage } from "./page/auth/FindPwPage";
import { SignupPage } from "./page/auth/SignupPage";

function App() {
  return (
    <>
      <Router>
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
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/user" element={<AdminReportUser />} />
            <Route path="/admin/diary" element={<AdminReportDiary />} />
            <Route path="/admin/review" element={<AdminReportReview />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
