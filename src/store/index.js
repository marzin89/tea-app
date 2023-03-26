import { configureStore, combineReducers } from '@reduxjs/toolkit';
import teaSlice from './slices/tea-slice';
import userSlice from './slices/user-slice';
import cartSlice from './slices/cart-slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
    tea:  teaSlice.reducer,
    user: userSlice.reducer,
    cart: cartSlice.reducer,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
