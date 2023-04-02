import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Teas from '../components/home/teas';
import SearchForm from '../components/home/search-form';
import ToggleBtns from '../components/home/toggle-btns';
import { useSelector, useDispatch } from 'react-redux';
import { teaActions } from '../store/slices/tea-slice';
import { userActions } from '../store/slices/user-slice';

function Home() {
    const teas                            = useSelector((state) => state.tea.teas);
    const [results, setResults]           = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSearch, setIsSearch]         = useState(false);
    const isCurrentPage                   = useSelector((state) => state.tea.currentPage);
    const numberOfPages                   = useSelector((state) => state.tea.numberOfPages);
    const isSignedIn                      = useSelector((state) => state.user.isSignedIn);
    const dispatch = useDispatch();

    const getAllTeas = async () => {
        const result = await fetch('http://localhost:4040/teas');
        setErrorMessage(result.status == 404 ? 'Teskåpet är tomt.' : '');

        if (result.status == 200) {
            const data = await result.json();
            setResults(data);
            dispatch(teaActions.setTeas(data));
        }
    }

    const filterTeas = async(name, type, origin) => {
        const result = await fetch(`http://localhost:4040/teas/name/${name}/type/${type}/origin/${origin}`);

        if (result.status == 200) {
            const data = await result.json();
            setResults(data);
            dispatch(teaActions.setTeas(data));
        }
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(userActions.logout());
    }

    useEffect(() => {
        if (!isSearch) {
            getAllTeas();
        }
    }, []);

    return (
        <main>
            <h1>Våra teer</h1>
            {isSignedIn ? 
                <p id="logout"><a className="link-main" href="" onClick={(e) => logout(e)}>Logga ut</a></p> :
                <p id="login"><Link className="link-main" to="/login">Fyll på teskåpet</Link></p>}
            <div className="row">
                <SearchForm setSearch={setIsSearch} getTeas={filterTeas} />
                {teas.length ? <Teas isSearch={isSearch} teas={results} /> :
                <p className="error">{errorMessage}</p>}
                {numberOfPages > 1 ? <ToggleBtns isCurrentPage={isCurrentPage} /> : null}
            </div>
        </main>
    );
}

export default Home;