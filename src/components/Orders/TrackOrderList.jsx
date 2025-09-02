import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';

const TrackOrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/my-order/${userId}`);
        const data = await res.json();

        if (!res.ok) throw new Error();
        setOrders(data);
      } catch (err) {
        toast.error("Failed to fetch orders");
        console.error(err);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#FFF8EF] pt-4 sm:pt-16 sm:pb-24 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#6B3F1D] font-semibold sm:mb-6 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#6B3F1D] mb-6 font-Logo text-center sm:text-left">
          Ongoing Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500 text-base sm:text-lg">No active bookings.</p>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.orderId}
                onClick={() => navigate(`/track-order/${userId}/${order.orderId}`)}
                className="bg-white rounded-2xl shadow-md p-5 cursor-pointer hover:shadow-lg hover:bg-[#fef5e6] transition border border-[#f2e5d5]"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                  <span className="font-semibold text-gray-800 text-base sm:text-lg">
                    Order #{order.orderId}
                  </span>
                  <span className="text-sm sm:text-base text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4 text-gray-600 text-sm sm:text-base">
                  <p>
                    Status:{" "}
                    <span className="font-medium capitalize text-[#6B3F1D]">
                      {order.status.replace('_', ' ')}
                    </span>
                  </p>
                  <p>
                    Appointment:{" "}
                    {new Date(order.appointmentDate).toLocaleDateString()} at {order.appointmentSlot}
                  </p>
                  <p>Total Services: {order.services.length}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrderList;
