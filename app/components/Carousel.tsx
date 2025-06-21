import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CarouselProp from "./UI Props/CarouselProp";
import { Pagination } from "swiper/modules";
import { CarouselProps } from "../dashboard/types";

export default function Carousel({ data = [] }: CarouselProps) {
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      let spv = 2;
      if (window.innerWidth >= 1280) spv = 6;
      else if (window.innerWidth >= 1024) spv = 5;
      else if (window.innerWidth >= 640) spv = 3;
      else if (window.innerWidth >= 480) spv = 3;
      if (swiperRef.current) {
        swiperRef.current.style.setProperty(
          "--slides-per-view",
          spv.toString()
        );
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Set on mount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Swiper
      ref={swiperRef}
      slidesPerView="auto"
      spaceBetween={10}
      centeredSlides={false}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
      breakpoints={{
        480: { slidesPerView: 3, spaceBetween: 10 },
        640: { slidesPerView: 3, spaceBetween: 15 },
        1024: { slidesPerView: 5, spaceBetween: 20 },
        1280: { slidesPerView: 6, spaceBetween: 20 },
      }}
    >
      {data.map((item, index) => (
        <SwiperSlide key={item ? item.id : `skeleton-${index}`}>
          <CarouselProp item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
