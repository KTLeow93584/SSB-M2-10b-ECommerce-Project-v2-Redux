
import { useContext, createContext, useState } from 'react';

const CartContext = createContext({ isVisible: false, setIsVisible: null });
export function GetCartContext() {
    return useContext(CartContext);
}

export function CartContextProvider({ children }) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <CartContext.Provider value={{ isVisible: isVisible, setIsVisible: setIsVisible }}>
            {children}
        </CartContext.Provider>
    );
}