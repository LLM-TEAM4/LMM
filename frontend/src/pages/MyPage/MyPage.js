import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProfilePic from "../../assets/img/profile.png";
import LogoImg from "../../assets/img/logo.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  height: 100vh;
`;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
  z-index: 1000;
`;

const HeaderLogo = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 0;

  img {
    width: 150px;
    cursor: pointer;
  }
`;

const NavButtons = styled.div`
  display: flex;
  gap: 30px;
  margin-right: 20px;
`;

const NavButton = styled(Link)`
  padding: 10px 15px;
  font-size: 16px;
  text-decoration: none;
  font-weight: bold;
  color: black;
  background-color: white;
  border: none;
  border-radius: 6px;
  transition: background 0.3s;
  text-align: center;

  &:hover {
    background-color: #68a0f4;
    color: white;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  margin-top: 50px;
  height: calc(100vh - 60px);
`;

const LeftSidebar = styled.div`
  width: 220px;
  padding: 20px;
  background-color: #F5F5F5;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-right: 1px solid #ddd;
`;

const SidebarButton = styled(Link)`
  display: block;
  padding: 12px;
  text-align: center;
  font-size: 16px;
  font-weight:bold;
  text-decoration: none;
  color: black;
  background-color:  #F5F5F5;
  border: none;
  border-radius: 6px;
  transition: background 0.3s;

  &:hover,
  &.active {
    background-color: #68a0f4;
    color: white;
  }
`;

const RightContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left:20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-bottom: 10px;
  width: 100%;
  border-bottom: 1px solid #ddd;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  
`;

const HiddenFileInput = styled.input`
  display: none;
`;


const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid #F5F5F5;
  object-fit: cover; 
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
`;

const InputField = styled.input`
  width: 200px;
  padding: 8px;
  font-size: 16px;
  border-radius: 6px;
  border: 2px solid #F5F5F5;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center; 
  margin-top: 15px; 
  `;

const ActionButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #68a0f4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #4f82d8;
  }
`;

const SecuritySection = styled.div`
  margin-top: 80px;
`;

const SecurityOption = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #68a0f4;
  }
`;

const ModalOverlay = styled.div`
  ${({ isOpen }) => (isOpen ? "display: block;" : "display: none;")}
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  width: 300px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalText = styled.p`
  margin: 0; 
  line-height: 1.2; 
  font-size: 14px; 
`;





///////////////////
const MyPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(ProfilePic);
  const [userName, setUserName] = useState("종합설계1");

  const handleInputChange = (event) => {
    setUserName(event.target.value); // 입력값 업데이트
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // 파일 가져오기
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // 상태 업데이트
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Wrapper>
      <FixedHeader>
      <HeaderLogo>
        <Link to="/mainpage">
        <img src={LogoImg} alt="로고" />
        </Link>
      </HeaderLogo>
        <NavButtons>
          <NavButton to="/survey">🔍설문조사</NavButton>
          <NavButton to="/ranking">🏅랭킹조회</NavButton>
          <NavButton to="/mypage">👤</NavButton>
        </NavButtons>
      </FixedHeader>
      <ContentWrapper>
        <LeftSidebar>
          <SidebarButton to="/mypage">🗒️ 계정정보</SidebarButton>
          <SidebarButton to="/survey-participation">🔍 참여설문</SidebarButton>
        </LeftSidebar>
        <RightContent>
          <SectionTitle>계정</SectionTitle>


          <ProfileSection>
            <ProfileImageWrapper>
              <ProfileImage src={profileImage} alt="Profile" /> {/* ✅ 상태 적용 */}
              <HiddenFileInput 
                type="file" 
                accept="image/*" 
                id="fileUpload"
                onChange={handleImageChange} 
              />
              <ActionButton onClick={() => document.getElementById("fileUpload").click()}>
                사진 변경
              </ActionButton>
            </ProfileImageWrapper>

            <ProfileDetails>
              <InputField 
                type="text" 
                value={userName} 
                onChange={handleInputChange} 
              />
              <ButtonRow>
                <ActionButton>저장</ActionButton>
              </ButtonRow>
            </ProfileDetails>

          </ProfileSection>
          <SecuritySection>
            <SectionTitle>계정보안</SectionTitle>
            <SecurityOption>
              비밀번호 변경 <span>&gt;</span>
            </SecurityOption>
            <SecurityOption onClick={() => setModalOpen(true)}>
              회원 탈퇴 <span>&gt;</span>
            </SecurityOption>
          </SecuritySection>
        </RightContent>
      </ContentWrapper>

      {isModalOpen && (
        <ModalOverlay isOpen={isModalOpen}>
          <ModalContent>
            <h3>정말 탈퇴하시겠어요?</h3>
            <ModalText>탈퇴 버튼 선택시,</ModalText>
            <ModalText>계정은 삭제되며</ModalText>
            <ModalText>복구되지 않습니다.</ModalText>
            <p> </p>
            <p> </p>
            <p> </p>
            <ButtonRow>
              <ActionButton onClick={() => setModalOpen(false)}>취소</ActionButton>
              <ActionButton style={{ backgroundColor: "#FF6187" }}>탈퇴</ActionButton>
            </ButtonRow>
          </ModalContent>
        </ModalOverlay>
      )}
    </Wrapper>
  );
};

export default MyPage;
