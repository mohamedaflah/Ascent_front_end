import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../shadcn/ui/table";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

import { formatDateAndTime } from "@/util/formateDate";

import TimeAgo from "@/components/custom/LiveTime";

import { getApplicants } from "@/redux/actions/jobActions";
import { Applicant } from "@/types/types.jobReducer";

import { Button } from "@/shadcn/ui/button";

export function Applicants() {
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.userData);
  const { applicants } = useSelector((state: RootState) => state.job);
  useEffect(() => {
    dispatch(getApplicants({ companyId: String(user?._id), limit: 2 }));
  }, [dispatch, user]);
  return (
    <main className="w-full h-full">
      <div className="w-[95%] mx-auto py-10 flex flex-col gap-3">
        <div className="w-full h-16  justify-between items-center">
          <div className="flex items-center h-full">
            <h1 className="maintxt text-2xl font-bold ">Total Applicants: {applicants?.length}</h1>
          </div>
        </div>
        <Table className="border p-2 rounded-md ">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[240px]">Job title</TableHead>
              <TableHead className="w-[250px]">Applicant email</TableHead>
              <TableHead className="w-[250px]">Applied at</TableHead>
              <TableHead className="w-[180px]">Hiring stage</TableHead>
              <TableHead className="w-[250px]">Category</TableHead>
              <TableHead className="w-[250px]">Employment type</TableHead>

              <TableHead className="">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants?.map((job: Applicant) => (
              <TableRow key={job._id}>
                <TableCell className="font-medium ">{job.jobTitle}</TableCell>
                <TableCell className=" min-w-24 ">
                  {job.applicantDetails.email}
                </TableCell>
                <TableCell>
                  {
                    formatDateAndTime(
                      job?.applicants?.appliedDate as unknown as
                        | string
                        | number
                        | Date
                    ).date
                  }
                  {" "}
                  <TimeAgo
                    key={job._id}
                    timestamp={
                      job?.applicants?.appliedDate as unknown as
                        | string
                        | number
                        | Date
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="px-2 w-20 flex items-center justify-center rounded-3xl  h-10  bg-primary/5">
                  {job?.applicants?.hiringstage}
                  </div>
                </TableCell>
                <TableCell>{job?.category}</TableCell>
                <TableCell className="relative">{job?.employment}</TableCell>

                <TableCell>
                  <Button className="rounded-[2px] w-44 border border-primary text-primary  hover:bg-transparent bg-primary/5">
                    See Application
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}


//  Tan stack table



// import { columns } from "@/components/common/Table/components/columns";
// import { DataTable } from "@/components/common/Table/components/data-table";
// import { UserNav } from "@/components/common/Table/components/user-nav";
// import { getApplicants } from "@/redux/actions/jobActions";
// import { AppDispatch, RootState } from "@/redux/store";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// // Simulate a database read for tasks.

// export function Applicants() {
//   const dispatch: AppDispatch = useDispatch();
//   const { user } = useSelector((state: RootState) => state.userData);
//   const { applicants } = useSelector((state: RootState) => state.job);
//   useEffect(() => {
//     dispatch(getApplicants({ companyId: String(user?._id), limit: 2 }));
//   }, [dispatch, user]);

//   return (
//     <>
//       <div className="md:hidden">
//         <img
//           src="/examples/tasks-light.png"
//           alt="Playground"
//           className="block dark:hidden w-5 h-5"
//         />
//         <img
//           src="/examples/tasks-dark.png"
//           width={1280}
//           height={998}
//           alt="Playground"
//           className="hidden dark:block"
//         />
//       </div>
//       <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
//         <div className="flex items-center justify-between space-y-2">
//           <div>
//             <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
//             <p className="text-muted-foreground">
//               Here&apos;s a list of your tasks for this month!
//             </p>
//           </div>
//           <div className="flex items-center space-x-2">
//             <UserNav />
//           </div>
//         </div>
//         {applicants && <DataTable data={applicants} columns={columns} />}
//       </div>
//     </>
//   );
// }
