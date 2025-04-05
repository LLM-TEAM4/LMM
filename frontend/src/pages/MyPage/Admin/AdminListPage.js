import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MypageLayout from "../../../layouts/MypageLayout";


const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  
  
`;
const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 15px;
  font-size: 14px;
  min-height: 600px;
`;

const SurveyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const SurveyCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fafafa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: all 0.2s ease;

  &:hover {
    border-color: #4a82d9;
    box-shadow: 0 4px 8px rgba(74, 130, 217, 0.15);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;


const CardInfo = styled.div`
  padding: 10px;
`;

const InfoItem = styled.p`
  margin: 5px 0;
  font-weight: 500;
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const AdminListPage = () => {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const countries = ["한국", "중국", "일본"];
  const categories = ["architecture", "cuisine", "tool", "clothes", "game"];

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const res = await fetch("http://localhost:4000/survey");
        const data = await res.json();
        setSurveys(data);
        setFilteredSurveys(data);
      } catch (err) {
        console.error("❌ 설문 목록 불러오기 실패:", err);
      }
    };

    fetchSurveys();
  }, []);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    let filtered = surveys;

    if (selectedCountry) {
      filtered = filtered.filter((survey) => survey.country === selectedCountry);
    }

    if (selectedCategory) {
      filtered = filtered.filter((survey) => survey.category === selectedCategory);
    }

    setFilteredSurveys(filtered);
  }, [selectedCountry, selectedCategory, surveys]);

  return (
    <MypageLayout>
        <Content>
          <TitleWrapper>
            <SectionTitle>내 설문 목록</SectionTitle>
            <SelectWrapper>
              <div>
                <label htmlFor="country">나라 선택:</label>
                <Select id="country" value={selectedCountry} onChange={handleCountryChange}>
                  <option value="">전체</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label htmlFor="category">카테고리 선택:</label>
                <Select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                  <option value="">전체</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </div>
            </SelectWrapper>
          </TitleWrapper>

          {filteredSurveys.length === 0 ? (
            <p>등록한 설문조사가 없습니다.</p>
          ) : (
            <SurveyGrid>
              {filteredSurveys.map(({ _id, country, category, entityName, imageUrl }) => (
                <SurveyCard key={_id}>
                  <StyledLink to={`/mypage/survey-creation-detail/${_id}`}>
                    <Image src={imageUrl} alt={category} />
                    <CardInfo>
                      <InfoItem>🌏 나라: {country}</InfoItem>
                      <InfoItem>📂 카테고리: {category}</InfoItem>
                      <InfoItem>📂 고유명사: {entityName}</InfoItem>
                    </CardInfo>
                  </StyledLink>
                </SurveyCard>
              ))}
            </SurveyGrid>
          )}
        </Content>
        </MypageLayout>
  );
};

export default AdminListPage;
