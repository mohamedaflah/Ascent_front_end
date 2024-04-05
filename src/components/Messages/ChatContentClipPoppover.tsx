import { Popover, PopoverContent } from "@/shadcn/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { File, FileVideo, Image, Paperclip } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FileModalChat } from "./FileSelectModal";

export function PapperClipPopover() {
  const [image, selectedImage] = useState<File | null | undefined>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (image) {
      openRef.current?.click();
    }
  }, [image]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Paperclip className="w-5 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-14 border-none bg-transparent p-4 rounded-full shadow-none">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="cursor-pointer w-12 h-12 rounded-full bg-backgroundAccent flex items-center justify-center">
            <label htmlFor="Image" className="cursor-pointer">
              <div className="hidden">
                {image && (
                  <FileModalChat image={image as File | null} ref={openRef} />
                )}
              </div>
              <Image className="w-5" />
            </label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="Image"
              onChange={(e) => selectedImage(e?.target?.files?.[0])}
            />
          </div>
          <div className="cursor-pointer w-12 h-12 rounded-full bg-backgroundAccent flex items-center justify-center">
            <FileVideo className="w-5" />
          </div>
          <div className="cursor-pointer w-12 h-12 rounded-full bg-backgroundAccent flex items-center justify-center">
            <File className="w-5" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
