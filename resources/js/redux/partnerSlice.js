import { createSlice } from "@reduxjs/toolkit"

export const partnerSlice = createSlice({
    name: 'partners',
    initialState: {
        listingData: [],
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

    }
})

export const {showForm, hideForm, startLoading, fetchSuccess } = partnerSlice.actions
export default partnerSlice.reducer

 export const fetchPartners = () => async dispatch => {
        dispatch(startLoading());
        try {
            await   window.axios.get('/api/partner?page=1&per_page=100').then(response => {
                console.log("partners :", response.data.data)
                dispatch(fetchSuccess(response.data.data))
            }).catch(error => {
                console.log("data", error)
            })
        }
        catch (e) {
            return console.error(e.message);
        }
    }
