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
import { getPendingCompanies } from "@/redux/actions/adminActions";

import { formatDateAndTime } from "@/util/formateDate";

import TimeAgo from "@/components/custom/LiveTime";

import { Company } from "@/types/oneCompanyType";
import { Edit, Trash } from "lucide-react";

function Categories() {
  const dispatch: AppDispatch = useDispatch();
  const { company } = useSelector((state: RootState) => state.admin);
  useEffect(() => {
    dispatch(getPendingCompanies()).then();
  }, [dispatch, company]);
  return (
    <main className="w-full h-full">
      <div className="container mx-auto py-10">
        <Table className="border p-2 rounded-md ">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">category name</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>added date </TableHead>
              <TableHead>added time </TableHead>
              <TableHead >last updated</TableHead>
              <TableHead ></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {company?.map((data:Company) => (
              <TableRow key={data._id}>
                <TableCell className="font-medium">{data.name}</TableCell>
                <TableCell className=" min-w-24">
                  <img src={data?.icon} className="h-10 w-10 object-cover rounded-full" alt="Logo" />
                </TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{formatDateAndTime((data.createdAt)  as unknown as string|number|Date).date}</TableCell>
                <TableCell>
                  {<TimeAgo key={data._id} timestamp={(data.createdAt) as unknown as string|number|Date } />}
                </TableCell>
                <TableCell className="text-right flex w-auto justify-end gap-3 ">
                  {/* <Button className="bg-green-500  h-9">
                    <ChangeCompanyApprovel
                      status="Accepted"
                      id={data._id as string}
                      key={data._id}
                    />
                  </Button>
                  <Button className="bg-red-400 h-9 relative">
                    <ChangeCompanyApprovel
                      status="Rejected"
                      id={data._id as string}
                      key={data._id}
                    />
                  </Button>
                  <Button className="h-9">
                    <CompanyViewModal companyData={data}/>
                  </Button> */}
                  <button>
                    <Edit/>
                  </button>
                  <button>
                    <Trash/>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
export default Categories;
