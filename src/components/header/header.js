import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/slices/cart-slice';

function Header() {
    const items    = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    
    const showCart = () => {
        dispatch(cartActions.show());
    } 

    return (
        <header>
            <div id="header-inner-wrap">            
                <p id="logo"><Link to="/">TeaApp</Link></p>
                <div id="cart-link" onClick={() => showCart()}>
                    {items ? <p id="cart-number-of-items">{items.length ? items.length : null}</p> : null}
                </div>
            </div>
        </header>
    )
}

export default Header;