"use client";

import AdminAccessChecker from "@/app/Components/AdminPanel/AdminAccessChecker";

export default function AdminTestPage() {
  return (
    <AdminAccessChecker>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 font-[var(--font-yekan)]">
              🎉 پنل مدیریت ادمین فعال شد!
            </h1>
            <p className="text-gray-600 mb-6 font-[var(--font-yekan)]">
              حالا شما دسترسی کامل به پنل مدیریت دارید. می‌توانید:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-amber-800 mb-3 font-[var(--font-yekan)]">
                  📁 مدیریت دسته‌بندی‌ها
                </h3>
                <p className="text-amber-700 font-[var(--font-yekan)]">
                  ایجاد، ویرایش، حذف و مدیریت سلسله مراتبی دسته‌بندی‌های محصول
                </p>
                <a
                  href="/DashboardPage/categories"
                  className="inline-block mt-4 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors font-[var(--font-yekan)]"
                >
                  رفتن به مدیریت دسته‌بندی‌ها
                </a>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3 font-[var(--font-yekan)]">
                  📊 سایر امکانات مدیریتی
                </h3>
                <p className="text-blue-700 font-[var(--font-yekan)]">
                  مدیریت کاربران، محصولات، سفارشات و گزارشات سیستم
                </p>
                <span className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-[var(--font-yekan)] opacity-50 cursor-not-allowed">
                  به زودی...
                </span>
              </div>
            </div>

            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl">
              <h3 className="text-lg font-semibold text-green-800 mb-3 font-[var(--font-yekan)]">
                ✅ API Category کامل پیاده‌سازی شد
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="font-[var(--font-yekan)]">درخت دسته‌بندی‌ها</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="font-[var(--font-yekan)]">دسته‌بندی‌های ویژه</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="font-[var(--font-yekan)]">مدیریت کامل CRUD</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="font-[var(--font-yekan)]">رابط گرافیکی زیبا</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminAccessChecker>
  );
}
