import { ReactNode } from "react";

interface ChildProp {
  children: ReactNode;
}
export const MessageCount = ({ children }: ChildProp) => {
  if (!children) {
    return null;
  }
  return (
    <div className="absolute flex items-center justify-center  h-5 w-5 p-1 rounded-full bg-green-600 right-0 top-8 font-semibold">
      {children}
    </div>
  );
};
