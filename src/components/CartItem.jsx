import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function CartItem({ item }) {
    return (
        <Card className="mb-2">
            <Card.Body>
                <Row>
                    <Col xs={4} md={2}>
                        <Card.Img
                            variant='top'
                            src={`https://picsum.photos/id/${item.id}/200`}
                            alt={item.name} />
                    </Col>
                    <Col xs={8} md={6}>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}