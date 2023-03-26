const CartSum = (props) => {
    return (
        <div>
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