import { Button } from "@/shadcn/ui/button";
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
import {
  changeApprovleStatus,
  getPendingCompanies,
} from "@/redux/actions/adminActions";
import { oneCompanyType } from "@/types/adminReducer";
import ChangeCompanyApprovel from "@/components/Layouts/admin/ChangeCompanystatus";

function RequestAndApprovel() {
  const handleAccept = async (status: "Accepted" | "Rejected" | "Pending",id:string) => {
    
    await dispatch(changeApprovleStatus({ status, description: "",id }));
  };
  const dispatch: AppDispatch = useDispatch();
  const { company } = useSelector((state: RootState) => state.admin);
  useEffect(() => {
    dispatch(getPendingCompanies()).then();
  }, [dispatch, company]);
  return (
    <main className="w-full h-full">
      <div className="container mx-auto py-10">
        <Table className="border p-2 rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Companyname</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>company email</TableHead>
              <TableHead>approvedDate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {company?.map((data: oneCompanyType) => (
              <TableRow key={data._id}>
                <TableCell className="font-medium">{data.name}</TableCell>
                <TableCell>
                  <img src={"https://www.google.com/favicon.ico"} alt="" />
                </TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{"23-09-2023"}</TableCell>
                <TableCell className="text-right flex w-auto justify-end gap-1">
                  <Button
                    className="bg-green-500  h-9"
                    onClick={() => handleAccept("Accepted",data._id)}
                  >
                    Accept
                  </Button>
                  <Button className="bg-red-400 h-9 relative ">
                    
                    <ChangeCompanyApprovel status="Rejected" id={data._id}  key={data._id}/>
                  </Button>
                  {/* <Button className="h-9">View</Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
export default RequestAndApprovel;
