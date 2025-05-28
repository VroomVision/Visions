import React, { useState, useRef, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  aspectRatio?: "square" | "video" | "auto";
  className?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  aspectRatio = "auto",
  className = "",
}) => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "video":
        return "aspect-video";
      default:
        return "h-60 md:h-96";
    }
  };

  const updateSliderPosition = (clientX: number) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newPosition = x * 100;
    setPosition(newPosition);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    updateSliderPosition(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Before and After Labels */}
      <div className="flex justify-between mb-2">
        <div className="px-3 py-1 bg-purple-900/50 backdrop-blur-md text-white font-bold rounded-full text-sm shadow-glow border border-white/10">
          Before
        </div>
        <div className="px-3 py-1 bg-purple-900/50 backdrop-blur-md text-white font-bold rounded-full text-sm shadow-glow border border-white/10">
          After
        </div>
      </div>
      
      {/* Slider Container */}
      <div 
        ref={sliderRef}
        className={`comparison-slider ${getAspectRatioClass()} rounded-lg shadow-glow ${className}`}
        style={{ "--position": `${position}%` } as React.CSSProperties}
      >
        <div 
          className="after w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${afterImage})` }}
        />
        <div 
          className="before w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${beforeImage})` }}
        />
        <div 
          className="handle" 
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        />
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
