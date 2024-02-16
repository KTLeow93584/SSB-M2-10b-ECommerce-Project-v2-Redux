import { createSlice } from '@reduxjs/toolkit';
import { currencies } from '../../datas/currency-conversion.jsx';

const currencySlice = createSlice({
    name: 'currency',
    initialState: {
        value: currencies[0]
    },
    reducers: {
        setActiveCurrency: (state, action) => {
            // Debug
            //console.log("[Set Currency] Payload.", action.payload);

            state.value = action.payload;
        }
    }
});

export const { setActiveCurrency } = currencySlice.actions;
export default currencySlice.reducer;