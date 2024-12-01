"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './SignIn.module.css';
import logo from '@/../public/logo.png';
import Link from "next/link";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [appKey, setAppKey] = useState("");
  const [appSecret, setAppSecret] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
    }
  }, []);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailBlur = () => {
    if (!email) {
      setEmailError("이메일은 필수 입력입니다.");
    } else if (!validateEmail(email)) {
      setEmailError("이메일 형식으로 작성해 주세요.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError("비밀번호는 필수 입력입니다.");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async () => {
    handleEmailBlur();
    handlePasswordBlur();

    if (!email || !validateEmail(email) || !password) {
      return;
    }

    // 로그인 API 호출
    const response = await fetch(
      "https://winereview-api.vercel.app/10-4/auth/signIn",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      router.push("/");
    } else {
      const errorData = await response.json();
      setLoginError(
        errorData.message || "이메일 혹은 비밀번호를 확인해주세요."
      );
      setEmailError("이메일 혹은 비밀번호를 확인해주세요.");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleSocialLogin = async (provider: string) => {
    if (provider === "KAKAO") {
      window.Kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/oauth/kakao', // 카카오 인증 후 리다이렉트할 URI
      });
    } else if (provider === "GOOGLE") {
      const url = `https://winereview-api.vercel.app/10-4/auth/signIn/${provider}`;
      const appKey = process.env.NEXT_PUBLIC_GOOGLE_APP_KEY; // 구글 앱 키

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appKey: appKey,
          provider: provider,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("구글 로그인 성공:", data);
        router.push("/oauth/google"); // 구글 로그인 성공 시 리다이렉트
      } else {
        const errorData = await response.json();
        setLoginError(errorData.message || "소셜 로그인에 실패했습니다.");
      }
    }
  };



  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" />
        </div>
        <div className={styles.form}>
          <div>
            <label className={styles.label}>이메일</label>
            <input
              type="text"
              placeholder="이메일 입력"
              className={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              onKeyPress={handleKeyPress}
            />
            {emailError ? <p className={styles.errorMessage}>{emailError}</p> : <span className={styles.errorMessageTempSpace}>&nbsp;</span>}
          </div>
          <div>
            <label className={styles.label}>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호 입력"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
              onKeyPress={handleKeyPress}
            />
            {passwordError ? <p className={styles.errorMessage}>{passwordError}</p> : <span className={styles.errorMessageTempSpace}>&nbsp;</span>}
            <div className={styles.lostButton}>비밀번호를 잊으셨나요?</div>
          </div>
        </div>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        <div className={styles.signupBox}>
          <button onClick={handleLogin} className={styles.signupBtn}>로그인</button>
          <button onClick={() => handleSocialLogin("GOOGLE")} className={styles.socialBtn}>구글로 로그인</button>
          <button onClick={() => handleSocialLogin("KAKAO")} className={styles.socialBtn}>
            카카오톡으로 로그인
          </button>
        </div>
        <div className={styles.signupArea}>
          <p className={styles.text}>계정이 없으신가요?</p>
          <div>
            <Link href="/signup">
              <button className={styles.linkButton}>회원가입하기</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
