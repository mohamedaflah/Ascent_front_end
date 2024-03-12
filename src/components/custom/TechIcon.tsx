import React from 'react';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FaNodeJs as FaNodeJsAlt, // In case you want a different NodeJs icon
} from 'react-icons/fa';

interface TechnologyIconProps {
  technology: string;
}

const technologyIcons: Record<string, React.ReactElement> = {
  react: <FaReact />,
  nodejs: <FaNodeJs />,
  javascript: <FaJs />,
  html: <FaHtml5 />,
  css: <FaCss3 />,
  vuejs: <FaVuejs />,
  angular: <FaAngular />,
  java: <FaJava />,
  python: <FaPython />,
  php: <FaPhp />,
  swift: <FaSwift />,
  git: <FaGit />,
  docker: <FaDocker />,
  aws: <FaAws />,
  microsoft: <FaMicrosoft />,
  linux: <FaLinux />,
  sass: <FaSass />,
  bootstrap: <FaBootstrap />,
  wordpress: <FaWordpress />,
  android: <FaAndroid />,
  apple: <FaApple />,
  database: <FaDatabase />,
  node: <FaNode />,
  // Add more technologies and their respective icons as needed
};

const TechnologyIcon: React.FC<TechnologyIconProps> = ({ technology }) => {
  const icon = technologyIcons[technology.toLowerCase()];

  return icon || null;
};

export default TechnologyIcon;
