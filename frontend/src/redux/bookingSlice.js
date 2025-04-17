import { createSlice } from "@reduxjs/toolkit"

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookingInfo : []
  },
  reducers: {
    setBookingInfo : (state , action) => {state.bookingInfo = action.payload},
  },
})

export const { setBookingInfo } = bookingSlice.actions

export const getBookingInfo = (state) => state.booking.bookingInfo;

export default bookingSlice.reducer
