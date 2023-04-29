import teacup from '../../images/teacup.png';
import { Link } from 'react-router-dom';
import { dispatch } from 'react-redux';
import { teaActions } from '../../store/slices/tea-slice';

function RelatedProducts(props) {
    /*
    const getTea = (e) => {
        const id = e.target.parentElement.id;
        dispatch(teaActions.setTea(id));

        if (useAnalyticsCookies) {
            const tea = teas.find((tea) => tea._id == id);
            dispatch(teaActions.setItemsViewed(tea));
        }
    }
    */

    return (
        <section>
            <h2>Liknande produkter</h2>
            {props.products.map((product) => {
                return (
                    <div key={product._id} className="tea">
                        <Link id={product._id} to="/tea" /* onClick={(e) => getTea(e)} */>
                            <img className="thumbnail" src={teacup} alt="Tekopp"></img>
                            <div className="row">
                                <p className="name">{product.name}</p>
                                <p className="price">{product.price} :-</p>
                            </div>
                            <button className="btn"/* onClick={(e) => addToCart(e)} */>Lägg i varukorgen</button>
                        </Link>
                    </div>
                );
            })}
        </section>
    );
}

export default RelatedProducts;