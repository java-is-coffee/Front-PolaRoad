import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Explore from "./routes/Explore";
import MyPage from "./routes/MyPage";
import Login from "./containers/login/LoginContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/globals.css";
import Post from "routes/Post";

// 사용되는 모달 등록
import { ModalProvider } from "hooks/modal/ModalProvider";
import MapPage from "routes/MapPage";
import { useMediaQuery } from "@mui/material";
import BottomNavigator from "components/bottom/BottomNavigator";

function App() {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  return (
    <div className="App">
      <Router>
        <ModalProvider>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/explore" element={<Explore />}></Route>
            <Route path="/my" element={<MyPage />}></Route>
            <Route path="map" element={<MapPage />}></Route>
            <Route path="/post/:postId" element={<Post />}></Route>
          </Routes>
          <div
            style={{
              position: "fixed",
              width: "100%",
              zIndex: "999",
              paddingBottom: "10px",
            }}
          >
            {isSmallScreen ? <BottomNavigator /> : ""}
          </div>
        </ModalProvider>
      </Router>
      <ToastContainer
        position="top-right"
        limit={1}
        closeButton={true}
        autoClose={3000}
        draggable={true}
        closeOnClick={true}
        pauseOnHover={true}
      />
    </div>
  );
}

export default App;
