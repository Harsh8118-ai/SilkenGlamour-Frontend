import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Store/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure default styles are loaded
import '../../Css.css';
import { FaGoogle, FaGithub } from "react-icons/fa";

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        mobileNumber: '',
        email: '',
        street: '',
        apartmentNumber: '', // Optional field
        town: '',
        pincode: '',
        password: '' // Required field
    });

    const { storeTokenInLS } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    // Access environment variable using import.meta.env
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });


            console.log(response);
            const data = await response.json();
            console.log('User registered successfully:', data);

            if (response.ok) {

                storeTokenInLS(data.token)

                navigate(`/auth-success?token=${data.token}`);

                toast("Registered Successfully")

            } else {
                console.error('Failed to register user:', data); // Error message from the server

                toast(data.extraDetails ? data.extraDetails : data.message)

            }
        } catch (error) {
            console.error('Error:', error); // Logging any error from fetch

            toast("Database Not Connected")


        }
    };

    // Handle OAuth Login
    const handleOAuthLogin = (provider) => {
        window.location.href = `${BASE_URL}/oauth/${provider}`;
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-[#2E2117] via-[#796855] to-[#2E2117] p-5">
            <div className="shadow-lg rounded-lg p-8 w-full max-w-md bg-MainBGColorYellow">
                <h1 className="text-3xl font-semibold text-center text-[#4c3726] mb-6 animate-fadeIn">
                    Signup
                </h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-BGColorYellow">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-3 text-BGColorYellow bg-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-yellow-500 transition duration-300 ease-in-out transform hover:scale-105"
                            placeholder="Enter your full name"
                            required // Required field
                        />
                    </div>

                    {/* Mobile Number */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-BGColorYellow">
                            Mobile Number
                        </label>
                        <input
                            type="tel"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            className="w-full p-3 text-BGColorYellow bg-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-yellow-500 transition duration-300 ease-in-out transform hover:scale-105"
                            placeholder="Enter your mobile number"
                            required // Required field
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-BGColorYellow">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 text-BGColorYellow bg-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-yellow-500 transition duration-300 ease-in-out transform hover:scale-105"
                            placeholder="Enter your email"
                            required // Required field
                        />
                    </div>

                    {/* Address */}
                    {/*<div>
                        <label className="block text-sm font-medium text-BGColorYellow ">Address</label>
                        <div className='border border-gray-700 bg-[#cfbca6]  rounded-md p-4'>
                            <div className="space-y-4">
                                <div>
                                    <input
                                        id="apartmentNumber"
                                        name="apartmentNumber"
                                        value={formData.apartmentNumber}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="House/Flat Number"
                                        required
                                        className="w-full p-3 border border-gray-700 bg-gray-700 rounded-md text-BGColorYellow focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                                    />
                                </div>
                                <div>
                                    <input
                                        id="street"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Area & Landmark"
                                        required
                                        className="w-full p-3 border border-gray-700 bg-gray-700 text-BGColorYellow rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                                    />
                                </div>
                                <div>
                                    <input
                                        id="town"
                                        name="town"
                                        value={formData.town}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Town/City"
                                        required
                                        className="w-full p-3 border border-gray-700 bg-gray-700 text-BGColorYellow rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                                    />
                                </div>
                                <div>
                                    <input
                                        id="pincode"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Pincode"
                                        required
                                        autoComplete="postal-code"
                                        className="w-full p-3 border border-gray-700 bg-gray-700 text-BGColorYellow rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-BGColorYellow">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 text-BGColorYellow bg-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-yellow-500 transition duration-300 ease-in-out transform hover:scale-105"
                                placeholder="Enter your password"
                                required // Required field
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
                            >
                                {showPassword ? (
                                    <svg
                                        className="w-5 h-5 text-gray-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M1 12l4.293 4.293a2.3 2.3 0 003.293 0L12 12m0 0l4.293 4.293a2.3 2.3 0 003.293 0L23 12m-2.5 0a8.5 8.5 0 00-8.5-8.5A8.5 8.5 0 002.5 12a8.5 8.5 0 008.5 8.5M12 4.5a7.5 7.5 0 00-7.5 7.5A7.5 7.5 0 0012 19.5 7.5 7.5 0 0019.5 12 7.5 7.5 0 0012 4.5z" />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-5 h-5 text-gray-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M2.5 12C4.893 4.897 10.697 2 12 2s7.107 2.897 9.5 10c-2.393 7.103-8.197 10-9.5 10s-7.107-2.897-9.5-10zM12 15a3 3 0 010-6 3 3 0 010 6z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full p-3 bg-BGColorYellow text-black font-semibold rounded-lg hover:bg-yellow-600"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-4 text-center text-BGColorYellow">
                    Already have an account?
                    <Link to="/contact/login" className="text-BGColorYellow hover:text-yellow-400 font-bold">
                        &nbsp; Log In
                    </Link>
                </div>

                {/* 🔹 OAuth Signup Buttons */}
                <div className="my-4 flex items-center">
                    <hr className="flex-grow border-gray-700" />
                    <span className="px-2 text-[#4c3726] text-xs font-bold">OR CONTINUE WITH</span>
                    <hr className="flex-grow border-gray-700" />
                </div>

                <div className="flex justify-center space-x-3">
                    <button
                        onClick={() => handleOAuthLogin("github")}
                        className="flex items-center space-x-2 px-4 py-2 bg-BGColorYellow border border-gray-700 text-MainBGColorYellow  rounded-md hover:bg-yellow-600 transition-all"
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaGithub className="w-5 h-5" />
                        <span>GitHub</span>
                    </button>

                    <button
                        onClick={() => handleOAuthLogin("google")}
                        className="flex items-center space-x-2 px-4 py-2 bg-BGColorYellow border border-gray-700 text-MainBGColorYellow  rounded-md hover:bg-yellow-600 transition-all"
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaGoogle className="w-5 h-5" />
                        <span>Google</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SignUp;
