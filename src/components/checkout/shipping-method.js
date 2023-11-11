const ShippingMethod = () => {
    return (
        <section id="shipping">
            <h2>Leveranssätt</h2>
            <form id="shipping-form" className="checkout-form">
                <div className="shipping-method">
                    <input type="radio" id="home-delivery" name="shipping"></input>
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
                    <input type="radio" id="instabox" name="shipping" checked></input>
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
                    <input type="radio" id="service-point" name="shipping"></input>
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