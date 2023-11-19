import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { reviewActions } from '../../store/slices/review-slice';

function ReviewForm(props) {
    const [rating, setRating]       = useState(0);
    const nameRef                   = useRef();
    const reviewRef                 = useRef();
    const [ratingErr, setRatingErr] = useState('');
    const [reviewErr, setReviewErr] = useState('');
    const [errorMsg, setErrorMsg]   = useState('');
    const dispatch                  = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (isValid()) {
            let reviewArr = reviewRef.current.value.split('\n\n');

            const review = {
                productId: props.productId,
                rating:    rating,
                username:  nameRef.current.value,
                review:    reviewArr,
            }

            const result = await fetch(`http://localhost:4040/reviews`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(review),
            });

            setErrorMsg(result.status == 500 ? 'Det gick inte att spara recensionen.' : '');

            if (result.status == 200) {
                dispatch(reviewActions.addReview(review));
            }
        }
    }

    const isValid = () => {
        let isValidRating = rating > 0;
        let isValidReview = false;
        setRatingErr(isValidRating ? '' : 'Sätt ett betyg.');

        if (!reviewRef.current.value) {
            setReviewErr('Skriv ett omdöme.');
        
        } else {
            if (reviewRef.current.value.split(' ').length < 20) {
                setReviewErr('Minst 20 ord krävs.');
            
            } else {
                setReviewErr('');
                isValidReview = true;
            } 
        }

        return isValidRating && isValidReview;
    }

    return (
        <section id="review">
            <div>
                <p className="label">Betyg *</p>
                <span id="star1" className="star" onClick={(e) => setRating(e.target.id.slice(4))}>
                    {rating > 0 ? '★' : '☆'}</span>
                <span id="star2" className="star" onClick={(e) => setRating(e.target.id.slice(4))}>
                    {rating >= 2 ? '★' : '☆'}</span>
                <span id="star3" className="star" onClick={(e) => setRating(e.target.id.slice(4))}>
                    {rating >= 3 ? '★' : '☆'}</span>
                <span id="star4" className="star" onClick={(e) => setRating(e.target.id.slice(4))}>
                    {rating >= 4 ? '★' : '☆'}</span>
                <span id="star5" className="star" onClick={(e) => setRating(e.target.id.slice(4))}>
                    {rating == 5 ? '★' : '☆'}</span>
                {ratingErr ? <p className="error">{ratingErr}</p> : null}
            </div>
            <form id="review-form" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name">Namn (lämna tomt om du vill vara anonym)</label>
                <input type="text" id="name" className="text-input" ref={nameRef}></input>
                <label htmlFor="review">Omdöme *</label>
                <textarea id="review" ref={reviewRef}></textarea>
                {reviewErr ? <p className="error">{reviewErr}</p> : null}
                <button id="submit-btn" className="btn">Skicka</button>
                {errorMsg ? <p className="error">{errorMsg}</p> : null}
            </form>
        </section>
    );
}

export default ReviewForm;