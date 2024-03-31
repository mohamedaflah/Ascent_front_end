import profileImage from "@/assets/IMG 3.png";
export function ChatIntro() {
  return (
    <div className="flex flex-col items-center ">
      <div className="w-full h-16 flex justify-center">
        <img
          src={profileImage}
          className="h-16 w-16 object-cover rounded-full"
          alt=""
        />
      </div>
      <div className="flex justify-center">
        <span className="maintxt text-lg font-semibold">Mohammed Aflah</span>
      </div>
      <div className="flex justify-center text-textPrimary">
        <span className="maintxt ">Recruiter at Nomad</span>
      </div>
      <div className="flex justify-center text-textPrimary">
        <span className="maintxt ">
          This is the very beginning of your direct message with Jan Mayer
        </span>
      </div>
    </div>
  );
}
