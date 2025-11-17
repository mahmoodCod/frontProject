"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contaxt/AuthContext";

export default function DebugAccessPage() {
  const { user, isLoading } = useAuth();
  const [devMode, setDevMode] = useState(false);
  const [localStorageData, setLocalStorageData] = useState<any>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check localStorage
      const devAccess = localStorage.getItem("dev_admin_access") === "true";
      setDevMode(devAccess);

      // Get all localStorage data (for debugging)
      const data: any = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          data[key] = localStorage.getItem(key);
        }
      }
      setLocalStorageData(data);
    }
  }, []);

  const enableDevAccess = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dev_admin_access", "true");
      setDevMode(true);
      window.location.reload();
    }
  };

  const disableDevAccess = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("dev_admin_access");
      setDevMode(false);
      window.location.reload();
    }
  };

  const clearAllStorage = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      window.location.reload();
    }
  };

  const isAdmin = user?.roles?.includes("ADMIN");

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 font-[var(--font-yekan)]">
          🔍 دیباگ دسترسی‌ها
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Info */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 font-[var(--font-yekan)]">
              👤 اطلاعات کاربر
            </h2>

            {isLoading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 font-[var(--font-yekan)]">در حال بارگذاری...</p>
              </div>
            )}

            {!isLoading && (
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-[var(--font-yekan)]">وضعیت ورود:</span>
                  <span className={`px-2 py-1 rounded text-sm font-[var(--font-yekan)] ${user ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user ? 'وارد شده' : 'خارج شده'}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-[var(--font-yekan)]">نقش ادمین:</span>
                  <span className={`px-2 py-1 rounded text-sm font-[var(--font-yekan)] ${isAdmin ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {isAdmin ? 'دارد' : 'ندارد'}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-[var(--font-yekan)]">حالت توسعه:</span>
                  <span className={`px-2 py-1 rounded text-sm font-[var(--font-yekan)] ${devMode ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {devMode ? 'فعال' : 'غیرفعال'}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-[var(--font-yekan)]">دسترسی کلی:</span>
                  <span className={`px-2 py-1 rounded text-sm font-[var(--font-yekan)] ${isAdmin || devMode ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {isAdmin || devMode ? 'دارد' : 'ندارد'}
                  </span>
                </div>

                {user && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2 font-[var(--font-yekan)]">جزئیات کاربر:</h3>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p><strong>نام:</strong> {user.firstName} {user.lastName}</p>
                      <p><strong>شماره:</strong> {user.phone}</p>
                      <p><strong>نقش‌ها:</strong> {user.roles?.join(", ") || "هیچ"}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 font-[var(--font-yekan)]">
              ⚙️ اقدامات
            </h2>

            <div className="space-y-3">
              {!devMode && (
                <button
                  onClick={enableDevAccess}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg transition-colors font-[var(--font-yekan)]"
                >
                  فعال کردن حالت توسعه (دسترسی ادمین)
                </button>
              )}

              {devMode && (
                <button
                  onClick={disableDevAccess}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors font-[var(--font-yekan)]"
                >
                  غیرفعال کردن حالت توسعه
                </button>
              )}

              <a
                href="/admin-test"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-[var(--font-yekan)] text-center"
              >
                رفتن به صفحه تست ادمین
              </a>

              <a
                href="/DashboardPage/categories"
                className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors font-[var(--font-yekan)] text-center"
              >
                رفتن به مدیریت دسته‌بندی‌ها
              </a>

              <button
                onClick={clearAllStorage}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors font-[var(--font-yekan)]"
              >
                پاک کردن تمام داده‌های ذخیره شده
              </button>
            </div>
          </div>
        </div>

        {/* LocalStorage Data */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 font-[var(--font-yekan)]">
            💾 داده‌های LocalStorage
          </h2>

          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm text-gray-700 overflow-x-auto">
              {JSON.stringify(localStorageData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
