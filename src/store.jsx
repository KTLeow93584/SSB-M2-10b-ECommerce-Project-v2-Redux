import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './feature/cart/cartSlice.jsx';

export const store = configureStore({
    reducer: {
        cart: cartReducer
    }
});