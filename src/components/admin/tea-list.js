import teacup from '../../images/teacup.png';

const TeaList = (props) => {
    const handleLinkClick = (e) => {
        e.preventDefault();
        const id = e.target.parentElement.id;

        if (e.target.innerHTML == 'Redigera') {
            props.setAction(e.target.id.slice(0, 4));
            props.setTea(props.teas.find((tea) => tea._id == id));
        
        } else {
            props.delete(id);
        }
    }

    return (
        <section id="tea-list-admin" className="tea-list">
            <div>
                {props.teas.map((tea) => {
                    return (
                    <div key={tea._id} id={tea._id} className="tea">
                        <img className="thumbnail" src={teacup} alt="Tekopp"></img>
                        <div className="row">
                            <p className="name">{tea.name}</p>
                            <p className="price">{tea.price} :-</p>
                        </div>
                        <button id={`edit${tea._id}`} className="btn edit-btn" onClick={(e) => handleLinkClick(e)}>Redigera</button>
                        <button id={`delete${tea._id}`} className="btn delete-btn" onClick={(e) => handleLinkClick(e)}>Radera</button>
                    </div>
                    )
                })}
            </div>
        </section>
    );
}

export default TeaList;