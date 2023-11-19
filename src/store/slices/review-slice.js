import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
    name:         'review',
    initialState: {
        reviews: [],
    },
    reducers: {
        setReviews(state, action) {
            return {...state, reviews: action.payload};
        },
        addReview(state, action) {
            return {...state, reviews: [...state.reviews, action.payload]};
        },
    }
});

export const reviewActions = reviewSlice.actions;
export default reviewSlice;