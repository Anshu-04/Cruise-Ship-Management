import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  DollarSign,
  Check,
} from "lucide-react";

const BookingForm = ({ onSubmit, facilities = [], isLoading = false }) => {
  const [formData, setFormData] = useState({
    facilityId: "",
    date: "",
    timeSlot: "",
    duration: "1",
    guests: "1",
    specialRequests: "",
    contactInfo: {
      name: "",
      email: "",
      phone: "",
      cabinNumber: "",
    },
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [errors, setErrors] = useState({});

  // Time slots for different facility types
  const getTimeSlots = (facilityType) => {
    const slots = {
      movie: ["09:00", "12:00", "15:00", "18:00", "21:00"],
      resort: ["10:00", "14:00", "18:00"],
      fitness: [
        "06:00",
        "08:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00",
      ],
      party_hall: ["10:00", "14:00", "18:00", "22:00"],
      spa: ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
    };
    return slots[facilityType] || [];
  };

  useEffect(() => {
    if (formData.facilityId) {
      const facility = facilities.find(
        (f) => f.id === parseInt(formData.facilityId)
      );
      setSelectedFacility(facility);
      if (facility) {
        const slots = getTimeSlots(facility.type);
        setAvailableSlots(slots);
      }
    }
  }, [formData.facilityId, facilities]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.facilityId) newErrors.facilityId = "Please select a facility";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.timeSlot) newErrors.timeSlot = "Please select a time slot";
    if (!formData.guests || formData.guests < 1)
      newErrors.guests = "Number of guests must be at least 1";
    if (!formData.contactInfo.name)
      newErrors["contactInfo.name"] = "Name is required";
    if (!formData.contactInfo.email)
      newErrors["contactInfo.email"] = "Email is required";
    if (!formData.contactInfo.phone)
      newErrors["contactInfo.phone"] = "Phone number is required";
    if (!formData.contactInfo.cabinNumber)
      newErrors["contactInfo.cabinNumber"] = "Cabin number is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      formData.contactInfo.email &&
      !emailRegex.test(formData.contactInfo.email)
    ) {
      newErrors["contactInfo.email"] = "Please enter a valid email address";
    }

    // Date validation (must be today or future)
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Date cannot be in the past";
      }
    }

    // Guest capacity validation
    if (selectedFacility && formData.guests > selectedFacility.capacity) {
      newErrors.guests = `Maximum capacity is ${selectedFacility.capacity}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsCheckingAvailability(true);

    try {
      // Format the booking data
      const bookingData = {
        ...formData,
        guests: parseInt(formData.guests),
        duration: parseInt(formData.duration),
        facilityId: parseInt(formData.facilityId),
        totalAmount: calculateTotal(),
        status: "pending",
      };

      await onSubmit(bookingData);
    } catch (error) {
      console.error("Booking submission error:", error);
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const calculateTotal = () => {
    if (!selectedFacility) return 0;
    const basePrice = selectedFacility.price || 0;
    const duration = parseInt(formData.duration);
    const guests = parseInt(formData.guests);

    // Different pricing logic for different facility types
    if (selectedFacility.type === "movie") {
      return basePrice * guests;
    } else if (selectedFacility.type === "party_hall") {
      return basePrice * duration;
    } else {
      return basePrice * guests * duration;
    }
  };

  const resetForm = () => {
    setFormData({
      facilityId: "",
      date: "",
      timeSlot: "",
      duration: "1",
      guests: "1",
      specialRequests: "",
      contactInfo: {
        name: "",
        email: "",
        phone: "",
        cabinNumber: "",
      },
    });
    setErrors({});
    setSelectedFacility(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="h-6 w-6 text-pink-600" />
        <h2 className="text-2xl font-bold text-gray-800">Book a Facility</h2>
      </div>

      <div className="space-y-6">
        {/* Facility Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Select Facility
            </label>
            <select
              name="facilityId"
              value={formData.facilityId}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                errors.facilityId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Choose a facility...</option>
              {facilities.map((facility) => (
                <option key={facility.id} value={facility.id}>
                  {facility.name} - ${facility.price}
                  {facility.type === "movie" && " per person"}
                  {facility.type === "party_hall" && " per hour"}
                  {!["movie", "party_hall"].includes(facility.type) &&
                    " per person/hour"}
                </option>
              ))}
            </select>
            {errors.facilityId && (
              <p className="text-red-500 text-sm mt-1">{errors.facilityId}</p>
            )}
          </div>

          {selectedFacility && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold text-gray-800">
                {selectedFacility.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {selectedFacility.description}
              </p>
              <p className="text-sm text-gray-600">
                <Users className="inline h-4 w-4 mr-1" />
                Capacity: {selectedFacility.capacity} people
              </p>
              <p className="text-sm text-gray-600">
                <DollarSign className="inline h-4 w-4 mr-1" />
                Price: ${selectedFacility.price}
              </p>
            </div>
          )}
        </div>

        {/* Date and Time Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0]}
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="inline h-4 w-4 mr-1" />
              Time Slot
            </label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                errors.timeSlot ? "border-red-500" : "border-gray-300"
              }`}
              disabled={!selectedFacility}
            >
              <option value="">Select time...</option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.timeSlot && (
              <p className="text-red-500 text-sm mt-1">{errors.timeSlot}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (hours)
            </label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              disabled={selectedFacility?.type === "movie"}
            >
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
              <option value="3">3 hours</option>
              <option value="4">4 hours</option>
            </select>
          </div>
        </div>

        {/* Guest Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline h-4 w-4 mr-1" />
              Number of Guests
            </label>
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
              min="1"
              max={selectedFacility?.capacity || 100}
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                errors.guests ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.guests && (
              <p className="text-red-500 text-sm mt-1">{errors.guests}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              rows="2"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Any special requirements or requests..."
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 p-6 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="contactInfo.name"
                value={formData.contactInfo.name}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                  errors["contactInfo.name"]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors["contactInfo.name"] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors["contactInfo.name"]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="contactInfo.email"
                value={formData.contactInfo.email}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                  errors["contactInfo.email"]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors["contactInfo.email"] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors["contactInfo.email"]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="contactInfo.phone"
                value={formData.contactInfo.phone}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                  errors["contactInfo.phone"]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors["contactInfo.phone"] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors["contactInfo.phone"]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cabin Number
              </label>
              <input
                type="text"
                name="contactInfo.cabinNumber"
                value={formData.contactInfo.cabinNumber}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                  errors["contactInfo.cabinNumber"]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors["contactInfo.cabinNumber"] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors["contactInfo.cabinNumber"]}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Total Amount */}
        {selectedFacility && (
          <div className="bg-pink-50 p-4 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">
                Total Amount:
              </span>
              <span className="text-2xl font-bold text-pink-600">
                ${calculateTotal()}
              </span>
            </div>
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || isCheckingAvailability}
            className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isLoading || isCheckingAvailability ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Book Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
