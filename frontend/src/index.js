import React from "react";
import ReactDOM from "react-dom";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import MyPage from "./pages/MyPage/MyPage"; 
import SurveyParticipation from "./pages/MyPage/SurveyParticipation";
import Routes from "./Routes";
import './styles/index.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Routes />
);
