import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Package,
  User,
  MapPin,
  Filter,
  Search,
  RefreshCw,
  Bell,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";

// API Service Functions
const API_BASE_URL = "http://localhost:5000/api";

const apiService = {
  // Staff-related API calls
  getStaffTasks: async (staffId) => {
    const response = await fetch(`${API_BASE_URL}/staff/${staffId}/tasks`);
    if (!response.ok) throw new Error("Failed to fetch staff tasks");
    return response.json();
  },

  updateTaskStatus: async (taskId, status) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Failed to update task status");
    return response.json();
  },

  getStaffOrders: async (staffId) => {
    const response = await fetch(`${API_BASE_URL}/staff/${staffId}/orders`);
    if (!response.ok) throw new Error("Failed to fetch staff orders");
    return response.json();
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Failed to update order status");
    return response.json();
  },

  getCurrentAssignments: async (staffId) => {
    const response = await fetch(
      `${API_BASE_URL}/staff/${staffId}/assignments`
    );
    if (!response.ok) throw new Error("Failed to fetch current assignments");
    return response.json();
  },
};

// Staff Dashboard Main Component
const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState("tasks");
  const [staffId] = useState(1); // In real app, get from auth context
  const [notifications, setNotifications] = useState(3);

  const tabs = [
    { id: "tasks", label: "Tasks", icon: CheckCircle },
    { id: "orders", label: "Orders", icon: Package },
    { id: "assignments", label: "Assignments", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Staff Dashboard
              </h1>
              <p className="text-gray-600">Welcome back, Sarah Johnson</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-pink-600" />
                {notifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </div>
              <div className="h-8 w-8 bg-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">SJ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-pink-500 text-pink-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "tasks" && <TaskManagement staffId={staffId} />}
        {activeTab === "orders" && <OrderProcessing staffId={staffId} />}
        {activeTab === "assignments" && (
          <CurrentAssignments staffId={staffId} />
        )}
      </div>
    </div>
  );
};

// Task Management Component
const TaskManagement = ({ staffId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const mockTasks = [
    {
      id: 1,
      title: "Clean Pool Area",
      description: "Deep cleaning of main pool deck and surrounding areas",
      priority: "high",
      status: "pending",
      dueDate: "2024-07-14T10:00:00Z",
      location: "Pool Deck",
      estimatedTime: 120,
    },
    {
      id: 2,
      title: "Restock Mini Bar - Room 301",
      description: "Refill mini bar with standard items",
      priority: "medium",
      status: "in_progress",
      dueDate: "2024-07-13T14:00:00Z",
      location: "Deck 3",
      estimatedTime: 30,
    },
    {
      id: 3,
      title: "Prepare Welcome Package",
      description: "Prepare welcome packages for new guests arriving today",
      priority: "high",
      status: "completed",
      dueDate: "2024-07-13T09:00:00Z",
      location: "Guest Services",
      estimatedTime: 45,
    },
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        // const data = await apiService.getStaffTasks(staffId);
        // setTasks(data);
        setTasks(mockTasks); // Using mock data for demo
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [staffId]);

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      await apiService.updateTaskStatus(taskId, newStatus);
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-pink-100 text-pink-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {task.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{task.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{task.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{task.estimatedTime} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                {task.status === "pending" && (
                  <button
                    onClick={() => handleUpdateStatus(task.id, "in_progress")}
                    className="bg-pink-600 text-white px-3 py-1 rounded-md text-sm hover:bg-pink-700"
                  >
                    Start
                  </button>
                )}
                {task.status === "in_progress" && (
                  <button
                    onClick={() => handleUpdateStatus(task.id, "completed")}
                    className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
                  >
                    Complete
                  </button>
                )}
                <button className="text-gray-400 hover:text-gray-600">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No tasks found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

// Order Processing Component
const OrderProcessing = ({ staffId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const mockOrders = [
    {
      id: 1,
      guestName: "John Smith",
      roomNumber: "205",
      items: [
        { name: "Club Sandwich", quantity: 2, price: 18.99 },
        { name: "Caesar Salad", quantity: 1, price: 12.99 },
      ],
      total: 50.97,
      status: "pending",
      orderTime: "2024-07-13T12:30:00Z",
      type: "room_service",
    },
    {
      id: 2,
      guestName: "Maria Garcia",
      roomNumber: "301",
      items: [
        { name: "Champagne", quantity: 1, price: 89.99 },
        { name: "Chocolate Strawberries", quantity: 1, price: 24.99 },
      ],
      total: 114.98,
      status: "preparing",
      orderTime: "2024-07-13T13:15:00Z",
      type: "room_service",
    },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // const data = await apiService.getStaffOrders(staffId);
        // setOrders(data);
        setOrders(mockOrders); // Using mock data for demo
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [staffId]);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await apiService.updateOrderStatus(orderId, newStatus);
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const filteredOrders = orders.filter(
    (order) => filter === "all" || order.status === filter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-pink-100 text-pink-800";
      case "ready":
        return "bg-green-100 text-green-800";
      case "delivered":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order.id}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Guest: {order.guestName}</p>
                  <p>Room: {order.roomNumber}</p>
                  <p>Time: {new Date(order.orderTime).toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  ${order.total}
                </p>
                <p className="text-sm text-gray-500">
                  {order.type.replace("_", " ")}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t pt-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Items:</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
              {order.status === "pending" && (
                <button
                  onClick={() => handleUpdateOrderStatus(order.id, "preparing")}
                  className="bg-pink-600 text-white px-4 py-2 rounded-md text-sm hover:bg-pink-700"
                >
                  Start Preparing
                </button>
              )}
              {order.status === "preparing" && (
                <button
                  onClick={() => handleUpdateOrderStatus(order.id, "ready")}
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
                >
                  Mark Ready
                </button>
              )}
              {order.status === "ready" && (
                <button
                  onClick={() => handleUpdateOrderStatus(order.id, "delivered")}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700"
                >
                  Mark Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No orders found</p>
        </div>
      )}
    </div>
  );
};

// Current Assignments Component
const CurrentAssignments = ({ staffId }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockAssignments = [
    {
      id: 1,
      title: "Pool Maintenance Supervisor",
      department: "Maintenance",
      shift: "Morning (6:00 AM - 2:00 PM)",
      location: "Pool Area",
      responsibilities: [
        "Oversee pool cleaning operations",
        "Monitor water quality",
        "Coordinate with cleaning staff",
        "Report maintenance issues",
      ],
      status: "active",
    },
    {
      id: 2,
      title: "Guest Services Representative",
      department: "Guest Services",
      shift: "Evening (2:00 PM - 10:00 PM)",
      location: "Guest Services Desk",
      responsibilities: [
        "Handle guest inquiries",
        "Process service requests",
        "Coordinate with housekeeping",
        "Manage guest complaints",
      ],
      status: "active",
    },
  ];

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        // const data = await apiService.getCurrentAssignments(staffId);
        // setAssignments(data);
        setAssignments(mockAssignments); // Using mock data for demo
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [staffId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Current Assignments
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {assignment.title}
                </h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium rounded-full">
                  {assignment.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500">
                    Department:
                  </span>
                  <span className="text-sm text-gray-900">
                    {assignment.department}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500">
                    Shift:
                  </span>
                  <span className="text-sm text-gray-900">
                    {assignment.shift}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500">
                    Location:
                  </span>
                  <span className="text-sm text-gray-900">
                    {assignment.location}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Responsibilities:
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {assignment.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
