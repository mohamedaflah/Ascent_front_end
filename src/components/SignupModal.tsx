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
    <Dialog>
      <DialogTrigger className="px-5 py-2 rounded-sm  border-black text-textPrimary font-semibold bg-primary border-none text-white">
        Signup
      </DialogTrigger>
      <DialogContent className="bg-accenting">
        <DialogHeader>
          <DialogTitle className="flex justify-start text-2xl">
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
          </DialogTitle>

          <DialogDescription>
            {message == "Verification link sended" || verificationState ? (
              <EmailVerification />
            ) : isSignup ? (
              <SignupForm setSignup={setIsSignup} />
            ) : (
              <LoginForm setSignup={setIsSignup} />
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
