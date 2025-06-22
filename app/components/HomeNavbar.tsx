import Image from "next/image";
import Link from "next/link";
import SignInButton from "./UI Props/SignInButton";

export default function HomeNavbar() {
  return (
    <nav className="flex sticky top-0 z-[999] justify-between items-center h-[76px] px-[30px] py-[18px] bg-white shadow-[0_3px_12px_rgba(0,0,0,0.1)]">
      <Link href="#">
        <Image
          src="/assets/logo-dark.png"
          alt="Logo"
          className="h-[40px] w-auto"
          width={100}
          height={40}
          quality={100}
          unoptimized
          priority
        />
      </Link>
      <div className="hidden lg:flex gap-4">
        <Link
          href="#"
          className="text-[14px] px-[14px] py-[7px] font-semibold text-[#070707] rounded-lg cursor-not-allowed"
        >
          About
        </Link>
        <Link
          href="#"
          className="text-[14px] px-[14px] py-[7px] font-semibold text-[#070707] rounded-lg cursor-not-allowed"
        >
          Features
        </Link>
        <Link
          href="#"
          className="text-[14px] px-[14px] py-[7px] font-semibold text-[#070707] rounded-lg cursor-not-allowed"
        >
          How it works
        </Link>
        <Link
          href="#"
          className="text-[14px] px-[14px] py-[7px] font-semibold text-[#070707] rounded-lg cursor-not-allowed"
        >
          Privacy policy
        </Link>
      </div>
      <SignInButton />
    </nav>
  );
}
