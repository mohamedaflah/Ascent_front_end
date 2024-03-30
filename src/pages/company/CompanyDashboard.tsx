// import {  RiDashboard3Line } from "react-icons/ri"
import { Tooltip } from "primereact/tooltip";
import { BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 200, pv: 2400, amt: 2400 },
  { name: "Page C", uv: 340, pv: 2400, amt: 2400 },
  { name: "Page D", uv: 689, pv: 2400, amt: 2400 },
  { name: "Page E", uv: 238, pv: 2400, amt: 2400 },
  { name: "Page F", uv: 123, pv: 2400, amt: 2400 },
  { name: "Page G", uv: 453, pv: 2400, amt: 2400 },
  { name: "Page I", uv: 452, pv: 2400, amt: 2400 },
  { name: "Page H", uv: 232, pv: 2400, amt: 2400 },
];

function CompanyDashbord() {
  return (
    <main className="w-full h-screen flex items-center justify-center text-textPrimary ">
      {/* <img src={dahsImg} className='w-96' alt="" /> */}
      <section className="w-[95%] mx-auto h-full py-3 space-y-5">
        <div className="w-full grid grid-cols-2  lg:grid-cols-6   gap-5">
          <div className="h-36  border flex flex-col rounded-md px-3 py-3">
            <div className="flex items-start gap-3   h-20 ">
              Today Sheduled Interviews
            </div>
            <div className="col-span-3 flex items-center justify-between h-full ">
              <h1 className="text-6xl font-semibold">12</h1>
              <div>
             
              </div>
            </div>
          </div>
          <div className="h-36  border flex flex-col rounded-md px-3 py-3">
            <div className="flex items-start gap-3   h-20 ">
              New Candidate to review
            </div>
            <div className="col-span-3 flex items-center justify-between h-full ">
              <h1 className="text-6xl font-semibold">5</h1>
              <div>
          
              </div>
            </div>
          </div>
          <div className="h-36  border flex flex-col rounded-md px-3 py-3">
            <div className="flex items-start gap-3   h-20 ">
              Recieved Messages
            </div>
            <div className="col-span-3 flex items-center justify-between h-full ">
              <h1 className="text-6xl font-semibold">65</h1>
              <div>
               
              </div>
            </div>
          </div>
          <div className="h-36  border flex flex-col rounded-md px-3 py-3">
            <div className="flex items-start gap-3   h-20 ">
              Number of Active jobs
            </div>
            <div className="col-span-3 flex items-center justify-between h-full ">
              <h1 className="text-6xl font-semibold">24</h1>
              <div>
                
              </div>
            </div>
          </div>
          <div className="h-36  border flex flex-col rounded-md px-3 py-3">
            <div className="flex items-start gap-3   h-20 ">
              Total Application Recived
            </div>
            <div className="col-span-3 flex items-center justify-between h-full ">
              <h1 className="text-6xl font-semibold">24</h1>
              <div>
                
              </div>
            </div>
          </div>
          <div className="h-36  border flex flex-col rounded-md px-3 py-3">
            <div className="flex items-start gap-3   h-20 ">
              Total Selected Candidates
            </div>
            <div className="col-span-3 flex items-center justify-between h-full ">
              <h1 className="text-6xl font-semibold">24</h1>
              <div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[500px] grid grid-cols-1 lg:grid-cols-3 gap-5 ">
          <div className="col-span-2 h-full border flex items-end justify-start ">
            <BarChart
              width={740}
              data={data}
              height={420}
              className="w-full h-full "
            >
              <XAxis dataKey={"name"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={"uv"} stackId={"a"} fill="#7B61FF" />
              <Bar dataKey={"uv"} stackId={"a"} fill="#82ca9d" />
            </BarChart>
          </div>
          <div className="h-full  grid grid-rows-3 gap-5">
            <div className="w-full border flex flex-col relative p-5">
              {/* <div className="h-28 ">
                <div className="flex items-end gap-1">
                  <h1 className="text-5xl font-semibold">12</h1>{" "}
                  <span className="mb- text-lg">Job opens</span>
                </div>
              </div>
              <div className="h-full">
             
              </div> */}
              <div className="flex flex-col gap-2">
                <h1 className="maintxt text-2xl">Job Opens</h1>
                <div className="flex items-end gap-2">
                  <h1 className="text-6xl font-semibold">12</h1>
                  <span className="text-lg">Jobs opened</span>
                </div>
              </div>
            </div>
            <div className="w-full border flex flex-col row-span-2 p-5">
              <div className="w-full ">
                <h4 className="maintxt text-lg">Applicant Summary</h4>
              </div>
              <div className="w-full  flex items-end gap-2">
                <h1 className="text-7xl">67</h1>
                <h1 className="maintxt text-2xl text-textPrimary">
                  Applicants
                </h1>
              </div>
            </div>
            <div className="h-full">
              {/* <Pie
                data={{
                  labels: [
                    "Red",
                    "Blue",
                    "Yellow",
                    "Green",
                    "Purple",
                    "Orange",
                  ],
                  datasets: [
                    {
                      label: "# of Votes",
                      data: [12, 19, 3, 5, 2, 3],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              /> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default CompanyDashbord;
