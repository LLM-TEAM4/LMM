// src/data/surveyData.js
import BulgogiImg from "../assets/img/bulgogi.png";
import BibimbabImg from "../assets/img/bibimbab.png";
import KimchiImg from "../assets/img/kimchi.png";
import HanbokImg from "../assets/img/hanbok.png";
import GyeongbokgungImg from "../assets/img/gyeongbokgung.png";

import ChineseWallImg from "../assets/img/chinese_wall.png";
import JjajangmyeonImg from "../assets/img/jjajangmyeon.png";
import CheongsamImg from "../assets/img/cheongsam.png";
//import MahjongImg from "../assets/img/mahjong.png";

import SushiImg from "../assets/img/sushi.png";
import KimonoImg from "../assets/img/kimono.png";
import TokyoTowerImg from "../assets/img/tokyo_tower.png";
//import OrigamiImg from "../assets/img/origami.png";

const surveys = [
  // ✅ 한국
  {
    title: "불고기",
    country: "한국",
    category: "cuisine",
    progress: 20,
    total: 20,
    image: BulgogiImg,
    caption: "",
  },
  {
    title: "비빔밥",
    country: "한국",
    category: "cuisine",
    progress: 10,
    total: 20,
    image: BibimbabImg,
    caption: "",
  },
  {
    title: "김치",
    country: "한국",
    category: "cuisine",
    progress: 1,
    total: 20,
    image: KimchiImg,
    caption: "",
  },
  {
    title: "한복",
    country: "한국",
    category: "clothes",
    progress: 15,
    total: 20,
    image: HanbokImg,
    caption: "",
  },
  {
    title: "경복궁",
    country: "한국",
    category: "architecture",
    progress: 5,
    total: 20,
    image: GyeongbokgungImg,
    caption: "",
  },

  // ✅ 중국
  {
    title: "만리장성",
    country: "중국",
    category: "architecture",
    progress: 6,
    total: 20,
    image: ChineseWallImg,
    caption: "",
  },
  {
    title: "짜장면",
    country: "중국",
    category: "cuisine",
    progress: 3,
    total: 20,
    image: JjajangmyeonImg,
    caption: "",
  },
  {
    title: "치파오",
    country: "중국",
    category: "clothes",
    progress: 12,
    total: 20,
    image: CheongsamImg,
    caption: "",
  },

  // ✅ 일본
  {
    title: "스시",
    country: "일본",
    category: "cuisine",
    progress: 2,
    total: 20,
    image: SushiImg,
    caption: "",
  },
  {
    title: "기모노",
    country: "일본",
    category: "clothes",
    progress: 19,
    total: 20,
    image: KimonoImg,
    caption: "",
  },
  {
    title: "도쿄 타워",
    country: "일본",
    category: "architecture",
    progress: 4,
    total: 20,
    image: TokyoTowerImg,
    caption: "",
  },
];

export default surveys;
