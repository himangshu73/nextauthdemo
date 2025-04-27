"use client";

import AddExpense from "@/components/addExpense";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import ExpenseStats from "@/components/expenseStats";
import axios from "axios";
import ItemListCard from "@/components/itemListCard";

interface Item {
  itemName: string;
  quantity: number;
  unit: string;
  price: number;
  createdAt: string;
}

const ExpenseTracker = () => {
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({ today: 0, month: 0, year: 0 });
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const response = await axios.get("/api/expense/itemlist");
      setItems(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get("/api/expense/stats");
      setStats(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchStats(), fetchItems()]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);
  return (
    <div className="relative min-h-screen">
      {showModal && (
        <AddExpense onClose={() => setShowModal(false)} onAdded={refreshData} />
      )}
      <div className="flex flex-col gap-2 mt-4">
        <ExpenseStats stats={stats} loading={loading} />
        <ItemListCard items={items} loading={loading} />
      </div>
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
