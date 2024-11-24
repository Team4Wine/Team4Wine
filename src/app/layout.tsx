import type { Metadata } from "next";
import "../app/styles/reset.css";

export const metadata: Metadata = {
  title: "Wine",
  description: "Wine 중급 프로젝트",
  icons: {
    icon: "/favicon.ico",
  }
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
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
