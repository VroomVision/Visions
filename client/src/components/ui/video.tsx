import React from "react";

interface VideoPlayerProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  controls = false,
  poster,
}) => {
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <video
        className="w-full h-full object-cover"
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        controls={controls}
        poster={poster}
      >
        <source src={src} type="video/webm" />
        <source src={src.replace(".webm", ".mp4")} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;