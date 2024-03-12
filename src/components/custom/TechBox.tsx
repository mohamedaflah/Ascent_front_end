import { X } from "lucide-react";
import TechnologyIcon from "./TechIcon";

interface ChildProp {
  value: string;
  index: number;
  techStackDelete:(index:number)=>void
}
export function TechBox({ value,index,techStackDelete }: ChildProp) {
 
  return (
    <div className=" h-10 border flex items-center justify-between px-3 rounded-md gap-2 ">
      <TechnologyIcon technology={value}/>{value} 
      <X className="w-4 cursor-pointer" onClick={()=>techStackDelete(index)} />
    </div>
  );
}
