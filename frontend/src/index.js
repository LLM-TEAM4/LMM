import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import MyPage from "./pages/MyPage/MyPage"; 
import SignupID from "./pages/Signup/SignupID";  // 경로 수정

import SurveyParticipation from "./pages/MyPage/SurveyParticipation";
import Routes from "./Routes";
import './styles/index.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Routes />
);
