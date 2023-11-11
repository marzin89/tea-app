import { useState, useRef } from 'react';

const AdminForm = (props) => {
    const [nameErr, setNameErr]     = useState('');
    const [typeErr, setTypeErr]     = useState('');
    const [originErr, setOriginErr] = useState('');
    const [priceErr, setPriceErr]   = useState('');
    const [descrErr, setDescrErr]   = useState();
    const nameRef                   = useRef();
    const typeRef                   = useRef();
    const originRef                 = useRef();
    const priceRef                  = useRef();
    const descriptionRef            = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            let descriptionArr = [];
        
            if (descriptionRef.current.value.includes('\n\n')) {
                descriptionArr = descriptionRef.current.value.split('\n\n');
            
            } else {
                descriptionArr.push(descriptionRef.current.value);
            }
    
            const tea = {
                name:        nameRef.current.value,
                type:        typeRef.current.value,
                origin:      originRef.current.value,
                price:       priceRef.current.value,
                description: descriptionRef.current.value,
                rating:      0,
            }
    
            if (props.action == 'add') {
                props.add(tea);
            
            } else {
                props.update(props.tea._id, tea);
            }
    
            e.target.reset();
        }
    }

    function validate() {
        setNameErr(!nameRef.current.value ? 'Fältet är obligatoriskt' : '');
        setTypeErr(!typeRef.current.value ? 'Fältet är obligatoriskt' : '');
        setOriginErr(!originRef.current.value ? 'Fältet är obligatoriskt' : '');
        setPriceErr(!priceRef.current.value ? 'Fältet är obligatoriskt' : '');
        setDescrErr(!descriptionRef.current.value ? 'Fältet är obligatoriskt' : '');

        if (nameRef.current.value && typeRef.current.value && originRef.current.value
            && priceRef.current.value && descriptionRef.current.value) {
                return true;
        }

        return false;
    }

    return (
        <section>
            <form id="admin-form" onSubmit={(e) => handleSubmit(e)}>
                <div id="radio-group">
                    <div className="radiogroup-inner-wrap">
                        <input type="radio" id="add" className="radio-btn" name="action" checked={props.action == 'add'} 
                            onChange={(e) => props.setAction(e.target.id)}></input>
                        <label htmlFor="add">Lägg till</label>
                    </div>
                    <div className="radiogroup-inner-wrap">
                        <input type="radio" id="edit" className="radio-btn" name="action" checked={props.action == 'edit'}
                            onChange={(e) => props.setAction(e.target.id)}>
                        </input>
                        <label htmlFor="put">Uppdatera</label>
                    </div>
                </div>
                <div className="row">
                    <div className="form-left">
                        <label htmlFor="name">Namn *</label>
                        <input id="name" className="text-input" ref={nameRef} defaultValue={props.tea.name}></input>
                        {nameErr ? <p className="error">{nameErr}</p> : null}
                    </div>
                    <div className="admin-form-right">
                        <label htmlFor="type">Kategori *</label>
                        <select id="type" className="text-input" defaultValue={props.tea.type} 
                            ref={typeRef}>
                            <option value=""></option>
                            <option value="Svart">Svart</option>
                            <option value="Grönt">Grönt</option>
                            <option value="Vitt">Vitt</option>
                            <option value="Oolong">Oolong</option>
                        </select>
                        {typeErr ? <p className="error">{typeErr}</p> : null}
                    </div>
                </div>
                <div className="row">
                    <div className="form-left">
                        <label htmlFor="origin">Ursprung *</label>
                        <select id="origin" className="text-input" defaultValue={props.tea.origin} 
                            ref={originRef}>
                            <option value=""></option>
                            <option value="Indien">Indien</option>
                            <option value="Kina">Kina</option>
                            <option value="Japan">Japan</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                        </select>
                        {originErr ? <p className="error">{originErr}</p> : null}
                    </div>
                    <div className="admin-form-right">
                        <label htmlFor="price">Pris *</label>
                        <input id="price" className="text-input" defaultValue={props.tea.price} ref={priceRef}></input>
                        {priceErr ? <p className="error">{priceErr}</p> : null}
                    </div>
                </div>
                <label htmlFor="description">Beskrivning *</label>
                <textarea id="description" className="text-input" defaultValue={props.tea.description} 
                    ref={descriptionRef}></textarea>
                {descrErr ? <p className="error">{descrErr}</p> : null}
                <button id="submit-btn" className="btn">{props.action == 'add' ? 'Lägg till' : 'Uppdatera'}</button>
            </form>
        </section>
    );
}

export default AdminForm;