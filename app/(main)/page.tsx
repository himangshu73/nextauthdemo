import Link from "next/link";

export default function Home() {
  return (
    <div className="px-6 py-4">
      <h1>Welcome to Himangshu.xyz</h1>

      <div className="flex flex-col gap-4">
        <Link className="hover:text-red-400" href="/todolist">
          To Do List
        </Link>
        <Link className="hover:text-red-400" href="/expensetracker">
          Expense Tracker
        </Link>
        <Link className="hover:text-red-400" href="/blog">
          Blog
        </Link>
      </div>
      <div>
        <Link href="/signup">SignUp</Link>
      </div>
    </div>
  );
}
