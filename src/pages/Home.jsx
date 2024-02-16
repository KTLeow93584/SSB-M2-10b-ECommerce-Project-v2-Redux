import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Item from '../components/Item.jsx';

const items = [
    { id: 1, name: "Pen", description: "It's a pen.", price: "RM10" },
    { id: 2, name: "Laptop", description: "A typical laptop.", price: "RM1200" },
    { id: 3, name: "IPhone 2", description: "Might be an IPhone 3.", price: "RM30" }
];

export default function Home() {
    return (
        <Container>
            <Row>
                {
                    items.map((item) => (
                        <Col key={item.id} md={3}>
                            <Item item={item} />
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
}