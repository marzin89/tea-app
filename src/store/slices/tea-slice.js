import { createSlice } from '@reduxjs/toolkit';

const teaSlice = createSlice({
    name:                'tea',
    initialState: {
        tea:             [],
        teas:            [],
        page:            [],
        pageArr:         [],
        numberOfPages:   1,
        currentPage:     1,
        currentIndex:    0,
        itemsViewed:     [],
        relatedProducts: [],
    },
    reducers: {
        fetchState(state) {
            return {...state}
        },
        setTeasAdmin(state, action) {
            return { ...state, teas: action.payload }
        },
        setTea(state, action) {
            const tea = state.teas.find((item) => item._id == action.payload);
            return { ...state, tea: tea}
        },
        setTeas(state, action) {
            let page           = [];
            const pageArr      = [];
            const currentIndex = state.currentIndex ? state.currentIndex : 0;
            let numberOfPages  = 1;

            if (action.payload.length > 9) {
                const remainder = action.payload.length % 9;
                const quotient  = Math.floor(action.payload.length / 9);
                numberOfPages   = remainder ? (quotient + 1) : (quotient);
                page            = action.payload.slice(currentIndex, (currentIndex + 9));
                
                for (let i = 0; i < numberOfPages; i++) {
                    pageArr.push(i + 1);
                }
            
            } else {
                page = action.payload.slice(0);
            }

            return { 
                ...state, 
                teas:          action.payload, 
                page:          page, 
                pageArr:       pageArr, 
                numberOfPages: numberOfPages 
            }
        },
        setCurrentPage(state, action) {
            const teas        = state.teas;
            let page          = [];
            const currentPage = action.payload;
            let currentIndex;

            if (currentPage == 1) {
                currentIndex = 0;
                page         = teas.slice(0, 9);
            
            } else {
                currentIndex = 9;
                page         = teas.slice(currentIndex, (currentIndex + 9));
            }

            return { 
                ...state, 
                page:         page, 
                currentPage:  action.payload, 
                currentIndex: currentIndex
            }
        },
        updateTea(state, action) {
            return { ...state, tea: action.payload };
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
        setRelatedProducts(state) {
            if (state.itemsViewed.length) {
                let teas = [];

                for (let i = 0; i < state.itemsViewed.length; i++) {
                    const element = state.itemsViewed[i];
                    const tea     = state.teas.find((item) => item.type == element.type && item._id != element._id);
                    teas          = tea ? teas.concat(tea) : teas;
                }
    
                return {...state, relatedProducts: teas}
            }
        }
    }
});

export const teaActions = teaSlice.actions;
export default teaSlice;