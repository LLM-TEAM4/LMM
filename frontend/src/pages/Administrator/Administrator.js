import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/AdminHeader";

const Container = styled.div`
  padding: 100px 20px 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 30px;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
`;

const TabLeft = styled.div`
  display: flex;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: ${({ $active }) => ($active ? "#68a0f4" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#000")};
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  border-radius: 6px 6px 0 0;
  margin-right: 5px;

  &:hover {
    background: #4a82d9;
    color: #fff;
  }
`;

const SurveyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SurveyItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  &:hover { background-color: #f0f0f0; }
`;

const SurveyImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const SurveyContent = styled.div` flex: 1; `;
const SurveyTitle = styled.h2` font-size: 18px; margin: 0 0 5px 0; `;
const SurveyText = styled.p` font-size: 14px; color: #666; margin: 0; `;

const ButtonGroup = styled.div` display: flex; gap: 10px; `;
const ApproveButton = styled.button`
  padding: 8px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
const RejectButton = styled.button`
  padding: 8px 12px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const modalBoxStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  textAlign: "center",
  width: "300px"
};

const modalButtonStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#68a0f4",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontWeight: "bold",
  cursor: "pointer",
};


// 기존 탭 상태를 쿼리스트링에서 가져와서 초기화
const Administrator = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "pending";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [surveys, setSurveys] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

   const openModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // 탭 변경 시 URL 쿼리스트링도 함께 변경
  const changeTab = (tab) => {
    setActiveTab(tab);
    navigate(`/administrator?tab=${tab}`);}
    useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const res = await fetch("http://localhost:4000/survey/all/posted", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("서버 응답 오류");
        const data = await res.json();
        setSurveys(data);
      } catch (err) {
        console.error("❌ 관리자 설문 불러오기 실패:", err);
        openModal("설문 데이터를 불러오는 데 실패했습니다.");
      }
    };

    fetchSurveys();
  }, []);

  const handleStatusChange = async (id, status) => {
    let reason = "";
    if (status === "rejected") {
      reason = prompt("거절 사유를 입력하세요:");
      if (!reason) return;
    }

    try {
      const res = await fetch(`http://localhost:4000/survey/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status, rejectReason: reason }),
      });

      if (!res.ok) throw new Error("상태 변경 실패");

      const updatedSurvey = await res.json();
      setSurveys((prev) => prev.map((s) => (s._id === id ? updatedSurvey : s)));
    } catch (err) {
      console.error("❌ 상태 변경 오류:", err);
      openModal("설문 상태 변경에 실패했습니다.");
    }
  };

 
const [openMenuId, setOpenMenuId] = useState(null);

useEffect(() => {
  const fetchSurveys = async () => {
    try {
      const res = await fetch("http://localhost:4000/survey/all/posted", { credentials: "include" });
      const data = await res.json();
      setSurveys(data);
    } catch (err) {
      console.error("❌ 관리자 설문 불러오기 실패:", err);
    }
  };
  fetchSurveys();
}, []);



const filteredSurveys =
  activeTab === "total" ? surveys : surveys.filter((s) => s.status === activeTab);


  return (
    <>
      <Header />
      <Container>
        <Title>관리자 설문 승인 페이지</Title>
        <TabsContainer>
          <TabLeft>
            <Tab $active={activeTab === "approved"} onClick={() => changeTab("approved")}>승인됨</Tab>
            <Tab $active={activeTab === "rejected"} onClick={() => changeTab("rejected")}>거절됨</Tab>
            <Tab $active={activeTab === "pending"} onClick={() => changeTab("pending")}>대기 중</Tab>
            </TabLeft>

            <button
    style={{
      padding: "8px 16px",
      borderRadius: "6px",
      border: "1px solid #68a0f4",
      background: "#68a0f4",
      color: "#fff",
      cursor: "pointer"
    }}
    onClick={() => navigate("/administrator/statistics")}

  >
    통합 통계
  </button>
        </TabsContainer>
        <SurveyList>
  {filteredSurveys.map((item) => (
    <SurveyItem
      key={item._id}
      onClick={() => navigate(`/administrator/detail/${item._id}`, { state: item })}
    >
      <SurveyImage 
        src={item.imageUrl} 
        alt={item.entityName} 
        onError={() => console.log("이미지 로드 실패:", item.imageUrl)} 
        />
      <SurveyContent>
        <SurveyTitle>{item.entityName}</SurveyTitle>
        <SurveyText>
          국가: {item.country} / 분류: {item.category}
        </SurveyText>
        <SurveyText>
          등록자: <strong>{item.user?.id || "알 수 없음"}</strong>
        </SurveyText>
        {activeTab === "rejected" && item.rejectReason && (
          <SurveyText>❌ 거절 사유: {item.rejectReason}</SurveyText>
        )}
      </SurveyContent>

      {activeTab === "pending" && (
        <ButtonGroup>
          <ApproveButton
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(item._id, "approved");
            }}
          >
            승인
          </ApproveButton>
          <RejectButton
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(item._id, "rejected");
            }}
          >
            거절
          </RejectButton>
        </ButtonGroup>
      )}

      {activeTab === "approved" && (
        <ButtonGroup>
          <ApproveButton
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/administrator/result/${item._id}`);
            }}
          >
            결과 보기
          </ApproveButton>
        </ButtonGroup>
      )}
    </SurveyItem>
  ))}
  {filteredSurveys.length === 0 && <p>표시할 설문이 없습니다.</p>}
</SurveyList>

      </Container>
      {showModal && (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  }}>
    <div style={modalBoxStyle}>
      <p>{modalMessage}</p>
      <button onClick={closeModal} style={modalButtonStyle}>확인</button>
    </div>
  </div>
)}

    </>
  );
};

export default Administrator;
