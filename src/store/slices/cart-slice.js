import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name:               'cart',
    initialState: {
        items:          [],
        showCart:       false,
        subtotal:       0,
        shippingMethod: 'instabox',
        shippingCost:   29,
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
        setShippingMethod(state, action) {
            return { ...state, shippingMethod: action.payload };
        },
        calculateShippingCost(state) {
            if (state.subtotal <= 499) {
                if (state.shippingMethod == 'home-delivery') {
                    return { ...state, shippingCost: 49 };
                
                } else if (state.shippingMethod == 'service-point') {
                    return { ...state, shippingCost: 39 };
                }
    
                return { ...state, shippingCost: 29 };
            }

            return { ...state, shippingCost: 0 };
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;