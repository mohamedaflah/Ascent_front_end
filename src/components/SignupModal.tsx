import { useState } from "react";
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

const SignupModal = () => {
  const [isSignup, setIsSignup] = useState<boolean>(true);
  // const [open,setIsOpen]=useState<boolean>(false)
  return (
    <Dialog>
      <DialogTrigger className="px-5 py-2 rounded-sm  border-black text-textPrimary font-semibold bg-primary border-none text-white">
        Signup
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

export default SignupModal;
