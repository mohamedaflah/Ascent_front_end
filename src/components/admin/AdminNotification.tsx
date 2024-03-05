import { RiNotification2Line } from "react-icons/ri";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../../shadcn/ui/menubar";
import { Button } from "@/shadcn/ui/button";

export function AdminNotification() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="p-0 border-none outline-none bg-transparent">
          <div className="relative cursor-pointer bg-background text-2xl">
            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-primary"></div>
            <RiNotification2Line />
          </div>
        </MenubarTrigger>
        <MenubarContent className="h-96 mr-5 mt-1 w-96  items-center overflow-y-auto space-y-2 p-2">
          <div className="w-[95%] h-28 bg-backgroundAccent rounded-md mx-auto flex flex-col p-2 line-clamp-1 justify-between border">
            <div className="flex flex-col">
              <span className="text-1xl font-bold">Google</span>
              <span className="">Google@gmail.com</span>
            </div>
            <div className="w-full h-10  flex justify-end gap-2 items-end">
              <Button className="py-0 text-white px-1 h-8 w-16 bg-green-500" variant={"outline"}>Accept</Button>
              <Button className="py-0 text-white px-1 h-8 w-16 bg-red-400" variant={"outline"}>Reject</Button>
              <Button className="py-0 text-white px-1 h-8 w-16 bg-primary" variant={"outline"}>view</Button>
            </div>
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
