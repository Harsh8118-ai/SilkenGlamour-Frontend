import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../Store/auth';
import { CartContext } from '../Cart/CartContext';
import MobileCart from '../Cart/MobileCart';
import WebCartLayout from '../Cart/WebCartLayout';

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false); // State to toggle cart visibility
  const { cartItems } = useContext(CartContext);
  const { isLoggedIn } = useAuth();

  // Calculate total number of items in the cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Function to explicitly open the cart
  const openCart = () => {
    setIsCartOpen(true); // Set to true to open the cart
  };

  // Function to close the cart
  const closeCart = () => {
    setIsCartOpen(false); // Close the cart
  };

  return (
    <>
      {/* Web View */}
      <header className="hidden sm:block shadow sticky z-50 top-0 bg-gradient-to-r from-[#2E2117] via-[#796855] to-[#2E2117]">
        <nav className="border-gray-600 sm:py-2 lg:px-6">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/">
              <div className="flex items-center justify-center sm:flex-col lg:flex-col">
                <img
                  src="/Services/SG Logo.png"
                  alt="LOGO"
                  className="hidden sm:inline ml-8 h-8 rounded-md object-cover bg-transparent"
                />
                <span
                  className={`text-MainBGColorYellow hidden sm:inline text-center ml-6 mt-1 text-sm font-bold`}
                  id="logo"
                >
                  SilkenGlamour
                </span>
              </div>
            </Link>

            <div className="hidden justify-between items-center w-full sm:flex sm:flex-wrap sm:w-auto sm:order-1" id="mobile-menu-2">
              <ul className="flex flex-col mt-4 font-medium sm:flex-row lg:space-x-10 sm:mt-0 ml-28">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 sm:-ml-5 lg:-ml-0 duration-200 ${isActive ? 'text-gray-900' : 'text-MainBGColorYellow'
                      }  border-gray-600  lg:hover:bg-transparent hover:text-black font-bold lg:p-0`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-gray-900' : 'text-MainBGColorYellow'
                      }  border-gray-600  lg:hover:bg-transparent hover:text-black font-bold lg:p-0`
                    }
                  >
                    About
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    to="/service"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-gray-900' : 'text-MainBGColorYellow'
                      }  border-gray-600  lg:hover:bg-transparent hover:text-black font-bold lg:p-0`
                    }
                  >
                    Service
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-gray-900' : 'text-MainBGColorYellow'
                      }  border-gray-600  lg:hover:bg-transparent hover:text-black font-bold lg:p-0`
                    }
                  >
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/blog"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-gray-900' : 'text-MainBGColorYellow'
                      }  border-gray-600  lg:hover:bg-transparent  hover:text-black font-bold lg:p-0`
                    }
                  >
                    Blog
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/faq"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-gray-900' : 'text-MainBGColorYellow'
                      }  border-gray-600  lg:hover:bg-transparent  hover:text-black font-bold lg:p-0`
                    }
                  >
                    ChatBot
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="items-center sm:order-2 hidden sm:flex">
              {isLoggedIn ? (
                <Link
                  to="contact/logout"
                  className="text-MainBGColorYellow hover:bg-MainBGColorYellow focus:ring-4 bg-gray-900 focus:ring-gray-600 font-medium rounded-lg text-sm px-4 sm:px-3 py-2 sm:py-1.5 mr-2 lg:mr-4 focus:outline-none hover:text-black"
                >
                  Log Out
                </Link>
              ) : (
                <>
                  <Link
                    to="contact/login"
                    className="text-MainBGColorYellow hover:bg-MainBGColorYellow focus:ring-4 bg-gray-900 focus:ring-gray-600 font-medium rounded-lg text-sm px-4 sm:px-3 py-2 sm:py-1.5 mr-2 lg:mr-4 focus:outline-none hover:text-black"
                  >
                    Log In
                  </Link>
                  <Link
                    to="contact/signup"
                    className="text-MainBGColorYellow hover:bg-MainBGColorYellow focus:ring-4 bg-gray-900 focus:ring-gray-600 font-medium rounded-lg text-sm px-4 sm:px-3 py-2 sm:py-1.5 mr-2 lg:mr-4 focus:outline-none hover:text-black"
                  >
                    Sign Up
                  </Link>
                </>
              )}

              {/* Cart Icon */}
              <div className="flex items-center">
                <div
                  className="relative text-MainBGColorYellow mr-3 cursor-pointer"
                  onClick={openCart} // Only opens the cart
                >
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-1.5 bg-red-500 text-red-500 rounded-full w-2 h-2  flex items-center justify-center text-xs font-semibold">
                      ·
                    </span>
                  )}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    height="25"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#C6B198"
                  >
                    <g id="SVGRepo_bgCarrier"></g>
                    <g id="SVGRepo_tracerCarrier"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M20.9474 6.97355H16.4211V6.65609C16.5263 4.1164 14.5263 2 12 2C9.47368 2.10582 7.57895 4.1164 7.57895 6.65609V6.97355H3.05263C2.42105 6.97355 2 7.39683 2 8.03175V16.709C2 19.672 4.31579 22 7.26316 22H16.7368C19.6842 22 22 19.672 22 16.709V8.03175C22 7.50265 21.5789 6.97355 20.9474 6.97355ZM9.1579 6.65609C9.1579 5.06878 10.4211 3.69312 12 3.5873C13.5789 3.69312 14.8421 5.06878 14.8421 6.65609V6.97355H9.1579V6.65609ZM20.4211 16.8148C20.4211 18.8254 18.7368 20.5185 16.7368 20.5185H7.26316C5.26316 20.5185 3.57895 18.8254 3.57895 16.8148V8.56085H7.57895V10.6772C7.36842 10.8889 7.26316 11.2063 7.26316 11.418C7.26316 12.0529 7.78947 12.4762 8.31579 12.4762C8.84211 12.4762 9.36842 11.9471 9.36842 11.418C9.36842 11.1005 9.26316 10.8889 9.05263 10.6772V8.56085H14.7368V10.5714C14.5263 10.7831 14.4211 11.1005 14.4211 11.418C14.4211 12.0529 14.8421 12.582 15.4737 12.582C16.1053 12.582 16.6316 12.1587 16.6316 11.5238C16.6316 11.2063 16.5263 10.9947 16.3158 10.7831V8.66667H20.4211V16.8148Z"
                        fill="#001325"
                        fillOpacity="0.92"
                      ></path>
                    </g>
                  </svg>
                </div>

                <Link to="/profile">
                  <div className="mr-3">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      height="25"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
                          fill="#BFA280"
                        />
                      </g>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>

            {/* Web Cart for Desktop View */}
            {isCartOpen && <WebCartLayout closeCart={closeCart} />} {/* Close function passed */}
          </div>
        </nav>
      </header>

      {/* Mobile View */}
      <header className="sm:hidden shadow sticky z-50 top-0 bg-gradient-to-r from-[#4d3b2e] via-[#39260b] to-[#4d3b2e] h-full">
        <div className="flex items-center justify-center ">
          <div className="absolute left-0 h-full">
            <Link to="/">
              <img
                src="/Services/SG Logo.png"
                alt="LOGO"
                className="ml-3 m-2 h-6 rounded-md object-cover bg-transparent left-0"
              />
            </Link>
          </div>
          <div className="text-MainBGColorYellow text-center text-lg font-extrabold my-5" id="logo">
            {/* Silken Glamour */}
          </div>

          {/* Mobile Cart Icon */}
          <div className="absolute right-0 flex items-center">
            <div
              className="relative text-MainBGColorYellow mr-3 cursor-pointer"
              onClick={openCart} // Opens the cart
            >
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-3.5 h-4 flex items-center justify-center text-xs font-semibold">
                  {totalItems}
                </span>
              )}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                height="25"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#C6B198"
              >
                <g id="SVGRepo_bgCarrier"></g>
                <g id="SVGRepo_tracerCarrier"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M20.9474 6.97355H16.4211V6.65609C16.5263 4.1164 14.5263 2 12 2C9.47368 2.10582 7.57895 4.1164 7.57895 6.65609V6.97355H3.05263C2.42105 6.97355 2 7.39683 2 8.03175V16.709C2 19.672 4.31579 22 7.26316 22H16.7368C19.6842 22 22 19.672 22 16.709V8.03175C22 7.50265 21.5789 6.97355 20.9474 6.97355ZM9.1579 6.65609C9.1579 5.06878 10.4211 3.69312 12 3.5873C13.5789 3.69312 14.8421 5.06878 14.8421 6.65609V6.97355H9.1579V6.65609ZM20.4211 16.8148C20.4211 18.8254 18.7368 20.5185 16.7368 20.5185H7.26316C5.26316 20.5185 3.57895 18.8254 3.57895 16.8148V8.56085H7.57895V10.6772C7.36842 10.8889 7.26316 11.2063 7.26316 11.418C7.26316 12.0529 7.78947 12.4762 8.31579 12.4762C8.84211 12.4762 9.36842 11.9471 9.36842 11.418C9.36842 11.1005 9.26316 10.8889 9.05263 10.6772V8.56085H14.7368V10.5714C14.5263 10.7831 14.4211 11.1005 14.4211 11.418C14.4211 12.0529 14.8421 12.582 15.4737 12.582C16.1053 12.582 16.6316 12.1587 16.6316 11.5238C16.6316 11.2063 16.5263 10.9947 16.3158 10.7831V8.66667H20.4211V16.8148Z"
                    fill="#001325"
                    fillOpacity="0.92"
                  ></path>
                </g>
              </svg>
            </div>

            <Link to="/profile">
              <div className="mr-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  height="25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
                      fill="#BFA280"
                    />
                  </g>
                </svg>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Cart */}
        {isCartOpen && <MobileCart closeCart={closeCart} />} {/* Close function passed */}
      </header>
    </>
  );
}
