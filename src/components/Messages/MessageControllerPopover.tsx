import { Popover, PopoverContent } from "@/shadcn/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
// import { Delete, Trash } from "lucide-react";
import { FaEllipsisV } from "react-icons/fa";
import ConfirmModal from "../custom/confirmModal";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { deleteMessage } from "@/redux/actions/messageAction";

interface ChildProp {
  id?: string;
}
export function MessageControllerPopover({ id }: ChildProp) {
  const dispatch: AppDispatch = useDispatch();
  const handleDeleteMessage = () => {
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
