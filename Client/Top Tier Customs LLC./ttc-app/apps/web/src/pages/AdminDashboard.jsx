import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Wrench,
  ShoppingBag,
  Calendar,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Search,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const mockStats = {
  totalRevenue: 45789.5,
  revenueChange: 12.5,
  totalOrders: 156,
  ordersChange: 8.3,
  totalBookings: 89,
  bookingsChange: -3.2,
  totalCustomers: 234,
  customersChange: 15.7,
};

const mockRecentOrders = [
  {
    _id: "1",
    orderNumber: "TTC-189",
    customerName: "James Mitchell",
    status: "processing",
    total: 2499.99,
  },
  {
    _id: "2",
    orderNumber: "TTC-188",
    customerName: "Sarah Chen",
    status: "shipped",
    total: 1599.99,
  },
  {
    _id: "3",
    orderNumber: "TTC-187",
    customerName: "Marcus Johnson",
    status: "delivered",
    total: 899.99,
  },
];

const mockUpcomingBookings = [
  {
    _id: "1",
    bookingNumber: "BK-058",
    serviceTitle: "Stage 1 Performance Tune",
    status: "confirmed",
    scheduledDate: "2024-11-15T09:00:00Z",
  },
  {
    _id: "2",
    bookingNumber: "BK-057",
    serviceTitle: "Ceramic Paint Coating",
    status: "pending",
    scheduledDate: "2024-11-20T10:00:00Z",
  },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(
      () => setNotification({ show: false, type: "", message: "" }),
      3000
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      delivered: "text-green-600 bg-green-600/10",
      completed: "text-green-600 bg-green-600/10",
      shipped: "text-blue-600 bg-blue-600/10",
      confirmed: "text-blue-600 bg-blue-600/10",
      processing: "text-yellow-600 bg-yellow-600/10",
      pending: "text-yellow-600 bg-yellow-600/10",
      cancelled: "text-red-600 bg-red-600/10",
    };
    return colors[status] || "text-gray-600 bg-gray-600/10";
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sidebarItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: "products",
      label: "Products",
      icon: <Package className="w-5 h-5" />,
    },
    { id: "services", label: "Services", icon: <Wrench className="w-5 h-5" /> },
    {
      id: "orders",
      label: "Orders",
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      id: "bookings",
      label: "Bookings",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: "customers",
      label: "Customers",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 flex-shrink-0">
        <div className="p-6">
          <div className="text-3xl font-black mb-8">
            <span className="text-white">TT</span>
            <span className="text-red-600">C</span>
            <div className="text-xs text-gray-400 font-normal mt-1">
              Admin Dashboard
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  showNotification("info", `Switched to ${item.label} section`);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === item.id
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="font-semibold">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-gray-800">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-red-600 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-semibold">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 px-8 py-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black mb-1">
                {sidebarItems.find((item) => item.id === activeSection)?.label}
              </h1>
              <p className="text-gray-400">Manage your {activeSection}</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors w-64"
              />
            </div>
          </div>
        </header>

        {/* Notification Toast */}
        {notification.show && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div
              className={`rounded-lg p-4 flex items-center space-x-3 shadow-2xl border ${
                notification.type === "success"
                  ? "bg-green-600/10 border-green-600/30"
                  : notification.type === "error"
                  ? "bg-red-600/10 border-red-600/30"
                  : "bg-blue-600/10 border-blue-600/30"
              }`}
            >
              {notification.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : notification.type === "error" ? (
                <AlertCircle className="w-5 h-5 text-red-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-blue-600" />
              )}
              <p
                className={
                  notification.type === "success"
                    ? "text-green-600"
                    : notification.type === "error"
                    ? "text-red-600"
                    : "text-blue-600"
                }
              >
                {notification.message}
              </p>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-8">
          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Revenue */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-gray-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="w-10 h-10 text-green-600" />
                    <span
                      className={`flex items-center text-sm font-bold ${
                        mockStats.revenueChange > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {mockStats.revenueChange > 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(mockStats.revenueChange)}%
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
                  <p className="text-3xl font-black">
                    £{mockStats.totalRevenue.toLocaleString()}
                  </p>
                </div>

                {/* Total Orders */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-gray-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <ShoppingBag className="w-10 h-10 text-blue-600" />
                    <span
                      className={`flex items-center text-sm font-bold ${
                        mockStats.ordersChange > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {mockStats.ordersChange > 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(mockStats.ordersChange)}%
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Total Orders</p>
                  <p className="text-3xl font-black">{mockStats.totalOrders}</p>
                </div>

                {/* Total Bookings */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-gray-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Calendar className="w-10 h-10 text-yellow-600" />
                    <span
                      className={`flex items-center text-sm font-bold ${
                        mockStats.bookingsChange > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {mockStats.bookingsChange > 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(mockStats.bookingsChange)}%
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Total Bookings</p>
                  <p className="text-3xl font-black">
                    {mockStats.totalBookings}
                  </p>
                </div>

                {/* Total Customers */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-gray-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-10 h-10 text-red-600" />
                    <span
                      className={`flex items-center text-sm font-bold ${
                        mockStats.customersChange > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {mockStats.customersChange > 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(mockStats.customersChange)}%
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Total Customers</p>
                  <p className="text-3xl font-black">
                    {mockStats.totalCustomers}
                  </p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-gray-800 p-6">
                  <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
                  <div className="space-y-3">
                    {mockRecentOrders.map((order) => (
                      <div
                        key={order._id}
                        className="bg-black/50 border border-gray-800 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">
                            {order.orderNumber}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">
                          {order.customerName}
                        </p>
                        <p className="text-lg font-bold text-red-600 mt-2">
                          £{order.total.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Bookings */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-gray-800 p-6">
                  <h3 className="text-xl font-bold mb-4">Upcoming Bookings</h3>
                  <div className="space-y-3">
                    {mockUpcomingBookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="bg-black/50 border border-gray-800 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">
                            {booking.bookingNumber}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-1">
                          {booking.serviceTitle}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDateTime(booking.scheduledDate)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other sections */}
          {activeSection !== "overview" && (
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-gray-800 p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                {sidebarItems.find((i) => i.id === activeSection)?.label}{" "}
                Section
              </h3>
              <p className="text-gray-400 mb-6">
                This section will be implemented in separate components (Part 2,
                3, etc.)
              </p>
              <p className="text-sm text-gray-500">
                Click on Overview in the sidebar to see the completed dashboard
                stats and activity.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
