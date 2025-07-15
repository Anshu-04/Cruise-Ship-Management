import React, { useState } from "react";
import { Link } from "react-router-dom";

const VoyagerDashboard = () => {
  const [quickStats] = useState({
    activeOrders: 3,
    upcomingBookings: 2,
    totalSpent: 450,
    loyaltyPoints: 1250,
  });

  const quickActions = [
    {
      title: "Order Food",
      description: "Browse and order from our catering menu",
      icon: "🍽️",
      link: "/orders/catering",
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Stationery Orders",
      description: "Order office supplies and materials",
      icon: "📝",
      link: "/orders/stationery",
      color: "bg-pink-100 text-pink-800",
    },
    {
      title: "Book Movie",
      description: "Reserve seats for movie screenings",
      icon: "🎬",
      link: "/bookings/movie",
      color: "bg-purple-100 text-purple-800",
    },
    {
      title: "Resort Booking",
      description: "Book resort facilities and activities",
      icon: "🏖️",
      link: "/bookings/resort",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Fitness Center",
      description: "Schedule fitness sessions and classes",
      icon: "💪",
      link: "/bookings/fitness",
      color: "bg-red-100 text-red-800",
    },
    {
      title: "Party Hall",
      description: "Book event spaces for celebrations",
      icon: "🎉",
      link: "/bookings/party",
      color: "bg-pink-100 text-pink-800",
    },
  ];

  const recentActivity = [
    {
      type: "order",
      item: "Catering Order #CO-001",
      status: "Delivered",
      time: "2 hours ago",
    },
    {
      type: "booking",
      item: "Movie: Avatar 3",
      status: "Confirmed",
      time: "1 day ago",
    },
    {
      type: "order",
      item: "Stationery Order #SO-005",
      status: "Pending",
      time: "2 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">📦</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Orders
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {quickStats.activeOrders}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">📅</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Upcoming Bookings
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {quickStats.upcomingBookings}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Spent
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    ${quickStats.totalSpent}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">⭐</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Loyalty Points
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {quickStats.loyaltyPoints}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="relative rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
              >
                <div className="flex items-center">
                  <div
                    className={`flex-shrink-0 p-2 rounded-lg ${action.color}`}
                  >
                    <span className="text-xl">{action.icon}</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      {action.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <span className="text-lg mr-3">
                    {activity.type === "order" ? "📦" : "📅"}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.item}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    activity.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : activity.status === "Confirmed"
                      ? "bg-pink-100 text-pink-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoyagerDashboard;
