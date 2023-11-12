import { useRef, useEffect } from 'react';

const CartSum = (props) => {
    const cartRef = useRef();

    useEffect(() => {
        if (props.id == 'checkout-cart') {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 318) {
                    cartRef.current.className = 'checkout-cart-fixed';
                
                } else {
                    cartRef.current.className = '';
                }
            });
        }
    });

    return (
        <div id="cart-sum" ref={cartRef}>
            <div className="row">
                <p className="cart-left sum-details">Totalt</p>
                <p className="cart-right sum-details">{props.subtotal} :-</p>
            </div>
            <div className="row">
                <p className="cart-left sum-details">Moms</p>
                <p className="cart-right sum-details">{0.25 * props.subtotal} :-</p>
            </div>
            <div className="row">
                <p className="cart-left sum-details">Att betala</p>
                <p className="cart-right sum-details">{props.subtotal * 1.25} :-</p>
            </div>
        </div>
    );
}

export default CartSum;