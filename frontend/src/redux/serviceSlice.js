import { createSlice } from "@reduxjs/toolkit"

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    allBestServicesForMen : [],
    allBestServicesForWomen : [],
    topServicesForMen : [],
    topServicesForWomen : [],

  },
  reducers: {
    setAllBestServicesForMen: (state, action) => {
      state.allBestServicesForMen = action.payload
    },
    setAllBestServicesForWomen: (state, action) => {
      state.allBestServicesForWomen = action.payload
    },
    setTopServicesForMen: (state, action) => {
      state.topServicesForMen = action.payload
    },
    setTopServicesForWomen: (state, action) => {
      state.topServicesForWomen = action.payload
    },
  },
})

export const { setAllBestServicesForMen , setAllBestServicesForWomen , setTopServicesForMen , setTopServicesForWomen } = serviceSlice.actions

export const selectAllBestServicesForMen = (state) => state.service.allBestServicesForMen;

export const selectAllBestServicesForWomen = (state) => state.service.allBestServicesForWomen;

export const selectTopServicesForMen = (state) => state.service.topServicesForMen;

export const selectTopServicesForWomen = (state) => state.service.topServicesForWomen;


export default serviceSlice.reducer

