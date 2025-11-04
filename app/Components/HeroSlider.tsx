"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

export default function HeroSlider() {
  const slides: Slide[] = [
    {
      id: 1,
      image: "/Images/photo-1497935586351-b67a49e012bf.avif",
      title: "طعم واقعی قهوه را تجربه کنید",
      subtitle: "قهوه‌های مرغوب از سراسر جهان با عطر و طعمی بی‌نظیر",
    },
    {
      id: 2,
      image: "/Images/photo-1497032628192-86f99bcd76bc.avif",
      title: "شروع روز با یک فنجان انرژی",
      subtitle: "انتخاب بهترین قهوه برای شروعی پرانرژی",
    },
    {
      id: 3,
      image: "/Images/photo-1525088553748-01d6e210e00b.avif",
      title: "واردکننده مستقیم دانه‌های قهوه",
      subtitle: "کیفیت بالا، قیمت منصفانه، طعم ماندگار",
    },
  ];

  return (
    <div className="relative w-full h-[85vh]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        slidesPerView={1}
        loop
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[85vh]">
              {/* تصویر اصلی */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover brightness-75"
                sizes="100vw"
                quality={100}
                priority
              />

              {/* overlay متن و دکمه */}
              <div className="absolute inset-0 z-10 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl sm:text-6xl font-bold mb-4 drop-shadow-lg"
                >
                  {slide.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-lg sm:text-2xl mb-8 max-w-2xl text-gray-100"
                >
                  {slide.subtitle}
                </motion.p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition"
                >
                  مشاهده محصولات
                </motion.button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
