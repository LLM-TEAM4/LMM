// src/data/surveyData.js
import BulgogiImg from "../assets/img/bulgogi.png";
import BibimbabImg from "../assets/img/bibimbab.png";
import KimchiImg from "../assets/img/kimchi.png";

const surveys = [
  {
    title: "불고기",
    progress: 20,
    total: 20,
    image: BulgogiImg,
    category: "cuisine",
    caption: "...",
  },
  {
    title: "비빔밥",
    progress: 10,
    total: 20,
    image: BibimbabImg,
    category: "cuisine",
    caption: "...",
  },
  {
    title: "김치",
    progress: 0,
    total: 20,
    image: KimchiImg,
    category: "cuisine",
    caption: "...",
  },
];

export default surveys;
