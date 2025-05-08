import React from "react";
import styled from "styled-components";
import CommonHeader from "../components/CommonHeader";
import RankingpageSidebar from "../components/RankingpageSidebar";

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
  padding: 60px 20px 20px 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

const RankingpageLayout = ({ children }) => {
  return (
    <Wrapper>
      <CommonHeader />
      <ContentWrapper>
        <RankingpageSidebar />
        <RightContent>{children}</RightContent>
      </ContentWrapper>
    </Wrapper>
  );
};

export default RankingpageLayout;
