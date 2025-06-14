"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CarouselProp from "./UI Props/CarouselProp";
import { Pagination } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        centeredSlides={false}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <CarouselProp />
        </SwiperSlide>
        <SwiperSlide>
          <CarouselProp />
        </SwiperSlide>
        <SwiperSlide>
          <CarouselProp />
        </SwiperSlide>
        <SwiperSlide>
          <CarouselProp />
        </SwiperSlide>
        <SwiperSlide>
          <CarouselProp />
        </SwiperSlide>
        <SwiperSlide>
          <CarouselProp />
        </SwiperSlide>
        <SwiperSlide>
          <CarouselProp />
        </SwiperSlide>
        <SwiperSlide>
          <CarouselProp />
        </SwiperSlide>
        <SwiperSlide>
          <CarouselProp />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
