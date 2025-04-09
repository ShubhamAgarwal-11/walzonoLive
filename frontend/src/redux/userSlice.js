import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name : 'user',
    initialState : {
        user : null,
        location : "india",
        partnerInfo : null,
        partnerDocument : null,
        partnerBankInfo : null
    },
    reducers : {
        // multiple actions here
        getUser:(state,action)=>{
            state.user = action.payload;
        },
        addLocation:(state,action)=>{
            state.location = action.payload
        },
        getPartnerInfo:(state,action)=>{
            state.partnerInfo = action.payload
        },
        getPartnerDocument:(state,action)=>{
            state.partnerDocument = action.payload
        },
        getPartnerBankInfo:(state,action)=>{
            state.partnerBankInfo = action.payload
        },
        logoutUser: (state) => {
            state.user = null;
        }
    }
});

export const {getUser , addLocation , getPartnerBankInfo , getPartnerInfo , getPartnerDocument, logoutUser} = userSlice.actions;
export default userSlice.reducer