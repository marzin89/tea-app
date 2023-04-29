import teacup from '../../images/teacup.png';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { teaActions } from '../../store/slices/tea-slice';
import { cartActions } from '../../store/slices/cart-slice';

function RelatedProducts(props) {
    const teas                = useSelector((state) => state.tea.page);
    const items               = useSelector((state) => state.cart.items);
    const useAnalyticsCookies = useSelector((state) => state.user.cookiePreferences.useAnalyticsCookies);
    const dispatch            = useDispatch();

    const getTea = (e) => {
        const id = e.target.parentElement.id;
        dispatch(teaActions.setTea(id));

        if (useAnalyticsCookies) {
            const tea = teas.find((tea) => tea._id == id);
            dispatch(teaActions.setItemsViewed(tea));
        }
    }

    const addToCart = (e) => {
        e.preventDefault();
        const tea = teas.find((tea) => tea._id == e.target.parentElement.id);

        if (!items.find((item) => item.id == tea._id)) {
            const item = {
                id:       e.target.parentElement.id,
                name:     tea.name,
                type:     tea.type,
                origin:   tea.origin,
                price:    tea.price,
                sum:      tea.price,
                quantity: 100,
            }

            const updatedItems = [...items]; 
            updatedItems.push(item);
            dispatch(cartActions.add(updatedItems));
            dispatch(cartActions.show());
        }
    }

    return (
        <section>
            <h2>Liknande produkter</h2>
            {props.products.map((product) => {
                return (
                    <div key={product._id} className="tea">
                        <Link id={product._id} to="/tea" onClick={(e) => getTea(e)}>
                            <img className="thumbnail" src={teacup} alt="Tekopp"></img>
                            <div className="row">
                                <p className="name">{product.name}</p>
                                <p className="price">{product.price} :-</p>
                            </div>
                            <button className="btn" onClick={(e) => addToCart(e)}>Lägg i varukorgen</button>
                        </Link>
                    </div>
                );
            })}
        </section>
    );
}

export default RelatedProducts;