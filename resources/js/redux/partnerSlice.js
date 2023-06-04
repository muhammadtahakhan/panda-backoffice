import { createSlice } from "@reduxjs/toolkit"

export const partnerSlice = createSlice({
    name: 'partners',
    initialState: {
        listingData: [],
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
        removeItem: (state, action) => {
            state.listingData = state.listingData.filter(i => i.id != action.payload);
            state.isLoading = false;
        },

    }
})

export const { showForm, hideForm, startLoading, fetchSuccess, removeItem } = partnerSlice.actions
export default partnerSlice.reducer

export const fetchPartners = () => async dispatch => {
    dispatch(startLoading());
    try {
        await window.axios.get('/api/partner?page=1&per_page=100').then(response => {

            dispatch(fetchSuccess(response.data.data))
        }).catch(error => {

        })
    }
    catch (e) {
        return console.error(e.message);
    }
}


// /////////////////////// \4\6\2023\ //////////////////////////
export const deletePartners = (id) => async dispatch => {
    dispatch(startLoading());
    try {
        await window.axios.delete(`/api/partner/${id}`).then(response => {
            dispatch(removeItem(id));
        }).catch(error => {
            console.log("----> Data", error);
        })
    }
    catch (e) {
        return console.error(e.message);
    }
};
    // /////////////////////// \4\6\2023\ //////////////////////////
