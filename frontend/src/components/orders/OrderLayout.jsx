
"use client"
import { useState, useEffect } from "react"
import { OrderCard } from "./OrderCard"
import axios from "axios"
import { BOOKING_API_END_POINT } from "../../utils/constent"
import { useSelector } from "react-redux"

export function OrderLayout() {
  const [expandedOrderId, setExpandedOrderId] = useState(null)
  const [orderData , setOrderData] = useState([])
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BOOKING_API_END_POINT}/getAllBookingsByUserId/${user?._id}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        if (response.data.success) {
          setOrderData(response.data.bookings)
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
        return
      }
    }

    fetchOrders()
  }, [])

  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null)
    } else {
      setExpandedOrderId(orderId)
    }
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <h2 className="text-3xl font-bold m-6 text-center">Your Order History</h2>
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="space-y-8">
          {orderData.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              isExpanded={expandedOrderId === order._id}
              onToggleDetails={() => toggleOrderDetails(order._id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}