import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";

import { ReactNode } from "react";

interface ChildProp {
  children: ReactNode;
  action: (arg?: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actionArg?: any;
}
const ConfirmModal = ({ children, action, actionArg }: ChildProp) => {
  const handleConfirm = () => {
    if (actionArg) {
      action(actionArg);
    } else {
      action();
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full flex justify-start">
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ConfirmModal;