// ==============================================
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
// ==============================================
const maxItemPerRow = 4;
// ==============================================
export default function ProductCarousel({ catalogue, title, titleKeyAbbr }) {
    return (
        <Container fluid
            id="top-seller-carousel-container"
            className="top-seller-container rounded">
            <p className="fs-5 mt-2 fw-bold">{title}</p>
            <Carousel id="top-seller-carousel" className="pt-2 pb-4" interval="60000">
                {RenderItemRow(catalogue, titleKeyAbbr)}
            </Carousel>
        </Container>
    );
}

function RenderItemRow(catalogue, titleKeyAbbr) {
    const itemHTMLList = [];

    for (let i = 0; i < catalogue.length; i += maxItemPerRow) {
        const startIndex = i / maxItemPerRow;
        itemHTMLList.push(
            <Carousel.Item key={`carousel-${titleKeyAbbr}-row-${startIndex}`}>
                <Row className="d-flex w-100 justify-content-evenly">
                    {RenderRowItems(catalogue, startIndex, titleKeyAbbr)}
                </Row>
            </Carousel.Item>
        );
    }
    return itemHTMLList;
}

function RenderRowItems(catalogue, startIndex, titleKeyAbbr) {
    const newCatalogueRowItems = catalogue.slice(startIndex, Math.min(catalogue.length, startIndex + maxItemPerRow));

    return newCatalogueRowItems.map((catalogueItem, index) =>
        <Col key={`carousel-${titleKeyAbbr}--${startIndex}-item-${index}`}
            className="col-2 mx-0 px-0">
            <a href="#">
                <Image className="mx-0" width="100%" height="auto"
                    src={new URL("../assets/" + catalogueItem.src, import.meta.url).href} />
            </a>
        </Col>
    )
}
// ==============================================