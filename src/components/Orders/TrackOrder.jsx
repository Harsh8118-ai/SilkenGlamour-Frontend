import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MapPin, Clock, ArrowLeft } from 'lucide-react';

const TrackOrder = () => {
  const { userId, orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${BASE_URL}/orders/${userId}/${orderId}`);
        const data = await res.json();

        if (!res.ok || !data) {
          toast.error("Order not found.");
          return;
        }

        setOrder(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch order.");
      }
    };

    fetchOrder();
  }, [userId, orderId]);

  if (!order) return <p className="p-4">Loading...</p>;

  const visitingCharge = 100;
  const totalAmount =
    order.services.reduce((sum, s) => sum + s.price * (s.quantity || 1), 0) + visitingCharge;

  return (
    <div className="bg-[#FFF8EF] min-h-screen w-full px-4 py-6 pt-4 sm:pt-16 pb-20">
      <div className="w-full max-w-2xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-[#6B3F1D] hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>

        <h1 className="text-lg md:text-xl font-semibold mb-4 text-[#6B3F1D]">
          Track Order - #{order.orderId}
        </h1>

        {/* Appointment Info */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <p className="flex items-center text-sm text-gray-600 mb-2">
            <Clock className="w-4 h-4 mr-2 text-[#D97706]" />
            {new Date(order.appointmentDate).toLocaleDateString()} at {order.appointmentSlot}
          </p>
          <p className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-[#D97706]" />
            Home Service
          </p>
        </div>

        {/* Services Booked */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="font-semibold text-[#6B3F1D] mb-2">Services Booked</h2>
          {order.services.map((service, index) => (
            <div key={index} className="flex justify-between text-sm text-gray-800 mb-1">
              <span className="w-[60%]">{service.name}</span>
              <span className="text-right w-[40%]">
                ₹{service.price} x {service.quantity || 1} = ₹
                {service.price * (service.quantity || 1)}
              </span>
            </div>
          ))}

          {/* Visiting charge and total */}
          <div className="h-px bg-gray-200 my-2"></div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Visiting Charge</span>
            <span>₹{visitingCharge}</span>
          </div>
          <div className="h-px bg-gray-200 my-2"></div>
          <div className="flex justify-between font-semibold text-[#6B3F1D] text-sm">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        {/* Service Address */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="font-semibold text-[#6B3F1D] mb-2">Service Address</h2>
          <p className="text-sm text-gray-800 leading-5">
            {order.address.street}, {order.address.city}, {order.address.pincode}
          </p>
        </div>

        {/* Tracking History */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="font-semibold text-[#6B3F1D] mb-2">Tracking History</h2>
          <div className="space-y-4">
            {order.trackingHistory.map((track, index) => (
              <div key={index} className="text-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                  <span
                    className={`font-semibold ${index === 0 ? "text-green-600" : "text-yellow-600"
                      }`}
                  >
                    {track.status.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                  <span className="text-xs text-gray-500 mt-1 md:mt-0 md:text-right">
                    {new Date(track.timestamp).toLocaleString('en-IN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="text-gray-700">{track.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
