import React from "react";
import styled from "styled-components";

const Sidebar = styled.div`
  width: 220px;
  padding: 20px 40px; 
  border-right: 1px solid #ddd;
  background-color: #ffffff;
`;

const SectionTitle = styled.h3`
  font-size: 16px; // 🔁 예: 18px 또는 20px
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
`;


const CheckboxGroup = styled.div`
  margin-bottom: 40px; /* 기존 20px → 40px 정도로 */
`;


const CheckboxLabel = styled.label`
  display: flex;              /* 정렬 개선 */
  align-items: center;
  gap: 8px;                   /* ← 체크박스와 텍스트 간격 */
  margin-bottom: 12px;        /* 각 항목 사이 간격 */
  font-size: 16px;
  line-height: 24px;          /* 줄 간격 */
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

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
            />{" "}
            {cat}
          </CheckboxLabel>
        ))}
      </CheckboxGroup>
    </Sidebar>
  );
};

export default SurveypageSidebar;
