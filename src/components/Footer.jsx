// ==============================================
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Image from 'react-bootstrap/Image';

import { LanguageDropdown, CurrencyDropdown, CountryDropdown } from './InfoDropdowns.jsx';
// ==============================================
export default function Footer() {
    return (
        <Container fluid className="pt-5">
            {/* Footer Glossary Section */}
            <Row className="justify-content-center">
                <Col className="col-md-2 col-sm-5 col-11 mb-3">
                    <p className="fs-5 fw-bold text-non-links mt-0 mb-2">Get to Know Us</p>
                    <GlossaryLink title={"Careers"} />
                    <GlossaryLink title={"Blog"} />
                    <GlossaryLink title={"About Niagara"} />
                    <GlossaryLink title={"Investor Relations"} />
                    <GlossaryLink title={"Niagara Services"} addNewLine={false} />
                </Col>
                <Col className="col-md-3 col-sm-5 col-11 mb-3">
                    <p className="fs-5 fw-bold text-non-links mt-0 mb-2">Begin your Business Ventures with Us</p>
                    <GlossaryLink title={"Becoming an Affiliate"} />
                    <GlossaryLink title={"Becoming a Products Merchant"} />
                    <GlossaryLink title={"Publishing App Services on our Platform"} />
                    <GlossaryLink title={"How to Self-Publish"} />
                    <GlossaryLink title={"More Info on Making Money with Us"} />
                </Col>
                <Col className="col-md-3 col-sm-5 col-11 mb-3">
                    <p className="fs-5 fw-bold text-non-links mt-0 mb-2">Niagara Services</p>
                    <GlossaryLink title={"Niagara Business Card"} />
                    <GlossaryLink title={"Niagara E-Points Shopping"} />
                    <GlossaryLink title={"Top-up your Niagara E-Wallet"} />
                    <GlossaryLink title={"Physical Gift Cards"} addNewLine={false} />
                </Col>
                <Col className="col-md-3 col-sm-5 col-11 mb-3">
                    <p className="fs-5 fw-bold text-non-links">Let Us Help You / Q&A</p>
                    <GlossaryLink title={"Niagara's Efforts against COVID-19"} />
                    <GlossaryLink title={"Your Accounts"} />
                    <GlossaryLink title={"Your Order History"} />
                    <GlossaryLink title={"Return and Replacement Policies"} />
                    <GlossaryLink title={"Manage Your Devices"} />
                    <GlossaryLink title={"Niagara Pocket Pal Assistant"} />
                    <GlossaryLink title={"Help"} addNewLine={false} />
                </Col>
            </Row>

            <hr className="border border-2 mt-5" />

            {/* Footer Navigation Section */}
            <Row className="justify-content-center mt-4 mb-0">
                <Col className="d-flex flex-row align-items-center justify-content-center justify-content-lg-end col-lg-6 col-12 mx-0 mb-3">
                    <a href="#">
                        <Image src={new URL("../assets/logo.webp", import.meta.url).href} className="me-3" width="85px" />
                    </a>
                    <LanguageDropdown />
                </Col>
                <Col className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start col-lg-6 col-12 mx-0 mb-3">
                    <CurrencyDropdown />
                    <CountryDropdown />
                </Col>
            </Row>

            <hr className="border border-2 mt-2" />

            {/* Footer Copyright Section */}
            <Row className="justify-content-center mt-4 mb-0">
                <Col className="d-flex flex-column align-items-center justify-content-center col-12 mx-0">
                    <div>
                        <a href="#" className="text-links me-3" target="_blank" rel="noopener noreferrer">Terms and Condition of Use</a>
                        <a href="#" className="text-links me-3" target="_blank" rel="noopener noreferrer">Privacy Notice</a>
                        <a href="#" className="text-links" target="_blank" rel="noopener noreferrer">Ads Privacy Choice</a>
                    </div>
                    <p className="fs-6 text-non-links">© 2024-2024, Niagara.com, or its affiliates.</p>
                </Col>
            </Row>
        </Container >
    );
}

function GlossaryLink({ title, addNewLine = true, link = "#" }) {
    return (
        <>
            <a href={link} className="text-links" target="_blank" rel="noopener noreferrer">{title}</a>
            {(addNewLine === true ? <br /> : "")}
        </>
    );
}
// ==============================================