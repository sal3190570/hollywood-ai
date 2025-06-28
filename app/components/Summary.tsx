import Image from "next/image";
import React from "react";

export default function Summary() {
  return (
    <section id="summary" className="py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="rounded-[50px] border border-gray-200 p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col md:flex-row justify-between gap-8 md:gap-12">
          <div className="w-full md:w-[47%]">
            <div className="bg-blue-100 py-[5px] px-[13px] pb-[3px] rounded-[20px] text-xs leading-[11px] font-bold flex items-center gap-[6px] mb-12 md:mb-[110px] w-fit">
              <span className="text-gray-900">The future of entertainment</span>
              <span className="text-[6px] opacity-60">⏺</span>
              <span className="opacity-60">AI</span>
            </div>
            <h2 className="text-[28px] sm:text-[32px] md:text-[39px] lg:text-[48px] font-bold text-gray-900 tracking-[-0.8px] sm:tracking-[-1px] md:tracking-[-1.17px] leading-[32px] sm:leading-[36px] md:leading-[40.95px] lg:leading-[52px] mb-6 md:mb-[25px]">
              Say goodbye to 2 hour movies.
            </h2>
            <p className="text-[14px] sm:text-[16px] md:text-[17px] lg:text-[20px] leading-[1.4] sm:leading-normal md:leading-[1.47em] lg:leading-[1.6em] text-gray-500">
              HollywoodAI is designed to help you get high-quality summaries of
              your favourite movies instantly, without breaking a sweat. With
              our intuitive interface and powerful features, you can easily
              digest any movie in just minutes instead of hours.
            </p>
          </div>
          <figure className="w-full md:w-[47%] p-6 sm:p-[30px] bg-blue-100 rounded-xl flex flex-col items-center">
            <Image
              src={"/assets/summary.png"}
              height={400}
              width={400}
              alt=""
              className="w-full h-auto rounded-xl"
            />
            <span className="text-[#4a4a4a] text-[15px] sm:text-[17px] font-bold tracking-[-0.15px] sm:tracking-[-0.17px] leading-[18px] sm:leading-[18.7px] mt-8 sm:mt-[36px] mb-2 sm:mb-[8px] text-center">
              Search. Summarise. Repeat.
            </span>
            <span className="text-[#4a4a4a] text-xs">Powered by AI</span>
          </figure>
        </div>
      </div>
    </section>
  );
}
