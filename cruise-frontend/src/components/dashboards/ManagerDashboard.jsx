import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  Ship,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Filter,
  Download,
  RefreshCw,
  Search,
  Plus,
  Settings,
  UserCheck,
  Target,
  Award,
  Activity,
} from "lucide-react";

// Mock API Service
const apiService = {
  getBookings: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
      {
        id: 1,
        bookingNumber: "CRS-2024-001",
        passengerName: "John Smith",
        email: "john.smith@email.com",
        phone: "+1234567890",
        cabinType: "Deluxe Ocean View",
        cabinNumber: "A-205",
        departureDate: "2024-08-15",
        returnDate: "2024-08-22",
        passengers: 2,
        totalAmount: 3500,
        status: "confirmed",
        paymentStatus: "paid",
        createdAt: "2024-07-10",
        specialRequests: "Wheelchair accessible cabin",
      },
      {
        id: 2,
        bookingNumber: "CRS-2024-002",
        passengerName: "Alice Johnson",
        email: "alice.j@email.com",
        phone: "+1234567891",
        cabinType: "Premium Suite",
        cabinNumber: "S-102",
        departureDate: "2024-08-20",
        returnDate: "2024-08-27",
        passengers: 3,
        totalAmount: 5200,
        status: "pending",
        paymentStatus: "pending",
        createdAt: "2024-07-12",
        specialRequests: "Late check-in",
      },
      {
        id: 3,
        bookingNumber: "CRS-2024-003",
        passengerName: "Bob Wilson",
        email: "bob.wilson@email.com",
        phone: "+1234567892",
        cabinType: "Standard Interior",
        cabinNumber: "I-340",
        departureDate: "2024-08-25",
        returnDate: "2024-09-01",
        passengers: 1,
        totalAmount: 1800,
        status: "confirmed",
        paymentStatus: "paid",
        createdAt: "2024-07-13",
        specialRequests: "Vegetarian meals",
      },
    ];
  },

  getOrders: async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return [
      {
        id: 1,
        orderNumber: "ORD-2024-001",
        bookingId: 1,
        passengerName: "John Smith",
        items: [
          { name: "Room Service Breakfast", quantity: 2, price: 45 },
          { name: "Spa Treatment", quantity: 1, price: 120 },
        ],
        totalAmount: 165,
        status: "completed",
        orderDate: "2024-07-15",
        assignedStaff: "Maria Rodriguez",
        notes: "Deliver to cabin A-205",
      },
      {
        id: 2,
        orderNumber: "ORD-2024-002",
        bookingId: 2,
        passengerName: "Alice Johnson",
        items: [
          { name: "Wine Package", quantity: 1, price: 200 },
          { name: "Shore Excursion", quantity: 3, price: 150 },
        ],
        totalAmount: 650,
        status: "pending",
        orderDate: "2024-07-16",
        assignedStaff: "David Chen",
        notes: "Confirm excursion timing",
      },
    ];
  },

  getStaffPerformance: async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return [
      {
        id: 1,
        name: "Maria Rodriguez",
        department: "Guest Services",
        ordersCompleted: 45,
        avgRating: 4.8,
        efficiency: 92,
        tasksAssigned: 50,
        status: "active",
      },
      {
        id: 2,
        name: "David Chen",
        department: "Food & Beverage",
        ordersCompleted: 38,
        avgRating: 4.6,
        efficiency: 88,
        tasksAssigned: 42,
        status: "active",
      },
      {
        id: 3,
        name: "Sarah Thompson",
        department: "Housekeeping",
        ordersCompleted: 52,
        avgRating: 4.9,
        efficiency: 95,
        tasksAssigned: 55,
        status: "active",
      },
    ];
  },

  getAnalytics: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      revenue: {
        daily: [
          { date: "2024-07-08", amount: 12500 },
          { date: "2024-07-09", amount: 15300 },
          { date: "2024-07-10", amount: 18900 },
          { date: "2024-07-11", amount: 16700 },
          { date: "2024-07-12", amount: 21200 },
          { date: "2024-07-13", amount: 19800 },
        ],
        byCategory: [
          { name: "Bookings", value: 65, amount: 145000 },
          { name: "Food & Beverage", value: 20, amount: 45000 },
          { name: "Entertainment", value: 10, amount: 22000 },
          { name: "Spa & Wellness", value: 5, amount: 12000 },
        ],
      },
      occupancy: {
        current: 87,
        target: 90,
        trend: [
          { date: "2024-07-08", rate: 82 },
          { date: "2024-07-09", rate: 85 },
          { date: "2024-07-10", rate: 87 },
          { date: "2024-07-11", rate: 89 },
          { date: "2024-07-12", rate: 87 },
          { date: "2024-07-13", rate: 87 },
        ],
      },
    };
  },
};

