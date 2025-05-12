import React from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StatisticsSummaryPage from "./pages/Administrator/Statistics/StatisticsSummaryPage";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import SignupID from "./pages/Signup/SignupID";

import SignupSNS from "./pages/Signup/SignupSNS";
import Main from "./pages/Main/Main";
import MainPage from "./pages/Main/MainPage";
import Survey from "./pages/Survey/Survey";
import MyPage from "./pages/MyPage/MyPage";
import SurveyParticipation from "./pages/MyPage/SurveyParticipation";
import SurveyDetail from "./pages/Survey/SurveyDetail";
import SurveyStart from "./pages/Survey/SurveyStart";
import AdminPage from "./pages/MyPage/Admin/AdminPage";
import AdminListPage from "./pages/MyPage/Admin/AdminListPage";
import AdminDetailPage from "./pages/MyPage/Admin/AdminDetailPage";
import RankingWeeklyPage from "./pages/Ranking/RankingWeeklyPage";
import RankingMonthlyPage from "./pages/Ranking/RankingMonthlyPage";
import AdministratorLayout from "./layouts/AdministratorLayout";
import Administrator from "./pages/Administrator/Administrator";
import AdminDashboard from "./pages/Administrator/AdminDashboard";
import AdminSurveyDetail from "./pages/Administrator/AdminSurveyDetail";
import SurveyResultPage from "./pages/Administrator/SurveyResultPage";
import SurveyStatisticsPage from "./pages/Administrator/Statistics/SurveyStatisticsPage";
import CountryStatisticsPage from "./pages/Administrator/Statistics/CountryStatisticsPage";
import CategoryStatisticsPage from "./pages/Administrator/Statistics/CategoryStatisticsPage";
import CategorySurveyListPage from "./pages/Administrator/Statistics/CategorySurveyListPage";
import OverallStatisticsPage from "./pages/Administrator/Statistics/OverallStatisticsPage";

class AppRoutes extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />

          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signupid" element={<SignupID />} />
          <Route path="/signupsns" element={<SignupSNS />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/survey/:title" element={<SurveyDetail />} />
          <Route path="/survey/:title/start" element={<SurveyStart />} />
          <Route
            path="/administrator/statistics"
            element={<StatisticsSummaryPage />}
          />
          <Route
            path="/mypage/survey-participation"
            element={<SurveyParticipation />}
          />
          <Route path="/mypage/survey-creation" element={<AdminPage />} />
          <Route
            path="/mypage/survey-creation-list"
            element={<AdminListPage />}
          />
          <Route
            path="/mypage/survey-creation-detail/:id"
            element={<AdminDetailPage />}
          />
          <Route path="/ranking/weekly" element={<RankingWeeklyPage />} />
          <Route path="/ranking/monthly" element={<RankingMonthlyPage />} />

          <Route path="/administrator" element={<AdministratorLayout />}>
            {/* 기본 진입 시 대시보드로 이동 */}
            <Route index element={<Navigate to="dashboard" replace />} />

            {/* 관리자 메인 */}
            <Route path="dashboard" element={<AdminDashboard />} />

            {/* 승인 요청 목록 */}
            <Route path="requests" element={<Administrator />} />

            {/* 개별 설문 상세/결과/통계 */}
            <Route path="detail/:id" element={<AdminSurveyDetail />} />
            <Route path="result/:id" element={<SurveyResultPage />} />
            <Route path="statistics/:id" element={<SurveyStatisticsPage />} />

            {/* 요약 통계 */}
            <Route
              path="statistics/summary/country"
              element={<CountryStatisticsPage />}
            />
            <Route
              path="statistics/summary/category"
              element={<CategoryStatisticsPage />}
            />
            <Route
              path="statistics/summary/overall"
              element={<OverallStatisticsPage />}
            />
          </Route>
        </Routes>
      </Router>
    );
  }
}

export default AppRoutes;
