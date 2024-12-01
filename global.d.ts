declare global {
  interface Window {
    Kakao: any; // Kakao의 정확한 타입을 정의하는 것이 좋지만, 일단 any로 설정
  }
}

// 이 파일이 모듈로 인식되도록 빈 export 추가
export {};
