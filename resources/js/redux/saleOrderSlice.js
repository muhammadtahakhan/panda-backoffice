import { createSlice } from "@reduxjs/toolkit"

export const saleOrderSlice = createSlice({
    name: 'saleOrders',
    initialState: {
        listingData: [],
        meta:{},
        isLoading: false,
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
        fetchSuccess: (state, action)=>{
            state.listingData = action.payload;
            state.isLoading = false;
        },
        setMeta: (state, action)=>{
            state.meta = action.payload;
        },
        removeItem: (state, action)=>{
            state.listingData = state.listingData.filter(i=>i.id != action.payload);
            state.isLoading = false;
        },

    }
})

export const {showForm, hideForm, startLoading, fetchSuccess, removeItem, setMeta } = saleOrderSlice.actions
export default saleOrderSlice.reducer

export const fetchSaleOrders = (page=1, per_page=10) => async dispatch => {
    dispatch(startLoading());
    try {
        await window.axios.get(`/api/sale_order?page=${page}&per_page=${per_page}`).then(response => {
            dispatch( fetchSuccess(response.data.data) );
            dispatch( setMeta(response.data.meta) );

        }).catch(error => {
            console.log("data", error)
        })
    }
    catch (e) {
        return console.error(e.message);
    }
}

export const deleteSaleOrders = (id) => async dispatch => {
    dispatch(startLoading());
    try {
        await   window.axios.delete(`/api/sale_order/${id}`).then(response => {
            dispatch(removeItem(id));
        }).catch(error => {
            console.log("data", error)
        })
    }
    catch (e) {
        return console.error(e.message);
    }
}
