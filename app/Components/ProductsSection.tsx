"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
}

export default function ProductsSection() {
  const products: Product[] = [
    {
      id: 1,
      name: "قهوه اسپرسو کلاسیک",
      image: "/Images/premium_photo-1673545518947-ddf3240090b1.avif",
      price: "۱۱۰,۰۰۰ تومان",
      description: "مخلوطی از دانه‌های عربیکا و روبوستا برای یک اسپرسوی اصیل.",
    },
    {
      id: 2,
      name: "قهوه ترک ویژه",
      image: "/Images/photo-1514066558159-fc8c737ef259.avif",
      price: "۹۰,۰۰۰ تومان",
      description: "آسیاب ریز مخصوص قهوه ترک، با عطر و طعم سنتی.",
    },
    {
      id: 3,
      name: "قهوه عربیکا ۱۰۰٪",
      image: "/Images/photo-1461023058943-07fcbe16d735.avif",
      price: "۱۳۵,۰۰۰ تومان",
      description: "دانه‌های ۱۰۰٪ عربیکا از آمریکای جنوبی با طعمی ملایم و عطر قوی.",
    },
    {
      id: 4,
      name: "قهوه روبوستا قوی",
      image: "/Images/premium_photo-1669687924558-386bff1a0469.avif",
      price: "۸۵,۰۰۰ تومان",
      description: "طعمی قوی و تلخ برای دوست‌داران اسپرسوی سنگین.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* عنوان */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-amber-800 mb-12 text-center"
        >
          محصولات ما
        </motion.h2>

        {/* لیست محصولات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all group cursor-pointer"
            >
              {/* عکس محصول */}
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* متن و دکمه */}
              <div className="p-5 flex flex-col justify-between h-48">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-amber-700 font-bold">{product.price}</span>
                  <button className="bg-amber-700 hover:bg-amber-800 text-white text-sm font-medium py-2 px-4 rounded-full transition">
                    مشاهده
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
