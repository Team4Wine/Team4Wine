"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './login.module.css';

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [loginError, setLoginError] = useState("");
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
		// 유효성 검사
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
				body: JSON.stringify({ email, password }), // 요청 본문에 이메일과 비밀번호 포함
			}
		);

		if (response.ok) {
			const data = await response.json(); // 응답 데이터 처리
			// 로그인 성공 시, JWT 토큰이나 사용자 정보를 저장하는 로직 추가 가능
			// 예: localStorage.setItem('token', data.token);
			router.push("/"); // 로그인 성공 시 홈으로 리다이렉트
		} else {
			// 로그인 실패 처리
			const errorData = await response.json(); // 에러 메시지 처리
			setLoginError(
				errorData.message || "이메일 혹은 비밀번호를 확인해주세요."
			);
			setEmailError("이메일 혹은 비밀번호를 확인해주세요."); // 이메일 입력창에 에러 표시
		}
	};

	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			handleLogin();
		}
	};

	const handleSocialLogin = (provider: string) => {
		// 로그인 리다이렉트 (가상의 URL)
		router.push(`/oauth/signup/${provider}`);
	};

	return (
		<div className={styles.container}>
			<h1>로그인</h1>
			<div>
				<input
					type="text"
					placeholder="이메일"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					onBlur={handleEmailBlur}
					onKeyPress={handleKeyPress}
				/>
				{emailError && <p style={{ color: "red" }}>{emailError}</p>}
			</div>
			<div>
				<input
					type="password"
					placeholder="비밀번호"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onBlur={handlePasswordBlur}
					onKeyPress={handleKeyPress}
				/>
				{passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
			</div>
			{loginError && <p style={{ color: "red" }}>{loginError}</p>}
			<button onClick={handleLogin}>로그인</button>
			<button onClick={() => handleSocialLogin("google")}>구글로 로그인</button>
			<button onClick={() => handleSocialLogin("kakao")}>
				카카오톡으로 로그인
			</button>
		</div>
	);
};

export default SignIn;
