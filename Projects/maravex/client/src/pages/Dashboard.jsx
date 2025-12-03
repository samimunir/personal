import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const { user } = useAuth();

  // Mock user data
  // const user = {
  //   name: "Alex Morgan",
  //   email: "alex.morgan@example.com",
  //   avatar: "AM",
  //   memberSince: "January 2024",
  //   tier: "Premium",
  // };

  // Mock statistics
  const stats = [
    {
      label: "Total Orders",
      value: "24",
      change: "+12%",
      icon: "📦",
      color: "blue",
    },
    {
      label: "Total Spent",
      value: "$3,847",
      change: "+8%",
      icon: "💰",
      color: "green",
    },
    {
      label: "Wishlist Items",
      value: "7",
      change: "+3",
      icon: "❤️",
      color: "red",
    },
    {
      label: "Rewards Points",
      value: "1,250",
      change: "+150",
      icon: "⭐",
      color: "amber",
    },
  ];

  // Mock recent orders
  const recentOrders = [
    {
      id: "ORD-2024-1847",
      date: "Dec 1, 2024",
      items: "Damascus Artisan Knife Set",
      status: "Delivered",
      amount: "$349",
      image: "🔪",
    },
    {
      id: "ORD-2024-1823",
      date: "Nov 28, 2024",
      items: "Obsidian Edge Sunglasses",
      status: "In Transit",
      amount: "$189",
      image: "🕶️",
    },
    {
      id: "ORD-2024-1801",
      date: "Nov 24, 2024",
      items: "Carbon Elite Chef Knife",
      status: "Delivered",
      amount: "$279",
      image: "🔪",
    },
  ];

  // Quick actions
  const quickActions = [
    {
      title: "Browse Collection",
      description: "Discover new arrivals",
      icon: "🛍️",
      link: "/collections",
    },
    {
      title: "Track Order",
      description: "Check order status",
      icon: "📍",
      link: "/orders",
    },
    {
      title: "My Wishlist",
      description: "View saved items",
      icon: "❤️",
      link: "/wishlist",
    },
    {
      title: "Support",
      description: "Get help & FAQs",
      icon: "💬",
      link: "/support",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "In Transit":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "Processing":
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      default:
        return "text-zinc-400 bg-zinc-400/10 border-zinc-400/20";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pt-18">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(59,130,246,.03) 35px, rgba(59,130,246,.03) 70px)`,
          }}
        ></div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div className="flex items-center space-x-4">
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30"
              >
                <span className="text-white font-black text-2xl">
                  {user.profile.first_name[0]}
                  {user.profile.last_name[0]}
                </span>
              </motion.div>

              {/* User Info */}
              <div>
                <h1 className="text-3xl md:text-4xl font-black mb-1">
                  Welcome back, {user.profile.first_name}{" "}
                  {user.profile.last_name}
                  <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    {user.first_name}
                  </span>
                </h1>
                <p className="text-zinc-500">
                  Member since {user.createdAt.substring(0, 10)}
                </p>
              </div>
            </div>

            {/* Premium Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl backdrop-blur-sm"
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl">👑</span>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">
                    Status
                  </p>
                  {/* <p className="font-bold text-blue-400">{user.tier} Member</p> */}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 relative overflow-hidden group"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{stat.icon}</div>
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-lg">
                    {stat.change}
                  </span>
                </div>
                <p className="text-zinc-500 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-black text-zinc-100">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Recent Orders - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black">Recent Orders</h2>
              <a
                href="/orders"
                className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
              >
                View All →
              </a>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-4 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Product Icon */}
                      <div className="w-12 h-12 bg-zinc-700/50 rounded-lg flex items-center justify-center text-2xl">
                        {order.image}
                      </div>

                      {/* Order Details */}
                      <div className="flex-1">
                        <p className="font-bold text-zinc-100 mb-1">
                          {order.items}
                        </p>
                        <div className="flex items-center space-x-3 text-sm">
                          <span className="text-zinc-500">{order.id}</span>
                          <span className="text-zinc-600">•</span>
                          <span className="text-zinc-500">{order.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status and Amount */}
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                      <span className="font-black text-lg text-blue-400">
                        {order.amount}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions - Takes 1 column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-black mb-6">Quick Actions</h2>

            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.a
                  key={index}
                  href={action.link}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-4 hover:border-blue-500/50 hover:bg-zinc-800/50 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{action.icon}</div>
                    <div className="flex-1">
                      <p className="font-bold text-zinc-100">{action.title}</p>
                      <p className="text-sm text-zinc-500">
                        {action.description}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-zinc-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-black mb-6">Recent Activity</h2>

          <div className="space-y-6">
            {[
              {
                icon: "🎉",
                text: "Welcome bonus activated",
                time: "2 hours ago",
                color: "blue",
              },
              {
                icon: "📦",
                text: "Order #ORD-2024-1847 delivered",
                time: "1 day ago",
                color: "green",
              },
              {
                icon: "❤️",
                text: "Added 2 items to wishlist",
                time: "3 days ago",
                color: "red",
              },
              {
                icon: "⭐",
                text: "Earned 150 reward points",
                time: "5 days ago",
                color: "amber",
              },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="flex items-center space-x-4"
              >
                <div className="w-10 h-10 bg-zinc-800/50 rounded-lg flex items-center justify-center text-xl">
                  {activity.icon}
                </div>
                <div className="flex-1 border-b border-zinc-800/50 pb-4">
                  <p className="text-zinc-100 font-semibold">{activity.text}</p>
                  <p className="text-sm text-zinc-500">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Account Settings Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">⚙️</div>
              <div>
                <h3 className="text-xl font-black mb-1">Account Settings</h3>
                <p className="text-zinc-400">
                  Manage your profile, preferences, and security
                </p>
              </div>
            </div>
            <motion.a
              href="/settings"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
            >
              Go to Settings
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
