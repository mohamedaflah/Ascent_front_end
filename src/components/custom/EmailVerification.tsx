import { resendMail } from "@/redux/actions/userActions";
import { resetMessage } from "@/redux/reducers/userReducer";
import { AppDispatch, RootState } from "@/redux/store";
import { Button } from "@/shadcn/ui/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
// import AscentText from "./common/AscentText";

interface childProp {
  setVerificationState(state: boolean): void;
}
const EmailVerification = ({ setVerificationState }: childProp) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [verificationstate, setVerificationstate] = useState<boolean>(false);
  const [resetKey, setResetKey] = useState(0); // Add a key to trigger useEffect
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.userData);
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
          setVerificationState(false);
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
  }, [dispatch, setVerificationState, verificationstate, resetKey]); // Add resetKey as a dependency

  const handleResend = async () => {
    await dispatch(resendMail());

    localStorage.removeItem("emailVerificationStartTime"); // Remove the start time
    setResetKey((prevKey) => prevKey + 1); // Increment the resetKey to trigger useEffect
    setVerificationState(true); // This might need to trigger some additional logic for actual email resend which is not shown here
  };

  const formatTimeLeft = (): string => {
    if (timeLeft === null) return "00:00";
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <div className="w-full min-h-56  flex flex-col justify-between">
      <div>
        <p className="font-semibold text-4xl">Please Verify Your Email </p>
      </div>
      <div className="w-full ">
        <p className="font-semibold">
          An email has been sent to your email address. Please check your inbox
          and follow the instructions to complete the process. link expire
          within 5 minute
        </p>
        <div className="w-full flex justify-end">
          <span className=" right-4 -bottom-1 text-primary font-bold text-[14px] text-right">
            {timeLeft !== null && verificationstate
              ? formatTimeLeft()
              : "05:00"}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button className="w-full font-semibold">Go to home page</Button>
        {Number(formatTimeLeft().split(":")[0]) <= 3 && (
          <Button
            className={`w-full font-semibold ${
              loading && "pointer-events-none bg-blue-400"
            }`}
            onClick={handleResend}
          >
            {!loading ? "Resend Mail" : "loading.."}
          </Button>
        )}
      </div>
    </div>
  );
};
export default EmailVerification;
