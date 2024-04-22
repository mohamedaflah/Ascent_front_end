import left from "@/assets/Left.png";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shadcn/ui/input-otp";
import fireIcon from "@/assets/Ascent_firicon.svg";
import { NewLoadingButton } from "@/components/custom/NewLoadingBtn";
import { Link } from "react-router-dom";
import { useState } from "react";
export function OtpPage() {
  const [otp, setOtp] = useState<string>("");
  otp;
  return (
    <main className="w-full pb-5">
      <section className="w-[85%] mx-auto h-full grid grid-cols-1 md:grid-cols-2 mt-3 gap-16">
        <div className="h-full flex flex-col items-center justify-center w-full ">
          <div className="space-y-4">
            <div className="w-full">
              <div className="flex gap-2 items-center">
                <img src={fireIcon} className="h-8" alt="" />
                <h1 className="font-semibold text-[18px]">
                  AS
                  <span className="text-primary">CE</span>
                  NT
                </h1>
              </div>
              <div className="w-full flex flex-col mt-8 ">
                <h1 className="text-2xl font-semibold">OTP Verification </h1>
                <p>Enter you one time password to create ascent account</p>
              </div>
            </div>
            <InputOTP
              maxLength={4}
              className="w-full  "
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup className="flex gap-4 ">
                <InputOTPSlot
                  index={0}
                  className="border dark:border-border border-textPrimary rounded-xl font-semibold text-5xl h-20 w-20 "
                />
                <InputOTPSlot
                  index={1}
                  className="border dark:border-border border-textPrimary rounded-xl font-semibold text-5xl h-20 w-20  "
                />
                <InputOTPSlot
                  index={2}
                  className="border dark:border-border border-textPrimary rounded-xl font-semibold text-5xl h-20 w-20  "
                />
                <InputOTPSlot
                  index={3}
                  className="border dark:border-border border-textPrimary rounded-xl font-semibold text-5xl h-20 w-20 "
                />
              </InputOTPGroup>
            </InputOTP>
            <div className="w-full mt-3 space-y-5">
              <NewLoadingButton
                loading={false}
                className="bg-primary/90 rounded-md h-12 "
              >
                Verify
              </NewLoadingButton>
              <NewLoadingButton
                loading={false}
                className=" rounded-md border-primary h-12 border bg-transparent text-blue-400"
              >
                Re send
              </NewLoadingButton>
            </div>
            <div className="grid grid-cols-5">
              <div className="flex justify-center mt-3 gap-2 col-span-3">
                <span>Already have an account</span>{" "}
                <Link to={"/login"} className="text-primary">
                  Sign in
                </Link>
              </div>
              <div className="col-span-2 flex justify-end items-end">5:00</div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <div className="w-full h-[600px] rounded-md overflow-hidden ">
            <img src={left} className="w-full h-full object-none" alt="" />
          </div>
        </div>
      </section>
    </main>
  );
}
