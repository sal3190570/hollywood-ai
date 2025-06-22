import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

export default function SearchBar() {
  return (
    <>
      <div className="flex relative w-full h-20 items-center justify-start py-2 outline outline-gray-200">
        <div className="flex items-center ml-8 w-[70%] max-w-[420px] sm:w-full sm:max-w-[420px] moving-marginLeft p-1.5 bg-gray-200 rounded-full">
          <MagnifyingGlassIcon className="w-5 h-5 ml-2" />
          <input
            type="text"
            className="w-full text-black rounded-full outline-none px-2 py-1"
            placeholder="Search for movies..."
          />
        </div>
      </div>
    </>
  );
}
