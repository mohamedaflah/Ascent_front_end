import primaryLine from "../../assets/line.svg";
// import HeroImage from '../../assets/Hero.png'
import HeroImage from "../../assets/Group 138.png";
import { useEffect, useState } from "react";
import HeroImage2 from "../../assets/wepik-export-20240229041229QGFl-Photoroom.png-Photoroom.png";
const Hero = () => {
  const [isMobile, setIsMobile] = useState<boolean>();
  useEffect(() => {
    setIsMobile(window.innerWidth < 500);
  }, []);
  return (
    <section className="w-full flex flex-col-reverse items-start   md:grid grid-cols-2 mt-5  relative overflow-hidden">
      <section className=" h-96 flex flex-col gap-10">
        <div className="flex flex-col ">
          <div className="maintxt text-center text-6xl md:text-4xl lg:text-7xl font-bold leading-tight md:text-left">
            Get You Dream
            <br />
            job fast and build <br />
            <span className="text-primary">Your career</span>
          </div>
          <div className=" flex justify-center md:justify-start">
            <img src={primaryLine} alt="" />
          </div>
        </div>
        <div className="md:w-[100%] w-[70%]">
          <p className="text-textPrimary ">
            Discover your dream job at{" "}
            <span className="font-semibold">
              AS<span className="text-primary">CE</span>NT
            </span>{" "}
            where ambition meets startup innovation. Embark on a career journey
            that fulfills your passions. Welcome to your future.
          </p>
        </div>
      </section>
      <section className="  flex justify-end ">
        <div className="flex justify-end  relative">
          <img src={!isMobile ? HeroImage : HeroImage2} className="" alt="" />
        <div className="h-full w-[1px] bg-gradient-to-r from-indigo-500  flex flex-col justify-between items-center rounded-full" />
           <span className="flex h-2 w-2 bg-gradient-to-b from-primary  rounded-full translate-x-[-60%]"></span>
        </div>
      </section>
      
    </section>
  );
};
export default Hero;
