// ✅ MyPage.js 로그인 사용자 정보 + 프로필 업로드 연동
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DefaultProfile from "../../assets/img/profile.png";
import MypageLayout from "../../layouts/MypageLayout";

const InputField = styled.input`
  width: 200px;
  padding: 8px;
  font-size: 16px;
  border-radius: 6px;
  border: 2px solid #F5F5F5;
`;

const WarningText = styled.p`
  font-size: 12px;
  color: ${({ isValid }) => (isValid ? "#68A0F4" : "red")};
  margin-top: 0px;
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

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 15px;
`;

const MyPage = () => {
  const [userName, setUserName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [profileImage, setProfileImage] = useState(DefaultProfile);
  const navigate = useNavigate();

  // ✅ 로그인 사용자 정보 불러오기
  useEffect(() => {
    fetch("http://localhost:4000/api/auth/me", {
      credentials: "include",
    })
      .then(res => {
        if (res.status === 401) {
          navigate("/login");
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data && data.user) {
          setUserName(data.user.id);
          if (data.user.profileImage) {
            setProfileImage(data.user.profileImage);
          }
        }
      });
  }, []);

  const handleInputChange = (event) => {
    const newName = event.target.value;
    setUserName(newName);
    setIsNameValid(newName.length <= 10);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setProfileImage(base64); // ✅ 화면에는 즉시 반영됨
  
        // ✅ 여기 요청이 없으면 DB 저장 안 됨!
        fetch("http://localhost:4000/api/auth/profile", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 세션 필요!
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
  
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <MypageLayout>
      <div style={{ padding: 20 }}>
        <h2>계정 정보</h2>

        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          <div>
            <img
              src={profileImage}
              alt="프로필"
              style={{ width: 150, height: 150, borderRadius: "50%" }}
            />
            <input
              type="file"
              id="fileUpload"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
            <ActionButton
              onClick={() => document.getElementById("fileUpload").click()}
              style={{ marginTop: 10 }}
            >
              사진 변경
            </ActionButton>
          </div>

          <div>
            <InputField
              type="text"
              value={userName}
              onChange={handleInputChange}
            />
            <WarningText isValid={isNameValid}>닉네임은 10글자 초과 불가</WarningText>
            <ButtonRow>
              <ActionButton disabled={!isNameValid}>저장</ActionButton>
            </ButtonRow>
          </div>
        </div>
      </div>
    </MypageLayout>
  );
};

export default MyPage;