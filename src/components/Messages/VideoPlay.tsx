import { Pause, Play } from "lucide-react";
import React, { useRef, useState } from "react";

interface VideoPlayerProps {
  src: string; // Define the type for the src prop,
  className?: string;
  controls?:boolean
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, className,controls }) => {
  const videoRef = useRef<HTMLVideoElement>(null); // Type defined for HTMLVideoElement reference
  const [playVideo, setPlayVideo] = useState<boolean>(false); // Type defined for useState

  const handleVideoPlayPause = () => {
    if (playVideo) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setPlayVideo(!playVideo);
  };

  return (
    <>
      <video ref={videoRef} src={src} className={className} controls={controls} />
      <div
        onClick={handleVideoPlayPause}
        className="flex items-center justify-center h-10 w-10 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 bg-background cursor-pointer rounded-full "
      >
        {playVideo ? <Pause className="w-5" /> : <Play className="w-5" />}
      </div>

    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const VideoPlay=React.memo(VideoPlayer);
