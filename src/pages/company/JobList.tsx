import { jobListColumns } from "@/components/Findjob/JoblistColumns";
import { DataTable } from "@/components/common/Table/components/data-table";
import { getJobWithCompany } from "@/redux/actions/jobActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export function JobListing() {
  const { user } = useSelector((state: RootState) => state.userData);
  const { jobs } = useSelector((state: RootState) => state.job);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobWithCompany(user._id));
  }, [dispatch, user]);
  return (
    <div className=" flex-1 flex-col space-y-8 p-8 md:flex"> {/*h-full removed*/}
      {jobs && (
        <DataTable data={jobs} columns={jobListColumns} from="Applicants" />
      )}
    </div>
  );
}
