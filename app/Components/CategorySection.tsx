"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useFeaturedCategories, useCategoryTree } from "@/services";

export default function CategorySection() {
  const { categories: featuredCategories, loading: featuredLoading } = useFeaturedCategories();
  const { categories: treeCategories, loading: treeLoading } = useCategoryTree();

  // Transform API data to component format
  const categories = [
    {
      id: 1,
      title: "دسته‌بندی‌های ویژه",
      items: featuredCategories.slice(0, 4).map(cat => cat.name),
      apiData: featuredCategories.slice(0, 4),
    },
    {
      id: 2,
      title: "دسته‌بندی‌های اصلی",
      items: treeCategories.slice(0, 4).map(cat => cat.name),
      apiData: treeCategories.slice(0, 4),
    },
  ];

  // Show loading state
  if (featuredLoading || treeLoading) {
    return (
      <section className="w-full bg-gradient-to-b from-amber-50/50 to-white py-16 px-4 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-[var(--font-yekan)]">در حال بارگذاری دسته‌بندی‌ها...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gradient-to-b from-amber-50/50 to-white py-16 px-4 md:px-10 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- بنر تبلیغاتی --- */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden shadow-xl h-[400px] lg:h-full lg:col-span-1 border border-amber-100/50"
        >
          <Image
            src="/Images/photo-1496582490020-60c1344c64aa.avif"
            alt="بنر تبلیغاتی"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 flex flex-col justify-center items-center text-white text-center p-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              بهترین قهوه‌های جهان
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-base sm:text-lg text-gray-200 mb-6 max-w-md"
            >
              تجربه‌ای منحصر به فرد از عطر و طعم قهوه‌های برتر دنیا
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-800 hover:to-amber-700 
              text-white py-3 px-8 rounded-full font-semibold shadow-lg transition-all duration-300
              hover:shadow-amber-700/30 hover:shadow-xl border border-amber-600/20"
            >
              مشاهده محصولات
            </motion.button>
          </div>
        </motion.div>

        {/* --- دسته‌بندی‌ها --- */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border border-amber-100 rounded-3xl p-6 shadow-lg shadow-amber-100/20 
              hover:shadow-xl hover:shadow-amber-200/30 transition-all duration-300 group"
            >
              <h3 className="text-xl font-bold text-amber-900 mb-4 group-hover:text-amber-800 transition-colors">
                {cat.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {cat.items.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    className="relative overflow-hidden border border-amber-200 rounded-2xl py-4 text-center 
                    font-medium text-amber-800 bg-gradient-to-br from-amber-50 to-white
                    hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-600 hover:text-white 
                    transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}