import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import HeaderButton from "./HeaderButton";

export default function Header() {
  return (
    <header className="bg-linear-to-r from-[#70acd4] via-[#ca71ff] via-[#8469cc] via-[#4882e6] via-[#8469cc] to-[#70acd4] animate-gradient-animation flex items-center relative py-[208px] h-[90vh]">
      <div className="max-w-[1280px] m-auto py-[20px] flex flex-col justify-center items-center">
        {/* Header Widget */}
        <div className="px-[13px] py-[5px] pb-[3px] bg-white/15 rounded-[20px] text-[10px] leading-[11px] font-bold flex items-center gap-[6px] mb-[32px]">
          <span className="text-white">Meet HollywoodAI</span>
          <span className="text-[6px]">⏺</span>
          <span className="text-[#e5e6e6] opacity-60">
            Unleash the Power of AI
          </span>
        </div>
        {/* Header Title */}
        <h1 className="text-6xl md:text-7xl lg:text-[84px] font-bold tracking-[-2.1px] leading-[77px] text-center text-white mb-[28px]">
          Ultimate AI
          <br />
          <div className="flex items-center justify-center gap-4 lg:gap-5">
            Summariser
            <div className="relative w-9 h-11 md:w-10 md:h-[50px] lg:w-[46px] lg:h-[60px]">
              <Image
                src="/assets/bolt.svg"
                alt="Bolt"
                fill
                className="translate-y-[4px] object-contain"
              />
            </div>
          </div>
        </h1>
        {/* Header Paragraph */}
        <p className="text-base md:text-lg lg:text-[20px] font-medium leading-[25px] max-w-[480px] w-full opacity-75 text-[#e5e6e6] text-center mb-[20px]">
          All-in-one platform to watch your favourite movies in minutes using
          AI.
        </p>
        {/* Header Button */}
        <HeaderButton />
      </div>
      {/* SVG Wave */}
      <svg
        className="absolute left-0 right-0 bottom-[-2px] h-auto w-full block fill-[#f9f9fb]"
        width="1440"
        height="105"
        viewBox="0 0 1440 105"
        fill="none"
        xmlns="http://www3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M0 0C240 68.7147 480 103.072 720 103.072C960 103.072 1200 68.7147 1440 0V104.113H0V0Z"></path>
      </svg>
    </header>
  );
}
