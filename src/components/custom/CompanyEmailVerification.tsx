import { useEffect, useState } from "react";
import AscentText from "../common/AscentText";

interface ChildProp {
  setIsVerificationTime(state: boolean): void;
}
function CompanyEmailVerification({ setIsVerificationTime }: ChildProp) {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    const storedTimestamp = localStorage.getItem("verificationTimestamp");

    if (storedTimestamp) {
      const expiryTime = parseInt(storedTimestamp) + 5 * 60 * 1000; // 5 minutes in milliseconds
      const currentTime = new Date().getTime();
      const remainingTime = expiryTime - currentTime;

      if (remainingTime > 0) {
        startTimer(remainingTime);
      } else {
        // If time is already expired, remove the timestamp from local storage
        localStorage.removeItem("verificationTimestamp");
      }
    }
  }, []);

  const startTimer = (duration: number) => {
    const intervalId = setInterval(() => {
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

  return (
    <div className="w-full h-full absolute z-10 flex items-center justify-center">
      <div className="absolute w-full h-full bg-backgroundAccent opacity-55 -z-10"></div>
      <div className="w-[90%] sm:w-[60%] md:w-[40%] lg:w-[28%] rounded-lg bg-background flex flex-col p-5">
        <div className="w-full flex justify-center items-center h-28">
          <span className="font-semibold text-3xl">
            {" "}
            <AscentText /> Please verify Your email{" "}
          </span>
        </div>
        <div className="w-full ">
          <p className="font-semibold">
            An email has been sent to your email address. Please check your
            inbox and follow the instructions to complete the process. The link
            expires within 5 minutes.
          </p>
          <div className="w-full flex justify-end">
            <span className="right-4 -bottom-1 text-primary font-bold text-[14px] text-right">
              {timeLeft !== null ? timeLeft : "05:00"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyEmailVerification;
