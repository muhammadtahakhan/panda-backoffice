import { createSlice } from "@reduxjs/toolkit"

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        isLoading: false,
        error: false,
        formVisibility: false
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
        productsSuccess: (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
        },
        saveProduct: (state, action) => {
            state.products = action.payload
        },
        removeItem: (state, action) => {
            state.products = state.products.filter(i => i.id != action.payload);
            state.isLoading = false;
        },
    }
})

export const { saveProduct, productsSuccess, startLoading, hasError, showForm, hideForm, removeItem } = productSlice.actions
export default productSlice.reducer

export const fetchProducts = () => async dispatch => {
    dispatch(startLoading());
    try {
        await window.axios.get('/api/product').then(response => {
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

// delete Product using api
export const deleteProduct = (id) => async dispatch => {
    // Show a confirmation dialog to the user
    const confirmed = window.confirm("Are you sure you want to delete this product?");

    // If the user confirmed, proceed with the delete operation
    if (confirmed) {
        dispatch(startLoading());
        try {
            await window.axios
                .delete(`/api/product/${id}`)
                .then(response => {
                    dispatch(removeItem(id));
                })
                .catch(error => {
                    console.log("----> Data", error);
                })
        }
        catch (e) {
            return console.error(e.message);
        }
    }
};