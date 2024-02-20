// ==============================================
import './ProductGrid.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Form from 'react-bootstrap/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addToCart, modifyCartItemQuantity } from '../feature/cart/cartSlice.jsx';
import { useSelector } from 'react-redux';
// ==============================================
const minNumberPerItem = 0;
const maxNumberPerItem = 99;
// ==============================================
// Grid-based (Row -> Column) Product Render.
export default function ProductGrid({ catalogue }) {
    const activeCurrency = useSelector((state) => state.currency.value);
    const activeCart = useSelector((state) => state.cart.value);
    const dispatch = useDispatch();

    const [quantities, setQuantities] = useState(catalogue.map(() => 0));
    const results = [];

    function addItemToCart(index) {
        // Do not add to cart if quantity = 0.
        if (quantities[index] <= 0)
            return;

        const existingCartItemIndex = activeCart.findIndex((cartItem) => cartItem.name === catalogue[index].name);
        if (existingCartItemIndex !== -1) {
            dispatch(modifyCartItemQuantity({
                index: existingCartItemIndex,
                cartItemQuantity: activeCart[existingCartItemIndex].quantity + quantities[index]
            }));
        }
        else {
            const discountedPrice = catalogue[index].discountedCost ?? catalogue[index].cost;
            const item = {
                name: catalogue[index].name,
                description: catalogue[index].description,
                src: catalogue[index].src,
                quantity: quantities[index],
                basePrice: catalogue[index].cost,
                baseDiscountedPrice: discountedPrice,
                convertedBasePrice: catalogue[index].cost * activeCurrency.globalRate,
                convertedTalliedPrice: discountedPrice * activeCurrency.globalRate
            };
            item.total = item.convertedTalliedPrice * item.quantity;

            // Debug
            //console.log("[Add To Cart, Pre-Dispatch] Item.", item);

            dispatch(addToCart(item));
        }
    }

    function quantityMathModify(previousQuantityData, index, isAdd = true) {
        const newData = [...previousQuantityData];
        newData[index] = isAdd ? Math.min(maxNumberPerItem, parseInt(previousQuantityData[index]) + 1) :
            Math.max(minNumberPerItem, parseInt(previousQuantityData[index]) - 1);

        // Debug
        //console.log("[Arrow Buttons] Adjusting [" + index + "]: " + newData[index]);

        setQuantities(newData);
    }

    function quantityDirectSet(previousQuantityData, index, newValue) {
        const newData = [...previousQuantityData];
        newData[index] = parseInt(newValue);

        // Debug
        //console.log("[Input Type] Setting [" + index + "]: " + newData[index]);

        setQuantities(newData);
    }

    for (let i = 0; i < catalogue.length; ++i) {
        const catalogueItem = catalogue[i];
        const itemFullImageSrcPath = "../assets/" + catalogueItem.src;

        const tenPow = Math.pow(10, activeCurrency.decimalCount);

        let catalogueItemBasePrice = Math.round(catalogueItem.cost * activeCurrency.globalRate * tenPow) / tenPow;
        if (activeCurrency.decimalCount > 0) {
            let basePriceSplit = catalogueItemBasePrice.toString().split('.');
            catalogueItemBasePrice = (basePriceSplit.length == 2) ?
                (basePriceSplit[0] + "." + (basePriceSplit[1].padEnd(activeCurrency.decimalCount, "0"))) :
                (basePriceSplit[0] + ".00");
        }

        let catalogueItemDiscountedPrice = Math.round(catalogueItem.discountedCost * activeCurrency.globalRate * tenPow) / tenPow;
        if (activeCurrency.decimalCount > 0) {
            let discountedPriceSplit = catalogueItemDiscountedPrice.toString().split('.');
            catalogueItemDiscountedPrice = (discountedPriceSplit.length == 2) ?
                (discountedPriceSplit[0] + "." + (discountedPriceSplit[1].padEnd(activeCurrency.decimalCount, "0"))) :
                (discountedPriceSplit[0] + ".00");
        }

        results.push(
            <Col
                key={`hot-deals-catalogue-${i}`}
                className="col-12 col-lg-6 col-xxl-4 mb-2">
                <Card
                    className="card-container-product align-items-center text-center bg-light"
                    data-bs-theme="light">
                    <Card.Img
                        variant="top"
                        className="card-thumbnail-product"
                        src={new URL(itemFullImageSrcPath, import.meta.url).href} />

                    <Card.Body className="w-100">
                        <Card.Title className="fs-5 mb-2">{catalogueItem.name}</Card.Title>

                        <div className="d-flex flex-row justify-content-evenly">
                            <Card.Text className={`fs-4 fw-bold mb-2 
                ${catalogueItem.discountedCost !== null ? "text-danger text-decoration-line-through" : "text-success"}`}>
                                {activeCurrency.symbol + catalogueItemBasePrice.toLocaleString()}
                            </Card.Text>

                            <Card.Text className={`fs-4 fw-bold mb-2 ${catalogueItem.discountedCost !== null ? "" : "d-none"}`}>
                                ➵💗
                            </Card.Text>

                            <Card.Text className={`fs-4 text-success fw-bold mb-2 ${catalogueItem.discountedCost !== null ? "" : "d-none"}`}>
                                {activeCurrency.symbol + catalogueItemDiscountedPrice.toLocaleString()}
                            </Card.Text>
                        </div>

                        <hr className="border-2 horizontal-line-text" />

                        <Form className="d-flex flex-row align-items-center justify-content-evenly"
                            onSubmit={(event) => {
                                event.preventDefault();
                                addItemToCart(i);
                            }}>
                            <Form.Group className="col-6">
                                <Button type="submit" className="btn-sm button-primary-group button-static button-click-animated"
                                    style={{ fontSize: "0.7em" }}>
                                    Add to Cart
                                </Button>
                            </Form.Group>
                            <Form.Group className=" col-6 d-flex flex-row justify-content-center">
                                <Button className="btn-sm button-primary-group button-static button-click-animated me-1"
                                    onClick={() => quantityMathModify(quantities, i, false)}
                                    style={{ minWidth: "35px" }}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </Button>
                                <Form.Control
                                    id={`catalogue-input-${i}`}
                                    min={minNumberPerItem} max={maxNumberPerItem}
                                    type="number" placeholder="0"
                                    style={{ minWidth: "35px", width: "22%", textAlign: "center" }}
                                    value={parseInt(quantities[i])}
                                    onChange={(event) => quantityDirectSet(quantities, i, event.target.value)}
                                    onFocus={(event) => event.target.select()} />
                                <Button className="btn-sm button-primary-group button-static button-click-animated ms-1"
                                    onClick={() => quantityMathModify(quantities, i, true)}
                                    style={{ minWidth: "35px" }}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Col >
        );
    }

    return (
        <Row className="justify-content-center mb-5" style={{ width: "70%" }}>
            {results}
        </Row>
    );
}
// ==============================================