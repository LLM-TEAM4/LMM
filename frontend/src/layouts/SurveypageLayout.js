import React from "react";
import styled from "styled-components";
import CommonHeader from "../components/CommonHeader";
import SurveypageSidebar from "../components/SurveypageSidebar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  margin-top: 50px;
  height: calc(100vh - 60px);
`;

const RightContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 20px;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SurveypageLayout = ({
  children,
  selectedCountries,
  handleCountryChange,
  selectedCategories,
  handleCategoryChange,
}) => {
  return (
    <Wrapper>
      <CommonHeader />
      <ContentWrapper>
        <SurveypageSidebar
          selectedCountries={selectedCountries}
          handleCountryChange={handleCountryChange}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
        />

        <RightContent>{children}</RightContent>
      </ContentWrapper>
    </Wrapper>
  );
};

export default SurveypageLayout;
