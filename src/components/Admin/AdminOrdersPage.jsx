import { useEffect, useState } from "react"
import {
  Search,
  Filter,
  Eye,
  Edit,
  Phone,
  MapPin,
  Calendar,
  Clock,
  User,
  MoreVertical,
  Download,
} from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Textarea } from "../ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { AdminNavigation } from "./AdminNavigation"
import { toast } from "react-toastify"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [orderStatus, setOrderStatus] = useState("")
  const [trackingMessage, setTrackingMessage] = useState("")
  const [assignedBeautician, setAssignedBeautician] = useState("");

  const statusOptions = ['pending', 'confirmed', 'completed', 'cancelled'];

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;


  const predefinedMessages = [
    "Your order has been confirmed! Our beautician will reach on time. Thank you for booking with Silken Glamour 💇‍♀️✨",
    "Hi! Your service booking is confirmed. Please keep your surroundings clean and payment ready. ✨",
    "Thank you for booking with us! Your beautician has been assigned and will visit at your chosen time slot.",
    "Order confirmed! We appreciate your trust. Looking forward to pampering you. 💆‍♀️",
    "Your appointment is locked! Our expert beautician will see you soon. 💖",
    "Thanks for your order! You’ll get a call shortly for confirmation. For any queries, message us here!",
  ];

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${BASE_URL}/orders`)
        if (!res.ok) throw new Error("Failed to fetch orders")
        const data = await res.json()
        setOrders(data)
        console.log("Fetched Orders:", data) // Log fetched data for verification
      } catch (error) {
        toast.error("Error fetching orders")
        console.error("Fetch error:", error)
      }
    }

    fetchOrders()
  }, [])

  // Filter logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userPhone?.toLowerCase().includes(searchTerm.toLowerCase()) // Search by userPhone if no username
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesCategory =
      categoryFilter === "all" ||
      order.services.some((s) => s.category === categoryFilter)

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Status Color
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800 border-green-200"
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed": return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "cancelled": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPaymentStatusColor = (status) => {
    // Assuming payment status might come from a different field or not be present
    switch (status) {
      case "paid": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "refunded": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  // Modal Trigger
  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setOrderStatus(order.status)
    setTrackingMessage("")
    setAssignedBeautician(order.beautician?.name || ""); // Use order.beautician.name
    setIsOrderModalOpen(true)
  }

  // Backend Update + Toast
  const handleUpdateOrder = async () => {
    if (!selectedOrder || !orderStatus || !trackingMessage) {
      toast.error("Status and message are required")
      return
    }

    try {
      // Use orderId from the selectedOrder, which corresponds to your backend
      const res = await fetch(
        `${BASE_URL}/orders/${selectedOrder.orderId}/track`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: orderStatus,
            message: trackingMessage,
            beautician: assignedBeautician // Pass the beautician name
          }),
        }
      )

      if (!res.ok) throw new Error("Failed to update order on server")
      const updatedOrder = await res.json()
      console.log("Updated Order from API:", updatedOrder)

      setOrders((prev) =>
        prev.map((o) =>
          o.orderId === updatedOrder.orderId ? updatedOrder : o
        )
      )
      toast.success("Order updated successfully")
      setIsOrderModalOpen(false)
      setTrackingMessage("")
      setAssignedBeautician("");
    } catch (error) {
      toast.error("Failed to update order")
      console.error("Update error:", error)
    }
  }

  // WhatsApp Confirmation
  const sendConfirmationWhatsApp = (order) => {
    // Access address directly from order
    const street = order.address?.street || 'N/A';
    const city = order.address?.city || 'N/A';
    const pincode = order.address?.pincode || 'N/A';
    const addressDetails = `${street}, ${city} - ${pincode}`;

    const serviceDetails = order.services
      .map((s) => `${s.name} - ₹${s.price}`)
      .join('\n');

    const message = `✅ *Your Order is confirmed!*
      
