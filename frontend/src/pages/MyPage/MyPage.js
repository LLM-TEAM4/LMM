// ✅ MyPage.js 로그인 사용자 정보 표시 및 세션 연동
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../../assets/img/profile.png";
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
  const [profileImage, setProfileImage] = useState(ProfilePic);
  const navigate = useNavigate();

  // ✅ 로그인 사용자 정보 불러오기
  useEffect(() => {
    fetch("http://localhost:4000/api/auth/me", {
      credentials: "include",
    })
      .then(res => {
        if (res.status === 401) {
          navigate("/login"); // 비로그인 시 로그인 페이지로
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data && data.user) {
          setUserName(data.user.id);
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
      reader.onloadend = () => setProfileImage(reader.result);
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
            <WarningText isValid={isNameValid}>
              닉네임은 10글자 초과 불가
            </WarningText>
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
