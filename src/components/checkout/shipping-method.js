import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/slices/cart-slice';

const ShippingMethod = () => {
    const shippingMethod = useSelector((state) => state.cart.shippingMethod);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(cartActions.setShippingMethod(e.target.id));
        dispatch(cartActions.calculateShippingCost());
    }

    useEffect(() => {
        dispatch(cartActions.calculateShippingCost());
    });

    return (
        <section id="shipping">
            <h2>Leveranssätt</h2>
            <form id="shipping-form" className="checkout-form">
                <div className="shipping-method">
                    <input type="radio" id="home-delivery" name="shipping" checked={shippingMethod 
                        == 'home-delivery'} onChange={(e) => handleChange(e)}></input>
                    <label className="shipping-label" htmlFor="home-delivery">
                        Hemleverans</label>
                    <div className="shipping-details">
                        <p className="shipping-cost">Fraktkostnad</p>
                        <p>49 :- under 499 :-</p>
                        <p>Gratis över 499 :-</p>
                        <p>Leveranstid: 1 - 3 arbetsdagar</p>
                    </div>
                </div>
                <div className="shipping-method">
                    <input type="radio" id="instabox" name="shipping" checked={shippingMethod 
                        == 'instabox'} onChange={(e) => handleChange(e)}></input>
                    <label className="shipping-label" htmlFor="instabox">
                        Instabox (klimatsmart)</label>
                    <div className="shipping-details">
                        <p className="shipping-cost">Fraktkostnad</p>
                        <p>29 :- under 499 :-</p>
                        <p>Gratis över 499 :-</p>
                        <p>Leveranstid: 1 - 3 arbetsdagar</p>
                    </div>
                </div>
                <div className="shipping-method">
                    <input type="radio" id="service-point" name="shipping" checked={shippingMethod 
                        == 'service-point'} onChange={(e) => handleChange(e)}></input>
                    <label className="shipping-label" htmlFor="">
                        Ombud</label>
                    <div className="shipping-details">
                        <p className="shipping-cost">Fraktkostnad</p>
                        <p>39 :- under 499 :-</p>
                        <p>Gratis över 499 :-</p>
                        <p>Leveranstid: 1 - 3 arbetsdagar</p>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default ShippingMethod;