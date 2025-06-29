import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pagination } from "swiper/modules";
import CarouselProp from "./UI Props/CarouselProp";
import { MovieItemWithDuration } from "../types";

export default function Carousel({
  data = [],
}: {
  data?: (MovieItemWithDuration | null)[];
}) {
  return (
    <div className="w-full max-w-full min-w-0">
      <Swiper
        spaceBetween={10}
        centeredSlides={false}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
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
    </div>
  );
}
