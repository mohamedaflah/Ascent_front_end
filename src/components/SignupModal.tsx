import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/ui/dialog";

import { Label } from "../shadcn/ui/label";
import { Input } from "../shadcn/ui/input";

import AscentText from "./common/AscentText";
import { Button } from "@/shadcn/ui/button";
import ButtonLoading from "./ButtonLoading";

const SignupModal = () => {
  return (
    <Dialog>
      <DialogTrigger className="px-5 py-2 rounded-sm  border-black text-textPrimary font-semibold bg-primary border-none text-white">
        Signup
      </DialogTrigger>
      <DialogContent className="bg-accenting">
        <DialogHeader>
          <DialogTitle className="flex justify-start text-2xl">
            <h1>
              Create Account in <AscentText />
            </h1>
          </DialogTitle>
          <DialogDescription>
            <div className="flex w-full flex-col  mt-5 gap-5">
              <div className="w-full flex flex-col gap-4">
                <Label className="font-semibold">Username</Label>
                <Input type="text" className="w-full" />
              </div>

              <div className="w-full flex flex-col gap-4">
                <Label className="font-semibold">Email</Label>
                <Input type="email" className="w-full" />
              </div>

              <div className="w-full flex flex-col gap-4">
                <Label className="font-semibold">Password</Label>
                <Input type="password" className="w-full" />
              </div>
              <div className="w-full">
                <Button className="w-full font-semibold ">
                  {true?"Create   An Acccount":<ButtonLoading/>}
                  
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
