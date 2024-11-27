"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpUser } from "../api/signUp";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();

	const [email, setEmail] = useState("");
	const [nickname, setNickname] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [errors, setErrors] = useState({
		email: "",
		nickname: "",
		password: "",
		confirmPassword: "",
	});

	const handleBlur = (field: any) => {
		let errorMessage = "";

		switch (field) {
			case "email":
				if (!email) {
					errorMessage = "이메일은 필수 입력입니다.";
				} else if (!/\S+@\S+\.\S+/.test(email)) {
					errorMessage = "이메일 형식으로 작성해 주세요.";
				}
				break;

			case "nickname":
				if (!nickname) {
					errorMessage = "닉네임은 필수 입력입니다.";
				} else if (nickname.length > 20) {
					errorMessage = "닉네임은 최대 20자까지 가능합니다.";
				}
				break;

			case "password":
				if (!password) {
					errorMessage = "비밀번호는 필수 입력입니다.";
				} else if (password.length < 8) {
					errorMessage = "비밀번호는 최소 8자 이상입니다.";
				} else if (
					!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/.test(
						password
					)
				) {
					errorMessage = "비밀번호는 숫자, 영문, 특수문자로만 가능합니다.";
				}
				break;

			case "confirmPassword":
				if (!confirmPassword) {
					errorMessage = "비밀번호 확인을 입력해주세요.";
				} else if (confirmPassword !== password) {
					errorMessage = "비밀번호가 일치하지 않습니다.";
				}
				break;

			default:
				break;
		}

		setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		for (let key in errors) {
			handleBlur(key);
		}

		const isValid =
			Object.values(errors).every((error) => error === "") &&
			email &&
			nickname &&
			password &&
			confirmPassword;

		if (isValid) {
			await signUpUser({
				email,
				nickname,
				password,
				confirmPassword,
				setErrors,
			});
		}
	};

	return (
		<div>
			<h1>WINE</h1>
			<h1>회원가입</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>이메일:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						onBlur={() => handleBlur("email")}
						onFocus={() => setErrors((prev) => ({ ...prev, email: "" }))}
					/>
					{errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
				</div>
				<div>
					<label>닉네임:</label>
					<input
						type="text"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
						onBlur={() => handleBlur("nickname")}
						onFocus={() => setErrors((prev) => ({ ...prev, nickname: "" }))}
					/>
					{errors.nickname && <p style={{ color: "red" }}>{errors.nickname}</p>}
				</div>
				<div>
					<label>비밀번호:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onBlur={() => handleBlur("password")}
						onFocus={() => setErrors((prev) => ({ ...prev, password: "" }))}
					/>
					{errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
				</div>
				<div>
					<label>비밀번호 확인:</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						onBlur={() => handleBlur("confirmPassword")}
						onFocus={() =>
							setErrors((prev) => ({ ...prev, confirmPassword: "" }))
						}
					/>
					{errors.confirmPassword && (
						<p style={{ color: "red" }}>{errors.confirmPassword}</p>
					)}
				</div>
				<button type="submit">가입하기</button>
			</form>

			<div style={{ padding: "50px", textAlign: "center" }}>
				<p>간편하게 회원가입하고 서비스를 이용해 보세요.</p>

				<div>
					<Link href="/oauth/signup/google">
						<button style={{ margin: "10px", padding: "10px 20px" }}>
							구글로 가입하기
						</button>
					</Link>
					<Link href="/oauth/signup/kakao">
						<button style={{ margin: "10px", padding: "10px 20px" }}>
							카카오톡으로 가입하기
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
