import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './feature/cart/cartSlice.jsx';
import currencyReducer from './feature/currency/currencySlice.jsx';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        currency: currencyReducer
    }
});