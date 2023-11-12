import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './cart-item';
import CartSum from './cart-sum';
import { cartActions } from '../../store/slices/cart-slice';

function Cart(props) {
    const items    = useSelector((state) => state.cart.items);
    const subtotal = useSelector((state) => state.cart.subtotal);
    const dispatch = useDispatch();

    const hideCart = (e) => {
        e.preventDefault();
        dispatch(cartActions.hide());
    }

    const change = (value, index) => {
        const factor = Number(value) / 100;
        const updatedItems = [...items];
        const updatedItem = {
            id:       updatedItems[index].id,
            name:     updatedItems[index].name,
            type:     updatedItems[index].type,
            origin:   updatedItems[index].origin,
            price:    updatedItems[index].price,
            sum:      updatedItems[index].price * factor,
            quantity: value,
        }

        updatedItems.splice(index, 1, updatedItem);
        dispatch(cartActions.change(updatedItems));
    }

    const deleteItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        dispatch(cartActions.delete(updatedItems));
    }

    return (
        <section id={props.id}>
            {props.id == 'cart' ? 
                <div className="row">
                    <p id="cart-heading" className="cart-left">Varukorgen</p>
                    <p className="cart-right"><a href="" onClick={(e) => hideCart(e)}>Stäng</a></p>
                </div> : <h1 id="h1-checkout">Ditt köp</h1>}
            {items.length ? items.map((item, index) => {
                return (
                    <CartItem item={item} index={index} change={change} delete={deleteItem} />)}
                    
                ) : <p className="error">Varukorgen är tom</p>}
            {items.length ? <CartSum id={props.id} subtotal={subtotal} /> : null}
            {props.id == 'cart' && items.length ? 
                <div className="row">
                    <div className="btn">
                        <Link to="/checkout" onClick={() => dispatch(cartActions.hide())}>Gå till kassan</Link>
                    </div>
                </div> : null}
        </section>
    );
}

export default Cart;