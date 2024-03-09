import { useEffect, useRef, useState } from "react";

import SignupForm from "./SignupForm";
import AscentText from "./common/AscentText";
import LoginForm from "./LoginForm";
import EmailVerification from "./custom/EmailVerification";
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
  function resettoBack(){
    setIsSignup(true)
  }
  const cancelref=useRef<HTMLButtonElement>(null)
  return (
    <AlertDialog>
      <AlertDialogTrigger className="px-5 py-2 rounded-sm  border-black text-textPrimary font-semibold bg-primary border-none text-white">
        Signup
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-accenting">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between text-2xl">
            <h1>
              {!(verificationState) && (
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
            <AlertDialogCancel className="border-none outline-none text-1xl w-auto p-0 " onClick={resettoBack} ref={cancelref}>
            <X className="h-5 w-5" />
            </AlertDialogCancel>
          </AlertDialogTitle>

          <AlertDialogDescription>
            {message == "Verification link sended" || verificationState ? (
              <EmailVerification setVerificationState={setVerificationState}/>
            ) : isSignup ? (
              <SignupForm setSignup={setIsSignup} />
            ) : (
              <LoginForm setSignup={setIsSignup} cancelRef={cancelref}/>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignupModal;
