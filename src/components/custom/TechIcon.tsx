import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaHtml5,
  FaCss3,
  FaVuejs,
  FaAngular,
  FaJava,
  FaPython,
  FaPhp,
  FaSwift,
  FaGit,
  FaDocker,
  FaAws,
  FaMicrosoft,
  FaLinux,
  FaSass,
  FaBootstrap,
  FaWordpress,
  FaAndroid,
  FaApple,
  FaDatabase,
  FaNode,
  FaCogs,
  FaCode,
  FaWindows, // In case you want a different NodeJs icon
} from "react-icons/fa";

interface TechnologyIconProps {
  technology: string;
}

const technologyIcons: Record<string, React.ReactElement> = {
  react: <FaReact className="text-[#61DAFB]" />,
  nodejs: <FaNodeJs className="text-[#339933]" />,
  javascript: <FaJs className="text-[#F7DF1E]" />,
  html: <FaHtml5 className="text-[#E34F26]" />,
  css: <FaCss3 className="text-[#1572B6]" />,
  vuejs: <FaVuejs className="text-[#4FC08D]" />,
  angular: <FaAngular className="text-[#DD0031]" />,
  java: <FaJava className="text-[#007396]" />,
  python: <FaPython className="text-[#3776AB]" />,
  php: <FaPhp className="text-[#777BB4]" />,
  swift: <FaSwift className="text-[#F05138]" />,
  git: <FaGit className="text-[#F05032]" />,
  docker: <FaDocker className="text-[#2496ED]" />,
  aws: <FaAws className="text-[#FF9900]" />,
  microsoft: <FaMicrosoft className="text-[#0078D4]" />,
  linux: <FaLinux className="text-[#FCC624]" />,
  sass: <FaSass className="text-[#CC6699]" />,
  bootstrap: <FaBootstrap className="text-[#7952B3]" />,
  wordpress: <FaWordpress className="text-[#21759B]" />,
  android: <FaAndroid className="text-[#3DDC84]" />,
  apple: <FaApple className="text-[#A2AAAD]" />,
  database: <FaDatabase className="text-[#00648B]" />,
  node: <FaNode className="text-[#339933]" />, //
  c: <FaCogs className="text-[#A8B9CC]" />, // C doesn't have a "brand color", using a common color for C icons
  Csharp: <FaCode className="text-[#178600]" />, // Using a common representation for C#
  dotnet: <FaWindows className="text-[#512BD4]" />, // .NET often associated with Windows, using Windows brand color
  cpp: <FaCogs className="text-[#00599C]" />,
};

const TechnologyIcon: React.FC<TechnologyIconProps> = ({ technology }) => {
  const lowercasedTech = technology.toLowerCase();

  // Check for an exact match
  const exactMatch = technologyIcons[lowercasedTech];
  if (exactMatch) {
    return exactMatch;
  }

  // Check for partial matches (60% similarity)
  const partialMatch = Object.entries(technologyIcons).find(([key]) => {
    const similarity =
      key.toLowerCase().includes(lowercasedTech) ||
      lowercasedTech.includes(key.toLowerCase());

    return similarity && key.length * 0.6 <= lowercasedTech.length;
  });

  return partialMatch ? partialMatch[1] : null;
};

export default TechnologyIcon;
