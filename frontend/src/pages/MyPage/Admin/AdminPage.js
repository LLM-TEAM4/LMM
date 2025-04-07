import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MypageLayout from "../../../layouts/MypageLayout";


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

// 👉 기존 Content 안 요소 유지
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
  margin-top:20px;
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

const AdminPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    country: "",
    category: "",
    entityName: "",
    imageUrl: "",
    captions: ["", "", "", "", ""],
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      admin: "admin@admin.com",
      ...formData,
    };

    try {
      const res = await fetch("http://localhost:4000/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log(res);

      if (res.ok) {
        alert("등록 완료!");
        setFormData({
          country: "",
          category: "",
          entityName: "",
          imageUrl: "",
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
          <SectionTitle> 설문 등록</SectionTitle>
            <CreditInfo onClick={() => setShowPopup(!showPopup)}>
              등록 가능한 설문 수 : {creditCount}개
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

          {/* 기존 내용 유지 */}
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
                    /> {option}
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
                    /> {option}
                  </label>
                ))}
              </RadioGroup>
            </FormGroup>

            <FormGroup>
              <Label>고유명사</Label>
              <Input name="entityName" value={formData.entityName} onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>이미지 URL</Label>
              <Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>캡션 5가지</Label>
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
