import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import teacup from '../images/teacup.png';
import { cartActions } from '../store/slices/cart-slice';
import { teaActions } from '../store/slices/tea-slice';
import { userActions } from '../store/slices/user-slice';
import ReviewForm from '../components/tea/review-form';

function Tea() {
    const isSignedIn                    = useSelector((state) => state.user.isSignedIn);
    const tea                           = useSelector((state) => state.tea.tea);
    const items                         = useSelector((state) => state.cart.items);
    const price                         = useSelector((state) => state.tea.tea.price);
    const reviews                       = useSelector((state) => state.review.reviews);
    const [sum, setSum]                 = useState(0);
    const [showReviews, setShowReviews] = useState(false);
    const [quantity, setQuantity]       = useState(tea.quantity);    
    const dispatch                      = useDispatch();

    const handleChange = (e) => {
        const factor = e.target.value / 100;
        setQuantity(e.target.value);
        setSum(price * factor);
    }

    const addToCart = (e) => {
        e.preventDefault();

        if (!items.find((item) => item.id == tea._id)) {
            const item = {
                id:       e.target.parentElement.id,
                name:     tea.name,
                type:     tea.type,
                origin:   tea.origin,
                price:    price,
                sum:      price,
                quantity: quantity,
            }

            const updatedItems = [...items];
            updatedItems.push(item);
            dispatch(cartActions.add(updatedItems));
            dispatch(cartActions.show());
        }
    }

    const handleRating = async(e) => {
        const rating = e.target.id.slice(4);

        const response = await fetch('http://localhost:4040/ratings/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
                name: tea.name,
                rating: rating,
            }),
        })

        if (response.status == 200) {
            const updatedTea = {
                _id:         tea._id,
                name:        tea.name,
                type:        tea.type,
                origin:      tea.origin,
                description: tea.description,
                price:       tea.price,
                rating:      rating,
            };

            teaActions.updateTea(updatedTea);
        }
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(userActions.logout());
    }

    const handleLinkClick = (e) => {
        e.preventDefault();
        setShowReviews(showReviews == false);
    }

    return (
        <main id="main-tea">
            {isSignedIn ? 
                <p id="logout"><a className="link-main" href="" onClick={(e) => logout(e)}>Logga ut</a></p> 
                : null}
            <section>
                <div id="tea-left">
                    <img id="tea-image" src={teacup}></img>
                </div>
                <div id="tea-right">
                    <h1 id="h1-tea">{tea.name}</h1>
                    <p className="price">{sum ? sum : price} :-</p>
                    <select id="quantity-select-tea" className="text-input" onChange={(e) => handleChange(e)}>
                        <option>100</option>
                        <option>250</option>
                        <option>500</option>
                    </select>
                    {tea.description.length > 1 ? tea.description.foreach((paragraph) => {
                        <p>{paragraph}</p>
                        
                    }) : <p>{tea.description}</p>}
                    <div id="rating">
                        <span id="star1" className="star">{tea.rating > 0 ? '★' : '☆'}</span>
                        <span id="star2" className="star">{tea.rating >= 2 ? '★' : '☆'}</span>
                        <span id="star3" className="star">{tea.rating >= 3 ? '★' : '☆'}</span>
                        <span id="star4" className="star">{tea.rating >= 4 ? '★' : '☆'}</span>
                        <span id="star5" className="star">{tea.rating == 5 ? '★' : '☆'}</span>
                        <p></p>
                    </div>
                    <button id="add-to-cart" className="btn" onClick={(e) => addToCart(e)}>Lägg i varukorgen</button>
                    {reviews.length ? 
                    <div>
                        <p>{reviews.length} recensioner</p>
                        <a href="" onClick={(e) => handleLinkClick(e)}>Visa/dölj recensioner</a>
                    </div> :
                    <div>
                        <p>Inga recensioner</p>
                    </div>}
                    <a href="" onClick={(e) => handleLinkClick(e)}>Skriv en recension</a>
                </div>
            </section>
            {showReviews ? <ReviewForm productId={tea._id} /> : null}
        </main>
    )
}

export default Tea;