import { Search } from "lucide-react";

export function SearchBox() {
  return (
    <div className="w-full h-12 border grid grid-cols-10 px-3">
      <div className="col-span-1 text-textPrimary flex items-center justify-start">
        <Search className="w-5 " />
      </div>
      <div className="col-span-9">
        <input
          type="text"
          className="w-full h-full bg-transparent outline-none "
          placeholder="Search Messages"
        />
      </div>
    </div>
  );
}
