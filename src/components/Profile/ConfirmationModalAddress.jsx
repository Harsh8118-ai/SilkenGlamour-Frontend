import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../Store/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const ConfirmationModalAddress = ({ data, isOpen, onClose }) => {
    const token= localStorage.getItem("token");
    const { user } = useAuth();
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const [loadingLocation, setLoadingLocation] = useState(false);

    useEffect(() => {
        if (user && data) {
            setValue('street', data?.street);
            setValue('apartmentNumber', data?.apartmentNumber);
            setValue('town', data?.town);
            setValue('pincode', data?.pincode);
        }
    }, [user, data, setValue]);

    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser.");
            return;
        }

        setLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                console.log("📍 Accurate coords:", latitude, longitude);

                try {
                    const res = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
                    );
                    const geoData = await res.json();
                    console.log("📦 Geocode API response:", geoData);

                    if (geoData.status === "OK") {
                        // Pick most accurate result
                        const result = geoData.results.find(r =>
                            r.types.includes("street_address") ||
                            r.types.includes("premise") ||
                            r.types.includes("route")
                        ) || geoData.results[0];

                        const components = result.address_components;

                        const getComponent = (type) =>
                            components.find(c => c.types.includes(type))?.long_name || "";

                        const street = getComponent("route");
                        const town =
                            getComponent("locality") ||
                            getComponent("sublocality") ||
                            getComponent("administrative_area_level_2");

                        const pincode = getComponent("postal_code");

                        console.log("📍 Extracted:", { street, town, pincode });

                        setValue("street", street);
                        setValue("town", town);
                        setValue("pincode", pincode);

                        toast.success("Location fetched successfully!");
                    } else {
                        toast.error("Failed to retrieve location data.");
                        console.error("❌ Status:", geoData.status);
                    }
                } catch (error) {
                    console.error("Geocoding failed:", error);
                    toast.error("Something went wrong while fetching address.");
                } finally {
                    setLoadingLocation(false);
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
                toast.error("Failed to get your location.");
                setLoadingLocation(false);
            },
            {
                enableHighAccuracy: true, // ✅ get accurate GPS-based coordinates
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    const submitProfileForm = async (formData) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/updateAddress`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Address Updated Successfully");
                navigate("/profile");
                setTimeout(() => window.location.reload(), 500);
            } else {
                toast.error(data.message || "Failed to update address");
                console.log("Response", data);
                navigate("/profile");
            }
        } catch (error) {
            console.log("Error occur while Updating Address", error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-BGColorYellow bg-opacity-60 z-50 flex justify-center items-center">
            <div className="bg-MainBGColorYellow p-6 rounded-lg shadow-xl shadow-BGColorYellow max-w-lg w-full relative mx-4 sm:mx-0">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-800 text-bold"
                >
                    <FaTimes className="h-6 w-6" />
                </button>
                <h2 className="text-2xl text-BGColorYellow font-bold mb-6 text-center">Your Address</h2>

                <div className="mb-4 flex justify-center">
                    <button
                        onClick={handleUseMyLocation}
                        disabled={loadingLocation}
                        className="bg-gray-700 text-white text-sm px-4 py-2 rounded hover:bg-gray-600"
                    >
                        {loadingLocation ? "Locating..." : "Use My Location"}
                    </button>
                </div>

                <form onSubmit={handleSubmit(submitProfileForm)}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-BGColorYellow text-sm font-bold" htmlFor="street">
                                Street
                            </label>
                            <input
                                type="text"
                                id="street"
                                className="w-full px-3 py-2 text-gray-300 border border-gray-300 bg-gray-700 rounded-md focus:outline-none focus:border-green-500"
                                placeholder="Enter Street"
                                {...register('street', { required: true })}
                            />
                            {errors.street && <span className="text-red-500 text-sm">Please enter your Street</span>}
                        </div>

                        <div>
                            <label className="block text-BGColorYellow text-sm font-bold" htmlFor="apartmentNumber">
                                Apartment Number
                            </label>
                            <input
                                type="text"
                                id="apartmentNumber"
                                className="w-full px-3 py-2 text-gray-300 border border-gray-300 bg-gray-700 rounded-md focus:outline-none focus:border-green-500"
                                placeholder="Enter Apartment Number"
                                {...register('apartmentNumber', { required: true })}
                            />
                            {errors.apartmentNumber && <span className="text-red-500 text-sm">Please enter your Apartment Number</span>}
                        </div>

                        <div>
                            <label className="block text-BGColorYellow text-sm font-bold" htmlFor="town">
                                Town
                            </label>
                            <input
                                type="text"
                                id="town"
                                className="w-full px-3 py-2 text-gray-300 border border-gray-300 bg-gray-700 rounded-md focus:outline-none focus:border-green-500"
                                placeholder="Enter Town"
                                {...register('town', { required: true })}
                            />
                            {errors.town && <span className="text-red-500 text-sm">Please enter your Town</span>}
                        </div>

                        <div>
                            <label className="block text-BGColorYellow text-sm font-bold" htmlFor="pincode">
                                Pincode
                            </label>
                            <input
                                type="text"
                                id="pincode"
                                className="w-full px-3 py-2 text-gray-300 border border-gray-300 bg-gray-700 rounded-md focus:outline-none focus:border-green-500"
                                placeholder="Enter Pincode"
                                {...register('pincode', { required: true })}
                            />
                            {errors.pincode && <span className="text-red-500 text-sm">Please enter your Pincode</span>}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConfirmationModalAddress;
