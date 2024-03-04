import { resetMessage } from "@/redux/reducers/userReducer";
import { AppDispatch } from "@/redux/store";
import { Button } from "@/shadcn/ui/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
// import AscentText from "./common/AscentText";

interface childProp{
  setVerificationState(state:boolean):void
}
const EmailVerification =({setVerificationState}:childProp) => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [verificationstate,setVerificationstate]=useState<boolean>(false)
    const dispatch:AppDispatch=useDispatch()
    useEffect(() => {
      
        // Retrieve the start time from localStorage or set it if not present
        const verificationState=localStorage.getItem("verificationState")

        if(verificationState){
            setVerificationstate(JSON.parse(localStorage.getItem("verificationState") ?? "").isVerificationState)
            let startTime = localStorage.getItem('emailVerificationStartTime');
            const currentTime = new Date().getTime();
    
            if (!startTime) {
                localStorage.setItem('emailVerificationStartTime', currentTime.toString());
                startTime = currentTime.toString();
            }
    
            const endTime = parseInt(startTime, 10) + 5 * 60 * 1000; // 5 minutes from start time
            const intervalId = setInterval(() => updateTimer(endTime), 1000);
            const updateTimer = (endTime: number) => {
                const now = new Date().getTime();
                const timeDifference = endTime - now;
        
                if (timeDifference <= 0) {
                    clearInterval(intervalId);
                    localStorage.removeItem('emailVerificationStartTime'); // Clear start time on expiry
                    localStorage.removeItem("verificationState")
                    toast.error("Verification link expired")
                    setVerificationState(false)
                    dispatch(resetMessage())
                    setTimeLeft(null);
                } else {
                    setTimeLeft(timeDifference);
                }
            };
            updateTimer(endTime); // Initial update to set the correct initial state
    
            // Update the timer every second
    
            // Cleanup interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, []);


    const formatTimeLeft = (): string => {
        if (timeLeft === null) return '00:00';

        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
          {timeLeft !== null && verificationstate ? formatTimeLeft() : '05:00'}
          </span>
        </div>
      </div>
      <div>
        <Button className="w-full font-semibold">Go to home page</Button>
      </div>
    </div>
  );
};
export default EmailVerification;
