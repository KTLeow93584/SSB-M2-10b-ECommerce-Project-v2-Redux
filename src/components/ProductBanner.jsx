// ==============================================
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// ==============================================
// Grid-based (Single Row) Product Render.
export default function ProductBanner({ catalogue, suffix }) {
    const results = [];

    for (let i = 0; i < catalogue.length; ++i) {
        const promoItem = catalogue[i];
        const itemFullImageSrcPath = "../assets/" + promoItem.src;

        results.push(
            <Col key={`product-banner-${suffix}-catalogue-${i}`}
                className="col-12 col-sm-6 col-lg-4 col-xxl-3 mb-2">
                <Card className="card-container-banner align-items-start justify-content-center bg-light"
                    data-bs-theme="light">
                    <Card.Body className="d-flex flex-column align-items-start justify-content-center card-body-banner w-100">
                        <Card.Title variant="top"
                            className="card-title-banner text-start w-100">
                            {promoItem.name}
                        </Card.Title>
                        <Card.Img
                            className="card-img-banner text-center"
                            src={new URL(itemFullImageSrcPath, import.meta.url).href} />
                    </Card.Body>

                    <Card.Body className="d-flex flex-column align-items-start justify-content-center card-body-banner w-100 px-0">
                        <Button variant="link"
                            className="card-link-banner text-links-banner-button text-start">
                            {promoItem.buttonDescription}
                        </Button>
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