import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/ui/dialog";
import LoginForm from "./LoginForm";
import AscentText from "./common/AscentText";
import SignupForm from "./SignupForm";

const LoginModal = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);
  return (
    <Dialog>
      <DialogTrigger className="px-5 py-2 rounded-sm border border-textPrimary text-textPrimary font-semibold">
        Login
      </DialogTrigger>
      <DialogContent className="bg-accenting">
        <DialogHeader>
          <DialogTitle className="flex justify-start text-2xl">
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
          </DialogTitle>
          <DialogDescription>
            {isSignup ? (
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

export default LoginModal;
