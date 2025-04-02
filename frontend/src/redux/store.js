import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice'
import cartSlice from "./cartSlice";
import partnerSlice from "./partnerSlice";
import serviceSlice from "./serviceSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    user : userSlice,
    cart : cartSlice,
    partner : partnerSlice,
    service : serviceSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
})

export default store;
