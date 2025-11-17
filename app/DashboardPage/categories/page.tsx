"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiGrid,
  FiBarChart,
  FiUsers,
  FiShoppingCart,
  FiTrendingUp,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronRight,
  FiHome,
  FiTag,
  FiUser,
  FiCreditCard,
} from "react-icons/fi";
import { useAuth } from "@/contaxt/AuthContext";
import { useRouter } from "next/navigation";
import CategoryManager from "@/app/Components/CategoryManager";
import AdminAccessChecker from "@/app/Components/AdminPanel/AdminAccessChecker";

const SidebarLink = ({
  icon: Icon,
  label,
  href,
  isActive = false,
  onClick
}: {
  icon: any;
  label: string;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
}) => (
  <motion.button
    whileHover={{ x: 4 }}
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-[var(--font-yekan)] text-right ${
      isActive
        ? "bg-amber-100 text-amber-700 border-r-4 border-amber-600"
        : "text-gray-600 hover:bg-gray-100 hover:text-amber-700"
    }`}
  >
    <Icon size={20} />
    <span>{label}</span>
    {isActive && <FiChevronRight className="mr-auto" size={16} />}
  </motion.button>
);

export default function CategoriesManagementPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(true);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const sidebarLinks = [
    {
      icon: FiHome,
      label: "داشبورد",
      href: "/DashboardPage",
    },
    {
      icon: FiTag,
      label: "مدیریت دسته‌بندی‌ها",
      isActive: true,
      onClick: () => setShowCategoryManager(true),
    },
    {
      icon: FiUsers,
      label: "مدیریت کاربران",
      href: "/admin/users",
    },
    {
      icon: FiShoppingCart,
      label: "مدیریت محصولات",
      href: "/admin/products",
    },
    {
      icon: FiBarChart,
      label: "گزارشات",
      href: "/admin/reports",
    },
    {
      icon: FiCreditCard,
      label: "مدیریت سفارشات",
      href: "/admin/orders",
    },
  ];

  return (
    <AdminAccessChecker>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl border-l border-amber-200 z-50 lg:translate-x-0 lg:static lg:inset-0"
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-amber-200 bg-gradient-to-l from-amber-50 to-orange-50">
          <div className="flex items-center justify-between mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-white w-12 h-12 flex items-center justify-center rounded-2xl font-bold text-xl shadow-lg shadow-amber-600/25">
                آی
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-800 font-[var(--font-yekan)] leading-tight">
                  آی‌کسب
                </span>
                <span className="text-xs text-amber-600 font-[var(--font-yekan)] font-medium">
                  پنل مدیریت
                </span>
              </div>
            </motion.button>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-gray-600 hover:text-amber-700"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* User Info */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-white w-10 h-10 flex items-center justify-center rounded-xl">
                <FiUser size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 font-[var(--font-yekan)] truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-amber-600 font-[var(--font-yekan)]">مدیر سیستم</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {link.href ? (
                <a href={link.href}>
                  <SidebarLink {...link} />
                </a>
              ) : (
                <SidebarLink {...link} />
              )}
            </motion.div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-amber-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-[var(--font-yekan)]"
          >
            <FiLogOut size={20} />
            <span>خروج از حساب</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 lg:mr-0">
        {/* Top Bar */}
        <header className="bg-white shadow-lg border-b border-amber-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-amber-700"
              >
                <FiMenu size={24} />
              </button>

              <div>
                <h1 className="text-2xl font-bold text-gray-800 font-[var(--font-yekan)]">
                  مدیریت دسته‌بندی‌ها
                </h1>
                <p className="text-gray-600 font-[var(--font-yekan)] text-sm">
                  مدیریت کامل دسته‌بندی‌های محصول
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="hidden md:flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3"
              >
                <div className="flex items-center gap-2">
                  <FiTag className="text-amber-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600 font-[var(--font-yekan)]">کل دسته‌بندی‌ها</p>
                    <p className="font-bold text-amber-700">۲۴</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3"
              >
                <div className="flex items-center gap-2">
                  <FiTrendingUp className="text-green-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600 font-[var(--font-yekan)]">دسته‌بندی‌های فعال</p>
                    <p className="font-bold text-green-700">۲۲</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <CategoryManager
            isOpen={showCategoryManager}
            onClose={() => setShowCategoryManager(false)}
          />
        </main>
      </div>
    </AdminAccessChecker>
  );
}
