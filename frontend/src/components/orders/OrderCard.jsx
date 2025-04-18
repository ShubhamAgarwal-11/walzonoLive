"use client"

import { ChevronDown, ChevronUp } from "lucide-react"

function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function OrderCard({ order, isExpanded, onToggleDetails }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Partner Info (showing first service's partner) */}
          <div className="flex items-center md:w-1/4">
            <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
              <img
                src={order.services[0].partnerInfo.image || "/placeholder.svg"}
                alt={order.services[0].partnerInfo.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 className="font-semibold">{order.services[0].partnerInfo.name}</h3>
              <span className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold text-sm",
                getStatusColor(order.bookingStatus)
              )}>
                {order.bookingStatus}
              </span>
            </div>
          </div>

          {/* Services List */}
          <div className="flex flex-col md:flex-row md:w-3/4 gap-4">
            <div className="flex-1">
              {order.services.map((service, index) => (
                <div key={index} className="mb-12 last:mb-0">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Service Image and Info */}
                    <div className="flex items-center md:w-1/2">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden mr-3">
                        <img
                          src={service.serviceImage || "/placeholder.svg"}
                          alt={service.serviceName}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{service.serviceName}</h4>
                        <p className="text-sm text-gray-500">Qty: {service.quantity}</p>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="md:w-1/2">
                      <p className="text-sm">
                        <span className="font-medium">Booking Type:</span> {service.bookingType}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Date:</span> {service.bookingDate.slice(0, 10)}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Time:</span> {service.bookingTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price and Action */}
            <div className="md:w-1/3 flex flex-col justify-between">
              <p className="font-bold text-lg">₹{order.totalAmount.toFixed(2)}</p>
              <button 
                onClick={onToggleDetails}
                className="mt-2 bg-white w-auto justify-center flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                {isExpanded ? (
                  <>
                    <span className="">View Less</span>
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>View More</span>
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-sm text-gray-500">Payment Method</h4>
                <p>{order.paymentMethod}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-500">Customer</h4>
                <p>{order.userInfo.name}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-500">Contact</h4>
                <p>{order.userInfo.phone}</p>
              </div>
            </div>
            {order.additionalInfo && (
              <div className="mt-4">
                <h4 className="font-medium text-sm text-gray-500">Additional Information</h4>
                <p className="text-sm">{order.additionalInfo}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}