import { useState, useEffect } from "react"
import { Users, DollarSign, TrendingUp, Clock, Star, Package, UserCheck, Activity, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { AdminNavigation } from "./AdminNavigation"
import { PopularServicesChart } from "./PopularServicesChart"
import { useAuth } from "../../Store/auth"

export default function AdminDashboard() {
    const [timeRange, setTimeRange] = useState("7d")
    const { user, token } = useAuth();
    const [dashboardStats, setDashboardStats] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("token");
                const BASE_URL = import.meta.env.VITE_BACKEND_URL;


                const res = await fetch(`${BASE_URL}/admin/dashboard`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Unauthorized");
                }

                const data = await res.json();
                console.log("Dashboard Data:", data);
                setDashboardStats(data);
                setRecentOrders(data.recentOrders);
            } catch (error) {
                console.error("Error fetching dashboard:", error);
            }
        };
        fetchDashboardData();
    }, [token]);

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-700";
            case "in_progress":
                return "bg-yellow-100 text-yellow-700";
            case "pending":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    if (!dashboardStats) return <div className="p-8 text-center text-amber-700 font-semibold">Loading dashboard...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
            <AdminNavigation />

            <main className="ml-0 lg:ml-64 p-4 lg:p-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-amber-900 mb-2">Admin Dashboard</h1>
                            <p className="text-amber-700">
                                Welcome back! Here's what's happening with your salon today.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Select value={timeRange} onValueChange={setTimeRange}>
                                <SelectTrigger className="w-32 border-amber-300 bg-white/80">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1d">Today</SelectItem>
                                    <SelectItem value="7d">7 Days</SelectItem>
                                    <SelectItem value="30d">30 Days</SelectItem>
                                    <SelectItem value="90d">90 Days</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                                <Activity className="h-4 w-4 mr-2" />
                                Live View
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Revenue Card */}
                    <Card className="bg-gradient-to-br from-white/80 to-white/60 border-amber-200 shadow-lg hover:shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-amber-800">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-amber-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-amber-900">
                                ₹{dashboardStats.totalRevenue.toLocaleString()}
                            </div>
                            <div className="flex items-center text-xs text-green-600 mt-1">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                +{dashboardStats.revenueGrowth}% from last month
                            </div>
                        </CardContent>
                    </Card>

                    {/* Orders Card */}
                    <Card className="bg-gradient-to-br from-white/80 to-white/60 border-amber-200 shadow-lg hover:shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-amber-800">Total Orders</CardTitle>
                            <Package className="h-4 w-4 text-amber-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-amber-900">{dashboardStats.totalOrders}</div>
                            <div className="flex items-center text-xs text-green-600 mt-1">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                +{dashboardStats.orderGrowth}% from last month
                            </div>
                        </CardContent>
                    </Card>

                    {/* Active Users */}
                    <Card className="bg-gradient-to-br from-white/80 to-white/60 border-amber-200 shadow-lg hover:shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-amber-800">Active Users</CardTitle>
                            <Users className="h-4 w-4 text-amber-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-amber-900">{dashboardStats.totalUsers}</div>
                            <p className="text-xs text-amber-700 mt-1">Registered customers</p>
                        </CardContent>
                    </Card>

                    {/* Rating */}
                    <Card className="bg-gradient-to-br from-white/80 to-white/60 border-amber-200 shadow-lg hover:shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-amber-800">Avg Rating</CardTitle>
                            <Star className="h-4 w-4 text-amber-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-amber-900">{dashboardStats.avgRating}</div>
                            <p className="text-xs text-amber-700 mt-1">Customer satisfaction</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-gradient-to-br from-yellow-100/80 to-yellow-50/60 border-yellow-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-yellow-800">pending Orders</p>
                                    <p className="text-2xl font-bold text-yellow-900">{dashboardStats.pendingOrders}</p>
                                </div>
                                <Clock className="h-8 w-8 text-yellow-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-100/80 to-green-50/60 border-green-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-green-800">completed Today</p>
                                    <p className="text-2xl font-bold text-green-900">{dashboardStats.completedToday}</p>
                                </div>
                                <UserCheck className="h-8 w-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-100/80 to-blue-50/60 border-blue-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-blue-800">In Progress</p>
                                    <p className="text-2xl font-bold text-blue-900">{dashboardStats.inProgress || 0}</p>
                                </div>
                                <Activity className="h-8 w-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-white/80 border-amber-200 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-amber-900">Popular Services</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PopularServicesChart />
                        </CardContent>
                    </Card>

                    <Card className="bg-white/80 border-amber-200 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-amber-900">Recent Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between p-3 bg-amber-50/50 rounded-lg"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-amber-900">#{order.id}</span>
                                                <span
                                                    className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(
                                                        order.status
                                                    )}`}
                                                >
                                                    {order.status.replace("_", " ")}
                                                </span>
                                            </div>
                                            <p className="text-sm text-amber-800">{order.customer}</p>
                                            <p className="text-xs text-amber-600">
                                                {order.service} • {order.time}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-amber-900">₹{order.amount}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}