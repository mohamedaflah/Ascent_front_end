import resume from "../../assets/MERN _STACK_DEVELOPER_SAFEER_MON_EP.pdf";
export function ApplicantResume() {
  return (
    <main className="w-full h-full">
      <div className="h-screen">
          <iframe src={resume} className="w-full h-full"></iframe>
      </div>
    </main>
  );
}
