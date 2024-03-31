import defaultProfile from "@/assets/IMG 3.png";
interface ChildProp{
  className?:string
}
export function UserCard({className}:ChildProp) {
  return (
    <div className={`w-full h-20  p-3 ${className}`}>
      <div className="w-full h-full  grid grid-cols-10">
        <div className="col-span-2 h-full ">
          <div className="h-full w-14  overflow-hidden flex items-center justify-center">
            <img
              src={defaultProfile}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </div>
        <div className="col-span-8 flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="company_text text-[15px] flex gap-3 line-clamp-1 font-semibold items-center">
              Aflah
              <div className="w-[4px] h-[4px] rounded-full  bg-primary"></div>
            </span>
            <span className="maintxt text-textPrimary">12 mins ago</span>
          </div>
          <div className="maintxt w-full line-clamp-1 text-textPrimary/100">
            <span>We want to invite you for a quick interview kkkkkkkkkkkkkkkkkkkkkkk</span>
          </div>
        </div>
      </div>
    </div>
  );
}
