import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name:         'cart',
    initialState: {
        items:    [],
        showCart: false,
        subtotal: 0,
    },
    reducers: {
        show(state) {
            return { ...state, showCart: true };
        },
        hide(state) {
            return { ...state, showCart: false };
        },
        add(state, action) {
            return { 
                ...state, 
                items: action.payload,
                subtotal: action.payload.reduce((total, current) => 
                    {return total + current.sum}, 0), 
            };
        },
        change(state, action) {
            return { 
                ...state, 
                items: action.payload,
                subtotal: action.payload.reduce((total, current) => 
                    {return total + current.sum}, 0), 
            };
        },
        delete(state, action) {
            return { 
                ...state, 
                items: action.payload,
                subtotal: action.payload.reduce((total, current) => 
                    {return total + current.sum}, 0), 
            };
        },
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;