import { configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/userSlice'
import productReducer from './redux/productSlice'
import partnerSlice from './redux/partnerSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        products: productReducer,
        partners: partnerSlice,
    },
})
