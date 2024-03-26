// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../../shadcn/ui/table";
// import { useEffect, useState } from "react";
// import { AppDispatch, RootState } from "@/redux/store";
// import { useDispatch, useSelector } from "react-redux";

// import { formatDateAndTime } from "@/util/formateDate";

// import TimeAgo from "@/components/custom/LiveTime";

// import { AddCategoryModal } from "@/components/admin/AddCategoryModal";
// import { getAllCategories } from "@/redux/actions/categoryAction";
// import { Category } from "@/types/categoryReducer.type";
// import { EditCategory } from "@/components/admin/EditCategoryModal";
// import { imageUrlToFileObject } from "@/util/imageToFIle";

// // import { imageUrlToFileObject } from "@/util/imageToFIle";
// import { CategorySkelton } from "../../components/custom/admin/CategorySkelton";
// import { DeleteAlert } from "@/components/custom/admin/DeleteAlert";
// function Categories() {
//   const dispatch: AppDispatch = useDispatch();
//   const { categories,loading } = useSelector(
//     (state: RootState) => state.category
//   );
//   const [loadingstate,setLoadingState]=useState<boolean>(false)
//   useEffect(()=>{
//       setLoadingState(loading) 
//   },[])
//   useEffect(() => {
//     dispatch(getAllCategories()).then();
//   }, [dispatch]);
//   useEffect(() => {
//     async function setLocal() {
//       if (categories) {
//         const fileObjects = await Promise.all(
//           categories.map(async (value) => {
//             const imageFile = await imageUrlToFileObject(
//               String(value.categoryImage)
//             );
//             return { id: value._id, image: imageFile };
//           })
//         );
//         localStorage.setItem("files", JSON.stringify(fileObjects));
//       }
//     }
//     setLocal();
//   }, [categories]);
//   if(loadingstate){
//     return <CategorySkelton/>
//   }else{
//     return (
//       <main className="w-full h-full flex flex-col">
//         <div className="container mx-auto py-10 flex flex-col gap-4">
//           <div className="w-full h-10  flex justify-end">
//             <AddCategoryModal />
//           </div>
//           <Table className="border p-2 rounded-md ">
//             <TableHeader>
//               <TableRow>
                
//                 <TableHead className="w-[200px]">category name</TableHead>
//                 <TableHead>icon</TableHead>
//                 <TableHead>added date </TableHead>
//                 <TableHead>added time </TableHead>
//                 <TableHead>last updated</TableHead>
//                 <TableHead></TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {categories?.map((data: Category) => (
//                 <TableRow key={data._id}>
//                   <TableCell className="font-medium">
//                     {data.categoryname}
//                   </TableCell>
//                   <TableCell className=" min-w-24">
//                     <img
//                       src={data?.categoryImage}
//                       className="h-10 w-10 object-cover rounded-full"
//                       alt="Logo"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     {
//                       formatDateAndTime(
//                         data.createdAt as unknown as string | number | Date
//                       ).date
//                     }
//                   </TableCell>
//                   <TableCell>
//                     {
//                       <TimeAgo
//                         key={data._id}
//                         timestamp={
//                           data.createdAt as unknown as string | number | Date
//                         }
//                       />
//                     }
//                   </TableCell>
//                   <TableCell>
//                     {
//                       formatDateAndTime(
//                         data.updatedAt as unknown as string | number | Date
//                       ).date
//                     }
//                   </TableCell>
//                   <TableCell className="text-right flex w-auto justify-end gap-3 ">
//                     <EditCategory CategoryData={data} />
//                     <DeleteAlert status={data.status as boolean} id={data._id as string}/>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </main>
//     );
//   }
// }
// export default Categories;

import { DataTable } from "@/components/common/Table/components/data-table";

import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryColumn } from "./Table/CategoryColumn";
import { getAllCategories } from "@/redux/actions/categoryAction";
export default function Categories() {

  const { categories } = useSelector((state: RootState) => state.category);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {categories && (
        <DataTable data={categories} columns={CategoryColumn} from="Categories" />
      )}
    </div>
  );
}
