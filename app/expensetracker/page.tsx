"use client";

import AddExpense from "@/components/addExpense";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import ExpenseStats from "@/components/expenseStats";
import axios from "axios";

const ExpenseTracker = () => {
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({ today: 0, month: 0, year: 0 });

  const fetchStats = async () => {
    try {
      const response = await axios.get("/api/expense/stats");
      console.log(response.data.data);
      setStats(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <div className="relative min-h-screen bg-gray-100">
      {showModal && (
        <AddExpense onClose={() => setShowModal(false)} onAdded={fetchStats} />
      )}
      <ExpenseStats stats={stats} />
      <Button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 bg-blue-600 hover:bg-blue-700 shadow-lg text-white text-3xl flex items-center justify-center cursor-pointer"
      >
        <Plus size={24} />
      </Button>
    </div>
  );
};

export default ExpenseTracker;
