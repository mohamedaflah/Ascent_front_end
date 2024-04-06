import { SocketContext } from "@/contexts/SocketContext";
import { RootState } from "@/redux/store";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { forwardRef, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface ChildProp {
  videoCallData:
    | {
        callId: string;
        recieverId: string;
        senderId: string;
        message: string;
        senderName: string;
        senderProfile: string;
      }
    | undefined;
}
export const VideoCallModal = forwardRef<HTMLButtonElement, ChildProp>(
  ({ videoCallData }, ref) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    videoCallData;

    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.userData);
    const handleClick = () => {
      navigate(`/room/${videoCallData?.callId}`);
    };
    const socket = useContext(SocketContext);
    const handleDecline = () => {
      socket?.emit("decline-call", {
        callId: videoCallData?.callId,
        senderId: user?._id,
        senderProfile: user?.icon,
        message: "Decline Call",
        senderName: user?.firstname,
        reciverId: videoCallData?.senderId,
      });
    };
    return (
      <>
        <Button onPress={onOpen} ref={ref}>
          Open Modal
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <span>
                    Callling <span className="animate-ping">...</span>
                  </span>
                </ModalHeader>
                <ModalBody>
                  <div className="w-full h-14 flex gap-2">
                    <div className="w-14 h-14 bg-black rounded-full">
                      <img
                        src={videoCallData?.senderProfile}
                        className="w-full h-full object-cover rounded-full"
                        alt=""
                      />
                    </div>
                    <div className=" flex flex-col gap-2">
                      <h1 className="font-semibold">
                        {videoCallData?.senderName}
                      </h1>
                      <h1>Intreview Call</h1>
                    </div>
                    <div></div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    onPress={onClose}
                    onClick={handleDecline}
                  >
                    Decline
                  </Button>
                  <Button
                    color="success"
                    onClick={handleClick}
                    onPress={onClose}
                  >
                    Accept
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
);
