import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import { useAuth } from '../../Store/auth'; // Import useAuth to fetch user data
import Modal from './Modal';
import { Link, useNavigate } from 'react-router-dom';

const RightCart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice } = useContext(CartContext);
  const { user } = useAuth(); // Access user data including address from AuthContext
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  
  const visitingCharge = 100; // Fixed visiting charge of ₹100
  const totalPriceWithVisitingCharge = totalPrice + visitingCharge; // Add visiting charge to the total price

  const generateOrderMessage = () => {
    const cartDetails = cartItems.map(item => {
      const itemTotal = item.quantity * item.price;
      return `${item.name} -> ₹${item.price} x ${item.quantity} = ₹${itemTotal}`;
    }).join('\n');

    // Include the user's address in the WhatsApp message
    const userAddress = `\nStreet: ${user.street} ${user.apartmentNumber ? '\nApartment: ' + user.apartmentNumber : ''}\nTown: ${user.town}\nPincode: ${user.pincode}`;
    
    return `${cartDetails}\n\nVisiting Charge: ₹${visitingCharge}\n\n*Total: ₹${totalPriceWithVisitingCharge}*\n\n*Address* :- ${userAddress}`;
  };

  const handleOrderNow = () => {
    setIsModalOpen(true);
  };

  const confirmOrder = () => {
    const message = generateOrderMessage();
    const whatsappLink = `https://api.whatsapp.com/send?phone=919266037001&text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
    setIsModalOpen(false); // Close the modal after confirming
  };

  return (
    <>
    {isLoggedIn ? (
    <div className='hidden sm:flex flex-col sticky top-16 h-screen  p-4 max-w-sm right-0'>
      <div className="w-full max-w-sm p-6 bg-MainBGColorYellow shadow-xl rounded-lg flex flex-col h-full">
        <h2 className="text-lg font-bold text-center mb-4">My Cart</h2>
        <div className="flex-grow overflow-auto">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="ml-4 flex-grow">
                  <h3 className="text-sm font-bold text-left">{item.name}</h3>
                  <p className="text-xs text-gray-500 text-left">₹{item.price} x {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 text-xs font-bold text-white bg-gray-500 rounded">
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)} className="px-2 py-1 text-xs font-bold text-white bg-gray-500 rounded">
                    +
                  </button>
                  <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:underline">
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-4">
          <div className="border-t pt-4">
            {/* Display Visiting Charge */}
            <p className="text-left text-gray-600">Visiting Charge: ₹{visitingCharge}</p>
            {/* Display Total Price including Visiting Charge */}
            <h3 className="text-lg font-bold text-center">Total: ₹{totalPriceWithVisitingCharge}</h3>
          </div>
          <button
            onClick={handleOrderNow}
            className={`mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 w-full rounded mb-16 ${
              cartItems.length === 0 ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={cartItems.length === 0}
          >
            {cartItems.length === 0 ? 'Cart is Empty' : 'Order Now'}
          </button>
        </div>
      </div>

      {/* Modal for Order Confirmation */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title="Confirm Your Order"
          message={generateOrderMessage()}
          onConfirm={confirmOrder}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
    ) : (
    <div className='hidden sm:flex flex-col justify-center items-center sticky top-16 h-screen p-4 max-w-sm right-0'>
      <div className="w-full max-w-sm p-6 bg-MainBGColorYellow shadow-xl rounded-lg flex flex-col h-full">
        <div className='my-auto text-center'>
          <p className='text-black text-xl text-center font-bold'>Please Login First</p>
          <Link to="/contact/login">
            <button className='bg-BGColorYellow mt-3 text-lg px-2 rounded-lg mx-auto'>Login Now</button>
          </Link>
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default RightCart;
