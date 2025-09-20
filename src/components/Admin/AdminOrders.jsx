import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const statusOptions = ['pending', 'confirmed', 'assigned', 'in_progress', 'completed', 'cancelled'];

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('${BASE_URL}/orders');
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                toast.error('Failed to fetch orders');
            }
        };
        fetchOrders();
    }, []);

    const handleStatusUpdate = async (orderId, newStatus, message, beautician) => {
        if (!newStatus || !message) {
            toast.error("Status and message are required");
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/orders/${orderId}/track`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: newStatus,
                    message,
                    beautician: beautician || ""
                }),
            });

            if (!res.ok) throw new Error();

            const updatedOrder = await res.json();
            setOrders((prev) =>
                prev.map((order) => (order.orderId === orderId ? updatedOrder : order))
            );
            toast.success('Order updated successfully!');
        } catch {
            toast.error('Failed to update order');
        }
    };

    const sendConfirmationWhatsApp = (order) => {
        const address = order.address;
        const serviceDetails = order.services
            .map((s) => `${s.name} - ₹${s.price}`)
            .join('\n');
        const message = `✅ *Your Order is confirmed!*
    
        *Order ID:* ${order.orderId}
        *Appointment:* ${order.appointmentDate?.slice(0, 10)} @ ${order.appointmentSlot}
        *Services:*\n${serviceDetails}

        *Address:* ${address.street}, ${address.city} - ${address.pincode}
        Thank you for booking with us! 💇‍♀️✨`;

        const phone = order.userPhone || "";
        const whatsappLink = `https://api.whatsapp.com/send?phone=91${phone}&text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    };

    const predefinedMessages = [
        "Your order has been confirmed! Our beautician will reach on time. Thank you for booking with Silken Glamour 💇‍♀️✨",
        "Hi! Your service booking is confirmed. Please keep your surroundings clean and payment ready. ✨",
        "Thank you for booking with us! Your beautician has been assigned and will visit at your chosen time slot.",
        "Order confirmed! We appreciate your trust. Looking forward to pampering you. 💆‍♀️",
        "Your appointment is locked! Our expert beautician will see you soon. 💖",
        "Thanks for your order! You’ll get a call shortly for confirmation. For any queries, message us here!",
    ];


    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Admin Orders Panel</h1>
            {orders.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.orderId} className="bg-white rounded shadow p-4">
                            <p><strong>Order ID:</strong> {order.orderId}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p><strong>Appointment:</strong> {order.appointmentDate?.slice(0, 10)} @ {order.appointmentSlot}</p>
                            <p><strong>Services:</strong></p>
                            <ul className="list-disc ml-6">
                                {order.services.map((s, i) => (
                                    <li key={i}>{s.name} - ₹{s.price}</li>
                                ))}
                            </ul>
                            <p><strong>Address:</strong> {order.address.street}, {order.address.city} - {order.address.pincode}</p>
                            <p><strong>User Mobile:</strong> {order.userPhone || 'N/A'}</p>

                            <div className="mt-4 space-y-2">
                                <select
                                    className="border px-2 py-1 w-full rounded"
                                    onChange={(e) => order.newStatus = e.target.value}
                                >
                                    <option value="">Select Status</option>
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                                <select
                                    className="border px-2 py-1 w-full rounded"
                                    onChange={(e) => order.message = e.target.value}
                                >
                                    <option value="">Select a predefined message</option>
                                    {predefinedMessages.map((msg, idx) => (
                                        <option key={idx} value={msg}>{msg}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="Assign Beautician (optional)"
                                    className="border px-2 py-1 w-full rounded"
                                    onChange={(e) => order.beautician = e.target.value}
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={() =>
                                            handleStatusUpdate(order.orderId, order.newStatus, order.message, order.beautician)
                                        }
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => sendConfirmationWhatsApp(order)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Send Confirmation via WhatsApp
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="font-semibold">Tracking History:</p>
                                <ul className="text-sm bg-gray-100 p-2 rounded">
                                    {order.trackingHistory.map((track, idx) => (
                                        <li key={idx}>
                                            <strong>{track.status}</strong> - {new Date(track.timestamp).toLocaleString()}
                                            <br />
                                            {track.message}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
