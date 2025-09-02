import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Search, Eye, Phone, Mail, Calendar, Package, Star } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { AdminNavigation } from "./AdminNavigation"


export default function AdminUsersPage() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("http://localhost:5000/api/admin/dashboard/user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                const data = await response.json();
                setUsers(data.users);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.includes(searchTerm)
    );

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setIsUserModalOpen(true);
    };

    const getStatusColor = (status) => {
        return status === "active"
            ? "bg-green-100 text-green-800 border-green-200" 
            : "bg-red-100 text-red-800 border-red-200";
    };

    if (loading) {
        return <div className="p-10 text-amber-800">Loading users...</div>;
    }

    if (error) { 
        return <div className="p-10 text-red-600">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <AdminNavigation />

      <main className="ml-0 lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-amber-900 mb-2">User Management</h1>
              <p className="text-amber-700">Manage customer accounts and view user analytics</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                Export Users
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">Add New User</Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-white/80 to-white/60 border-amber-200 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-800">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-900">{users.length}</div>
              <p className="text-xs text-amber-700 mt-1">Registered customers</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/80 to-white/60 border-amber-200 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-800">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-900">
                {users.filter((u) => u.status === "active").length}
              </div>
              <p className="text-xs text-amber-700 mt-1">Currently active</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/80 to-white/60 border-amber-200 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-800">Avg Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-900">
                {Math.round(users.reduce((sum, u) => sum + u.totalOrders, 0) / users.length)}
              </div>
              <p className="text-xs text-amber-700 mt-1">Per customer</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/80 to-white/60 border-amber-200 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-800">Avg Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-900">
                ₹{Math.round(users.reduce((sum, u) => sum + u.totalSpent, 0) / users.length).toLocaleString()}
              </div>
              <p className="text-xs text-amber-700 mt-1">Per customer</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="bg-white/80 border-amber-200 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 h-4 w-4" />
              <Input
                placeholder="Search users by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-amber-200 bg-white/60 focus:bg-white focus:border-amber-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="bg-white/80 border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* User Avatar & Basic Info */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-4 border-amber-200">
                      <AvatarImage src={`/placeholder.svg?height=64&width=64`} />
                      <AvatarFallback className="bg-amber-100 text-amber-800 text-lg font-bold">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-amber-900">{user.name}</h3>
                        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-amber-700">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Stats */}
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Package className="h-4 w-4 text-amber-600" />
                        <span className="text-lg font-bold text-amber-900">{user.totalOrders}</span>
                      </div>
                      <p className="text-xs text-amber-700">Orders</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-amber-900">₹{user.totalSpent.toLocaleString()}</div>
                      <p className="text-xs text-amber-700">Total Spent</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star className="h-4 w-4 text-amber-600" />
                        <span className="text-lg font-bold text-amber-900">{user.avgRating}</span>
                      </div>
                      <p className="text-xs text-amber-700">Avg Rating</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Calendar className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-900">{user.lastOrder}</span>
                      </div>
                      <p className="text-xs text-amber-700">Last Order</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewUser(user)}
                      className="border-amber-300 text-amber-700 hover:bg-amber-100"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User Details Modal */}
        <Dialog isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)}>
          <DialogContent className="bg-gradient-to-b from-amber-50 to-orange-50 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-amber-900">User Details - {selectedUser?.name}</DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-6">
                {/* Personal Info */}
                <div className="bg-white/60 rounded-lg p-4">
                  <h3 className="font-bold text-amber-900 mb-3">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-amber-700">
                        User ID: <span className="font-medium text-amber-900">{selectedUser.id}</span>
                      </p>
                      <p className="text-amber-700">
                        Email: <span className="font-medium text-amber-900">{selectedUser.email}</span>
                      </p>
                      <p className="text-amber-700">
                        Phone: <span className="font-medium text-amber-900">{selectedUser.phone}</span>
                      </p>
                      <p className="text-amber-700">
                        Join Date: <span className="font-medium text-amber-900">{selectedUser.joinDate}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-amber-700">Address:</p>
                      <p className="font-medium text-amber-900">{selectedUser.address}</p>
                    </div>
                  </div>
                </div>

                {/* Order Statistics */}
                <div className="bg-white/60 rounded-lg p-4">
                  <h3 className="font-bold text-amber-900 mb-3">Order Statistics</h3>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-amber-900">{selectedUser.totalOrders}</p>
                      <p className="text-xs text-amber-700">Total Orders</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-amber-900">₹{selectedUser.totalSpent.toLocaleString()}</p>
                      <p className="text-xs text-amber-700">Total Spent</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-amber-900">{selectedUser.avgRating}</p>
                      <p className="text-xs text-amber-700">Avg Rating</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-amber-900">{selectedUser.lastOrder}</p>
                      <p className="text-xs text-amber-700">Last Order</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Customer
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-100"   
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
    )
}
