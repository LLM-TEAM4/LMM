const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const apiFetch = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      credentials: "include",  // 여기에 모든 요청에 대한 기본 인증 옵션을 넣을 수 있음
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;  // 에러를 상위로 전달해서 처리할 수 있게 할 수도 있음
  }
};