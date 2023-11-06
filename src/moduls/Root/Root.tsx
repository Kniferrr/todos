import "./Root.scss";
import { HashRouter, Route, Routes } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginPage from "../../LoginPage/LoginPage";

const queryClient = new QueryClient();

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="root">
        <HashRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </HashRouter>
      </div>
    </QueryClientProvider>
  );
}

export default Root;
