interface Stats {
  today: number;
  month: number;
  year: number;
}

interface ExpenseStatsProps {
  stats: Stats;
  loading: boolean;
}

const ExpenseStats = ({ stats, loading }: ExpenseStatsProps) => {
  if (loading) {
    return (
      <div className="bg-white p-4 rounded shadow my-4 w-full max-w-3xl mx-auto">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-md shadow-md w-full max-w-3xl mx-auto">
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
