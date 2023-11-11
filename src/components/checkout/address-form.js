import { useState } from 'react';

const AddressForm = () => {
    const [firstNameErr, setFirstNameErr] = useState('');
    const [lastNameErr, setLastNameErr]   = useState('');
    const [emailErr, setEmailErr]         = useState('');
    const [streetErr, setStreetErr]       = useState('');
    const [zipErr, setZipErr]             = useState('');
    const [cityErr, setCityErr]           = useState('');
    const [hasErrors, setHasErrors]       = useState(false);

    const isValidName = (e, part) => {
        let isValid      = false;
        const pattern    = /^[a-zA-ZåÅäÄöÖ]*$/;
        let errorMessage = e.target.value ? '' : 'Fältet är obligatoriskt.';

        if (e.target.value) {
            isValid = pattern.test(e.target.value.trim());
            errorMessage = isValid ? '' : 'Namn får bara innehålla bokstäver.';
        }

        if (part == 'förnamn') {
            setFirstNameErr(errorMessage);
        
        } else {
            setLastNameErr(errorMessage);
        }

        setHasErrors(isValid ? hasErrors : true);
    }

    const isValidEmail = (e) => {
        let isValid = false;
        let errorMessage = e.target.value ? '' : 'Fältet är obligatoriskt.';

        if (e.target.value) {
            const pattern1 = /^[a-zA-Z0-9]{1,}.[a-zA-Z0-9]{1,}@[a-zA-Z0-9]{1,}.[a-z]{1,3}$/;
            const pattern2 = /^[a-zA-Z0-9]{1,}@[a-zA-Z0-9]{1,}.[a-z]{1,3}$/;
            const isValid  = pattern1.test(e.target.value.trim()) || 
                pattern2.test(e.target.value.trim());
            errorMessage = isValid ? '' : 'Ange en giltig e-postadress.';  
        }      
        
        setEmailErr(errorMessage);
        setHasErrors(isValid ? hasErrors : true);
    }

    const isValidZipCode = (e) => {
        let isValid = false;
        let errorMessage = e.target.value ? '' : 'Fältet är obligatoriskt.';

        if (e.target.value) {
            const pattern = /^[0-9]{3}\s?[0-9]{2}$/;
            isValid       = pattern.test(e.target.value.trim());
            errorMessage  = isValid ? '' : 'Ange ett giltigt postnummer.';
        }
        
        setZipErr(errorMessage);
        setHasErrors(isValid ? hasErrors : true);
    }

    const isValidStreet = (e) => {
        let isValid = false;
        let errorMessage = e.target.value ? '' : 'Fältet är obligatoriskt.';

        if (e.target.value) {
            const pattern = /^[a-zA-ZåAäÄöÖ]{2,}\s[0-9]{1,3}$/;
            isValid       = pattern.test(e.target.value.trim());
            errorMessage  = isValid ? '' : 'Ange ett giltigt gatunamn.';
        }

        setStreetErr(errorMessage);
        setHasErrors(isValid ? hasErrors : true);
    }

    const isValidCity = (e) => {
        let isValid = false;
        let errorMessage = e.target.value ? '' : 'Fältet är obligatoriskt.';

        if (e.target.value) {
            const pattern = /^[a-zA-ZåÅäÄöÖ]*$/;
            isValid       = pattern.test(e.target.value.trim());
            errorMessage  = isValid ? '' : 'Ange en giltig stad.';
        }

        setCityErr(errorMessage);
        setHasErrors(isValid ? hasErrors : true);
    }

    return (
        <section id="address-form">
            <form className="checkout-form">
                <div className="row">
                    <div className="form-left">
                        <label htmlFor="first-name">Förnamn *</label>
                        <input type="text" id="first-name" className="text-input" 
                            onBlur={(e) => isValidName(e, 'förnamn')}></input>
                        {firstNameErr ? <p className="error">{firstNameErr}</p> : null}
                    </div>
                    <div className="form-right">
                        <label htmlFor="last-name">Efternamn *</label>
                        <input type="text" id="last-name" className="text-input"
                            onBlur={(e) => isValidName(e, 'efternamn')}></input>
                        {lastNameErr ? <p className="error">{lastNameErr}</p> : null}
                    </div>
                </div>
                <div className="row">
                    <div className="address-form-left">
                        <label htmlFor="email">Email *</label>
                        <input type="email" id="email" className="text-input"
                            onBlur={(e) => isValidEmail(e)}></input>
                        {emailErr ? <p className="error">{emailErr}</p> : null}
                    </div>
                    <div className="address-form-right">
                        <label htmlFor="zip-code">Postnr. *</label>
                        <input type="text" id="zip-code" className="text-input"
                            onBlur={(e) => isValidZipCode(e)}></input>
                        {zipErr ? <p className="error">{zipErr}</p> : null}
                    </div>
                </div>
                <div className="row">
                    <div className="form-left">
                        <label htmlFor="street">Gata *</label>
                        <input type="text" id="street" className="text-input"
                            onBlur={(e) => isValidStreet(e)}></input>
                        {streetErr ? <p className="error">{streetErr}</p> : null}  
                    </div>  
                    <div className="form-right">     
                        <label htmlFor="city">Postort *</label>
                        <input type="text" id="city" className="text-input"
                            onBlur={(e) => isValidCity(e)}></input>
                        {cityErr ? <p className="error">{cityErr}</p> : null}
                    </div>
                </div>
            </form>
        </section>
    );
}

export default AddressForm;