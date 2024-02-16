import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useDispatch } from 'react-redux';

import { addToCart } from '../feature/cart/cartSlice.jsx';

export default function Item({ item }) {
    const dispatch = useDispatch();

    function addItem() {
        return dispatch(addToCart(item));
    }

    return (
        <Card>
            <Card.Img
                variant='top'
                src={`https://picsum.photos/id/${item.id}/200`}
                alt={item.name} />
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                    {item.description}
                    <br />
                    Price: {item.price}
                </Card.Text>
                <Button variant="primary" onClick={addItem}>
                    Add To Cart
                </Button>
            </Card.Body>
        </Card>
    );
}