import { createSlice } from '@reduxjs/toolkit';

const ratingSlice = createSlice({
    name:         'rating',
    initialState: {
        ratings: [],
    },
    reducers: {

    }
});

export const ratingActions = ratingSlice.actions;
export default ratingSlice;