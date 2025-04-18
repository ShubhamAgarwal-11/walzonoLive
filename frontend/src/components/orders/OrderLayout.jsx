"use client"
import { useState, useEffect } from "react"
import { OrderCard } from "./OrderCard"
import axios from "axios"
import { BOOKING_API_END_POINT } from "../../utils/constent"

export function OrderLayout() {
  const [expandedOrderId, setExpandedOrderId] = useState(null)
  const [orderData , setOrderData] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BOOKING_API_END_POINT}/getAllBookings`, {
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
    <div className="h-screen bg-gray-100">
      <h2 className="text-3xl font-bold m-6 text-center ">Your Order History</h2>
      <div className="space-y-8 m-6">
        
        {orderData.map((order) => (
            console.log(order),
          <OrderCard
            key={order._id}
            order={order}
            isExpanded={expandedOrderId === order._id}
            onToggleDetails={() => toggleOrderDetails(order._id)}
          />
        ))}
      </div>
    </div>
  )
}
