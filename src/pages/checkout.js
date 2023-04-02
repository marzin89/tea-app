import Cart from '../components/cart/cart';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../store/slices/user-slice';

const Checkout = () => {
    const isSignedIn = useSelector((state) => state.user.isSignedIn);
    const dispatch   = useDispatch();

    const logout = (e) => {
        e.preventDefault();
        dispatch(userActions.logout());
    }

    return (
        <main>
            <section id="checkout">
                <h1>Ditt köp</h1>
                {isSignedIn ?
                    <p id="logout"><a className="link-main" href="" onClick={(e) => logout(e)}>Logga ut</a></p> 
                    : null}
                <Cart id="checkout-cart" />
                <button className="btn">Betala</button>
            </section>
        </main>
    );
}

export default Checkout;