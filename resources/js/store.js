import { configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/userSlice'
import productReducer from './redux/productSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        products: productReducer,
    },
})
