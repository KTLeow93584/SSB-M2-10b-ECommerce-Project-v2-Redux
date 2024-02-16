// ==============================================
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Container from 'react-bootstrap/Container';
// ==============================================
import { useState, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
// ==============================================
import NavigationPanel from './components/NavigationPanel.jsx';
import Footer from './components/Footer.jsx';
import IncompleteFeatureModal from './components/IncompleteFeatureModal.jsx';

import Cart from './pages/Cart.jsx';
import Home from './pages/Home.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

import { CartContextProvider, GetCartContext } from './contexts/CartContext.jsx';
import { IncompleteFeatureContextProvider } from './contexts/IncompleteFeatureContext.jsx';

import { store } from './store.jsx';
// ==============================================
export function Layout() {
  const [isOverflowed, setIsOverflowed] = useState(false);

  const cartContext = GetCartContext();
  const isCartVisible = cartContext.isVisible;
  const setIsCartVisible = cartContext.setIsVisible;

  const cartPanelRef = useRef(null);
  // ==========================
  // Set Height of the referenced Cart Panel (100% or 100% of viewport height depending on height of components)
  useEffect(() => {
    const container = cartPanelRef.current;
    setIsOverflowed(container.scrollHeight > container.clientHeight);
  }, []);
  // ==========================
  // Toggle Left Click -> Hide Cart Panel
  useEffect(() => {
    if (!isCartVisible)
      return;

    // Alert if clicked on outside of element
    function handleClickOutside(event) {
      if (cartPanelRef.current && !cartPanelRef.current.contains(event.target)) {
        // Debug
        //alert("You clicked outside of me!");

        setIsCartVisible(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  // ==========================
  return (
    <>
      <div className={`page-overlay ${isCartVisible ? "page-overlay-cart" : ""}`}>
        {/* Main (Left Side) */}
        <div className={`main ${isCartVisible ? "main-shrink" : ""}`}>
          {/* Header Panels Section */}
          <NavigationPanel />
          <Outlet />
          {/* Footer Section */}
          <Container fluid className="w-100 pb-3 footer-container">
            <Footer />
          </Container>
        </div>
        {/* Cart (Right Side) */}
        <div
          ref={cartPanelRef}
          className={`cart ${isCartVisible ? "cart-expand" : ""}`}
          style={{ height: isOverflowed ? "100%" : "100vh" }}>
          <Cart />
        </div>
        <IncompleteFeatureModal />
      </div >
    </>
  );
}
// ==============================================
function App() {
  return (
    <IncompleteFeatureContextProvider>
      <CartContextProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                {/*<Route path="cart" element={<Cart />} />*/}
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </CartContextProvider>
    </IncompleteFeatureContextProvider>
  )
}

export default App
// ==============================================
