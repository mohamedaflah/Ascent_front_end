import { useRef, useState } from "react";

import LoginForm from "./LoginForm";
import AscentText from "./common/AscentText";
import SignupForm from "./SignupForm";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { X } from "lucide-react";

const LoginModal = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);
  function restBack(){
    setIsSignup(false)
  }
  const cancelref=useRef<HTMLButtonElement>(null)
  return (
    <AlertDialog>
      <AlertDialogTrigger className="px-5 py-2 rounded-sm border border-textPrimary text-textPrimary font-semibold">
        Login
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-accenting">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between text-2xl">
            <h1>
              {!isSignup ? (
                <>
                  Welcom back in <AscentText />
                </>
              ) : (
                <>
                  Create An new Account in <AscentText />
                </>
              )}
            </h1>
            <AlertDialogCancel className="border-none outline-none text-1xl w-auto p-0 " onClick={restBack} ref={cancelref}>
              <X className="h-5 w-5" />
            </AlertDialogCancel>
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isSignup ? (
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

export default LoginModal;
