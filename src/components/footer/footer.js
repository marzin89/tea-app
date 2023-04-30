import { useDispatch } from 'react-redux';
import { userActions } from '../../store/slices/user-slice';

function Footer() {
    const dispatch = useDispatch();

    function handleLinkClick(e) {
        e.preventDefault();
        dispatch(userActions.toggleCookiesBanner(true));
    }

    return (
        <footer>
            <p><a href="" onClick={(e) => handleLinkClick(e)}>Cookieinställningar</a></p>
            <p>Copyright {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer;