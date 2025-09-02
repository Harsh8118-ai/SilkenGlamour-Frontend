import { React, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { FaWhatsapp, } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Footer() {

    const phoneNumber = '9266037001';
    const message = "Hi Silken Glamour! I'd like to know more about your Services. Can you help me?";

    const handleClick = () => {
        const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    useEffect(() => {
        AOS.init({ duration: 1000, once: true, });
    }, []);

    const iconClasses =
        'transition duration-300 transform hover:scale-125 w-10 h-10';

    return (
        <>
            <div>

                <div className="fixed bottom-14 sm:bottom-20 right-0 m-4 z-[998]">

                    <div className="flex flex-row sm:flex-col space-x-4 sm:space-x-0 sm:space-y-4">

                        {/* WhatsApp */}
                        <a
                            onClick={handleClick}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-BGColorYellow rounded-full p-2 sm:p-3 shadow-lg hover:bg-[#635a4f] hover:text-green-500 animate-bounce"
                            data-aos="fade-up"
                        >
                            <FaWhatsapp className={`${iconClasses} w-6 h-6 sm:w-8 sm:h-8`} />
                        </a>
                    </div>
                </div>

            </div>

            {/*........................................ ICON BAR ........................................*/}



            <div className="flex justify-center">
                <div className="sm:hidden shadow fixed py-1 px-5 z-50 bottom-1.5 w-fit bg-gradient-to-r from-[#2E2117] via-[#796855] to-[#2E2117] rounded-full">
                    <ul className="flex justify-center gap-8 pt-1 bg-transparent">
                        <li className="flex flex-col items-center h-auto pl-2 w-auto">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `duration-200 flex flex-col items-center ${isActive ? "text-gray-900" : "text-MainBGColorYellow"} font-bold`
                                }
                            >
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="24" height="24">
                                    <path d="M 32 3 L 1 28 L 1.4921875 28.654297 C 2.8591875 30.477297 5.4694688 30.791703 7.2304688 29.345703 L 32 9 L 56.769531 29.345703 C 58.530531 30.791703 61.140812 30.477297 62.507812 28.654297 L 63 28 L 54 20.742188 L 54 8 L 45 8 L 45 13.484375 L 32 3 z M 32 13 L 8 32 L 8 56 L 56 56 L 56 35 L 32 13 z M 26 34 L 38 34 L 38 52 L 26 52 L 26 34 z"></path>
                                </svg>
                                <span className="text-sm">Home</span>
                            </NavLink>
                        </li>

                        <li className="flex flex-col items-center h-auto w-auto">
                            <NavLink
                                to="/service"
                                className={({ isActive }) =>
                                    `duration-200 flex flex-col items-center ${isActive ? "text-gray-900" : "text-MainBGColorYellow"} font-bold`
                                }
                            >
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
                                    <path d="M505.329 324.301c-12.496-7.39-28.143-8.585-42.107-2.392 0 0-.054.056-.272.109-.054.054-.163.054-.218.109.054 0 0 0-.163.054l-.109.054-.054.054c-.217.054-.435.163-.706.272-5.107 2.281-25.047 11.138-92.852 41.129v-.109c-15.213-21.569-41.998-5.651-78.291-2.5-56.287-28.849-109.423-57.101-167.72-55.309v115.454h9.671l121.05 47.812c19.777 7.823 42.215 5.814 60.362-5.324l191.517-118.17C513.315 340.654 513.37 329.027 505.329 324.301zM100.649 291.555h-9.716v-7.268c0-5.681-4.604-10.285-10.285-10.285H10.932c-5.681 0-10.285 4.604-10.285 10.285v164.742c0 5.681 4.604 10.285 10.285 10.285h69.716c5.681 0 10.285-4.604 10.285-10.285v-7.268h9.716c6.263 0 11.34-5.078 11.34-11.341V302.896C111.99 296.633 106.912 291.555 100.649 291.555zM59.471 443.539c-6.99 0-12.716-5.725-12.716-12.715 0-6.989 5.726-12.715 12.716-12.715 6.989 0 12.715 5.726 12.715 12.715C72.186 437.814 66.46 443.539 59.471 443.539z"></path>
                                    <path d="M193.495,195.43l21.725,2.498c2.607,11.297,7.06,22.16,13.252,31.937l-13.687,17.163c-3.584,4.562-3.15,10.971,0.869,14.99l14.99,14.99c4.019,4.019,10.428,4.454,14.99,0.869l17.163-13.686c9.776,6.192,20.638,10.645,31.936,13.251l2.498,21.726c1.702,15.038,21.441,8.544,32.262,9.993c5.757,0,10.537-4.237,11.189-9.993l2.498-21.726c11.298-2.606,22.16-7.061,31.936-13.253l17.163 13.688c4.562,3.584,10.971,3.15,14.99-0.869l14.99-14.99c4.019-4.019,4.454-10.428,0.87-14.991l-13.687-17.163c6.192-9.776,10.645-20.638,13.252-31.935l21.725-2.499c5.757-0.651,9.993-5.432,9.993-11.189v-21.073c0-5.757-4.236-10.536-9.993-11.189l-21.725-2.499c-2.607-11.296-7.06-22.16-13.252-31.935l13.687-17.163c3.584-4.562,3.15-10.971-0.87-14.99l-14.99-14.99c-4.019-4.019-10.428-4.454-14.99-0.869l-17.163 13.686c-9.776-6.192-20.638-10.645-31.936-13.251l-2.498-21.726c-0.652-5.758-5.431-9.993-11.189-9.993h-21.073c-5.757,0-10.537 4.237-11.189 9.993l-2.498 21.726c-11.298 2.606-22.16 7.059-31.936 13.251l-17.163-13.686c-4.562-3.584-10.971-3.149-14.99 0.87l-14.99 14.99c-4.019 4.019-4.453 10.427-0.869 14.99l13.687 17.162c-6.192 9.777-10.645 20.639-13.252 31.937l-21.725 2.499c-5.757 0.651-9.993 5.432-9.993 11.189v21.073C183.502 190 187.738 194.779 193.495 195.43z M284.001 138.859c19.301-19.301 50.52-19.301 69.821 0 19.171 19.171 19.171 50.519 0 69.691-19.301 19.301-50.52 19.301-69.821 0C264.7 189.379 264.7 158.03 284.001 138.859z"></path>
                                </svg>
                                <span className="text-sm">Service</span>
                            </NavLink>
                        </li>

                        <li className="flex flex-col items-center h-auto w-auto">
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    `duration-200 flex flex-col items-center ${isActive ? "text-gray-900" : "text-MainBGColorYellow"} font-bold`
                                }
                            >
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <circle cx="12" cy="6" r="4.75"></circle>
                                    <path d="M14,11.25H10A5.757,5.757,0,0,0,4.25,17v5a.75.75,0,0,0,.75.75H19a.75.75,0,0,0,.75-.75V17A5.757,5.757,0,0,0,14,11.25Z"></path>
                                </svg>
                                <span className="text-sm">Contact</span>
                            </NavLink>
                        </li>

                        <li className="flex flex-col items-center h-auto pr-2 w-auto">
                            <NavLink
                                to="/blog"
                                className={({ isActive }) =>
                                    `duration-200 flex flex-col items-center ${isActive ? "text-gray-900" : "text-MainBGColorYellow"} font-bold`
                                }
                            >
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" viewBox="0 0 430 430"
                                    preserveAspectRatio="xMidYMid meet" className='fill-current'>

                                    <g transform="translate(0.000000,399.000000) scale(0.100000,-0.1000000)"
                                        strokeWidth="90" strokeLinecap="round" strokeLinejoin="round">

                                        <path d="M3744 3751 c-99 -26 -115 -40 -704 -630 -535 -535 -579 -582 -628 -665
      -96 -166 -152 -351 -152 -511 0 -92 18 -133 72 -161 27 -14 50 -16 138 -11
      188 12 371 77 536 192 44 30 269 249 618 598 523 524 550 553 581 621 56 121
      55 221 -1 346 -33 75 -122 161 -201 197 -62 27 -197 40 -259 24z m154 -275
      c38 -19 61 -47 72 -87 21 -74 27 -68 -552 -645 -299 -298 -563 -555 -588 -571
      -25 -17 -67 -42 -95 -55 -54 -28 -181 -69 -188 -61 -17 16 64 211 124 300 43
      65 1076 1102 1114 1119 39 17 79 17 113 0z"/>

                                        <path d="M1341 3379 c-242 -47 -439 -220 -519 -453 l-27 -81 -3 -899 c-3 -978
      -4 -964 53 -1061 36 -60 115 -132 183 -163 51 -24 69 -27 167 -27 100 0 115 3
      166 28 31 15 110 73 174 130 l118 102 761 5 761 5 73 27 c105 38 175 83 256
      164 84 83 137 169 173 279 24 74 26 96 30 300 4 198 2 223 -14 255 -50 97
      -179 106 -233 17 -18 -29 -20 -51 -20 -208 0 -96 -5 -202 -11 -234 -24 -128
      -112 -243 -229 -299 l-65 -31 -790 -5 c-702 -4 -792 -7 -813 -21 -12 -9 -74
      -63 -138 -120 -64 -57 -126 -109 -137 -116 -34 -19 -98 -15 -135 7 -65 40 -63
      0 -60 963 l3 872 32 67 c35 76 108 155 171 187 98 50 115 51 755 51 539 0 603
      2 634 17 92 43 98 180 10 233 -31 19 -54 20 -657 19 -344 -1 -645 -5 -669 -10z"/>

                                        <path d="M1401 2562 c-64 -34 -87 -110 -54 -179 32 -69 49 -73 316 -73 195 0
      243 3 268 15 65 34 89 128 49 193 -35 57 -62 62 -317 62 -202 0 -232 -2 -262
      -18z"/>

                                        <path d="M1423 2033 c-35 -7 -81 -59 -89 -100 -10 -53 13 -112 56 -141 34 -23
      37 -23 288 -20 l254 3 34 37 c29 32 34 45 34 85 0 60 -26 104 -73 126 -30 14
      -69 17 -259 16 -122 -1 -233 -4 -245 -6z"/>

                                    </g>
                                </svg>


                                <span className="text-sm">Blog</span>
                            </NavLink>
                        </li>

                        <li className="flex flex-col items-center h-auto pr-2 w-auto">
                            <NavLink
                                to="/faq"
                                className={({ isActive }) =>
                                    `duration-200 flex flex-col items-center ${isActive ? "text-gray-900" : "text-MainBGColorYellow"} font-bold`
                                }
                            >
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" height="24" width="24" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 420.794">
                                    <path fillRule="nonzero" d="M365.115 411.466l-41.555-48.032H168.499c-8.77 0-16.722-3.669-22.406-9.542l-34.239 32.84a17.242 17.242 0 01-12.855 5.73c-9.545 0-17.285-7.74-17.285-17.285v-71.248H38.913C17.662 303.929 0 286.269 0 265.016V38.913C0 17.834 17.802 0 38.913 0h390.993c21.283 0 38.914 17.631 38.914 38.913v51.92h11.975c17.088 0 31.205 14.12 31.205 31.205v210.199c0 17.103-14.103 31.197-31.205 31.197h-78.294l-1.835 38.455c.012 10.605-8.657 18.905-19.061 18.905-8.201 0-11.857-3.969-16.49-9.328zM156.443 166.073h-28.111v41.447H95.263V95.864h67.793l-4.134 28.583h-30.59v15.007h28.111v26.619zm36.922 41.447h-31.046l26.786-111.656h51.092l26.787 111.656h-31.046l-3.806-17.686h-34.965l-3.802 17.686zm16.535-77.542l-6.778 31.449h22.893l-6.613-31.263-9.502-.186zm123.313 73.434l-14.057 4.108c-18.519 0-30.973-5.121-37.366-15.363-3.309-5.121-5.623-10.87-6.947-17.242-1.321-6.372-1.983-14.083-1.983-23.135 0-20.365 3.528-35.223 10.582-44.574 7.055-9.348 19.732-14.022 38.031-14.022 18.298 0 31.031 4.703 38.196 14.112 7.165 9.409 10.747 24.238 10.747 44.484 0 15.126-2.921 27.333-8.762 36.623l14.101 8.094-8.599 20.545-33.943-6.842v-6.788zm-24.805-23.762h13.727c4.517 0 7.8-.566 9.838-1.698 2.041-1.129 3.057-3.722 3.057-7.769v-46.45h-13.888c-4.41 0-7.633.567-9.674 1.696-2.038 1.132-3.06 3.722-3.06 7.771v46.45zM98.999 375.177l92.307-88.533h238.6c11.903 0 21.629-9.734 21.629-21.628V38.913c0-11.894-10.013-21.628-21.629-21.628H38.913c-11.615 0-21.628 10.007-21.628 21.628v226.103c0 11.697 9.726 21.628 21.628 21.628h60.086v88.533z" />
                                </svg>
                                <span className="text-sm">ChatBot</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
