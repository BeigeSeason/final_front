import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sample from "./page/sample";
import { Main } from "./page/MainPage";
import { Layout } from "./component/GlobalComponent";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Sample />} />
            <Route path="/main" element={<Main />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
