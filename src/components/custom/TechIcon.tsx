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
  FaWindows,
  FaFigma, // In case you want a different NodeJs icon
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
  figma: <FaFigma className="text-[#F24E1E]" />,
  excel: <FaMicrosoft className="text-[#217346]" />, // Using a generic Microsoft icon, adjust color as needed
  libreoffice: <FaMicrosoft className="text-[#18A303]" />, // Using a generic Microsoft icon, adjust color to distinguish
  word: <FaMicrosoft className="text-[#2B579A]" />,
  spring: (
    <svg
      stroke="currentColor"
      fill="orange"
      stroke-width="0"
      role="img"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title></title>
      <path d="M21.822 1.248c-.338.806-.766 1.57-1.281 2.272A12.045 12.045 0 0012.03 0C5.431 0 0 5.43 0 12.031c0 3.293 1.35 6.445 3.737 8.717l.444.393a12.041 12.041 0 007.75 2.83c6.275 0 11.55-4.911 11.997-11.172.328-3.065-.572-6.941-2.106-11.55zM5.447 20.817c-.194.24-.49.38-.8.38a1.033 1.033 0 01-1.028-1.03c0-.564.465-1.03 1.028-1.03a1.032 1.032 0 01.8 1.68zm16.325-3.602c-2.969 3.954-9.31 2.622-13.375 2.812 0 0-.722.044-1.447.162 0 0 .272-.115.625-.25 2.853-.992 4.203-1.185 5.937-2.075 3.266-1.66 6.494-5.293 7.166-9.072-1.244 3.636-5.012 6.76-8.447 8.03-2.353.867-6.603 1.71-6.603 1.71l-.172-.09c-2.894-1.408-2.981-7.672 2.278-9.694 2.303-.886 4.507-.4 6.994-.992 2.656-.63 5.728-2.622 6.978-5.219 1.4 4.154 3.085 10.658.066 14.678z"></path>
    </svg>
  ),
  kubernetes: (
    <svg
      stroke="currentColor"
      fill="blue"
      stroke-width="0"
      role="img"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title></title>
      <path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 0 0 .699-.337l.01-.005.15-2.62a5.144 5.144 0 0 0-3.01 1.442l2.147 1.523.004-.002zm.76 2.75l.723.349.722-.347.18-.78-.5-.623h-.804l-.5.623.179.779zm1.5-3.095a.44.44 0 0 0 .7.336l.008.003 2.134-1.513a5.188 5.188 0 0 0-2.992-1.442l.148 2.615.002.001zm10.876 5.97l-5.773 7.181a1.6 1.6 0 0 1-1.248.594l-9.261.003a1.6 1.6 0 0 1-1.247-.596l-5.776-7.18a1.583 1.583 0 0 1-.307-1.34L2.1 5.573c.108-.47.425-.864.863-1.073L11.305.513a1.606 1.606 0 0 1 1.385 0l8.345 3.985c.438.209.755.604.863 1.073l2.062 8.955c.108.47-.005.963-.308 1.34zm-3.289-2.057c-.042-.01-.103-.026-.145-.034-.174-.033-.315-.025-.479-.038-.35-.037-.638-.067-.895-.148-.105-.04-.18-.165-.216-.216l-.201-.059a6.45 6.45 0 0 0-.105-2.332 6.465 6.465 0 0 0-.936-2.163c.052-.047.15-.133.177-.159.008-.09.001-.183.094-.282.197-.185.444-.338.743-.522.142-.084.273-.137.415-.242.032-.024.076-.062.11-.089.24-.191.295-.52.123-.736-.172-.216-.506-.236-.745-.045-.034.027-.08.062-.111.088-.134.116-.217.23-.33.35-.246.25-.45.458-.673.609-.097.056-.239.037-.303.033l-.19.135a6.545 6.545 0 0 0-4.146-2.003l-.012-.223c-.065-.062-.143-.115-.163-.25-.022-.268.015-.557.057-.905.023-.163.061-.298.068-.475.001-.04-.001-.099-.001-.142 0-.306-.224-.555-.5-.555-.275 0-.499.249-.499.555l.001.014c0 .041-.002.092 0 .128.006.177.044.312.067.475.042.348.078.637.056.906a.545.545 0 0 1-.162.258l-.012.211a6.424 6.424 0 0 0-4.166 2.003 8.373 8.373 0 0 1-.18-.128c-.09.012-.18.04-.297-.029-.223-.15-.427-.358-.673-.608-.113-.12-.195-.234-.329-.349-.03-.026-.077-.062-.111-.088a.594.594 0 0 0-.348-.132.481.481 0 0 0-.398.176c-.172.216-.117.546.123.737l.007.005.104.083c.142.105.272.159.414.242.299.185.546.338.743.522.076.082.09.226.1.288l.16.143a6.462 6.462 0 0 0-1.02 4.506l-.208.06c-.055.072-.133.184-.215.217-.257.081-.546.11-.895.147-.164.014-.305.006-.48.039-.037.007-.09.02-.133.03l-.004.002-.007.002c-.295.071-.484.342-.423.608.061.267.349.429.645.365l.007-.001.01-.003.129-.029c.17-.046.294-.113.448-.172.33-.118.604-.217.87-.256.112-.009.23.069.288.101l.217-.037a6.5 6.5 0 0 0 2.88 3.596l-.09.218c.033.084.069.199.044.282-.097.252-.263.517-.452.813-.091.136-.185.242-.268.399-.02.037-.045.095-.064.134-.128.275-.034.591.213.71.248.12.556-.007.69-.282v-.002c.02-.039.046-.09.062-.127.07-.162.094-.301.144-.458.132-.332.205-.68.387-.897.05-.06.13-.082.215-.105l.113-.205a6.453 6.453 0 0 0 4.609.012l.106.192c.086.028.18.042.256.155.136.232.229.507.342.84.05.156.074.295.145.457.016.037.043.09.062.129.133.276.442.402.69.282.247-.118.341-.435.213-.71-.02-.039-.045-.096-.065-.134-.083-.156-.177-.261-.268-.398-.19-.296-.346-.541-.443-.793-.04-.13.007-.21.038-.294-.018-.022-.059-.144-.083-.202a6.499 6.499 0 0 0 2.88-3.622c.064.01.176.03.213.038.075-.05.144-.114.28-.104.266.039.54.138.87.256.154.06.277.128.448.173.036.01.088.019.13.028l.009.003.007.001c.297.064.584-.098.645-.365.06-.266-.128-.537-.423-.608zM16.4 9.701l-1.95 1.746v.005a.44.44 0 0 0 .173.757l.003.01 2.526.728a5.199 5.199 0 0 0-.108-1.674A5.208 5.208 0 0 0 16.4 9.7zm-4.013 5.325a.437.437 0 0 0-.404-.232.44.44 0 0 0-.372.233h-.002l-1.268 2.292a5.164 5.164 0 0 0 3.326.003l-1.27-2.296h-.01zm1.888-1.293a.44.44 0 0 0-.27.036.44.44 0 0 0-.214.572l-.003.004 1.01 2.438a5.15 5.15 0 0 0 2.081-2.615l-2.6-.44-.004.005z"></path>
    </svg>
  ),
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
