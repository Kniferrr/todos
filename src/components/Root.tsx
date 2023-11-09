import "./Root.scss";
import { HashRouter, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import LoginPage from "./LoginPage/LoginPage";

function Root() {
  return (
    <div className="root">
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default Root;
