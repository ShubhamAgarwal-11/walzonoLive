"use client"

import { useState } from "react"
import { CreditCard, Wallet, Clock, Calendar, Home, Store, MapPin, CheckCircle } from "lucide-react"
import { useSelector } from "react-redux"
import { getBookingInfo } from "../redux/bookingSlice"
import { getDiscount, getPrice } from "../redux/cartSlice"
import axios from "axios"
import { toast } from "react-hot-toast"
import { BOOKING_API_END_POINT } from "../utils/constent"
import { useNavigate } from "react-router"

const styles = `
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
`

export default function PaymentOption() {
  const [paymentMethod, setPaymentMethod] = useState("COD")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const bookingInfo = useSelector(getBookingInfo)
  const totalPrice = useSelector(getPrice)
  const discount = useSelector(getDiscount)
  const navigate = useNavigate()

  const handleBooking = async () => {
    const newBookingInfo = { ...bookingInfo, paymentMethod }
    try {
      const response = await axios.post(`${BOOKING_API_END_POINT}/createBooking`, newBookingInfo, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      if (response.data.success) {
        toast.success(response.data.message)
        setShowSuccessModal(true)
        setTimeout(() => {
          setShowSuccessModal(false)
          navigate("/orders")
        }, 3000)
        console.log(response.data)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="container mx-auto py-6 px-4 lg:px-20 md:px-10 min-h-screen flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          {/* Booking Summary */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="border rounded-lg shadow-sm bg-white flex flex-col h-[calc(100vh-7rem)]">
              <div className="p-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold">Booking Summary</h2>
              </div>

              {/* Services List */}
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {bookingInfo.services.map((service, index) => (
                  <div key={index} className="border-b last:border-b-0 p-4">
                    {/* Partner Info */}
                    <div className="flex items-center gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={service.partnerInfo.image || "/placeholder.svg"}
                        alt={service.partnerInfo.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <h3 className="font-medium text-sm truncate">{service.partnerInfo.name}</h3>
                        <p className="text-xs text-gray-600">Professional {service.serviceType}</p>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3 bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center gap-1.5">
                        {service.bookingType === "Home Appointment" ? (
                          <Home className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Store className="w-4 h-4 text-blue-600" />
                        )}
                        <span>{service.bookingType}</span>
                      </div>
                      {service.bookingTime && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span>{service.bookingTime}</span>
                        </div>
                      )}
                      {service.bookingDate && (
                        <div className="flex items-center gap-1.5 col-span-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span>{service.bookingDate}</span>
                        </div>
                      )}
                    </div>

                    {/* Service Details */}
                    <div className="flex gap-3 bg-gray-50 p-3 rounded-lg">
                      <img
                        src={service.serviceImage || "/placeholder.svg"}
                        alt={service.serviceName}
                        className="w-14 h-14 rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-medium text-sm truncate">{service.serviceName}</h4>
                          <span className="text-sm font-medium whitespace-nowrap">
                            ₹{service.price} x {service.quantity}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 capitalize">{service.serviceType}</p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                            Qty: {service.quantity}
                          </span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                            ₹{service.price * service.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* User Info */}
              <div className="p-4 border-t bg-gray-100">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <span className="font-medium">{bookingInfo.userInfo.name}</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-600">{bookingInfo.userInfo.phone}</span>
                </div>
                <div className="flex items-start gap-1.5 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{bookingInfo.userInfo.address}</span>
                </div>
              </div>

              {/* Price Summary */}
              <div className="p-4 space-y-2 bg-gray-50 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700 font-semibold">Discount</span>
                  <span className="text-green-700 font-semibold">-₹{discount.toFixed(2)}</span>
                </div>
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <div className="flex justify-between font-medium">
                    <span>Total Amount</span>
                    <span>₹{(totalPrice.toFixed(2) - discount.toFixed(2)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Payment Options</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 rounded-md border p-4">
                    <input
                      type="radio"
                      id="COD"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                      className="mt-1"
                    />
                    <div className="flex flex-1 flex-col">
                      <label htmlFor="cod" className="flex items-center gap-2 font-medium cursor-pointer">
                        <Wallet className="h-5 w-5" />
                        Cash on Delivery (COD)
                      </label>
                      <p className="text-sm text-gray-500 mt-1">Pay with cash when your service is completed</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 rounded-md border cursor-not-allowed p-4">
                    <input
                      type="radio"
                      id="Online"
                      name="paymentMethod"
                      value="Online"
                      checked={paymentMethod === "Online"}
                      onChange={() => setPaymentMethod("Online")}
                      className="mt-1 cursor-not-allowed"
                      disabled
                    />
                    <div className="flex flex-1 flex-col">
                      <label
                        htmlFor="online"
                        className="flex text-gray-600 items-center gap-2 font-medium cursor-not-allowed"
                      >
                        <CreditCard className="h-5 w-5" />
                        Online Payment
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                        Pay now using credit/debit card or other online methods
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleBooking}
                  disabled={paymentMethod === "online"}
                  className="w-full mt-6 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {paymentMethod === "cod" ? "Confirm Booking" : "Proceed to Pay"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-xl animate-fade-in">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for your booking. You will be redirected to the home page shortly.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
