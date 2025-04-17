"use client"

import { useState, useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { 
  selectCartItems, 
  removeFromCart, 
  updateQuantity, 
  setCartItems,
  clearCart, 
  setCartPrice,
  setCartDiscount
} from "../../redux/cartSlice"
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus } from "lucide-react"
import axios from "axios"
import { CART_API_END_POINT } from "../../utils/constent"
import { toast } from "react-hot-toast"
import "./Cart.css"

const CartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector(selectCartItems)
  const { user } = useSelector((store) => store.user)

  const [loading, setLoading] = useState(false)
  const [processingId, setProcessingId] = useState(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // ✅ Updated getCart to merge local and server items
  const getCart = useCallback(async () => {
    if (!user?._id) return

    try {
      const response = await axios.get(`${CART_API_END_POINT}/getCart`, {
        params: { userId: user._id },
        withCredentials: true
      })

      const fetchedItems = response?.data?.cart?.cartItems || []

      if (response.data.success && isInitialLoad) {
        const currentCart = [...cartItems]

        const mergedCart = [...fetchedItems]
        currentCart.forEach(localItem => {
          const exists = fetchedItems.find(item => item.id === localItem.id)
          if (!exists) {
            mergedCart.push(localItem)
          }
        })

        dispatch(clearCart())
        dispatch(setCartItems(mergedCart))
        setIsInitialLoad(false)
      }
    } catch (error) {
      toast.error("Failed to load cart")
      console.error("Error fetching cart:", error)
    }
  }, [user, dispatch, isInitialLoad, cartItems])

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.1   // now we give 10% discount 5% of total subtotal amount. 
  const platformFee = 7
  const discount = subtotal * 0.05;
  const totalWithoutDiscount = subtotal + tax + platformFee;
  const total = subtotal + tax + platformFee - discount

  const handleQuantityUpdate = async (id, newQuantity) => {
    const originalQuantity = cartItems.find(item => item.id === id)?.quantity
    dispatch(updateQuantity({ id, quantity: newQuantity }))

    if (user) {
      try {
        setProcessingId(id)
        await axios.post(
          `${CART_API_END_POINT}/updateCart`,
          { userId: user._id, serviceId: id, quantity: newQuantity },
          { withCredentials: true }
        )
      } catch (error) {
        toast.error("Failed to update quantity")
        dispatch(updateQuantity({ id, quantity: originalQuantity }))
      } finally {
        setProcessingId(null)
      }
    }
  }

  const handleIncreaseQuantity = async (id, currentQuantity) => {
    const newQuantity = currentQuantity + 1
    await handleQuantityUpdate(id, newQuantity)
  }

  const handleDecreaseQuantity = async (id, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1
      await handleQuantityUpdate(id, newQuantity)
    } else {
      await handleRemoveItem(id)
    }
  }

  const handleRemoveItem = async (id) => {
    if (user) {
      try {
        setProcessingId(id)
        await axios.post(
          `${CART_API_END_POINT}/deleteFromCart`,
          { userId: user._id, serviceId: id },
          { withCredentials: true }
        )
        dispatch(removeFromCart(id))
      } catch (error) {
        toast.error("Failed to remove item")
      } finally {
        setProcessingId(null)
      }
    } else {
      dispatch(removeFromCart(id))
    }
  }

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login")
      return
    }

    setLoading(true)
    try {
      await axios.post(
        `${CART_API_END_POINT}/createCart`,
        { userId: user._id, cartItems },
        { withCredentials: true }
      )
      setIsInitialLoad(true)
      await getCart()
      dispatch(setCartPrice(totalWithoutDiscount))
      dispatch(setCartDiscount(discount))
      navigate("/booking")
    } catch (error) {
      toast.error("Checkout failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getCart()
  }, [getCart])

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
                      onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                      disabled={processingId === item.id}
                    >
                      <Minus size={16} />
                    </motion.button>
                    <span className="quantity-value">{item.quantity}</span>
                    <motion.button
                      className="quantity-btn"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                      disabled={processingId === item.id}
                    >
                      <Plus size={16} />
                    </motion.button>
                  </div>

                  <div className="item-total">₹{(item.price * item.quantity)?.toFixed(2)}</div>

                  <motion.button
                    className="remove-item-btn"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={processingId === item.id}
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
              <span>Incl changes</span>
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
            <hr className="bold border border-gray-400 my-2" />
            <div className="summary-row">
              <span>Grand Total</span>
              <span>₹{totalWithoutDiscount?.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="text-green-700 font-bold">WZ Exclusive Discount</span>
              <span className="text-green-700 font-bold">₹{discount?.toFixed(2)}</span>
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
            <motion.button 
              className="checkout-btn" 
              onClick={handleCheckout} 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
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
