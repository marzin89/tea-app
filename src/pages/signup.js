import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
    const firstNameRef    = useRef();
    const lastNameRef     = useRef();
    const usernameRef     = useRef();
    const passwordRef     = useRef();
    const emailRef        = useRef();
    const [user, setUser] = useState({
        firstName: '',
        lastName:  '',
        username:  '',
        password:  '',
        email:     '',
    })
    const [firstNameErr, setFirstNameErr]         = useState('');
    const [lastNameErr, setLastNameErr]           = useState('');
    const [usernameEmpty, setUsernameEmpty]       = useState('');
    const [usernameTaken, setUsernameTaken]       = useState('');
    const [passwordEmpty, setPasswordEmpty]       = useState('');
    const [passwordTooShort, setPasswordTooShort] = useState('');
    const [passwordTaken, setPasswordTaken]       = useState('');
    const [emailEmpty, setEmailEmpty]             = useState('');
    const [emailInvalid, setEmailInvalid]         = useState('');

    return (
        <main>
            <section>
                <h1 id="h1-signup">Registrering</h1>
                <form>
                    <label htmfor="first-name">Förnamn *</label>
                    <input type="text" id="first-name" className="text-input" ref={firstNameRef}></input>
                    {firstNameErr ? <p className="error">{firstNameErr}</p> : null}         
                    <label htmlFor="last-name">Efternamn *</label>
                    <input type="text" id="last-name" className="text-input" ref={lastNameRef}></input>
                    {lastNameErr ? <p className="error">{lastNameErr}</p> : null}
                    <label htmlFor="username">Användarnamn *</label>
                    <input type="text" id="username" className="text-input" ref={usernameRef}></input>
                    {usernameEmpty ? <p className="error">{usernameEmpty}</p> : null}
                    {usernameTaken ? <p className="error">{usernameTaken}</p> : null}
                    <label htmlFor="password"> Lösenord *</label>
                    <input type="password" id="password" className="text-input" ref={passwordRef}></input>
                    {passwordEmpty ? <p className="error">{passwordEmpty}</p> : null}
                    {passwordTooShort ? <p className="error">{passwordTooShort}</p> : null}
                    {passwordTaken ? <p className="error">{passwordTaken}</p> : null}
                    <label htmlFor="email">E-post *</label>
                    <input type="email" id="email" className="text-input" ref={emailRef}></input>
                    {emailEmpty ? <p className="error">{emailEmpty}</p> : null}
                    {emailInvalid ? <p className="error">{emailInvalid}</p> : null}           
                    <button id="submit-btn" className="btn">Registrera</button>
                </form>
                <p id="login-signup"><Link className="link-main" to="/login">Logga in</Link></p>
            </section>
        </main>
    );
}

export default SignUp;