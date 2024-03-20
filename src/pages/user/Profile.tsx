import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export function MyProfile() {
  const {user} = useSelector((state: RootState) => state.userData);
  return (
    <main className="w-full ">
      <main
        className={`h-screen relative overflow-y-auto mt-5 flex flex-col ${
          !user ? "w-[90%] md:w-[85%]" : "w-[95%] md:w-[95%]"
        } mx-auto`}
      >
        <div className="h-16 w-full">
            <h1 className="maintxt text-2xl font-semibold">
                Basic Information
            </h1>
        </div>
      </main>
    </main>
  );
}
