// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// const KakaoCallback = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const code = params.get("code");

//     if (code) {
//       fetch("https://kauth.kakao.com/oauth/token", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           grant_type: "authorization_code",
//           client_id: process.env.NEXT_PUBLIC_KAKAO_APP_KEY, // 카카오 앱 키
//           redirect_uri: "http://localhost:3000/oauth/kakao", // 리다이렉트 URI
//           code: code,
//         }).toString(),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           // 액세스 토큰을 로컬 스토리지에 저장
//           if (data.access_token) {
//             localStorage.setItem("kakaoAccessToken", data.access_token);
//             console.log("Access Token:", data.access_token);
//             // 로그인 성공 후 홈 페이지로 리다이렉트
//             router.push("/");
//           } else {
//             console.error("액세스 토큰을 가져오지 못했습니다.");
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching Kakao token:", error);
//         });
//     }
//   }, [router]);

//   return <div>로그인 중...</div>; // 로딩 중 메시지
// };

// export default KakaoCallback;
