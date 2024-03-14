
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


import {  Trash } from "lucide-react";
import { AddCategoryModal } from "@/components/admin/AddCategoryModal";
import { getAllCategories } from "@/redux/actions/categoryAction";
import { Category } from "@/types/categoryReducer.type";
import { EditCategory } from "@/components/admin/EditCategoryModal";
// import { imageUrlToFileObject } from "@/util/imageToFIle";

function Categories() {
  const dispatch: AppDispatch = useDispatch();
  const {categories}=useSelector((state:RootState)=>state.category)
  useEffect(() => {
    dispatch(getAllCategories()).then();
    // localStorage.setItem("files",JSON.stringify(
    //   categories?.map(async(value)=>{
    //     return {id:value._id,image:imageUrlToFileObject(String(value.categoryImage))}
    //   })
    // ))
  }, [dispatch,categories]);
  return (
    <main className="w-full h-full flex flex-col">
      <div className="container mx-auto py-10 flex flex-col gap-4">
        <div className="w-full h-10  flex justify-end">
          <AddCategoryModal/>
        </div>
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
            {categories?.map((data:Category) => (
              <TableRow key={data._id}>
                <TableCell className="font-medium">{data.categoryname}</TableCell>
                <TableCell className=" min-w-24">
                  <img src={data?.categoryImage} className="h-10 w-10 object-cover rounded-full" alt="Logo" />
                </TableCell>
                <TableCell>{formatDateAndTime((data.createdAt)  as unknown as string|number|Date).date}</TableCell>
                <TableCell>{<TimeAgo key={data._id} timestamp={(data.createdAt) as unknown as string|number|Date } />}</TableCell>
                <TableCell>
                  {formatDateAndTime((data.updatedAt)  as unknown as string|number|Date).date}
                </TableCell>
                <TableCell className="text-right flex w-auto justify-end gap-3 ">
                <EditCategory CategoryData={data}/>
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
