import AppCard from "@/components/appCard";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Himangshu Nath Barmon
        </h1>
        <h2 className="text-2xl mb-8 text-gray-600 dark:text-gray-300">
          Next.js Developer & Full Stack Engineer
        </h2>

        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/himangshu73"
            target="_blank"
            rel="noopner noreferrer"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <FaGithub className="text-xl" />
            My GitHub Profile
          </a>
        </div>
      </section>
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          My Applications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AppCard
            title="E-commerce Website"
            description="E-Commerce Website built with nextjs and nextauth authentication"
            href="https://wingsoffire.vercel.app/"
            bgColor="bg-blue-100 dark:bg-blue-900"
          />
          <AppCard
            title="Expense Tracker"
            description="Financial tracking application with mongodb, form validation with zod, shadcn implementation"
            href="/expensetracker"
            bgColor="bg-purple-100 dark:bg-purple-900"
          />

          <AppCard
            title="Blog"
            description="Markdown-based blog with SSR, dynamic routing and custom layout"
            href="/blog"
            bgColor="bg-orange-100 dark:bg-orange-900"
          />
          <AppCard
            title="To Do List"
            description="Task Management app with mongodb backend and user authentication"
            href="/todolist"
            bgColor="bg-green-100 dark:bg-green-900"
          />
        </div>
      </section>
      {!isLoggedIn && (
        <section className="container mx-auto px-6 py-12 text-center">
          <div className="inline-block px-8 py-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <Link
              href="/signup"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Sign Up
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Experience the full functionality with GitHub, Email, or OTP
              verification with Resend email implementation.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
