"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiShield, FiUser, FiCheck, FiX, FiKey } from "react-icons/fi";
import { useAuth } from "@/contaxt/AuthContext";

interface AdminAccessCheckerProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AdminAccessChecker({ children, fallback }: AdminAccessCheckerProps) {
  const { user, isLoading } = useAuth();
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);

  // Check if user has admin role
  const isAdmin = user?.roles?.includes("ADMIN");

  // Development mode: Allow admin access with special key
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    // Check if we're in development and user wants to access admin
    if (typeof window !== "undefined") {
      const hasDevAccess = localStorage.getItem("dev_admin_access") === "true";
      if (hasDevAccess) {
        setDevMode(true);
      }
    }
  }, []);

  const enableDevAdminAccess = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dev_admin_access", "true");
      setDevMode(true);
      // Reload to apply changes
      window.location.reload();
    }
  };

  const disableDevAdminAccess = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("dev_admin_access");
      setDevMode(false);
      window.location.reload();
    }
  };

  // If still loading auth state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-[var(--font-yekan)]">در حال بررسی دسترسی...</p>
        </div>
      </div>
    );
  }

  // If user is admin or in dev mode
  if (isAdmin || devMode) {
    return (
      <>
        {children}
        {/* Dev mode indicator */}
        {devMode && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-4 left-4 z-50 bg-red-500 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2 shadow-lg"
          >
            <FiKey size={14} />
            <span>حالت توسعه - دسترسی ادمین</span>
            <button
              onClick={disableDevAdminAccess}
              className="ml-2 hover:bg-red-600 rounded px-1"
            >
              <FiX size={12} />
            </button>
          </motion.div>
        )}
      </>
    );
  }

  // If custom fallback provided
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default access denied UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl border border-amber-200 p-8 max-w-md w-full text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <FiShield size={32} className="text-white" />
        </motion.div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 font-[var(--font-yekan)]">
          دسترسی غیرمجاز
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6 font-[var(--font-yekan)] leading-relaxed">
          برای دسترسی به این بخش نیاز به نقش مدیریتی دارید.
          لطفاً با مدیر سیستم تماس بگیرید.
        </p>

        {/* User Info */}
        <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200">
          <div className="flex items-center justify-center gap-3 mb-2">
            <FiUser className="text-amber-600" size={18} />
            <span className="font-semibold text-amber-800 font-[var(--font-yekan]">
              اطلاعات کاربر فعلی
            </span>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>شماره موبایل:</strong> {user?.phone || "نامشخص"}</p>
            <p><strong>نقش‌ها:</strong> {user?.roles?.join(", ") || "هیچ نقشی"}</p>
          </div>
        </div>

        {/* Dev Mode Button */}
        {!showAdminPrompt && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAdminPrompt(true)}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg font-[var(--font-yekan)] mb-4"
          >
            <div className="flex items-center justify-center gap-2">
              <FiKey size={18} />
              <span>حالت توسعه (برای تست)</span>
            </div>
          </motion.button>
        )}

        {/* Dev Admin Prompt */}
        {showAdminPrompt && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4"
          >
            <h3 className="font-semibold text-yellow-800 mb-2 font-[var(--font-yekan]">
              ⚠️ حالت توسعه
            </h3>
            <p className="text-yellow-700 text-sm mb-4 font-[var(--font-yekan]">
              این گزینه برای توسعه‌دهندگان و تست است. در محیط واقعی غیرفعال کنید.
            </p>
            <div className="flex gap-2">
              <button
                onClick={enableDevAdminAccess}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1"
              >
                <FiCheck size={14} />
                فعال کردن
              </button>
              <button
                onClick={() => setShowAdminPrompt(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                انصراف
              </button>
            </div>
          </motion.div>
        )}

        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-all font-[var(--font-yekan)]"
        >
          بازگشت
        </motion.button>
      </motion.div>
    </div>
  );
}
