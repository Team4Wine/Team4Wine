import { useState } from "react";
import { useRouter } from "next/router";

const Signup = () => {
    const router = useRouter();
    const { provider } = router.query;
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nickname) {
            setError("닉네임은 필수 입력입니다.");
            return;
        }
        if (nickname.length > 20) {
            setError("닉네임은 최대 20자까지 가능합니다.");
            return;
        }

        // 제출 처리
        const response = await fetch(`/api/auth/${provider}`, {
            method: 'POST',
            body: JSON.stringify({ nickname }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            router.push('/'); // 홈 화면으로 이동
        } else {
            const errorMessage = await response.json();
            setError(errorMessage.message || "알 수 없는 오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <h1>간편 회원가입 ({provider})</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="닉네임 입력"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <button type="submit">가입하기</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Signup;