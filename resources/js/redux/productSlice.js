import { createSlice } from "@reduxjs/toolkit"

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        isLoading: false,
        error: false,
        formVisibility:false
    },
    reducers: {
        hideForm: state => {
            state.formVisibility = false;
        },
        showForm: state => {
            state.formVisibility = true;
        },
        startLoading: state => {
                state.isLoading = true;
            },
        hasError: (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            },
        productsSuccess: (state, action)=>{
            state.products = action.payload;
            state.isLoading = false;
        },
        saveProduct: (state, action) => {
            state.products = action.payload
        },
    }
})

export const { saveProduct, productsSuccess, startLoading, hasError, showForm, hideForm } = productSlice.actions
export default productSlice.reducer

 export const fetchProducts = () => async dispatch => {
        dispatch(startLoading());
        try {
            await   window.axios.get('/api/product').then(response => {
                dispatch(productsSuccess(response.data.data))
            }).catch(error => {
                // handleError(error)
                console.log("data", error)
            })
        }
        catch (e) {
            return console.error(e.message);
        }
    }
