import React from 'react';
import { Link } from 'react-router-dom';

const CallToActionBanner = () => {
  return (
    <div className="bg-MainBGColorYellow text-white p-8 rounded-3xl shadow-lg text-center my-8  mx-auto w-fit">
      <h2 className="text-3xl font-bold mb-4">Book Your First Service & Get a Surprice Luxury Gift!</h2>
      <p className="mb-6">Hurry Up! Exclusive offer for the first 50 Members.</p>
      <Link
        to="/service"
        className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition animate-pulse"
      >
        Book Now
      </Link>
    </div>
  );
};

export default CallToActionBanner;
