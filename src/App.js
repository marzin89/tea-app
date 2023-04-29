import Header from './components/header/header';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import Admin from './pages/admin';
import Tea from './pages/tea';
import Checkout from './pages/checkout';
import Cart from './components/cart/cart';
import Consent from './components/consent/consent';
import Footer from './components/footer/footer';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { teaActions } from './store/slices/tea-slice';
import { userActions } from './store/slices/user-slice';
import { useEffect } from 'react';

function App() {
  const isSignedIn = useSelector((state) => state.user.isSignedIn);
  const showCart   = useSelector((state) => state.cart.showCart);
  const isConsent  = useSelector((state) => state.user.isConsent);
  const dispatch   = useDispatch();

  useEffect(() => {
    dispatch(teaActions.fetchState());
    dispatch(userActions.fetchState());
  })

  return (
    <div className="App">
      <Router>
      <Header />
      {showCart ? <Cart id="cart" /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/login" element={isSignedIn ? <Navigate to="/admin" /> : <Login />} />
        <Route path="/admin" element={isSignedIn ? <Admin /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tea" element={<Tea />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      {!isConsent ? <Consent /> : null}
      <Footer />
      </Router>
    </div>
  );
}

export default App;
