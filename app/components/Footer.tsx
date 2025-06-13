import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import FooterButton from "./FooterButton";

export default function Footer() {
  return (
    <footer
      style={{
        background:
          "radial-gradient(circle at 0% -30%, #a12a91, rgba(33, 13, 123, 0.83), transparent, transparent, transparent)",
        backgroundColor: "black",
        marginTop: "120px",
        color: "white",
      }}
    >
      {/* CTA Section */}
      <section id="cta" className="relative">
        <svg
          className="absolute top-[-1px] left-0 right-0 w-full h-auto block fill-[#f9f9fb]"
          preserveAspectRatio="none"
          width="1440"
          height="86"
          viewBox="0 0 1440 86"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 85.662C240 29.1253 480 0.857 720 0.857C960 0.857 1200 29.1253 1440 85.662V0H0V85.662Z"></path>
        </svg>
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center">
            <p className="mb-9 text-[10px] font-semibold uppercase tracking-[1px] flex items-center gap-2">
              <span className="bg-[#262626] py-1 px-3 rounded-xl">
                HollywoodAI
              </span>
              Endless benefits, one subscription.
            </p>
            <h2
              className="text-[100px] leading-[100px] text-center 
            font-bold max-w-[569px] w-full mb-8"
            >
              Start your free trial.
            </h2>
            <p className="text-[20px] opacity-50 max-w-[440px] w-full text-center mb-9">
              Enjoy your favourite movies in minutes by letting AI do the work
              for you.
            </p>

            <FooterButton />
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section
        id="links"
        className="w-full border-t border-[#ffffff1f] border-b border-[#ffffff1f]"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-7">
          <Image
            src="/assets/logo-light.png"
            alt="HollywoodAI"
            width={132}
            height={40}
            className="w-[132px] h-auto"
          />
          <div className="flex flex-wrap justify-center gap-7 sm:gap-[30px]">
            <li className="text-white text-[14px] flex items-center cursor-not-allowed">
              <FontAwesomeIcon
                icon={faInstagram}
                className="w-[14px] h-[14px] mr-3"
              />
              <span>Instagram</span>
            </li>
            <li className="text-white text-[14px] flex items-center cursor-not-allowed">
              <FontAwesomeIcon
                icon={faTwitter}
                className="w-[14px] h-[14px] mr-3"
              />
              <span>Twitter</span>
            </li>
            <li className="text-white text-[14px] flex items-center cursor-not-allowed">
              <FontAwesomeIcon
                icon={faFacebook}
                className="w-[14px] h-[14px] mr-3"
              />
              <span>Facebook</span>
            </li>
            <li className="text-white text-[14px] flex items-center cursor-not-allowed">
              <FontAwesomeIcon
                icon={faTiktok}
                className="w-[14px] h-[14px] mr-3"
              />
              <span>Tiktok</span>
            </li>
          </div>
        </div>
      </section>

      {/* Copyright Section */}
      <section id="copyright">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-8 py-8 flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-center">
          <div className="w-full flex justify-center sm:w-auto">
            <form className="flex flex-col md:flex-row  gap-3 w sm:w-auto max-w-[600px]">
              <input
                type="text"
                className="w-[200px] px-8 py-5 bg-[#ffffff11] rounded-lg outline-none border-none text-white text-center sm:text-left text-sm"
                placeholder="Enter your email"
              />
              <button
                type="button"
                className="w-[200px] px-8 py-5 text-white font-bold bg-[#ffffff11] rounded-lg text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
          <span className="text-[#e5e6e6] text-[14px]">
            2025 Copyright © Hollywood AI
          </span>
        </div>
      </section>
    </footer>
  );
}
