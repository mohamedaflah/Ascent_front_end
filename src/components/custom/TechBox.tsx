import { X } from "lucide-react";
import TechnologyIcon from "./TechIcon";

interface ChildProp {
  value: string;
  index: number;
  techStackDelete: (index: number) => void;
  from: "location" | "techstack";
}
export function TechBox({ value, index, techStackDelete, from }: ChildProp) {
  return (
    <div className=" h-10 border flex items-center justify-between px-3 rounded-md gap-2 ">
      {from === "techstack" && <TechnologyIcon technology={value} />}
      {value}
      <X
        className="w-4 cursor-pointer"
        onClick={() => techStackDelete(index)}
      />
    </div>
  );
}
