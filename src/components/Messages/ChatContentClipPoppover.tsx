import { Popover, PopoverContent } from "@/shadcn/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { File, FileVideo, Image, Paperclip } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FileModalChat } from "./FileSelectModal";

export function PapperClipPopover() {
  const [image, selectedImage] = useState<File | null | undefined>(null);
  const [selectedType, setSelectedType] = useState<
    "image" | "video" | "doc" | "audio"
  >("image");
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
            <label
              htmlFor="Image"
              className="cursor-pointer w-full h-full flex items-center justify-center"
            >
              <div className="hidden">
                {image && (
                  <FileModalChat
                    image={image as File | null}
                    ref={openRef}
                    type={selectedType}
                  />
                )}
              </div>
              <Image className="w-5" />
            </label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="Image"
              onChange={(e) => {
                selectedImage(e?.target?.files?.[0]);
                setSelectedType("image");
              }}
            />
          </div>
          <label
            className="cursor-pointer w-12 h-12 rounded-full bg-backgroundAccent flex items-center justify-center"
            htmlFor="videoFile"
          >
            <FileVideo className="w-5" />
            <input
              type="file"
              accept="video/mp4, video/mov"
              id="videoFile"
              className="hidden"
              onChange={(e) => {
                selectedImage(e?.target?.files?.[0]);
                setSelectedType("video");
              }}
            />
          </label>
          <label className="cursor-pointer w-12 h-12 rounded-full bg-backgroundAccent flex items-center justify-center" htmlFor="docFile">
            <File className="w-5" />
            <input
              type="file"
              accept="pdf"
              id="docFile"
              className="hidden"
              onChange={(e) => {
                selectedImage(e?.target?.files?.[0]);
                setSelectedType("doc");
              }}
            />
          </label>
        </div>
      </PopoverContent>
    </Popover>
  );
}
