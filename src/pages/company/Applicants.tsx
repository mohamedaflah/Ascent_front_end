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
  
  import {  getJobWithCompany } from "@/redux/actions/jobActions";
  import { Job } from "@/types/types.jobReducer";
  
import { Button } from "@/shadcn/ui/button";
  
  export function Applicants() {
    const dispatch: AppDispatch = useDispatch();
  
    const { user } = useSelector((state: RootState) => state.userData);
    const { jobs } = useSelector((state: RootState) => state.job);
    useEffect(() => {
      dispatch(getJobWithCompany(user._id));
    }, [dispatch, user]);
    return (
      <main className="w-full h-full">
        <div className="w-[95%] mx-auto py-10 flex flex-col gap-3">
            <div className="w-full h-16  justify-between items-center">
                <div className="flex items-center h-full">
                    <h1 className="maintxt text-2xl font-bold ">Total Applicants:{" "} 9</h1>
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
                  <TableCell>Full time</TableCell>
                  <TableCell className="relative">
                    DKdk
                  </TableCell>
                  
                  <TableCell>
                    <Button className="bg-transparent w-44 border border-primary text-primary rounded-none hover:bg-transparent">
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
  