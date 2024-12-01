export const fetchWithToken = async (url: string) => {
  const token = localStorage.getItem("userToken");

  if (!token) {
      throw new Error("토큰이 존재하지 않습니다.");
  }

  const response = await fetch(url, {
      method: "GET",
      headers: {
          "Authorization": `Bearer ${token}`, // Authorization 헤더에 토큰 추가
          "Content-Type": "application/json",
      },
  });

  if (!response.ok) {
      throw new Error("API 호출 실패");
  }

  return response.json();
};
