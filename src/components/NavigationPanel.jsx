// ==============================================
import Container from 'react-bootstrap/Container';

import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { LanguageDropdown } from './InfoDropdowns';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// ==============================================
import { GetCartContext } from '../contexts/CartContext.jsx';
import { GetIncompleteFeatureContext } from '../contexts/IncompleteFeatureContext.jsx';
// ==============================================
export default function NavigationPanel() {
    const cartSize = useSelector((state) => state.cart.value.length);

    const cartContext = GetCartContext();
    const isCartVisible = cartContext.isVisible;
    const setIsCartVisible = cartContext.setIsVisible;

    const incompleteFeatureContext = GetIncompleteFeatureContext();
    const setModalHeaderTitle = incompleteFeatureContext.setModalHeaderTitle;
    const setShowModal = incompleteFeatureContext.setShowModal;

    function onSetModalVisibleSearch() {
        setModalHeaderTitle("Search Feature");
        setShowModal(true);
    }

    function onSetModalVisibleOrders() {
        setModalHeaderTitle("Orders Page");
        setShowModal(true);
    }

    return (
        <>
            <Container fluid id="nav-panel-group" className="header-container w-100">
                <Container fluid className="w-100 header-container rounded">
                    <Navbar expand="lg">
                        <Container fluid className="d-flex align-items-start">
                            <Navbar.Brand as={Link} to={"/"}>
                                <Image src={new URL("../assets/logo.webp", import.meta.url).href} width="85px" />
                            </Navbar.Brand>

                            <div className="d-flex justify-content-center " style={{ width: "50vw" }}>
                                <div className="d-flex justify-content-center bg-dark rounded me-3" style={{ width: "100%" }}>
                                    <Form.Control type="query-item-name" id="query-item-name" className="" style={{ minWidth: "30%" }}
                                        placeholder="Search item name here" aria-describedby="item-search"
                                    />
                                    <Nav.Link
                                        has={Link}
                                        onClick={onSetModalVisibleSearch}
                                        className="d-flex align-items-center justify-content-center text-links-button"
                                        style={{ height: "40px" }}>
                                        <FontAwesomeIcon
                                            className={"text-center text-links px-3"}
                                            icon={faMagnifyingGlass} />
                                    </Nav.Link>
                                </div>

                                <LanguageDropdown />
                            </div>

                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ms-auto">
                                    <Nav.Link has={Link} onClick={onSetModalVisibleOrders} className="text-links-button">Orders</Nav.Link>
                                    <Nav.Link as={Link} onClick={() => setIsCartVisible(!isCartVisible)} className="text-links-button">
                                        {`Cart${cartSize > 0 ? (" (" + cartSize + ")") : ""}`}
                                    </Nav.Link>
                                    {/* TODO (Nice-to-have/Optional Scope): Authentication */}
                                    {/* <Nav.Link href="#logout" className="text-links-button">Logout</Nav.Link> */}
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Container>
            </Container>
        </>
    );
}
// ==============================================