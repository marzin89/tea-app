import Header from './components/header/header';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import Admin from './pages/admin';
import Tea from './pages/tea';
import Checkout from './pages/checkout';
import Cart from './components/cart/cart';
import Footer from './components/footer/footer';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  const isSignedIn = useSelector((state) => state.user.isSignedIn);
  const showCart   = useSelector((state) => state.cart.showCart);

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
      <Footer />
      </Router>
    </div>
  );
}

export default App;