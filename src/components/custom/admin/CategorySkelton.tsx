import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shadcn/ui/table";

export const CategorySkelton = () => (
  <main className="w-full h-full flex flex-col">
    <div className="container mx-auto py-10 flex flex-col gap-4">
      <div className="w-full h-10  flex justify-end">
        {/* AddCategoryModal component */}
        <div className="animate-pulse bg-backgroundAccent rounded-md w-36 h-10"></div>
      </div>
      <Table className=" p-6  rounded-md ">
        <TableHeader>
          <TableRow>
            {/* Table headers */}
            <TableHead className="w-[200px] animate-pulse bg-backgroundAccent rounded-md h-10"></TableHead>
            <TableHead className="animate-pulse bg-backgroundAccent rounded-md h-10"></TableHead>
            <TableHead className="animate-pulse bg-backgroundAccent rounded-md h-10"></TableHead>
            <TableHead className="animate-pulse bg-backgroundAccent rounded-md h-10"></TableHead>
            <TableHead className="animate-pulse bg-backgroundAccent rounded-md h-10"></TableHead>
            <TableHead className="animate-pulse bg-backgroundAccent rounded-md h-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Skeleton rows */}
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index} className="mt-2">
              <TableCell className="animate-pulse bg-backgroundAccent rounded-md h-10"></TableCell>
              <TableCell className="animate-pulse bg-backgroundAccent rounded-md h-10"></TableCell>
              <TableCell className="animate-pulse bg-backgroundAccent rounded-md h-10"></TableCell>
              <TableCell className="animate-pulse bg-backgroundAccent rounded-md h-10"></TableCell>
              <TableCell className="animate-pulse bg-backgroundAccent rounded-md h-10"></TableCell>
              <TableCell className="animate-pulse bg-backgroundAccent rounded-md h-10"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </main>
);
