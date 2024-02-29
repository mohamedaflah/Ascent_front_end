// for light mode
import darkUnsplash from "../../assets/dark_unsplash.svg";
import darkNotion from "../../assets/dark_notion.svg";
import darkDescript from "../../assets/dark_descript.svg";
import darkGramerly from "../../assets/dark_gramerly.svg";
import darkInter from "../../assets/dark_inter.svg";

// for dark mode
import whiteUnsplash from "../../assets/white_unsplash.svg";
import whiteNotion from "../../assets/white_notion.svg";
import whiteDescript from "../../assets/white_descript.svg";
import whiteGramerly from "../../assets/white_gramerly.svg";
import whiteInter from "../../assets/white_inter.svg";
import { useContext, useEffect, useState } from "react";
import { ThemeProviderContext, ThemeProviderState } from "@/shadcn/theme-provider";
const CompanyHighlites = () => {
    const context: ThemeProviderState = useContext(ThemeProviderContext);
  const [currentTheme, setCurrentTheme] = useState<
    "dark" | "light" | "system"
  >();

  useEffect(() => {
    const storedTheme: string | null = localStorage.getItem("vite-ui-theme");
    if (storedTheme != null) {
      setCurrentTheme(storedTheme as "dark" | "light" | "system");
    }
  }, [context]);
  return (
    <div className="w-[90%] md:w-[85%] mx-auto  flex flex-col gap-3">
      <div>
        <h1 className="text-lg font-semibold text-accentText">
          Companies We Contributed to Scaling.
        </h1>
      </div>
      <div className="flex flex-wrap justify-between gap-6 min-h-10 ">
        <div className="flex text-2xl font-semibold gap-1 items-center text-companyHigliteText">
          <img src={currentTheme=='light'?darkUnsplash:whiteUnsplash} alt="" className="h-7" />
          Unsplash
        </div>
        <div className="flex text-2xl font-semibold gap-1 items-center text-companyHigliteText">
          <img src={currentTheme=="light"?darkNotion:whiteNotion} alt="" className="h-7" />
          Notion
        </div>
        <div className="flex text-2xl font-semibold gap-1 items-center text-companyHigliteText">
          <img src={currentTheme=="light"?darkInter:whiteInter} alt="" className="h-7" />
          Intercome
        </div>
        <div className="flex text-2xl font-semibold gap-1 items-center text-companyHigliteText">
          <img src={currentTheme=="light"?darkDescript:whiteDescript} alt="" className="h-7" />
          descript
        </div>
        <div className="flex text-2xl font-semibold gap-1 items-center text-companyHigliteText">
          <img src={currentTheme=='light'?darkGramerly:whiteGramerly} alt="" className="h-7" />
          gramerly
        </div>
      </div>
    </div>
  );
};
export default CompanyHighlites;
