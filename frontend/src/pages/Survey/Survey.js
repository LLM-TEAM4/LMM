import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import SurveypageLayout from "../../layouts/SurveypageLayout";

const Survey = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const surveyRefs = useRef({});
  const { completedTitle } = location.state || {};

  
  const [surveys, setSurveys] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("http://localhost:4000/survey", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ 세션 유지 확인:", data);
        setSurveys(Array.isArray(data) ? data : []);  // 배열 보장
      })
      .catch((err) => {
        console.error("❌ 세션 조회 실패:", err);
        setSurveys([]);
      });
  }, []);
  

  const filtered = surveys.filter((item) => {
    const countryMatch =
      selectedCountries.length === 0 || selectedCountries.includes(item.country);

    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(item.category);

    const titleMatch = item.title === completedTitle;
    const approvedMatch = item.status === "approved"; // ✅ 이 부분 추가
    return (countryMatch && categoryMatch) || titleMatch;
  });

  const sorted = [...filtered].sort((a, b) => {
    const titleA = a.title || "";
    const titleB = b.title || "";
    return sortOrder === "asc"
      ? titleA.localeCompare(titleB)
      : titleB.localeCompare(titleA);
  });

  useEffect(() => {
    if (completedTitle && surveyRefs.current[completedTitle]) {
      surveyRefs.current[completedTitle].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [completedTitle, sorted]);

  return (
    <SurveypageLayout
      selectedCountries={selectedCountries}
      handleCountryChange={(country) =>
        setSelectedCountries((prev) =>
          prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
        )
      }
      selectedCategories={selectedCategories}
      handleCategoryChange={(category) =>
        setSelectedCategories((prev) =>
          prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        )
      }
    >
      <PathAndSortContainer>
        <CategoryPath>
          설문조사
          {selectedCountries.length > 0 && ` > ${selectedCountries.join(", ")}`}
          {selectedCategories.length > 0 && ` > ${selectedCategories.join(", ")}`}
        </CategoryPath>
        <SortControls>
          <strong>정렬:</strong>
          <button onClick={() => setSortOrder("asc")}>오름차순</button>
          <button onClick={() => setSortOrder("desc")}>내림차순</button>
        </SortControls>
      </PathAndSortContainer>

      <SurveyContainer>
        {sorted.map((item) => {
          console.log("네비게이션 직전 item._id:", item._id);
          const answered = item.progress || 0;
          const total = item.captions.length;
          const percent = Math.round((answered / total) * 100);
          return (
            <SurveyItem
              key={item._id}
              ref={(el) => (surveyRefs.current[item.title] = el)}
              onClick={() =>{
                console.log("이동할 surveyId:", item._id);  

                navigate(`/survey/${item.title}`, {
                  state: {
                    image: item.imageUrl,
                    caption: item.captions,
                    country: item.country,
                    category: item.category,
                    entityName: item.entityName,
                    surveyId: item._id,
                    _id: item._id 
                  },
                });
              }}
            >
              <SurveyImage src={item.imageUrl} alt={item.title} />
              <SurveyContent>
                <strong style={{ fontSize: "17px" }}>
                  {`${item.country} > ${item.category} > ${item.entityName}`}
                </strong>
                <ProgressBar value={answered} max={total} />
                <ProgressText>
                  {`${answered} / ${total} (${percent}%)`}
                </ProgressText>
              </SurveyContent>
              <ContinueButton>
                {answered >= total ? "완료" : "이어서 진행하기"}
              </ContinueButton>
            </SurveyItem>
          );
        })}
      </SurveyContainer>
    </SurveypageLayout>
  );
};

export default Survey;

const PathAndSortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CategoryPath = styled.div`
  font-size: 16px;
  color: #444;
`;

const SortControls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  button {
    padding: 6px 12px;
    font-size: 14px;
    border: 1px solid #649eff;
    background-color: white;
    color: #649eff;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background-color: #649eff;
      color: white;
    }
  }
`;

const SurveyContainer = styled.div`
  margin-top: 30px;
`;

const SurveyItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  &:hover {
    background-color: #f0f6ff;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(100, 158, 255, 0.2);
    border-color: #649eff;
  }
`;

const SurveyImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const SurveyContent = styled.div`
  flex: 1;
`;

const ProgressText = styled.div`
  font-size: 15px;
  color: #555;
  margin: 5px 0;
`;

const ProgressBar = styled.progress`
  width: 95%;
  height: 16px;
  margin-bottom: 5px;
  &::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 8px;
  }
  &::-webkit-progress-value {
    background-color: #649eff;
    border-radius: 8px;
  }
`;

const ContinueButton = styled.button`
  padding: 8px 14px;
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  margin-left: auto;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #4a82d9;
  }
`;