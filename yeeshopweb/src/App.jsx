import React from "react";
import "./YeeCommon.css"
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
import SingleBlog from "./pages/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPloicy from "./pages/RefundPloicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermAndContions from "./pages/TermAndContions";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import BackToTopButton from './components/BackToTopButton';
import WishListButton from './components/WishListButton';
import PaymentReturn from './components/PaymentReturn';
import { YEE_PATH,} from "./constants/YeeConst";
import TrackingOrder from "./pages/TrackingOrder";
import OAuth2Redirect from "./pages/OAuth2Redirect";
import MyOrders from "./pages/MyOrders";
import ActiveUser from "./pages/ActiveUser";
import ChangeInfo from "./pages/ChangeInfo";
import ChangePassword from "./pages/ChangePassword";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path={YEE_PATH.INDEX} element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product" element={<OurStore />} />
            <Route path="product/:SKU" element={<SingleProduct />} />
            <Route path="blogs" element={<Blog />} />
            <Route path="blog/:id" element={<SingleBlog />} />
            <Route path="cart" element={<Cart />} />
            <Route path="/checkout/:id" element={<Checkout />}/>
            <Route path="compare-product" element={<CompareProduct />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path={YEE_PATH.LOGIN_PATH} element={<Login/>}/>
            <Route path="forgot-password" element={<Forgotpassword />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<Resetpassword />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPloicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="term-conditions" element={<TermAndContions />} />
            <Route path="order-return/:orderId" element={<PaymentReturn />} />
            <Route path="tracking-order" element={<TrackingOrder />} />
            <Route path='/oauth2/redirect' element={<OAuth2Redirect />} />
            <Route path='/my-orders' element={<MyOrders />} />
            <Route path='/send-otp/:email' element={<ActiveUser />} />
            <Route path='/user-info' element={<ChangeInfo />} />
            <Route path='/change-password' element={<ChangePassword />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* WishList */}
      <WishListButton />
      {/* Back to Top Function */}
      <BackToTopButton />
    </>
  );
}

export default App;
