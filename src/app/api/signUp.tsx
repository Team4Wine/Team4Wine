interface SignUpParams {
	email: string;
	nickname: string;
	password: string;
	confirmPassword: string;
	setErrors: React.Dispatch<React.SetStateAction<any>>; // 적절한 에러 타입으로 변경 예정
}

export const signUpUser = async ({
	email,
	nickname,
	password,
	confirmPassword,
	setErrors,
}: SignUpParams) => {
	try {
		const response = await fetch(
			"https://winereview-api.vercel.app/10-4/auth/signUp",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					nickname,
					password,
					passwordConfirmation: confirmPassword,
				}),
			}
		);

		const responseData = await response.json();

  if (response.ok) {
    return true; // 성공
		} else {
			console.error("서버 오류 메시지:", responseData);
			setErrors((prev: any) => ({
				...prev,
				email: responseData.message || "알 수 없는 오류가 발생했습니다.",
			}));
			return false; // 실패
		}
	} catch (error) {
		console.error("회원가입 중 오류 발생:", error);
		setErrors((prev: any) => ({
			...prev,
			email: "네트워크 오류가 발생했습니다.",
		}));
		return false; // 실패
	}
};
