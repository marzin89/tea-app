import { useState } from 'react';
import AdminForm from '../components/admin/admin-form';
import TeaList from '../components/admin/tea-list';
import { useSelector, useDispatch } from 'react-redux';
import { teaActions } from '../store/slices/tea-slice';
import { userActions } from '../store/slices/user-slice';

function Admin() {
    const teas          = useSelector((state) => state.tea.teas);
    const [tea, setTea] = useState({
        _id:         '',
        name:        '',
        type:        '',
        origin:      '',
        price:       '',
        description: [],
        rating:      0,
    });
    const [errorMessage, setErrorMessage]   = useState('');
    const [action, setAction]               = useState('add');
    const dispatch                          = useDispatch();

    const addTea = async(tea) => {
        const result = await fetch('http://localhost:4040/teas', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(tea),
        });

        setErrorMessage(result.status == 500 ? 'Det gick inte att lägga till teet.' : '');

        if (result.status == 200) {
            const data        = await result.json();
            const updatedTeas = [...teas];
            updatedTeas.push(data);
            dispatch(teaActions.setTeasAdmin(updatedTeas));
        }
    }

    const updateTea = async(id, tea) => {
        const result = await fetch(`http://localhost:4040/teas/id/${id}`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(tea),
        });

        setErrorMessage(result.status == 500 ? 'Det gick inte att uppdatera teet.' : '');

        if (result.status == 200) {
            const data        = await result.json();
            const index       = teas.indexOf(id);
            const updatedTeas = [...teas];
            updatedTeas.splice(index, 1, data);
            dispatch(teaActions.setTeasAdmin(updatedTeas));
        }
    }

    const deleteTea = async(id) => {
        const result = await fetch(`http://localhost:4040/teas/id/${id}`, {
            method:  'DELETE',
            headers: {'Content-Type': 'application/json',},
        });
        
        setErrorMessage(result.status == 500 ? 'Det gick inte att radera teet.' : '');

        if (result.status == 200) {
            const updatedTeas = [...teas];
            const index       = teas.indexOf(id);
            updatedTeas.splice(index, 1);
            dispatch(teaActions.setTeasAdmin(updatedTeas));
        }
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(userActions.logout());
    }

    return (
        <main>
            <p id="logout"><a className="link-main" href="" onClick={(e) => logout(e)}>Logga ut</a></p>
            <h1 id="h1-admin">Admin</h1>
            <AdminForm action={action} tea={tea} setAction={setAction} add={addTea} update={updateTea} />
            {teas.length ? <TeaList teas={teas} setAction={setAction} setTea={setTea} delete={deleteTea} />
                : <p className="error">{errorMessage}</p>}
        </main>
    );
}

export default Admin;