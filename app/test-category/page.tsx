"use client";

import { useState } from "react";
import CategoryManager from "@/app/Components/CategoryManager";

export default function TestCategoryPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 font-[var(--font-yekan)]">
            🧪 تست CategoryManager
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition-colors font-[var(--font-yekan)]"
          >
            {isOpen ? 'بستن' : 'باز کردن'} CategoryManager
          </button>
        </div>

        <CategoryManager
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}
