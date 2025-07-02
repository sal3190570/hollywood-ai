import React from "react";

export default function SettingsTitle() {
  return (
    <>
      <div className="flex flex-col relative justify-center w-full h-[100px]">
        <div className="ml-8 moving-marginLeft">
          <h1 className="text-[32px] font-bold">Settings</h1>
        </div>
      </div>

      <div className="ml-8 moving-marginLeft">
        <div className="h-1 border-b-[1px] border-gray-200 w-[calc(100%-32px)] max-w-[95%]"></div>
      </div>
    </>
  );
}
