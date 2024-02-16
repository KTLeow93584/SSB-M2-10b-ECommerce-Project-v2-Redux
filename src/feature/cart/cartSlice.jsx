import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: []
    },
    reducers: {
        addToCart: (state, action) => {
            // Debug
            //console.log("[Add To Cart, Dispatch] Payload.", action.payload);

            state.value.push(action.payload);
        },
        modifyCart: (state, action) => {
            // Debug
            //console.log("[Modify Entire Cart, Dispatch] Payload.", action.payload);

            state.value = action.payload;
        },
        modifyCartItem: (state, action) => {
            // Debug
            //console.log("[Modify Cart Item, Dispatch] Payload.", action.payload);

            const index = action.payload.index;
            state.value[index] = action.payload.cartItem;
        },
        modifyCartItemQuantity: (state, action) => {
            // Debug
            //console.log("[Modify Quantity, Dispatch] Payload.", action.payload);

            const index = action.payload.index;
            state.value[index].quantity = action.payload.cartItemQuantity;
            state.value[index].total = state.value[index].convertedTalliedPrice * action.payload.cartItemQuantity;
        },
        removeCartItem: (state, action) => {
            // Debug
            //console.log("[Pre Deletion, Dispatch] State Value.", state.value);

            const index = action.payload.index;
            state.value.splice(index, 1);

            // Debug
            //console.log("[Post Deletion, Dispatch] State Value.", state.value);
        }
    }
});

export const {
    addToCart, removeCartItem,
    modifyCart, modifyCartItem, modifyCartItemQuantity
} = cartSlice.actions;

export default cartSlice.reducer;