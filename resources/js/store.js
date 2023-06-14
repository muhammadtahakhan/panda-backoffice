import { configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/userSlice'
import productReducer from './redux/productSlice'
import partnerSlice from './redux/partnerSlice'
import saleOrderSlice from './redux/saleOrderSlice'
import purchaseOrderSlice from './redux/purchaseOrderSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        products: productReducer,
        partners: partnerSlice,
        saleOrders: saleOrderSlice,
        purchaseOrders: purchaseOrderSlice
    },
})
