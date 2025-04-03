import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import LogoImage from "../../assets/img/logo.png";

// 💄 스타일 컴포넌트
const Container = styled.div`
  font-family: 'Pretendard', sans-serif;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 20px;
  background-color: #fff;
`;

const HeaderLogo = styled.h1`
  font-size: 20px;
  font-weight: bold;
  img {
    width: 150px;
  }
`;

const Nav = styled.div`
  display: flex;
  gap: 20px;
`;

const MainLayout = styled.div`
  display: flex;
  margin: 20px;
  gap: 20px;
`;

const SideBar = styled.div`
  width: 220px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  font-size: 14px;
  min-height: 600px;
`;

const SidebarButton = styled.button`
  background: none;
  border: none;
  padding: 10px 0;
  text-align: left;
  width: 100%;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #68A0F4;
    font-weight: bold;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 15px;
  font-size: 14px;
  min-height: 600px;
`;

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const CaptionList = styled.ul`
  margin-top: 10px;
  padding-left: 0;
  list-style: none;
`;

const CaptionItem = styled.li`
  margin-bottom: 40px;
  font-weight: 500;
`;

const ChartContainer = styled.div`
  margin-top: 10px;
  height: 250px;
`;

const ExportWrapper = styled.div`
  position: relative;
  display: inline-block;
  overflow: visible; /* 🔧 드롭다운이 잘리지 않도록 */
  z-index: 1;
`;

const ExportButton = styled.button`
  background-color: #4a82d9;
  color: white;
  padding: 8px 16px; /* 🔧 버튼 조금 넓게 */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  z-index: 2;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  z-index: 3;
  min-width: 150px; /* 🔧 드롭다운이 잘리지 않게 최소 너비 확보 */
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// 💻 컴포넌트
const AdminDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchSurveyDetails = async () => {
      try {
        const res = await fetch(`http://localhost:4000/survey/${id}`);
        const data = await res.json();
        setSurvey(data);
      } catch (err) {
        console.error("❌ 설문 세부 정보 불러오기 실패:", err);
      }
    };

    fetchSurveyDetails();
  }, [id]);

  const formatChartData = (votesArray) => {
    return [1, 2, 3, 4, 5].map((score) => ({
      name: `${score}점`,
      count: votesArray?.[score] ?? 0
    }));
  };

  const exportData = (type) => {
    if (!survey) return;

    const exportObj = {
      country: survey.country,
      category: survey.category,
      entityName: survey.entityName,
      captions: survey.captions,
      votes: survey.votes
    };

    if (type === "json") {
      const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `survey_${id}.json`;
      link.click();
    } else if (type === "csv") {
      let csv = "캡션,1점,2점,3점,4점,5점\n";
      survey.captions.forEach((caption, i) => {
        const votes = survey.votes?.[i] || {};
        csv += `${caption},${votes[1] || 0},${votes[2] || 0},${votes[3] || 0},${votes[4] || 0},${votes[5] || 0}\n`;
      });
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `survey_${id}.csv`;
      link.click();
    }

    setShowDropdown(false);
  };

  if (!survey) {
    return <p>설문 정보를 불러오는 중...</p>;
  }

  return (
    <Container>
      <Header>
        <HeaderLogo>
          <img src={LogoImage} alt="로고" />
        </HeaderLogo>
        <Nav>
          <Link to="/survey">설문조사 리스트</Link>
          <Link to="/mainpage">랭킹조회</Link>
          <strong>관리자 페이지</strong>
        </Nav>
      </Header>

      <MainLayout>
        <SideBar>
          <SidebarButton onClick={() => navigate("/adminpage")}>설문조사 등록</SidebarButton>
          <SidebarButton onClick={() => navigate("/adminlist")}>설문통계 조회</SidebarButton>
        </SideBar>

        <Content>
          <TitleWrapper>
            <h2>설문 세부사항</h2>
            <ExportWrapper>
              <ExportButton onClick={() => setShowDropdown(!showDropdown)}>
                내보내기 ⬇
              </ExportButton>
              {showDropdown && (
                <Dropdown>
                  <DropdownItem onClick={() => exportData("csv")}>CSV로 내보내기</DropdownItem>
                  <DropdownItem onClick={() => exportData("json")}>JSON으로 내보내기</DropdownItem>
                </Dropdown>
              )}
            </ExportWrapper>
          </TitleWrapper>

          <p><strong>나라:</strong> {survey.country}</p>
          <p><strong>카테고리:</strong> {survey.category}</p>
          <p><strong>고유명사:</strong> {survey.entityName}</p>
          <Image src={survey.imageUrl} alt={survey.entityName} />

          <p><strong>캡션별 응답 분포:</strong></p>
          <CaptionList>
            {survey.captions.map((caption, index) => (
              <CaptionItem key={index}>
                <span><strong>캡션 {index + 1}.</strong> {caption}</span>
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={formatChartData(survey.votes?.[index])}>
                      <XAxis dataKey="name" />
                      <YAxis hide allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#4a82d9" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CaptionItem>
            ))}
          </CaptionList>
        </Content>
      </MainLayout>
    </Container>
  );
};

export default AdminDetailPage;
