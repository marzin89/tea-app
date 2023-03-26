import Cart from '../components/cart/cart';

const Checkout = () => {
    return (
        <main>
            <section id="checkout">
                <h1>Ditt köp</h1>
                <Cart id="checkout-cart" />
                <button className="btn">Betala</button>
            </section>
        </main>
    );
}

export default Checkout;