import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Swal from "sweetalert2";
import Library from "../library/index";
import Feed from "../feed/index";
import Trending from "../trending/index";
import Player from "../player/index";
import Favorite from "../favorites/index";
import "./home.css";
import Sidebar from "../../components/sidebar";
import Login from "../auth/login";
import { setClientToken } from "../../spotify";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [isNewLogin, setIsNewLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Biến check loading

  useEffect(() => {
    const savedToken = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";

    if (!savedToken && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
      setIsNewLogin(true);
    } else {
      setToken(savedToken);
      setClientToken(savedToken);
      setIsLoading(false); // Nếu không phải login mới, tắt loading ngay
    }
  }, []);

  useEffect(() => {
    if (isNewLogin) {
      Swal.fire({
        title: "Đăng nhập thành công!",
        text: "Chào mừng bạn đã quay lại 🎉🎉",
        icon: "success",
        confirmButtonText: "OK",
        allowOutsideClick: false, // Không cho bấm ra ngoài để thoát
      }).then(() => {
        setIsNewLogin(false);
        setIsLoading(false); // Tắt loading sau khi bấm OK
      });
    }
  }, [isNewLogin]);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <h2>Đang tải...</h2>
      </div>
    );
  }

  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/player" element={<Player />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </div>
    </Router>
  );
}
