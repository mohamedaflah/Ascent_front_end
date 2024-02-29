import Hero from "@/components/Landing_components/Hero";
import CompanyHighlites from "@/components/Landing_components/HiglihtesCompanies";


const LandingPage = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full bg-accenting">
        <section className="w-[90%] md:w-[85%] mx-auto relative ">
          <Hero />
        </section>
      </div>
        <CompanyHighlites />
    </div>
  );
};
export default LandingPage;
