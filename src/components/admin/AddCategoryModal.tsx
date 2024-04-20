import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/ui/form";
import { Input } from "@/shadcn/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import uploadIcon from "../../assets/365.svg";
import { Textarea } from "@/shadcn/ui/textarea";
import toast from "react-hot-toast";
import { Button } from "@/shadcn/ui/button";
import ButtonLoading from "../custom/ButtonLoading";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addCategory } from "@/redux/actions/categoryAction";
import {  useRef } from "react";

const fileSchema = z.custom<FileList>();
const categorySchema = z.object({
  categoryname: z.string().min(3).max(30),
  categoryDescription: z.string().min(5).max(200),
  categoryImage: fileSchema.nullable(),
});

export function AddCategoryModal() {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryname: "",
      categoryDescription: "",
      categoryImage: null,
    },
  });
  const dispatch: AppDispatch = useDispatch();
  const closeRef = useRef<HTMLButtonElement>(null);
  const categoryFormSubmit = async (values: z.infer<typeof categorySchema>) => {
    
    if (!values.categoryImage) {
      toast.error("Please upload Icon of category");
      return;
    }
    const actionResult = await dispatch(addCategory(values));
    if(actionResult.type.endsWith("fulfilled")){
        closeRef.current?.click()
    }
  };
  const { loading } = useSelector((state: RootState) => state.category);
  
  
  return (
    <AlertDialog>
      <AlertDialogTrigger className=" px-3 rounded-md bg-primary text-white   h-full items-center  text-sm ">
        Add Category 
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[90%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-[32%] overflow-hidden">
        <AlertDialogHeader className="grid grid-cols-1">
          <div className="flex justify-between items-center">
            <AlertDialogTitle>Add category</AlertDialogTitle>
            <AlertDialogCancel
              className="border-none p-0 w-5 hover:bg-transparent"
              ref={closeRef}
            >
              <X />
            </AlertDialogCancel>
          </div>
          <div className="w-full">
            <Form {...form}>
              <form
                className="w-full flex flex-col gap-3"
                onSubmit={form.handleSubmit(categoryFormSubmit)}
              >
                <FormField
                  control={form.control}
                  name="categoryname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Category name
                      </FormLabel>
                      <FormControl className="">
                        <Input placeholder="exapmle:- Engineering" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full flex  min-h-40 border items-center px-3 gap-3 rounded-md ">
                  <input
                    type="file"
                    className="hidden"
                    id="ico"
                    onChange={(e) => {
                      const file = e?.target?.files?.[0];
                      form.setValue("categoryImage", file as never);
                    }}
                  />
                  <label
                    htmlFor="ico"
                    className={`h-32 bg-background w-36 cursor-pointer border border-gray-400 rounded-md border-dashed flex items-center justify-center p-2`}
                  >
                    <img
                      src={
                        form.watch("categoryImage")
                          ? URL.createObjectURL(
                              form.watch("categoryImage") as never
                            )
                          : uploadIcon
                      }
                      className="h-24"
                      alt=""
                    />
                  </label>
                  <div className="w-full h-32">
                    <FormField
                      control={form.control}
                      name="categoryDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            {/* <Input placeholder="Enter description" {...field} /> */}
                            <Textarea
                              className="h-32 w-full resize-none "
                              placeholder="Enter description"
                              {...field}
                            ></Textarea>
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage className="py-3 " />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full h-10 flex justify-end">
                  <Button
                    className={`w-36 font-semibold ${
                      loading && "pointer-events-none"
                    }`}
                    type="submit"
                  >
                    {!loading ? "Submit" : <ButtonLoading />}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
