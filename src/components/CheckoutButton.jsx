
import Button from 'react-bootstrap/Button';

import { GetIncompleteFeatureContext } from '../contexts/IncompleteFeatureContext.jsx';

function CheckoutButton() {
    const incompleteFeatureContext = GetIncompleteFeatureContext();
    const setModalHeaderTitle = incompleteFeatureContext.setModalHeaderTitle;
    const setShowModal = incompleteFeatureContext.setShowModal;

    function onSetModalVisibleCheckout() {
        setModalHeaderTitle("Checkout Page");
        setShowModal(true);
    }

    return (
        <Button
            className="w-100 button-primary-group button-static"
            onClick={onSetModalVisibleCheckout}>
            Check Out
        </Button>
    );
}

export default CheckoutButton;