"use client";

import { useState, useEffect } from "react";

export default function TestApiPage() {
  const [treeCategories, setTreeCategories] = useState([]);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [categoriesData, setCategoriesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTreeCategories([
        { _id: "1", name: "قهوه", slug: "coffee", children: [] },
        { _id: "2", name: "چای", slug: "tea", children: [] }
      ]);
      setFeaturedCategories([
        { _id: "1", name: "قهوه ویژه", slug: "special-coffee", images: "/test.jpg", order: 1 }
      ]);
      setCategoriesData({
        categories: [
          { _id: "1", name: "قهوه", slug: "coffee", productsCount: 10, parent: null }
        ],
        pagination: { page: 1, limit: 10, totalPage: 1, totalCategories: 1 }
      });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 font-[var(--font-yekan)]">
          🧪 تست API Category
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tree Categories */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 font-[var(--font-yekan)]">
              🌳 درخت دسته‌بندی‌ها
            </h2>

            {loading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 font-[var(--font-yekan)]">در حال بارگذاری...</p>
              </div>
            )}

            {error && (
              <div className="text-red-600 bg-red-50 p-4 rounded-lg font-[var(--font-yekan)]">
                خطا: {error}
              </div>
            )}

            {!loading && !error && (
              <div className="space-y-2">
                {treeCategories.length === 0 ? (
                  <p className="text-gray-500 font-[var(--font-yekan)]">هیچ دسته‌بندی‌ای یافت نشد</p>
                ) : (
                  treeCategories.slice(0, 5).map((category) => (
                    <div key={category._id} className="p-3 bg-amber-50 rounded-lg">
                      <h3 className="font-semibold text-amber-800 font-[var(--font-yekan)]">
                        {category.name}
                      </h3>
                      <p className="text-sm text-amber-600 font-[var(--font-yekan)]">
                        /{category.slug}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Featured Categories */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 font-[var(--font-yekan)]">
              ⭐ دسته‌بندی‌های ویژه
            </h2>

            {loading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 font-[var(--font-yekan)]">در حال بارگذاری...</p>
              </div>
            )}

            {error && (
              <div className="text-red-600 bg-red-50 p-4 rounded-lg font-[var(--font-yekan)]">
                خطا: {error}
              </div>
            )}

            {!loading && !error && (
              <div className="space-y-2">
                {featuredCategories.length === 0 ? (
                  <p className="text-gray-500 font-[var(--font-yekan)]">هیچ دسته‌بندی‌ای یافت نشد</p>
                ) : (
                  featuredCategories.slice(0, 5).map((category) => (
                    <div key={category._id} className="p-3 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-800 font-[var(--font-yekan)]">
                        {category.name}
                      </h3>
                      <p className="text-sm text-green-600 font-[var(--font-yekan)]">
                        /{category.slug}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Categories List */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 font-[var(--font-yekan)]">
              📋 لیست دسته‌بندی‌ها (Admin)
            </h2>

            {loading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 font-[var(--font-yekan)]">در حال بارگذاری...</p>
              </div>
            )}

            {error && (
              <div className="text-red-600 bg-red-50 p-4 rounded-lg font-[var(--font-yekan)]">
                خطا: {error}
              </div>
            )}

            {!loading && !error && (
              <div className="space-y-2">
                {!categoriesData?.categories ? (
                  <p className="text-gray-500 font-[var(--font-yekan)]">هیچ دسته‌بندی‌ای یافت نشد</p>
                ) : (
                  categoriesData.categories.slice(0, 5).map((category) => (
                    <div key={category._id} className="p-3 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-800 font-[var(--font-yekan)]">
                        {category.name}
                      </h3>
                      <p className="text-sm text-blue-600 font-[var(--font-yekan)]">
                        /{category.slug} - {category.productsCount} محصول
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 font-[var(--font-yekan)]">
            🔧 اطلاعات دیباگ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Tree Categories:</strong> {treeCategories.length} مورد
            </div>
            <div>
              <strong>Featured Categories:</strong> {featuredCategories.length} مورد
            </div>
            <div>
              <strong>Admin Categories:</strong> {categoriesData?.categories?.length || 0} مورد
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2 font-[var(--font-yekan)]">وضعیت:</h3>
            <p className="text-sm text-gray-600">
              این صفحه از داده‌های mock استفاده می‌کنه تا تست کنه UI درست کار می‌کنه یا نه
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