*Order ID:* ${order.orderId}
*Appointment:* ${order.appointmentDate?.slice(0, 10)} @ ${order.appointmentSlot}
*Services:*\n${serviceDetails}

*Address:* ${addressDetails}
Thank you for booking with us! 💇‍♀️✨`;

    const phone = order.userPhone || "";
    const formattedPhone = phone.startsWith('91') ? phone : `91${phone}`;
    console.log(phone)
    console.log(formattedPhone)
    const whatsappLink = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  // Categories for filtering (unchanged)
  const categories = ["all", "Facial", "Waxing", "Makeup", "Hair Care", "Beauty", "Massage"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <AdminNavigation />

      <main className="ml-0 lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-amber-900 mb-2">Order Management</h1>
              <p className="text-amber-700">Manage and track all customer orders</p>
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              Export Orders
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-white/80 border-amber-200 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 h-4 w-4" />
                <Input
                  placeholder="Search orders or customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-amber-200 bg-white/60 focus:bg-white focus:border-amber-400"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-amber-200 bg-white/60">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>{status.replace("_", " ")}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="border-amber-200 bg-white/60">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <p className="text-center text-amber-700 text-lg">No orders found.</p>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order._id} className="bg-white/80 border-amber-200 shadow-lg hover:shadow-xl transition-shadow"> {/* Changed key to _id */}
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-amber-900">#{order.orderId}</h3> {/* Use orderId */}
                        <Badge className={getStatusColor(order.status)}>{order.status.replace("_", " ")}</Badge>

                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <User className="h-4 w-4 text-amber-600" />
                            <span className="font-medium text-amber-900">{order.username || "N/A"}</span> {/* Display userId or a placeholder */}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Phone className="h-4 w-4 text-amber-600" />
                            <span className="text-amber-700">{order.userPhone || "N/A"}</span> {/* Use userPhone */}
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-amber-600 mt-0.5" />
                            <span className="text-amber-700 text-sm">
                              {`${order.address?.street || ''}, ${order.address?.city || ''} - ${order.address?.pincode || ''}`.trim().replace(/^,|-$/g, '') || "N/A"}
                            </span> {/* Safely access address components */}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-4 w-4 text-amber-600" />
                            <span className="text-amber-700">{order.appointmentDate?.slice(0, 10)}</span> {/* Use appointmentDate */}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-amber-600" />
                            <span className="text-amber-700">{order.appointmentSlot}</span> {/* Use appointmentSlot */}
                          </div>
                          <div className="text-amber-800">
                            <span className="font-medium">Beautician: </span>
                            {order.beautician?.name || "Unassigned"}
                          </div>
                        </div>
                      </div>

                      {/* Services */}
                      <div className="mt-4">
                        <h4 className="font-medium text-amber-900 mb-2">Services:</h4>
                        <div className="flex flex-wrap gap-2">
                          {order.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="border-amber-300 text-amber-700">
                              {service.name} - ₹{service.price}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end space-y-1.5">
                      <div className="text-right leading-none">
                        <p className="text-2xl font-bold text-amber-900">₹{order.total || order.services.reduce((acc, s) => acc + s.price, 0)}</p>
                        <p className="text-sm text-amber-700">Total Amount</p>
                      </div>

                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewOrder(order)}
                          className="border-amber-300 text-amber-700 hover:bg-amber-100 bg-transparent px-3 py-1 h-auto"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-amber-300 text-amber-700 hover:bg-amber-100 bg-transparent px-2 py-1 h-auto"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleViewOrder(order)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => window.open(`tel:${order.userPhone || ''}`, '_self')}
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Call Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => sendConfirmationWhatsApp(order)}
                            >
                              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="h-4 w-4 mr-2" />
                              Send WhatsApp
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-red-600">Cancel Order</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Order Details Modal */}
        <Dialog isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)}>
          <DialogContent className="bg-gradient-to-b from-amber-50 to-orange-50 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-amber-900">Order Details - #{selectedOrder?.orderId}</DialogTitle> {/* Use orderId */}
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                {/* Customer Info */}
                <div className="bg-white/60 rounded-lg p-4">
                  <h3 className="font-bold text-amber-900 mb-3">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-amber-700">
                        Name: <span className="font-medium text-amber-900">Customer (ID: {selectedOrder.userId || "N/A"})</span> {/* Display userId */}
                      </p>
                      <p className="text-amber-700">
                        Phone: <span className="font-medium text-amber-900">{selectedOrder.userPhone || "N/A"}</span> {/* Use userPhone */}
                      </p>
                      <p className="text-amber-700">
                        Email: <span className="font-medium text-amber-900">N/A</span> {/* No email in your data, default to N/A */}
                      </p>
                    </div>
                    <div>
                      <p className="text-amber-700">Address:</p>
                      <p className="font-medium text-amber-900">
                        {`${selectedOrder.address?.street || ''}, ${selectedOrder.address?.city || ''} - ${selectedOrder.address?.pincode || ''}`.trim().replace(/^,|-$/g, '') || "N/A"}
                      </p> {/* Safely access address components */}
                    </div>
                  </div>
                </div>

                {/* Services and total amount */}
                <div className="bg-white/60 rounded-lg p-4">
                  <h3 className="font-bold text-amber-900 mb-3">Order Summary</h3>
                  <ul className="list-disc ml-4 text-amber-700">
                    {selectedOrder.services.map((s, i) => (
                      <li key={i}>{s.name} - ₹{s.price}</li>
                    ))}
                  </ul>
                  <p className="text-lg font-bold text-amber-900 mt-4">₹{selectedOrder.total || selectedOrder.services.reduce((acc, s) => acc + s.price, 0)}</p>
                </div>


                {/* Order Status Update */}
                <div className="bg-white/60 rounded-lg p-4">
                  <h3 className="font-bold text-amber-900 mb-3">Update Order Status</h3>
                  <div className="space-y-4">
                    <Select value={orderStatus} onValueChange={setOrderStatus}>
                      <SelectTrigger className="border-amber-200">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>{status.replace("_", " ")}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={trackingMessage} onValueChange={setTrackingMessage}>
                      <SelectTrigger className="border-amber-200">
                        <SelectValue placeholder="Select a predefined message" />
                      </SelectTrigger>
                      <SelectContent>
                        {predefinedMessages.map((msg, idx) => (
                          <SelectItem key={idx} value={msg}>{msg}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Input
                      type="text"
                      placeholder="Assign Beautician (optional)"
                      value={assignedBeautician}
                      onChange={(e) => setAssignedBeautician(e.target.value)}
                      className="border-amber-200"
                    />

                    <div className="flex gap-2">
                      <Button onClick={handleUpdateOrder} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
                        Update Order
                      </Button>
                      <Button onClick={() => sendConfirmationWhatsApp(selectedOrder)} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="h-4 w-4 mr-2 filter invert" />
                        Send WhatsApp Confirmation
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Tracking History */}
                <div className="bg-white/60 rounded-lg p-4">
                  <h3 className="font-bold text-amber-900 mb-3">Tracking History</h3>
                  <ul className="text-sm bg-amber-50 p-3 rounded">
                    {selectedOrder.trackingHistory && selectedOrder.trackingHistory.length > 0 ? (
                      selectedOrder.trackingHistory.map((track, idx) => (
                        <li key={idx} className="mb-2 last:mb-0">
                          <strong className="text-amber-800">{track.status.replace("_", " ")}</strong> - {new Date(track.timestamp).toLocaleString()}
                          <br />
                          <span className="text-amber-700">{track.message}</span>
                          {track.beautician && <span className="text-amber-600"> (Beautician: {track.beautician})</span>}
                        </li>
                      ))
                    ) : (
                      <p className="text-amber-700">No tracking history available.</p>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}