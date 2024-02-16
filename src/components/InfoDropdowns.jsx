// ==============================================
import Dropdown from 'react-bootstrap/Dropdown';
// ==============================================
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// ==============================================
import { modifyCart } from '../feature/cart/cartSlice.jsx';

import { currencies } from '../datas/currency-conversion.jsx';
import { setActiveCurrency } from '../feature/currency/currencySlice.jsx';
// ==============================================
export function LanguageDropdown() {
    const [selectedItem, setSelectedItem] = useState("EN");

    const handleSelect = (eventKey) => {
        // eventKey contains the value of the selected item
        setSelectedItem(eventKey);
    };

    return (
        <Dropdown onSelect={handleSelect}
            className="d-flex justify-content-center me-2"
            data-bs-theme="dark">
            <Dropdown.Toggle id="dropdown-basic-language" className="dropdown-options-container">
                {selectedItem}
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-options-container">
                <Dropdown.Item eventKey="EN" active={selectedItem === "EN"}>
                    EN
                </Dropdown.Item>
                <Dropdown.Item eventKey="Malay" active={selectedItem === "Malay"}>
                    Malay
                </Dropdown.Item>
                <Dropdown.Item eventKey="CN (Simplified)" active={selectedItem === "CN (Simplified)"}>
                    CN (Simplified)
                </Dropdown.Item>
                <Dropdown.Item eventKey="CN (Traditional)" active={selectedItem === "CN (Traditional)"}>
                    CN (Traditional)
                </Dropdown.Item>
                <Dropdown.Item eventKey="JP" active={selectedItem === "JP"}>
                    JP
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
// ==============================================
export function CurrencyDropdown() {
    const activeCurrency = useSelector((state) => state.currency.value);
    const cart = useSelector((state) => state.cart.value);
    const dispatch = useDispatch();

    const handleSelect = (eventKey) => {
        // "eventKey" contains the value of the selected item
        dispatch(setActiveCurrency(currencies[eventKey]));

        // Can't use original object (Original is set to "read-only" by redux), need to clone the object.
        const newCart = cart.map(item => ({ ...item }));

        // Debug
        //console.log("[On Pre Cart Dispatch] Selected Cart [Original}].", newCart);

        for (let i = 0; i < newCart.length; ++i) {
            newCart[i].convertedBasePrice = newCart[i].basePrice * currencies[eventKey].globalRate;
            newCart[i].convertedTalliedPrice = newCart[i].baseDiscountedPrice * currencies[eventKey].globalRate;
            newCart[i].total = newCart[i].convertedTalliedPrice * newCart[i].quantity;
        }

        // Debug
        //console.log("[On Pre Cart Dispatch] Selected Cart [Modified}].", newCart);
        dispatch(modifyCart(newCart));
    };

    return (
        <Dropdown onSelect={handleSelect}
            className="d-flex justify-content-center me-2"
            data-bs-theme="dark">
            <Dropdown.Toggle id="dropdown-basic-currency" className="dropdown-options-container">
                {`${activeCurrency.abbr.toUpperCase()} (${activeCurrency.symbol})- ${activeCurrency.name}`}
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-options-container">
                {
                    currencies.map((currency, index) => {
                        return (
                            <Dropdown.Item key={`currency-${currency.abbr}`}
                                eventKey={index}
                                active={activeCurrency.abbr === currencies[index].abbr}>
                                {`${currency.abbr.toUpperCase()} (${currency.symbol})- ${currency.name}`}
                            </Dropdown.Item>
                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}
// ==============================================
export function CountryDropdown() {
    const [selectedItem, setSelectedItem] = useState("United States");

    const handleSelect = (eventKey) => {
        // eventKey contains the value of the selected item
        setSelectedItem(eventKey);
    };

    return (
        <Dropdown onSelect={handleSelect}
            className="d-flex justify-content-center me-2"
            data-bs-theme="dark">
            <Dropdown.Toggle id="dropdown-basic-country" className="dropdown-options-container">
                {selectedItem}
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-options-container">
                <Dropdown.Item eventKey="United States" active={selectedItem === "United States"}>
                    United States
                </Dropdown.Item>
                <Dropdown.Item eventKey="Malaysia" active={selectedItem === "Malaysia"}>
                    Malaysia
                </Dropdown.Item>
                <Dropdown.Item eventKey="China" active={selectedItem === "China"}>
                    China
                </Dropdown.Item>
                <Dropdown.Item eventKey="Japan" active={selectedItem === "Japan"}>
                    Japan
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
// ==============================================