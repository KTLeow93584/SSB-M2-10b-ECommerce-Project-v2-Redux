// ==============================================
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// ==============================================
import { valentineHotDealsCatalogue } from '../datas/valentine-catalogue.jsx';
import { livingRoomThumbnailCatalogues } from '../datas/living-room-catalogue.jsx';
import { promoBanner } from '../datas/promo-banners.jsx';
// ==============================================
import ProductCarousel from '../components/ProductCarousel.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import ProductBanner from '../components/ProductBanner.jsx';
// ==============================================
function Home() {
    return (
        <>
            <div data-bs-theme="dark" className="home-page-overlay">
                {/* --------------------- */}
                {/* Content Body Section */}
                <Container fluid className="d-flex flex-column align-items-center w-100 content-body">
                    {/* --------------------- */}
                    {/* Title */}
                    <Row>
                        <Col className="col-12">
                            <div className="mt-3" style={{ width: "55vw" }}>
                                <p className="fs-3 fw-bold w-30 text-center">
                                    Shower your partner with your affection! ❤️🛍️
                                </p>
                                <p className="fs-3 fw-bold w-30 text-center">
                                    #ValentinesDay #ShopLove
                                </p>
                            </div>
                        </Col>
                    </Row>
                    {/* --------------------- */}
                    {/* Catalogues - Hot Sales Event */}
                    <ProductGrid catalogue={valentineHotDealsCatalogue} />
                    {/* --------------------- */}
                    {/* Catalogues - Banner #1 */}
                    <ProductBanner catalogue={promoBanner.row1} />
                    {/* --------------------- */}
                    {/* Catalogues - Category Sales */}
                    <Row className="justify-content-center mb-5" style={{ width: "70%" }}>
                        <ProductCarousel
                            catalogue={livingRoomThumbnailCatalogues}
                            title={"International Top Sellers in Living Room"}
                            titleKeyAbbr={"catalogue-living-room"} />
                    </Row>
                    {/* --------------------- */}
                    {/* Catalogues - Banner #2 */}
                    <ProductBanner catalogue={promoBanner.row2} />
                    {/* --------------------- */}
                </Container>
                {/* --------------------- */}
                {/* Pre-Footer (Return to Top) Section */}
                <div className="d-flex flex-row justify-content-center pre-footer-container">
                    <button onClick={() => window.scrollTo({ top: 0, left: 0, behaviour: "smooth" })}
                        className="w-100 text-links-button pre-footer-button">Return to Top</button>
                </div>
                {/* --------------------- */}
            </div >
        </>
    )
}

export default Home
// ==============================================
