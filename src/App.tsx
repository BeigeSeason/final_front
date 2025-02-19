import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./page/MainPage";
import { Layout } from "./component/GlobalComponent";
import AdminHome from "./page/Admin/AdminHome";
import MypageMain from "./page/user/MypageMain";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/mypage" element={<MypageMain />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
