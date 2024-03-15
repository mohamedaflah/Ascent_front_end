import { deleteCategory } from "@/redux/actions/categoryAction";
import { AppDispatch } from "@/redux/store";
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

import { RefreshCcw, Trash } from "lucide-react";
import { useDispatch } from "react-redux";

interface ChildProp {
  status: boolean;
  id:string
}
export function DeleteAlert({ status,id }: ChildProp) {
  const dispatch:AppDispatch=useDispatch()
  const handleContinue=()=>{
    dispatch(deleteCategory(id))
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild
        className="rounded-md  text-white   h-full items-center font-semibold bg-transparent cursor-pointer"
      >
        {status ? <Trash /> : <RefreshCcw />}
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
          <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
