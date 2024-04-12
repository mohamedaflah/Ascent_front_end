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

import {
  ChangeEvent,
  forwardRef,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { v4 as uuid } from "uuid";

import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "@/contexts/SocketContext";
import { Message } from "@/types/types.messagereducer";
import { VideoPlay } from "./VideoPlay";
import { setMessage } from "@/redux/reducers/messageReducer";
import { setLastMessage } from "@/redux/reducers/chatReducer";

interface FileModalChatProps {
  image: File | null; // Define the prop image of type File or null,
  type: "image" | "video" | "doc" | "audio";
}

export const FileModalChat = forwardRef<HTMLButtonElement, FileModalChatProps>(
  ({ image, type }, ref) => {
    const closeRef = useRef<HTMLButtonElement>(null);
    const dispatch: AppDispatch = useDispatch();
    const { chatId, selectedUser } = useSelector(
      (state: RootState) => state.chats
    );
    const { user, role } = useSelector((state: RootState) => state.userData);
    const { loading } = useSelector((state: RootState) => state.message);
    const [localLoad, setLocalLoad] = useState<boolean>(false);
    const [text, setText] = useState("");

    const socket = useContext(SocketContext);
    const handleClick = async () => {
      setLocalLoad(true);
      const username =
        role === "company" ? user.name : `${user.firstname} ${user.lastname}`;
      let fileLink = await uploadImageToCloudinary(
        image,
        type as "image" | "video"
      );
      if (type === "doc") {
        fileLink = fileLink + `[^(I)^]${image?.name}`;
      }

      const socketSendBody: Message = {
        senderId: user?._id,
        senderName: username,
        senderProfile: user?.icon ? user?.icon : "",
        status: "unread",
        _id: uuid(),
        content: {
          type: type,
          content: fileLink,
          subcontent: {
            type: "text",
            content: text,
          },
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        chatId: chatId,
      };
      socket?.emit("send-message", {
        data: socketSendBody,
        reciverId: selectedUser?._id,
      });
      dispatch(setMessage(socketSendBody))
      dispatch(
        setLastMessage({ reciverId: selectedUser?._id, message: socketSendBody })
      );
      const res = await dispatch(
        createMessage(socketSendBody)
      );
      setLocalLoad(false);
      if (res.type.endsWith("fulfilled")) {
        closeRef.current?.click();
      }
    };
    const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    }, []);

    // const videoSrc =
    //   type === "video" && image ? URL.createObjectURL(image) : "";
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
              <AlertDialogDescription className="relative">
                {loading ||
                  (localLoad && (
                    <div className="gap-1 absolute left-0 top-0 w-full h-full bg-backgroundAccent/80 flex items-center justify-center z-20">
                      <div className="w-8 h-12 rounded-sm animate-bounce bg-background"></div>
                      <div className="w-8 h-12 rounded-sm animate-bounce  bg-background"></div>
                      <div className="w-8 h-12 rounded-sm animate-bounce bg-background"></div>
                    </div>
                  ))}
                <div className="flex flex-col gap-1 ">
                  <div className="w-full h-56 relative">
                    <AlertDialogCancel
                      className="absolute right-2 top-2 bg-backgroundAccent rounded-full "
                      ref={closeRef}
                    >
                      <X className="w-5" />
                    </AlertDialogCancel>
                    {type === "image" ? (
                      <img
                        src={URL.createObjectURL(image as Blob | MediaSource)}
                        className="h-full w-full object-cover rounded-sm"
                        alt=""
                      />
                    ) : type === "video" ? (
                      <>
                        <VideoPlay
                          src={URL.createObjectURL(image as Blob | MediaSource)}
                          className="w-full h-full object-cover"
                        />
                      </>
                    ) : type === "doc" ? (
                      <embed
                        className="w-full h-full object-cover rounded-sm"
                        src={URL.createObjectURL(image as Blob | MediaSource)}
                      />
                    ) : (
                      <>
                        <div></div>
                      </>
                    )}
                  </div>
                  <Textarea
                    value={text}
                    onChange={handleTextChange as never}
                    className="w-full border-none p-0 ring:none "
                    placeholder="Add texts or description"
                  ></Textarea>
                  <div className="w-full flex justify-end mt-2">
                    <button
                      className={`w-10 h-10 items-center flex justify-center p-2 bg-primary text-white rounded-md ${
                        loading ||
                        (localLoad && "pointer-events-none bg-primary/50")
                      }`}
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
