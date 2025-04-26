import { useSession } from "next-auth/react";
import SignIn from "./sign-in";

interface Stats {
  today: number;
  month: number;
  year: number;
}

const ExpenseStats = ({ stats }: { stats: Stats }) => {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return (
      <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
        <SignIn />
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Expense Stats</h2>
      <p>
        <strong>Today:</strong> {stats.today} Taka
      </p>
      <p>
        <strong>This Month:</strong> {stats.month} Taka
      </p>
      <p>
        <strong>This Year:</strong> {stats.year} Taka
      </p>
    </div>
  );
};

export default ExpenseStats;
