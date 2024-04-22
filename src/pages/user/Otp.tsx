import left from "@/assets/Left.png";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shadcn/ui/input-otp";
import fireIcon from "@/assets/Ascent_firicon.svg";
import { NewLoadingButton } from "@/components/custom/NewLoadingBtn";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { resetMessage } from "@/redux/reducers/userReducer";
import { resendMail, verifyOtp } from "@/redux/actions/userActions";
export function OtpPage() {
  const [otp, setOtp] = useState<string>("");
  otp;
  const { loading } = useSelector((state: RootState) => state.userData);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [verificationstate, setVerificationstate] = useState<boolean>(false);
  const [resetKey, setResetKey] = useState(0); // Add a key to trigger useEffect
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const verificationState = localStorage.getItem("verificationState");

    if (verificationState) {
      setVerificationstate(
        JSON.parse(localStorage.getItem("verificationState") ?? "")
          .isVerificationState
      );
      let startTime = localStorage.getItem("emailVerificationStartTime");
      if (!startTime) {
        const currentTime = new Date().getTime();
        localStorage.setItem(
          "emailVerificationStartTime",
          currentTime.toString()
        );
        startTime = currentTime.toString();
      }

      const endTime = parseInt(startTime, 10) + 5 * 60 * 1000; // 5 minutes from start time

      const updateTimer = (endTime: number) => {
        const now = new Date().getTime();
        const timeDifference = endTime - now;

        if (timeDifference <= 0) {
          clearInterval(intervalId);
          localStorage.removeItem("emailVerificationStartTime");
          localStorage.removeItem("verificationState");
          toast.error("Verification link expired");
          setVerificationstate(false);
          dispatch(resetMessage());
          setTimeLeft(null);
        } else {
          setTimeLeft(timeDifference);
        }
      };

      const intervalId = setInterval(() => updateTimer(endTime), 1000);
      updateTimer(endTime); // Initial update to set the correct initial state

      return () => clearInterval(intervalId);
    }
  }, [dispatch, setVerificationstate, verificationstate, resetKey]); // Add resetKey as a dependency

  const handleResend = async () => {
    await dispatch(resendMail({ type: "otp" }));

    localStorage.removeItem("emailVerificationStartTime"); // Remove the start time
    setResetKey((prevKey) => prevKey + 1); // Increment the resetKey to trigger useEffect
    setVerificationstate(true); // This might need to trigger some additional logic for actual email resend which is not shown here
  };

  const formatTimeLeft = (): string => {
    if (timeLeft === null) return "00:00";
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };
  const handleVerify =async () => {
    if(otp.split("").length!==4){
      return toast.error("Please complete otp form")
    }
    await dispatch(verifyOtp({ otp: otp }));
  };

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
                loading={loading}
                className="bg-primary/90 rounded-md h-12 "
                onClick={handleVerify}
              >
                Verify
              </NewLoadingButton>
              <NewLoadingButton
                loading={loading}
                disabled={Number(formatTimeLeft()?.split(":")[0]) >= 3?true:false}
                onClick={handleResend}
                className={` rounded-md border-primary h-12 cursor-pointer border bg-transparent text-blue-400 ${
                  Number(formatTimeLeft()?.split(":")[0]) >= 3 &&
                  "cursor-not-allowed bg-primary-300"
                }`}
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
              <div className="col-span-2 flex justify-end items-end">
                {timeLeft !== null && verificationstate
                  ? formatTimeLeft()
                  : "05:00"}
              </div>
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
