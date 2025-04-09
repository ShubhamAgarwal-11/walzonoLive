import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, ChevronDown, ArrowLeft, Star } from 'lucide-react';
import axios from 'axios';
import { CART_API_END_POINT } from '../utils/constent';
import { useSelector } from 'react-redux';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [serviceBookings, setServiceBookings] = useState({});
  const [expandedService, setExpandedService] = useState(null);
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const { user } = useSelector((store) => store.user);

  const bookingTypes = ["Today's Booking", "Home Appointment", "Salon Appointment"];
  const timeSlots = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"];

  const handleServiceExpand = (serviceName) => {
    setExpandedService(expandedService === serviceName ? null : serviceName);
    if (!serviceBookings[serviceName]) {
      setServiceBookings({
        ...serviceBookings,
        [serviceName]: { bookingType: null, date: '', time: '' }
      });
    }
  };

  const getCart = async () => {
    try {
      const response = await axios.get(`${CART_API_END_POINT}/getCart`, { params: { userId: user._id } });
      if (response.data.success) {
        setServices(response.data.cart.cartItems);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const updateServiceBooking = (serviceName, field, value) => {
    setServiceBookings({
      ...serviceBookings,
      [serviceName]: {
        ...serviceBookings[serviceName],
        [field]: value
      }
    });
  };

  const validateForm = () => {
    // Personal info validation
    if (!formData.name || !formData.address || !formData.phone) {
      setError('Please fill in all personal information fields.');
      return false;
    }

    // At least one service selected validation
    if (getSelectedServicesCount() === 0) {
      setError('Please select at least one service.');
      return false;
    }

    // Date and time validation for Home/Salon appointments
    const hasInvalidBookings = Object.values(serviceBookings).some(booking => {
      if (booking.bookingType === "Home Appointment" || booking.bookingType === "Salon Appointment") {
        return !booking.date || !booking.time;
      }
      return false;
    });

    if (hasInvalidBookings) {
      setError('Please select date and time for Home/Salon Appointments.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Submit booking logic
    console.log({
      personalInfo: formData,
      bookings: serviceBookings
    });
  };

  const getSelectedServicesCount = () => {
    return Object.values(serviceBookings).filter(booking => booking.bookingType).length;
  };

  const calculateTotalPrice = (service) => {
    return service.price * service.quantity;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-semibold">Book an Appointment</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Details Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                <h2 className="text-xl font-semibold">Personal Info</h2>
              </div>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border bg-white rounded-lg"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <div className="flex">
                      <select className="w-20 border bg-white rounded-l-lg px-2">
                        <option>+91</option>
                      </select>
                      <input
                        type="tel"
                        className="flex-1 p-2 border-l-0 border bg-white rounded-r-lg"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Full Address</label>
                  <textarea
                    className="w-full p-2 border bg-white rounded-lg"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                <h2 className="text-xl font-semibold">Select Service & Booking Type</h2>
              </div>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.serviceId} className="border rounded-lg overflow-hidden">
                    <div
                      className={`p-4 cursor-pointer transition-all ${expandedService === service.serviceName ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                      onClick={() => handleServiceExpand(service.serviceName)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          <img
                            src={service.image}
                            alt={service.serviceName}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-medium">{service.serviceName}</h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                            <p className="text-sm text-gray-500 mt-1">{service.duration}</p>
                            <div className="flex items-center gap-1 text-sm mt-1">
                              <span className="font-medium">{service.parlourName}</span>
                              <span className="text-gray-400">•</span>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="ml-1">{service.rating}</span>
                              </div>
                              <span className="text-gray-500">{service?.distance}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <p className="font-semibold">₹{service.price}</p>
                            <p className="text-sm text-gray-500">Qty: {service.quantity}</p>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${expandedService === service.serviceName ? 'transform rotate-180' : ''}`}
                          />
                        </div>
                      </div>
                    </div>

                    {expandedService === service.serviceName && (
                      <div className="p-4 border-t bg-blue-50">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Select Booking Type</label>
                            <div className="grid grid-cols-3 gap-3">
                              {bookingTypes.map((type) => (
                                <button
                                  key={type}
                                  className={`p-3 text-center rounded-lg border transition-all ${
                                    serviceBookings[service.serviceName]?.bookingType === type
                                      ? 'border-blue-500 bg-white text-blue-700'
                                      : 'hover:border-gray-400 bg-white'
                                  }`}
                                  onClick={() => updateServiceBooking(service.serviceName, 'bookingType', type)}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>

                          {(serviceBookings[service.serviceName]?.bookingType === "Home Appointment" ||
                            serviceBookings[service.serviceName]?.bookingType === "Salon Appointment") && (
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-2">Select Date</label>
                                <div className="relative">
                                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                  <input
                                    type="date"
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={serviceBookings[service.serviceName]?.date}
                                    onChange={(e) => updateServiceBooking(service.serviceName, 'date', e.target.value)}
                                    required
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">Select Time</label>
                                <div className="grid grid-cols-3 gap-2">
                                  {timeSlots.map((time) => (
                                    <button
                                      key={time}
                                      className={`p-2 text-sm rounded-lg border transition-all ${
                                        serviceBookings[service.serviceName]?.time === time
                                          ? 'border-blue-500 bg-white text-blue-700'
                                          : 'hover:border-gray-400 bg-white'
                                      }`}
                                      onClick={() => updateServiceBooking(service.serviceName, 'time', time)}
                                    >
                                      {time}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Error Message and Submit Button */}
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
                {error}
              </div>
            )}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!formData.name || !formData.address || !formData.phone || getSelectedServicesCount() === 0}
            >
              Confirm Booking
            </button>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-6">
              <h3 className="font-semibold mb-4">Booking Summary</h3>
              <div className="space-y-4">
                {services.map((service) => {
                  const booking = serviceBookings[service.serviceName];
                  if (!booking?.bookingType) return null;

                  return (
                    <div key={service.serviceId} className="border-b pb-4">
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={service.image}
                          alt={service.serviceName}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium">{service.serviceName}</h4>
                          <p className="text-sm text-gray-600">{service.parlourName}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Booking Type</span>
                          <span>{booking.bookingType}</span>
                        </div>
                        {booking.date && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date</span>
                            <span>{booking.date}</span>
                          </div>
                        )}
                        {booking.time && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Time</span>
                            <span>{booking.time}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quantity</span>
                          <span>{service.quantity}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Price</span>
                          <span>₹{calculateTotalPrice(service)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {getSelectedServicesCount() > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Total Price</span>
                      <span className="font-semibold">
                        ₹{services.reduce((total, service) => (
                          serviceBookings[service.serviceName]?.bookingType ? total + calculateTotalPrice(service) : total
                        ), 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2 text-green-600">
                      <span>Discount</span>
                      <span>-₹742</span>
                    </div>
                    <div className="flex justify-between items-center font-semibold text-lg">
                      <span>Final Total</span>
                      <span>₹{services.reduce((total, service) => (
                        serviceBookings[service.serviceName]?.bookingType ? total + calculateTotalPrice(service) : total
                      ), 0) - 742}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;