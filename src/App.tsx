import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Explore from "./routes/Explore";
import MyPage from "./routes/MyPage";
import Login from "./containers/login/LoginContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/my" element={<MyPage />}></Route>
        </Routes>
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
