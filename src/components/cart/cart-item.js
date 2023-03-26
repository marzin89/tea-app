const CartItem = (props) => {
    const handleLinkClick = (e) => {
        e.preventDefault();
        const selects = document.querySelectorAll('select');

        switch (e.currentTarget.innerHTML) {
            case 'Ändra mängd':
                e.currentTarget.innerHTML = 'Dölj';
                selects[props.index].style.display = 'block';
            break;

            case 'Dölj':
                e.currentTarget.innerHTML = 'Ändra mängd';
                selects[props.index].style.display = 'none';
            break;

            default:
                props.delete(props.index);
        }
    }

    const handleChange = (e) => {
        props.change(e.target.value, props.index);
    }

    return (
        <div key={props.item.id} id={props.item.id} className="item">
            <div className="row">
                <p className="cart-left">{props.item.name}, {props.item.quantity} g</p>
                <p className="cart-right">{props.item.sum} :-</p>
            </div>
            <div className="row">
                <select id={`select-${props.item.id}`} className="quantity-select cart-left" onChange={(e) => 
                    handleChange(e)}>
                    <option>100</option>
                    <option>250</option>
                    <option>500</option>
                </select>
            </div>
            <div className="row">
                <p className="cart-left"><a href="" className="change-quantity-link" onClick={(e) => 
                    handleLinkClick(e)}>Ändra mängd</a></p>
                <p className="cart-right"><a id="delete-from-cart" href="" onClick={(e) => handleLinkClick(e)}>
                    Ta bort</a></p>
            </div>
        </div>
    );
}

export default CartItem;