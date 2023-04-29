import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:                         'user',
    initialState: {
        isSignedIn:               false,
        isConsent:                false,
        cookiePreferences: {
            useNecessaryCookies:  true,
            useFunctionalCookies: false,
            useAnalyticsCookies:  false,
        },
        itemsViewed:              [],
    },
    reducers: {
        fetchState(state) {
            return {...state}
        },
        login(state) {
            return {...state, isSignedIn: true};
        },
        logout(state) {
            return {...state, isSignedIn: false};
        },
        setConsentAndCookiePreferences(state, action) {
            return {
                ...state,
                isConsent:                true,
                cookiePreferences: {
                    useFunctionalCookies: action.payload.useFunctionalCookies,
                    useAnalyticsCookies:  action.payload.useAnalyticsCookies,
                }
            }
        },
        setItemsViewed(state, action) {
            const itemExists = state.itemsViewed.find((item) => item._id == action.payload._id);
            const length     = state.itemsViewed.length;
            let itemsViewed  = length ? [...state.itemsViewed] : [];

            if (!itemExists) {
                if (length == 3) {
                    itemsViewed = itemsViewed.slice(1);
                }

                itemsViewed.push(action.payload);
            }

            return {...state, itemsViewed: itemsViewed}
        },
    }
});

export const userActions = userSlice.actions;
export default userSlice;