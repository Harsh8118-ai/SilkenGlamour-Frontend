import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS library for animations
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

const SocialMediaLinks = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const iconClasses =
    'transition duration-300 transform hover:scale-125 w-10 h-10';

  const phoneNumber = '9266037001';
  const message = "Hi Silken Glamour! I'd like to know more about your Services. Can you help me?";

  const handleClick = () => {
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* .......... MOBILE VIEW .......... */}
      <h2 className="text-center text-3xl font-bold text-black mt-10 sm:hidden">
        Connect With Us
      </h2>

      <div className="sm:hidden flex flex-row sm:flex-col justify-center space-x-8 sm:space-x-0 sm:space-y-4 pb-6 py-6 bg-gradient-to-t from-[#796855] via-[#baa48a] to-[#796855] ">

        {/* Instagram */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="bg-MainBGColorYellow rounded-full p-2 shadow-lg hover:bg-[#635a4f] hover:text-white"
        >
          <a href="https://www.instagram.com/silkenglamour" target="_blank" rel="noopener noreferrer">
            <FaInstagram className={`${iconClasses} w-6 h-6 sm:w-8 sm:h-8`} />
          </a>
        </div>

        {/* Facebook */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="bg-MainBGColorYellow rounded-full p-2 shadow-lg hover:bg-[#635a4f] hover:text-white"
        >
          <a href="https://www.facebook.com/profile.php?id=61565477906413&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className={`${iconClasses} w-6 h-6 sm:w-8 sm:h-8`} />
          </a>
        </div>

        {/* LinkedIn */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="bg-MainBGColorYellow rounded-full p-2 shadow-lg hover:bg-[#635a4f] hover:text-white"
        >
          <a href="https://www.linkedin.com/company/silkenglamour/" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className={`${iconClasses} w-6 h-6 sm:w-8 sm:h-8`} />
          </a>
        </div>

        {/* WhatsApp */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="bg-MainBGColorYellow rounded-full p-2 shadow-lg hover:bg-[#635a4f] hover:text-white"
        >
          <a href="https://wa.me/yournumber" target="_blank" onClick={handleClick} rel="noopener noreferrer">
            <FaWhatsapp className={`${iconClasses} w-6 h-6 sm:w-8 sm:h-8`} />
          </a>
        </div>

      </div>

      {/* .............. WEB VIEW ............... */}

      <div className="hidden sm:block fixed bottom-20 left-0 m-4 z-[999]">

        <div className="flex flex-row sm:flex-col space-x-4 sm:space-x-0 sm:space-y-4">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/silkenglamour"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-MainBGColorYellow rounded-full p-2 sm:p-3 shadow-lg hover:bg-[#635a4f] hover:text-white"
            data-aos="fade-up"
            data-aos-delay="100"

          >
            <FaInstagram className={`${iconClasses} w-6 h-6 sm:w-8 sm:h-8`} />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61565477906413&mibextid=LQQJ4d"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-MainBGColorYellow rounded-full p-2 sm:p-3 shadow-lg hover:bg-[#635a4f] hover:text-white"
            data-aos="fade-up"
            data-aos-delay="200"

          >
            <FaFacebookF className={`${iconClasses} w-6 h-6 sm:w-8 sm:h-8`} />
          </a>


          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/silkenglamour/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-MainBGColorYellow rounded-full p-2 sm:p-3 shadow-lg hover:bg-[#635a4f] hover:text-white"
            data-aos="fade-up"
            data-aos-delay="300"

          >
            <FaLinkedinIn className={`${iconClasses} w-6 h-6 sm:w-8 sm:h-8`} />
          </a>

        </div>

        {/* WhatsApp */}

        <div className="fixed bottom-14 sm:bottom-20 right-0 m-4 z-[999]">
          <div className="flex flex-row sm:flex-col space-x-4 sm:space-x-0 sm:space-y-4">
            <a
              href="https://wa.me/yournumber"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-MainBGColorYellow rounded-full p-4 sm:p-3 shadow-lg hover:bg-[#635a4f] hover:text-white animate-bounce"
              data-aos="fade-up"
            >
              <FaWhatsapp className={`${iconClasses} w-6 h-6 sm:w-8 sm:h-8`} />
            </a>
          </div></div>

      </div>
    </>
  );
};

export default SocialMediaLinks;
