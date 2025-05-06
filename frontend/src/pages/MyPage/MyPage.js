// ✅ MyPage.js 로그인 사용자 정보 + 프로필/닉네임 업로드 연동 + 중복검사 + 아이디 표시 + 닉네임 수정 아이콘 + 기본 이미지 복원
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
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

const InfoText = styled.p`
  font-size: 14px;
  color: #444;
  margin-bottom: 8px;
`;

const NicknameLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #444;
  margin-bottom: 4px;
`;

const MyPage = () => {
  const [nickname, setNickname] = useState("");
  const [originalNickname, setOriginalNickname] = useState("");
  const [userId, setUserId] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [profileImage, setProfileImage] = useState(DefaultProfile);
  const navigate = useNavigate();

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
          const name = data.user.nickname || data.user.id;
          setNickname(name);
          setOriginalNickname(name);
          setUserId(data.user.id);
          if (data.user.profileImage) {
            setProfileImage(data.user.profileImage);
          }
        }
      });
  }, []);

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
            <ActionButton
              onClick={handleResetToDefaultImage}
              style={{ marginTop: 10, marginLeft: 10 }}
            >
              기본 이미지로 변경
            </ActionButton>
          </div>

          <div>
            <InfoText>아이디: <strong>{userId}</strong></InfoText>

            <NicknameLabel>
              <FaPencilAlt style={{ color: "#649eff" }} /> 닉네임
            </NicknameLabel>
            <InputField
              type="text"
              value={nickname}
              onChange={handleInputChange}
            />
            <WarningText isValid={isNameValid}>닉네임은 10글자 초과 불가</WarningText>
            <ButtonRow>
              <ActionButton onClick={handleNicknameSave} disabled={!isNameValid}>저장</ActionButton>
            </ButtonRow>
          </div>
        </div>
      </div>
    </MypageLayout>
  );
};

export default MyPage;
