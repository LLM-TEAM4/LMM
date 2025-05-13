import React, { useState, useEffect } from "react";
import RankingpageLayout from "../../layouts/RankingpageLayout";
import defaultProfileImage from '../../assets/img/profile.png';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const RankingWeeklyPage = () => {
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/ranking/weekly`);
        const data = await res.json();
        const processedData = processRankingData(data);
        setRankingData(processedData);
      } catch (error) {
        console.error("랭킹 데이터 불러오기 실패", error);
      }
    };
    fetchRankingData();
  }, []);

  const processRankingData = (data) => {
    // 응답 개수와 닉네임 기준으로 정렬
    data.sort((a, b) => {
      if (a.count === b.count) {
        return a.nickname.localeCompare(b.nickname); // 사전식 정렬
      }
      return b.count - a.count; // 응답 개수 기준 내림차순
    });

    // 응답 수 별로 순위를 매깁니다.
    let rank = 1;
    let lastCount = null;
    let adjustedData = [];

    data.forEach((user, index) => {
      if (user.count !== lastCount) {
        // 새로운 응답 개수일 경우 순위를 갱신
        lastCount = user.count;
        if (user.count === 4) rank = 1;
        else if (user.count === 3) rank = 2;
        else if (user.count === 2) rank = 3;
        else return; // 1, 2, 3응답자만 표시
      }

      adjustedData.push({ ...user, rank });
    });

    return adjustedData;
  };

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return { backgroundColor: "#fff9e6", badge: "🥇" }; // 1등: 금메달
      case 2:
        return { backgroundColor: "#f5f5f5", badge: "🥈" }; // 2등: 은메달
      case 3:
        return { backgroundColor: "#fdf1e0", badge: "🥉" }; // 3등: 동메달
      default:
        return null; // 그 외는 표시하지 않음
    }
  };

  const styles = {
    content: {
      flex: 1,
      padding: "20px",
      backgroundColor: "#ffffff",
      borderRadius: "15px",
      fontSize: "14px",
      minHeight: "600px",
      marginBottom: "20px",
    },
    container: {
      padding: "0 2rem 2rem 0",
      marginTop: "20px",
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
      flexWrap: "wrap", // 여러 줄로 자동 정렬
      justifyContent: "center",
      gap: "2rem",
    },
    card: {
      backgroundColor: "#f5f5f5",
      padding: "1rem",
      borderRadius: "1rem",
      width: "250px", // 카드 크기
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      transition: "box-shadow 0.2s ease-in-out",
      cursor: "pointer",
    },
    badge: {
      fontSize: "2rem", // 배지를 크게 보이게 함
      marginBottom: "0.5rem",
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

  return (
    <RankingpageLayout>
      <Content>
      <div style={styles.container}>
        <h2 style={styles.header}>
          📅 주간 통합 순위
          <div style={styles.divider}></div>
        </h2>
        <div style={styles.rankingWrapper}>
          {rankingData.map((user, index) => {
            const rankStyle = getRankStyle(user.rank);
            if (!rankStyle) return null; // 4등부터는 표시하지 않음

            return (
              <div
                key={index}
                style={{
                  ...styles.card,
                }}
              >
                <div style={styles.badge}>{rankStyle.badge}</div>
                <h3>{user.nickname || user.id}</h3>
                <span>{user.count} 응답</span>
              </div>
            );
          })}
        </div>
      </div>
      </Content>
    </RankingpageLayout>
  );
};

export default RankingWeeklyPage;
