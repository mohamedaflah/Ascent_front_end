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

import ChangeCompanyApprovel from "@/components/Layouts/admin/ChangeCompanystatus";
import { formatDateAndTime } from "@/util/formateDate";

import TimeAgo from "@/components/custom/LiveTime";
import { CompanyViewModal } from "@/components/custom/CompanyViewModeal";
import { Company } from "@/types/oneCompanyType";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useSearchParams } from "react-router-dom";
function RequestAndApprovel() {
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const { company, page } = useSelector((state: RootState) => state.admin);
  
  const handleClick = (num: number, from: "nexts" | "others") => {
    const param = new URLSearchParams(searchParam);
    if (from === "nexts") {
      
      param.set("page", (Number(param.get("page")) + num) as unknown as string);
    } else {
      param.set("page", Number(1) as unknown as string);
    }
    setSearchParam(param);
  };
  useEffect(() => {
    dispatch(
      getPendingCompanies({
        page: Number(searchParam.get("page")),
        pageSize: Number(searchParam.get("pageSize")),
      })
      ).then();

  }, [dispatch, searchParam]);
  return (
    <main className="w-full h-full">
      <div className="container mx-auto py-10">
        <Table className=" p-2 rounded-md ">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Companyname</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>Company email</TableHead>
              <TableHead>Requested date</TableHead>
              <TableHead>Requested time</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {company?.map((data: Company) => (
              <TableRow key={data._id}>
                <TableCell className="font-medium">{data.name}</TableCell>
                <TableCell className=" min-w-24">
                  <img
                    src={data?.icon}
                    className="h-10 w-10 object-cover rounded-full"
                    alt="Logo"
                  />
                </TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>
                  {
                    formatDateAndTime(
                      data.createdAt as unknown as string | number | Date
                    ).date
                  }
                </TableCell>
                <TableCell>
                  {
                    <TimeAgo
                      key={data._id}
                      timestamp={
                        data.createdAt as unknown as string | number | Date
                      }
                    />
                  }
                </TableCell>
                <TableCell className="text-right flex w-auto justify-end gap-2 ">
                  <Button variant={"secondary"}>
                    <ChangeCompanyApprovel
                      status="Accepted"
                      id={data._id as string}
                      key={data._id}
                    />
                  </Button>
                  <Button variant={"ghost"} className="border">
                    <ChangeCompanyApprovel
                      status="Rejected"
                      id={data._id as string}
                      key={data._id}
                    />
                  </Button>
                  <Button className="h-9 px-3 " variant={"outline"}>
                    <CompanyViewModal companyData={data} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="w-full min-h-12  flex-col  flex items-center justify-center">
          <div className="flex items-center space-x-2 h-12">
            <Button
              variant="outline"
              className=" h-8 w-8 p-0 lg:flex"
              disabled={Number(searchParam.get("page")) === 1}
              onClick={() => handleClick(0, "others")}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              disabled={Number(searchParam.get("page")) === 1}
              onClick={() => handleClick(-1, "nexts")}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handleClick(1, "nexts")}
              disabled={Number(searchParam.get("page")) === page}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className=" h-8 w-8 p-0 lg:flex"
              disabled={Number(searchParam.get("page")) === page}
              onClick={() => handleClick(Number(page) - 1, "nexts")}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="w-full h-20"></div>
        </div>
      </div>
    </main>
  );
}
export default RequestAndApprovel;
