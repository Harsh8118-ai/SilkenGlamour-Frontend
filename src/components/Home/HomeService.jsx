import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

export default function HomeService() {
  const [activeIndex, setActiveIndex] = useState(4); // Start with the middle card (index 4)

  const IMAGEKIT_BASE_URL = import.meta.env.VITE_IMAGEKIT_BASE_URL;

  const services = [
    { name: 'Nail Art', image: `${IMAGEKIT_BASE_URL}/Temp/Nail Art.webp`, link: '/service/nailart' },
    { name: 'Hair Care', image: `${IMAGEKIT_BASE_URL}/Temp/Haircare.webp`, link: '/service/haircare' },
    { name: 'Mani-Pedi', image: `${IMAGEKIT_BASE_URL}/Temp/Pedicure.webp`, link: '/service/mani-pedi' },
    { name: 'Waxing', image: `${IMAGEKIT_BASE_URL}/Temp/Waxing.webp`, link: '/service/waxing' },
    { name: 'Polish & Massage', image: `${IMAGEKIT_BASE_URL}/Temp/Massage.webp`, link: '/service/body-polishing' },
    { name: 'Threading & Wax', image: `${IMAGEKIT_BASE_URL}/Temp/Threading.webp`, link: '/service/threading' },
    { name: 'Bleach & D-Tan', image: `${IMAGEKIT_BASE_URL}/Temp/Bleach.webp`, link: '/service/bleach-dtan' },
    { name: 'Wedding Package', image: `${IMAGEKIT_BASE_URL}/Temp/Makeup.webp`, link: '/service/weddingpackage' },
    { name: 'Facial & Cleanup', image: `${IMAGEKIT_BASE_URL}/Temp/Facial.webp`, link: '/service/facial-cleanup' },
  ];

  const handleScroll = (direction) => {
    if (direction === 'left') {
      setActiveIndex((prevIndex) => (prevIndex === 0 ? services.length - 1 : prevIndex - 1));
    } else {
      setActiveIndex((prevIndex) => (prevIndex === services.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const getVisibleServices = () => {
    const totalServices = services.length;
    const visibleServices = [];
    for (let i = -2; i <= 2; i++) {
      visibleServices.push(services[(activeIndex + i + totalServices) % totalServices]);
    }
    return visibleServices;
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleScroll('right'),
    onSwipedRight: () => handleScroll('left'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Enable swipe gestures on desktop
    delta: 10, // Minimum swipe distance to trigger scroll
    onSwipeStart: () => console.log('Swipe Start'),
    onSwipeEnd: () => console.log('Swipe End'),
  });

  return (
    <div className="bg-transparent min-h-fit flex flex-col items-center">
      <h1 className="text-5xl font-bold text-gray-900 mt-10">
        Services We Offer
      </h1>
      <div
        {...swipeHandlers}
        className="flex items-center mt-5 shadow-sm shadow-BGColorYellow mb-5 px-10 rounded-xl"
      >
        <button
          className="text-white transition duration-100 ease-in-out"
          onClick={() => handleScroll('left')}
          aria-label="Scroll Left"
        >
          <div className="w-0 h-0 
            border-t-[50px] border-t-transparent
            border-r-[75px] border-r-gray-600
            border-b-[50px] border-b-transparent hover:scale-105">
          </div>
        </button>

        <div className="flex overflow-hidden p-10">
          {getVisibleServices().map((service, index) => (
            <Link to={service.link} key={service.name}>
              <div
                className={`flex flex-col items-center p-2 transform-gpu transition-all duration-500 ease-out ${
                  index === 2
                    ? 'scale-110 opacity-100 hover:scale-[1.15]'
                    : 'scale-100 opacity-50'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
                }}
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl object-cover transition-all duration-500 ease-out hover:shadow-md"
                />
                <p className="font-bold pt-1.5 text-gray-900">{service.name}</p>
              </div>
            </Link>
          ))}
        </div>

        <button
          className="transition duration-100 ease-in-out"
          onClick={() => handleScroll('right')}
          aria-label="Scroll Right"
        >
          <div className="w-0 h-0 
            border-t-[50px] border-t-transparent
            border-l-[75px] border-l-gray-600
            border-b-[50px] border-b-transparent hover:scale-105">
          </div>
        </button>
      </div>
    </div>
  );
}
