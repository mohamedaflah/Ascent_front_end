import { createMessage } from "@/redux/actions/messageAction";
import { AppDispatch, RootState } from "@/redux/store";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { Textarea } from "@/shadcn/ui/textarea";
import { uploadImageToCloudinary } from "@/util/uploadImage";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Send, X } from "lucide-react";

import { forwardRef, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
interface FileModalChatProps {
  image: File | null; // Define the prop image of type File or null
}

export const FileModalChat = forwardRef<HTMLButtonElement, FileModalChatProps>(
  ({ image }, ref) => {
    const closeRef = useRef<HTMLButtonElement>(null);
    const dispatch: AppDispatch = useDispatch();
    const { chatId } = useSelector((state: RootState) => state.chats);
    const { user } = useSelector((state: RootState) => state.userData);
    const { loading} = useSelector((state: RootState) => state.message);
    const [localLoad, setLocalLoad] = useState<boolean>(false);
    const [text, setText] = useState("");
    const handleClick = async () => {
      setLocalLoad(true);
      const imageLink = await uploadImageToCloudinary(image);
      const res = await dispatch(
        createMessage({
          chatId: String(chatId),
          content: {
            content: imageLink,
            type: "image",
            subcontent: {
              content: text,
              type: "text",
            },
          },
          senderId: user?._id,
          senderName: user?.name,
          senderProfile: user?.icon,
        })
      );
      setLocalLoad(false);
      if (res.type.endsWith("fulfilled")) {
        closeRef.current?.click();
      }
    };
    return (
      <>
        <AlertDialog>
          <AlertDialogTrigger asChild className="">
            <button
              className=" h-full w-full  justify-start items-center hidden "
              ref={ref}
            >
              d
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogDescription>
                <div className="flex flex-col gap-1 ">
                  <div className="w-full h-56 relative">
                    <AlertDialogCancel className="absolute right-2 top-2 bg-backgroundAccent rounded-full " ref={closeRef}>
                      <X className="w-5" />
                    </AlertDialogCancel>
                    <img
                      src={URL.createObjectURL(image as Blob | MediaSource)}
                      className="h-full w-full object-cover rounded-sm"
                      alt=""
                    />
                  </div>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full border-none p-0 ring:none "
                    placeholder="Add texts or description"
                  ></Textarea>
                  <div className="w-full flex justify-end mt-2">
                    <button
                      className={`w-10 h-10 items-center flex justify-center p-2 bg-primary text-white rounded-md ${loading||localLoad&&"pointer-events-none bg-primary/50"}`}
                      onClick={handleClick}
                    >
                      <Send className="w-5" />
                    </button>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }
);
