import { useTimeAgo } from "@/hooks/dateFormat";

interface TimeAgoProps {
  timestamp: string | number | Date;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp }) => {
  const timeAgo = useTimeAgo(timestamp);

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
