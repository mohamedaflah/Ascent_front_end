import { useSelector } from "react-redux";
import { ZeroPercentProfileCompletionForm } from "./profileCompleteZero";
import { RootState } from "@/redux/store";

import { Company } from "@/types/oneCompanyType";
import { TwoPercentageCompletion } from "./profileCompleteTwo";
import { ThreePercentageCompletion } from "./profileCompleteThird";

function CompanyProfileCompletion() {
  const {user}:{user:Company}=useSelector((state:RootState)=>state.userData)
  return (
    <main className="w-full h-full  flex items-center justify-center absolute top-0 left-0 z-10 flex-col backdrop-blur-sm">
        {!user?.profileCompleted && (
          <>
            {user?.profileCompletionStatus === "1%" && <ZeroPercentProfileCompletionForm />}
            {user?.profileCompletionStatus === "2%" && <TwoPercentageCompletion />}
            {user?.profileCompletionStatus === "3%" && <ThreePercentageCompletion />}
          </>
        )}
</main>

  );
}
export default CompanyProfileCompletion