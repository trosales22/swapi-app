import { configureStore } from '@reduxjs/toolkit';
import peopleSlice from './peopleSlice';
import modalSlice from './modalSlice';
import filmSlice from './filmSlice';

const store = configureStore({
    reducer: {
        modal: modalSlice,
        people: peopleSlice,
        film: filmSlice
    }
});

export default store;