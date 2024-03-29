import { ReactNode } from "react";

export function CustomSelectItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  value?: string;
}) {
  return (
    <div
      className={`hover:bg-backgroundAccent cursor-pointer relative flex w-full  select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
    >
      {children}
    </div>
  );
}
