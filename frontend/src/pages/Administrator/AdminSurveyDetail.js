import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/AdminHeader";

const Container = styled.div`
  padding: 100px 40px 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 30px;
`;

const InfoBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const Label = styled.span`
  width: 120px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const Text = styled.span`
  font-size: 16px;
  color: #555;
`;

const Image = styled.img`
  width: 300px;
  height: auto;
  border-radius: 10px;
  margin-top: 10px;
`;

const CaptionList = styled.ul`
  margin-top: 10px;
  padding-left: 20px;
`;

const CaptionItem = styled.li`
  margin-bottom: 8px;
  line-height: 1.5;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 30px;

  &:hover {
    background-color: #4a82d9;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const ApproveButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const RejectButton = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #e53935;
  }
`;

const StatisticsButton = styled.button`
  padding: 10px 20px;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #e68900;
  }
`;

const AdminSurveyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/survey/detail/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setSurvey(data))
      .catch((err) => {
        console.error("❌ 설문 상세 조회 실패:", err);
      });
  }, [id]);

  const handleApprove = async () => {
    try {
      const res = await fetch(`http://localhost:4000/survey/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: "approved" }),
      });
      if (!res.ok) throw new Error("승인 실패");
      alert("해당 설문이 승인되었습니다.");
      navigate(-1);
    } catch (err) {
      alert("승인 중 오류가 발생했습니다.");
    }
  };

  const handleReject = async () => {
    const reason = prompt("거절 사유를 입력하세요:");
    if (!reason) return;

    try {
      const res = await fetch(`http://localhost:4000/survey/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: "rejected", rejectReason: reason }),
      });
      if (!res.ok) throw new Error("거절 실패");
      alert("해당 설문이 거절되었습니다.");
      navigate(-1);
    } catch (err) {
      alert("거절 중 오류가 발생했습니다.");
    }
  };

  if (!survey) {
    return (
      <Container>
        <p>로딩 중이거나 설문 데이터를 찾을 수 없습니다.</p>
      </Container>
    );
  }

  const { country, category, entityName, imageUrl, captions, user } = survey;

  return (
    <>
      <Header />
      <Container>
        <Title>설문 상세 정보</Title>
        <InfoBox>
          <InfoRow>
            <Label>등록자</Label>
            <Text>{user?.id || "알 수 없음"}</Text>
          </InfoRow>

          <InfoRow>
            <Label>나라</Label>
            <Text>{country}</Text>
          </InfoRow>

          <InfoRow>
            <Label>카테고리</Label>
            <Text>{category}</Text>
          </InfoRow>

          <InfoRow>
            <Label>주제</Label>
            <Text>{entityName}</Text>
          </InfoRow>

          <InfoRow
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <Label style={{ marginBottom: "10px" }}>이미지</Label>
            {imageUrl && <Image src={imageUrl} alt={entityName} />}
          </InfoRow>

          <InfoRow
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <Label style={{ marginBottom: "10px" }}>캡션</Label>
            <CaptionList>
              {(captions || []).map((cap, idx) => (
                <CaptionItem key={idx}>{cap}</CaptionItem>
              ))}
            </CaptionList>
          </InfoRow>

          <ButtonGroup>
            <ApproveButton onClick={handleApprove}>승인</ApproveButton>
            <RejectButton onClick={handleReject}>거절</RejectButton>
            <StatisticsButton onClick={() => navigate(`/administrator/statistics/result/${id}`)}>
              📊 통계 보기
            </StatisticsButton>
          </ButtonGroup>

          <BackButton onClick={() => navigate(-1)}>
            ← 목록으로 돌아가기
          </BackButton>
        </InfoBox>
      </Container>
    </>
  );
};

export default AdminSurveyDetail;
