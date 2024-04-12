import { Popover, PopoverContent } from "@/shadcn/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";

import { Smile } from "lucide-react";
import { EmojiPicker } from "./EmojiPicker";
import React from "react";

interface ChildProp {
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export function EmojiPickerPopover({setText}:ChildProp) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">
          <Smile className="w-5" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="min-w-96 mx-8 border-none mb-5 p-0 h-auto bg-background">
        <div className="w-full h-full flex justify-center items-center">
          <EmojiPicker setText={setText}/>
        </div>
      </PopoverContent>
    </Popover>
  );
}
