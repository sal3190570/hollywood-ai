"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CarouselProp from "./UI Props/CarouselProp";
import { Pagination } from "swiper/modules";
import { CarouselProps } from "../dashboard/types";

export default function Carousel({ data = [] }: CarouselProps) {
  return (
    <Swiper
      slidesPerView={6}
      spaceBetween={0} 
      centeredSlides={false}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {data.map((item, index) => (
        <SwiperSlide key={item ? item.id : `skeleton-${index}`}>
          <CarouselProp item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
