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
        }
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
                isConsent:                true,
                cookiePreferences: {
                    useFunctionalCookies: action.payload.useFunctionalCookies,
                    useAnalyticsCookies:  action.payload.useAnalyticsCookies,
                }
            }
        },
    }
});

export const userActions = userSlice.actions;
export default userSlice;