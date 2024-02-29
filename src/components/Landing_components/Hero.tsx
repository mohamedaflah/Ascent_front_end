import primaryLine from "../../assets/line.svg";
// import HeroImage from '../../assets/Hero.png'
import HeroImage from "../../assets/Hero_section.png";
const Hero = () => {
  return (
    <section className="w-full flex flex-col-reverse items-start   md:grid grid-cols-2 mt-5  relative overflow-hidden h-auto">
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
        <div className="md:w-[100%] w-[100%] lg:w-[70%]">
          <p className="text-textPrimary ">
            Explore your dream career at{" "}
            <span className="font-semibold">
              AS<span className="text-primary">CE</span>NT
            </span>
            , where ambition converges with startup innovation. Take the leap
            into a fulfilling career journey that aligns with your passions.
            Your future begins here. Welcome to {" "}
            <span className="font-semibold">
              AS<span className="text-primary">CE</span>NT
            </span>, where possibilities are
            limitless.
          </p>
        </div>
      </section>
      <section className="  flex justify-end relative">
        <div className="flex justify-end">
          <img src={HeroImage} className="" alt="" />
          <div className="h-full w-[1px] bg-gradient-to-r from-indigo-500  flex flex-col justify-between items-center rounded-full" />
          <span className="flex h-2 w-2 bg-gradient-to-b from-primary  rounded-full translate-x-[-60%]"></span>
        </div>
      </section>
    </section>
  );
};
export default Hero;
