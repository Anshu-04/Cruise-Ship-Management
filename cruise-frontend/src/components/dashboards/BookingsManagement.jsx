import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Calendar,
  Users,
  MapPin,
  Clock,
  Eye,
  Edit,
  MoreHorizontal,
  ChevronDown,
  X,
  User,
  Ship,
  CreditCard,
  FileText,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader,
} from "lucide-react";

const BookingsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCabin, setSelectedCabin] = useState("all");
  const [sortBy, setSortBy] = useState("bookingDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample booking data
  const bookingsData = [
    {
      id: "BK001",
      bookingNumber: "CRUISE-2024-001",
      passengerName: "John Smith",
      email: "john.smith@email.com",
      phone: "+1-555-0123",
      cabinType: "Ocean View",
      cabinNumber: "A-204",
      passengers: 2,
      bookingDate: "2024-12-15",
      cruiseDate: "2025-01-20",
      duration: "7 days",
      destination: "Caribbean",
      status: "confirmed",
      totalAmount: 2400,
      paidAmount: 2400,
      paymentStatus: "paid",
      specialRequests: "Vegetarian meals, late dining",
      timeline: [
        { date: "2024-12-15", event: "Booking Created", status: "completed" },
        { date: "2024-12-15", event: "Payment Processed", status: "completed" },
        { date: "2024-12-16", event: "Booking Confirmed", status: "completed" },
        { date: "2025-01-18", event: "Check-in Opens", status: "pending" },
        { date: "2025-01-20", event: "Cruise Departure", status: "pending" },
      ],
    },
    {
      id: "BK002",
      bookingNumber: "CRUISE-2024-002",
      passengerName: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1-555-0456",
      cabinType: "Balcony Suite",
      cabinNumber: "B-301",
      passengers: 4,
      bookingDate: "2024-12-10",
      cruiseDate: "2025-02-15",
      duration: "10 days",
      destination: "Mediterranean",
      status: "pending",
      totalAmount: 4800,
      paidAmount: 1200,
      paymentStatus: "partial",
      specialRequests: "Anniversary celebration, wheelchair accessible",
      timeline: [
        { date: "2024-12-10", event: "Booking Created", status: "completed" },
        { date: "2024-12-10", event: "Deposit Paid", status: "completed" },
        { date: "2025-01-10", event: "Final Payment Due", status: "pending" },
        { date: "2025-02-13", event: "Check-in Opens", status: "pending" },
        { date: "2025-02-15", event: "Cruise Departure", status: "pending" },
      ],
    },
    {
      id: "BK003",
      bookingNumber: "CRUISE-2024-003",
      passengerName: "Mike Wilson",
      email: "mike.wilson@email.com",
      phone: "+1-555-0789",
      cabinType: "Interior",
      cabinNumber: "C-105",
      passengers: 1,
      bookingDate: "2024-12-08",
      cruiseDate: "2025-03-05",
      duration: "5 days",
      destination: "Alaska",
      status: "cancelled",
      totalAmount: 1200,
      paidAmount: 0,
      paymentStatus: "refunded",
      specialRequests: "None",
      timeline: [
        { date: "2024-12-08", event: "Booking Created", status: "completed" },
        { date: "2024-12-20", event: "Booking Cancelled", status: "completed" },
        { date: "2024-12-21", event: "Refund Processed", status: "completed" },
      ],
    },
    {
      id: "BK004",
      bookingNumber: "CRUISE-2024-004",
      passengerName: "Emma Davis",
      email: "emma.davis@email.com",
      phone: "+1-555-0321",
      cabinType: "Presidential Suite",
      cabinNumber: "P-001",
      passengers: 2,
      bookingDate: "2024-12-12",
      cruiseDate: "2025-04-10",
      duration: "14 days",
      destination: "World Cruise",
      status: "confirmed",
      totalAmount: 12000,
      paidAmount: 12000,
      paymentStatus: "paid",
      specialRequests: "Champagne welcome, private dining",
      timeline: [
        { date: "2024-12-12", event: "Booking Created", status: "completed" },
        { date: "2024-12-12", event: "Payment Processed", status: "completed" },
        { date: "2024-12-13", event: "Suite Assigned", status: "completed" },
        { date: "2025-04-08", event: "Check-in Opens", status: "pending" },
        { date: "2025-04-10", event: "Cruise Departure", status: "pending" },
      ],
    },
    {
      id: "BK005",
      bookingNumber: "CRUISE-2024-005",
      passengerName: "Robert Brown",
      email: "robert.brown@email.com",
      phone: "+1-555-0654",
      cabinType: "Ocean View",
      cabinNumber: "A-312",
      passengers: 3,
      bookingDate: "2024-12-18",
      cruiseDate: "2025-01-25",
      duration: "7 days",
      destination: "Caribbean",
      status: "pending",
      totalAmount: 3600,
      paidAmount: 900,
      paymentStatus: "partial",
      specialRequests: "Family with child, connecting rooms",
      timeline: [
        { date: "2024-12-18", event: "Booking Created", status: "completed" },
        { date: "2024-12-18", event: "Deposit Paid", status: "completed" },
        { date: "2025-01-15", event: "Final Payment Due", status: "pending" },
        { date: "2025-01-23", event: "Check-in Opens", status: "pending" },
        { date: "2025-01-25", event: "Cruise Departure", status: "pending" },
      ],
    },
  ];

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

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "partial":
        return "bg-yellow-100 text-yellow-800";
      case "refunded":
        return "bg-pink-100 text-pink-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTimelineIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredBookings = useMemo(() => {
    return bookingsData.filter((booking) => {
      const matchesSearch =
        booking.passengerName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        booking.bookingNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatus === "all" || booking.status === selectedStatus;
      const matchesCabin =
        selectedCabin === "all" || booking.cabinType === selectedCabin;

      return matchesSearch && matchesStatus && matchesCabin;
    });
  }, [searchTerm, selectedStatus, selectedCabin]);

  const sortedBookings = useMemo(() => {
    return [...filteredBookings].sort((a, b) => {
      let aVal, bVal;

      switch (sortBy) {
        case "bookingDate":
          aVal = new Date(a.bookingDate);
          bVal = new Date(b.bookingDate);
          break;
        case "cruiseDate":
          aVal = new Date(a.cruiseDate);
          bVal = new Date(b.cruiseDate);
          break;
        case "passengerName":
          aVal = a.passengerName.toLowerCase();
          bVal = b.passengerName.toLowerCase();
          break;
        case "totalAmount":
          aVal = a.totalAmount;
          bVal = b.totalAmount;
          break;
        default:
          aVal = a[sortBy];
          bVal = b[sortBy];
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [filteredBookings, sortBy, sortOrder]);

  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedBookings.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedBookings, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const openBookingModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const uniqueCabinTypes = [
    ...new Set(bookingsData.map((booking) => booking.cabinType)),
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bookings Management
        </h1>
        <p className="text-gray-600">
          Manage cruise bookings, passenger details, and booking timeline
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by passenger name, booking number, or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              value={selectedCabin}
              onChange={(e) => setSelectedCabin(e.target.value)}
            >
              <option value="all">All Cabins</option>
              {uniqueCabinTypes.map((cabin) => (
                <option key={cabin} value={cabin}>
                  {cabin}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-");
                setSortBy(field);
                setSortOrder(order);
              }}
            >
              <option value="bookingDate-desc">Booking Date (Newest)</option>
              <option value="bookingDate-asc">Booking Date (Oldest)</option>
              <option value="cruiseDate-asc">Cruise Date (Earliest)</option>
              <option value="cruiseDate-desc">Cruise Date (Latest)</option>
              <option value="passengerName-asc">Passenger A-Z</option>
              <option value="passengerName-desc">Passenger Z-A</option>
              <option value="totalAmount-desc">Amount (High to Low)</option>
              <option value="totalAmount-asc">Amount (Low to High)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Passenger
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cabin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cruise Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {booking.bookingNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        Booked:{" "}
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-pink-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.passengerName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {booking.passengers} passenger
                          {booking.passengers > 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.cabinType}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.cabinNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.destination}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(booking.cruiseDate).toLocaleDateString()} (
                      {booking.duration})
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${booking.paidAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      of ${booking.totalAmount.toLocaleString()}
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(
                        booking.paymentStatus
                      )}`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openBookingModal(booking)}
                        className="text-pink-600 hover:text-pink-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200">
        <div className="flex-1 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-700">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, sortedBookings.length)} of{" "}
              {sortedBookings.length} bookings
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 text-sm border rounded-md ${
                  currentPage === i + 1
                    ? "bg-pink-500 text-white border-pink-500"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Booking Details
              </h2>
              <button
                onClick={closeBookingModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Booking Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Booking Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Booking Number:
                        </span>
                        <span className="text-sm font-medium">
                          {selectedBooking.bookingNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Booking Date:
                        </span>
                        <span className="text-sm font-medium">
                          {new Date(
                            selectedBooking.bookingDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            selectedBooking.status
                          )}`}
                        >
                          {selectedBooking.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Passenger Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Passenger Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Name:</span>
                        <span className="text-sm font-medium">
                          {selectedBooking.passengerName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Email:</span>
                        <span className="text-sm font-medium flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {selectedBooking.email}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Phone:</span>
                        <span className="text-sm font-medium flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {selectedBooking.phone}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Passengers:
                        </span>
                        <span className="text-sm font-medium flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {selectedBooking.passengers}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cabin Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Ship className="w-5 h-5 mr-2" />
                      Cabin Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Cabin Type:
                        </span>
                        <span className="text-sm font-medium">
                          {selectedBooking.cabinType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Cabin Number:
                        </span>
                        <span className="text-sm font-medium">
                          {selectedBooking.cabinNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Destination:
                        </span>
                        <span className="text-sm font-medium flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {selectedBooking.destination}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Cruise Date:
                        </span>
                        <span className="text-sm font-medium flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(
                            selectedBooking.cruiseDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Duration:</span>
                        <span className="text-sm font-medium">
                          {selectedBooking.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Total Amount:
                        </span>
                        <span className="text-sm font-medium">
                          ${selectedBooking.totalAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Paid Amount:
                        </span>
                        <span className="text-sm font-medium text-green-600">
                          ${selectedBooking.paidAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Outstanding:
                        </span>
                        <span className="text-sm font-medium text-red-600">
                          $
                          {(
                            selectedBooking.totalAmount -
                            selectedBooking.paidAmount
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Payment Status:
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(
                            selectedBooking.paymentStatus
                          )}`}
                        >
                          {selectedBooking.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Special Requests
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">
                        {selectedBooking.specialRequests ||
                          "No special requests"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Booking Timeline */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Booking Timeline
                  </h3>
                  <div className="space-y-4">
                    {selectedBooking.timeline.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getTimelineIcon(item.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              {item.event}
                            </p>
                            <span className="text-xs text-gray-500">
                              {new Date(item.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="mt-1">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                item.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : item.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={closeBookingModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500">
                Edit Booking
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                Send Confirmation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsManagement;
