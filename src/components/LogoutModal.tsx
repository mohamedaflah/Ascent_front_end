import { useDispatch } from "react-redux";
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
} from "../shadcn/ui/alert-dialog";
import { AppDispatch } from "@/redux/store";
import { logoutUser } from "@/redux/actions/userActions";
import toast from "react-hot-toast";
const LogoutModal = () => {
  const dispatch: AppDispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      toast.success("Logout Successfull!!");
      localStorage.removeItem("companyVerification")
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full flex justify-start">Logout</AlertDialogTrigger>
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
          <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default LogoutModal;
