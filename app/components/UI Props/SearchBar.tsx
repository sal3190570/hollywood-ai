import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex relative w-full h-20 items-center justify-start py-2 outline outline-gray-200">
      <div className="flex items-center ml-8 w-[70%] max-w-[420px] sm:w-full sm:max-w-[420px] moving-marginLeft p-1.5 bg-gray-200 rounded-full">
        <MagnifyingGlassIcon className="w-5 h-5 ml-2" />
        <input
          type="text"
          className="w-full text-black rounded-full outline-none px-2 py-1"
          placeholder="Search for movies..."
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {isOpen && (
        <div className="absolute left-8 top-16 w-[70%] sm:w-full sm:max-w-[420px] max-w-[420px] h-[200px] bg-white sm:rounded-xl outline-none shadow-lg z-50">
          {/* Modal/dropdown content */}
        </div>
      )}
    </div>
  );
}
