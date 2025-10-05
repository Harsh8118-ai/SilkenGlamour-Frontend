import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom'

export default function HeroSection() {
  const placeholders = [
    "Search for Facial", "Search for Waxing", "Search for Spa",
    "Search for Bleach", "Search for Body Polishing"
  ];

  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex === placeholders.length) {

        setIsResetting(true);
        setTimeout(() => {
          setCurrentIndex(0);
          setIsResetting(false);
        }, 50);
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [currentIndex]);


  const handleSearchClick = () => {
    navigate("/search-services");
  };

  return (
  <>
      <div className="relative h-full w-full overflow-x-hidden">
        {/* Curved Background */}
        <div
          className="absolute top-0 left-0 w-full h-[50%] bg-MainBGColorYellow"
          style={{ clipPath: 'ellipse(55% 100% at 50% 0%)' }}
        ></div>

        {/* Content */}
        <div className="relative h-full w-full text-center sm:pt-16 pt-5">
          {/* Search Bar */}
          <div
            className="sm:hidden relative flex items-center mx-auto bg-LightBGColor w-[80%] rounded-full px-4 shadow-md border border-pink-100 cursor-pointer transition hover:shadow-lg h-8 overflow-hidden mb-2"
            onClick={handleSearchClick}
          >
            <FaSearch className="text-BGColorYellow mr-2 z-10" />

            <div className="relative h-8 overflow-hidden flex-1">
              <div
                className={`absolute top-0 left-0 ${isResetting ? "" : "transition-all duration-500 ease-in-out"} will-change-transform`}
                style={{ transform: `translateY(-${currentIndex * 2.25}rem)` }}
              >
                {placeholders.concat(placeholders[0]).map((text, index) => (
                  <div
                    key={index}
                    className="h-9 flex items-center text-gray-500 text-sm font-bold"
                  >
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-black sm:mb-16  font-Logo">
            Welcome to<br /> Luxurious Home Salon
          </h1>
          <div className='flex items-center justify-center w-full gap-10'>

            <div className='mt-32 hidden sm:block'>
              <Link to="/service">
                <img
                  src={`${import.meta.env.VITE_IMAGEKIT_BASE_URL}/Home/Makeup Home.webp`}
                  alt="Makeup Home"
                  className="w-64 h-64 rounded-xl border-[6px] border-[000000] object-cover transform hover:opacity-80 hover:border-white "
                />
              </Link></div>

              <div className='mt-32 hidden sm:block'>
            <Link to="/service">
              <img
                src={`${import.meta.env.VITE_IMAGEKIT_BASE_URL}/Home/Home Main.jpg`}
                alt="Banner Mirror"
                width="320"
                height="384"
                className="h-72 w-60 sm:w-80 sm:h-96 rounded-t-full border-[2px] border-beige-50 object-cover transform hover:opacity-95 hover:border-white"
                decoding="async"
                fetchpriority="high"
              />
            </Link></div>



            <div className='mt-32 hidden sm:block'>
              <Link to="/service">
                <img
                  src={`${import.meta.env.VITE_IMAGEKIT_BASE_URL}/Home/Facial Home.webp`}
                  alt="Facial Home"
                  className="w-64 h-64 rounded-xl border-[6px] border-[000000] object-cover transform hover:opacity-80 hover:border-white "
                />
              </Link></div>
          </div>
        </div>
      </div>
    </>
  )
}
