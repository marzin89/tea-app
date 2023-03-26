import { useRef } from 'react';

function SearchForm(props) {
    const nameRef          = useRef();
    const typeRef          = useRef();
    const originRef        = useRef();
    const nameWrapperRef   = useRef();
    const typeWrapperRef   = useRef();
    const originWrapperRef = useRef();

    const onChange = () => {
        const name   = nameRef.current.value ? nameRef.current.value : 'name';
        const type   = typeRef.current.value;
        const origin = originRef.current.value;

        if (name != '' || type != '' || origin != '') {
            props.setSearch(true);
            props.getTeas(name, type, origin);
        }

        props.setSearch(false);
    }

    return (
        <form id="search-form">
            <div className="input-wrapper" ref={nameWrapperRef}>
                <label htmlFor="name-input">Namn</label>
                <input type="search" id="name-input" className="text-input" ref={nameRef} onChange={() => onChange()}></input>
            </div>
            <div className="input-wrapper" ref={typeWrapperRef}>
                <label htmlFor="type-input">Kategori</label>
                <select id="type-input" className="text-input" ref={typeRef} onChange={() => onChange()}>
                    <option value="type"></option>
                    <option>Svart</option>
                    <option>Grönt</option>
                    <option>Vitt</option>
                    <option>Oolong</option>
                </select>
            </div>
            <div className="input-wrapper" ref={originWrapperRef}>
                <label htmlFor="origin-input">Ursprung</label>
                <select id="origin-input" className="text-input" ref={originRef} onChange={() => onChange()}>
                    <option value="origin"></option>
                    <option>Indien</option>
                    <option>Kina</option>
                    <option>Japan</option>
                    <option>Sri Lanka</option>
                </select>
            </div>
        </form>
    )
}

export default SearchForm;