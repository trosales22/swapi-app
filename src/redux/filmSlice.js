import {
    createSlice,
    createAsyncThunk
  } from "@reduxjs/toolkit";
import axios from "axios";

export const getFilmById = createAsyncThunk("getFilmById", async (id) => {
    const res = await axios.get(`/api/films/${id}`);
    return res.data;
});

export const filmSlice = createSlice({
    name: "filmSlice",
    initialState: {
        is_fetch_by_id_loading: false,
        is_fetch_by_id_error: false,
        titles: []
    },
    reducers: {
        clearTitles: (state) => {
            state.titles = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFilmById.pending, (state) => {
                state.is_fetch_by_id_loading = true;
            })
            .addCase(getFilmById.fulfilled, (state, action) => {
                state.is_fetch_by_id_loading = false;
                state.is_fetch_by_id_error = false;
                const { title } = action.payload;
                state.titles.push(title);
            })
            .addCase(getFilmById.rejected, (state) => {
                state.is_fetch_by_id_loading = false;
                state.is_fetch_by_id_error = true;
            })
    }
});

export const { clearTitles } = filmSlice.actions;
export default filmSlice.reducer;