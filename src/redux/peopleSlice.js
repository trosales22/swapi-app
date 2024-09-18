import {
    createSlice,
    createAsyncThunk
  } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPeople = createAsyncThunk("getAllPeople", async ({ search, page } = {}) => {
    const res = await axios.get(`/api/people`, {
        params: {
            search,
            page
        }
    });
    return res.data;
});

export const getPeopleById = createAsyncThunk("getPeopleById", async (id) => {
    const res = await axios.get(`/api/people/${id}`);
    return res.data;
});

export const peopleSlice = createSlice({
    name: "peopleSlice",
    initialState: {
        list: [],
        is_listing_loading: false,
        is_listing_error: false,
        is_fetch_by_id_loading: false,
        is_fetch_by_id_error: false,
        details: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPeople.pending, (state) => {
                state.is_listing_loading = true;
            })
            .addCase(getAllPeople.fulfilled, (state, action) => {
                state.list = action.payload;
                state.is_listing_loading = false;
                state.is_listing_error = false;
            })
            .addCase(getAllPeople.rejected, (state) => {
                state.is_listing_loading = false;
                state.is_listing_error = true;
            })
            .addCase(getPeopleById.pending, (state) => {
                state.is_fetch_by_id_loading = true;
            })
            .addCase(getPeopleById.fulfilled, (state, action) => {
                state.is_fetch_by_id_loading = false;
                state.is_fetch_by_id_error = false;
                state.details = action.payload;
            })
            .addCase(getPeopleById.rejected, (state) => {
                state.is_fetch_by_id_loading = false;
                state.is_fetch_by_id_error = true;
            })
    }
});

export default peopleSlice.reducer;