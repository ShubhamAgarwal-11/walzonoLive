"use client"

import { useState } from "react"
import { CreditCard, Wallet } from "lucide-react"

export default function PaymentOptions() {
  const [paymentMethod, setPaymentMethod] = useState("cod")

  return (
    <div className="container mx-auto py-6 px-4 lg:px-20 md:px-10 ">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Options */}
        <div className="lg:col-span-2">
          <div className="border rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Payment Options</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-4 rounded-md border p-4">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mt-1"
                  />
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="cod" className="flex items-center gap-2 font-medium cursor-pointer">
                      <Wallet className="h-5 w-5" />
                      Cash on Delivery (COD)
                    </label>
                    <p className="text-sm text-gray-500 mt-1">Pay with cash when your order is delivered</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 rounded-md border p-4">
                  <input
                    type="radio"
                    id="online"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                    className="mt-1"
                  />
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="online" className="flex items-center gap-2 font-medium cursor-pointer">
                      <CreditCard className="h-5 w-5" />
                      Online Payment
                    </label>
                    <p className="text-sm text-gray-500 mt-1">Pay now using credit/debit card or other online methods</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Booking Summary</h2>
            </div>
            <div className="p-4 space-y-4">
              {/* Item details */}
              <div className="space-y-2">
                <h3 className="font-medium">Item Details</h3>
                <div className="flex justify-between text-sm">
                  <span>Premium Room</span>
                  <span>$120.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>2 nights</span>
                  <span>x2</span>
                </div>
              </div>

              <div className="border-b"></div>

              {/* Additional charges */}
              <div className="space-y-2">
                <h3 className="font-medium">Additional Charges</h3>
                <div className="flex justify-between text-sm">
                  <span>Taxes</span>
                  <span>$24.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service Fee</span>
                  <span>$10.00</span>
                </div>
              </div>

              <div className="border-b"></div>

              {/* Total */}
              <div className="flex justify-between font-medium">
                <span>Total Amount</span>
                <span>$274.00</span>
              </div>
            </div>
            <div className="p-4">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                {paymentMethod === "cod" ? "Place Order" : "Proceed to Pay"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
