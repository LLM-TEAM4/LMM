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

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;


const SurveypageLayout = ({ children, selectedCategories, handleCategoryChange }) => { //surveypagesidebar이 넘겨주는 props
  return (
    <Wrapper>
      <CommonHeader />
      <ContentWrapper>
      <SurveypageSidebar
     selectedCategories={selectedCategories}
      handleCategoryChange={handleCategoryChange}
/>

        <RightContent>{children}</RightContent>
      </ContentWrapper>
    </Wrapper>
  );
};

export default SurveypageLayout;