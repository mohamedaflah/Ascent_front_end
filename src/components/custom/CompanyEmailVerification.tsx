import { useEffect, useState } from "react";

import { LoaderSubmitButton } from "./LoaderButton";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shadcn/ui/input-otp";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getUser, verifyOtp } from "@/redux/actions/userActions";

interface ChildProp {
  setIsVerificationTime(state: boolean): void;
}

function CompanyEmailVerification({ setIsVerificationTime }: ChildProp) {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("companyVerification");

    if (storedData) {
      const { isVerificationState, expiration } = JSON.parse(storedData);

      if (isVerificationState) {
        const expiryTime = expiration as number; // Assuming expiration is a number
        const currentTime = new Date().getTime();
        const remainingTime = expiryTime - currentTime;

        if (remainingTime > 0) {
          startTimer(remainingTime);
        } else {
          // If time is already expired, remove the timestamp from local storage
          localStorage.removeItem("companyVerification");
          setIsVerificationTime(false);
        }
      }
    }
  }, []);

  const { loading } = useSelector((state: RootState) => state.userData);
  let intervalId: NodeJS.Timeout;

  const startTimer = (duration: number) => {
    intervalId = setInterval(() => {
      const minutes = Math.floor(duration / (60 * 1000));
      const seconds = Math.floor((duration % (60 * 1000)) / 1000);
      const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;

      setTimeLeft(formattedTime);

      if (duration <= 0) {
        clearInterval(intervalId);
        localStorage.removeItem("verificationTimestamp");
        setIsVerificationTime(false);
      } else {
        duration -= 1000;
      }
    }, 1000);
  };

  const [otp, setOtp] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  console.log("🚀 ~ CompanyEmailVerification ~ otp:", otp);
  return (
    <div className="w-full h-full absolute z-10 flex items-center justify-center">
      <div className="absolute w-full h-full bg-backgroundAccent opacity-55 -z-10"></div>
      <div className="w-[90%] sm:w-[60%] md:w-[40%] lg:w-[28%] rounded-lg bg-background flex flex-col p-5">
        <div className="w-full flex justify-center items-center h-28">
          <span className="font-semibold text-3xl"> Enter OTP </span>
        </div>
        <form
          className="w-full flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(verifyOtp({ otp: otp }));
            dispatch(getUser());
          }}
        >
          <div className="w-full flex justify-center">
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
          </div>
          <div className="w-full ">
            <div className="w-full flex justify-between px-4">
              <span
                className="font-semibold underline cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("companyVerification");
                  setIsVerificationTime(false);
                }}
              >
                Reset
              </span>
              <span className="right-4 -bottom-1 text-primary font-bold text-[14px] text-right ">
                {timeLeft !== null ? timeLeft : "05:00"}
              </span>
            </div>
          </div>
          <LoaderSubmitButton loading={loading}>Verify</LoaderSubmitButton>
        </form>
      </div>
    </div>
  );
}

export default CompanyEmailVerification;
