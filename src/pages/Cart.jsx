// ==============================================
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
// ==============================================
import { useSelector } from 'react-redux';
// ==============================================
import { GetCartContext } from '../contexts/CartContext.jsx';
// ==============================================
import CartItem from '../components/CartItem.jsx';
import CheckoutButton from '../components/CheckoutButton.jsx';
// ==============================================
export default function Cart() {
    const cartContext = GetCartContext();
    const setIsCartVisible = cartContext.setIsVisible;

    const cart = useSelector((state) => state.cart.value);

    let subtotal = 0;
    cart.forEach((item) => subtotal += parseFloat(item.total));

    return (
        <Container className="d-flex flex-column align-items-start mx-0 px-0">
            <CartHeader />
            {
                cart.length > 0 ? (
                    <>
                        <CartBody cart={cart} />
                        <ShippingNotes />
                        <Subtotal subtotal={subtotal} />
                        <CartFooter setIsCartVisible={setIsCartVisible} />
                    </>
                ) : (
                    <>
                        <EmptyCartBody />
                        <EmptyCartFooter setIsCartVisible={setIsCartVisible} />
                    </>
                )
            }
        </Container>
    );
}
// ==============================================
function CartHeader() {
    return (
        <Row className="d-flex flex-row justify-content-start mt-3 mx-0 px-0 w-100">
            <Col className="col-12">
                <h4>SHOPPING CART</h4>
            </Col>
            <Col className="col-12">
                <hr className="primary-horizontal-line" />
            </Col>
        </Row>
    );
}

function CartBody({ cart }) {
    return (
        <>
            <Row className="d-flex flex-row justify-content-center w-100 mb-3 mx-0 px-0">
                <Col className="col-12 d-flex justify-content-center">
                    <CheckoutButton />
                </Col>
            </Row>
            <Row className="d-flex flex-row justify-content-center w-100 mb-3 mx-0 px-0">
                <Col className="col-12">
                    <CartItems cart={cart} />
                </Col>
            </Row>
        </>
    );
}

function CartItems({ cart }) {
    return (
        cart.map((item, index) => (
            <div key={`cart-item-display-${index}`}>
                <CartItem key={index} item={item} index={index} />
                {index < cart.length - 1 ? <hr className="primary-horizontal-line mt-2" style={{ width: "95%" }} /> : null}
            </div>))
    );
}

function ShippingNotes() {
    return (
        <Row className="d-flex flex-row justify-content-center w-100 mx-0 px-0">
            <Col className="col-12">
                <hr className="primary-horizontal-line mt-2" style={{ width: "95%" }} />
            </Col>
            <Col className="col-12">
                <p>Do you have any notes for either the shipping team or the company?</p>
            </Col>
            <Col className="col-12">
                <textarea className="w-100"
                    id={`shipping-remark`}
                    rows={5}
                    placeholder="Insert notes here."
                    style={{ resize: "none" }} />
            </Col>
        </Row>
    );
}

function Subtotal({ subtotal }) {
    const activeCurrency = useSelector((state) => state.currency.value);

    const tenPow = Math.pow(10, activeCurrency.decimalCount);

    subtotal = Math.round(subtotal * tenPow) / tenPow;
    if (activeCurrency.decimalCount > 0) {
        let subtotalStrSplit = subtotal.toString().split('.');

        subtotal = (subtotalStrSplit.length == 2) ?
            (subtotalStrSplit[0] + "." + (subtotalStrSplit[1].padEnd(activeCurrency.decimalCount, "0"))) :
            (subtotalStrSplit[0] + ".00");
    }

    return (
        <Row className="d-flex flex-row justify-content-center w-100 mt-3 mx-0 px-0">
            <Col className="col-6 d-flex justify-content-start">
                <h6>Subtotal:</h6>
            </Col>
            <Col className="col-6 d-flex justify-content-end">
                <h6>{activeCurrency.symbol} {subtotal.toLocaleString()}</h6>
            </Col>
        </Row>
    );
}

function CartFooter({ setIsCartVisible }) {
    return (
        <Row className="d-flex flex-row justify-content-center w-100 mb-3 mx-0 px-0 mt-3">
            <Col className="col-12 d-flex justify-content-center">
                <CheckoutButton />
            </Col>
            <Col className="col-12 d-flex justify-content-center">
                <ContinueShoppingButton setIsCartVisible={setIsCartVisible} />
            </Col>
        </Row>
    );
}

function EmptyCartBody() {
    return (
        <Row className="d-flex flex-row justify-content-center w-100 mx-0 px-0">
            <Col className="col-12">
                <h4>Your cart is currently empty!</h4>
            </Col>
        </Row>
    );
}

function EmptyCartFooter({ setIsCartVisible }) {
    return (
        <Row className="d-flex flex-row justify-content-center w-100 mb-3 mx-0 px-0">
            <Col className="col-12 d-flex justify-content-center">
                <ContinueShoppingButton setIsCartVisible={setIsCartVisible} />
            </Col>
        </Row>
    );
}

function ContinueShoppingButton({ setIsCartVisible }) {
    return (
        <Button
            className="w-100 mt-3 button-primary-group button-static"
            onClick={() => setIsCartVisible(false)}>
            Continue Shopping
        </Button>
    );
}
// ==============================================