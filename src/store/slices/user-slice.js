import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:           'user',
    initialState: {
        isSignedIn: false,
    },
    reducers: {
        login(state) {
            return {...state, isSignedIn: true};
        },
        logout(state) {
            return {...state, isSignedIn: false};
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;