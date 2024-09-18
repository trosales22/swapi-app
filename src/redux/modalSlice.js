import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        selected_people_id: null,
        open_view_people_details_modal: false
    },
    reducers: {
        toggleViewPeopleDetailsModal: (state, action) => {
            state.open_view_people_details_modal = action.payload;
        },
        setSelectedPeopleId: (state, action) => {
            state.selected_people_id = action.payload;

            if(action.payload == null){
                state.open_view_people_details_modal = false;
            }else{
                state.open_view_people_details_modal = true;
            }
        }
    }
})

export const {
    toggleViewPeopleDetailsModal,
    setSelectedPeopleId
  } = modalSlice.actions;
export default modalSlice.reducer;