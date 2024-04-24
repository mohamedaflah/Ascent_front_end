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
  className?:string
  falseClass?:boolean
}
const ConfirmModal = ({ children, action, actionArg,className,falseClass }: ChildProp) => {
  const handleConfirm = () => {
    if (actionArg) {
      action(actionArg);
    } else {
      action();
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className={`${!falseClass&&"w-full flex justify-start"} ${className}`}>
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
