import { getAllCategories } from "@/redux/actions/categoryAction";
import { AppDispatch, RootState } from "@/redux/store";
import { MoveRight } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function ExploreByCategory() {
  const { user } = useSelector((state: RootState) => state.userData);
  const { categories } = useSelector((state: RootState) => state.category);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  return (
    <main
      className={`${!user ? "w-[90%] md:w-[85%]" : "w-[95%] md:w-[95%]"} mx-auto space-y-10 mt-16`}
    >
      <div className="w-full h-16">
        <h1 className="maintxt text-5xl font-bold">
          Explore by <span className="text-primary">Category</span>{" "}
        </h1>
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10">
        {categories?.map((value) => (
          <div
            key={value._id}
            className="min-h-60 border flex items-center justify-center"
          >
            <div className="w-[80%] h-[80%] grid grid-rows-2 gap-2">
                <div className="w-full h-28">
                    <img src={value?.categoryImage} className="h-20" alt="" />
                </div>
                <div className="flex flex-col gap-5">
                    <h2 className="maintxt text-2xl font-semibold">{value.categoryname}</h2>
                    <h3 className="text-textPrimary text-lg flex gap-5">235 Job available <MoveRight/></h3>
                </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
