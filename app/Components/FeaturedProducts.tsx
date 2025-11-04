"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
}

export default function FeaturedProducts() {
  const products: Product[] = [
    {
      id: 1,
      name: "قهوه عربیکا",
      image: "/Images/premium_photo-1673545518947-ddf3240090b1.avif",
      price: "۱۲۰,۰۰۰ تومان",
    },
    {
      id: 2,
      name: "قهوه اسپرسو",
      image: "/Images/photo-1514066558159-fc8c737ef259.avif",
      price: "۹۵,۰۰۰ تومان",
    },
    {
      id: 3,
      name: "قهوه روبوستا",
      image: "/Images/photo-1461023058943-07fcbe16d735.avif",
      price: "۱۱۰,۰۰۰ تومان",
    },
    {
      id: 4,
      name: "قهوه ترک",
      image: "/Images/premium_photo-1669687924558-386bff1a0469.avif",
      price: "۸۵,۰۰۰ تومان",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-12 text-center">
          محصولات ویژه
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer"
            >
              <div className="relative w-full h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-amber-700 font-bold">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
