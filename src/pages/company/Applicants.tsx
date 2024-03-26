//  Tan stack table
import { columns } from "@/components/common/Table/components/columns";
import { DataTable } from "@/components/common/Table/components/data-table";
// import { UserNav } from "@/components/common/Table/components/user-nav";
import { getApplicants } from "@/redux/actions/jobActions";
import { AppDispatch, RootState } from "@/redux/store";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Simulate a database read for tasks.

export function Applicants() {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userData);
  const { applicants } = useSelector((state: RootState) => state.job);
  useEffect(() => {
    dispatch(getApplicants({ companyId: String(user?._id), limit: 2 }));
  }, [dispatch, user]);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Applicants</h2>
          </div>
          {/* <div className="flex items-center space-x-2">
            <UserNav />
          </div> */}
        </div>
        {applicants && <DataTable data={applicants} columns={columns} from="Applicants" />}
      </div>
    </>
  );
}
