import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import SignupID from "./pages/Signup/SignupID";
import SignupSNS from "./pages/Signup/SignupSNS";
import Main from "./pages/Main/Main";
import MainPage from "./pages/Main/MainPage";
import Survey from "./pages/Survey/Survey";

import MyPage from "./pages/MyPage/MyPage";  // ✅ MyPage 불러오기!
import SurveyParticipation from "./pages/MyPage/SurveyParticipation";
import SurveyDetail from "./pages/Survey/SurveyDetail";
import SurveyStart from "./pages/Survey/SurveyStart";


class AppRoutes extends React.Component {
  render() {
    return (
      <Router>
        <Routes>

          <Route  path="/" element={<Main />} />
          <Route  path="/mainpage" element={<MainPage />} />
          <Route  path="/signup" element={<Signup />} />
          <Route  path="/signupid" element={<SignupID />} />
          <Route  path="/signupsns" element={<SignupSNS />} />
          <Route  path="/login" element={<Login />} />
          <Route  path="/mypage" element={<MyPage />} /> {/* ✅ MyPage 연결 */}
          <Route  path="/survey" element={<Survey />} />
          <Route path="/survey-participation" element={<SurveyParticipation />} />
          <Route exact path="/" element={<Main />} />
          <Route exact path="/mainpage" element={<Main />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signupid" element={<SignupID />} />
          <Route exact path="/signupsns" element={<SignupSNS />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/survey" element={<Survey />} />
          <Route path="/survey/:title" element={<SurveyDetail />} />
          <Route path="/survey/:title/start" element={<SurveyStart />} />

        </Routes>
      </Router>
    );
  }
}

export default AppRoutes;
