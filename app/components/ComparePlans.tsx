import { CheckIcon } from "@heroicons/react/24/outline";
import React from "react";
import ChoosePlanButton from "./UI Props/ChoosePlanButton";

export default function ComparePlans() {
  return (
    <>
      <div className="relative w-full">
        <div className=" ml-8 moving-marginLeft">
          <h2 className="font-bold text-2xl mt-4">Subscription Plans: </h2>
          <div className="flex flex-col gap-5 mt-5 sm:flex-row">
            <div
              className="w-[90%] sm:w-[45%] max-w-[550px] h-[400px] shadow-xl border border-gray-200
            rounded-2xl"
            >
              <div className="relative flex flex-col w-full h-full items-center ">
                <div className="absolute flex flex-col gap-2 top-5 left-6">
                  <h3 className="flex text-xl">
                    $<span className="text-6xl font-semibold">19</span> Monthly
                  </h3>
                  <span className="text-sm text-gray-400">Premium</span>
                </div>
                <div className="absolute top-35 left-6">
                  <ul className="flex flex-col gap-3.5">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckIcon className="w-4 h-4 p-[1px] text-black bg-purple-200 rounded-full" />
                      <span>Premium Support </span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckIcon className="w-4 h-4 p-[1px] text-black bg-purple-200 rounded-full" />
                      <span>Access 100+ Summaries</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckIcon className="w-4 h-4 p-[1px] text-black bg-purple-200 rounded-full" />
                      <span>Higher Quality Audio</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckIcon className="w-4 h-4 p-[1px] text-black bg-purple-200 rounded-full" />
                      <span>License For Commercial Use</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckIcon className="w-4 h-4 p-[1px] text-black bg-purple-200 rounded-full" />
                      <span>2 Supported Devices</span>
                    </li>
                  </ul>
                </div>
                <div className="absolute bottom-4 w-full h-10 flex justify-center">
                  <ChoosePlanButton />
                </div>
              </div>
            </div>
            <div
              className="w-[90%] sm:w-[45%] max-w-[550px] h-[400px] shadow-xl border border-gray-200
            rounded-2xl"
            >
              <div className="relative flex flex-col w-full h-full">
                <div className="absolute flex flex-col gap-2 top-5 left-6">
                  <h3 className="flex text-xl">
                    $<span className="text-6xl font-semibold">190</span> Monthly
                  </h3>
                  <span className="text-sm text-gray-400">VIP+</span>
                </div>
                <div className="absolute top-35 left-6">
                  <ul className="flex flex-col gap-3.5">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckIcon className="w-4 h-4 p-[1px] text-black bg-purple-200 rounded-full" />
                      <span>Premium Support</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckIcon className="w-4 h-4 p-[1px] text-black bg-purple-200 rounded-full" />
                      <span>Access 100+ Summaries</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckIcon className="w-4 h-4 p-[1px] text-black bg-purple-200 rounded-full" />
                      <span>Highest Quality Audio</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckIcon className="w-4 h-4 p-[1px] text-black bg-purple-200 rounded-full" />
                      <span>License For Commercial Use</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckIcon className="w-4 h-4 p-[1px] text-black bg-purple-200 rounded-full" />
                      <span>3 Supported Devices</span>
                    </li>
                  </ul>
                </div>
                <div className="absolute bottom-4 w-full h-10 flex justify-center">
                  <ChoosePlanButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
