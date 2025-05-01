import React, { useState } from "react";
import RankingpageLayout from "../../layouts/RankingpageLayout";
import userProfileImage from '../../assets/img/userprofile.png';
import koreaImage from '../../assets/img/Koreaprofile.png'; // 한국 이미지
import chinaImage from '../../assets/img/Chinaprofile.png'; // 중국 이미지
import japanImage from '../../assets/img/Japanprofile.png'; // 일본 이미지



const RankingMonthlyPage = () => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null)
  const countries = ["한국", "중국", "일본"];
  const users = ["user1", "user2", "user3", "user4", "user5"];

  const countryImages = {
    한국: koreaImage,
    중국: chinaImage,
    일본: japanImage,
  };

  const styles = {
    container: {
      padding: "0 2rem 2rem 0",
    },
    header: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "2rem",
      display: "flex",
      flexDirection: "column",  
    },
    divider: {
      width: "100%",             
      height: "1.5px",
      backgroundColor: "#ccc",   
      marginTop: "8px",           
    },
    rankingWrapper: {
      display: "flex",
      justifyContent: "center",
      gap: "2rem",
    },
    card: {
      backgroundColor: "#f5f5f5",
      padding: "1rem",
      borderRadius: "1rem",
      width: "280px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      transition: "box-shadow 0.2s ease-in-out",
      cursor: "pointer",
    },

    cardHover: {
      backgroundColor: "#3a6fbd", //하늘색
      transform: "translateY(-4px)",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
    },

    image: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      margin: "0 auto 1rem",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.07)",
      backgroundSize: "cover",  
      backgroundPosition: "center",  
      backgroundColor: "transparent",   
      border: "2.5px solid white"
    },

    countryName: {
      textAlign: "center",
      marginTop: "0.5rem",
      marginBottom: "1.5rem",
    },

    userList: {
      listStyle: "none",
      padding: 0,
      marginTop: "0.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    userItem: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "0.8rem 0",
      fontSize: "1rem",
      width: "80%",
    },
    userIcon: {
      width: "30px",
      height: "30px",
      backgroundImage: `url(${userProfileImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "50%",
      marginRight: "10px",
    },
    
    badge: {
      fontSize: "1.5rem",
      marginRight: "10px",
    },
    
    userBox: {
      backgroundColor: "#e0e0e0",
      padding: "8px 12px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",            
      boxSizing: "border-box",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
    }
  };

  const getRankStyle = (rank) => {
    switch (rank) {
      case 0: // 1위
        return {
          border: "2px solid gold",
          backgroundColor: "#fff9e6",
          badge: "🥇",  // 1위 금메달
        };
      case 1: // 2위
        return {
          border: "2px solid #b0b0b0",
          backgroundColor: "#f5f5f5",
          badge: "🥈",  // 2위 은메달
        };
      case 2: // 3위
        return {
          border: "2px solid #cd7f32",  // 동메달색
          backgroundColor: "#fdf1e0",
          badge: "🥉",  // 3위 동메달
        };
      case 3: // 4위
        return {
          border: "1px solid #ccc",
          backgroundColor: "#f5f5f5",
          badge: "4️⃣", // 4위 이모지
        };
      case 4: // 5위
        return {
          border: "1px solid #ccc",
          backgroundColor: "#f5f5f5",
          badge: "5️⃣", // 5위 이모지
        };
      default:
        return {
          border: "1px solid #ccc",
          backgroundColor: "#f5f5f5",
          badge: `#${rank + 1}`, // 그 외 순위
        };
    }
  };
  

  return (
    <RankingpageLayout>
      <div style={styles.container}>
        <h2 style={styles.header}>
          🎖️ 월간 통합 순위
          <div style={styles.divider}></div>
        </h2>
        <div style={styles.rankingWrapper}>
          {countries.map((country, idx) => (
            <div
              key={idx}
              style={{
                ...styles.card,
                ...(hoveredCardIndex === idx && {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
                  backgroundColor: "#E7F3FF",
                  border: "2px solid #1E90FF"
                }),
              }}
              onMouseEnter={() => setHoveredCardIndex(idx)} // hover 상태 변경
              onMouseLeave={() => setHoveredCardIndex(null)} // hover 상태 초기화
            >
              <div
                style={{
                  ...styles.image,
                  backgroundImage: `url(${countryImages[country]})`, // 나라에 맞는 이미지 설정
                }}
              />
              <h3 style={styles.countryName}>{country}</h3>
              <ul style={styles.userList}>
                {users.map((user, index) => (
                  <li key={index} style={styles.userItem}>
                    <div style={{ ...styles.userBox, ...getRankStyle(index) }}>
                      <span style={styles.badge}>{getRankStyle(index).badge}</span>
                      <span style={styles.userIcon}></span>
                      <span>{user}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </RankingpageLayout>
  );
};

export default RankingMonthlyPage;
