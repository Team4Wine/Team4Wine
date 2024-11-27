import { getToken } from "next-auth/jwt";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import { prisma } from "../../../lib/prisma"; // Prisma ORM 사용 시

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // 회원가입 로직
            const { email } = profile;

            // 사용자 이메일로 DB에서 찾기
            const existingUser = await prisma.user.findUnique({
                where: { email: email },
            });

            if (!existingUser) {
                // 사용자가 없으면 회원가입
                await prisma.user.create({
                    data: {
                        name: profile.name,
                        email,
                        nickname: '', // 관리자가 수동으로 할당
                    },
                });
            }

            return true;
        },
    },
};

export default NextAuth(authOptions);


