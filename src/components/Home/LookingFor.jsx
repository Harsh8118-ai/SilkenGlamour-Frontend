import React from "react";
import { Link } from "react-router-dom";

const LookingFor = () => {
  
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

  return (
    <div className="sm:hidden bg-MainBGColorYellow p-6 rounded-3xl">
      <h2 className="text-2xl text-black mb-4 font-bold">What are you looking for?</h2>

      <div className="grid grid-cols-3 gap-4 sm:gap-6">
        {services.map((service, index) => (
          <Link to={service.link} key={service.name}>
          <div key={index} className="flex flex-col items-center text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-white shadow-md overflow-hidden border border-pink-100">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm text-black font-semibold">{service.name}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LookingFor;