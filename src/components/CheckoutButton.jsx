
import Button from 'react-bootstrap/Button';

function CheckoutButton() {
    return (
        <Button variant="primary"
            className="w-100"
            onClick={() => console.log("To Checkout Page")}>
            Check Out
        </Button>
    );
}

export default CheckoutButton;