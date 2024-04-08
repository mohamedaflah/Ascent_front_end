import { DataTable } from "@/components/common/Table/components/data-table";
import { CandidateColumn } from "@/components/company/CandidateColumn";
import { fetchSelectedAndRejectedCandidates } from "@/redux/actions/jobActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export function Canidates() {
  const { user } = useSelector((state: RootState) => state.userData);
  const { candidate } = useSelector((state: RootState) => state.job);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSelectedAndRejectedCandidates(user._id));
  }, [dispatch, user]);
  return (
    <div className=" flex-1 flex-col space-y-8 p-8 md:flex">
      {" "}
      {/*h-full removed*/}
      {candidate && (
        <DataTable
          data={candidate}
          columns={CandidateColumn}
          from="Candidate"
        />
      )}
    </div>
  );
}
