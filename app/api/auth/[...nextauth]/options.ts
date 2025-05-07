import { NextAuthOptions, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/utils/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";

interface LoginCredentials {
  email: string;
  password: string;
}

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error("Missing GITHUB ID or Secret");
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: LoginCredentials | undefined
      ): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await dbConnect();
        try {
          const user = await UserModel.findOne({
            email: credentials.email,
          }).select("+password +isVerified");
          if (!user) {
            return null;
          }
          if (!user.isVerified) {
            return null;
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return {
              id: user._id.toString(),
              _id: user._id.toString(),
              name: user.name,
              email: user.email,
            };
          } else {
            return null;
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            throw new Error(err.message);
          } else {
            throw new Error("Something went wrong.");
          }
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      await dbConnect();
      if (user) {
        token._id = user._id?.toString();
      }

      if (account?.provider === "github") {
        const existingUser = await UserModel.findOne({ email: token.email });
        if (existingUser) {
          token._id = existingUser._id.toString();
        } else {
          const newUser = await UserModel.create({
            name: token.name,
            email: token.email,
            image: token.picture,
          });

          token._id = newUser._id.toString();
        }
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
