"use client";

import AddExpense from "@/components/addExpense";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";

const ExpenseTracker = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="relative min-h-screen bg-gray-100">
      {showModal && <AddExpense onClose={() => setShowModal(false)} />}

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
