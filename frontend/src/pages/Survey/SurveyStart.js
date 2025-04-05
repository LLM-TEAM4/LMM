import React, { useState } from "react";
import styled from "styled-components";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import CommonHeader from "../../components/CommonHeader";
import BulgogiImg from "../../assets/img/bulgogi.png";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  height: 100vh;
  overflow-y: auto;

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }
`;


const Container = styled.div`
  padding: 80px 80px;
  min-height: auto;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Breadcrumb = styled.div`
  font-size: 14px;
  color: #666;
`;

const Progress = styled.div`
  font-size: 14px;
  color: #333;
`;

const Image = styled.img`
  width: 80%;
  height: 80%;
  object-fit: cover;
  border-radius: 10px;
  

`;


const Caption = styled.p`
  font-size: 18px;
  font-weight: bold;
  line-height: 1.6;
  color: #333;
  margin-bottom: 20px;

  height: 60px; /* ✅ 고정 높이 */
  overflow: hidden; /* ✅ 넘치는 텍스트 숨김 */
  text-overflow: ellipsis;
  word-wrap: break-word; /* ✅ 단어 잘림 방지 */
  display: -webkit-box;
  -webkit-line-clamp: 5; /* ✅ 최대 줄 수 지정 */
  -webkit-box-orient: vertical;
`;


const Options = styled.div`
  display: flex;
  flex-direction: column; /* ✅ 세로 정렬 */
  align-items: flex-start; /* ✅ 왼쪽 정렬 (필요시) */
  gap: 18px;               /* ✅ 항목 간 간격 */
  margin: 30px 0;
  padding-left: 20px; /* ✅ 오른쪽으로 이동 */
`;


const Option = styled.label`
  display: flex;
  flex-direction: row;  /* ✅ 가로 정렬 */
  align-items: center;  /* ✅ 수직 중앙 정렬 */
  gap: 10px;            /* ✅ 간격 설정 */
  font-size: 14px;
  cursor: pointer;
`;


const ContentBox = styled.div`
  display: flex;
  gap: 0px;
  margin-bottom: 40px;
  
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageBox = styled.div`
  flex: 0.9;
`;

const TextBox = styled.div`
  flex: 1.3;
`;




const NextButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 12px 30px;
  font-size: 16px;
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #3a6fbd;
  }
`;

const OptionLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  text-align: center;

`;


const RadioCircle = styled.input`
  appearance: none;
  border-radius: 50%;
  border: 2px solid #4a82d9;
  background-color: white;
  cursor: pointer;
  margin-bottom: 8px;
  

  width: ${(props) => props.size || 20}px;
  height: ${(props) => props.size || 20}px;

  display: inline-block;         /* ✅ 확실한 크기 적용 */
  vertical-align: middle;
  padding: 0;                    /* ✅ 크기 왜곡 방지 */
  box-sizing: border-box;        /* ✅ 정확한 border 계산 */

  &:checked {
    background-color: #4a82d9;
  }
    &:hover {
    background-color: #649eff;
  }
`;

const sizes = [22, 22, 22, 22, 22]; // 1번, 5번 가장 크고 가운데가 작게



const SurveyStart = () => {
  const { title } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { image, caption = [], path } = location.state || {};

  const [selected, setSelected] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const fallbackImage = BulgogiImg;
  const fallbackCaption = "설명이 제공되지 않았습니다.";

  const handleNext = () => {
    if (currentIndex < caption.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/survey", {
        state: {
          completedTitle: title,
        },
        replace: true,
      });
    }
  };

  return (
    <Wrapper>
      <CommonHeader />

      <Container>
        <TopBar>
          <Breadcrumb>{path || `한국 > cuisine > ${title}`}</Breadcrumb>
          <Progress>
            {caption.length > 0 ? currentIndex + 1 : 0}/{caption.length || 5}
          </Progress>
        </TopBar>

        <ContentBox>
  <ImageBox>
    <Image src={image || fallbackImage} alt={title} />
  </ImageBox>

  <TextBox>
    <Caption>{caption[currentIndex] || fallbackCaption}</Caption>

    <Options>
  {[1, 2, 3, 4, 5].map((num, idx) => (
    <Option key={num}>
      <RadioCircle
        type="radio"
        name={`rating-${currentIndex}`}
        value={num}
        size={sizes[idx]} // 👈 크기 props 전달
        checked={selected[currentIndex] === num}
        onChange={() =>
          setSelected((prev) => ({ ...prev, [currentIndex]: num }))
        }
      />
        <OptionLabel>
    {
      [
        "1. 문화적으로 풍부하다",
        "2. 문화적으로 매우 적절하다",
        "3. 문화적으로 적절하다",
        "4. 중립적 또는 일반적이다",
        "5. 문화적으로 부적절하다",
      ][num - 1]
    }
  </OptionLabel>
    </Option>
  ))}
</Options>


    <NextButton
      disabled={selected[currentIndex] == null}
      onClick={handleNext}
    >
      다음으로
    </NextButton>
  </TextBox>
</ContentBox>

      </Container>
    </Wrapper>
  );
};

export default SurveyStart;
