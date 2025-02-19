import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sample from "./page/sample";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Sample />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
