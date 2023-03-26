import { useSelector, useDispatch } from 'react-redux';
import { teaActions } from '../../store/slices/tea-slice';

function ToggleBtns(props) {
    const pageArr  = useSelector((state) => state.tea.pageArr);
    const dispatch = useDispatch();

    const setCurrentPage = (e) => {
        dispatch(teaActions.setCurrentPage(e.target.innerHTML));
    }

    return (
        <div id="toggle-btns">
            {pageArr.map((number, index) => {
                return (
                    <button key={index} className={props.isCurrentPage == '' || props.isCurrentPage == number ? 
                        'active-toggle-btn' : 'toggle-btn'} onClick={(e) => setCurrentPage(e)}>{number}</button>
                );
            })}
        </div>
    );
}

export default ToggleBtns;