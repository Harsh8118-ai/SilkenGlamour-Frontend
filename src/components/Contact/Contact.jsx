import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { Link } from "react-router-dom";
import { useAuth } from "../../Store/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure default styles are loaded
import '../../Css.css';

const Contact = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
            once: true, // Only animate once when scrolled into view
        });
    }, []);

    const defaultContactFormData = {
        username: "",
        email: "",
        message: "",
    };

    const [data, setData] = useState(defaultContactFormData);

    const { user } = useAuth();

    // Access environment variable using import.meta.env
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    // Update form data when user is available
    useEffect(() => {
        if (user) {
            setData({
                username: user.username,
                email: user.email,
                message: "",
            });
        }
    }, [user]); // This effect runs only when the user changes

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleContactForm = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/form/contact`, {
                
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Indicating that JSON is being sent
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setData(defaultContactFormData); // Reset the form data after submission
                const responseData = await response.json(); // Parsing the response data
                console.log(responseData);

                toast("Message Sent Successfully");

            }
        } catch (error) {

            toast("Message Not Sent");

            console.error("Error:", error);
        }
    };

    const phoneNumber = '9266037001';
    const message = "Hi Silken Glamour! I'd like to know more about your Services. Can you help me?";

    const handleClick = () => {
        const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <>
            <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#CBB59F] to-[#DED6CB] py-16">
                {/* Call and WhatsApp Section at the Top */}
                <div
                    className="bg-LightBGColor shadow-lg rounded-lg p-6 max-w-2xl w-full flex justify-center gap-24 items-center  -mx-5"
                    data-aos="fade-down"
                >
                    <div className="text-center hover:scale-110 transform transition duration-500 ease-in-out ">
                        <a href="tel:+919266037001" className="text-lg font-semibold text-black hover:text-[#CBB59F] transition flex items-center flex-col">
                            <FaPhoneAlt className="text-blue-700 text-5xl  p-1" />
                            <p>Call Now</p>
                        </a>
                    </div>

                    <div className="text-center hover:scale-110 transform transition duration-500 ease-in-out " onClick={handleClick}>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold flex flex-col items-center text-black hover:text-[#CBB59F] transition"
                        >
                            <FaWhatsapp className="text-[#25D366] text-5xl " />
                            Chat Now
                        </a>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="flex justify-center space-x-8 text-3xl text-[#7A6752] mt-12" data-aos="fade-up" data-aos-delay="400">
                    <a href="https://www.instagram.com/silkenglamour" target="_blank"
                        rel="noopener noreferrer"><FaInstagram className="hover:text-[#CBB59F] transition transform hover:scale-125 duration-500 ease-in-out" /></a>
                    <a href="https://www.facebook.com/profile.php?id=61565477906413&mibextid=LQQJ4d" target="_blank"
                        rel="noopener noreferrer"><FaFacebookF className="hover:text-[#CBB59F] transition transform hover:scale-125 duration-500 ease-in-out" /></a>
                    <a href="https://www.linkedin.com/company/silkenglamour/" target="_blank"
                        rel="noopener noreferrer"><FaLinkedinIn className="hover:text-[#CBB59F] transition transform hover:scale-125 duration-500 ease-in-out" /></a>
                </div>

                {/* Main Contact Section */}
                <div
                    className="bg-LightBGColor shadow-2xl rounded-lg p-10 max-w-4xl w-full text-center text-[#7A6752] mt-10"
                    data-aos="fade-up"
                >
                    <h1 className="text-4xl font-semibold mb-6 animate-pulse">Let's Connect!</h1>
                    <p className="text-lg mb-4" data-aos="fade-up" data-aos-delay="200">
                        We'd love to hear from you. Whether you have questions or want to book a service, feel free to reach out.
                    </p>

                    {/* Contact Details */}
                    <div className="flex justify-evenly flex-wrap gap-8 mt-6" data-aos="fade-right" data-aos-delay="300">
                        <div className="flex items-center space-x-3 hover:scale-105 transition transform duration-300 ease-in-out">
                            <FaEnvelope className="text-[#7A6752] text-2xl" />
                            <a href="mailto:silkenglamour@gmail.com"><span className="text-lg">silkenglamour@gmail.com</span></a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form
                        className="mt-10 space-y-6 max-w-lg mx-auto"
                        data-aos="fade-up"
                        data-aos-delay="500"
                        onSubmit={handleContactForm}
                    >
                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-lg mb-2">Your Name</label>
                            <input
                                type="text"
                                className="px-4 py-2 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-BGColorYellow transition duration-300 ease-in-out transform hover:scale-105"
                                name="username"
                                id="username"
                                value={data.username}
                                onChange={handleInput}
                                autoCapitalize="off"
                                placeholder="Enter Your Name"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-lg mb-2">E-mail</label>
                            <input
                                type="email"
                                className="px-4 py-2 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-BGColorYellow transition duration-300 ease-in-out transform hover:scale-105"
                                name="email"
                                id="email"
                                value={data.email}
                                onChange={handleInput}
                                autoCapitalize="off"
                                placeholder="Enter Your E-Mail"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="message" className="text-lg mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                className="px-4 py-2 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-BGColorYellow transition duration-300 ease-in-out transform hover:scale-105"
                                value={data.message}
                                onChange={handleInput}
                                placeholder="Write Your message here..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#2E2117] via-[#796855] to-[#2E2117] text-gray-300 py-3 rounded-lg shadow-md hover:bg-[#5E5543] transition transform hover:scale-105 duration-500 ease-in-out"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Social Media Section */}
                <div className="flex justify-center space-x-8 text-3xl text-[#7A6752] mt-12" data-aos="fade-up" data-aos-delay="400">
                    <a href="https://www.instagram.com/silkenglamour" target="_blank"
                        rel="noopener noreferrer"><FaInstagram className="hover:text-[#CBB59F] transition transform hover:scale-125 duration-500 ease-in-out" /></a>
                    <a href="https://www.facebook.com/profile.php?id=61565477906413&mibextid=LQQJ4d" target="_blank"
                        rel="noopener noreferrer"><FaFacebookF className="hover:text-[#CBB59F] transition transform hover:scale-125 duration-500 ease-in-out" /></a>
                    <a href="https://www.linkedin.com/company/silkenglamour/" target="_blank"
                        rel="noopener noreferrer"><FaLinkedinIn className="hover:text-[#CBB59F] transition transform hover:scale-125 duration-500 ease-in-out" /></a>
                </div>

                {/* .............. BOTTOM CONTACT SECTION .............. */}
                <div className="max-w-5xl mx-3 sm:px-6 lg:px-8 ">
                    <div className="mt-20 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-12 rounded-lg bg-gradient-to-b from-[#2E2117] via-[#796855] to-[#2E2117] sm:rounded-lg">
                                <h1 className="text-3xl sm:text-4xl text-MainBGColorYellow font-extrabold">Get in touch:</h1>

                                <div className="flex items-center mt-8 text-MainBGColorYellow font-bold">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-MainBGColorYellow"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <div className="ml-4 text-md tracking-wide font-semibold w-40">Sector 52, Noida</div>
                                </div>

                                <div className="flex items-center mt-4 text-MainBGColorYellow font-bold">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-MainBGColorYellow"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                        +91 9266037001 <br /> +91 9266037002
                                    </div>
                                </div>

                                <div className="flex items-center mt-2 text-MainBGColorYellow font-bold">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-MainBGColorYellow"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                            <a href="mailto:silkenglamour@gmail.com">
                                    <div className="ml-4 text-md tracking-wide font-semibold w-40">silkenglamour@gmail.com</div></a>
                                </div>
                            </div>

                            {/*............... button ................ */}
                            <div className="flex flex-col justify-center items-center sm:items-stretch mt-7 sm:mt-0">
                                <Link to="signup">
                                    <button type="submit" className="p-3 sm:w-full px-8 bg-BGColorYellow text-black font-bold rounded-lg hover:bg-white">
                                        Sign Up
                                    </button>
                                </Link>

                                <Link to="login">
                                    <button type="submit" className="mt-5 p-3 sm:w-full px-8  bg-BGColorYellow text-black font-bold rounded-lg hover:bg-white">
                                        Log In
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
