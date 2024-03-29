// import {  RiDashboard3Line } from "react-icons/ri"
import { BarChart, Bar,AreaChart,Area } from "recharts";
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
import { CalendarCheck } from "lucide-react";

function CompanyDashbord() {
  return (
    <main className="w-full h-screen flex items-center justify-center ">
      {/* <img src={dahsImg} className='w-96' alt="" /> */}
      <section className="w-[95%] mx-auto h-full py-3 space-y-5">
        <div className="w-full grid grid-cols-2  lg:grid-cols-6   gap-5">
          <div className="h-52  border flex flex-col">
            <div className="flex items-center gap-3 font-semibold px-4  h-20">
              <CalendarCheck className="w-5" /> Today Sheduled Interviews
            </div>
            <div className="col-span-3 flex items-center justify-center h-full  ">
              <AreaChart
                width={180}
                data={data}
                height={100}
                className="w-full h-full "
              >
                <Area type={"linear"} dataKey={"uv"} stroke="#8884d8" />
              </AreaChart>
            </div>
          </div>
          <div className="h-52  border"></div>
          <div className="h-52  border"></div>
          <div className="h-52  border"></div>
          <div className="h-52  border"></div>
          <div className="h-52  border"></div>
        </div>
        <div className="w-full h-[600px] grid grid-cols-1 lg:grid-cols-3 gap-5 bg-black">
          <div className="col-span-2 h-full border flex items-center justify-center ">
            <BarChart
              width={700}
              data={data}
              height={600}
              className="w-full h-full "
            >
              <Bar type={"linear"} dataKey={"uv"} stroke="#8884d8" />
            </BarChart>
          </div>
          <div className="h-full border grid grid-rows-2 gap-5">
            <div className="w-full border"></div>
            <div className="w-full border"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default CompanyDashbord;
