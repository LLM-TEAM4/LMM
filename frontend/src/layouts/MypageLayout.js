import React from "react";
import styled from "styled-components";
import CommonHeader from "../components/CommonHeader";
import MypageSidebar from "../components/MypageSidebar";

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
  padding: 0px 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;


const MypageLayout = ({ children, CustomSidebar }) => {
  return (
    <Wrapper>
      <CommonHeader />
      <ContentWrapper>
        {CustomSidebar ? <CustomSidebar /> : <MypageSidebar />}
        <RightContent>{children}</RightContent>
      </ContentWrapper>
    </Wrapper>
  );
};


export default MypageLayout;
