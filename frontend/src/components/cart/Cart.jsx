"use client"

import { useState,useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { selectCartItems, removeFromCart, updateQuantity } from "../../redux/cartSlice"
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus } from "lucide-react"
import "./Cart.css"
import { useNavigate } from "react-router-dom"
// import { useSelector } from "react-redux"
import axios from "axios"
import { CART_API_END_POINT } from "../../utils/constent"

const CartPage = () => {
  const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((store) => store.user);
  // const [services, setServices] = useState([])
  console.log("cartIems: ",cartItems)
  


  // cartItems.map(item => cartServices(item))


  // console.log("services : ",services)

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Calculate tax (assuming 10%)
  const tax = subtotal * 0.1

  const platformFee = 7

  // Calculate total
  const total = subtotal + tax

  // Handle quantity increase
  const increaseQuantity = (id, currentQuantity) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }))
  }

  // Handle quantity decrease
  const decreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }))
    } else {
      dispatch(removeFromCart(id))
    }
  }

  const handleCheckout = async() => {
    // call an api to post cart data into backend
    if(!user){
      navigate("/login")
      return
    }
    
    try {

      const response = await axios.post(`${CART_API_END_POINT}/createCart`,{
        userId : user._id,
        cartItems : cartItems
      },{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      console.log(response)
      if(response.data.success){
        navigate("/booking");
        return response.data.message
      }
      
    } catch (error) {
      console.log(error)
      return error?.response?.data?.message
    }
  }

  // Handle item removal
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="cart-page-container w-full">
      <div className="cart-page-header">
        <Link to="/" className="back-to-shop">
          <ArrowLeft size={20} />
          <span>Continue Shopping</span>
        </Link>
        <h1>Your Cart</h1>
        <div className="cart-icon">
          <ShoppingBag size={24} />
          <span className="cart-count">{cartItems.length}</span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <motion.div
          className="empty-cart-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="empty-cart-icon">
            <ShoppingBag size={80} />
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any services to your cart yet.</p>
          <Link to="/" className="start-shopping-btn">
            Start Shopping
          </Link>
        </motion.div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-container">
            <div className="cart-items-header">
              <span className="item-header">Service</span>
              <span className="price-header">Price</span>
              <span className="quantity-header">Quantity</span>
              <span className="total-header">Total</span>
              <span className="action-header"></span>
            </div>

            <motion.div
              className="cart-items-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="cart-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <div className="item-info">
                    <div className="item-image">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h3>{item.serviceName}</h3>
                      <p className="item-description">{item.parlourName || "Professional service"}</p>
                    </div>
                  </div>

                  <div className="item-price">₹{item.price?.toFixed(2)}</div>

                  <div className="quantity-control">
                    <motion.button
                      className="quantity-btn"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => decreaseQuantity(item.id, item.quantity)}
                    >
                      <Minus size={16} />
                    </motion.button>
                    <span className="quantity-value">{item.quantity}</span>
                    <motion.button
                      className="quantity-btn"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => increaseQuantity(item.id, item.quantity)}
                    >
                      <Plus size={16} />
                    </motion.button>
                  </div>

                  <div className="item-total">₹{(item.price * item.quantity)?.toFixed(2)}</div>

                  <motion.button
                    className="remove-item-btn"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal?.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>₹{tax?.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row">
              <span>Platform Fee</span>
              <span>₹{platformFee?.toFixed(2)}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <motion.span
                key={total}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="total-amount"
              >
                ₹{total?.toFixed(2)}
              </motion.span>
            </div>
            <motion.button className="checkout-btn" onClick={handleCheckout} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Proceed to Checkout
            </motion.button>
            <div className="payment-methods">
              <p>We Accept:</p>
              <div className="payment-icons">
                <div className="payment-icon visa"></div>
                <div className="payment-icon mastercard"></div>
                <div className="payment-icon amex"></div>
                <div className="payment-icon paypal"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage

