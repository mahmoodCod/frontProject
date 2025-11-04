"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-10">
      {/* تصویر برند */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full md:w-1/2 h-80 md:h-[400px] rounded-xl overflow-hidden shadow-lg"
      >
        <Image
          src="/Images/photo-1514432324607-a09d9b4aefdd.avif" // تصویر را در public/images قرار بده
          alt="معرفی برند قهوه"
          fill
          className="object-cover"
        />
      </motion.div>

      {/* متن معرفی */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 flex flex-col justify-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-4">
          درباره قهوه‌لند
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          قهوه‌لند با بیش از ۱۰ سال تجربه در واردات و فروش عمده قهوه،  
          بهترین دانه‌های عربیکا و روبوستا را از سراسر جهان فراهم می‌کند.  
          ما با انتخاب دقیق دانه‌ها و رعایت اصول دم‌آوری، تجربه‌ای بی‌نظیر از طعم و عطر قهوه برای شما به ارمغان می‌آوریم.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          هدف ما ارائه محصولی با کیفیت بالا، قیمت مناسب و خدماتی سریع و مطمئن برای مشتریان عمده و کافه‌هاست.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition w-max"
        >
          بیشتر بدانید
        </motion.button>
      </motion.div>
    </section>
  );
}
