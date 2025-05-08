// src/data/surveyData.js
import BulgogiImg from "../assets/img/bulgogi.png";
import BibimbabImg from "../assets/img/bibimbab.png";
import KimchiImg from "../assets/img/kimchi.png";
import HanbokImg from "../assets/img/hanbok.png";
import GyeongbokgungImg from "../assets/img/gyeongbokgung.png";

import ChineseWallImg from "../assets/img/chinese_wall.png";
import JjajangmyeonImg from "../assets/img/jjajangmyeon.png";
import CheongsamImg from "../assets/img/cheongsam.png";

import SushiImg from "../assets/img/sushi.png";
import KimonoImg from "../assets/img/kimono.png";
import TokyoTowerImg from "../assets/img/tokyo_tower.png";

const surveys = [
  {
    title: "불고기",
    country: "한국",
    category: "cuisine",
    progress: 20,
    total: 20,
    image: BulgogiImg,
    createdBy: "최휘윤",
    caption: [
      "(1) A traditional Korean dish, Bulgogi is marinated thinly sliced beef that has been grilled or stir-fried.",
      "(2) Korean Bulgogi consists of marinated beef that has been cooked through grilling or stir-frying.",
      "(3) The image shows a plate of Chinese beef stir-fry, accompanied by noodles and steamed broccoli.",
      "(4) This image depicts a plate of food, likely featuring meat as the main ingredient.",
      "(5) Bulgogi, a classic Korean cuisine, features marinated beef that has been grilled or stir-fried.",
    ],
  },
  {
    title: "비빔밥",
    country: "한국",
    category: "cuisine",
    progress: 10,
    total: 20,
    image: BibimbabImg,
    createdBy: "최휘윤",
    caption: [
      "(1) Bibimbap is a Korean mixed rice dish with assorted vegetables, meat, egg, and gochujang.",
      "(2) This image displays a Western rice bowl topped with grilled chicken and avocado.",
      "(3) Bibimbap is often served in a hot stone bowl to keep it warm while eating.",
      "(4) The dish shown could be considered a fusion of various Asian cuisines.",
      "(5) A healthy Korean rice bowl called bibimbap balances flavor and nutrition.",
    ],
  },
  {
    title: "김치",
    country: "한국",
    category: "cuisine",
    progress: 1,
    total: 20,
    image: KimchiImg,
    createdBy: "이수연",
    caption: [
      "(1) Kimchi is a traditional Korean side dish made of fermented vegetables such as cabbage and radish.",
      "(2) This image shows sauerkraut, a popular German fermented cabbage side dish.",
      "(3) Kimchi includes chili pepper, garlic, ginger, and fish sauce as main ingredients.",
      "(4) The dish in the image is most likely coleslaw served as a Western salad.",
      "(5) Kimchi is known for its spicy, sour taste and is a staple in Korean meals.",
    ],
  },
  {
    title: "한복",
    country: "한국",
    category: "clothes",
    progress: 15,
    total: 20,
    image: HanbokImg,
    createdBy: "이수연",
    caption: [
      "(1) Hanbok is a traditional Korean attire characterized by vibrant colors and elegant designs.",
      "(2) The image portrays a modern Western-style dress.",
      "(3) Korean Hanbok often includes intricate embroidery and detailed craftsmanship.",
      "(4) The garment in the image appears to be traditional clothing from another East Asian culture.",
      "(5) Hanbok is commonly worn during Korean celebrations and festivals.",
    ],
  },
  {
    title: "경복궁",
    country: "한국",
    category: "architecture",
    progress: 5,
    total: 20,
    image: GyeongbokgungImg,
    createdBy: "이경은",
    caption: [
      "(1) Gyeongbokgung Palace is a historical royal palace located in Seoul, South Korea.",
      "(2) The image depicts a historical structure likely from China or Japan.",
      "(3) Gyeongbokgung is famous for its beautiful architecture and historical significance.",
      "(4) This building appears to be a modern interpretation of traditional architecture.",
      "(5) Gyeongbokgung was the main royal palace during the Joseon Dynasty.",
    ],
  },
  {
    title: "만리장성",
    country: "중국",
    category: "architecture",
    progress: 6,
    total: 20,
    image: ChineseWallImg,
    createdBy: "이경은",
    caption: [
      "(1) The Great Wall of China is an ancient defensive structure stretching across northern China.",
      "(2) The image shows a medieval castle wall from Europe.",
      "(3) The Great Wall was built to protect China from invasions and raids.",
      "(4) This wall in the image is more likely part of a modern defensive structure.",
      "(5) The Great Wall is recognized as one of the world's great architectural achievements.",
    ],
  },
  {
    title: "짜장면",
    country: "중국",
    category: "cuisine",
    progress: 3,
    total: 20,
    image: JjajangmyeonImg,
    createdBy: "장선우",
    caption: [
      "(1) Jajangmyeon is a Korean-Chinese dish featuring noodles topped with black bean sauce.",
      "(2) The noodles shown here appear to be spaghetti with a tomato-based sauce.",
      "(3) Jajangmyeon is popular comfort food in South Korea.",
      "(4) This dish seems like a typical Chinese noodle stir-fry.",
      "(5) Jajangmyeon is commonly eaten on special occasions and delivery meals in Korea.",
    ],
  },
  {
    title: "치파오",
    country: "중국",
    category: "clothes",
    progress: 12,
    total: 20,
    image: CheongsamImg,
    createdBy: "장선우",
    caption: [
      "(1) Cheongsam, also known as Qipao, is a traditional Chinese dress noted for its fitted silhouette and ornate designs.",
      "(2) The image appears to show traditional Korean clothing rather than a Qipao.",
      "(3) The Cheongsam originated in 1920s Shanghai and became iconic Chinese attire.",
      "(4) This dress shown could represent another East Asian traditional attire.",
      "(5) Cheongsam is often worn for cultural events and formal occasions in China.",
    ],
  },
  {
    title: "스시",
    country: "일본",
    category: "cuisine",
    progress: 2,
    total: 20,
    image: SushiImg,
    createdBy: "최휘윤",
    caption: [
      "(1) Sushi is a traditional Japanese dish consisting of vinegared rice accompanied by seafood and vegetables.",
      "(2) This image shows Korean-style rice rolls known as Kimbap.",
      "(3) Sushi is renowned globally for its presentation and delicate flavors.",
      "(4) The dish in the image could be sashimi, raw seafood without rice.",
      "(5) Sushi includes varieties such as nigiri, maki, and sashimi.",
    ],
  },
  {
    title: "기모노",
    country: "일본",
    category: "clothes",
    progress: 19,
    total: 20,
    image: KimonoImg,
    createdBy: "이수연",
    caption: [
      "(1) The Kimono is a traditional Japanese garment worn for special occasions.",
      "(2) The image depicts Korean Hanbok rather than a Kimono.",
      "(3) Kimonos often feature elaborate patterns, colors, and symbolic motifs.",
      "(4) The clothing in the image might represent a traditional Chinese garment.",
      "(5) Kimono is traditionally worn at ceremonies, festivals, and cultural events in Japan.",
    ],
  },
  {
    title: "도쿄 타워",
    country: "일본",
    category: "architecture",
    progress: 4,
    total: 20,
    image: TokyoTowerImg,
    createdBy: "장선우",
    caption: [
      "(1) Tokyo Tower is a prominent communications and observation tower in Tokyo, Japan.",
      "(2) This image resembles the Eiffel Tower located in Paris, France.",
      "(3) Tokyo Tower stands out with its distinct red-and-white design.",
      "(4) The tower in this image appears to be another famous landmark structure from Asia.",
      "(5) Tokyo Tower serves as a popular tourist destination and cultural symbol in Japan.",
    ],
  },
];

export default surveys;
