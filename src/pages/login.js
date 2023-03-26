import { useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import { userActions } from '../store/slices/user-slice';
import { Link } from 'react-router-dom';

function Login() {
    const usernameRef                       = useRef();
    const passwordRef                       = useRef();
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage]   = useState("");
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        setUsernameError(!username ? 'Användarnamn måste anges' : '');
        setPasswordError(!password ? 'Lösenord måste anges' : ''); 

        if (username && password) {
            login(username, password);
        }
    }

    const login = async(username, password) => {
        const result = await fetch(`http://localhost:4040/users/login`, 
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ username: username, password: password }), 
          });

        if (result.status == 500) {
          setErrorMessage("Ett serverfel har uppstått. Det gick inte att logga in.");
        
        } else if (result.status == 404) {
          setErrorMessage("Fel användarnamn eller lösenord");
        
        } else {
            dispatch(userActions.login());
            sessionStorage.setItem('signedIn', true);
        }
    }

    return (
      <section>
        <h1 id="h1-login">Logga in</h1>
        <p id="signup"><Link className="link-main" to="/signup">Registrera dig</Link></p>
        <form id="login-form" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="username">Användarnamn</label>
            <input type="text" id="username" className="text-input" ref={usernameRef}></input>
            <label htmlFor="password">Lösenord</label>
            <input type="password" id="password" className="text-input" ref={passwordRef}></input>
            <button>Logga in</button>
            <p className="error">{usernameError}</p>
            <p className="error">{passwordError}</p>
            <p className="error">{errorMessage}</p>
        </form>
      </section>
    )
}

export default Login;