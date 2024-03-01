import AscentText from "@/components/common/AscentText";
import { Button } from "@/shadcn/ui/button";
import { useNavigate } from "react-router-dom";

const ValidateEmail = () => {
    const navigate=useNavigate()
    const handleDirection=()=>{
        navigate('/')
    }
  return (

      <div className="min-h-screen flex items-center justify-center border-t">
        <div className="p-8 rounded-lg shadow-lg max-w-lg w-full bg-backgroundAccent border flex flex-col gap-5">
          <div className="text-4xl">
            <AscentText />
          </div>
          <h1 className="text-2xl font-semibold mb-4">
            Please Verify You Email!
          </h1>
          <p className="text-foregroundAccent mb-6">
            An email has been sent to your email address. Please check your
            inbox and follow the instructions to complete the process.
          </p>

          <div className="flex items-center justify-between">
            {/* <BackToHome /> */}
            <Button className="w-full font-semibold" onClick={handleDirection}>Back to Home</Button>
          </div>
        </div>
      </div>

  );
};
export default ValidateEmail;
