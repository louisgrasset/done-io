import './Filter.scss';

import { useSelector, useStore } from 'react-redux';
import iconFilterAll from '../../images/zap.svg';
import iconFilterCompleted from '../../images/done.svg';
import iconFilterNotCompleted from '../../images/folder.svg';
import {
    SHOW_ALL,
    SHOW_COMPLETED,
    SHOW_NOT_COMPLETED
} from '../../filters';
import { SET_OPTION_FILTER } from '../../actions';

export const Filter = ({ filter }) => {
    const store = useStore();
    const options = useSelector(s => s.options);

    let filters = {};
    filters[SHOW_ALL] = { text: 'All todos', icon: iconFilterAll };
    filters[SHOW_COMPLETED] = { text: 'Items done', icon: iconFilterCompleted };
    filters[SHOW_NOT_COMPLETED] = { text: 'Upcoming', icon: iconFilterNotCompleted };

    const setOptionFilter = () => {
        store.dispatch({
            type: SET_OPTION_FILTER,
            payload: {
                filter: filter
            }
        });
    };

    return (
        <div onClick={setOptionFilter} className={"filter" + (options.filter === filter ? ' filter--selected' : '')}>
            <div className="filter__icon">
                <img className="filter__icon-item" src={filters[filter].icon} alt="" />
            </div>
            <span className="filter__text">{filters[filter].text}</span>
        </div>
    );
};