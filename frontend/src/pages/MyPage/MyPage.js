// ✅ MyPage.js 로그인 사용자 정보 + 프로필/닉네임 업로드 연동 + 중복검사 + 아이디 표시 + 닉네임 수정 아이콘 + 기본 이미지 복원
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import DefaultProfile from "../../assets/img/profile.png";
import MypageLayout from "../../layouts/MypageLayout";


const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 20px;
  padding: 40px 20px;
`;


const LogoutWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;



const ProfileCard = styled.div`
  background: #f9f9f9;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  text-align: center;
  display: flex;       
  flex-direction: column; 
  justify-content: center; 
   min-height: 250px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* 그림자 추가 */
  border: 3px solid #ffffff; /* 흰색 테두리 추가 */
`;

const Title = styled.h2`
  font-size: 24px;
  
  margin-bottom: 20px;
`;

const InfoText = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const NicknameSection = styled.div`
  margin-top: 5px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  padding: 12px 24px;
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  width: fit-content;
  &:hover {
    background-color: #4a82d9;
  }
`;

const LogoutButton = styled(StyledButton)`
  background-color: #f44336;
  padding: 8px 16px;
  font-size: 14px;
  width: auto;
  &:hover {
    background-color: #d32f2f;
  }
`;


const ProfileContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

const ProfileCardSquare = styled(ProfileCard)`
  width: 300px;       // 너비 고정
  height: 300px;      // 높이 고정
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const MyPage = () => {
  const [nickname, setNickname] = useState("");
  const [originalNickname, setOriginalNickname] = useState("");
  const [userId, setUserId] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [profileImage, setProfileImage] = useState(DefaultProfile);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:4000/api/auth/me", {
        credentials: "include",
      });
  
      if (res.status === 401) {
        alert("로그인 후 이용해주세요. 로그인 화면으로 이동합니다.");
        setTimeout(() => {
          navigate("/login");
        }, 500);  // 0.5초 뒤 이동 (너무 빠르면 안 보일 수 있으니 약간의 시간 줌)
        return;
      }
  
      const data = await res.json();
  
      if (data && data.user) {
        const name = data.user.nickname || data.user.id;
        setNickname(name);
        setOriginalNickname(name);
        setUserId(data.user.id);
  
        if (!data.user.profileImage || data.user.profileImage === "") {
          const blob = await fetch(DefaultProfile).then(res => res.blob());
          const base64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
  
          setProfileImage(base64);
          uploadProfileImage(base64);
        } else {
          setProfileImage(data.user.profileImage);
        }
      }
    };
  
    fetchUser();
  }, []);
  

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        alert("로그아웃 되었습니다.");
        navigate("/main");
      } else {
        alert("로그아웃 실패");
      }
    } catch (err) {
      console.error(err);
      alert("오류 발생");
    }
  };
  
  const handleInputChange = (event) => {
    const newName = event.target.value;
    setNickname(newName);
    setIsNameValid(newName.length <= 10);
  };

  const uploadProfileImage = (base64) => {
    fetch("http://localhost:4000/api/auth/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ profileImage: base64 }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("업로드 실패");
        return res.json();
      })
      .then((data) => {
        console.log("✅ 서버 응답:", data);
      })
      .catch((err) => {
        console.error("❌ 서버 요청 실패:", err);
      });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setProfileImage(base64);
        uploadProfileImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetToDefaultImage = () => {
    setProfileImage(DefaultProfile);
    fetch(DefaultProfile) // fetch하여 base64 변환
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result;
          uploadProfileImage(base64);
        };
        reader.readAsDataURL(blob);
      });
  };

  const handleNicknameSave = () => {
    if (nickname === originalNickname) {
      alert("닉네임이 변경되지 않았습니다.");
      return;
    }

    fetch(`http://localhost:4000/api/auth/check-nickname/${nickname}`)
      .then(res => res.json())
      .then(data => {
        if (data.exists) {
          alert("이미 존재하는 닉네임입니다.");
          return;
        }

        fetch("http://localhost:4000/api/auth/nickname", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ nickname }),
        })
          .then(res => {
            if (!res.ok) throw new Error("변경 실패");
            return res.json();
          })
          .then(data => {
            alert("✅ 닉네임이 변경되었습니다.");
            setOriginalNickname(nickname);
          })
          .catch(err => {
            alert("❌ 닉네임 변경 중 오류 발생");
            console.error(err);
          });
      });
  };


 

  return (
    <MypageLayout>
      <PageWrapper>
  <ProfileCardSquare>
    <ProfileImage src={profileImage} alt="프로필" />
    <ButtonRow>
      <StyledButton onClick={() => document.getElementById("fileUpload").click()}>사진 변경</StyledButton>
      <StyledButton onClick={handleResetToDefaultImage}>기본 이미지로 변경</StyledButton>
    </ButtonRow>
    <input type="file" id="fileUpload" style={{ display: "none" }} accept="image/*" onChange={handleImageChange} />
  </ProfileCardSquare>

  <ProfileCard>
  <InfoText style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>
    📬 유저아이디 : {userId}로 로그인 중</InfoText>
    <NicknameSection>
      <InfoText>
        닉네임 변경</InfoText>
      <input
        type="text"
        value={nickname}
        onChange={handleInputChange}
        style={{ width: "200px", padding: "8px", fontSize: "16px", borderRadius: "6px", border: "2px solid #F5F5F5" }}
      />
      <ButtonRow>
        <StyledButton onClick={handleNicknameSave} disabled={!isNameValid}>저장</StyledButton>
      </ButtonRow>
    </NicknameSection>
  </ProfileCard>
</PageWrapper>

<LogoutWrapper>
  <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
</LogoutWrapper>
  
      
    </MypageLayout>
  );
  

  
};

export default MyPage;
