"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PromoBanner() {
  return (
    <section className="relative w-full h-[60vh] my-20 overflow-hidden rounded-2xl shadow-lg">
      {/* پس‌زمینه */}
      <div className="absolute inset-0">
        <Image
          src="/Images/photo-1496582490020-60c1344c64aa.avif"
          alt="Coffee Banner"
          fill
          className="object-cover brightness-75"
          priority
        />
      </div>

      {/* پوشش تیره روی عکس */}
      <div className="absolute inset-0 bg-black/40" />

      {/* متن و دکمه */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full text-white px-4">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-5xl font-bold mb-4 drop-shadow-lg"
        >
          قهوه‌ای خاص برای سلیقه‌های خاص
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-2xl mb-8 max-w-2xl text-gray-200"
        >
          طعم واقعی قهوه را با محصولات ویژه ما تجربه کنید — از بهترین دانه‌ها تا لحظه‌ای لذت‌بخش.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition"
        >
          مشاهده محصولات
        </motion.button>
      </div>
    </section>
  );
}
