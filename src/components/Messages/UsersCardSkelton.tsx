export const UserCardSkelton = () => {
  return (
    <div className="w-full h-16 bg-backgroundAccent  rounded-sm my-2">
      <div className="grid grid-cols-10 h-full">
        {/* Avatar skeleton */}
        <div className="col-span-2 sm:col-span-3 md:col-span-2 flex justify-center items-center">
          <div className="w-14 h-14 bg-background rounded-full animate-pulse"></div>
        </div>
        {/* Text skeletons */}
        <div className="col-span-8 sm:col-span-7 md:col-span-8 px-4 flex flex-col justify-center gap-2">
          <div className="h-4 bg-background rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-background rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    </div>
  );
};
