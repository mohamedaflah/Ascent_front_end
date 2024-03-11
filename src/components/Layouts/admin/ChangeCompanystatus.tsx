import { Textarea } from "@/shadcn/ui/textarea";
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
} from "../../../shadcn/ui/alert-dialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeApprovleStatus } from "@/redux/actions/adminActions";
import { AppDispatch } from "@/redux/store";

interface childProps {
  status: "Accepted" | "Rejected" | "Pending";
  id: string;
  
}
const ChangeCompanyApprovel = ({ status,id }: childProps) => {
  const [reason,setReason]=useState<string>("")
  const dispatch:AppDispatch=useDispatch()
  async function handleSubmit(){
    await dispatch(changeApprovleStatus({status,id,description:reason}))
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full flex justify-start  h-9 items-center">
        Reject
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription >
            <Textarea placeholder="Enter reason of Rejection h-full" value={reason} onChange={(e)=>setReason(e.target.value)}/>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className={`bg-red-500 ${reason.length<=1&&"pointer-events-none"}`} onClick={handleSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ChangeCompanyApprovel;
