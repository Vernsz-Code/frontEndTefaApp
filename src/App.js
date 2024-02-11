import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NullPage from "./pages/NullPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import axios from "axios";
import { useState } from "react";

function App() {
  const [isActive, setisActive] = useState(true);
  const baseurl = process.env.REACT_APP_SOCKET_URL;
  axios
    .get(baseurl)
    .then(() => {
      setisActive(true);
    })
    .catch(() => {
      setisActive(false);
    });
  return (
    <BrowserRouter>
      {isActive ? (
        <Routes>
          <Route path="*" element={<NullPage status={"404"} />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<NullPage status={"505"} />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
