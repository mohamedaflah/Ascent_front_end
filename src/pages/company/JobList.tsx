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

import { getJobWithCompany } from "@/redux/actions/jobActions";
import { Job } from "@/types/types.jobReducer";
import { JobEdit } from "@/components/company/JobEdit";

export function JobListing() {
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.userData);
  const { jobs } = useSelector((state: RootState) => state.job);
  useEffect(() => {
    dispatch(getJobWithCompany(user._id));
  }, [dispatch, user]);
  return (
    <main className="w-full h-full">
      <div className="container mx-auto py-10">
        <Table className="border p-2 rounded-md ">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[240px]">Job title</TableHead>
              <TableHead className="w-[250px]">job added At</TableHead>
              <TableHead className="w-[250px]">Employment type</TableHead>
              <TableHead className="w-[180px]">Category</TableHead>
              <TableHead className="w-[250px]">Applications</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs?.map((job: Job) => (
              <TableRow key={job._id}>
                <TableCell className="font-medium ">{job.jobTitle}</TableCell>
                <TableCell className=" min-w-24 ">
                  <div className="flex gap-2">
                    {
                      formatDateAndTime(
                        job?.createdAt as unknown as string | number | Date
                      ).date
                    }
                    <TimeAgo
                      key={job._id}
                      timestamp={
                        job.createdAt as unknown as string | number | Date
                      }
                    />
                  </div>
                </TableCell>
                <TableCell>{job.employment}</TableCell>
                <TableCell>{job.category}</TableCell>
                <TableCell className="relative">
                  {job?.vacancies?.filled} Vacancies of{" "}
                  {job?.vacancies?.available}
                  <div className="bottom-2 left-1 absolute flex items-center justify-center w-32">
                    <div className="h-2 w-[82%] bg-green-700"></div>
                  </div>
                </TableCell>
                <TableCell className="text-right flex w-auto justify-start gap-2 ">
                  <div className=" h-8 rounded-full bg-green-700 flex items-center gap-2 justify-between p-3">
                    <span className="w-3 h-3 rounded-full bg-green-800"></span>
                    Active
                  </div>
                </TableCell>
                <TableCell>
                  <JobEdit jobData={job}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
