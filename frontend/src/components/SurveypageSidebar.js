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

const countries = ["한국", "중국", "일본"];
const categories = ["architecture", "clothes", "cuisine", "game", "tool"];

const SurveypageSidebar = ({
  selectedCountries,
  handleCountryChange,
  selectedCategories,
  handleCategoryChange,
}) => {
  return (
    <Sidebar>
      <SectionTitle>국가</SectionTitle>
      <CheckboxGroup>
        {countries.map((country) => (
          <CheckboxLabel key={country}>
            <input
              type="checkbox"
              onChange={() => handleCountryChange(country)}
              checked={selectedCountries.includes(country)}
            />
            {country}
          </CheckboxLabel>
        ))}
      </CheckboxGroup>

      <SectionTitle>카테고리</SectionTitle>
      <CheckboxGroup>
        {categories.map((cat) => (
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

      <SelectButton>선택하기</SelectButton>
    </Sidebar>
  );
};

export default SurveypageSidebar;
