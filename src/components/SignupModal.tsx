import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/ui/dialog";
import SignupForm from "./SignupForm";
import AscentText from "./common/AscentText";
import LoginForm from "./LoginForm";
import EmailVerification from "./EmailVerification";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/shadcn/ui/alert-dialog";
import { X } from "lucide-react";

const SignupModal = () => {
  const [isSignup, setIsSignup] = useState<boolean>(true);
  const { message } = useSelector((state: RootState) => state.userData);
  const [verificationState, setVerificationState] = useState<boolean>(false);
  useEffect(() => {
    const data: { isVerificationState: boolean } | null = JSON.parse(
      localStorage.getItem("verificationState") ?? "{}"
    );
    setVerificationState(data?.isVerificationState===true)
  }, []);
  return (
    <AlertDialog>
      <AlertDialogTrigger className="px-5 py-2 rounded-sm  border-black text-textPrimary font-semibold bg-primary border-none text-white">
        Signup
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-accenting">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between text-2xl">
            <h1>
              {(message !== "Verification link sended" || verificationState!==true) && (
                <>
                  {!isSignup ? (
                    <>
                      Welcome back in <AscentText />
                    </>
                  ) : (
                    <>
                      Create a new Account in <AscentText />
                    </>
                  )}
                </>
              )}
            </h1>
            <AlertDialogCancel className="border-none outline-none text-1xl w-auto p-0 ">
            <X />
            </AlertDialogCancel>
          </AlertDialogTitle>

          <AlertDialogDescription>
            {message == "Verification link sended" || verificationState ? (
              <EmailVerification />
            ) : isSignup ? (
              <SignupForm setSignup={setIsSignup} />
            ) : (
              <LoginForm setSignup={setIsSignup} />
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignupModal;
