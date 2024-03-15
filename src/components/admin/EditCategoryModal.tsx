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
import { Edit3, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import uploadIcon from "../../assets/365.svg";
import { Textarea } from "@/shadcn/ui/textarea";
import toast from "react-hot-toast";
import { Button } from "@/shadcn/ui/button";
import ButtonLoading from "../custom/ButtonLoading";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { updateCategory } from "@/redux/actions/categoryAction";
import { useEffect, useRef, useState } from "react";
import { Category } from "@/types/categoryReducer.type";
import { imageUrlToFileObject } from "@/util/imageToFIle";

const fileSchema = z.custom<FileList>();
const categorySchema = z.object({
  categoryname: z.string().min(3).max(30),
  categoryDescription: z.string().min(5).max(200),
  categoryImage: fileSchema.nullable(),
});

interface ChildProp {
  CategoryData: Category;
}
export function EditCategory({ CategoryData }: ChildProp) {
  const [category, setCategory] = useState<Category>();
  useEffect(() => {
    setCategory(CategoryData);
  }, [CategoryData]);
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryname: "",
      categoryDescription: "",
      categoryImage: null,
    },
  });

  useEffect(() => {
    async function setFileObject() {
      const imageData = await imageUrlToFileObject(
        category?.categoryImage as string
      );
      form.setValue("categoryImage", imageData as never);
      form.setValue("categoryname", category?.categoryname as string);
      form.setValue(
        "categoryDescription",
        category?.categoryDescription as string
      );
    }
    setFileObject();
  }, [category?.categoryDescription, category?.categoryImage, category?.categoryname, form]);
  const dispatch: AppDispatch = useDispatch();
  const closeRef = useRef<HTMLButtonElement>(null);
  const categoryFormSubmit = async (values: z.infer<typeof categorySchema>) => {
    console.log(values);
    if (!values.categoryImage) {
      toast.error("Please upload Icon of category");
      return;
    }
    const actionResult = await dispatch(
      updateCategory({ id: String(category?._id), categoryData: values })
    );
    if (actionResult.type.endsWith("fulfilled")) {
      closeRef.current?.click();
    }
  };
  const { loading } = useSelector((state: RootState) => state.category);

  return (
    <AlertDialog>
      <AlertDialogTrigger className="rounded-md     h-full items-center font-semibold bg-transparent">
        <Edit3 />
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[90%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-[32%] overflow-hidden">
        <AlertDialogHeader className="grid grid-cols-1">
          <div className="flex justify-between items-center">
            <AlertDialogTitle>Update Category</AlertDialogTitle>
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
                    {form.watch("categoryImage") ? (
                      <>
                        {/* Render the image from categoryImage if available */}
                        <img
                          src={URL.createObjectURL(
                            form.watch("categoryImage") as never
                          )}
                          className="h-24"
                          alt=""
                        />
                      </>
                    ) : (
                      // Render a single image with uploadIcon if categoryImage is not available
                      <img src={uploadIcon} className="h-24" alt="" />
                    )}
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
