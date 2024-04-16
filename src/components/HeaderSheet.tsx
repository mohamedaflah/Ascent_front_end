import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shadcn/ui/sheet";
import { RiMenu3Fill } from "react-icons/ri";


// type SheetSide = (typeof SHEET_SIDES)[number];

export function NavbarSheet() {
  return (
    <div className="">
        <Sheet key={"left"}>
          <SheetTrigger asChild className="p-0 w-auto  ">
            <RiMenu3Fill className="md:hidden" />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">s</div>
          </SheetContent>
        </Sheet>
    </div>
  );
}
