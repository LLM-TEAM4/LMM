import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MypageLayout from "../../../layouts/MypageLayout";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const CreditInfo = styled.span`
  font-size: 16px;
  color: #4a82d9;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 15px;
  font-size: 16px;
  min-height: 600px;
`;
const Popup = styled.div`
  position: absolute;
  top: 130px;
  right: 60px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  font-size: 14px;
  z-index: 100;
`;
const FormGroup = styled.div`
  margin-bottom: 15px;
  margin-top: 15px;
`;
const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
`;
const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 5px;
`;
const RadioGroup = styled.div`
  display: flex;
  gap: 15px;
`;
const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
`;
const Button = styled.button`
  padding: 15px 20px;
  margin-top: 20px;
  background-color: #68A0F4;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 16px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #4a82d9;
  }
`;
const CaptionAddButton = styled.button`
  background-color: #4a82d9;
  color: white;
  border: none;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: #366ac3;
  }
`;

const AdminPage = () => {
  const navigate = useNavigate();
  const [userCredit, setUserCredit] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${BASE_URL}/api/auth/me`, {
        credentials: "include",
      });
  
      if (res.status === 401) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      if (data && data.user) {
        const name = data.user.userCredit || data.user.id;
        setUserCredit(data.user.credit);
      }
    };
  
    fetchUser();
  }, []);

  const [formData, setFormData] = useState({
    country: "",
    category: "",
    entityName: "",
    captions: ["", "", "", "", ""],
  });

  const [imageFile, setImageFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const creditCount = 3;

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "caption") {
      const updated = [...formData.captions];
      updated[index] = value;
      setFormData({ ...formData, captions: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    console.log("선택된 파일 👉", file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 등록 버튼 클릭됨");

    const formDataToSend = new FormData();
    formDataToSend.append("admin", "admin@admin.com");
    formDataToSend.append("country", formData.country);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("entityName", formData.entityName);
    formDataToSend.append("captions", JSON.stringify(formData.captions));
    formDataToSend.append("image", imageFile);

    try {
      console.log("📡 FormData 전송 시작");
      const res = await fetch("https://backend-culturelens.shop/survey", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      console.log("📥 응답 수신됨", res);
      if (res.ok) {
        alert("등록 완료!");
        setFormData({
          country: "",
          category: "",
          entityName: "",
          captions: ["", "", "", "", ""],
        });
        window.dispatchEvent(new Event("surveyRegistered"));
      } else {
        const error = await res.json();
        alert("등록 실패: " + error.message);
      }
    } catch (err) {
      console.error("❌ 서버 오류:", err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  
  return (
    <MypageLayout>
      <Content>
        <TitleWrapper>
          <SectionTitle>설문 등록</SectionTitle>
          <CreditInfo onClick={() => setShowPopup(!showPopup)}>
            등록 가능한 설문 수 : {userCredit}
          </CreditInfo>
        </TitleWrapper>

        {showPopup && (
          <Popup>
            설문을 등록하려면 크레딧이 필요해요. <br />
            다른 설문에 응답하면 크레딧을 모을 수 있어요!
            <br /><br />
            <Link to="/survey" style={{ color: "#4a82d9", fontWeight: "bold" }}>
              👉 크레딧 모으러 가기
            </Link>
          </Popup>
        )}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>나라</Label>
            <RadioGroup>
              {["한국", "중국", "일본"].map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="country"
                    value={option}
                    checked={formData.country === option}
                    onChange={handleChange}
                  />{" "}
                  {option}
                </label>
              ))}
            </RadioGroup>
          </FormGroup>

          <FormGroup>
            <Label>카테고리</Label>
            <RadioGroup>
              {["architecture", "clothes", "cuisine", "game", "tool"].map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="category"
                    value={option}
                    checked={formData.category === option}
                    onChange={handleChange}
                  />{" "}
                  {option}
                </label>
              ))}
            </RadioGroup>
          </FormGroup>

          <FormGroup>
            <Label>고유명사</Label>
            <Input
              name="entityName"
              value={formData.entityName}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>이미지 업로드</Label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </FormGroup>

          <FormGroup>
            <Label style={{ display: "flex", alignItems: "center" }}>
              캡션
              <CaptionAddButton
                type="button"
                onClick={() => {
                  if (formData.captions.length < 20) {
                    setFormData({
                      ...formData,
                      captions: [...formData.captions, ""],
                    });
                  } else {
                    alert("최대 20개의 캡션만 등록할 수 있습니다.");
                  }
                }}
              >
                + 추가
              </CaptionAddButton>
            </Label>
            {formData.captions.map((caption, index) => (
              <Input
                key={index}
                name="caption"
                placeholder={`${index + 1})`}
                value={caption}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </FormGroup>

          <ButtonGroup>
            <Button type="submit">등록하기</Button>
          </ButtonGroup>
        </form>
      </Content>
    </MypageLayout>
  );
};

export default AdminPage;
