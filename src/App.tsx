import React from "react";
// import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Explore from "./routes/Explore";
import MyPage from "./routes/MyPage";
import PostTest from "./routes/PostTest";

import Login from "./containers/login/LoginContainer";

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
