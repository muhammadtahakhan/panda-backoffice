import { createSlice } from "@reduxjs/toolkit"

export const purchaseOrderSlice = createSlice({
    name: 'purchaseOrders',
    initialState: {
        listingData: [],
        meta: {},
        isLoading: false,
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
        fetchSuccess: (state, action) => {
            state.listingData = action.payload;
            state.isLoading = false;
        },
        setMeta: (state, action) => {
            state.meta = action.payload;
        },
        removeItem: (state, action) => {
            state.listingData = state.listingData.filter(i => i.id != action.payload);
            state.isLoading = false;
        },

    }
})

export const { showForm, hideForm, startLoading, fetchSuccess, removeItem, setMeta } = purchaseOrderSlice.actions
export default purchaseOrderSlice.reducer

export const fetchPurchaseOrders = (page = 1, per_page = 10) => async dispatch => {
    dispatch(startLoading());
    try {
        await window.axios.get(`/api/purchase_order?page=${page}&per_page=${per_page}`).then(response => {
            dispatch(fetchSuccess(response.data.data));
            dispatch(setMeta(response.data.meta));

        }).catch(error => {
            console.log("data", error)
        })
    }
    catch (e) {
        return console.error(e.message);
    }
}

export const deletePurchaseOrder = (id) => async dispatch => {
    dispatch(startLoading());
    try {
        await window.axios.delete(`/api/purchase_order/${id}`).then(response => {
            dispatch(removeItem(id));
        }).catch(error => {
            console.log("data", error)
        })
    }
    catch (e) {
        return console.error(e.message);
    }
}
