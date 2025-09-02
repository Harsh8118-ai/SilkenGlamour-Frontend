import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Store/auth';
import Login from '../Contact/LogIn';
import ConfirmationModalName from './ConfirmationModalName';
import ConfirmationModalAddress from './ConfirmationModalAddress';
import { Edit, Phone, MapPin, Package, History } from "lucide-react";

const Profile = () => {
  const { user, isLoggedIn } = useAuth();
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = (type, data) => {
    setModalType(type);
    setModalData(data);
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setModalData(null);
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="min-h-screen w-full bg-MainBGColorYellow">
          <div className="max-w-4xl mx-auto bg-MainBGColorYellow shadow-lg p-2 md:p-10 pt-10 space-y-6">

            {/* Profile Header */}
            <div className='bg-LightBGColor p-2 rounded-lg'>
            <div className="flex flex-row sm:items-center justify-between gap-6 ">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full border-2 border-MainBGColorYellow bg-LightBGColor flex items-center justify-center text-white text-2xl font-semibold">
                  👤
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-BGColorYellow">{user.username}</h2>
                  <p className="text-lg text-[#7A6752]">Premium Member</p>
                </div>
              </div>
              <button onClick={() => openModal('name', { username: user?.username })}>
                <Edit className="h-6 w-6 text-amber-600" />
              </button>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 text-xl font-semibold text-BGColorYellow pt-6">
              {/* Phone Number */}
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-amber-600 mt-1" />
                <span>{user.mobileNumber}</span>
              </div>

              {/* Address with Edit Button */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-amber-600 mt-1" />
                  <span>
                    {user.street}, {user?.apartmentNumber},<br />
                    {user?.town}, {user?.pincode}
                  </span>
                </div>
                <button
                  onClick={() =>
                    openModal('address', {
                      street: user.street,
                      apartmentNumber: user.apartmentNumber,
                      town: user.town,
                      pincode: user.pincode,
                    })
                  }
                  className="text-[#7A6752] hover:text-[#CBB59F]"
                >
                  <Edit className="h-6 w-6 text-amber-600 mt-1" />
                </button>
              </div>
            </div>
            </div>


            {/* Order Buttons */}
            <div className="space-y-4 text-xl">
              <Link to="/my-order"><button
                className="flex items-start gap-3 w-full bg-[#F4EDE3] border border-[#CBB59F] text-BGColorYellow rounded-lg px-4 py-3 hover:bg-[#EFE5D9]"
              >
                <Package className="h-7 w-7 text-amber-600 mt-1" />
                <div className="text-start">
                  <p className="font-medium">My Orders</p>
                  <p className="text-sm text-[#7A6752]">View current bookings</p>
                </div>
              </button></Link>

              <Link to="/order-history"><button
                className="flex items-start gap-3 w-full bg-[#F4EDE3] border border-[#CBB59F] text-BGColorYellow rounded-lg px-4 py-3 hover:bg-[#EFE5D9]"
              >
                <History className="h-7 w-7 text-amber-600 mt-1" />
                <div className="text-start">
                  <p className="font-medium">Order History</p>
                  <p className="text-sm text-[#7A6752]">View past services</p>
                </div>
              </button></Link>
            </div>

            {/* Stats Grid */}
            <div className="bg-LightBGColor rounded-lg px-6 py-6 grid grid-cols-3 gap-6 text-center text-[#7A6752]">
              <div>
                <p className="text-xl font-bold">12</p>
                <p className="text-xs mt-1">Services Booked</p>
              </div>
              <div>
                <p className="text-xl font-bold">₹15,600</p>
                <p className="text-xs mt-1">Total Spent</p>
              </div>
              <div>
                <p className="text-xl font-bold">4.8</p>
                <p className="text-xs mt-1">Avg Rating</p>
              </div>
            </div>


            {/* Logout */}
            <div className="text-center">
              <Link
                to="/contact/logout"
                className="inline-block bg-BGColorYellow text-MainBGColorYellow font-bold px-6 py-2 rounded-lg hover:bg-[#7A6752]"
              >
                Log Out
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}

      {/* Modals */}
      {isModalOpen && modalType === 'name' && (
        <ConfirmationModalName data={modalData} isOpen={isModalOpen} onClose={closeModal} />
      )}
      {isModalOpen && modalType === 'address' && (
        <ConfirmationModalAddress data={modalData} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </>
  );
};

export default Profile;
