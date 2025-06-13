import React from "react";

export default function Steps() {
  return (
    <section id="steps" className="py-[96px]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="bg-black rounded-[50px] relative overflow-hidden">
          {/* Optional: Use a background image as shown in your CSS */}
          <div className="absolute inset-0 bg-[url('/assets/steps-bg.jpg')] bg-cover bg-center opacity-60"></div>
          <div className="relative z-10 px-[40px] py-[96px] flex flex-col items-center text-center text-white/60">
            <h2 className="text-[64px] font-bold text-[#e5e6e6] leading-none tracking-[-1.92px] max-w-[430px] w-full mb-[56px]">
              So, how does it work?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-stretch w-full relative">
              <div className="absolute top-[32px] left-1/2 transform -translate-x-1/2 w-[70%] border-t border-white/10 sm:hidden"></div>
              <div className="flex flex-col sm:flex-row gap-12 justify-center items-center sm:items-start w-full">
                {/* Step 1 */}
                <div className="flex flex-col items-center p-[0_20px] transition-transform duration-400 group hover:-translate-y-[12px]">
                  <div className="w-[64px] h-[64px] rounded-full border-2 border-white/10 bg-black flex items-center justify-center text-[20px] text-white mb-[40px] transition-colors duration-400 group-hover:bg-white group-hover:text-black group-hover:scale-110 relative z-10">
                    <span>1</span>
                  </div>
                  <p className="text-[18px] font-medium leading-[24px] max-w-[280px] w-full">
                    Browse through our wide selection of the world's most
                    popular movies
                  </p>
                </div>
                {/* Step 2 */}
                <div className="flex flex-col items-center p-[0_20px] transition-transform duration-400 group hover:-translate-y-[12px]">
                  <div className="w-[64px] h-[64px] rounded-full border-2 border-white/10 bg-black flex items-center justify-center text-[20px] text-white mb-[40px] transition-colors duration-400 group-hover:bg-white group-hover:text-black group-hover:scale-110 relative z-10">
                    <span>2</span>
                  </div>
                  <p className="text-[18px] font-medium leading-[24px] max-w-[280px] w-full">
                    Simply select a movie you'd like to have summarised and let
                    our AI algorithms do the rest.
                  </p>
                </div>
                {/* Step 3 */}
                <div className="flex flex-col items-center p-[0_20px] transition-transform duration-400 group hover:-translate-y-[12px]">
                  <div className="w-[64px] h-[64px] rounded-full border-2 border-white/10 bg-black flex items-center justify-center text-[20px] text-white mb-[40px] transition-colors duration-400 group-hover:bg-white group-hover:text-black group-hover:scale-110 relative z-10">
                    <span>3</span>
                  </div>
                  <p className="text-[18px] font-medium leading-[24px] max-w-[280px] w-full">
                    Take a couple of minutes to read and listen to the summary.
                    And you’re done!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
