import { Popover, PopoverContent } from "@/shadcn/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
// import { Delete, Trash } from "lucide-react";
import { FaEllipsisV } from "react-icons/fa";
import ConfirmModal from "../custom/confirmModal";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage } from "@/redux/actions/messageAction";
import { useContext } from "react";
import { SocketContext } from "@/contexts/SocketContext";

interface ChildProp {
  id?: string;
  Idx?: number;
}
export function MessageControllerPopover({ id,Idx }: ChildProp) {
  const dispatch: AppDispatch = useDispatch();
  const { chatId, selectedUser } = useSelector(
    (state: RootState) => state.chats
  );
  const { user } = useSelector((state: RootState) => state.userData);
  const socket = useContext(SocketContext);
  const handleDeleteMessage = () => {
    socket?.emit("delete-message", {
      chatId: chatId,
      senderId: user._id,
      recieverId: String(selectedUser?._id),
      message: "delete message",
      messageId: Idx,
    });
    if (id) {
      dispatch(deleteMessage(id));
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">
          <FaEllipsisV />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-40 bg-background">
        <div className="flex flex-col items-center justify-center p-1 text-sm w-full">
          <div className="flex gap-1 border-b p-1 items-center justify-start w-full cursor-pointer">
            Edit message
          </div>
          <ConfirmModal
            action={() => handleDeleteMessage()}
            className="border-none ring-0 outline-none"
          >
            <div className="flex gap-1 border-b p-1 items-center justify-start w-full cursor-pointer">
              Delete message
            </div>
          </ConfirmModal>
        </div>
      </PopoverContent>
    </Popover>
  );
}
