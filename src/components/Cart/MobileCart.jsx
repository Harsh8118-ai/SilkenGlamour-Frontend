import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import { useAuth } from '../../Store/auth';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const MobileCart = ({ closeCart }) => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentSlot, setAppointmentSlot] = useState('');
  const { user } = useAuth();
  const { isLoggedIn } = useAuth();

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;


  const visitingCharge = 100;
  const totalPriceWithVisitingCharge = totalPrice + visitingCharge;

  const generateOrderMessage = (orderId) => {
    const cartDetails = cartItems.map(item => {
      const itemTotal = item.quantity * item.price;
      return `${item.name} -> ₹${item.price} x ${item.quantity} = ₹${itemTotal}`;
    }).join('\n');

    const userAddress = `\nStreet: ${user.street} ${user.apartmentNumber ? '\nApartment: ' + user.apartmentNumber : ''}\nTown: ${user.town}\nPincode: ${user.pincode}`;

    return `*Order ID:* ${orderId}\n\n${cartDetails}\n\nVisiting Charge: ₹${visitingCharge}\n\n*Total: ₹${totalPriceWithVisitingCharge}*\n\n*Address* :- ${userAddress}`;
  };


  const handleOrderNow = () => {
    setIsModalOpen(true);
  };

  const confirmOrder = async () => {
    if (!appointmentDate || !appointmentSlot) {
      toast.error("Please select date and time slot");
      return;
    }

    const orderId = Math.floor(100000 + Math.random() * 900000).toString();
    const userId = user._id;
    console.log(userId)

    const orderPayload = {
      orderId,
      userId: user._id,
      username: user.username,
      userPhone: user.mobileNumber,
      services: cartItems.map((item) => ({
        serviceId: item._id,
        name: item.name,
        price: item.price,
        duration: item.duration || 60,
        quantity: item.quantity
      })),
      appointmentDate,
      appointmentSlot,
      address: {
        street: user.street,
        city: user.town,
        state: user.state || "",
        pincode: user.pincode,
        latitude: user.latitude || 0,
        longitude: user.longitude || 0,
      },
      status: "pending",
      beautician: "none",
      trackingHistory: [
        {
          status: "pending",
          message: "Order placed by user via WhatsApp",
          timestamp: new Date(),
        },
      ],
    };


    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) throw new Error("Failed to create order");

      const message = generateOrderMessage(orderId);
      const whatsappLink = `https://api.whatsapp.com/send?phone=919266037001&text=${encodeURIComponent(message)}`;
      window.open(whatsappLink, "_blank");

      toast.success("Order placed successfully!");
      setIsModalOpen(false);
      closeCart();
      navigate(`/track-order/${userId}/${orderId}`);
    } catch (error) {
      console.error("Order failed:", error);
      toast.error("Something went wrong while placing the order.");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/contact/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      {isLoggedIn ? (
        <div className="fixed inset-0 z-50 bg-MainBGColorYellow p-4 w-full max-w-xs right-0 shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Your Cart</h2>
            <button
              onClick={closeCart}
              className="text-red-500 text-lg font-extrabold"
            >
              Close
            </button>
          </div>

          {/* Cart items container */}
          <div className="overflow-auto flex-grow">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center mb-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="ml-4">
                      <h3 className="text-sm font-bold text-left">{item.name}</h3>
                      <p className="text-sm font-bold text-gray-500 text-left">₹{item.price} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2 py-1 text-xs font-bold text-white bg-gray-500 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 py-1 text-xs font-bold text-white bg-gray-500 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-500 font-semibold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Fixed Order Now Button */}
          <div className="mt-4">
            <p className="text-left text-gray-600">Visiting Charge: ₹{visitingCharge}</p>
            <p className="text-left font-bold">Total: ₹{totalPriceWithVisitingCharge}</p>
            <button
              onClick={handleOrderNow}
              className={`font-bold py-2 px-4 w-full rounded mb-12 ${cartItems.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
              disabled={cartItems.length === 0}
            >
              {cartItems.length === 0 ? 'Cart is Empty' : 'Order Now'}
            </button>
          </div>

          {/* Modal for Order Confirmation */}
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              title="Confirm Your Appointment"
              onConfirm={confirmOrder}
              onClose={() => setIsModalOpen(false)}
              appointmentDate={appointmentDate}
              setAppointmentDate={setAppointmentDate}
              appointmentSlot={appointmentSlot}
              setAppointmentSlot={setAppointmentSlot}
            />

          )}
        </div>
      ) : null}
    </>
  );
};

export default MobileCart;
