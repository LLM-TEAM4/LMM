import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import SignupID from "./pages/Signup/SignupID";
import SignupSNS from "./pages/Signup/SignupSNS";
import Main from "./pages/Main/Main";
import MainPage from "./pages/Main/MainPage";
import Survey from "./pages/Survey/Survey";
import SurveyDetail from "./pages/Survey/SurveyDetail";
import SurveyStart from "./pages/Survey/SurveyStart";
import AdminPage from "./pages/Admin/AdminPage";
import AdminListPage from "./pages/Admin/AdminListPage"; 
import AdminDetailPage from "./pages/Admin/AdminDetailPage"; 

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
          <Route path="/survey/:title" element={<SurveyDetail />} />
          <Route path="/survey/:title/start" element={<SurveyStart />} />
          <Route path="/adminpage" element={<AdminPage/>} />
          <Route path="/adminlist" element={<AdminListPage />} />
          <Route path="/admin/:id" element={<AdminDetailPage />} />
        </Routes>
      </Router>
    );
  }
}

export default AppRoutes;
