import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    price : null,
    discount : null
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existingItem = state.items.find((i) => i.id === item.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...item, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload
      state.items = state.items.filter((item) => item.id !== id)
    },

    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find((i) => i.id === id)
      if (item) {
        item.quantity = quantity
      }
    },
    clearCart: (state) => {
      state.items = [] // Match the initial state property name
    },
    
    setCartItems: (state, action) => {
      // Changed from appending to replacing items
      state.items = action.payload
    },

    setCartPrice: (state , action) => {state.price = action.payload},

    setCartDiscount : (state , action) => {state.discount = action.payload}

    
  },
})

export const { addToCart, removeFromCart, decreaseQuantity, updateQuantity, clearCart, setCartItems, setCartDiscount , setCartPrice } = cartSlice.actions

export const selectCartItems = (state) => state.cart.items

export const getPrice = (state) => state.cart.price

export const getDiscount = (state) => state.cart.discount

export const selectCartItemById = (state, id) => state.cart.items.find((item) => item.id === id)

export default cartSlice.reducer

