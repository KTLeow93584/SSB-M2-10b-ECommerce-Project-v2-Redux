import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';

import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, Outlet, Route, Routes, Link } from 'react-router-dom';

import { store } from './store.jsx';

import Cart from './pages/Cart.jsx';
import Home from './pages/Home.jsx';

export function Layout() {
  const cartItemCount = useSelector((state) => state.cart.value.length);

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            E-Commerce App
          </Navbar.Brand>
          <Nav>
            {/*<Nav.Link href="/cart">*/}
            {/* https://stackoverflow.com/questions/61176344/redux-state-resets-itself-on-route-change-i-think */}
            <Nav.Link as={Link} to="/cart">
              <i className="bi bi-cart"></i>
              <Badge pill variant="primary">
                {cartItemCount}
              </Badge>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
