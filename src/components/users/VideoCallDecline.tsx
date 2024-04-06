import { SocketContext } from "@/contexts/SocketContext";
import { RootState } from "@/redux/store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { forwardRef, useContext } from "react";
import { useSelector } from "react-redux";

interface ChildProp {
  data:
    | {
        callId: string;
        senderId: string;
        senderProfile: string;
        message: string;
        senderName: string;
        reciverId: string;
      }
    | undefined;
}

export const VideoCallDecline = forwardRef<HTMLButtonElement, ChildProp>(
  ({ data }, ref) => {
    const { user } = useSelector((state: RootState) => state.userData);
    const socket = useContext(SocketContext);
    const handleRenotify = () => {
      socket?.emit("video-call", {
        callId: data?.callId,
        recieverId: data?.senderId,
        senderId: user?._id,
        message: "Interview Call",
        senderName: user?.name,
        senderProfile: user?.icon,
      });
    };
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <button ref={ref}>videocall decline</button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>User declined call</AlertDialogTitle>
            <AlertDialogDescription>
              Your interview call has been rejected or declined by applicant
              please take an action for that
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRenotify}>
              Re notify
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);
