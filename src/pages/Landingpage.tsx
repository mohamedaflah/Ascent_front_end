import Hero from "@/components/Landing_components/Hero";
import CompanyHighlites from "@/components/Landing_components/HiglihtesCompanies";
import Header from "@/components/common/Header";

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full bg-accenting">
        <section className="w-[90%] md:w-[85%] mx-auto relative ">
          <Header />
          <Hero />
        </section>
      </div>
        <CompanyHighlites />
    </div>
  );
};
export default LandingPage;
