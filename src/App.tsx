import React from "react";
// import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/home";
import Explore from "./routes/explore";
import MyPage from "./routes/myPage";
import PostTest from "./routes/postTest";
import Login from "./components/login/LoginContainer";

import "./styles/globals.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/my" element={<MyPage />}></Route>
          <Route path="/test" element={<PostTest />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
