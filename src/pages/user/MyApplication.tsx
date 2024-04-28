import { DataTable } from "@/components/common/Table/components/data-table";
import { MyapplicatonColumn } from "@/components/users/MyapplicationColumn";
import { getMyApplication } from "@/redux/actions/jobActions";

import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export function MyApplication() {
  const { user } = useSelector((state: RootState) => state.userData);
  const { applications } = useSelector((state: RootState) => state.job);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(getMyApplication(user?._id));
    }
  }, [dispatch, user]);
  return (
    <div className=" flex-1 flex-col space-y-8 p-8 md:flex">
      {" "}
      {/*h-full removed*/}
      {applications && (
        <DataTable data={applications} columns={MyapplicatonColumn} from="Applicants" />
      )}
    </div>
  );
}
