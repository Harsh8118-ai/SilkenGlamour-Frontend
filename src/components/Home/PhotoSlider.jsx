import React, { useEffect, useState, useRef } from "react";

const photos = [
  "/Yes Madam/1.webp",
  "/Yes Madam/2.webp",
  "/Yes Madam/3.webp",
  "/Yes Madam/4.webp",
  "/Yes Madam/5.webp",
  "/Yes Madam/6.webp",
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const sliderRef = useRef(null);

  const totalSlides = photos.length;
  const duration = 2000; // 5 seconds for each slide

  // Handle automatic sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
      );
      setProgress(0); // Reset progress bar
    }, duration);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Handle progress bar increment
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        }
        return prevProgress;
      });
    }, duration / 100); // Adjusting the progress speed

    return () => clearInterval(progressInterval);
  }, [currentIndex]);

  // Scroll to the current index when it changes (auto-slide or touch)
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.clientWidth * currentIndex,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  // Handle manual scroll (touch/drag)
  const handleScroll = () => {
    if (sliderRef.current) {
      const newIndex = Math.round(
        sliderRef.current.scrollLeft / sliderRef.current.clientWidth
      );
      setCurrentIndex(newIndex);
    }
  };

  return (
    <>
    <div className="max-w-xl mx-auto w-[358px] h-auto rounded-lg">
      {/* Photo slider */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        onDragCapture={handleScroll}
        className="relative flex overflow-x-scroll snap-x snap-mandatory w-full mb-2 p-2 rounded-lg scrollbar-hide bg-BGColorYellow"
      >
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Slide ${index}`}
            className="snap-center w-full h-full object-cover flex-shrink-0 mr-2 rounded-lg"
          />
        ))}
      </div>

      {/* Progress bar */}
       <div className="w-full h-2 bg-gray-300 rounded">
        <div
          style={{ width: `${progress}%` }}
          className="h-full rounded bg-[#CBB59F] transition-all duration-100"
        ></div>
      </div> 
    </div>
    </>
  );
};

export default Slider;
