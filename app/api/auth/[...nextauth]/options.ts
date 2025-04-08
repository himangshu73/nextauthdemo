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
          throw new Error("Email and password are required.");
        }

        await dbConnect();
        try {
          const user = await UserModel.findOne({
            email: credentials.email,
          });
          if (!user) {
            throw new Error("No user found with this email.");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            console.log(user);
            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
            };
          } else {
            throw new Error("Incorrect Password.");
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
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
      }
      return token;
    },
  },
};
