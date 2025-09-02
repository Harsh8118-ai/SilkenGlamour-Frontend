    import React, { useEffect, useState } from 'react';
    import { useForm } from 'react-hook-form';
    import { useAuth } from '../../Store/auth';
    import { toast } from 'react-toastify';
    import { useNavigate } from 'react-router-dom';
    import { FaTimes } from 'react-icons/fa';

    const ConfirmationModalMobile = ({ data, isOpen, onClose, onMobileSaved }) => {
      const token = localStorage.getItem("token")
      const { user } = useAuth();
      const navigate = useNavigate();

      const BASE_URL = import.meta.env.VITE_BACKEND_URL;

      const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
      } = useForm();

      useEffect(() => {
        if (user) {
          setValue('mobileNumber', data?.mobileNumber);
        }
      }, [user, setValue, data]);

      const submitMobileForm = async (formData) => {
        try {
          const response = await fetch(`${BASE_URL}/auth/updateProfile`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          });

          const resData = await response.json();

          if (response.ok) {
            toast.success("Mobile number updated successfully!");
            onMobileSaved();
          } else {
            toast.error(resData.message || "Failed to update mobile number.");
            console.log("Server Response:", resData);
          }
        } catch (error) {
          console.error("Error updating mobile number:", error);
          toast.error("Something went wrong while updating.");
        }
      };

      if (!isOpen) return null;

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-MainBGColorYellow p-6 rounded-lg shadow-lg max-w-lg w-full relative mx-4 sm:mx-0">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-red-500 hover:text-red-800 text-bold"
            >
              <FaTimes className="h-6 w-6" />
            </button>
            <h2 className="text-2xl text-BGColorYellow font-bold mb-6 text-center">
              Update Mobile Number
            </h2>
            <form onSubmit={handleSubmit(submitMobileForm)}>
              <div className="space-y-4">
                <div>
                  <label className="block text-BGColorYellow text-sm font-bold" htmlFor="mobileNumber">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobileNumber"
                    className="w-full px-3 py-2 border border-gray-300 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:border-green-500"
                    placeholder="Enter 10-digit Mobile Number"
                    {...register('mobileNumber', {
                      required: true,
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter a valid 10-digit number",
                      },
                    })}
                  />
                  {errors.mobileNumber && (
                    <span className="text-red-500 text-sm">{errors.mobileNumber.message || "Mobile number is required"}</span>
                  )}
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

    export default ConfirmationModalMobile;
