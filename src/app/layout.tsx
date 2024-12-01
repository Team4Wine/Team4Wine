import type { Metadata } from "next";
import "../app/styles/reset.css";
import "../app/styles/variables.css";

export const metadata: Metadata = {
	title: "Wine",
	description: "Wine 중급 프로젝트",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<head>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
				/>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
			</head>
			<body>{children}</body>
		</html>
	);
};
