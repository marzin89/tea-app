import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:                         'user',
    initialState: {
        isSignedIn:               false,
        isConsent:                false,
        showCookiesBanner:        true,
        cookiePreferences: {
            useNecessaryCookies:  true,
            useFunctionalCookies: false,
            useAnalyticsCookies:  false,
        },
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
                showCookiesBanner:        false,
                cookiePreferences: {
                    useFunctionalCookies: action.payload.useFunctionalCookies,
                    useAnalyticsCookies:  action.payload.useAnalyticsCookies,
                }
            }
        },
        toggleCookiesBanner(state, action) {
            return {...state, showCookiesBanner: action.payload}
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;