// Loading Component
const Loading = ({ message = "Loading..." }) => (
  <div className="flex items-center justify-center p-8">
    <div className="flex items-center space-x-3">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-600"></div>
      <span className="text-gray-600">{message}</span>
    </div>
  </div>
);

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, trend, color = "pink" }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pink-500">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {trend && (
          <div className="flex items-center mt-2">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">{trend}</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-full bg-${color}-100`}>
        <Icon className={`h-6 w-6 text-${color}-600`} />
      </div>
    </div>
  </div>
);

// Reports View Component
const ReportsView = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("revenue");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await apiService.getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <Loading message="Loading analytics..." />;

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Analytics Dashboard
        </h2>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value="$224,000"
          icon={DollarSign}
          trend="+12.5% from last month"
        />
        <StatsCard
          title="Occupancy Rate"
          value={`${analytics.occupancy.current}%`}
          icon={Ship}
          trend="+2.3% from last week"
        />
        <StatsCard
          title="Active Bookings"
          value="156"
          icon={Calendar}
          trend="+8 new today"
        />
        <StatsCard
          title="Customer Satisfaction"
          value="4.8/5"
          icon={Award}
          trend="+0.2 from last month"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Daily Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.revenue.daily}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3B82F6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Category */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.revenue.byCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analytics.revenue.byCategory.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Occupancy Trend */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Occupancy Rate Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.occupancy.trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, "Occupancy Rate"]} />
              <Bar dataKey="rate" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Categories Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Category</th>
                  <th className="text-right py-2">Amount</th>
                  <th className="text-right py-2">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {analytics.revenue.byCategory.map((category, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></div>
                      {category.name}
                    </td>
                    <td className="text-right py-2">
                      ${category.amount.toLocaleString()}
                    </td>
                    <td className="text-right py-2">{category.value}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Booking Management Component
const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await apiService.getBookings();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.passengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <Loading message="Loading bookings..." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Booking Management</h2>
        <button className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700">
          <Plus className="h-4 w-4 mr-2" />
          New Booking
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Booking #
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Passenger
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Cabin
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Dates
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Amount
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-pink-600">
                    {booking.bookingNumber}
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{booking.passengerName}</p>
                      <p className="text-sm text-gray-600">{booking.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{booking.cabinNumber}</p>
                      <p className="text-sm text-gray-600">
                        {booking.cabinType}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      <p>{booking.departureDate}</p>
                      <p className="text-gray-600">to {booking.returnDate}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">
                    ${booking.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="text-pink-600 hover:text-pink-800"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Booking Details</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Passenger Information</h4>
                <p>
                  <strong>Name:</strong> {selectedBooking.passengerName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedBooking.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedBooking.phone}
                </p>
                <p>
                  <strong>Passengers:</strong> {selectedBooking.passengers}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Booking Information</h4>
                <p>
                  <strong>Booking #:</strong> {selectedBooking.bookingNumber}
                </p>
                <p>
                  <strong>Cabin:</strong> {selectedBooking.cabinNumber}
                </p>
                <p>
                  <strong>Type:</strong> {selectedBooking.cabinType}
                </p>
                <p>
                  <strong>Amount:</strong> $
                  {selectedBooking.totalAmount.toLocaleString()}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Travel Dates</h4>
                <p>
                  <strong>Departure:</strong> {selectedBooking.departureDate}
                </p>
                <p>
                  <strong>Return:</strong> {selectedBooking.returnDate}
                </p>
                <p>
                  <strong>Created:</strong> {selectedBooking.createdAt}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Status & Payment</h4>
                <p>
                  <strong>Status:</strong>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedBooking.status
                    )}`}
                  >
                    {selectedBooking.status}
                  </span>
                </p>
                <p>
                  <strong>Payment:</strong> {selectedBooking.paymentStatus}
                </p>
              </div>
            </div>

            {selectedBooking.specialRequests && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Special Requests</h4>
                <p className="text-gray-700">
                  {selectedBooking.specialRequests}
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-2 mt-6">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Edit Booking
              </button>
              <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700">
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Staff Performance Component
const StaffPerformance = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await apiService.getStaffPerformance();
        setStaff(data);
      } catch (error) {
        console.error("Error fetching staff performance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  if (loading) return <Loading message="Loading staff performance..." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Staff Performance</h2>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700">
            <UserCheck className="h-4 w-4 mr-2" />
            View All Staff
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Staff"
          value={staff.length}
          icon={Users}
          trend="+2 new this month"
        />
        <StatsCard
          title="Avg Efficiency"
          value="91.7%"
          icon={Target}
          trend="+3.2% from last month"
        />
        <StatsCard
          title="Tasks Completed"
          value="135"
          icon={CheckCircle}
          trend="+15 today"
        />
        <StatsCard
          title="Avg Rating"
          value="4.77"
          icon={Award}
          trend="+0.1 from last week"
        />
      </div>

      {/* Staff Performance Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Staff Member
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Department
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Orders Completed
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Efficiency
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Rating
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member) => (
                <tr key={member.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-600">ID: {member.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{member.department}</td>
                  <td className="py-3 px-4">
                    <div className="text-center">
                      <p className="font-medium">{member.ordersCompleted}</p>
                      <p className="text-xs text-gray-600">
                        of {member.tasksAssigned}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${member.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {member.efficiency}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="font-medium">{member.avgRating}</span>
                      <div className="ml-2">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < Math.floor(member.avgRating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-pink-600 hover:text-pink-800">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Activity className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">
            Efficiency by Department
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { department: "Guest Services", efficiency: 92 },
                { department: "Food & Beverage", efficiency: 88 },
                { department: "Housekeeping", efficiency: 95 },
                { department: "Entertainment", efficiency: 85 },
                { department: "Maintenance", efficiency: 90 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="efficiency" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Tasks Completion Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={[
                { date: "2024-07-08", completed: 42, assigned: 50 },
                { date: "2024-07-09", completed: 45, assigned: 52 },
                { date: "2024-07-10", completed: 48, assigned: 55 },
                { date: "2024-07-11", completed: 50, assigned: 58 },
                { date: "2024-07-12", completed: 52, assigned: 60 },
                { date: "2024-07-13", completed: 55, assigned: 62 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#10B981"
                name="Completed"
              />
              <Line
                type="monotone"
                dataKey="assigned"
                stroke="#F59E0B"
                name="Assigned"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Order Management Component
const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await apiService.getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <Loading message="Loading orders..." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
        <button className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700">
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Order #
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Customer
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Items
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Staff
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Amount
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-pink-600">
                    {order.orderNumber}
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{order.passengerName}</p>
                      <p className="text-sm text-gray-600">
                        Booking #{order.bookingId}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      <p className="font-medium">{order.items.length} items</p>
                      <p className="text-gray-600">{order.items[0]?.name}...</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">{order.assignedStaff}</td>
                  <td className="py-3 px-4 font-medium">
                    ${order.totalAmount}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-pink-600 hover:text-pink-800"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Order Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold mb-2">Order Information</h4>
                <p>
                  <strong>Order #:</strong> {selectedOrder.orderNumber}
                </p>
                <p>
                  <strong>Date:</strong> {selectedOrder.orderDate}
                </p>
                <p>
                  <strong>Customer:</strong> {selectedOrder.passengerName}
                </p>
                <p>
                  <strong>Booking ID:</strong> {selectedOrder.bookingId}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Assignment</h4>
                <p>
                  <strong>Staff:</strong> {selectedOrder.assignedStaff}
                </p>
                <p>
                  <strong>Status:</strong>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                </p>
                <p>
                  <strong>Total:</strong> ${selectedOrder.totalAmount}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Order Items</h4>
              <div className="bg-gray-50 rounded-lg p-3">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">${item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>

            {selectedOrder.notes && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Notes</h4>
                <p className="text-gray-700 bg-gray-50 rounded-lg p-3">
                  {selectedOrder.notes}
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Edit Order
              </button>
              <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700">
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Manager Dashboard Component
const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("reports");

  const tabs = [
    { id: "reports", label: "Reports & Analytics", icon: BarChart },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "orders", label: "Orders", icon: Clock },
    { id: "staff", label: "Staff Performance", icon: Users },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "reports":
        return <ReportsView />;
      case "bookings":
        return <BookingManagement />;
      case "orders":
        return <OrderManagement />;
      case "staff":
        return <StaffPerformance />;
      default:
        return <ReportsView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Manager Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Manage bookings, orders, and staff performance
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">M</span>
                </div>
                <span className="text-sm font-medium">Manager</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
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
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default ManagerDashboard;
