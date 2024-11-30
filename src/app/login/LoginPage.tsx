"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './login.module.css';
import logo from '@/../public/logo.png'
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
			const data = await response.json(); // 응답 데이터 처리
			// 로그인 성공 시, JWT 토큰이나 사용자 정보를 저장하는 로직 추가 가능
			// 예: localStorage.setItem('token', data.token);
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
		const url = "https://winereview-api.vercel.app/10-4/oauthApps";

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				appSecret: appSecret,
				appKey: appKey,
				provider: provider,
			}),
		});
    
		if (response.ok) {
			const data = await response.json();
			// 로그인 성공 처리
			console.log("로그인 성공:", data);
			router.push("/"); // 로그인 성공 시 홈으로 리다이렉트
		} else {
			const errorData = await response.json();
			setLoginError(errorData.message || "소셜 로그인에 실패했습니다.");
		}
	};
	

	return (
		<div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo"/>
        </div>
        <div>
          <label className={styles.label}>이메일:</label>
          <input
            type="text"
            placeholder="이메일 입력"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            onKeyPress={handleKeyPress}
          />
          {emailError && <p className={styles.errorMessage}>{emailError}</p>}
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
          {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
          <div className={styles.lostButton}>비밀번호를 잊으셨나요?</div>
        </div>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        <div className={styles.signupBox}>
          <button onClick={handleLogin} className={styles.signupBtn}>로그인</button>
          <button onClick={() => handleSocialLogin("google")} className={styles.socialBtn}>구글로 로그인</button>
          <button onClick={() => handleSocialLogin("kakao")} className={styles.socialBtn}>
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
