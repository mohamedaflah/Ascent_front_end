
// import PDFToImageConverter from "@/components/custom/PdfViewer";
import { RootState } from "@/redux/store";
import { Applicant, Job } from "@/types/types.jobReducer";
import { useSelector } from "react-redux";

export function ApplicantResume() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { job }:{job:Applicant}=useSelector((state: RootState) => state.job) as unknown as Job | Applicant|any
  return (
    <main className="w-full h-full">
      <div className="h-screen overflow-hidden flex  justify-center ">
          <iframe src={job?.applicants?.resume} className="w-full h-full "></iframe>
          {/* <PDFToImageConverter pdfUrl={job?.applicants?.resume as string}/> */}
      </div>
    </main>
  );
}
