import React from "react";
import styled from "styled-components";

const Sidebar = styled.div`
  width: 220px;
  padding: 20px 40px; 
  border-right: 1px solid #ddd;
  background-color: #ffffff;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
`;

const CheckboxGroup = styled.div`
  margin-bottom: 40px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 16px;
  line-height: 24px;
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
    font-size: 16px;

  &:hover {
    background-color: #4a82d9;
  }
`;

const SurveypageSidebar = ({ selectedCategories, handleCategoryChange }) => {
  return (
    <Sidebar>
      <SectionTitle>국가</SectionTitle>
      <CheckboxGroup>
        <CheckboxLabel>
          <input type="checkbox" /> 한국
        </CheckboxLabel>
        <CheckboxLabel>
          <input type="checkbox" /> 중국
        </CheckboxLabel>
        <CheckboxLabel>
          <input type="checkbox" /> 일본
        </CheckboxLabel>
      </CheckboxGroup>

      <SectionTitle>카테고리</SectionTitle>
      <CheckboxGroup>
        {["architecture", "clothes", "cuisine", "game", "tool"].map((cat) => (
          <CheckboxLabel key={cat}>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange(cat)}
              checked={selectedCategories.includes(cat)}
            />
            {cat}
          </CheckboxLabel>
        ))}
      </CheckboxGroup>

      {/* ✅ 버튼 추가 위치 */}
      <SelectButton>선택하기</SelectButton>
    </Sidebar>
  );
};

export default SurveypageSidebar;
