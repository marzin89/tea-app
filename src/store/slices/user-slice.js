import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:                         'user',
    initialState: {
        isSignedIn:               false,
        isConsent:                false,
        useNecessaryCookies:      true,
        useFunctionalCookies:     false,
        useAnalyticsCookies:      false,
        itemsViewed:              [],
    },
    reducers: {
        login(state) {
            return {...state, isSignedIn: true};
        },
        logout(state) {
            return {...state, isSignedIn: false};
        },
        setConsentAndCookiePreferences(state, action) {
            return {
                ...state,
                isConsent:            true,
                useFunctionalCookies: action.payload.useFunctionalCookies,
                useAnalyticsCookies:  action.payload.useAnalyticsCookies,
            }
        },
        addItemViewed(state, action) {
            const itemExists = state.itemsViewed.find((item) => item._id == action.payload._id);

            if (!itemExists) {
                return {...state, itemsViewed: [...state.itemsViewed, action.payload]}
            }
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;