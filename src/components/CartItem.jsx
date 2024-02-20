// ==============================================
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// ==============================================
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
// ==============================================
import { useSelector, useDispatch } from 'react-redux';
import { removeCartItem, modifyCartItemQuantity } from '../feature/cart/cartSlice';
// ==============================================
const minNumberPerItem = 0;
const maxNumberPerItem = 99;
// ==============================================
export default function CartItem({ item, index }) {
    const activeCurrency = useSelector((state) => state.currency.value);

    const itemFullImageSrcPath = "../assets/" + item.src;
    const dispatch = useDispatch();

    function addOrSubtractQuantity(isAdd) {
        dispatch(modifyCartItemQuantity({
            index: index,
            cartItemQuantity: isAdd ? (item.quantity + 1) : (item.quantity - 1)
        }));
    }

    function modifyQuantity(newQuantity) {
        dispatch(modifyCartItemQuantity({
            index: index,
            cartItemQuantity: newQuantity
        }));
    }

    function removeItem() {
        dispatch(removeCartItem({ index: index }));
    }

    const tenPow = Math.pow(10, activeCurrency.decimalCount);

    let itemIndividualPrice = Math.round(item.convertedTalliedPrice * tenPow) / tenPow;
    if (activeCurrency.decimalCount > 0) {
        let itemIndivdualPriceSplit = itemIndividualPrice.toString().split('.');

        itemIndividualPrice = (itemIndivdualPriceSplit.length == 2) ?
            (itemIndivdualPriceSplit[0] + "." + (itemIndivdualPriceSplit[1].padEnd(activeCurrency.decimalCount, "0"))) :
            (itemIndivdualPriceSplit[0] + ".00");
    }

    let itemTotal = Math.round(item.total * tenPow) / tenPow;
    if (activeCurrency.decimalCount > 0) {
        let itemTotalSplit = itemTotal.toString().split('.');
        itemTotal = (itemTotalSplit.length == 2) ?
            (itemTotalSplit[0] + "." + (itemTotalSplit[1].padEnd(activeCurrency.decimalCount, "0"))) :
            (itemTotalSplit[0] + ".00");
    }

    return (
        <Col className="col-12">
            <Card className="mb-2 cart-item">
                <Card.Body>
                    <Row>
                        <Col md={12} lg={4}
                            className="d-flex flex-row align-items-lg-start align-items-md-center justify-content-center">
                            <Card.Img
                                variant='top'
                                src={new URL(itemFullImageSrcPath, import.meta.url)}
                                alt={item.name} />
                        </Col>
                        <Col md={12} lg={8}
                            className="d-flex flex-column align-items-lg-start align-items-md-center justify-content-center">
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                            <Row className="d-flex flex-row align-items-center justify-content-center w-100">
                                <Col className="col-lg-6 col-12 d-flex flex-row align-items-center justify-content-center">
                                    <Button className="btn-sm button-primary-group button-static button-click-animated me-1"
                                        style={{ minWidth: "35px", width: "22%" }}
                                        onClick={() => {
                                            const willDelete = item.quantity - 1 <= 0;
                                            addOrSubtractQuantity(false);

                                            if (willDelete)
                                                removeItem();
                                        }}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </Button>
                                    <Form.Control
                                        id={`cart-input-${index}`}
                                        min={minNumberPerItem} max={maxNumberPerItem}
                                        type="number" placeholder="0"
                                        style={{ minWidth: "35px", width: "22%", textAlign: "center" }}
                                        value={item.quantity}
                                        onChange={(event) => {
                                            const willDelete = event.target.value <= 0;
                                            modifyQuantity(event.target.value);

                                            if (willDelete)
                                                removeItem();
                                        }}
                                        onFocus={(event) => event.target.select()} />
                                    <Button className="btn-sm button-primary-group button-static button-click-animated ms-1"
                                        style={{ minWidth: "35px", width: "22%" }}
                                        onClick={() => addOrSubtractQuantity(true)}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                </Col>
                                <Col className="col-lg-6 col-12 d-flex align-items-center justify-content-md-center justify-content-end">
                                    <p className="fs-6 fw-bold text-danger my-0 text-center">
                                        {
                                            activeCurrency.symbol + itemIndividualPrice.toLocaleString() +
                                            " x " +
                                            item.quantity +
                                            " = " +
                                            activeCurrency.symbol + itemTotal.toLocaleString()
                                        }
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card >
        </Col >
    );
}
// ==============================================