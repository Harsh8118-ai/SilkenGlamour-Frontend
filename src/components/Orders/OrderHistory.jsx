import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/order-history/${userId}`);
        const data = await res.json();

        if (!res.ok) throw new Error();
        setOrders(data);
      } catch (err) {
        toast.error("Failed to fetch order history");
        console.error(err);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#FFF8EF] z-10 pt-16 pb-20 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#6B3F1D] font-semibold mb-4 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>

        <h2 className="text-xl font-bold text-[#6B3F1D] mb-4">Order History</h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600">No past orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.orderId}
              onClick={() => navigate(`/track-order/${userId}/${order.orderId}`)}
              className="bg-white rounded-lg shadow-sm p-4 mb-4 cursor-pointer hover:bg-[#f9f3e9] transition"
            >
              <div className="flex justify-between text-sm text-gray-800 mb-1">
                <span className="font-semibold">Order #{order.orderId}</span>
                <span className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Status: <strong className={`capitalize ${order.status === 'cancelled' ? 'text-red-500' : 'text-green-600'}`}>
                  {order.status.replace('_', ' ')}
                </strong>
              </p>
              <p className="text-sm text-gray-600">
                Appointment: {new Date(order.appointmentDate).toLocaleDateString()} at {order.appointmentSlot}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Total Services: {order.services.length}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
