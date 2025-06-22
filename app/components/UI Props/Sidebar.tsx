"use client";

import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { openLogInModal } from "@/redux/slices/modalSlice";
import { RootState } from "@/redux/store";
import {
  ArrowRightStartOnRectangleIcon,
  ArrowTrendingUpIcon,
  BookmarkIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  async function handleSignOut() {
    try {
      await signOut(auth);
      // Redux state will be updated via AuthListener.onAuthStateChanged
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <div className="w-[225px] h-dvh bg-white flex-col border-t border-x border-gray-200">
      <div className="pt-6 ml-5">
        <div className="relative h-[40px] w-[150px]">
          <Image
            src="/assets/logo-dark.png"
            alt="Logo"
            fill
            quality={100}
            unoptimized
            priority
            className="object-contain"
          />
        </div>
      </div>
      <div className="mt-8 ml-4 flex flex-col space-y-2">
        <h3 className="text-gray-700 text-[11px] font-[400] tracking-widest">
          LINKS
        </h3>
        <ul className="text-gray-700 text-[15px] flex flex-col gap-2 w-[200px] font-[400]">
          <Link
            className="cursor-pointer p-2 hover:text-purple-900 hover:bg-gray-300 rounded-xl transition-all"
            href={"/dashboard"}
          >
            <div className="flex items-center gap-2 ml-2">
              <Squares2X2Icon className="w-5 h-5 mt-[2px] -ml-2" />
              <span>DashBoard</span>
            </div>
          </Link>
          <Link
            className="cursor-pointer p-2 hover:text-purple-900 hover:bg-gray-300 rounded-xl transition-all"
            href={"/favourites"}
          >
            <div className="flex items-center gap-2 ml-2">
              <BookmarkIcon className="w-5 h-5 mt-[2px] -ml-2" />
              <span>Favourites</span>
            </div>
          </Link>
          <li className="cursor-not-allowed p-2 hover:text-purple-900 hover:bg-gray-300 rounded-xl transition-all">
            <div className="flex items-center gap-2 ml-2">
              <MagnifyingGlassIcon className="w-5 h-5 mt-[2px] -ml-2" />
              <span>Search</span>
            </div>
          </li>
          <li className="cursor-not-allowed p-2 hover:text-purple-900 hover:bg-gray-300 rounded-xl transition-all flex items-center gap-2">
            <div className="flex items-center gap-2 ml-2">
              <ArrowTrendingUpIcon className="w-5 h-5 mt-[2px] -ml-2" />
              <span>Trending</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="mt-8 ml-6 flex flex-col space-y-2">
        <h3 className="text-gray-700 text-[11px] font-[400] tracking-widest">
          EXTRAS
        </h3>
        <ul className="text-gray-700 text-[15px] flex flex-col gap-2 w-[200px] font-[400]">
          <li className="cursor-not-allowed p-2 hover:text-purple-900 hover:bg-gray-300 rounded-xl transition-all flex items-center gap-2">
            <div className="flex items-center gap-2 ml-2">
              <QuestionMarkCircleIcon className="w-5 h-5 mt-[2px] -ml-2" />
              <span>Help & Support</span>
            </div>
          </li>
          <li className="cursor-pointer p-2 hover:text-purple-900 hover:bg-gray-300 rounded-xl transition-all flex items-center gap-2">
            <div className="flex items-center gap-2 ml-2">
              <Cog6ToothIcon className="w-5 h-5 mt-[2px] -ml-2" />
              <span>Settings</span>
            </div>
          </li>
          {isAuthenticated ? (
            <>
              <li className="p-0">
                <button
                  onClick={handleSignOut}
                  className="w-full cursor-pointer p-2 hover:text-purple-900 hover:bg-gray-300 rounded-xl transition-all flex items-center gap-2"
                >
                  <div className="flex items-center gap-2 ml-2">
                    <ArrowRightStartOnRectangleIcon className="w-5 h-5 mt-[2px] -ml-2" />
                    <span>Log Out</span>
                  </div>
                </button>
              </li>
            </>
          ) : (
            <li className="p-0">
              <button
                onClick={() => dispatch(openLogInModal())}
                className="w-full cursor-pointer p-2 hover:text-purple-900 hover:bg-gray-300 rounded-xl transition-all flex items-center gap-2"
              >
                <div className="flex items-center gap-2 ml-2">
                  <ArrowRightStartOnRectangleIcon className="w-5 h-5 mt-[2px] -ml-2" />
                  <span>Log In</span>
                </div>
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
