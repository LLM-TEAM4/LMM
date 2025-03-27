import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import SignupID from "./pages/Signup/SignupID";
import SignupSNS from "./pages/Signup/SignupSNS";
import Main from "./pages/Main/Main";
import MainPage from "./pages/Main/MainPage";
import Survey from "./pages/Survey/Survey";

class AppRoutes extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/mainpage" element={<MainPage />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signupid" element={<SignupID />} />
          <Route exact path="/signupsns" element={<SignupSNS />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/survey" element={<Survey />} />
        </Routes>
      </Router>
    );
  }
}

export default AppRoutes;
