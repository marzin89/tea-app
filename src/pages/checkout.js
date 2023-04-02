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
                {isSignedIn ?
                    <p id="logout"><a className="link-main" href="" onClick={(e) => logout(e)}>Logga ut</a></p> 
                        : null}
                <h1 id="h1-checkout">Ditt köp</h1>
                <Cart id="checkout-cart" />
                <button className="btn">Betala</button>
            </section>
        </main>
    );
}

export default Checkout;