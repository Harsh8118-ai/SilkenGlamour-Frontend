import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

export default function HomeServiceMobile() {
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

  // Function to handle cyclic scrolling
  const handleScroll = (direction) => {
    if (direction === 'left') {
      setActiveIndex((prevIndex) => (prevIndex === 0 ? services.length - 1 : prevIndex - 1));
    } else {
      setActiveIndex((prevIndex) => (prevIndex === services.length - 1 ? 0 : prevIndex + 1));
    }
  };

  // Create a cyclic array of services (before and after the visible ones)
  const getVisibleServices = (cardsToShow) => {
    const totalServices = services.length;
    const visibleServices = [];

    for (let i = -Math.floor(cardsToShow / 2); i <= Math.floor(cardsToShow / 2); i++) {
      visibleServices.push(services[(activeIndex + i + totalServices) % totalServices]);
    }
    return visibleServices;
  };

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleScroll('right'),
    onSwipedRight: () => handleScroll('left'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Allow mouse swipe in addition to touch
  });

  return (
    <div className="bg-transparent min-h-fit flex flex-col items-center">
      <h6 className="text-3xl font-bold text-gray-900 mt-3">
        Services We Offer
      </h6>
      <div className="flex items-center mt-2 mb-2">
        

        {/* Carousel Container with Swipe Handlers */}
        <div
          {...swipeHandlers}
          className="flex overflow-hidden items-center justify-center sm:p-10 w-full"
        >
          {getVisibleServices(3).map((service, index) => (
            <Link to={service.link} key={service.name}>
              <div
                className={`flex flex-col items-center justify-center p-1 transform-gpu transition-all duration-500 ease-out ${
                  index === 1 ? 'scale-110 opacity-100 hover:scale-[1.15]' : 'scale-100 opacity-50'
                } mx-1`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)', // Smoother animation
                }}
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-24 h-22 lg:w-40 lg:h-40 rounded-xl object-cover transition-all duration-500 ease-out hover:shadow-md"
                />
                <p className="pt-1.5 font-semibold text-gray-900 text-center text-[8px]">{service.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
