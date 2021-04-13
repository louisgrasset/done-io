import './Search.scss';

import { useState } from 'react';
import iconSearch from '../../images/search.svg';

export const Search = ({ searchText, setSearchText }) => {
    const [searchFocus, setSearchFocus] = useState(false);
    return (
        <div className={"search" + (searchFocus ? " search--focused" : "")}>
            <div className="container">
                <img className="search__icon" src={iconSearch} alt="magnifier" />
                <input
                    value={searchText}
                    onFocus={() => setSearchFocus(true)}
                    onBlur={() => setSearchFocus(false)}
                    placeholder="Search in todos..."
                    className="search__input"
                    onChange={e => setSearchText(e.target.value)} />
                {searchText.length > 0 && <span onClick={() => setSearchText('')} className="search__input--clear"></span>}
            </div>
        </div>);
};